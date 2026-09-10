import axios, { AxiosError } from "axios";
import * as cheerio from "cheerio";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface Candidate {
  domain: string;
  url: string;
  discovered_via: string;
  score?: number;
}

interface SearchSource {
  query: string;
  label: string;
}

interface CacheEntry {
  candidate: Candidate;
  checked_at: string;
}

interface DiscoveryCache {
  entries: Record<string, CacheEntry>;
}

const USER_AGENT = "temp-mail-site-discoverer/1.0 (+local research script)";
const timeoutMs = Number(process.env.DISCOVERY_TIMEOUT_MS ?? 12_000);
const maxResults = Number(process.env.DISCOVERY_MAX_RESULTS ?? 100);
const concurrency = Number(process.env.DISCOVERY_CONCURRENCY ?? 4);
const searchPageCount = Number(process.env.DISCOVERY_SEARCH_PAGES ?? 2);
const cacheTtlDays = Number(process.env.DISCOVERY_CACHE_TTL_DAYS ?? 7);
const braveApiKey = process.env.BRAVE_SEARCH_API_KEY?.trim();
let braveFailureLogged = false;
const verbose = process.argv.includes("--verbose");

const searchSources: SearchSource[] = [
  { query: "temporary email service disposable email inbox", label: "DuckDuckGo: provider search" },
  { query: "free temp mail disposable mailbox service", label: "DuckDuckGo: mailbox search" },
  { query: "temporary email address generator free", label: "DuckDuckGo: address generator search" },
  { query: "disposable email provider no registration", label: "DuckDuckGo: no-registration search" },
  { query: "throwaway email temporary inbox", label: "DuckDuckGo: throwaway inbox search" },
  { query: "burner email disposable mailbox", label: "DuckDuckGo: burner mailbox search" },
  { query: "anonymous email temporary mailbox", label: "DuckDuckGo: anonymous mailbox search" },
  { query: "one time email address service", label: "DuckDuckGo: one-time email search" },
  { query: "temporary mail receive email online", label: "DuckDuckGo: receive-mail search" },
  { query: "temp mail site alternative to 10 minute mail", label: "DuckDuckGo: service alternatives" },
  { query: "Mailinator alternative disposable email", label: "DuckDuckGo: provider alternatives" },
  { query: "site:*.com temporary email address generator", label: "DuckDuckGo: provider-focused search" }
];

const seedProviders = [
  "temp-mail.org",
  "10minutemail.com",
  "guerrillamail.com",
  "mail.tm",
  "tempmailo.com",
  "emailondeck.com",
  "maildrop.cc",
  "yopmail.com",
  "getnada.cc",
  "sharklasers.com"
];

const blockedDomains = new Set([
  "google.com", "bing.com", "duckduckgo.com", "yahoo.com", "reddit.com", "github.com",
  "gitlab.com", "wikipedia.org", "medium.com", "dev.to", "youtube.com", "facebook.com",
  "instagram.com", "x.com", "twitter.com", "linkedin.com", "quora.com", "stackoverflow.com",
  "stackexchange.com", "producthunt.com", "crunchbase.com", "trustpilot.com"
]);

const providerTerms = /temporary email|temp mail|disposable email|throwaway email|one[- ]time email|temporary inbox|disposable inbox|email address generator|burner email|anonymous mailbox|free email address/i;
const inboxTerms = /inbox|mailbox|your email|create email|copy address|generate email|receive email|random address/i;
const domainRelevanceTerms = /temp|mail|email|inbox|disposable|throwaway|burner|yopmail|guerrilla|10minute/i;

function log(message: string): void {
  console.log(`[discover] ${message}`);
}

function normalizeDomain(value: string): string | null {
  const raw = value.trim().replace(/^https?:\/\//i, "").split(/[/?#]/)[0].toLowerCase().replace(/^www\./, "");
  if (!raw || raw.includes("@") || raw.length > 253 || !/^[a-z0-9.-]+$/.test(raw)) return null;
  const labels = raw.split(".");
  if (labels.length < 2 || labels.some((label) => !label || label.startsWith("-") || label.endsWith("-"))) return null;
  const domain = labels.slice(-2).join(".");
  if (blockedDomains.has(domain)) return null;
  return domain;
}

function candidateFromUrl(value: string, discoveredVia: string): Candidate | null {
  try {
    const parsed = new URL(value.startsWith("http") ? value : `https://${value}`);
    const domain = normalizeDomain(parsed.hostname);
    return domain ? { domain, url: `https://${domain}`, discovered_via: discoveredVia } : null;
  } catch {
    return null;
  }
}

function isRelevantCandidate(candidate: Candidate): boolean {
  return seedProviders.includes(candidate.domain) || domainRelevanceTerms.test(candidate.domain);
}

function parseSearchHtml(html: string, discoveredVia: string, selector: string): Candidate[] {
  const $ = cheerio.load(html);
  const results: Candidate[] = [];
  $(selector).each((_, element) => {
    const href = $(element).attr("href");
    if (!href) return;
    const match = href.match(/uddg=([^&]+)/);
    const target = match ? decodeURIComponent(match[1]) : href;
    const candidate = candidateFromUrl(target, discoveredVia);
    if (candidate) results.push(candidate);
  });
  return results;
}

async function search(source: SearchSource, page: number): Promise<Candidate[]> {
  const offset = page * 30;
  const sourceLabel = `${source.label}, page ${page + 1}`;
  const endpoints = [
    `https://html.duckduckgo.com/html/?q=${encodeURIComponent(source.query)}&s=${offset}&dc=${offset}`,
    `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(source.query)}&s=${offset}`
  ];
  for (const endpoint of endpoints) {
    try {
      const response = await axios.get<string>(endpoint, {
        timeout: timeoutMs,
        headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" }
      });
      const selector = endpoint.includes("/lite/") ? "a.result-link" : ".result__a";
      const results = parseSearchHtml(response.data, sourceLabel, selector);
      if (results.length > 0) return results;
    } catch {
      // Try DuckDuckGo's lighter endpoint before reporting a failed query.
    }
  }
  log(`search failed (${sourceLabel}): DuckDuckGo endpoints unavailable`);
  return [];
}

async function searchBing(source: SearchSource, page: number): Promise<Candidate[]> {
  const offset = page * 10 + 1;
  const endpoint = `https://www.bing.com/search?q=${encodeURIComponent(source.query)}&first=${offset}`;
  const sourceLabel = `Bing: ${source.label}, page ${page + 1}`;
  try {
    const response = await axios.get<string>(endpoint, {
      timeout: timeoutMs,
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" }
    });
    return parseSearchHtml(response.data, sourceLabel, "li.b_algo h2 a");
  } catch (error) {
    const reason = error instanceof AxiosError ? error.code ?? error.message : String(error);
    log(`search failed (${sourceLabel}): ${reason}`);
    return [];
  }
}

async function searchBrave(source: SearchSource, page: number): Promise<Candidate[]> {
  if (!braveApiKey) return [];
  try {
    const response = await axios.get<{ web?: { results?: Array<{ url: string }> } }>("https://api.search.brave.com/res/v1/web/search", {
      timeout: timeoutMs,
      params: { q: source.query, count: 20, offset: page },
      headers: { "X-Subscription-Token": braveApiKey, Accept: "application/json" }
    });
    return (response.data.web?.results ?? []).map((result) => candidateFromUrl(result.url, `Brave Search: ${source.label}, page ${page + 1}`)).filter((candidate): candidate is Candidate => candidate !== null);
  } catch (error) {
    const reason = error instanceof AxiosError ? error.code ?? error.message : String(error);
    if (!braveFailureLogged) {
      braveFailureLogged = true;
      log(`Brave Search disabled after its first request failed (${reason}). Check BRAVE_SEARCH_API_KEY or remove it to skip Brave.`);
    }
    return [];
  }
}

async function discoverCommonCrawl(): Promise<Candidate[]> {
  const patterns = ["*.com/*temp*mail*", "*.com/*disposable*email*", "*.net/*throwaway*email*", "*.org/*temporary*inbox*"];
  try {
    const collections = await axios.get<Array<{ id: string }>>("https://index.commoncrawl.org/collinfo.json", { timeout: timeoutMs });
    const indexId = collections.data[0]?.id;
    if (!indexId) return [];
    const discovered: Candidate[] = [];
    for (const pattern of patterns) {
      const endpoint = `https://index.commoncrawl.org/${indexId}-index?url=${encodeURIComponent(pattern)}&output=json&filter=status:200&collapse=urlkey`;
      try {
        const response = await axios.get<string>(endpoint, { timeout: timeoutMs, headers: { "User-Agent": USER_AGENT } });
        for (const line of response.data.split("\n")) {
          if (!line.trim()) continue;
          try {
            const record = JSON.parse(line) as { url?: string };
            const candidate = record.url ? candidateFromUrl(record.url, `Common Crawl: ${pattern}`) : null;
            if (candidate) discovered.push(candidate);
          } catch {
            // Ignore malformed index lines.
          }
        }
      } catch (error) {
        if (verbose) {
          const reason = error instanceof AxiosError ? error.code ?? error.message : String(error);
          log(`Common Crawl pattern skipped (${pattern}): ${reason}`);
        }
      }
    }
    return discovered;
  } catch (error) {
    const reason = error instanceof AxiosError ? error.code ?? error.message : String(error);
    log(`Common Crawl unavailable: ${reason}`);
    return [];
  }
}

async function loadCache(cachePath: string): Promise<DiscoveryCache> {
  try {
    const content = await fs.readFile(cachePath, "utf8");
    return JSON.parse(content) as DiscoveryCache;
  } catch {
    return { entries: {} };
  }
}

async function saveCache(cachePath: string, cache: DiscoveryCache): Promise<void> {
  await fs.writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

function getFreshCachedCandidate(cache: DiscoveryCache, domain: string): Candidate | null {
  const entry = cache.entries[domain];
  if (!entry) return null;
  const age = Date.now() - Date.parse(entry.checked_at);
  if (!Number.isFinite(age) || age > cacheTtlDays * 24 * 60 * 60 * 1000) return null;
  return entry.candidate;
}

async function verify(candidate: Candidate): Promise<Candidate | null> {
  try {
    const response = await axios.get<string>(candidate.url, {
      timeout: timeoutMs,
      maxRedirects: 3,
      validateStatus: (status) => status >= 200 && status < 400,
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" }
    });
    const $ = cheerio.load(response.data);
    const title = $("title").text();
    const text = `${title} ${$("body").text().slice(0, 120_000)}`;
    const forms = $("form").length;
    const score = (text.match(providerTerms) ? 4 : 0) + (inboxTerms.test(text) ? 2 : 0) + (forms > 0 ? 1 : 0) + (response.request.res?.statusCode === 200 ? 1 : 0);
    if (score < 4) return null;
    return { ...candidate, url: `https://${candidate.domain}`, score };
  } catch (error) {
    if (verbose) {
      const reason = error instanceof AxiosError ? error.code ?? error.message : String(error);
      log(`unreachable ${candidate.domain}: ${reason}`);
    }
    return null;
  }
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, worker: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  let nextIndex = 0;
  async function consume(): Promise<void> {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, limit) }, () => consume()));
  return results;
}

async function main(): Promise<void> {
  const searchTasks = searchSources.flatMap((source) => Array.from({ length: Math.max(1, searchPageCount) }, (_, page) => ({ source, page })));
  const cachePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "discovery-cache.json");
  const cache = await loadCache(cachePath);
  log(`starting DuckDuckGo and Bing across ${searchTasks.length} result pages${braveApiKey ? "; Brave Search enabled" : "; Brave Search skipped (no API key)"}`);
  const seeded = seedProviders.map((domain) => ({ domain, url: `https://${domain}`, discovered_via: "curated seed providers" }));
  const [duckDuckGo, bing, brave, commonCrawl] = await Promise.all([
    mapWithConcurrency(searchTasks, 2, ({ source, page }) => search(source, page)),
    mapWithConcurrency(searchTasks, 2, ({ source, page }) => searchBing(source, page)),
    mapWithConcurrency(searchTasks, 2, ({ source, page }) => searchBrave(source, page)),
    discoverCommonCrawl()
  ]);
  const discovered = [...duckDuckGo.flat(), ...bing.flat(), ...brave.flat(), ...commonCrawl];
  const unique = new Map<string, Candidate>();
  [...seeded, ...discovered].filter(isRelevantCandidate).forEach((candidate) => unique.set(candidate.domain, unique.get(candidate.domain) ?? candidate));
  log(`collected ${unique.size} relevant domain candidates; verifying uncached homepages`);

  let cacheHits = 0;
  const verified = (await mapWithConcurrency([...unique.values()], concurrency, async (candidate) => {
    const cached = getFreshCachedCandidate(cache, candidate.domain);
    if (cached) {
      cacheHits += 1;
      return cached;
    }
    const checked = await verify(candidate);
    if (checked) cache.entries[checked.domain] = { candidate: checked, checked_at: new Date().toISOString() };
    return checked;
  })).filter((candidate): candidate is Candidate => candidate !== null);
  await saveCache(cachePath, cache);
  const allCached = Object.values(cache.entries).map((entry) => entry.candidate);
  const combined = new Map<string, Candidate>();
  [...allCached, ...verified].forEach((candidate) => combined.set(candidate.domain, candidate));
  const websites = [...combined.values()]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || a.domain.localeCompare(b.domain))
    .slice(0, maxResults);
  const output = { updated_at: new Date().toISOString(), total_count: websites.length, websites };
  const outputPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "temp_email_websites.json");
  await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\\n`, "utf8");
  log(`verified ${websites.length} providers (${cacheHits} cache hits) and wrote ${path.basename(outputPath)}`);
}

main().catch((error) => {
  console.error("[discover] fatal error:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
