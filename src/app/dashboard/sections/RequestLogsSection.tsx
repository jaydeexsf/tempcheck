'use client';

import React from 'react';
import { ApiRequestLog } from '@/utils/auth';

interface Props {
  logs: ApiRequestLog[];
}

export default function RequestLogsSection({ logs }: Props) {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '16px', padding: '28px' }}>
      
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Recent API Request Telemetry
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
            Live log stream of disposable email checks processed by your API keys.
          </p>
        </div>
        <span style={{ fontSize: '12px', color: '#08E1E8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#08E1E8', boxShadow: '0 0 8px #08E1E8' }}></span>
          Live Feed
        </span>
      </div>

      {/* Logs Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 10px' }}>EMAIL CHECKED</th>
              <th style={{ padding: '12px 10px' }}>DOMAIN</th>
              <th style={{ padding: '12px 10px' }}>DETECTION RESULT</th>
              <th style={{ padding: '12px 10px' }}>KEY USED</th>
              <th style={{ padding: '12px 10px' }}>LATENCY</th>
              <th style={{ padding: '12px 10px', textAlign: 'right' }}>TIMESTAMP</th>
            </tr>
          </thead>
          <tbody style={{ color: 'var(--text-secondary)' }}>
            {logs.map(log => (
              <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 10px', color: '#FFF', fontWeight: 500, fontFamily: 'monospace' }}>
                  {log.email}
                </td>
                <td style={{ padding: '14px 10px' }}>{log.domain}</td>
                <td style={{ padding: '14px 10px' }}>
                  {log.disposable ? (
                    <span style={{ background: 'rgba(255, 77, 77, 0.15)', color: '#FF4D4D', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                      ⚠️ DISPOSABLE
                    </span>
                  ) : (
                    <span style={{ background: 'rgba(8, 225, 232, 0.15)', color: '#08E1E8', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                      ✓ CLEAN / NORMAL
                    </span>
                  )}
                </td>
                <td style={{ padding: '14px 10px', fontSize: '12px' }}>{log.keyName}</td>
                <td style={{ padding: '14px 10px', color: '#08E1E8', fontWeight: 600 }}>{log.latencyMs}ms</td>
                <td style={{ padding: '14px 10px', textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)' }}>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
