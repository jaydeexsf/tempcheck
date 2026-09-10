import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import SlaHeroSection from './sections/SlaHeroSection';
import SlaCommitmentSection from './sections/SlaCommitmentSection';
import SlaMetricsSection from './sections/SlaMetricsSection';

export const metadata = {
  title: 'Service Level Agreement (SLA) | TempCheck Developer Platform',
  description: 'TempCheck 99.9% uptime commitment, availability metrics, credit refund schedule, and SLA terms.',
};

export default function SlaPage() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <SlaHeroSection />
        <SlaCommitmentSection />
        <SlaMetricsSection />
      </main>
      <Footer />
    </div>
  );
}
