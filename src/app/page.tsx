'use client';

import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';

import HeroSection from './(landing)/sections/HeroSection';
import FeaturesSection from './(landing)/sections/FeaturesSection';
import SignupFlowSection from './(landing)/sections/SignupFlowSection';
import PricingSection from './(landing)/sections/PricingSection';

import InteractiveDemo from '@/components/InteractiveDemo';
import DomainIntelligenceSection from '@/components/landing/DomainIntelligenceSection';
import ApiCodeTabs from '@/components/ApiCodeTabs';
import DecisionLayerSection from '@/components/landing/DecisionLayerSection';
import ProductionReliabilitySection from '@/components/landing/ProductionReliabilitySection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';

export default function Home() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <HeroSection />
        <div id="demo">
          <InteractiveDemo />
        </div>
        <SignupFlowSection />
        <DomainIntelligenceSection />
        <FeaturesSection />
        <ApiCodeTabs />
        <DecisionLayerSection />
        <ProductionReliabilitySection />
        <PricingSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
