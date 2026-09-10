'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sleek Vector SVG Icons
  const icons = {
    docs: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    integrations: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    status: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#32F5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    pricing: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    faq: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    blog: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    changelog: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.13-1.63 1.13-2.61a3.02 3.02 0 0 0-3.01-3.01c-.98 0-1.9.42-2.61 1.13z" />
        <path d="M14 6l6 6M6.5 14.5l9-9a2.12 2.12 0 0 1 3 3l-9 9" />
      </svg>
    ),
    about: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    sla: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    terms: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
    ),
    privacy: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    contact: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  };

  const productLinks = [
    { title: 'Developer Docs', desc: 'REST API, SDK guides & quickstarts', href: '/docs', icon: icons.docs },
    { title: 'SDKs & Integrations', desc: 'Libraries for Node, Python, Go, PHP', href: '/integrations', icon: icons.integrations },
    { title: 'Live API Status', desc: 'Real-time 99.9% uptime & edge latency', href: '/status', icon: icons.status },
  ];

  const resourceLinks = [
    { title: 'FAQ Desk', desc: 'Rate limits, API keys & billing questions', href: '/faq', icon: icons.faq },
    { title: 'Engineering Blog', desc: 'Security research & API tutorials', href: '/blog', icon: icons.blog },
    { title: 'Changelog', desc: 'Latest feature releases & updates', href: '/changelog', icon: icons.changelog },
  ];

  const companyLinks = [
    { title: 'About TempCheck', desc: 'Global weather & email verification tech', href: '/about', icon: icons.about },
    { title: 'Careers', desc: 'Join our engineering team', href: '/careers', icon: icons.about },
    { title: 'SLA Guarantee', desc: '99.9% uptime SLA & credit policies', href: '/sla', icon: icons.sla },
    { title: 'Terms of Service', desc: 'Developer API legal agreement', href: '/terms', icon: icons.terms },
    { title: 'Privacy Policy', desc: 'GDPR, data protection & processing', href: '/privacy', icon: icons.privacy },
    { title: 'Support Desk', desc: 'Contact engineering & sales team', href: '/contact', icon: icons.contact },
  ];

  return (
    <header className="nav" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Brand Logo */}
      <div className="nav-brand">
        <Link href="/" className="logo">
          <Image
            src="/assets/images/logo.png"
            alt="TempMail Logo"
            width={32}
            height={32}
            style={{ objectFit: 'contain' }}
            priority
          />
          <span className="logo-text">TempMail</span>
        </Link>
      </div>

      {/* Centered Floating Pill Capsule Nav with Framer Motion */}
      <div className="nav-center">
        <nav className="nav-pill-capsule" style={{ position: 'relative' }}>
          {/* Home Link */}
          <Link
            href="/"
            className={pathname === '/' ? 'active-pill' : 'pill-item'}
            onMouseEnter={() => setActiveDropdown(null)}
          >
            Home
          </Link>

          {/* Products Dropdown Trigger */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('products')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={pathname.startsWith('/docs') || pathname === '/integrations' || pathname === '/status' ? 'active-pill' : 'pill-item'}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'inherit',
                padding: '6px 14px',
              }}
            >
              <span>Products</span>
              {/* Sleek SVG Chevron Arrow with Framer Motion Rotation */}
              <motion.svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: activeDropdown === 'products' ? 180 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ opacity: 0.8 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>

            {/* Framer Motion Animated Popover */}
            <AnimatePresence>
              {activeDropdown === 'products' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '6px',
                    zIndex: 1050,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 2, scale: 0.985 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: '320px',
                      background: 'rgba(4, 23, 37, 0.98)',
                      border: '1px solid var(--border-default)',
                      borderRadius: '2px',
                      padding: '10px',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7), 0 0 16px rgba(0, 240, 255, 0.18)',
                      backdropFilter: 'blur(18px)',
                      WebkitBackdropFilter: 'blur(18px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {productLinks.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '8px 10px',
                          borderRadius: '2px',
                          textDecoration: 'none',
                          transition: 'background 0.2s ease, transform 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 240, 255, 0.08)';
                          e.currentTarget.style.transform = 'translateX(2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '2px',
                            background: 'rgba(0, 240, 255, 0.08)',
                            border: '1px solid rgba(0, 240, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/pricing"
            className={pathname === '/pricing' ? 'active-pill' : 'pill-item'}
            onMouseEnter={() => setActiveDropdown(null)}
          >
            Pricing
          </Link>

          {/* Resources Dropdown Trigger */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('resources')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={pathname === '/faq' || pathname === '/blog' || pathname === '/changelog' ? 'active-pill' : 'pill-item'}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'inherit',
                padding: '6px 14px',
              }}
            >
              <span>Resources</span>
              <motion.svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: activeDropdown === 'resources' ? 180 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ opacity: 0.8 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>

            {/* Framer Motion Animated Popover */}
            <AnimatePresence>
              {activeDropdown === 'resources' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '6px',
                    zIndex: 1050,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 2, scale: 0.985 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: '320px',
                      background: 'rgba(4, 23, 37, 0.98)',
                      border: '1px solid var(--border-default)',
                      borderRadius: '2px',
                      padding: '10px',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7), 0 0 16px rgba(0, 240, 255, 0.18)',
                      backdropFilter: 'blur(18px)',
                      WebkitBackdropFilter: 'blur(18px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {resourceLinks.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '8px 10px',
                          borderRadius: '2px',
                          textDecoration: 'none',
                          transition: 'background 0.2s ease, transform 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 240, 255, 0.08)';
                          e.currentTarget.style.transform = 'translateX(2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '2px',
                            background: 'rgba(0, 240, 255, 0.08)',
                            border: '1px solid rgba(0, 240, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Company Dropdown Trigger */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('company')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={pathname === '/about' || pathname === '/careers' || pathname === '/sla' || pathname === '/terms' || pathname === '/privacy' || pathname === '/contact' ? 'active-pill' : 'pill-item'}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'inherit',
                padding: '6px 14px',
              }}
            >
              <span>Company</span>
              <motion.svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: activeDropdown === 'company' ? 180 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ opacity: 0.8 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>

            {/* Framer Motion Animated Popover */}
            <AnimatePresence>
              {activeDropdown === 'company' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '6px',
                    zIndex: 1050,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 2, scale: 0.985 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: '320px',
                      background: 'rgba(4, 23, 37, 0.98)',
                      border: '1px solid var(--border-default)',
                      borderRadius: '2px',
                      padding: '10px',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7), 0 0 16px rgba(0, 240, 255, 0.18)',
                      backdropFilter: 'blur(18px)',
                      WebkitBackdropFilter: 'blur(18px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {companyLinks.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '8px 10px',
                          borderRadius: '2px',
                          textDecoration: 'none',
                          transition: 'background 0.2s ease, transform 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 240, 255, 0.08)';
                          e.currentTarget.style.transform = 'translateX(2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '2px',
                            background: 'rgba(0, 240, 255, 0.08)',
                            border: '1px solid rgba(0, 240, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>

      {/* Nav Right CTA */}
      <div className="nav-right">
        <Link href="/login" className="signin-link">
          Sign In
        </Link>
        <Link href="/signup" className="btn btn-primary btn-nav">
          <span>Get API Key</span>
          <svg className="arrow-icon" viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" style={{ borderRadius: '2px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
            Products
          </div>
          <Link href="/docs" onClick={() => setMobileMenuOpen(false)}>Docs</Link>
          <Link href="/integrations" onClick={() => setMobileMenuOpen(false)}>Integrations</Link>
          <Link href="/status" onClick={() => setMobileMenuOpen(false)}>Live Status</Link>

          <div className="mobile-nav-divider" />
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
            Resources &amp; Company
          </div>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/careers" onClick={() => setMobileMenuOpen(false)}>Careers</Link>
          <Link href="/sla" onClick={() => setMobileMenuOpen(false)}>SLA Guarantee</Link>
          <Link href="/terms" onClick={() => setMobileMenuOpen(false)}>Terms of Service</Link>
          <Link href="/privacy" onClick={() => setMobileMenuOpen(false)}>Privacy Policy</Link>

          <div className="mobile-nav-divider" />
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--primary)' }}>
            Sign In →
          </Link>
          <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ justifyContent: 'center', borderRadius: '2px !important' }}>
            Get API Key
          </Link>
        </div>
      )}
    </header>
  );
}
