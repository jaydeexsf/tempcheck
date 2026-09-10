'use client';

import React from 'react';

const metrics = [
  { label: 'Emails Checked', value: '48,392', delta: '↑ 12% vs. previous 24h', points: '0,28 12,22 24,24 36,16 48,18 60,10 72,12 84,6' },
  { label: 'Disposable Blocked', value: '8,746', delta: '↑ 18% vs. previous 24h', points: '0,26 12,24 24,20 36,22 48,14 60,12 72,8 84,4' },
  { label: 'Detection Accuracy', value: '99.3%', delta: '↑ 0.2% vs. previous 24h', points: '0,18 12,16 24,17 36,14 48,13 60,12 72,10 84,8' },
  { label: 'API Requests', value: '62,341', delta: '↑ 14% vs. previous 24h', points: '0,30 12,26 24,22 36,18 48,20 60,12 72,14 84,7' },
];

export default function DashboardMetricsSection() {
  return (
    <section className="dash-metrics dash-metrics-rail">
      {metrics.map((metric, index) => (
        <article key={metric.label} className="dash-metric">
          <div className="dash-metric-label-row">
            <label>{metric.label}</label>
            <span className="dash-metric-index">0{index + 1}</span>
          </div>
          <div className="dash-metric-value-row">
            <strong>{metric.value}</strong>
          </div>
          <span className="delta">{metric.delta}</span>
          <div className="dash-metric-chart">
            <svg viewBox="0 0 84 32" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <polyline points={metric.points} stroke="currentColor" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </article>
      ))}
    </section>
  );
}
