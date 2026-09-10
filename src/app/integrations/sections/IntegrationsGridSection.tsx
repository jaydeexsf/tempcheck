'use client';

import React, { useState } from 'react';

interface SDK {
  name: string;
  lang: string;
  version: string;
  command: string;
  snippet: string;
  icon: string;
}

export default function IntegrationsGridSection() {
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const sdks: SDK[] = [
    {
      name: 'Node.js / TypeScript',
      lang: 'TypeScript',
      version: 'v2.1.0',
      command: 'npm install @tempcheck/sdk',
      snippet: `import { TempCheck } from '@tempcheck/sdk';\nconst client = new TempCheck({ apiKey: 'tc_live_...' });\nconst res = await client.verify('test@tempmail.com');`,
      icon: '🟢',
    },
    {
      name: 'Python',
      lang: 'Python 3.8+',
      version: 'v1.4.2',
      command: 'pip install tempcheck',
      snippet: `from tempcheck import TempCheck\nclient = TempCheck(api_key="tc_live_...")\nres = client.verify("test@tempmail.com")`,
      icon: '🐍',
    },
    {
      name: 'Go',
      lang: 'Go 1.18+',
      version: 'v1.2.0',
      command: 'go get github.com/tempcheck/tempcheck-go',
      snippet: `client := tempcheck.NewClient("tc_live_...")\nres, err := client.Verify(ctx, "test@tempmail.com")`,
      icon: '🐹',
    },
    {
      name: 'PHP & Laravel',
      lang: 'PHP 8.1+',
      version: 'v2.0.1',
      command: 'composer require tempcheck/tempcheck-php',
      snippet: `$client = new \\TempCheck\\Client('tc_live_...');\n$result = $client->verify('test@tempmail.com');`,
      icon: '🐘',
    },
    {
      name: 'cURL / REST API',
      lang: 'HTTP API',
      version: 'v1 Spec',
      command: 'curl -X POST https://api.tempcheck.io/v1/verify',
      snippet: `curl -H "Authorization: Bearer tc_live_..." \\\n  -H "Content-Type: application/json" \\\n  -d '{"target": "query"}' https://api.tempcheck.io/v1/verify`,
      icon: '⚡',
    },
    {
      name: 'WordPress Plugin',
      lang: 'PHP / WP',
      version: 'v1.0.5',
      command: 'Download zip or install via WP Admin',
      snippet: `// Automatically filters registration forms & WooCommerce checkout`,
      icon: '🌐',
    },
  ];

  const handleCopy = (command: string, name: string) => {
    navigator.clipboard.writeText(command);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <section
      style={{
        padding: '0 24px 48px 24px',
        maxWidth: '1140px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {sdks.map((sdk, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  <span>{sdk.icon}</span>
                  {sdk.name}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--primary)',
                    background: 'rgba(0, 240, 255, 0.08)',
                    padding: '2px 6px',
                    borderRadius: '2px',
                  }}
                >
                  {sdk.version}
                </span>
              </div>

              {/* Install Command */}
              <div
                style={{
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '8px 12px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  marginBottom: '12px',
                }}
              >
                <code style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {sdk.command}
                </code>
                <button
                  onClick={() => handleCopy(sdk.command, sdk.name)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: copiedName === sdk.name ? 'var(--primary)' : 'var(--text-muted)',
                    fontSize: '11px',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  {copiedName === sdk.name ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* Snippet Code Box */}
              <pre
                style={{
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  padding: '10px 12px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11.5px',
                  lineHeight: 1.5,
                  color: 'var(--text-secondary)',
                  overflowX: 'auto',
                  margin: 0,
                }}
              >
                {sdk.snippet}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
