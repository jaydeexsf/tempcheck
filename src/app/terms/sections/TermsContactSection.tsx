'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsContactSection() {
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
          padding: '36px 28px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '10px',
              letterSpacing: '-0.01em',
            }}
          >
            Have Questions About Our Legal Terms?
          </h2>
          <p
            style={{
              fontSize: '13.5px',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              marginBottom: '24px',
            }}
          >
            Our legal and compliance engineering team is ready to assist with custom enterprise SLAs, Data Processing Addendums (DPA), or developer platform policies.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <Link
              href="/contact"
              className="btn btn-primary"
              style={{ borderRadius: '2px !important' }}
            >
              Contact Legal Team &rarr;
            </Link>

            <Link
              href="/privacy"
              className="btn btn-secondary"
              style={{ borderRadius: '2px !important' }}
            >
              View Privacy Policy
            </Link>

            <Link
              href="/docs"
              className="btn btn-secondary"
              style={{ borderRadius: '2px !important' }}
            >
              Explore Developer Docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
