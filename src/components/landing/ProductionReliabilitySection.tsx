'use client';

import React from 'react';

export default function ProductionReliabilitySection() {
  return (
    <section className="reliability-section">
      <div className="reliability-container">
        {/* Left Column: Specs */}
        <div className="reliability-left">
          <h2 className="section-title">Built for high-volume signup flows</h2>
          <p className="section-desc">
            Engineered with strict zero-downtime architecture, global edge endpoints, and privacy-first data compliance.
          </p>

          <div className="reliability-features-list">
            <div className="rel-item">
              <div className="rel-badge">99.9%</div>
              <div>
                <h4 className="rel-title">High Availability Uptime</h4>
                <p className="rel-text">Multi-region redundant failover ensures your registration endpoint is always online.</p>
              </div>
            </div>

            <div className="rel-item">
              <div className="rel-badge">&lt;100ms</div>
              <div>
                <h4 className="rel-title">Ultra-Low Latency Edge</h4>
                <p className="rel-text">Global CDN and memory caching return domain checks in under 40ms on average.</p>
              </div>
            </div>

            <div className="rel-item">
              <div className="rel-badge">TLS 1.3</div>
              <div>
                <h4 className="rel-title">Privacy &amp; Security First</h4>
                <p className="rel-text">No user personal data stored. Hashed domain checks and encrypted API tokens.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Section5 Graphic (No Border, No Container Background) */}
        <div className="reliability-right">
          <div className="clean-image-container">
            <img
              src="/assets/images/section5.png"
              alt="Global edge network infrastructure map with low latency rings and uptime indicators"
              width="640"
              height="400"
              className="clean-graphic-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
