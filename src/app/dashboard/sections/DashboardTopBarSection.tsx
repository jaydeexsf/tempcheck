'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { UserSession } from '@/utils/auth';

interface Props {
  session: UserSession;
  onMenu: () => void;
  onLogout: () => void;
}

export default function DashboardTopBarSection({ session, onMenu, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="dash-topbar">
      <button type="button" className="dash-icon-btn dash-menu-btn" onClick={onMenu} aria-label="Open navigation">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <motion.button
        type="button"
        className={`dash-icon-btn${notificationsOpen ? ' selected' : ''}`}
        aria-label="Notifications"
        aria-expanded={notificationsOpen}
        onClick={() => setNotificationsOpen((value) => !value)}
        whileTap={{ scale: 0.94 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 01-3.4 0" />
        </svg>
        {!notificationsOpen && <span className="badge" />}
      </motion.button>

      <AnimatePresence>
        {notificationsOpen && (
          <motion.div
            className="dash-notifications"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          >
            <div className="dash-notifications-head">
              <strong>Notifications</strong>
              <span>1 new</span>
            </div>
            <div className="dash-notification-item">
              <span className="dash-dot" />
              <div>
                <strong>System operational</strong>
                <p>All TempCheck services are running normally.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative' }}>
        <motion.button
          type="button"
          className="dash-user-chip"
          onClick={() => setOpen((v) => !v)}
          aria-label={`Open profile menu for ${session.name}`}
          title={session.name}
          aria-expanded={open}
          whileTap={{ scale: 0.92 }}
        >
          <span className="dash-avatar">{session.name.charAt(0).toUpperCase()}</span>
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              className="dash-menu"
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            >
              <Link href="/dashboard/settings" onClick={() => setOpen(false)}>Account settings</Link>
              <Link href="/pricing" onClick={() => setOpen(false)}>Upgrade plan</Link>
              <button type="button" onClick={onLogout}>Log out</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
