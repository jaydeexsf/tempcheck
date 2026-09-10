'use client';

import React from 'react';

export default function SlaHeroSection() {
  return (
    <section
      style={{
        padding: '38px 24px 22px 24px',
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
          Service Level Agreement
        </div>

        <h1
          style={{
            fontSize: 'clamp(22px, 2.2vw, 29px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}
        >
          99.9% Uptime SLA &amp; <span className="accent">Performance Guarantee</span>
        </h1>

        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            margin: '0 auto',
          }}
        >
          We guarantee 99.9% monthly uptime for all production tier API endpoints. Review our SLA commitments, credit refund schedule, and availability telemetry.
        </p>
      </div>
    </section>
  );
}
