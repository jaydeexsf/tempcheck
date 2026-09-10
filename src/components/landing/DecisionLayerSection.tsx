'use client';

import React from 'react';

const decisionSteps = [
  {
    number: '01',
    label: 'INGEST',
    title: 'The request arrives',
    text: 'Pass an email address to the API and receive a structured response without changing your existing signup form or identity flow.',
  },
  {
    number: '02',
    label: 'ANALYZE',
    title: 'Signals become context',
    text: 'TempCheck checks the domain against live intelligence, provider patterns, and risk attributes in milliseconds.',
  },
  {
    number: '03',
    label: 'DECIDE',
    title: 'Your product stays in control',
    text: 'Use the confidence score and reason codes to allow, challenge, or block the signup with a policy your team owns.',
  },
];

export default function DecisionLayerSection() {
  return (
    <section className="decision-layer-section" aria-labelledby="decision-layer-title">
      <div className="decision-layer-grid" aria-hidden="true" />
      <div className="decision-layer-orbit decision-layer-orbit-one" aria-hidden="true" />
      <div className="decision-layer-orbit decision-layer-orbit-two" aria-hidden="true" />

      <div className="decision-layer-container">
        <div className="decision-layer-intro">
          <h2 id="decision-layer-title" className="section-title">
            Turn an email address into a <span className="decision-accent">clear next step.</span>
          </h2>
          <p className="section-desc">
            Signup quality is not a single yes-or-no lookup. It is a fast, observable decision made from the right signals at the moment they matter. TempCheck gives your team the context to move good users forward while quietly filtering disposable intent.
          </p>
          <p className="decision-layer-note">
            <span className="decision-pulse" />
            <span><strong>One response.</strong> Enough context to make the call.</span>
          </p>
        </div>

        <div className="decision-steps">
          {decisionSteps.map((step) => (
            <article className="decision-step" key={step.number}>
              <div className="decision-step-topline">
                <span className="decision-step-number">{step.number}</span>
                <span className="decision-step-label">{step.label}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="decision-layer-footer">
          <span className="decision-line" />
          <span>Designed for the moment before trust is granted.</span>
          <span className="decision-line" />
        </div>
      </div>
    </section>
  );
}
