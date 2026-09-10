'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/dashboard', label: 'Overview', icon: 'grid' },
  { href: '/dashboard/checker', label: 'Email Checker', icon: 'mail' },
  { href: '/dashboard/api', label: 'API', icon: 'key' },
  { href: '/dashboard/domains', label: 'Domains', icon: 'globe' },
  { href: '/dashboard/logs', label: 'Logs', icon: 'list' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'gear' },
  { href: '/dashboard/help', label: 'Help & Support', icon: 'help' },
];

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const stroke = active ? '#031019' : '#8DA9B4';
  const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  if (name === 'grid') {
    return (
      <svg {...props}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }
  if (name === 'mail') {
    return (
      <svg {...props}>
        <path d="M4 4h16v16H4z" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    );
  }
  if (name === 'key') {
    return (
      <svg {...props}>
        <circle cx="8" cy="15" r="4" />
        <path d="M12 15h9v-3" />
        <path d="M18 12v3" />
      </svg>
    );
  }
  if (name === 'globe') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </svg>
    );
  }
  if (name === 'list') {
    return (
      <svg {...props}>
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </svg>
    );
  }
  if (name === 'gear') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.6.9 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DashboardSidebarSection({ open, onClose }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className={`dash-sidebar${open ? ' open' : ''}`}>
      <Link href="/" className="dash-brand" onClick={onClose}>
        <Image src="/assets/images/logo.png" alt="" width={30} height={30} />
        <span>TempCheck</span>
      </Link>

      <nav className="dash-nav">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`dash-nav-item${active ? ' active' : ''}`}
              onClick={onClose}
            >
              <NavIcon name={item.icon} active={active} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="dash-sidebar-card">
        <div className="dash-insight-row">
          <span>Workspace</span>
          <strong className="dash-workspace-health"><span className="dash-dot" /> Healthy</strong>
        </div>
        <div className="dash-plan-summary">
          <span>Plan</span>
          <strong>Business · 100K/mo</strong>
        </div>
        <Link href="/pricing" className="dash-sidebar-upgrade" onClick={onClose}>
          Upgrade <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </aside>
  );
}
