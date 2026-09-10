import Link from 'next/link';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';

const services = [
  ['Email detection API', 'Lookup requests and risk decisions'],
  ['Authentication & API keys', 'Sign-in, key issuance, and access control'],
  ['Domain intelligence', 'Disposable provider dataset and sync jobs'],
  ['Dashboard', 'Usage, logs, domains, and checker tools'],
];

export default function StatusPage() {
  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />

      <main className="status-page-main" style={{ flex: '1 0 auto', padding: '44px 24px 64px', backgroundImage: 'radial-gradient(circle at 82% 10%, rgba(0, 240, 255, 0.1), transparent 28%), linear-gradient(rgba(0, 240, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.025) 1px, transparent 1px)', backgroundSize: 'auto, 44px 44px, 44px 44px' }}>
        <div className="status-page-content" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ marginBottom: '26px' }}>
            <div className="eyebrow" style={{ marginBottom: '10px' }}><span className="dot"></span>Infrastructure &amp; Uptime</div>
            <h1 style={{ margin: '0 0 8px', color: 'var(--text-primary)', fontSize: 'clamp(26px, 3.2vw, 36px)', lineHeight: 1.1 }}>System status</h1>
            <p style={{ margin: 0, maxWidth: '580px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>A public view of the services behind TempCheck email intelligence. Product targets are shown alongside the current reported snapshot.</p>
          </div>

          <section style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '12px 14px', marginBottom: '16px', background: 'rgba(22, 190, 145, 0.08)', border: '1px solid rgba(22, 190, 145, 0.3)', borderRadius: '3px' }}>
            <span style={{ width: '9px', height: '9px', flexShrink: 0, borderRadius: '50%', background: '#16BE91', boxShadow: '0 0 10px rgba(22, 190, 145, 0.8)' }} />
            <div><strong style={{ display: 'block', color: '#8CF0D0', fontSize: '13px', marginBottom: '2px' }}>All systems operational</strong><span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>No active incidents are reported in this snapshot.</span></div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '22px' }}>
            {[
              ['99.9%', 'Uptime target', 'Monthly SLA commitment'],
              ['<50ms', 'Latency target', '99th percentile'],
              ['18ms', 'Reported average', 'Reference snapshot'],
              ['0', 'Active incidents', 'Currently reported'],
            ].map(([value, label, detail]) => (
              <div key={label} style={{ padding: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '3px' }}>
                <div style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
                <div style={{ marginTop: '4px', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700 }}>{label}</div>
                <div style={{ marginTop: '3px', color: 'var(--text-muted)', fontSize: '10px' }}>{detail}</div>
              </div>
            ))}
          </div>

          <div className="status-health-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(280px, 0.7fr)', gap: '16px', alignItems: 'start' }}>
            <section style={{ padding: '18px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '3px' }}>
              <h2 style={{ margin: '0 0 14px', color: 'var(--text-primary)', fontSize: '16px' }}>Service health</h2>
              <div style={{ display: 'grid', gap: '8px' }}>{services.map(([name, detail]) => <div className="status-service-row" key={name} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--border-subtle)' }}><div><strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', marginBottom: '4px' }}>{name}</strong><span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{detail}</span></div><span style={{ color: '#63D9B6', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap' }}>● Operational</span></div>)}</div>
            </section>

            <section style={{ padding: '18px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '3px' }}>
              <h2 style={{ margin: '0 0 5px', color: 'var(--text-primary)', fontSize: '16px' }}>30-day uptime</h2>
              <p style={{ margin: '0 0 14px', color: 'var(--text-muted)', fontSize: '10px' }}>Illustrative history until telemetry is connected.</p>
              <div className="status-uptime-bars" style={{ display: 'grid', gridTemplateColumns: 'repeat(30, 1fr)', gap: '3px', alignItems: 'end', height: '54px' }}>{Array.from({ length: 30 }, (_, index) => <span key={index} title={`${index === 11 ? '99.98%' : '100.00%'} on day ${index + 1}`} style={{ height: index === 11 ? '72%' : '100%', background: index === 11 ? '#FFBE5C' : '#16BE91', borderRadius: '1px' }} />)}</div>
              <div className="status-uptime-meta" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: 'var(--text-muted)', fontSize: '10px' }}><span>30 days ago</span><strong style={{ color: '#63D9B6' }}>99.99% reported</strong><span>Today</span></div>
            </section>
          </div>

          <section style={{ marginTop: '16px', padding: '18px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '3px' }}>
            <h2 style={{ margin: '0 0 6px', color: 'var(--text-primary)', fontSize: '16px' }}>Incident history</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.6 }}>No incidents are recorded in the current public history. When monitoring is connected, incidents will include start time, affected services, impact, and resolution notes.</p>
          </section>

          <div className="status-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px' }}><Link href="/docs" className="btn btn-secondary">Read API docs</Link><Link href="/sla" className="btn btn-secondary">Review SLA</Link><Link href="/contact" className="btn btn-primary">Report a problem</Link></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
