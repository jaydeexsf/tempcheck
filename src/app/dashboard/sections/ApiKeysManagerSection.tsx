'use client';

import React, { useState } from 'react';
import { ApiKeyItem, createNewApiKey, revokeApiKey } from '@/utils/auth';

interface Props {
  apiKeys: ApiKeyItem[];
  totalQuota: number;
  onKeysUpdated: (updatedKeys: ApiKeyItem[]) => void;
}

export default function ApiKeysManagerSection({ apiKeys, totalQuota, onKeysUpdated }: Props) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [revealedKeyIds, setRevealedKeyIds] = useState<Record<string, boolean>>({});

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const created = createNewApiKey(newKeyName.trim());
    onKeysUpdated([created, ...apiKeys]);
    setNewKeyName('');
    setShowCreateModal(false);
  };

  const handleRevoke = (id: string) => {
    if (confirm('Are you sure you want to revoke this API key? Applications using this key will immediately fail authentication.')) {
      const updated = revokeApiKey(id);
      onKeysUpdated(updated);
    }
  };

  const copyToClipboard = (keyString: string, id: string) => {
    navigator.clipboard.writeText(keyString);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const toggleReveal = (id: string) => {
    setRevealedKeyIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="dash-api-card">
      <div className="dash-api-header">
        <div>
          <h2>API Keys &amp; Shared Quota Usage</h2>
          <p>
            All active keys share your monthly plan request limit ({totalQuota.toLocaleString()} checks/mo).
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
          style={{ padding: '10px 18px', fontSize: '13px' }}
        >
          + Create Secret API Key
        </button>
      </div>

      <div className="dash-api-table-wrap">
        <table className="dash-api-table">
          <thead>
            <tr>
              <th>KEY NAME &amp; IDENTIFIER</th>
              <th>SECRET TOKEN</th>
              <th>CREATED</th>
              <th>REQUESTS USED</th>
              <th>QUOTA SHARE</th>
              <th>STATUS</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map(item => {
              const isRevealed = revealedKeyIds[item.id];
              const sharePercentage = Math.round((item.requestsUsed / totalQuota) * 100);
              const maskedKey = item.key.substring(0, 8) + '••••••••••••••••' + item.key.substring(item.key.length - 4);

              return (
                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {/* Name */}
                  <td style={{ padding: '16px 10px' }}>
                    <div style={{ color: '#FFF', fontWeight: 600, fontSize: '14px' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>{item.id}</div>
                  </td>

                  {/* Secret Key Token */}
                  <td style={{ padding: '16px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`dash-secret-token${isRevealed ? ' revealed' : ''}`}>
                        {isRevealed ? item.key : maskedKey}
                      </span>
                      <button
                        onClick={() => toggleReveal(item.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '11px' }}
                      >
                        {isRevealed ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </td>

                  {/* Created */}
                  <td style={{ padding: '16px 10px', fontSize: '12px' }}>{item.createdAt}</td>

                  {/* Requests Used */}
                  <td style={{ padding: '16px 10px' }}>
                    <span style={{ color: '#FFF', fontWeight: 700 }}>{item.requestsUsed.toLocaleString()}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}> checks</span>
                  </td>

                  {/* Quota Share */}
                  <td style={{ padding: '16px 10px', minWidth: '120px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ color: '#08E1E8' }}>{sharePercentage}% share</span>
                    </div>
                    <div style={{ width: '100%', height: '5px', background: '#020C14', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, sharePercentage)}%`, background: '#08E1E8' }} />
                    </div>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '16px 10px' }}>
                    {item.status === 'active' ? (
                      <span className="dash-pill green">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="dash-pill red">
                        REVOKED
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '16px 10px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        onClick={() => copyToClipboard(item.key, item.id)}
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '12px' }}
                      >
                        {copiedKeyId === item.id ? '✓ Copied' : 'Copy'}
                      </button>
                      {item.status === 'active' && (
                        <button
                          onClick={() => handleRevoke(item.id)}
                            className="btn btn-danger"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(2, 12, 20, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="dash-modal" style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '16px',
            maxWidth: '460px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Create New Secret API Key
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '24px', lineHeight: 1.5 }}>
              Enter a name for this API key (e.g., "Mobile Backend API" or "Production Server"). New keys will share your monthly request quota.
            </p>

            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>
                  KEY NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Production Web App"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="dash-form-input"
                  autoFocus
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Generate Key →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
