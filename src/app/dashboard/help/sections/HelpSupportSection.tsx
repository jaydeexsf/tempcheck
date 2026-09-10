'use client';

import React from 'react';
import Link from 'next/link';

export default function HelpSupportSection() {
  return (
    <section>
      <div className="dash-page-head">
        <h1>Help &amp; Support</h1>
        <p>Docs, SLA, and a direct line if something is blocking a launch.</p>
      </div>
      <div className="dash-grid-2">
        <div className="dash-panel" style={{ padding: 22 }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Documentation</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>Authentication headers, request shapes, and rate limits.</p>
          <Link href="/docs" className="dash-link">Open API docs →</Link>
        </div>
        <div className="dash-panel" style={{ padding: 22 }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Status &amp; SLA</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>Uptime targets and the public status page.</p>
          <Link href="/status" className="dash-link">View status →</Link>
        </div>
        <div className="dash-panel" style={{ padding: 22 }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>FAQ</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>Billing, quota pooling, and integration questions.</p>
          <Link href="/faq" className="dash-link">Read FAQ →</Link>
        </div>
        <div className="dash-panel" style={{ padding: 22 }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Contact</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>Talk to the team about volume, SOC 2, or a custom dataset.</p>
          <Link href="/contact" className="dash-link">Contact support →</Link>
        </div>
      </div>
    </section>
  );
}
