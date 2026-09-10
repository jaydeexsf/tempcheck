import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        main: 'var(--bg-main)',
        card: 'var(--bg-card)',
        'border-subtle': 'var(--border-subtle)',
        'border-default': 'var(--border-default)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-active': 'var(--primary-active)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
      },
      boxShadow: {
        cyan: '0 0 20px rgba(0, 240, 255, 0.3)',
        'cyan-soft': '0 0 12px rgba(0, 240, 255, 0.18)',
        panel: '0 12px 40px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'cyan-fade': 'linear-gradient(135deg, var(--primary), var(--primary-active))',
        'panel-fade': 'linear-gradient(135deg, rgba(4, 23, 37, 0.98), rgba(3, 12, 20, 0.98))',
      },
    },
  },
  plugins: [],
};

export default config;
