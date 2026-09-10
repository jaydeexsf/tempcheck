'use client';

import React from 'react';
import Link from 'next/link';

export default function FaqContactSection() {
  return (
    <section
      style={{
        padding: '0 24px 60px 24px',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '2px',
          padding: '28px 20px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Still Have Unanswered Questions?
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Our engineering support team is available 24/7 to answer custom integration inquiries.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link href="/contact" className="btn btn-primary" style={{ borderRadius: '2px !important' }}>
            Contact Engineering Support &rarr;
          </Link>
          <Link href="/docs" className="btn btn-secondary" style={{ borderRadius: '2px !important' }}>
            Read Developer Docs
          </Link>
        </div>
      </div>
    </section>
  );
}
