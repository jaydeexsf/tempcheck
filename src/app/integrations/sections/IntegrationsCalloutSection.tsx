'use client';

import React from 'react';
import Link from 'next/link';

export default function IntegrationsCalloutSection() {
  return (
    <section
      style={{
        padding: '0 24px 60px 24px',
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
          padding: '28px 24px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Need an Integration for a Custom Language or Framework?
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Our engineering team builds custom SDK wrappers and webhooks for enterprise deployments.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link href="/contact" className="btn btn-primary" style={{ borderRadius: '2px !important' }}>
            Request SDK / Integration &rarr;
          </Link>
          <Link href="/docs" className="btn btn-secondary" style={{ borderRadius: '2px !important' }}>
            View OpenAPI Spec
          </Link>
        </div>
      </div>
    </section>
  );
}
