'use client';

import React from 'react';

export default function CoreFeaturesSection() {
  return (
    <section className="features-section" id="features">
      <div className="section-header center">
        <div className="eyebrow">
          <span className="dot"></span>CORE CAPABILITIES
        </div>
        <h2 className="section-title">
          Everything you need to secure your <span className="accent">signup pipeline</span>
        </h2>
        <p className="section-desc">
          Built from the ground up for high reliability, developer speed, and seamless application security.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h3>Email Detection</h3>
          <p>Determine whether an incoming registration address belongs to a disposable or throwaway inbox service in real time.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <h3>Domain Intelligence</h3>
          <p>Return rich metadata about provider type, MX record status, creation age, and risk classification confidence.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </div>
          <h3>Allow &amp; Deny Lists</h3>
          <p>Customize organization-specific domain overrides to whitelist trusted partners or instantly blacklist custom domains.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
          <h3>Automatic Dataset Updates</h3>
          <p>Continuous database synchronization catches new temporary mail domains the moment they launch on the web.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <h3>Sub-100ms API Speed</h3>
          <p>Optimized edge caching guarantees lightning fast evaluation times that will never slow down your user onboarding flow.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h3>Rate Limiting &amp; Caching</h3>
          <p>Enterprise-ready infrastructure handles sudden signup spikes and prevents abuse with automated token bucket limiting.</p>
        </div>
      </div>
    </section>
  );
}
