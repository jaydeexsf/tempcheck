'use client';

import React from 'react';
import Link from 'next/link';

export default function SlaMetricsSection() {
  return (
    <section
      style={{
        padding: '0 24px 44px 24px',
        maxWidth: '1140px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '2px',
          padding: '20px 20px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Real-Time Telemetry &amp; Claim Process
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          To request an SLA credit, submit a claim ticket within 30 days of the incident to support@tempcheck.io.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link href="/status" className="btn btn-primary" style={{ borderRadius: '2px !important' }}>
            Check Live Uptime Telemetry &rarr;
          </Link>
          <Link href="/contact" className="btn btn-secondary" style={{ borderRadius: '2px !important' }}>
            Submit SLA Claim Ticket
          </Link>
        </div>
      </div>
    </section>
  );
}
