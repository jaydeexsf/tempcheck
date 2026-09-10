import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import AboutHeroSection from './sections/AboutHeroSection';
import AboutMissionSection from './sections/AboutMissionSection';
import AboutInfrastructureSection from './sections/AboutInfrastructureSection';

export const metadata = {
  title: 'About Us | TempCheck Developer Platform',
  description: 'Learn about TempCheck, our global weather telemetry and email verification infrastructure, mission, and engineering pillars.',
};

export default function AboutPage() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <AboutHeroSection />
        <AboutMissionSection />
        <AboutInfrastructureSection />
      </main>
      <Footer />
    </div>
  );
}
