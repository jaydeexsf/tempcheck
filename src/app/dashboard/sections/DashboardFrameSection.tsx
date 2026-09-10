'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { getSession, logoutUser, UserSession } from '@/utils/auth';
import DashboardSidebarSection from './DashboardSidebarSection';
import DashboardTopBarSection from './DashboardTopBarSection';

export default function DashboardFrameSection({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSessionState] = useState<UserSession | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const current = getSession();
    if (!current.isLoggedIn) {
      router.replace('/login');
      return;
    }
    setSessionState(current);
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    router.replace('/login');
  };

  if (!session) {
    return <div className="dash-app" />;
  }

  return (
    <div className="dash-app">
      {sidebarOpen && <div className="dash-backdrop" onClick={() => setSidebarOpen(false)} />}
      <DashboardSidebarSection open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dash-main">
        <DashboardTopBarSection
          session={session}
          onMenu={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            className="dash-route-content"
            initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
