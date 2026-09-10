'use client';

import React, { useState } from 'react';

export default function BlogNewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

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
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Subscribe to the TempCheck Developer Dispatch
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Get bi-weekly technical research, API latency benchmarks, and security releases delivered to your inbox.
        </p>

        {subscribed ? (
          <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>
            ✔ Thank you for subscribing! Check your inbox for confirmation.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              maxWidth: '440px',
              margin: '0 auto',
              flexWrap: 'wrap',
            }}
          >
            <input
              type="email"
              placeholder="developer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: '1 1 240px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                padding: '8px 12px',
                fontSize: '13px',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ borderRadius: '2px !important' }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
