'use client';

import React, { useEffect, useState } from 'react';
import { getApiKeys, getSession, ApiKeyItem } from '@/utils/auth';
import ApiKeysManagerSection from '../../sections/ApiKeysManagerSection';

export default function ApiKeysPageSection() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [quota, setQuota] = useState(1000);

  useEffect(() => {
    setKeys(getApiKeys());
    setQuota(getSession().monthlyQuota);
  }, []);

  return (
    <section className="dash-page-shell">
      <div className="dash-page-head">
        <h1>API</h1>
        <p>Create, copy, and revoke secret keys. All active keys share one monthly quota.</p>
      </div>
      <ApiKeysManagerSection apiKeys={keys} totalQuota={quota} onKeysUpdated={setKeys} />
    </section>
  );
}
