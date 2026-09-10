'use client';

import React from 'react';
import Link from 'next/link';
import { UserSession, ApiKeyItem } from '@/utils/auth';

interface Props {
  session: UserSession;
  apiKeys: ApiKeyItem[];
}

export default function UsageOverviewSection({ session, apiKeys }: Props) {
  // Aggregate shared request usage across all active API keys
  const totalRequestsUsed = apiKeys.reduce((acc, k) => acc + (k.status === 'active' ? k.requestsUsed : 0), 0);
  const totalQuota = session.monthlyQuota;
  const usagePercentage = Math.min(100, Math.round((totalRequestsUsed / totalQuota) * 100));
  const isDepleted = totalRequestsUsed >= totalQuota;
  const isWarning = usagePercentage >= 80 && !isDepleted;
  const activeKeysCount = apiKeys.filter(k => k.status === 'active').length;

  return (
    <div style={{ marginBottom: '36px' }}>
      {/* Depleted / Warning Alert Banner */}
      {isDepleted && (
        <div style={{
          background: 'rgba(255, 77, 77, 0.12)',
          border: '1px solid #FF4D4D',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🚨</span>
            <div>
              <h4 style={{ color: '#FF4D4D', fontSize: '15px', fontWeight: 700, margin: 0 }}>
                Monthly Shared API Quota Depleted ({totalRequestsUsed.toLocaleString()} / {totalQuota.toLocaleString()})
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '2px 0 0 0' }}>
                Your API keys have consumed 100% of your shared monthly request limit. Upgrade to Pro or Scale to continue receiving sub-50ms checks.
              </p>
            </div>
          </div>
          <Link href="/pricing" className="btn btn-primary" style={{ background: '#FF4D4D', color: '#FFF', border: 'none' }}>
            Upgrade Plan Now →
          </Link>
        </div>
      )}

      {isWarning && (
        <div style={{
          background: 'rgba(255, 184, 0, 0.12)',
          border: '1px solid #FFB800',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <div>
              <h4 style={{ color: '#FFB800', fontSize: '15px', fontWeight: 700, margin: 0 }}>
                High Shared Quota Usage Warning ({usagePercentage}% Consumed)
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '2px 0 0 0' }}>
                You have used {totalRequestsUsed.toLocaleString()} out of {totalQuota.toLocaleString()} monthly checks across your active API keys.
              </p>
            </div>
          </div>
          <Link href="/pricing" className="btn btn-secondary" style={{ borderColor: '#FFB800', color: '#FFB800' }}>
            Upgrade Quota →
          </Link>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        {/* Card 1: Shared Usage Meter */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>SHARED MONTHLY QUOTA</span>
            <span style={{ fontSize: '12px', color: isDepleted ? '#FF4D4D' : '#08E1E8', fontWeight: 700 }}>{usagePercentage}%</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
            {totalRequestsUsed.toLocaleString()} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>/ {totalQuota.toLocaleString()}</span>
          </div>
          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: '#020C14', borderRadius: '4px', overflow: 'hidden', border: '1px solid #143547' }}>
            <div style={{
              height: '100%',
              width: `${usagePercentage}%`,
              background: isDepleted ? '#FF4D4D' : usagePercentage >= 80 ? '#FFB800' : 'linear-gradient(90deg, #08E1E8, #00F0FF)',
              boxShadow: isDepleted ? '0 0 10px #FF4D4D' : '0 0 10px #08E1E8',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Card 2: Active API Keys */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '14px', padding: '24px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
            ACTIVE API KEYS
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {activeKeysCount} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>keys active</span>
          </div>
          <p style={{ fontSize: '12px', color: '#08E1E8', margin: 0 }}>
            Pooling shared quota pool
          </p>
        </div>

        {/* Card 3: Average Latency */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '14px', padding: '24px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
            AVG API RESPONSE TIME
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#08E1E8', marginBottom: '4px' }}>
            18ms
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Global Edge SLA &lt; 50ms
          </p>
        </div>

        {/* Card 4: Detection Accuracy */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '14px', padding: '24px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
            DISPOSABLE DETECTION
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            99.9%
          </div>
          <p style={{ fontSize: '12px', color: '#08E1E8', margin: 0 }}>
            Zero false positives for corporate
          </p>
        </div>

      </div>
    </div>
  );
}
