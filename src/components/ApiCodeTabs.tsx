'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ApiCodeTabs() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sceneRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scene = sceneRef.current;
    let removePointerListeners = () => {};
    let scanDirection = 1;
    let isHovering = false;
    let activeScan: gsap.core.Timeline | null = null;
    const ambientTweens: gsap.core.Tween[] = [];
    const context = gsap.context(() => {
      ambientTweens.push(gsap.to('.cyber-cube-wrap', {
        y: -8,
        duration: 2.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }));

      ambientTweens.push(gsap.to('.cyber-glow-ring', {
        scale: 1.12,
        opacity: 0.72,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }));

      ambientTweens.push(gsap.to('.particle-node', {
        y: -12,
        scale: 1.35,
        opacity: 1,
        duration: 1.8,
        stagger: 0.35,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }));

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = scene.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        gsap.to('.cyber-cube-wrap', { rotateX: y * -10, rotateY: x * 12, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });

        const hoveredFace = x < -0.18 ? '.face-left' : x > 0.18 ? '.face-right' : y < -0.18 ? '.face-top' : y > 0.18 ? '.face-bottom' : '.face-front';
        gsap.to('.cube-face', { opacity: 0.5, filter: 'brightness(0.7)', duration: 0.2, overwrite: 'auto' });
        gsap.to(hoveredFace, { opacity: 1, filter: 'brightness(1.35)', boxShadow: 'inset 0 0 28px rgba(0, 240, 255, 0.4), 0 0 30px rgba(0, 240, 255, 0.5)', duration: 0.2, overwrite: 'auto' });
      };

      const resetPointer = () => {
        gsap.to('.cyber-cube-wrap', { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
        gsap.to('.cube-face', { opacity: 1, filter: 'brightness(1)', boxShadow: 'inset 0 0 20px rgba(0, 240, 255, 0.2), 0 0 20px rgba(0, 240, 255, 0.15)', duration: 0.25, overwrite: 'auto' });
      };

      const runDecisionScan = () => {
        activeScan?.kill();
        const from = scanDirection === 1 ? '-15%' : '115%';
        const to = scanDirection === 1 ? '115%' : '-15%';
        scanDirection *= -1;
        activeScan = gsap.timeline({ defaults: { overwrite: 'auto' } });
        activeScan.set('.decision-scan-line', { left: from, opacity: 0.9 })
          .to('.decision-scan-line', { left: to, duration: 0.8, ease: 'power2.inOut' })
          .to('.cyber-cube-wrap', { scale: 1.08, duration: 0.18, ease: 'power2.out' }, 0)
          .to('.cyber-cube-wrap', { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, 0.18)
          .to('.orbiting-ring', { scale: 1.14, opacity: 0.95, duration: 0.2, ease: 'power2.out' }, 0)
          .to('.orbiting-ring', { scale: 1, opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.2)
          .to('.cyber-glow-ring', { opacity: 1, scale: 1.2, duration: 0.2 }, 0)
          .to('.cyber-glow-ring', { opacity: 0.72, scale: 1.12, duration: 0.65 }, 0.2);
        if (isHovering) activeScan.pause();
      };

      const pauseScene = () => {
        isHovering = true;
        ambientTweens.forEach((tween) => tween.pause());
        activeScan?.pause();
        scene.classList.add('is-hovering');
      };

      const resumeScene = () => {
        isHovering = false;
        ambientTweens.forEach((tween) => tween.resume());
        activeScan?.resume();
        scene.classList.remove('is-hovering');
      };

      const handleSceneKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          runDecisionScan();
        }
      };

      const handlePointerLeave = () => {
        resetPointer();
        resumeScene();
      };

      scene.addEventListener('pointermove', handlePointerMove);
      scene.addEventListener('pointerenter', pauseScene);
      scene.addEventListener('pointerleave', handlePointerLeave);
      scene.addEventListener('click', runDecisionScan);
      scene.addEventListener('keydown', handleSceneKeyDown);
      removePointerListeners = () => {
        scene.removeEventListener('pointermove', handlePointerMove);
        scene.removeEventListener('pointerenter', pauseScene);
        scene.removeEventListener('pointerleave', handlePointerLeave);
        scene.removeEventListener('click', runDecisionScan);
        scene.removeEventListener('keydown', handleSceneKeyDown);
      };
    }, sceneRef);

    return () => {
      removePointerListeners();
      context.revert();
    };
  }, []);

  return (
    <section className="api-integration-section" id="api">
      <div className="api-container">
        {/* Left Column: Heading, Highlights & CTAs */}
        <div className="api-left-col">
          <h2 className="section-title">One API call. One decision.</h2>
          <p className="section-desc">
            Integrate disposable email detection into your signup, trial, or authentication flow in minutes with our high-throughput REST API and idiomatic SDKs.
          </p>

          <ul className="api-highlights">
            <li>
              <span className="check-bullet">✓</span> Sub-100ms response time latency globally
            </li>
            <li>
              <span className="check-bullet">✓</span> Real-time updates with over 10M+ monitored domains
            </li>
            <li>
              <span className="check-bullet">✓</span> Official SDKs for Node.js, Python, PHP, and Go
            </li>
            <li>
              <span className="check-bullet">✓</span> Detailed confidence score &amp; domain risk attributes
            </li>
          </ul>

          <div className="api-actions">
            <a href="/docs" className="btn btn-primary btn-large">
              Read API Documentation
              <svg className="arrow-icon" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="#031019" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/signup" className="btn btn-secondary btn-large">Get Free API Key</a>
          </div>
        </div>

        {/* Right Column: Multi-Axis 3D Tumbling Cube with Layered 3D Vector SVG Icons */}
        <div className="api-right-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', position: 'relative' }}>
          <div className="cyber-3d-scene" ref={sceneRef} role="button" tabIndex={0} aria-label="Run an API decision scan">
            {/* Ambient Radial Glow */}
            <div className="cyber-glow-ring" />
            <div className="decision-scan-line" aria-hidden="true" />

            {/* Orbital Ring 1 (X-Axis) */}
            <div className="orbiting-ring ring-x" />
            {/* Orbital Ring 2 (Y-Axis) */}
            <div className="orbiting-ring ring-y" />

            {/* Floating Particle Nodes */}
            <div className="particle-node p1" />
            <div className="particle-node p2" />
            <div className="particle-node p3" />
            <div className="particle-node p4" />

            {/* 3D Multi-Axis Tumbling Cube */}
            <div className="cyber-cube-wrap">
              <div className="cyber-cube">
                {/* Face 1: Front - 3D Code Brackets Icon */}
                <div className="cube-face face-front">
                  <div className="icon-3d-badge">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="url(#grad-code)" />
                      <path d="M12 14L8 18L12 22M24 14L28 18L24 22M20 12L16 24" stroke="#031019" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <defs>
                        <linearGradient id="grad-code" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#00F0FF" />
                          <stop offset="1" stopColor="#70F8FF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="cube-title">REST API</div>
                  <div className="cube-tag">v1.2.0 SPEC</div>
                </div>

                {/* Face 2: Back - 3D Lightning Speed Icon */}
                <div className="cube-face face-back">
                  <div className="icon-3d-badge">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="url(#grad-bolt)" />
                      <polygon points="20 6 9 20 18 20 16 30 27 16 18 16 20 6" fill="#031019" />
                      <defs>
                        <linearGradient id="grad-bolt" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#32F5FF" />
                          <stop offset="1" stopColor="#00C8D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="cube-title">18ms EDGE</div>
                  <div className="cube-tag">LATENCY</div>
                </div>

                {/* Face 3: Right - 3D Shield Security Icon */}
                <div className="cube-face face-right">
                  <div className="icon-3d-badge">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="url(#grad-shield)" />
                      <path d="M18 8L27 12V18C27 23.5 23.2 28.5 18 30C12.8 28.5 9 23.5 9 18V12L18 8Z" stroke="#031019" strokeWidth="2.5" fill="none" />
                      <path d="M14 18L16.5 20.5L22 15" stroke="#031019" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <defs>
                        <linearGradient id="grad-shield" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#00F0FF" />
                          <stop offset="1" stopColor="#00A0B0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="cube-title">SECURITY</div>
                  <div className="cube-tag">TLS 1.3</div>
                </div>

                {/* Face 4: Left - 3D Key Icon */}
                <div className="cube-face face-left">
                  <div className="icon-3d-badge">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="url(#grad-key)" />
                      <circle cx="15" cy="18" r="5" stroke="#031019" strokeWidth="2.5" />
                      <path d="M18.5 18H28M24 18V22M27 18V21" stroke="#031019" strokeWidth="2.5" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="grad-key" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#70F8FF" />
                          <stop offset="1" stopColor="#00F0FF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="cube-title">AUTH KEYS</div>
                  <div className="cube-tag">BEARER</div>
                </div>

                {/* Face 5: Top - 3D Server Stack Icon */}
                <div className="cube-face face-top">
                  <div className="icon-3d-badge">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="url(#grad-server)" />
                      <rect x="8" y="9" width="20" height="6" rx="2" stroke="#031019" strokeWidth="2" />
                      <rect x="8" y="21" width="20" height="6" rx="2" stroke="#031019" strokeWidth="2" />
                      <circle cx="12" cy="12" r="1" fill="#031019" />
                      <circle cx="12" cy="24" r="1" fill="#031019" />
                      <defs>
                        <linearGradient id="grad-server" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#00F0FF" />
                          <stop offset="1" stopColor="#32F5FF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="cube-title">TELEMETRY</div>
                  <div className="cube-tag">10M+ DOMAINS</div>
                </div>

                {/* Face 6: Bottom - 3D Verified Check Icon */}
                <div className="cube-face face-bottom">
                  <div className="icon-3d-badge">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect width="36" height="36" rx="8" fill="url(#grad-check)" />
                      <polyline points="10 18 16 24 26 12" stroke="#031019" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <defs>
                        <linearGradient id="grad-check" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#32F5FF" />
                          <stop offset="1" stopColor="#70F8FF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="cube-title">VERIFIED</div>
                  <div className="cube-tag">99.9% UPTIME</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Axis 3D Tumbling Animation Styles */}
      <style jsx global>{`
        .cyber-3d-scene {
          width: 340px;
          height: 340px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
        }

        .cyber-3d-scene.is-hovering .cyber-cube,
        .cyber-3d-scene.is-hovering .orbiting-ring,
        .cyber-3d-scene.is-hovering .particle-node {
          animation-play-state: paused;
        }

        .cyber-glow-ring {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, rgba(0, 240, 255, 0.03) 65%, transparent 80%);
          filter: blur(25px);
          animation: pulseGlow 4.5s infinite ease-in-out;
        }

        .decision-scan-line {
          position: absolute;
          top: 10%;
          left: -15%;
          width: 2px;
          height: 80%;
          opacity: 0;
          background: linear-gradient(transparent, var(--primary), transparent);
          box-shadow: 0 0 14px var(--primary);
          transform: rotate(16deg);
          pointer-events: none;
        }

        .orbiting-ring.ring-x {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          border: 1px stroke rgba(0, 240, 255, 0.25);
          border-top: 2px solid var(--primary);
          border-bottom: 2px solid rgba(112, 248, 255, 0.7);
          animation: spinRingX 11s infinite linear;
          pointer-events: none;
        }

        .orbiting-ring.ring-y {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          border: 1px stroke rgba(0, 240, 255, 0.15);
          border-left: 2px solid #32F5FF;
          border-right: 2px solid rgba(0, 240, 255, 0.5);
          animation: spinRingY 15s infinite linear reverse;
          pointer-events: none;
        }

        .particle-node {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary);
          animation: floatParticle 4s infinite ease-in-out alternate;
        }
        .particle-node.p1 { top: 30px; left: 40px; animation-delay: 0s; }
        .particle-node.p2 { top: 60px; right: 30px; animation-delay: 0.8s; }
        .particle-node.p3 { bottom: 40px; left: 50px; animation-delay: 1.6s; }
        .particle-node.p4 { bottom: 50px; right: 40px; animation-delay: 2.4s; }

        .cyber-cube-wrap {
          width: 150px;
          height: 150px;
          position: relative;
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .cyber-cube {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          animation: multiAxisTumble 20s infinite linear;
        }

        .cube-face {
          position: absolute;
          width: 150px;
          height: 150px;
          background: rgba(4, 23, 37, 0.95);
          border: 1px solid rgba(0, 240, 255, 0.6);
          border-radius: 2px;
          box-shadow: inset 0 0 20px rgba(0, 240, 255, 0.2), 0 0 20px rgba(0, 240, 255, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          backdrop-filter: blur(12px);
          color: var(--text-primary);
          user-select: none;
        }

        .icon-3d-badge {
          filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.5));
          transition: transform 0.2s ease;
        }

        .cube-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          text-align: center;
        }

        .cube-tag {
          font-size: 9px;
          font-weight: 700;
          color: var(--primary);
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.05em;
        }

        /* 3D Box Face Positions (75px offset = half of 150px) */
        .face-front  { transform: rotateY(0deg) translateZ(75px); }
        .face-back   { transform: rotateY(180deg) translateZ(75px); }
        .face-right  { transform: rotateY(90deg) translateZ(75px); }
        .face-left   { transform: rotateY(-90deg) translateZ(75px); }
        .face-top    { transform: rotateX(90deg) translateZ(75px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(75px); }

        /* Multi-Axis Tumble Animation (Spins in all directions smoothly) */
        @keyframes multiAxisTumble {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          25% {
            transform: rotateX(90deg) rotateY(180deg) rotateZ(45deg);
          }
          50% {
            transform: rotateX(180deg) rotateY(360deg) rotateZ(90deg);
          }
          75% {
            transform: rotateX(270deg) rotateY(540deg) rotateZ(135deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(720deg) rotateZ(180deg);
          }
        }

        @keyframes spinRingX {
          0% {
            transform: rotateX(70deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(70deg) rotateZ(360deg);
          }
        }

        @keyframes spinRingY {
          0% {
            transform: rotateY(70deg) rotateZ(0deg);
          }
          100% {
            transform: rotateY(70deg) rotateZ(360deg);
          }
        }

        @keyframes floatParticle {
          0% { transform: translateY(0px) scale(1); opacity: 0.5; }
          100% { transform: translateY(-10px) scale(1.4); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
