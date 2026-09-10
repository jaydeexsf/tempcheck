'use client';

import React from 'react';
import Link from 'next/link';

export type CareerRoleContent = {
  title: string;
  salary: string;
  location: string;
  openings: string;
  experience: string;
  type: string;
  summary: string;
  about: string;
  workOn: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  stack: string[];
};

type Props = {
  job: CareerRoleContent;
};

const chipStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--primary)',
  border: '1px solid rgba(0, 240, 255, 0.22)',
  background: 'rgba(0, 240, 255, 0.08)',
  padding: '6px 10px',
  borderRadius: '2px',
};

const headingStyle: React.CSSProperties = {
  margin: '0 0 12px',
  color: '#FFFFFF',
  fontSize: '17px',
  fontWeight: 700,
};

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: '20px',
  color: '#DCE8EC',
  lineHeight: 1.7,
  fontSize: '12.5px',
};

export default function CareerRoleLayout({ job }: Props) {
  return (
    <section style={{ flex: 1, padding: '30px 20px 60px' }}>
      <div
        style={{
          maxWidth: '920px',
          margin: '0 auto',
        }}
      >
        <Link
          href="/careers"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          ← All open roles
        </Link>

        <article
          style={{
            background: 'rgba(4, 18, 30, 0.75)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderRadius: '2px',
            padding: '26px 22px',
          }}
        >
          <p
            style={{
              margin: '0 0 12px',
              color: '#00F0FF',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Open role
          </p>

          <h1
            style={{
              margin: '0 0 14px',
              fontSize: 'clamp(26px, 3.8vw, 36px)',
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
            }}
          >
            {job.title}
          </h1>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '18px',
            }}
          >
            <span style={chipStyle}>{job.openings}</span>
            <span style={chipStyle}>{job.experience}</span>
            <span style={chipStyle}>{job.type}</span>
            <span style={chipStyle}>{job.location}</span>
          </div>

          <p style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700, color: '#00F0FF' }}>
            {job.salary}
          </p>

          <p
            style={{
              margin: '0 0 32px',
              fontSize: '13px',
              lineHeight: 1.65,
              color: '#DCE8EC',
            }}
          >
            {job.summary}
          </p>

          <div style={{ display: 'grid', gap: '22px' }}>
            <section>
              <h2 style={headingStyle}>About this role</h2>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.65, color: '#DCE8EC' }}>
                {job.about}
              </p>
            </section>

            <section>
              <h2 style={headingStyle}>What you will work on</h2>
              <ul style={listStyle}>
                {job.workOn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 style={headingStyle}>Responsibilities</h2>
              <ul style={listStyle}>
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 style={headingStyle}>Requirements</h2>
              <ul style={listStyle}>
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 style={headingStyle}>Nice to have</h2>
              <ul style={listStyle}>
                {job.niceToHave.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 style={headingStyle}>Stack you will use</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {job.stack.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-subtle)',
                      padding: '7px 10px',
                      borderRadius: '2px',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section
              style={{
                background: 'var(--bg-main)',
                border: '1px solid var(--border-default)',
                borderRadius: '2px',
                padding: '20px',
              }}
            >
              <h2 style={{ ...headingStyle, marginBottom: '8px' }}>How to apply</h2>
              <p style={{ margin: '0 0 16px', fontSize: '12.5px', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                Send a short note, your CV or GitHub, and one project you are proud of. Mention the role title in your message so we can route it to the right hiring manager.
              </p>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{ display: 'inline-flex', justifyContent: 'center' }}
              >
                Apply via contact
              </Link>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
