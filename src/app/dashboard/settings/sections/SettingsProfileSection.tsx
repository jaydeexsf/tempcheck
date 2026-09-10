'use client';

import React, { useEffect, useState } from 'react';
import { getSession, UserSession } from '@/utils/auth';

export default function SettingsProfileSection() {
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  if (!session) return null;

  return (
    <section>
      <div className="dash-page-head">
        <h1>Settings</h1>
        <p>Workspace profile and plan details. Saving will connect when auth is wired.</p>
      </div>
      <div className="dash-grid-2">
        <div className="dash-panel" style={{ padding: 22 }}>
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>Profile</h2>
          <label className="dash-field">
            <span>FULL NAME</span>
            <input defaultValue={session.name} readOnly />
          </label>
          <label className="dash-field">
            <span>EMAIL</span>
            <input defaultValue={session.email} readOnly />
          </label>
          <button type="button" className="btn btn-secondary" disabled>Save changes</button>
        </div>
        <div className="dash-panel" style={{ padding: 22 }}>
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>Plan</h2>
          <div className="dash-status-item" style={{ marginBottom: 12 }}>
            <span>Current plan</span>
            <strong style={{ textTransform: 'capitalize' }}>{session.plan}</strong>
          </div>
          <div className="dash-status-item" style={{ marginBottom: 16 }}>
            <span>Monthly quota</span>
            <strong>{session.monthlyQuota.toLocaleString()} checks</strong>
          </div>
          <a href="/pricing" className="btn btn-primary">Upgrade plan →</a>
        </div>
      </div>
    </section>
  );
}
