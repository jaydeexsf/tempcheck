'use client';

import React from 'react';

export default function ProblemSolutionSection() {
  return (
    <section className="problem-solution-section" id="problem-solution">
      <div className="problem-solution-banner">
        {/* Left Column: The Problem */}
        <div className="ps-column ps-problem">
          <div className="ps-badge ps-badge-red">
            <span className="ps-badge-icon ps-badge-icon-red">!</span>
            <span>The Problem</span>
          </div>
          <h3 className="ps-title">Disposable emails are everywhere.</h3>
          <p className="ps-desc">
            Users abuse disposable email services to create fake accounts, bypass restrictions, and perform fraud — leading to spam, abuse, and lost revenue.
          </p>
          <ul className="ps-bullet-list">
            <li>
              <span className="ps-bullet-icon ps-icon-cross">✕</span> Fake account creation
            </li>
            <li>
              <span className="ps-bullet-icon ps-icon-cross">✕</span> Spam &amp; abuse
            </li>
            <li>
              <span className="ps-bullet-icon ps-icon-cross">✕</span> Revenue loss
            </li>
            <li>
              <span className="ps-bullet-icon ps-icon-cross">✕</span> Compromised user trust
            </li>
          </ul>
        </div>

        {/* Transition Arrow 1: Red */}
        <div className="ps-arrow-wrapper">
          <div className="ps-arrow ps-arrow-red">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        {/* Center: Glowing 3D Cyber Envelope & Shield Graphic with Radiant Light */}
        <div className="ps-center-visual">
          <div className="ps-glow-radiance"></div>
          <div className="ps-image-wrapper">
            <img
              src="/assets/images/cyber-envelope-shield.png"
              alt="Cyber Security Shield Envelope"
              width="260"
              height="220"
              className="ps-shield-image"
            />
          </div>
        </div>

        {/* Transition Arrow 2: Cyan */}
        <div className="ps-arrow-wrapper">
          <div className="ps-arrow ps-arrow-cyan">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        {/* Right Column: Our Solution */}
        <div className="ps-column ps-solution">
          <div className="ps-badge ps-badge-cyan">
            <span className="ps-badge-icon ps-badge-icon-cyan">✓</span>
            <span>Our Solution</span>
          </div>
          <h3 className="ps-title">Detect. Block. Keep it real.</h3>
          <p className="ps-desc">
            Our API identifies disposable and temporary email domains in real time, so you can stop fraud before it reaches your platform.
          </p>
          <ul className="ps-bullet-list">
            <li>
              <span className="ps-bullet-icon ps-icon-check-circle">✓</span> Real-time validation
            </li>
            <li>
              <span className="ps-bullet-icon ps-icon-check-circle">✓</span> High accuracy rates
            </li>
            <li>
              <span className="ps-bullet-icon ps-icon-check-circle">✓</span> Easy API integration
            </li>
            <li>
              <span className="ps-bullet-icon ps-icon-check-circle">✓</span> Built for scale
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
