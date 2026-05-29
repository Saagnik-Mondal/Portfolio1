/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F6',
        'cream-2': '#F1F0EC',
        ink: '#16151C',
        'ink-soft': '#6E6D77',
        accent: {
          DEFAULT: '#4F46E5',
          soft: '#6366F1',
          tint: '#EEF0FF',
        },
        // legacy spectrum tokens collapsed to the single accent for cohesion
        spectrum: {
          rose: '#4F46E5',
          orange: '#4F46E5',
          yellow: '#4F46E5',
          green: '#4F46E5',
          cyan: '#4F46E5',
          blue: '#4F46E5',
          violet: '#4F46E5',
          magenta: '#4F46E5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
