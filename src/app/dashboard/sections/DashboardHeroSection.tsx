'use client';

import React, { useEffect, useState } from 'react';
import { getSession } from '@/utils/auth';

export default function DashboardHeroSection() {
  const [name, setName] = useState('Alex');

  useEffect(() => {
    const sessionName = getSession().name;
    if (sessionName && sessionName.trim()) {
      setName(sessionName.split(' ')[0]);
    }
  }, []);

  return (
    <section className="dash-hero">
      <div className="dash-hero-background" aria-hidden="true" />
      <div className="dash-hero-copy">
        <h1>Welcome back, {name} 👋</h1>
        <p>Here&apos;s what&apos;s happening with your email security today.</p>
      </div>

    </section>
  );
}
