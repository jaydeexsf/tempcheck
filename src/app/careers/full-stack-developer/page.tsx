import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import FullStackRoleSection from './sections/FullStackRoleSection';

export const metadata = {
  title: 'Full Stack Developer | Careers | TempCheck',
  description:
    'TempCheck is hiring a full stack developer (3+ years) to own the dashboard, public site, and API-backed product experience for disposable email detection.',
};

export default function FullStackDeveloperRolePage() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <FullStackRoleSection />
      </main>
      <Footer />
    </div>
  );
}
