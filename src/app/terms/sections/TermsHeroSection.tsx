'use client';

import React from 'react';

export default function TermsHeroSection() {
  const quickLinks = [
    { label: '1. Developer API', href: '#section-1' },
    { label: '2. Rate Limits & SLA', href: '#section-4' },
    { label: '3. Data & Privacy', href: '#section-5' },
    { label: '4. IP & Licensing', href: '#section-6' },
    { label: '5. Limitation of Liability', href: '#section-8' },
  ];

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
        {/* Eyebrow Tag using global .eyebrow style with 2px border radius */}
        <div
          className="eyebrow"
          style={{
            margin: '0 auto 16px auto',
            borderRadius: '2px',
          }}
        >
          <span className="dot" />
          Legal &amp; Developer Terms
        </div>

        {/* Main Title - Compact font size matching global .headline */}
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
          Terms of <span className="accent">Service</span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: '13.5px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            margin: '0 auto 24px auto',
          }}
        >
          These Terms of Service govern your developer access, API usage, verification services, and service level agreements (SLA) for the TempCheck platform.
        </p>

        {/* Metadata Badges with 2px border radius */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '6px 12px',
              fontSize: '12px',
              color: 'var(--text-secondary)',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>Last Updated:</span>{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Sept 8, 2026</strong>
          </div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '6px 12px',
              fontSize: '12px',
              color: 'var(--text-secondary)',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>Version:</span>{' '}
            <strong style={{ color: 'var(--primary)' }}>v2.4 SLA</strong>
          </div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '6px 12px',
              fontSize: '12px',
              color: 'var(--text-secondary)',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>Scope:</span>{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Global Developers</strong>
          </div>
        </div>

        {/* Quick Links with 2px border radius */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          {quickLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                padding: '5px 10px',
                borderRadius: '2px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.background = 'rgba(0, 240, 255, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
