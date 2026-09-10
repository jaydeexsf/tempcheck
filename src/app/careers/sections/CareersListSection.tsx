'use client';

import React from 'react';
import Link from 'next/link';

const roles = [
  {
    title: 'Backend Engineer',
    salary: 'R8 000 / month',
    location: 'Remote / Cape Town',
    openings: '2 openings',
    experience: '2+ years',
    summary:
      'We are hiring two backend engineers for the lookup API, domain dataset, rate limits, and the production path behind every email check.',
    href: '/careers/backend-engineer',
  },
  {
    title: 'Full Stack Developer',
    salary: 'R10 000 / month',
    location: 'Remote / Cape Town',
    openings: '1 opening',
    experience: '3+ years',
    summary:
      'Own the site and developer dashboard — checker, API keys, logs, domains, and auth — wired to the same trust APIs customers call.',
    href: '/careers/full-stack-developer',
  },
];

export default function CareersListSection() {
  return (
    <section
      style={{
        maxWidth: '1140px',
        width: '100%',
        margin: '0 auto',
        padding: '12px 24px 60px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '18px',
        }}
      >
        {roles.map((role) => (
          <article
            key={role.title}
            style={{
              background: 'linear-gradient(135deg, rgba(4, 20, 34, 0.88) 0%, rgba(2, 12, 22, 0.92) 100%)',
              border: '1px solid rgba(0, 240, 255, 0.18)',
              borderRadius: '2px',
              padding: '20px 18px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#00F0FF',
                  border: '1px solid rgba(0, 240, 255, 0.22)',
                  background: 'rgba(0, 240, 255, 0.08)',
                  padding: '6px 10px',
                }}
              >
                {role.openings}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#00F0FF',
                  border: '1px solid rgba(0, 240, 255, 0.22)',
                  background: 'rgba(0, 240, 255, 0.08)',
                  padding: '6px 10px',
                }}
              >
                {role.experience}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#8DA9B4',
                  border: '1px solid var(--border-subtle)',
                  background: 'transparent',
                  padding: '6px 10px',
                }}
              >
                {role.location}
              </div>
            </div>

            <h2
              style={{
                margin: '0 0 10px',
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                lineHeight: 1.25,
                color: '#FFFFFF',
              }}
            >
              {role.title}
            </h2>

            <p
              style={{
                margin: '0 0 14px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#00F0FF',
              }}
            >
              {role.salary}
            </p>

            <p
              style={{
                margin: '0 0 18px',
                fontSize: '12.5px',
                lineHeight: 1.6,
                color: '#8DA9B4',
              }}
            >
              {role.summary}
            </p>

            <div
              style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Link
                href={role.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: 'rgba(0, 240, 255, 0.08)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  textDecoration: 'none',
                  borderRadius: '2px',
                }}
              >
                View role
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
