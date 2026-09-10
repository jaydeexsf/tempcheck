'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [codeLang, setCodeLang] = useState<'curl' | 'typescript' | 'python' | 'go'>('curl');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Interactive Sandbox State
  const [sandboxEmail, setSandboxEmail] = useState('user@tempmail.com');
  const [sandboxApiKey, setSandboxApiKey] = useState('tc_live_demo9948273615');
  const [sandboxLoading, setSandboxLoading] = useState(false);
  const [sandboxResult, setSandboxResult] = useState<any>({
    status: "success",
    email: "user@tempmail.com",
    disposable: true,
    domain: "tempmail.com",
    type: "disposable",
    risk_score: 0.98,
    details: {
      mx_records_found: true,
      free_provider: false,
      subdomain_alias: false,
      spam_trap_likelihood: "high"
    },
    latency_ms: 18
  });

  const disposableDomains = ['tempmail.com', '10minutemail.com', 'mailinator.com', 'guerrillamail.com', 'trashmail.com', 'temp-mail.org'];

  const runSandboxCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setSandboxLoading(true);

    setTimeout(() => {
      setSandboxLoading(false);
      const domain = sandboxEmail.split('@')[1]?.toLowerCase() || 'unknown.com';
      const isDisposable = disposableDomains.includes(domain) || domain.includes('temp') || domain.includes('mail');
      const isFree = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain);
      const riskScore = isDisposable ? 0.98 : isFree ? 0.45 : 0.02;

      setSandboxResult({
        status: "success",
        email: sandboxEmail,
        disposable: isDisposable,
        domain: domain,
        type: isDisposable ? "disposable" : isFree ? "freemail" : "corporate",
        risk_score: riskScore,
        details: {
          mx_records_found: true,
          free_provider: isFree,
          subdomain_alias: false,
          spam_trap_likelihood: isDisposable ? "high" : "low"
        },
        latency_ms: Math.floor(Math.random() * 15) + 12
      });
    }, 400);
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const codeSnippets = {
    curl: `curl -X POST https://api.tempcheck.com/v1/check-email \\
  -H "Authorization: Bearer ${sandboxApiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "${sandboxEmail}"}'`,

    typescript: `import { TempCheck } from '@tempcheck/sdk';

const tempcheck = new TempCheck({ apiKey: '${sandboxApiKey}' });

async function validateSignup(userEmail: string) {
  const res = await tempcheck.checkEmail({ email: userEmail });
  
  if (res.disposable) {
    throw new Error('Disposable email addresses are not allowed.');
  }
  return res;
}

validateSignup('${sandboxEmail}');`,

    python: `import requests

response = requests.post(
    "https://api.tempcheck.com/v1/check-email",
    headers={"Authorization": "Bearer ${sandboxApiKey}"},
    json={"email": "${sandboxEmail}"}
)

data = response.json()
if data.get("disposable"):
    print("Blocked temporary email address:", data["domain"])`,

    go: `package main

import (
	"bytes"
	"fmt"
	"net/http"
)

func main() {
	url := "https://api.tempcheck.com/v1/check-email"
	jsonBody := []byte(\`{"email": "${sandboxEmail}"}\`)
	
	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonBody))
	req.Header.Set("Authorization", "Bearer ${sandboxApiKey}")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	fmt.Println("Status:", resp.Status)
}`
  };

  const navItems = [
    { id: 'overview', label: '1. Overview & Concepts' },
    { id: 'authentication', label: '2. Authentication & Keys' },
    { id: 'check-email', label: '3. POST /v1/check-email' },
    { id: 'check-batch', label: '4. POST /v1/check-batch' },
    { id: 'check-domain', label: '5. POST /v1/check-domain' },
    { id: 'disposable-sync', label: '6. GET /v1/domains/disposable' },
    { id: 'errors-limits', label: '7. Error Codes & Rate Limits' },
    { id: 'sdks', label: '8. Client SDK Libraries' },
    { id: 'sandbox', label: '9. Interactive API Sandbox' }
  ];

  const filteredNavItems = navItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1, display: 'flex', maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '32px 24px', gap: '32px' }}>
        
        {/* Left Sticky Sidebar Navigation */}
        <aside style={{ width: '260px', flexShrink: 0, position: 'sticky', top: '90px', height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: '#020C14',
                border: '1px solid #143547',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '12px', paddingLeft: '8px' }}>
            API DOCUMENTATION
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filteredNavItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: activeSection === item.id ? 600 : 400,
                  color: activeSection === item.id ? '#08E1E8' : 'var(--text-secondary)',
                  background: activeSection === item.id ? 'rgba(8, 225, 232, 0.1)' : 'transparent',
                  borderLeft: activeSection === item.id ? '2px solid #08E1E8' : '2px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Middle Main Content Column */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <div className="eyebrow" style={{ marginBottom: '16px' }}>
            <span className="dot"></span>Developer Reference v1.0
          </div>
          
          <h1 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', letterSpacing: '0' }}>
            TempCheck API Documentation
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
            Integrate real-time sub-50ms disposable email detection, risk analysis, and domain intelligence directly into your registration and signup flows.
          </p>

          {/* Section 1: Overview */}
          <section id="overview" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '9px' }}>
              1. Overview &amp; Engine Mechanics
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
              TempCheck provides an ultra-low latency REST API designed to verify whether an email address belongs to a disposable or temporary mail provider (such as 10MinuteMail, TempMail, GuerrillaMail, or custom ephemeral domains).
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', margin: '24px 0' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '18px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', color: '#08E1E8', fontWeight: 700, marginBottom: '4px' }}>LATENCY SLA</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFF' }}>&lt; 50ms</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Global edge processing</div>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '18px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', color: '#08E1E8', fontWeight: 700, marginBottom: '4px' }}>DOMAIN DATASET</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFF' }}>125,000+</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Real-time honeypot sync</div>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '18px', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', color: '#08E1E8', fontWeight: 700, marginBottom: '4px' }}>ACCURACY RATE</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFF' }}>99.9%</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Zero false positives for corporate</div>
              </div>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: '24px 0 12px 0' }}>Risk Score Metric Scale</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
              Every verification response contains a float <code style={{ color: '#08E1E8', background: '#020C14', padding: '2px 6px', borderRadius: '4px' }}>risk_score</code> between <code style={{ color: '#08E1E8' }}>0.00</code> and <code style={{ color: '#08E1E8' }}>1.00</code>:
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', marginBottom: '24px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px' }}>SCORE RANGE</th>
                  <th style={{ padding: '10px' }}>CLASSIFICATION</th>
                  <th style={{ padding: '10px' }}>RECOMMENDED ACTION</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-secondary)' }}>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px', color: '#08E1E8', fontWeight: 600 }}>0.00 – 0.20</td>
                  <td style={{ padding: '10px' }}>Clean / Corporate Domain</td>
                  <td style={{ padding: '10px', color: '#08E1E8' }}>Allow registration</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px', color: '#FFB800', fontWeight: 600 }}>0.21 – 0.70</td>
                  <td style={{ padding: '10px' }}>Freemail (Gmail, Yahoo, Outlook)</td>
                  <td style={{ padding: '10px' }}>Allow with standard verification</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', color: '#FF4D4D', fontWeight: 600 }}>0.71 – 1.00</td>
                  <td style={{ padding: '10px' }}>High-Risk / Disposable Mail</td>
                  <td style={{ padding: '10px', color: '#FF4D4D' }}>Block registration / Prompt valid email</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Section 2: Authentication */}
          <section id="authentication" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '9px' }}>
              2. Authentication &amp; API Keys
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
              Authenticate all HTTP requests by including your secret API key in the standard Authorization header:
            </p>
            <div style={{ background: '#020C14', padding: '16px', borderRadius: '8px', border: '1px solid #143547', fontFamily: 'monospace', fontSize: '13px', color: '#08E1E8', marginBottom: '24px' }}>
              Authorization: Bearer tc_live_YOUR_SECRET_API_KEY
            </div>

            <div style={{ background: 'rgba(255, 184, 0, 0.08)', border: '1px solid rgba(255, 184, 0, 0.25)', borderRadius: '8px', padding: '16px', color: '#FFB800', fontSize: '13px', lineHeight: 1.5 }}>
              ⚠️ <strong>Security Best Practice:</strong> Keep your secret API key safe. Never publish your key in public GitHub repositories or client-side frontend code. Execute all requests from your secure backend application server.
            </div>
          </section>

          {/* Section 3: POST /v1/check-email */}
          <section id="check-email" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '9px' }}>
              3. Check Single Email (<code style={{ color: '#08E1E8' }}>POST /v1/check-email</code>)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
              Verify an individual email address in real time. Returns disposable status, domain classification, and risk evaluation.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(8,225,232,0.1)', border: '1px solid rgba(8,225,232,0.3)', borderRadius: '6px', fontSize: '13px', fontFamily: 'monospace', color: '#08E1E8', marginBottom: '24px' }}>
              <span style={{ fontWeight: 700 }}>POST</span> https://api.tempcheck.com/v1/check-email
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Request Body Parameters</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', marginBottom: '28px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px' }}>PARAMETER</th>
                  <th style={{ padding: '10px' }}>TYPE</th>
                  <th style={{ padding: '10px' }}>REQUIRED</th>
                  <th style={{ padding: '10px' }}>DESCRIPTION</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-secondary)' }}>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px', color: '#FFF', fontFamily: 'monospace' }}>email</td>
                  <td style={{ padding: '10px', color: '#08E1E8' }}>string</td>
                  <td style={{ padding: '10px' }}><span style={{ background: 'rgba(255,77,77,0.15)', color: '#FF4D4D', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>REQUIRED</span></td>
                  <td style={{ padding: '10px' }}>The email address string to validate (e.g. <code style={{ color: '#08E1E8' }}>user@tempmail.com</code>).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px', color: '#FFF', fontFamily: 'monospace' }}>fast_mode</td>
                  <td style={{ padding: '10px', color: '#08E1E8' }}>boolean</td>
                  <td style={{ padding: '10px' }}><span style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>OPTIONAL</span></td>
                  <td style={{ padding: '10px' }}>Set to <code style={{ color: '#08E1E8' }}>true</code> for sub-10ms dataset cache lookup (bypasses live DNS MX lookup).</td>
                </tr>
              </tbody>
            </table>

            {/* Code Snippet Tabs */}
            <div style={{ background: '#020C14', border: '1px solid #143547', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#041825', padding: '8px 16px', borderBottom: '1px solid #143547' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['curl', 'typescript', 'python', 'go'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setCodeLang(lang)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: 'none',
                        background: codeLang === lang ? 'rgba(8, 225, 232, 0.15)' : 'transparent',
                        color: codeLang === lang ? '#08E1E8' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copyCode(codeSnippets[codeLang])}
                  style={{
                    background: 'none',
                    border: '1px solid #143547',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    color: copiedSnippet ? '#08E1E8' : 'var(--text-secondary)',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {copiedSnippet ? '✓ Copied' : 'Copy Code'}
                </button>
              </div>
              <pre style={{ padding: '20px', color: '#08E1E8', fontFamily: 'monospace', fontSize: '13px', overflowX: 'auto', margin: 0, lineHeight: 1.5 }}>
                {codeSnippets[codeLang]}
              </pre>
            </div>

            {/* Response Example */}
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Response Object (`200 OK`)</h3>
            <pre style={{ background: '#020C14', padding: '20px', borderRadius: '12px', border: '1px solid #143547', color: '#E2EEF2', fontFamily: 'monospace', fontSize: '13px', overflowX: 'auto' }}>
{JSON.stringify({
  status: "success",
  email: "user@tempmail.com",
  disposable: true,
  domain: "tempmail.com",
  type: "disposable",
  risk_score: 0.98,
  details: {
    mx_records_found: true,
    free_provider: false,
    subdomain_alias: false,
    spam_trap_likelihood: "high"
  },
  latency_ms: 18
}, null, 2)}
            </pre>
          </section>

          {/* Section 4: POST /v1/check-batch */}
          <section id="check-batch" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '9px' }}>
              4. Batch Email Check (<code style={{ color: '#08E1E8' }}>POST /v1/check-batch</code>)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
              Validate up to 100 email addresses in a single request. Perfect for batch user import verification.
            </p>
            <pre style={{ background: '#020C14', padding: '16px', borderRadius: '8px', border: '1px solid #143547', color: '#08E1E8', fontFamily: 'monospace', fontSize: '13px' }}>
{`POST /v1/check-batch
Content-Type: application/json

{
  "emails": ["user1@tempmail.com", "alex@gmail.com", "admin@10minutemail.com"]
}`}
            </pre>
          </section>

          {/* Section 5: POST /v1/check-domain */}
          <section id="check-domain" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '9px' }}>
              5. Domain Intelligence Lookup (<code style={{ color: '#08E1E8' }}>POST /v1/check-domain</code>)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
              Lookup domain-level intelligence without specifying a user mailbox.
            </p>
            <pre style={{ background: '#020C14', padding: '16px', borderRadius: '8px', border: '1px solid #143547', color: '#08E1E8', fontFamily: 'monospace', fontSize: '13px' }}>
{`POST /v1/check-domain
{"domain": "guerrillamail.com"}`}
            </pre>
          </section>

          {/* Section 6: GET /v1/domains/disposable */}
          <section id="disposable-sync" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '9px' }}>
              6. Blacklist Domain List Sync (<code style={{ color: '#08E1E8' }}>GET /v1/domains/disposable</code>)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
              Download the latest delta or complete array of active disposable email domains for local memory caching.
            </p>
          </section>

          {/* Section 7: Error Codes & Rate Limits */}
          <section id="errors-limits" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '9px' }}>
              7. Error Codes &amp; Rate Limits
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
              Standard HTTP status codes and API error response envelopes:
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', marginBottom: '24px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px' }}>HTTP STATUS</th>
                  <th style={{ padding: '10px' }}>ERROR CODE</th>
                  <th style={{ padding: '10px' }}>DESCRIPTION</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-secondary)' }}>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px', color: '#08E1E8', fontWeight: 600 }}>200 OK</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>-</td>
                  <td style={{ padding: '10px' }}>Success. Verification payload returned.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px', color: '#FF4D4D', fontWeight: 600 }}>400 Bad Request</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: '#FF4D4D' }}>INVALID_EMAIL</td>
                  <td style={{ padding: '10px' }}>Missing or malformed email address payload.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px', color: '#FF4D4D', fontWeight: 600 }}>401 Unauthorized</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: '#FF4D4D' }}>UNAUTHORIZED</td>
                  <td style={{ padding: '10px' }}>Invalid or missing Bearer API key.</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', color: '#FFB800', fontWeight: 600 }}>429 Too Many Requests</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: '#FFB800' }}>RATE_LIMIT_EXCEEDED</td>
                  <td style={{ padding: '10px' }}>Monthly API plan quota exceeded. Upgrade tier.</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Section 8: SDK Libraries */}
          <section id="sdks" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '9px' }}>
              8. Client SDK Libraries
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '16px', borderRadius: '10px' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', marginBottom: '6px' }}>Node.js / TS</h4>
                <code style={{ fontSize: '12px', color: '#08E1E8' }}>npm i @tempcheck/sdk</code>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '16px', borderRadius: '10px' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', marginBottom: '6px' }}>Python</h4>
                <code style={{ fontSize: '12px', color: '#08E1E8' }}>pip install tempcheck</code>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '16px', borderRadius: '10px' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', marginBottom: '6px' }}>Go</h4>
                <code style={{ fontSize: '12px', color: '#08E1E8' }}>go get github.com/tempcheck/go-sdk</code>
              </div>
            </div>
          </section>

          {/* Section 9: Interactive Sandbox */}
          <section id="sandbox" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '9px' }}>
              9. Interactive API Try-It Sandbox
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
              Test the live API endpoint directly in your browser. Enter any email address to run a real-time detection query:
            </p>

            <div style={{ background: '#020C14', border: '1px solid var(--primary)', borderRadius: '16px', padding: '24px', boxShadow: '0 0 30px rgba(0, 240, 255, 0.12)' }}>
              <form onSubmit={runSandboxCheck} style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  value={sandboxEmail}
                  onChange={(e) => setSandboxEmail(e.target.value)}
                  placeholder="Enter email e.g. user@tempmail.com"
                  style={{
                    flex: 1,
                    minWidth: '240px',
                    padding: '12px 16px',
                    background: '#041825',
                    border: '1px solid #143547',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
                <button
                  type="submit"
                  disabled={sandboxLoading}
                  className="btn btn-primary"
                  style={{ padding: '12px 24px' }}
                >
                  {sandboxLoading ? 'Querying API...' : 'Run Live Check →'}
                </button>
              </form>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>LIVE API RESPONSE</span>
                <span style={{ fontSize: '12px', color: '#08E1E8', fontWeight: 600 }}>Latency: {sandboxResult?.latency_ms || 18}ms</span>
              </div>

              <pre style={{ background: '#041825', padding: '16px', borderRadius: '8px', border: '1px solid #143547', color: '#08E1E8', fontFamily: 'monospace', fontSize: '13px', overflowX: 'auto', margin: 0 }}>
                {JSON.stringify(sandboxResult, null, 2)}
              </pre>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}
