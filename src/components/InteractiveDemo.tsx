'use client';

import React, { useState } from 'react';

const codeSnippets: Record<string, { req: string; res: (email: string, isDisposable: boolean, domain: string) => string }> = {
  cURL: {
    req: `curl -X POST https://api.tempcheck.io/v1/check \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@temp-mail.com"}'`,
    res: (email, isDisposable, domain) => `{
  "email": "${email}",
  "isDisposable": ${isDisposable},
  "domain": "${domain}",
  "type": "${isDisposable ? 'disposable' : 'legitimate'}",
  "riskLevel": "${isDisposable ? 'high' : 'low'}"
}`,
  },
  JavaScript: {
    req: `const res = await fetch('https://api.tempcheck.io/v1/check', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: 'user@temp-mail.com' })
});
const data = await res.json();`,
    res: (email, isDisposable, domain) => `{
  "email": "${email}",
  "isDisposable": ${isDisposable},
  "domain": "${domain}",
  "type": "${isDisposable ? 'disposable' : 'legitimate'}",
  "riskLevel": "${isDisposable ? 'high' : 'low'}"
}`,
  },
  Python: {
    req: `import requests

res = requests.post(
    "https://api.tempcheck.io/v1/check",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={"email": "user@temp-mail.com"}
)
data = res.json()`,
    res: (email, isDisposable, domain) => `{
  "email": "${email}",
  "isDisposable": ${isDisposable},
  "domain": "${domain}",
  "type": "${isDisposable ? 'disposable' : 'legitimate'}",
  "riskLevel": "${isDisposable ? 'high' : 'low'}"
}`,
  },
  'Node.js': {
    req: `import { TempCheck } from '@tempcheck/sdk';

const client = new TempCheck({ apiKey: process.env.API_KEY });
const result = await client.emails.check('user@temp-mail.com');`,
    res: (email, isDisposable, domain) => `{
  "email": "${email}",
  "isDisposable": ${isDisposable},
  "domain": "${domain}",
  "type": "${isDisposable ? 'disposable' : 'legitimate'}",
  "riskLevel": "${isDisposable ? 'high' : 'low'}"
}`,
  },
  PHP: {
    req: `<?php
$ch = curl_init('https://api.tempcheck.io/v1/check');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['email' => 'user@temp-mail.com']));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$res = json_decode(curl_exec($ch), true);`,
    res: (email, isDisposable, domain) => `{
  "email": "${email}",
  "isDisposable": ${isDisposable},
  "domain": "${domain}",
  "type": "${isDisposable ? 'disposable' : 'legitimate'}",
  "riskLevel": "${isDisposable ? 'high' : 'low'}"
}`,
  },
};

export default function InteractiveDemo() {
  const [email, setEmail] = useState('user@temp-mail.com');
  const [activeTab, setActiveTab] = useState<string>('cURL');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({
    email: 'user@temp-mail.com',
    isDisposable: true,
    domain: 'temp-mail.com',
    type: 'Disposable',
    riskLevel: 'High',
  });

  const knownDisposableDomains = [
    'temp-mail.com',
    'tempmail.com',
    'guerrillamail.com',
    '10minutemail.com',
    'mailinator.com',
    'yopmail.com',
    'dispostable.com',
    'trashmail.com',
  ];

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const parts = email.trim().toLowerCase().split('@');
      const domain = parts.length > 1 ? parts[1] : email.trim().toLowerCase();
      const isDisposable = knownDisposableDomains.some((d) => domain.includes(d));

      setResult({
        email: email.trim(),
        isDisposable,
        domain: domain || 'unknown.com',
        type: isDisposable ? 'Disposable' : 'Legitimate',
        riskLevel: isDisposable ? 'High' : 'Low',
      });
      setLoading(false);
    }, 300);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].req);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="demo-screenshot-section" id="demo">
      <div className="demo-panel-grid">
        {/* Left Column: Heading, Subhead, Input, Result Card */}
        <div className="demo-left-panel">
          <div className="demo-badge">
            <span className="sparkle">✦</span> INTERACTIVE DEMO
          </div>

          <h2 className="demo-headline">
            Check an email <br />
            <span className="cyan-glow-text">in real time.</span>
          </h2>

          <p className="demo-subhead">
            Test our API instantly. See if an email is valid, disposable, or temporary — in seconds.
          </p>

          <form onSubmit={handleCheck} className="demo-input-row">
            <div className="input-field-wrap">
              <svg className="mail-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M22 6L12 13L2 6" />
              </svg>
              <input
                type="email"
                className="custom-email-input"
                placeholder="user@temp-mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="cyan-action-btn" disabled={loading}>
              {loading ? (
                <span>Checking...</span>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Check Email
                </>
              )}
            </button>
          </form>

          {/* Result Card */}
          <div className={`result-card-box ${result.isDisposable ? 'card-blocked' : 'card-allowed'}`}>
            <div className="result-card-top">
              <div className="status-icon-circle">
                {result.isDisposable ? (
                  <span className="icon-cross">✕</span>
                ) : (
                  <span className="icon-check">✓</span>
                )}
              </div>
              <div className="status-title-group">
                <h4 className="status-main-title">
                  {result.isDisposable ? 'Disposable Email' : 'Legitimate Email'}
                </h4>
                <p className="status-sub-title">
                  {result.isDisposable
                    ? 'This email domain is disposable and temporary.'
                    : 'This email domain is clean and legitimate.'}
                </p>
              </div>
              <div className="status-action-badge">
                {result.isDisposable ? 'BLOCKED' : 'ALLOWED'}
              </div>
            </div>

            <div className="result-card-divider" />

            <div className="result-card-details">
              <div className="detail-col">
                <span className="detail-label">Domain</span>
                <span className="detail-val">{result.domain}</span>
              </div>
              <div className="detail-col">
                <span className="detail-label">Type</span>
                <span className="detail-val">{result.type}</span>
              </div>
              <div className="detail-col">
                <span className="detail-label">Risk Level</span>
                <span className={`detail-val ${result.isDisposable ? 'val-high' : 'val-low'}`}>
                  {result.riskLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fixed Height Code Box with Scrollable Inner Content & Added PHP Tab */}
        <div className="demo-right-panel">
          <div
            className="code-card-outer"
            style={{
              height: '420px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Top Bar with Language Tabs including PHP */}
            <div className="code-card-topbar">
              <div className="code-tabs-list" style={{ overflowX: 'auto', gap: '4px' }}>
                {Object.keys(codeSnippets).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`code-tab-item ${activeTab === tab ? 'active-tab' : ''}`}
                    onClick={() => setActiveTab(tab)}
                    style={{ borderRadius: '2px' }}
                  >
                    {tab === 'cURL' && <span className="tab-code-icon">&lt;/&gt;</span>}
                    {tab === 'JavaScript' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" style={{ marginRight: '4px' }}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    )}
                    {tab === 'Python' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" style={{ marginRight: '4px' }}>
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    )}
                    {tab === 'Node.js' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" style={{ marginRight: '4px' }}>
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    )}
                    {tab === 'PHP' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" style={{ marginRight: '4px' }}>
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    )}
                    {tab}
                  </button>
                ))}
              </div>

              <button type="button" className="copy-code-btn" onClick={handleCopy} style={{ borderRadius: '2px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Consistent Height Code Snippet Area */}
            <div
              className="code-snippet-area"
              style={{
                height: '140px',
                minHeight: '140px',
                maxHeight: '140px',
                overflowY: 'auto',
                overflowX: 'auto',
                width: '100%',
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                <code>{codeSnippets[activeTab].req}</code>
              </pre>
            </div>

            {/* Response Section */}
            <div className="response-divider-bar">
              <span>Response</span>
            </div>

            {/* Response Area - Auto height to fit content */}
            <div
              className="response-json-area"
              style={{
                overflowY: 'hidden',
                overflowX: 'auto',
              }}
            >
              <pre style={{ margin: 0 }}>
                <code>{codeSnippets[activeTab].res(result.email, result.isDisposable, result.domain)}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
