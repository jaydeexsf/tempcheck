'use client';

import React from 'react';

export default function FaqHeroSection() {
  return (
    <section
      style={{
        padding: '48px 24px 28px 24px',
        maxWidth: '1140px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <div
          className="eyebrow"
          style={{
            margin: '0 auto 16px auto',
            borderRadius: '2px',
          }}
        >
          <span className="dot" />
          Knowledge Base &amp; FAQ
        </div>

        <h1
          style={{
            fontSize: 'clamp(24px, 2.5vw, 32px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}
        >
          Frequently Asked <span className="accent">Questions</span>
        </h1>

        <p
          style={{
            fontSize: '13.5px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            margin: '0 auto',
          }}
        >
          Find answers to common developer questions regarding API keys, rate limits, pricing tiers, accuracy guarantees, and custom enterprise integrations.
        </p>
      </div>
    </section>
  );
}
