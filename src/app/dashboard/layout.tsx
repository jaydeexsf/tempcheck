import React from 'react';
import DashboardFrameSection from './sections/DashboardFrameSection';

export const metadata = {
  title: 'Dashboard | TempCheck',
  description: 'Monitor disposable email detections, API usage, and workspace health.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardFrameSection>{children}</DashboardFrameSection>;
}
