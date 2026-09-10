'use client';

import React from 'react';
import CareerRoleLayout, { type CareerRoleContent } from '../../sections/CareerRoleLayout';

const job: CareerRoleContent = {
  title: 'Backend Engineer',
  salary: 'R8 000 / month',
  location: 'Remote / Cape Town',
  openings: '2 openings',
  experience: '2+ years',
  type: 'Full-time',
  summary:
    'We are hiring two backend engineers to own the services behind TempCheck: real-time disposable email detection, domain intelligence, API keys, and the lookup path that has to stay fast under load.',
  about:
    'TempCheck is an email-trust API used at signup. A request comes in with an address; we classify the domain, score risk, and return a decision in milliseconds. You will work on the production API, dataset pipelines, rate limiting, and the systems that keep 99.9% uptime real rather than a slide in a deck. This is not a ticket farm — two engineers will share ownership of core backend surfaces and ship with a small team.',
  workOn: [
    'The public REST lookup API: validation, confidence scores, reason codes, and stable response contracts for customer integrations.',
    'Domain intelligence: ingesting and refreshing a large disposable / temporary domain dataset, MX and provider signals, and allow / deny list overrides.',
    'API key auth, per-key rate limits, request logging, and the data the dashboard Logs and API pages depend on.',
    'Latency and reliability work: caching, timeouts, graceful degradation, and operational metrics that match our SLA story.',
    'Background jobs for dataset sync, abuse detection on keys, and internal tooling that keeps the checker accurate as new throwaway providers appear.',
  ],
  responsibilities: [
    'Design, build, and operate backend services that power email checks and trust decisions in production.',
    'Keep the lookup path correct and fast: input validation, scoring, caching, and clear error behaviour.',
    'Own observability — structured logs, traces, and alerts — so incidents are diagnosable without guesswork.',
    'Harden authentication, key scoping, and rate limiting so customer traffic cannot starve the platform.',
    'Write tests around scoring edge cases (disposable, high-risk, legitimate, malformed) and document API changes.',
    'Work with full stack and product on dashboard-facing endpoints for keys, domains, logs, and usage.',
    'Participate in reviews, on-call style ownership of what you ship, and small architecture decisions as we scale.',
  ],
  requirements: [
    '2+ years of professional backend engineering experience (this is a hard minimum).',
    'Production work in Node.js, Python, or Go, with strong TypeScript or typed API design a plus.',
    'Solid REST API design: versioning, auth, idempotency, status codes, and backwards-compatible changes.',
    'Hands-on with relational or document databases, indexes, and query performance for high-read lookup traffic.',
    'Comfort with async processing, queues or scheduled jobs, and at-least-once vs exactly-once tradeoffs.',
    'Experience shipping to production: logging, debugging live issues, and writing code other people can operate.',
    'Clear written communication — we are a small remote-friendly team.',
  ],
  niceToHave: [
    'Email, DNS, MX records, or fraud / abuse systems.',
    'Redis, edge caching, or API gateways used for sub-100ms reads.',
    'PostgreSQL, Redis, or similar stores used at real traffic, not only tutorials.',
    'Security basics: hashing tokens, secrets handling, and abuse-resistant public APIs.',
    'Familiarity with Next.js API routes or similar JS backends, since our product surface is JavaScript-heavy.',
  ],
  stack: [
    'Node.js / TypeScript',
    'REST APIs',
    'PostgreSQL',
    'Redis',
    'Background jobs',
    'API keys & rate limits',
    'Observability',
    'Docker',
  ],
};

export default function BackendRoleSection() {
  return <CareerRoleLayout job={job} />;
}
