'use client';

import React from 'react';
import { motion } from 'framer-motion';
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

function RevealSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <HeroSection />
        <RevealSection>
          <div id="demo">
            <InteractiveDemo />
          </div>
        </RevealSection>
        <RevealSection><SignupFlowSection /></RevealSection>
        <RevealSection><DomainIntelligenceSection /></RevealSection>
        <RevealSection><FeaturesSection /></RevealSection>
        <RevealSection><ApiCodeTabs /></RevealSection>
        <RevealSection><DecisionLayerSection /></RevealSection>
        <RevealSection><ProductionReliabilitySection /></RevealSection>
        <RevealSection><PricingSection /></RevealSection>
        <RevealSection><FinalCtaSection /></RevealSection>
      </main>
      <Footer />
    </div>
  );
}
