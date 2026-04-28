import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#E8A020',
        'accent-dim': 'rgba(232,160,32,0.12)',
        'accent-glow': 'rgba(232,160,32,0.25)',
        'bg-primary': '#080A0F',
        'bg-surface': '#0D1018',
        'bg-raised': '#111520',
        'bg-float': '#181D2A',
        border: 'rgba(255,255,255,0.07)',
        'border-bright': 'rgba(232,160,32,0.35)',
        muted: '#6B7A99',
        danger: '#EF4444',
        success: '#22C55E',
        warning: '#F59E0B',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Cabinet Grotesk', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        fadeUp: 'fadeUp 0.6s ease forwards',
        slideRight: 'slideRight 0.3s ease forwards',
        grain: 'grain 8s steps(10) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 8px rgba(232,160,32,0.4)' },
          '50%': { opacity: '0.5', boxShadow: '0 0 20px rgba(232,160,32,0.7)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 1%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(4%, -2%)' },
          '50%': { transform: 'translate(-3%, 3%)' },
          '60%': { transform: 'translate(2%, -4%)' },
          '70%': { transform: 'translate(-4%, 1%)' },
          '80%': { transform: 'translate(3%, 3%)' },
          '90%': { transform: 'translate(-2%, -1%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
