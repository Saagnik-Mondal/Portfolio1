/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm paper canvas — "light cinematic"
        paper: '#F2EEE6',
        'paper-2': '#E8E3D7',
        'paper-3': '#DCD6C7',
        ink: '#15130F',
        'ink-soft': '#736E62',
        'ink-faint': '#A7A294',
        // Primary electric accent + warm cinematic secondary
        accent: {
          DEFAULT: '#3A2BFF',
          soft: '#6C5CFF',
          tint: '#E9E6FF',
        },
        ember: {
          DEFAULT: '#FF5A2C',
          soft: '#FF8A66',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'marquee-rev': 'marquee-rev 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
