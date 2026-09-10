'use client';

import React from 'react';
import Link from 'next/link';
import { UserSession } from '@/utils/auth';

interface Props {
  session: UserSession;
}

export default function DashboardHeaderSection({ session }: Props) {
  const planName = session.plan.toUpperCase();
  const quotaFormatted = new Intl.NumberFormat('en-US').format(session.monthlyQuota);

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Welcome back, {session.name}
          </h1>
          <span style={{
            background: 'rgba(8, 225, 232, 0.12)',
            border: '1px solid rgba(8, 225, 232, 0.3)',
            color: '#08E1E8',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '12px',
            textTransform: 'uppercase'
          }}>
            {planName} PLAN
          </span>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Real-time disposable email checks telemetry and API key controls.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Link href="/pricing" className="btn btn-secondary" style={{ fontSize: '13px', padding: '10px 16px' }}>
          ⚡ Upgrade Tier ({quotaFormatted} Checks/mo)
        </Link>
      </div>
    </header>
  );
}
