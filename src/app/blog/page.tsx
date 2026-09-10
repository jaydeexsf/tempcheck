import React from 'react';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import BlogHeroSection from './sections/BlogHeroSection';
import BlogListSection from './sections/BlogListSection';
import BlogNewsletterSection from './sections/BlogNewsletterSection';

export const metadata = {
  title: 'Engineering Blog | TempCheck Developer Platform',
  description: 'Technical articles, low-latency API architecture, security research, and developer tutorials from the TempCheck engineering team.',
};

export default function BlogPage() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <BlogHeroSection />
        <BlogListSection />
        <BlogNewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
