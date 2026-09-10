'use client';

import React, { useState } from 'react';

const knownDisposable = ['temp-mail.com', 'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com'];

export default function CheckerPlaygroundSection() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<{ email: string; disposable: boolean; domain: string; confidence: string } | null>(null);

  const onCheck = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim().toLowerCase();
    const domain = trimmed.split('@')[1] || '';
    const disposable = knownDisposable.includes(domain);
    setResult({
      email: trimmed,
      domain: domain || 'unknown',
      disposable,
      confidence: disposable ? '0.99' : '0.12',
    });
  };

  return (
    <section>
      <div className="dash-page-head">
        <h1>Email Checker</h1>
        <p>Run a single address through TempCheck before you wire it into production.</p>
      </div>

      <div className="dash-checker">
        <div className="dash-panel" style={{ padding: 22 }}>
          <form onSubmit={onCheck}>
            <div className="dash-field">
              <span>EMAIL ADDRESS</span>
              <div className="dash-input-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@temp-mail.com"
                  required
                />
                <button type="submit" className="btn btn-primary">Check</button>
              </div>
            </div>
          </form>

          {result && (
            <div className="dash-result-card">
              <span className={`dash-pill ${result.disposable ? 'red' : 'green'}`}>
                {result.disposable ? 'Disposable' : 'Valid'}
              </span>
              <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
                <div className="dash-status-item"><span>Address</span><strong>{result.email}</strong></div>
                <div className="dash-status-item"><span>Domain</span><strong>{result.domain}</strong></div>
                <div className="dash-status-item"><span>Type</span><strong>{result.disposable ? 'temporary' : 'legitimate'}</strong></div>
                <div className="dash-status-item"><span>Confidence</span><strong>{result.confidence}</strong></div>
              </div>
            </div>
          )}
        </div>

        <div className="dash-panel" style={{ padding: 22 }}>
          <h2 style={{ fontSize: 16, marginBottom: 10 }}>What this returns</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>
            This playground uses a small local sample list so you can feel the flow. Live lookups will attach to the API later.
          </p>
        </div>
      </div>
    </section>
  );
}
