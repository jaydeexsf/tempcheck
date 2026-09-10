import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import IntegrationsHeroSection from './sections/IntegrationsHeroSection';
import IntegrationsGridSection from './sections/IntegrationsGridSection';
import IntegrationsCalloutSection from './sections/IntegrationsCalloutSection';

export const metadata = {
  title: 'SDKs & Integrations | TempCheck Developer Platform',
  description: 'Official SDK libraries for Node.js, Python, Go, PHP, Java, Ruby, and cURL REST APIs.',
};

export default function IntegrationsPage() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <IntegrationsHeroSection />
        <IntegrationsGridSection />
        <IntegrationsCalloutSection />
      </main>
      <Footer />
    </div>
  );
}
