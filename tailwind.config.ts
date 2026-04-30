import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:        '#FF6B35',
        'primary-dark': '#D95A28',
        'primary-light':'#FF8F5E',
        secondary:      '#2D6A4F',
        accent:         '#FFB703',
        dark:           '#1B1B2F',
        'dark-2':       '#2B2B42',
        gray:           '#6B7280',
        light:          '#F9FAFB',
        border:         '#E5E7EB',
      },
      fontFamily: {
        sans:   ['var(--font-poppins)', 'sans-serif'],
        display:['var(--font-fredoka)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '18px',
        sm:      '10px',
        xl:      '24px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0,0,0,.06)',
        DEFAULT: '0 4px 20px rgba(0,0,0,.08)',
        lg: '0 12px 40px rgba(0,0,0,.14)',
        md: '0 4px 24px rgba(0,0,0,.10)',
      },
      keyframes: {
        shapeFloat: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(25px,-25px) scale(1.04)' },
          '66%':     { transform: 'translate(-15px,20px) scale(.97)' },
        },
        pawRise: {
          '0%':      { transform: 'translateY(110vh) rotate(0deg)', opacity: '0' },
          '8%,92%':  { opacity: '.055' },
          '100%':    { transform: 'translateY(-120px) rotate(360deg)', opacity: '0' },
        },
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        waPulse: {
          '0%,100%': { boxShadow: '0 4px 20px rgba(37,211,102,.4)' },
          '50%':     { boxShadow: '0 4px 40px rgba(37,211,102,.7), 0 0 0 12px rgba(37,211,102,.08)' },
        },
        toastIn: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        slideInR: {
          from: { opacity: '0', transform: 'translateX(18px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'shape-float': 'shapeFloat 12s ease-in-out infinite',
        'paw-rise':    'pawRise 12s linear infinite',
        'float-y':     'floatY 3s ease-in-out infinite',
        'wa-pulse':    'waPulse 2s ease-in-out infinite',
        'toast-in':    'toastIn .3s ease',
        'slide-in-r':  'slideInR .3s ease',
      },
    },
  },
  plugins: [],
}

export default config
