'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthMode = 'login' | 'signup';

type AuthExperienceProps = {
  mode: AuthMode;
};

const copy = {
  login: {
    eyebrow: 'Welcome back',
    title: 'Return to a cleaner signup flow.',
    description: 'Sign in to manage your API keys, monitor usage, and keep your verification layer moving.',
    submit: 'Sign in',
    switchPrompt: "Don't have an account?",
    switchLabel: 'Create one',
    switchHref: '/signup',
  },
  signup: {
    eyebrow: 'Start protecting signups',
    title: 'Give every new account a better first check.',
    description: 'Create your TempCheck workspace and get ready to filter disposable emails before they become abuse.',
    submit: 'Create account',
    switchPrompt: 'Already have an account?',
    switchLabel: 'Sign in',
    switchHref: '/login',
  },
} as const;

export default function AuthExperience({ mode }: AuthExperienceProps) {
  const router = useRouter();
  const text = copy[mode];
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    window.setTimeout(() => {
      router.push('/coming-soon');
    }, 650);
  };

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="TempCheck product introduction">
        <div className="auth-visual-backdrop" />
        <div className="auth-visual-content">
          <Link href="/" className="auth-brand">
            <Image src="/assets/images/logo.png" alt="" width={34} height={34} priority />
            <span>TempMail</span>
          </Link>

          <div className="auth-visual-copy">
            <span className="auth-kicker"><span className="auth-kicker-dot" />Email intelligence for teams</span>
            <h2>Trust the address before you trust the account.</h2>
            <p>TempCheck helps modern products spot disposable email addresses in the quiet moment before signup becomes a problem.</p>
          </div>

          <div className="auth-visual-art">
            <Image
              src="/assets/images/cyber-envelope-shield.png"
              alt="A glowing shield protecting an email envelope"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="auth-visual-footer">
            <span>10M+ domains monitored</span>
            <span>Built for high-volume signup flows</span>
          </div>
        </div>
      </section>

      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="auth-panel-inner">
          <div className="auth-mobile-brand">
            <Link href="/" className="auth-brand">
              <Image src="/assets/images/logo.png" alt="" width={30} height={30} />
              <span>TempMail</span>
            </Link>
          </div>

          <div className="auth-heading">
            <span className="auth-heading-eyebrow">{text.eyebrow}</span>
            <h1 id="auth-title">{text.title}</h1>
            <p>{text.description}</p>
          </div>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <label className="auth-field">
                <span>Full name</span>
                <input name="name" type="text" autoComplete="name" placeholder="Alex Mercer" required />
              </label>
            )}

            <label className="auth-field">
              <span>{mode === 'signup' ? 'Work email' : 'Email address'}</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <span className="auth-password-wrap">
                <input name="password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="At least 8 characters" minLength={8} required />
                <button type="button" className="auth-password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </span>
            </label>

            {mode === 'login' && <Link href="/contact" className="auth-forgot">Need help signing in?</Link>}

            {mode === 'signup' && <label className="auth-check"><input type="checkbox" required /> <span>I agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.</span></label>}

            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Preparing your workspace...' : text.submit}
              {!isSubmitting && <span aria-hidden="true">-&gt;</span>}
            </button>
          </form>

          <div className="auth-divider"><span>Secure by design</span></div>
          <p className="auth-switch-copy">{text.switchPrompt} <Link href={text.switchHref}>{text.switchLabel}</Link></p>
        </div>
      </section>
    </main>
  );
}
