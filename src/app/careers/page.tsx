import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import CareersHeroSection from './sections/CareersHeroSection';
import CareersListSection from './sections/CareersListSection';

export const metadata = {
  title: 'Careers | TempCheck',
  description: 'TempCheck is hiring two backend engineers (2+ years) and one full stack developer (3+ years) for our disposable email detection platform.',
};

export default function CareersPage() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <CareersHeroSection />
        <CareersListSection />
      </main>
      <Footer />
    </div>
  );
}
