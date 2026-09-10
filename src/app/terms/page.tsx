import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import TermsHeroSection from './sections/TermsHeroSection';
import TermsContentSection from './sections/TermsContentSection';
import TermsContactSection from './sections/TermsContactSection';

export const metadata = {
  title: 'Terms of Service | TempCheck Developer API',
  description: 'Review TempCheck Terms of Service, developer API usage policies, SLA uptime commitments, rate limits, and compliance framework.',
};

export default function TermsPage() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Page Content Compiling Local Section Components */}
      <main style={{ flex: 1 }}>
        <TermsHeroSection />
        <TermsContentSection />
        <TermsContactSection />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
