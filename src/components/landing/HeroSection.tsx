'use client';

import React from 'react';
import CyberGlobe from '../CyberGlobe';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <>
      <section className="hero">
        {/* Left Column: Hero Copy & CTA */}
        <div className="hero-left">
          <div className="eyebrow">
            <span className="dot"></span>
            REAL-TIME DISPOSABLE EMAIL DETECTION
          </div>

          <h1 className="headline">
            Stop fake signups <br />
            before they hit your <br />
            <span className="accent">database.</span>
          </h1>

          <p className="description">
            Instantly detect disposable, temporary, and high-risk email addresses in sub-100ms. Keep your user data clean, reduce fraud, and protect your domain reputation.
          </p>

          <div className="hero-ctas">
            <Button variant="primary" size="large" href="/signup">
              Start Free Trial
              <svg className="arrow-icon" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="#031019" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button variant="secondary" size="large" href="#demo">
              Live Demo
            </Button>
          </div>
        </div>

        {/* Right Column: Interactive 3D Cyber Earth Globe */}
        <div className="hero-right">
          <div className="globe-wrapper">
            <CyberGlobe />
          </div>
        </div>
      </section>

      {/* Full-Width Horizontal Stats Metrics Bar Spread Across Screen */}
      <div className="stats-wrap">
        <div className="stats">
          <div className="stat">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <div className="stat-value">10M+</div>
              <div className="stat-label">Monitored Domains</div>
            </div>
          </div>

          <div className="stat">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div className="stat-value">&lt;50ms</div>
              <div className="stat-label">Average Latency</div>
            </div>
          </div>

          <div className="stat">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Detection Accuracy</div>
            </div>
          </div>

          <div className="stat">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div className="stat-value">200+</div>
              <div className="stat-label">Disposable Providers</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
