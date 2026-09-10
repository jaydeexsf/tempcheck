'use client';

import { FormEvent, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';

const fieldStyle = { width: '100%', boxSizing: 'border-box' as const, padding: '9px 10px', background: 'rgba(2, 12, 20, 0.7)', border: '1px solid var(--border-default)', borderRadius: '3px', color: 'var(--text-primary)', font: 'inherit', fontSize: '12px' };

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    const page = document.querySelector('.app-layout') as HTMLElement | null;
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animation = gsap.to(page, { backgroundColor: '#04131d', duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true });
    return () => {
      animation.kill();
    };
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); event.currentTarget.reset(); }
  return <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}><Navbar /><main style={{ flex: '1 0 auto', padding: '48px 24px 72px' }}><div style={{ maxWidth: '980px', margin: '0 auto' }}><div className="eyebrow" style={{ marginBottom: '12px' }}><span className="dot" />Developer support</div><h1 style={{ margin: '0 0 10px', color: 'var(--text-primary)', fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.2 }}>Contact &amp; Support</h1><p style={{ maxWidth: '620px', margin: '0 0 30px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>Get help with an integration, an account question, an incident, or an enterprise deployment.</p><div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 0.75fr) minmax(300px, 1.25fr)', gap: '18px', alignItems: 'start' }}><div style={{ display: 'grid', gap: '12px' }}><a href="mailto:support@tempcheck.io" style={{ padding: '18px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '3px' }}><strong style={{ display: 'block', color: 'var(--primary)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '7px', letterSpacing: '0.12em' }}>Technical support</strong><span style={{ color: 'var(--text-primary)', fontSize: '13px' }}>support@tempcheck.io</span></a><div style={{ padding: '18px', borderLeft: '2px solid var(--primary)', color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.6 }}>Standard requests receive a reply within one business day.</div></div><div style={{ padding: '22px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '3px' }}>{sent ? <div style={{ textAlign: 'center', padding: '28px 0' }}><h2 style={{ color: 'var(--text-primary)', fontSize: '18px', marginBottom: '8px' }}>Request received</h2><p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.6 }}>Our team will review your message and reply within one business day.</p><button type="button" className="btn btn-secondary" onClick={() => setSent(false)}>Send another request</button></div> : <form onSubmit={submit}><h2 style={{ margin: '0 0 6px', color: 'var(--text-primary)', fontSize: '17px' }}>Send a request</h2><p style={{ margin: '0 0 18px', color: 'var(--text-secondary)', fontSize: '12px' }}>Tell us what you need help with.</p><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}><label style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Name<input name="name" required style={{ ...fieldStyle, display: 'block', marginTop: '6px' }} /></label><label style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Email<input name="email" required type="email" style={{ ...fieldStyle, display: 'block', marginTop: '6px' }} /></label></div><label style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Message<textarea name="message" required minLength={10} rows={5} style={{ ...fieldStyle, display: 'block', marginTop: '6px', resize: 'vertical' }} /></label><button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>Send request</button></form>}</div></div></div></main><Footer /></div>;
}
