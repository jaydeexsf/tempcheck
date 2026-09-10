'use client';

import React from 'react';

export default function PricingSection() {
  return (
    <section className="pricing-section" id="pricing">
      {/* Background Cyber Mesh & Atmospheric Glow */}
      <div className="pricing-bg-layer" aria-hidden="true">
        <div className="pricing-bg-grid" />
        <div className="pricing-bg-radial-top" />
        <div className="pricing-bg-radial-bottom" />
        <svg className="pricing-cyber-mesh-bottom" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
          <path d="M0 320L200 240L400 280L600 210L800 260L1000 200L1200 270L1440 220V320H0Z" fill="url(#pricing-mesh-grad)" opacity="0.12"/>
          <path d="M0 280C250 220 500 310 750 230C1000 150 1250 290 1440 240" stroke="#00F0FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.35"/>
          <path d="M0 310C350 260 700 320 1050 250C1250 210 1380 270 1440 260" stroke="#00F0FF" strokeWidth="0.75" opacity="0.25"/>
          <circle cx="200" cy="240" r="3" fill="#00F0FF" opacity="0.6"/>
          <circle cx="600" cy="210" r="3" fill="#00F0FF" opacity="0.6"/>
          <circle cx="1000" cy="200" r="3" fill="#00F0FF" opacity="0.6"/>
          <circle cx="1200" cy="270" r="3" fill="#00F0FF" opacity="0.6"/>
          <defs>
            <linearGradient id="pricing-mesh-grad" x1="720" y1="200" x2="720" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00F0FF" stopOpacity="0.25"/>
              <stop offset="1" stopColor="#00F0FF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="pricing-header-wrapper center">
        <div className="pricing-badge-top">
          <span className="diamond-icon">💎</span> SIMPLE, TRANSPARENT PRICING
        </div>
        <h2 className="pricing-headline">
          Choose the plan that fits <br />
          <span className="cyan-glow-text">your needs.</span>
        </h2>
        <p className="pricing-subhead">
          Start free, scale as you grow. All plans include real-time detection, accurate results, and reliable uptime.
        </p>
      </div>

      <div className="pricing-grid-3col">
        {/* Card 1: Free */}
        <div className="pricing-card-box">
          <div className="card-header-row">
            <div className="card-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" width="20" height="20">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h3 className="card-plan-title">Free</h3>
            <span className="card-tag-pill">Get Started</span>
          </div>
          <p className="card-plan-desc">Perfect for developers, hobbyists, and small projects.</p>
          <div className="card-price-row">
            <span className="price-num">$0</span>
            <span className="price-unit">/month</span>
          </div>

          <a href="/signup" className="pricing-btn-outline">
            Start Free →
          </a>

          <div className="includes-label">INCLUDES</div>

          <ul className="pricing-checklist">
            <li>
              <span className="check-cyan">✓</span> 1,000 API requests per month
            </li>
            <li>
              <span className="check-cyan">✓</span> Basic disposable &amp; temporary detection
            </li>
            <li>
              <span className="check-cyan">✓</span> Real-time validation
            </li>
            <li>
              <span className="check-cyan">✓</span> Standard response time (&le; 1s)
            </li>
            <li>
              <span className="check-cyan">✓</span> Access to documentation &amp; examples
            </li>
          </ul>
        </div>

        {/* Card 2: Pro (Featured) */}
        <div className="pricing-card-box featured-pro-card">
          <div className="floating-popular-tag">★ Most Popular</div>
          <div className="card-header-row">
            <div className="card-icon-badge icon-cyan-bg">
              <span className="code-brackets">&lt;/&gt;</span>
            </div>
            <h3 className="card-plan-title">Pro</h3>
            <span className="card-tag-pill pill-best-value">Best Value</span>
          </div>
          <p className="card-plan-desc">Built for growing teams and serious applications.</p>
          <div className="card-price-row">
            <span className="price-num">$49</span>
            <span className="price-unit">/month</span>
          </div>

          <a href="/signup" className="pricing-btn-filled">
            Get Pro Plan →
          </a>

          <div className="includes-label">INCLUDES</div>

          <ul className="pricing-checklist">
            <li>
              <span className="check-cyan">✓</span> 100,000 API requests per month
            </li>
            <li>
              <span className="check-cyan">✓</span> Real-time detection &amp; validation
            </li>
            <li>
              <span className="check-cyan">✓</span> Detailed response data (domain, type, risk level)
            </li>
            <li>
              <span className="check-cyan">✓</span> Advanced domain &amp; dataset lookup
            </li>
            <li>
              <span className="check-cyan">✓</span> Higher rate limits (&le; 500ms response time)
            </li>
            <li>
              <span className="check-cyan">✓</span> Email support
            </li>
          </ul>
        </div>

        {/* Card 3: Business */}
        <div className="pricing-card-box">
          <div className="card-header-row">
            <div className="card-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" width="20" height="20">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="card-plan-title">Business</h3>
            <span className="card-tag-pill">Custom</span>
          </div>
          <p className="card-plan-desc">For companies, platforms, and high-volume use cases.</p>
          <div className="card-price-row">
            <span className="price-num">$199</span>
            <span className="price-unit">/month</span>
          </div>

          <a href="/signup" className="pricing-btn-outline">
            Contact Sales →
          </a>

          <div className="includes-label">INCLUDES</div>

          <ul className="pricing-checklist">
            <li>
              <span className="check-cyan">✓</span> 1,000,000+ API requests per month
            </li>
            <li>
              <span className="check-cyan">✓</span> Full domain intelligence &amp; dataset access
            </li>
            <li>
              <span className="check-cyan">✓</span> Custom integrations &amp; onboarding
            </li>
            <li>
              <span className="check-cyan">✓</span> SLA (99.9% uptime)
            </li>
            <li>
              <span className="check-cyan">✓</span> Priority support (24/7)
            </li>
            <li>
              <span className="check-cyan">✓</span> Dedicated account manager
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Horizontal Guarantee Bar */}
      <div className="pricing-bottom-bar">
        <div className="bar-item">
          <div className="bar-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" width="18" height="18">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div>
            <div className="bar-title">99.9%</div>
            <div className="bar-sub">Uptime Guarantee</div>
          </div>
        </div>

        <div className="bar-item">
          <div className="bar-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" width="18" height="18">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <div>
            <div className="bar-title">10M+</div>
            <div className="bar-sub">Domains Checked</div>
          </div>
        </div>

        <div className="bar-item">
          <div className="bar-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" width="18" height="18">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div>
            <div className="bar-title">Real-time</div>
            <div className="bar-sub">API Responses</div>
          </div>
        </div>

        <div className="bar-item">
          <div className="bar-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" width="18" height="18">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div>
            <div className="bar-title">Global</div>
            <div className="bar-sub">Infrastructure</div>
          </div>
        </div>

        <div className="bar-item">
          <div className="bar-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" width="18" height="18">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <div className="bar-title">Secure</div>
            <div className="bar-sub">&amp; Compliant</div>
          </div>
        </div>
      </div>
    </section>
  );
}
