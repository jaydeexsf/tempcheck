'use client';

import React from 'react';

export default function AboutHeroSection() {
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
          Company &amp; Infrastructure
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
          Powering Real-Time <span className="accent">Developer Verification</span>
        </h1>

        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            margin: '0 auto 24px auto',
          }}
        >
          TempCheck builds high-performance telemetry APIs, weather verification engines, and disposable email detection systems relied on by thousands of developers globally.
        </p>

        {/* Stats Row with 2px border radius */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            maxWidth: '640px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '12px',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', fontFamily: "'JetBrains Mono', monospace" }}>
              500M+
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Monthly API Queries</div>
          </div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '12px',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#32F5FF', fontFamily: "'JetBrains Mono', monospace" }}>
              &lt; 18ms
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Average Response</div>
          </div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '12px',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'JetBrains Mono', monospace" }}>
              99.95%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Global Uptime</div>
          </div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '12px',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', fontFamily: "'JetBrains Mono', monospace" }}>
              140+
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Edge PoP Regions</div>
          </div>
        </div>
      </div>
    </section>
  );
}
