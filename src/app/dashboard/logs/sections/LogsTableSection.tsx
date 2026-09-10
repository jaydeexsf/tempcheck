'use client';

import React from 'react';

const logs = [
  { email: 'user_7f3a2c1e@temp-mail.com', result: 'Disposable', latency: '18ms', key: 'Production App Backend', time: '2026-09-09 11:42:17' },
  { email: 'client_9b4e7d2f@protonmail.com', result: 'Valid', latency: '14ms', key: 'Production App Backend', time: '2026-09-09 11:41:03' },
  { email: 'signup_c81a04b2@mailinator.com', result: 'Disposable', latency: '21ms', key: 'Staging Testing Server', time: '2026-09-09 11:39:44' },
  { email: 'ops_lead@acmecorp.io', result: 'Valid', latency: '16ms', key: 'Production App Backend', time: '2026-09-09 11:36:12' },
  { email: 'trial_44d19ae0@guerrillamail.com', result: 'High Risk', latency: '24ms', key: 'Staging Testing Server', time: '2026-09-09 11:33:58' },
  { email: 'finance@northwind.dev', result: 'Valid', latency: '15ms', key: 'Production App Backend', time: '2026-09-09 11:31:09' },
  { email: 'test@10minutemail.com', result: 'Disposable', latency: '19ms', key: 'Staging Testing Server', time: '2026-09-09 11:22:41' },
];

export default function LogsTableSection() {
  return (
    <section>
      <div className="dash-page-head">
        <h1>Logs</h1>
        <p>A live-looking stream of email checks processed by your keys.</p>
      </div>
      <div className="dash-panel">
        <div className="dash-panel-head">
          <h2>Request telemetry</h2>
          <span className="dash-status-row" style={{ marginTop: 0 }}>
            <span className="dash-dot" />
            Live feed
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>EMAIL</th>
                <th>RESULT</th>
                <th>LATENCY</th>
                <th>KEY</th>
                <th>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.email + log.time}>
                  <td className="dash-email">{log.email}</td>
                  <td>
                    <span className={`dash-pill ${log.result === 'Valid' ? 'green' : log.result === 'High Risk' ? 'yellow' : 'red'}`}>
                      {log.result}
                    </span>
                  </td>
                  <td className="dash-latency">{log.latency}</td>
                  <td>{log.key}</td>
                  <td>{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
