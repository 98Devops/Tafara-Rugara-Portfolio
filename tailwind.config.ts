import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Brand palette
        electric: {
          DEFAULT: '#00D4FF',
          50: '#e6faff',
          100: '#b3f1ff',
          200: '#80e8ff',
          300: '#4ddfff',
          400: '#1ad6ff',
          500: '#00D4FF',
          600: '#00aacf',
          700: '#0080a0',
          800: '#005570',
          900: '#002b40',
        },
        violet: {
          DEFAULT: '#7C3AED',
          50: '#f5f0ff',
          100: '#e0d0ff',
          200: '#c4a8ff',
          300: '#a87fff',
          400: '#9060ff',
          500: '#7C3AED',
          600: '#6229cc',
          700: '#4a1faa',
          800: '#321488',
          900: '#1a0a66',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        navy: {
          DEFAULT: '#0A0F1E',
          50: '#e8eaf0',
          100: '#c5c9d8',
          200: '#9ea5be',
          300: '#7781a4',
          400: '#56628f',
          500: '#3a4475',
          600: '#2b335c',
          700: '#1d2444',
          800: '#10162d',
          900: '#0A0F1E',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#080d1a',
        },
        primary: {
          50: '#e6faff',
          300: '#4ddfff',
          400: '#1ad6ff',
          500: '#00D4FF',
          600: '#00aacf',
        },
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: [
          'var(--font-jetbrains-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Consolas',
          'monospace',
        ],
      },
      backgroundImage: {
        'glow-conic':
          'conic-gradient(from 0deg at 50% 50%, #00D4FF 0deg, #7C3AED 120deg, #10b981 240deg, #00D4FF 360deg)',
        'gradient-radial':
          'radial-gradient(ellipse at center, var(--tw-gradient-from), var(--tw-gradient-to))',
        'hero-gradient':
          'linear-gradient(135deg, #0A0F1E 0%, #0d1a3a 50%, #0A0F1E 100%)',
      },
      boxShadow: {
        'glow-cyan':
          '0 0 20px rgba(0,212,255,0.35), 0 0 60px rgba(0,212,255,0.15)',
        'glow-violet':
          '0 0 20px rgba(124,58,237,0.35), 0 0 60px rgba(124,58,237,0.15)',
        'glow-emerald':
          '0 0 20px rgba(16,185,129,0.35), 0 0 60px rgba(16,185,129,0.15)',
        'glow-sm': '0 0 10px rgba(0,212,255,0.25)',
        card: '0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)',
        'card-hover':
          '0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,212,255,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'grid-flow': 'gridFlow 20s linear infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        typing: 'typing 3.5s steps(40,end), blink 0.75s step-end infinite',
        counter: 'countUp 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        gridFlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,212,255,0.3)' },
          '50%': {
            boxShadow:
              '0 0 30px rgba(0,212,255,0.7), 0 0 60px rgba(0,212,255,0.3)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        scanLine: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00D4FF' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
