'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutInfrastructureSection() {
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
          padding: '32px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <div style={{ flex: '1 1 340px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: 'var(--primary)',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              padding: '3px 8px',
              borderRadius: '2px',
              display: 'inline-block',
              marginBottom: '10px',
            }}
          >
            GLOBAL NETWORK
          </span>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '7px' }}>
            Multi-Region High Availability Architecture
          </h2>
          <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Our infrastructure dynamically routes incoming requests to the nearest edge PoP (Point of Presence), guaranteeing low latency whether your servers are in North America, Europe, Asia-Pacific, or South America.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/docs" className="btn btn-primary" style={{ borderRadius: '2px !important' }}>
              Explore Documentation &rarr;
            </Link>
            <Link href="/status" className="btn btn-secondary" style={{ borderRadius: '2px !important' }}>
              View System Status
            </Link>
          </div>
        </div>

        <div
          style={{
            flex: '1 1 300px',
            background: 'var(--bg-main)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '2px',
            padding: '20px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ color: 'var(--primary)', marginBottom: '8px', fontWeight: 700 }}>
            $ tempcheck status --region global
          </div>
          <div style={{ marginBottom: '4px' }}>✔ us-east-1 (N. Virginia): <span style={{ color: '#00F0FF' }}>12ms</span></div>
          <div style={{ marginBottom: '4px' }}>✔ eu-west-1 (Frankfurt): <span style={{ color: '#00F0FF' }}>16ms</span></div>
          <div style={{ marginBottom: '4px' }}>✔ ap-southeast-1 (Singapore): <span style={{ color: '#00F0FF' }}>22ms</span></div>
          <div style={{ marginBottom: '4px' }}>✔ sa-east-1 (São Paulo): <span style={{ color: '#00F0FF' }}>28ms</span></div>
          <div style={{ color: 'var(--text-muted)', marginTop: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
            Health: 100% Operational | Latency Avg: 18ms
          </div>
        </div>
      </div>
    </section>
  );
}
