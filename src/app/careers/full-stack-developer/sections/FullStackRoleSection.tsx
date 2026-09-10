'use client';

import React from 'react';
import CareerRoleLayout, { type CareerRoleContent } from '../../sections/CareerRoleLayout';

const job: CareerRoleContent = {
  title: 'Full Stack Developer',
  salary: 'R10 000 / month',
  location: 'Remote / Cape Town',
  openings: '1 opening',
  experience: '3+ years',
  type: 'Full-time',
  summary:
    'Own the TempCheck product end to end: marketing site, developer dashboard, live email checker, and the API-backed flows that turn a lookup into a decision operators can trust.',
  about:
    'TempCheck is a developer platform for disposable email detection. Customers hit a REST API; they also live in a dashboard with checker, API keys, domains, logs, settings, and help. You will ship both the public Next.js experience and the authenticated product UI, wiring them to backend services without letting polish or reliability slip. We need someone who has already owned features across the stack for at least three years — not a first production role.',
  workOn: [
    'The public site: homepage, docs-style API examples, pricing, SLA, integrations, and careers — consistent with our dark cyan design system.',
    'The post-login dashboard: overview metrics, email checker playground, API key management, domain lists, request logs, settings, and help.',
    'Auth and session flows (login, signup, protected routes) so product access stays simple and safe.',
    'Frontend to API contracts: lookup results, confidence, disposable vs legitimate states, and empty / error / loading behaviour.',
    'Internal UX for developers: copyable snippets, keys, logs tables, and settings that match how real teams use an email-trust API.',
  ],
  responsibilities: [
    'Ship customer-facing and dashboard features in React / Next.js with TypeScript, matching existing page and section patterns.',
    'Connect UI to backend APIs for checks, keys, domains, and logs — including validation, error states, and optimistic-safe updates.',
    'Keep layout, typography, and interaction quality aligned with the current TempCheck visual language (navy, cyan, sharp cards).',
    'Improve performance of data-heavy views (logs, domain lists) without hiding data behind vague placeholders.',
    'Collaborate with backend engineers on contracts, pagination, and auth so the dashboard stays honest about what the API can do.',
    'Write maintainable section-based pages, review PRs, and leave the codebase easier to extend than you found it.',
    'Occasionally touch backend routes or data models when a feature is blocked on a small API change.',
  ],
  requirements: [
    '3+ years of professional full stack development (this is a hard minimum).',
    'Strong production experience with React and Next.js (App Router, client/server components) and TypeScript.',
    'Proven work on both UI and backend APIs in the same product — not frontend-only with a thin fetch wrapper.',
    'Comfort with REST, auth sessions or tokens, forms, tables, and dashboard-style product surfaces.',
    'Ability to implement accessible, responsive layouts and keep visual consistency without a large design team.',
    'Judgement on product details: empty states, copy, loading, and what a developer actually needs on an API platform.',
    'Clear written communication and comfort owning a feature from spec to production.',
  ],
  niceToHave: [
    'Email verification, fraud, or developer-tooling products.',
    'Design systems, CSS architecture, or high-craft marketing + app UIs on one codebase.',
    'Node.js / PostgreSQL experience so you can pair tightly with the two backend engineers we are hiring.',
    'Experience with API docs, code samples, or SDK-adjacent UI.',
    'Testing of UI flows (checker, auth, settings) and basic e2e coverage.',
  ],
  stack: [
    'React',
    'Next.js',
    'TypeScript',
    'REST APIs',
    'Auth & sessions',
    'Dashboard UX',
    'Node.js',
    'CSS / design system',
  ],
};

export default function FullStackRoleSection() {
  return <CareerRoleLayout job={job} />;
}
