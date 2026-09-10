'use client';

import React from 'react';

export default function CareersHeroSection() {
  return (
    <section
      style={{
        maxWidth: '1140px',
        width: '100%',
        margin: '0 auto',
        padding: '42px 24px 18px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
        <div
          className="eyebrow"
          style={{
            margin: '0 auto 16px',
            borderRadius: '2px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span className="dot" />
          Careers
        </div>

        <h1
          style={{
            margin: '0 0 12px',
            fontSize: 'clamp(24px, 2.7vw, 34px)',
            lineHeight: 1.12,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
          }}
        >
          Build modern infrastructure for trusted digital experiences.
        </h1>

        <p
          style={{
            margin: '0 auto',
            maxWidth: '680px',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}
        >
          We are hiring two backend engineers and one full stack developer to build TempCheck — real-time disposable email detection, domain intelligence, and the dashboard teams use to run it. Quality, latency, and security are the job.
        </p>
      </div>
    </section>
  );
}
