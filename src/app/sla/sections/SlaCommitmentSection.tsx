'use client';

import React from 'react';

export default function SlaCommitmentSection() {
  const creditSchedule = [
    { uptime: '< 99.9% but ≥ 99.0%', credit: '10% Service Credit' },
    { uptime: '< 99.0% but ≥ 95.0%', credit: '25% Service Credit' },
    { uptime: '< 95.0%', credit: '50% Service Credit' },
  ];

  return (
    <section
      style={{
        padding: '0 24px 48px 24px',
        maxWidth: '1140px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Commitment Box */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '2px',
            padding: '20px',
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Monthly Uptime Percentage
          </h2>
          <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Monthly Uptime Percentage is calculated by subtracting from 100% the percentage of 5-minute intervals during the month in which TempCheck production API endpoints were in a state of &quot;Unavailability&quot;.
          </p>
          <div
            style={{
              background: 'rgba(0, 240, 255, 0.04)',
              borderLeft: '2px solid var(--primary)',
              padding: '10px 14px',
              borderRadius: '2px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
            }}
          >
            <strong>Excluded Downtime:</strong> Scheduled maintenance announced ≥ 48 hours in advance or force majeure events are excluded from SLA calculations.
          </div>
        </div>

        {/* Credit Schedule Box */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '2px',
            padding: '20px',
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Service Credit Schedule
          </h2>
          <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '12px' }}>
            If TempCheck fails to meet the 99.9% uptime commitment during a billing cycle, paid customers are eligible to claim service credits according to the schedule below:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {creditSchedule.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '10px 12px',
                  fontSize: '12.5px',
                }}
              >
                <span style={{ color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace" }}>{item.uptime}</span>
                <strong style={{ color: 'var(--primary)' }}>{item.credit}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
