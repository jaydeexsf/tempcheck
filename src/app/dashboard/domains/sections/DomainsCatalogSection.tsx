'use client';

import React from 'react';

const domains = [
  { domain: 'temp-mail.com', type: 'Disposable', hits: '1,084', share: '12.4%' },
  { domain: 'mailinator.com', type: 'Disposable', hits: '862', share: '9.8%' },
  { domain: 'guerrillamail.com', type: 'Disposable', hits: '641', share: '7.3%' },
  { domain: 'protonmail.com', type: 'Legitimate', hits: '1,422', share: '—' },
  { domain: 'gmail.com', type: 'Legitimate', hits: '6,910', share: '—' },
  { domain: 'acmecorp.io', type: 'Corporate', hits: '318', share: '—' },
];

export default function DomainsCatalogSection() {
  return (
    <section>
      <div className="dash-page-head">
        <h1>Domains</h1>
        <p>Watch the providers showing up in your traffic and how often they are blocked.</p>
      </div>
      <div className="dash-panel">
        <table className="dash-table">
          <thead>
            <tr>
              <th>DOMAIN</th>
              <th>TYPE</th>
              <th>HITS (24H)</th>
              <th>BLOCK SHARE</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((item) => (
              <tr key={item.domain}>
                <td className="dash-email">{item.domain}</td>
                <td>
                  <span className={`dash-pill ${item.type === 'Disposable' ? 'red' : item.type === 'Corporate' ? 'yellow' : 'green'}`}>
                    {item.type}
                  </span>
                </td>
                <td>{item.hits}</td>
                <td>{item.share}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
