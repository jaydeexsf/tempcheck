'use client';

import React from 'react';
import Image from 'next/image';
import section3Img from '@/assets/images/section3.png';

export default function DomainIntelligenceSection() {
  return (
    <section className="domain-intelligence-section" id="dataset">
      <div className="domain-intelligence-container">
        {/* Left Column: Heading, Description & Red Bullet List */}
        <div className="di-left-col">
          <div className="di-eyebrow">
            <span className="dot"></span>
            POWERED BY REAL DATA
          </div>

          <h2 className="di-headline">
            Domain Intelligence <br />
            <span className="accent">&amp; Dataset Overview</span>
          </h2>

          <p className="di-desc">
            Our API uses a constantly updated database of +10M disposable and temporary email domains leading to spam, abuse, and lost revenue.
          </p>

          <ul className="di-bullet-list">
            <li>
              <span className="di-minus-icon">⊖</span> Fake account creation
            </li>
            <li>
              <span className="di-minus-icon">⊖</span> Spam &amp; abuse
            </li>
            <li>
              <span className="di-minus-icon">⊖</span> Revenue loss
            </li>
            <li>
              <span className="di-minus-icon">⊖</span> Compromised user trust
            </li>
          </ul>
        </div>

        {/* Center Column: Dataset Stats Card */}
        <div className="di-stats-card">
          <div className="di-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" width="18" height="18">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <h3>Dataset Stats</h3>
          </div>

          <div className="di-stats-rows">
            <div className="di-stat-row">
              <div className="di-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="di-stat-info">
                <span className="di-val">10M+</span>
                <span className="di-lbl">Disposable domains</span>
              </div>
            </div>

            <div className="di-stat-row">
              <div className="di-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="di-stat-info">
                <span className="di-val">200+</span>
                <span className="di-lbl">Temporary providers</span>
              </div>
            </div>

            <div className="di-stat-row">
              <div className="di-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="di-stat-info">
                <span className="di-val">1000+</span>
                <span className="di-lbl">TLDs monitored</span>
              </div>
            </div>

            <div className="di-stat-row">
              <div className="di-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
              <div className="di-stat-info">
                <span className="di-val">Real-time</span>
                <span className="di-lbl">Updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Cyber Network Graphic Image (section3.png) */}
        <div className="di-graphic-col">
          <Image
            src={section3Img}
            alt="Domain Intelligence &amp; Dataset Cyber Network Graphic"
            width={620}
            height={400}
            priority
            className="di-graphic-img"
          />
        </div>
      </div>
    </section>
  );
}
