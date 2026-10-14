/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tinyfish: {
          50: '#fff5f2',
          100: '#ffe8e1',
          200: '#ffd3c4',
          300: '#ffb299',
          400: '#ff8261',
          500: '#f5572b',
          600: '#d74b28',
          700: '#b83818',
          800: '#922f17',
          900: '#752b18',
          950: '#401309',
        },
        dark: {
          950: '#090a0f',
          900: '#0f111a',
          850: '#141824',
          800: '#1a1f30',
          700: '#262d45',
          600: '#343c5b',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
