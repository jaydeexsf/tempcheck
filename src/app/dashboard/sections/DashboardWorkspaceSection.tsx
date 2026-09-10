'use client';

import React from 'react';
import Link from 'next/link';

const rows = [
  { email: 'user_7f3a2c1e@temp-mail.com', status: 'Disposable', tone: 'red', type: 'Temporary', time: '2026-09-09 11:42:17' },
  { email: 'client_9b4e7d2f@protonmail.com', status: 'Valid', tone: 'green', type: 'Legitimate', time: '2026-09-09 11:41:03' },
  { email: 'signup_c81a04b2@mailinator.com', status: 'Disposable', tone: 'red', type: 'Temporary', time: '2026-09-09 11:39:44' },
  { email: 'ops_lead@acmecorp.io', status: 'Valid', tone: 'green', type: 'Legitimate', time: '2026-09-09 11:36:12' },
  { email: 'trial_44d19ae0@guerrillamail.com', status: 'High Risk', tone: 'yellow', type: 'Suspicious', time: '2026-09-09 11:33:58' },
  { email: 'finance@northwind.dev', status: 'Valid', tone: 'green', type: 'Legitimate', time: '2026-09-09 11:31:09' },
];

export default function DashboardWorkspaceSection() {
  return (
    <section className="dash-workspace">
      <div className="dash-panel">
        <div className="dash-panel-head">
          <h2>Recent Activity</h2>
          <Link href="/dashboard/logs" className="dash-link">View all logs →</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>EMAIL ADDRESS</th>
                <th>STATUS</th>
                <th>TYPE</th>
                <th>TIMESTAMP</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.email}>
                  <td className="dash-email">{row.email}</td>
                  <td><span className={`dash-pill ${row.tone}`}>{row.status}</span></td>
                  <td>{row.type}</td>
                  <td>{row.time}</td>
                  <td style={{ color: 'var(--text-muted)' }}>→</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dash-side-stack">
        <div className="dash-panel">
          <div className="dash-panel-head">
            <h2>Protection Status</h2>
            <span className="dash-status-row" style={{ marginTop: 0 }}>
              <span className="dash-dot" />
              All systems operational
            </span>
          </div>
          <div className="dash-status-list">
            <div className="dash-status-item">
              <span>API connection</span>
              <strong>Active</strong>
            </div>
            <div className="dash-status-item">
              <span>Domain monitoring</span>
              <strong>Active · 10.2M+</strong>
            </div>
            <div className="dash-status-item">
              <span>Database</span>
              <strong>Updated 2 min ago</strong>
            </div>
          </div>
        </div>

        <div className="dash-panel dash-health-panel">
          <div className="dash-panel-head">
            <h2>API Health</h2>
            <span className="dash-pill green">Healthy</span>
          </div>
          <div className="dash-status-item">
            <span>Response time</span>
            <strong>18ms avg</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
