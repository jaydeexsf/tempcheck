import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import BackendRoleSection from './sections/BackendRoleSection';

export const metadata = {
  title: 'Backend Engineer | Careers | TempCheck',
  description:
    'TempCheck is hiring two backend engineers (2+ years) to build real-time disposable email detection APIs, domain intelligence, and production reliability.',
};

export default function BackendEngineerRolePage() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <BackendRoleSection />
      </main>
      <Footer />
    </div>
  );
}
