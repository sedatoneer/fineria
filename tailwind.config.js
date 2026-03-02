/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEEEFF',
          100: '#D4D4FF',
          200: '#B3B3FF',
          300: '#9D9EFF',
          400: '#8484FF',
          500: '#6C6CE8',
          600: '#5555CC',
          700: '#4040A8',
          800: '#2D2D7A',
          900: '#1C1C52',
        },
        dark: {
          900: '#080812',
          800: '#0D0D1E',
          700: '#12122A',
          600: '#181832',
          500: '#1E1E3C',
          400: '#252548',
        },
        gold: '#F5C518',
        success: '#22D87A',
        danger: '#FF4D6A',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['"Cabinet Grotesk"', '"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'ticker': 'ticker 40s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(108,108,232,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(108,108,232,0.8)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'brand': '0 0 40px rgba(108,108,232,0.3)',
        'brand-lg': '0 0 80px rgba(108,108,232,0.4)',
        'card': '0 4px 32px rgba(0,0,0,0.4)',
        'glass': '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
}
