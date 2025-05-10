/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      background: {
        DEFAULT: '#18181a',
        light: '#18181a',
        dark: '#18181a',
      },
      surface: {
        DEFAULT: '#1e1e20',
        light: '#1e1e20',
        dark: '#1e1e20',
      },
      text: {
        primary: '#bebdc0',
        secondary: '#bebdc0',
        muted: '#909090',
      },
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      accent: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
    },
    fontFamily: {
      sans: ['Arvo', 'system-ui', 'sans-serif'],
    },
    fontWeight: {
      normal: '400',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#bebdc0',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#2563eb',
              },
            },
            h1: {
              fontSize: '1.875rem',
              fontWeight: 400,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.5rem',
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '-0.005em',
              marginBottom: '0.75rem',
            },
            h3: {
              fontSize: '1.125rem',
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: '-0.005em',
              marginBottom: '0.5rem',
            },
            p: {
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '1rem',
            },
            code: {
              fontSize: '0.875rem',
              lineHeight: 1.6,
              fontFamily: '"Fira Code", monospace',
            },
            'ol > li::marker': {
              fontWeight: '400',
              color: '#9ca3af',
            },
            'ul > li::marker': {
              backgroundColor: '#9ca3af',
            },
            strong: {
              color: '#d1d5db',
            },
            blockquote: {
              color: '#d1d5db',
              borderLeftColor: '#3b82f6',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
