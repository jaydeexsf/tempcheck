'use client';

import React from 'react';

export default function FinalCtaSection() {
  return (
    <section className="final-cta-section">
      <div className="final-cta-container">
        <div className="eyebrow center-eyebrow">
          <span className="dot"></span>GET STARTED TODAY
        </div>
        <h2 className="final-title">Stop disposable emails before they reach your database.</h2>
        <p className="final-desc">
          Join thousands of developers and engineering teams securing their signup forms with TempCheck.
        </p>
        <div className="final-ctas">
          <a href="/signup" className="btn btn-primary btn-large">
            Get Free API Key
            <svg className="arrow-icon" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="#031019" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/docs" className="btn btn-secondary btn-large">
            Read Documentation
          </a>
        </div>
      </div>
    </section>
  );
}
