'use client';

import React from 'react';

export default function BlogHeroSection() {
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
          Engineering &amp; Security Blog
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
          Developer Insights &amp; <span className="accent">Security Research</span>
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
          Deep dives into low-latency API architecture, fraud prevention algorithms, global edge infrastructure, and real-time data verification.
        </p>
      </div>
    </section>
  );
}
