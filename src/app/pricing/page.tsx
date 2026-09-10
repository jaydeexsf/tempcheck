import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import PricingSection from '@/components/global/PricingSection';

export default function PricingPage() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content" style={{ paddingTop: '40px' }}>
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}

