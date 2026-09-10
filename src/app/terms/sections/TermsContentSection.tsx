'use client';

import React, { useState } from 'react';

interface Clause {
  id: string;
  number: string;
  title: string;
  summary: string;
  content: React.ReactNode;
}

export default function TermsContentSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('section-1');

  const clauses: Clause[] = [
    {
      id: 'section-1',
      number: '01',
      title: 'Acceptance of Terms & Developer Agreement',
      summary: 'Rules regarding account creation, acceptance of terms, and developer obligations.',
      content: (
        <>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            By registering for a TempCheck developer account, accessing our REST APIs, integrating our SDKs, or utilizing our real-time weather verification services, you (&quot;Developer&quot;, &quot;User&quot;, or &quot;Customer&quot;) agree to be legally bound by these Terms of Service.
          </p>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            If you are entering into this agreement on behalf of a corporate entity, company, or organization, you represent that you possess full legal authority to bind such entity to these Terms.
          </p>
          <div
            style={{
              background: 'rgba(0, 240, 255, 0.04)',
              borderLeft: '2px solid var(--primary)',
              padding: '12px 14px',
              borderRadius: '2px',
              marginTop: '14px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
            }}
          >
            <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
              Key Requirement
            </strong>
            You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to enter into contracts and maintain an active API key with TempCheck.
          </div>
        </>
      ),
    },
    {
      id: 'section-2',
      number: '02',
      title: 'Service Description & API Availability (SLA)',
      summary: 'Scope of API availability, 99.9% uptime commitment, and status telemetry.',
      content: (
        <>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            TempCheck provides high-precision weather telemetry, historical climate analysis, hyper-local sensor aggregation, and automated weather verification APIs. We strive to maintain an uptime SLA of <strong>99.9%</strong> for production tier endpoints.
          </p>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            Scheduled maintenance windows are announced at least 48 hours in advance via our official status page (`status.tempcheck.io`) and developer webhook notifications.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '10px',
              marginTop: '14px',
            }}
          >
            <div
              style={{
                background: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                padding: '12px 14px',
                borderRadius: '2px',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', fontFamily: "'JetBrains Mono', monospace" }}>99.9%</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Target API Uptime</div>
            </div>
            <div
              style={{
                background: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                padding: '12px 14px',
                borderRadius: '2px',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#32F5FF', fontFamily: "'JetBrains Mono', monospace" }}>&lt; 50ms</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Global Edge Latency</div>
            </div>
            <div
              style={{
                background: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                padding: '12px 14px',
                borderRadius: '2px',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'JetBrains Mono', monospace" }}>24/7/365</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Telemetry Monitoring</div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'section-3',
      number: '03',
      title: 'Account Registration & Security Credentials',
      summary: 'API key confidentiality, authentication tokens, and reporting security breaches.',
      content: (
        <>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            To access our APIs, you must generate API keys or authentication tokens via the TempCheck developer console. You are solely responsible for keeping your credentials confidential and secure.
          </p>
          <ul style={{ paddingLeft: '18px', marginBottom: '12px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '6px' }}>
              <strong>Credential Security:</strong> Do not expose secret API keys in public client-side code repositories, browser scripts, or mobile app bundles.
            </li>
            <li style={{ marginBottom: '6px' }}>
              <strong>Unauthorized Access:</strong> You must notify TempCheck security teams immediately upon discovering any unauthorized token usage or breach.
            </li>
            <li>
              <strong>Account Accountability:</strong> You are fully liable for all API requests and compute charges generated under your authentication keys.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'section-4',
      number: '04',
      title: 'Fair Use, Rate Limits & Prohibited Conduct',
      summary: 'Tier limits, concurrency thresholds, scraping prohibitions, and acceptable usage policy.',
      content: (
        <>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            To ensure consistent service quality for all developers, API usage is governed by request rate limits defined by your subscription tier.
          </p>
          <div
            style={{
              background: 'var(--bg-main)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginBottom: '14px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderBottom: '1px solid var(--border-subtle)',
                fontWeight: 600,
                fontSize: '12px',
                color: 'var(--text-primary)',
              }}
            >
              <div>Tier Plan</div>
              <div>Rate Limit (Req/Min)</div>
              <div>Monthly Cap</div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '10px 14px',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
              }}
            >
              <div>Developer (Free)</div>
              <div>60 req / min</div>
              <div>10,000 req / mo</div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '10px 14px',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
              }}
            >
              <div>Pro API</div>
              <div>1,200 req / min</div>
              <div>1,000,000 req / mo</div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '10px 14px',
                fontSize: '12px',
                color: 'var(--primary)',
              }}
            >
              <div>Enterprise Dedicated</div>
              <div>Custom Concurrency</div>
              <div>Unlimited / SLA</div>
            </div>
          </div>
          <p style={{ marginBottom: '6px', fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
            Prohibited Activities:
          </p>
          <p style={{ marginBottom: '12px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            You may not perform denial-of-service attacks, reverse engineer raw telemetry models, bypass rate limiting proxies, resell raw un-augmented API access, or use TempCheck services for illegal activities.
          </p>
        </>
      ),
    },
    {
      id: 'section-5',
      number: '05',
      title: 'Data Privacy & Processing (GDPR & Compliance)',
      summary: 'Handling of geolocation data, user telemetry, GDPR compliance, and encryption standards.',
      content: (
        <>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            TempCheck prioritizes user data protection and privacy compliance. We process location coordinates strictly for weather query resolution and diagnostic logging.
          </p>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            All network communication with TempCheck endpoints requires TLS 1.3 encryption in transit. Data at rest is encrypted using AES-256 standard.
          </p>
        </>
      ),
    },
    {
      id: 'section-6',
      number: '06',
      title: 'Intellectual Property Rights & Licensing',
      summary: 'Ownership of API software, trademarks, weather index models, and data usage licenses.',
      content: (
        <>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            All intellectual property rights in the TempCheck service, including software code, API documentation, algorithms, temperature index models, and brand logos, remain the exclusive property of TempCheck, Inc.
          </p>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            Subject to your compliance with these Terms, TempCheck grants you a non-exclusive, non-transferable, revocable license to access and integrate TempCheck API data into your software applications.
          </p>
        </>
      ),
    },
    {
      id: 'section-7',
      number: '07',
      title: 'Payment, Subscriptions & Billing Terms',
      summary: 'Billing cycles, overage calculation, auto-renewal, and refund policy.',
      content: (
        <>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            Subscription fees for paid API tiers are billed in advance on a recurring monthly or annual basis. Overage requests beyond your plan limit are billed at the standard rate specified in your account dashboard.
          </p>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            Payments are processed securely via Stripe. Failure to settle outstanding invoices within 14 days of due date may result in temporary API key suspension.
          </p>
        </>
      ),
    },
    {
      id: 'section-8',
      number: '08',
      title: 'Limitation of Liability & Disclaimer of Warranties',
      summary: 'Disclaimer regarding extreme weather events, indirect damages, and maximum liability caps.',
      content: (
        <>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            To the maximum extent permitted by applicable law, TempCheck services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied.
          </p>
          <div
            style={{
              background: 'rgba(255, 77, 77, 0.05)',
              border: '1px solid rgba(255, 77, 77, 0.25)',
              borderRadius: '2px',
              padding: '12px 14px',
              marginTop: '10px',
              fontSize: '13px',
              color: '#FF8888',
            }}
          >
            <strong>Critical Disclaimer:</strong> TempCheck weather verification data is intended for analytical, commercial, and operational decision support. It should not be used as the sole automated trigger for life-critical safety systems or emergency dispatch operations.
          </div>
        </>
      ),
    },
    {
      id: 'section-9',
      number: '09',
      title: 'Termination of Service & Key Revocation',
      summary: 'Conditions under which accounts or API access may be terminated.',
      content: (
        <>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            You may terminate your account at any time by navigating to Account Settings in the Developer Console. TempCheck reserves the right to suspend or terminate API access immediately in cases of material breach, security threats, or non-payment.
          </p>
        </>
      ),
    },
    {
      id: 'section-10',
      number: '10',
      title: 'Governing Law & Dispute Resolution',
      summary: 'Jurisdiction, arbitration provisions, and amendments to legal terms.',
      content: (
        <>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles. Any legal disputes arising under these Terms shall be resolved through binding arbitration.
          </p>
          <p style={{ marginBottom: '12px', lineHeight: 1.6 }}>
            We reserve the right to modify these Terms at any time. Notice of material updates will be sent to your account email address and posted on this page 30 days prior to taking effect.
          </p>
        </>
      ),
    },
  ];

  const filteredClauses = clauses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      style={{
        padding: '0 24px 48px 24px',
        maxWidth: '1140px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Search Bar & Filter Header with 2px border radius */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '2px',
          padding: '16px 20px',
          marginBottom: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ flex: '1 1 280px' }}>
          <label
            htmlFor="terms-search"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Filter Legal Clauses
          </label>
          <input
            id="terms-search"
            type="text"
            placeholder="Search keywords e.g. SLA, Rate Limits, Privacy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-main)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
              padding: '8px 12px',
              fontSize: '13px',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredClauses.length}</strong> of {clauses.length} clauses
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Layout: Sidebar TOC + Clause Content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 250px) 1fr',
          gap: '28px',
          alignItems: 'start',
        }}
        className="terms-grid"
      >
        {/* Sticky Table of Contents Sidebar with 2px border radius */}
        <aside
          style={{
            position: 'sticky',
            top: '80px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '2px',
            padding: '16px',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '10px',
              paddingBottom: '6px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            Table of Contents
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {clauses.map((clause) => {
              const isActive = activeSection === clause.id;
              return (
                <a
                  key={clause.id}
                  href={`#${clause.id}`}
                  onClick={() => setActiveSection(clause.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    borderRadius: '2px',
                    fontSize: '12px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                    borderLeft: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    lineHeight: 1.3,
                  }}
                >
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontFamily: "'JetBrains Mono', monospace",
                      color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    }}
                  >
                    {clause.number}
                  </span>
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {clause.title.split('&')[0]}
                  </span>
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Legal Body Clauses with 2px border radius */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredClauses.length === 0 ? (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '2px',
                padding: '32px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
              }}
            >
              <h3 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                No matching clauses found
              </h3>
              <p style={{ fontSize: '13px', marginBottom: '14px' }}>
                Try searching for keywords like &quot;SLA&quot;, &quot;Privacy&quot;, or &quot;Rate Limit&quot;.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="btn btn-secondary"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredClauses.map((clause) => (
              <article
                key={clause.id}
                id={clause.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '2px',
                  padding: '24px',
                  transition: 'border-color 0.2s ease',
                  scrollMarginTop: '90px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
              >
                {/* Clause Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: 'var(--primary)',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.25)',
                      padding: '2px 6px',
                      borderRadius: '2px',
                    }}
                  >
                    SEC {clause.number}
                  </span>
                  <h2
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      margin: 0,
                    }}
                  >
                    {clause.title}
                  </h2>
                </div>

                {/* Clause Body */}
                <div
                  style={{
                    fontSize: '13.5px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {clause.content}
                </div>
              </article>
            ))
          )}
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 860px) {
          .terms-grid {
            grid-template-columns: 1fr !important;
          }
          .terms-grid aside {
            position: relative !important;
            top: 0 !important;
            max-height: 220px !important;
            margin-bottom: 16px;
          }
        }
      `}</style>
    </section>
  );
}
