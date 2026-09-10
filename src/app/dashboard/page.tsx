import React from 'react';
import DashboardHeroSection from './sections/DashboardHeroSection';
import DashboardMetricsSection from './sections/DashboardMetricsSection';
import DashboardWorkspaceSection from './sections/DashboardWorkspaceSection';

export default function DashboardPage() {
  return (
    <>
      <DashboardHeroSection />
      <DashboardMetricsSection />
      <DashboardWorkspaceSection />
    </>
  );
}
