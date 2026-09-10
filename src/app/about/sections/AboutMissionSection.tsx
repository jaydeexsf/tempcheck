'use client';

import React from 'react';

export default function AboutMissionSection() {
  const principles = [
    {
      title: 'Sub-50ms Global Speed',
      desc: 'Engineered on edge workers deployed across 140+ data centers to deliver instant verification responses.',
      icon: '⚡',
    },
    {
      title: 'Zero False Positives',
      desc: 'Multi-layer validation algorithms cross-reference live MX records, domain age, and sensor telemetry.',
      icon: '🎯',
    },
    {
      title: 'Developer First Simplicity',
      desc: 'Clean REST APIs, client SDKs for major languages, and instant key provision with clear documentation.',
      icon: '🛠️',
    },
    {
      title: 'Enterprise Grade SLA',
      desc: 'Backed by 99.9% uptime commitments, SOC2/GDPR compliance, and 24/7 dedicated engineering support.',
      icon: '🛡️',
    },
  ];

  return (
    <section
      style={{
        padding: '0 24px 40px 24px',
        maxWidth: '1140px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Our Engineering Pillars
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}
      >
        {principles.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '20px',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
          >
            <div style={{ width: '42px', height: '42px', display: 'grid', placeItems: 'center', marginBottom: '10px', color: 'var(--primary)', background: 'linear-gradient(145deg, rgba(0, 240, 255, 0.22), rgba(0, 74, 94, 0.4))', border: '1px solid rgba(0, 240, 255, 0.35)', borderRadius: '4px', boxShadow: 'inset 0 0 14px rgba(0, 240, 255, 0.12), 0 6px 16px rgba(0, 0, 0, 0.25)', fontSize: '20px', transform: 'perspective(80px) rotateX(6deg)' }}>{item.icon}</div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '6px',
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: '12px',
                lineHeight: 1.5,
                color: 'var(--text-secondary)',
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
