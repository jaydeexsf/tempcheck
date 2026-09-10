import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import FaqHeroSection from './sections/FaqHeroSection';
import FaqAccordionSection from './sections/FaqAccordionSection';
import FaqContactSection from './sections/FaqContactSection';

export const metadata = {
  title: 'FAQ | TempCheck Developer Platform',
  description: 'Frequently Asked Questions regarding TempCheck APIs, rate limits, pricing plans, and security compliance.',
};

export default function FaqPage() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <FaqHeroSection />
        <FaqAccordionSection />
        <FaqContactSection />
      </main>
      <Footer />
    </div>
  );
}
