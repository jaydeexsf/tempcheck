'use client';

import React, { useState } from 'react';

interface Article {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export default function BlogListSection() {
  const [activeTab, setActiveTab] = useState('All');

  const articles: Article[] = [
    {
      title: 'Architecting Sub-20ms Global Edge APIs with Cloudflare Workers',
      excerpt: 'How we reduced P99 latency by 65% across North America and Europe using distributed V8 isolate runtimes.',
      category: 'Architecture',
      date: 'Sept 5, 2026',
      readTime: '6 min read',
      author: 'Alex Rivera, Lead Infra',
    },
    {
      title: 'Detecting Disposable Email Networks in Real-Time at Scale',
      excerpt: 'An inside look at our MX reputation algorithms, automated domain monitoring, and spam trap classification engine.',
      category: 'Security',
      date: 'Aug 28, 2026',
      readTime: '8 min read',
      author: 'Elena Rostova, Security R&D',
    },
    {
      title: 'Building Resilient Weather Verification Pipelines with Rust & Go',
      excerpt: 'Lessons learned parsing gigabytes of weather sensor telemetry per second with zero memory leaks.',
      category: 'Engineering',
      date: 'Aug 14, 2026',
      readTime: '5 min read',
      author: 'Marcus Vance, Systems Architect',
    },
    {
      title: 'Best Practices for Rate Limiting & API Key Security in Next.js 15',
      excerpt: 'Implementing sliding window rate limiting and secure token rotation in modern serverless apps.',
      category: 'Tutorials',
      date: 'Aug 02, 2026',
      readTime: '7 min read',
      author: 'David Chen, Developer Relations',
    },
  ];

  const categories = ['All', 'Architecture', 'Security', 'Engineering', 'Tutorials'];

  const filtered = activeTab === 'All' ? articles : articles.filter((a) => a.category === activeTab);

  return (
    <section
      style={{
        padding: '0 24px 48px 24px',
        maxWidth: '1140px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '2px',
              border: '1px solid',
              borderColor: activeTab === cat ? 'var(--primary)' : 'var(--border-subtle)',
              background: activeTab === cat ? 'rgba(0, 240, 255, 0.1)' : 'var(--bg-card)',
              color: activeTab === cat ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {filtered.map((art, i) => (
          <article
            key={i}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'border-color 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--primary)',
                    background: 'rgba(0, 240, 255, 0.08)',
                    padding: '2px 6px',
                    borderRadius: '2px',
                  }}
                >
                  {art.category}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{art.readTime}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.35 }}>
                {art.title}
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {art.excerpt}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>{art.author}</span>
              <span>{art.date}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
