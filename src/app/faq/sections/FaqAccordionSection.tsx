'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'API & Limits' | 'Billing & Plans' | 'Security';
}

export default function FaqAccordionSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const faqs: FaqItem[] = [
    {
      category: 'General',
      question: 'What is TempCheck and how does the API work?',
      answer: 'TempCheck provides real-time developer API services for verification, disposable email detection, and weather telemetry. You send HTTP GET/POST requests with your API key to receive instant JSON responses in sub-50ms.',
    },
    {
      category: 'API & Limits',
      question: 'What happens if I exceed my monthly API quota?',
      answer: 'On Free developer plans, requests exceeding the quota will return a 429 Too Many Requests status code. On Pro and Enterprise plans, overages are automatically billed at the standard rate specified in your billing console without service interruption.',
    },
    {
      category: 'API & Limits',
      question: 'How fast are the API response times?',
      answer: 'Our global edge routing network delivers average response latencies of 12ms to 25ms depending on your geographical location.',
    },
    {
      category: 'Billing & Plans',
      question: 'Can I upgrade, downgrade, or cancel my subscription at any time?',
      answer: 'Yes! You can manage your subscription plan anytime directly from your Developer Dashboard. Upgrades take effect immediately, while downgrades/cancellations apply at the end of your current billing cycle.',
    },
    {
      category: 'Security',
      question: 'Is my data encrypted and compliant with GDPR/SOC2?',
      answer: 'All API payloads are encrypted in transit via TLS 1.3 and at rest with AES-256. We store zero sensitive personal data and comply fully with GDPR guidelines.',
    },
    {
      category: 'Security',
      question: 'How do I regenerate or revoke a compromised API key?',
      answer: 'Navigating to Dashboard > API Keys allows you to instantly revoke compromised keys and generate new credentials with one click.',
    },
  ];

  const categories = ['All', 'General', 'API & Limits', 'Billing & Plans', 'Security'];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      className="faq-accordion-section"
      style={{
        padding: '0 24px 48px 24px',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Category Pills & Search Input with 2px radius */}
      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <input
          type="text"
          placeholder="Search FAQ keywords e.g. quota, key, latency, billing..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '2px',
            padding: '10px 14px',
            fontSize: '13px',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: '2px',
                border: '1px solid',
                borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--border-subtle)',
                background: activeCategory === cat ? 'rgba(0, 240, 255, 0.1)' : 'var(--bg-card)',
                color: activeCategory === cat ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List with 2px radius */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredFaqs.length === 0 ? (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
              padding: '24px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontSize: '13px',
            }}
          >
            No matching questions found for &quot;{searchTerm}&quot;.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const faqKey = faqs.indexOf(faq);
            const isOpen = openIdx === faqKey;
            return (
              <div
                key={faq.question}
                style={{
                  background: 'rgba(4, 23, 37, 0.94)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : faqKey)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'var(--primary)',
                        background: 'rgba(0, 240, 255, 0.1)',
                        padding: '2px 6px',
                        borderRadius: '2px',
                      }}
                    >
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  <span style={{ color: 'var(--primary)', fontSize: '14px' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false} mode="popLayout">
                  {isOpen && (
                    <motion.div
                      key={`${faq.question}-answer`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: 'block', overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 18px 16px 18px',
                          fontSize: '13.5px',
                          lineHeight: 1.6,
                          color: 'var(--text-secondary)',
                          borderTop: '1px solid var(--border-subtle)',
                          paddingTop: '12px',
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
