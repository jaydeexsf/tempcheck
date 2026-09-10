'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-brand">
        <Link href="/" className="logo">
          <Image
            src="/assets/images/logo.png"
            alt="TempMail Logo"
            width={34}
            height={34}
            style={{ objectFit: 'contain' }}
            priority
          />
          <span className="logo-text">TempMail</span>
        </Link>
      </div>

      <div className="nav-center">
        <nav className="nav-pill-capsule">
          <Link href="/" className={pathname === '/' ? 'active-pill' : 'pill-item'}>
            Home
          </Link>
          <Link href="/#demo" className="pill-item">
            Features
          </Link>
          <Link href="/docs" className={pathname === '/docs' ? 'active-pill' : 'pill-item'}>
            Docs
          </Link>
          <Link href="/pricing" className={pathname === '/pricing' ? 'active-pill' : 'pill-item'}>
            Pricing
          </Link>
        </nav>
      </div>

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
        <div className="mobile-nav-drawer">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/#demo" onClick={() => setMobileMenuOpen(false)}>
            Features
          </Link>
          <Link href="/docs" onClick={() => setMobileMenuOpen(false)}>
            Docs
          </Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
            Pricing
          </Link>
          <div className="mobile-nav-divider" />
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--primary)' }}>
            Sign In →
          </Link>
          <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ justifyContent: 'center' }}>
            Get API Key
          </Link>
        </div>
      )}
    </header>
  );
}
