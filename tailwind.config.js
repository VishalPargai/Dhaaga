/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f5f0e7',
        deep: '#eae2d5',
        ink: '#302e2a',
        muted: '#777469',
        sage: '#9da991',
        olive: '#626b50',
        taupe: '#b6a18a',
        line: 'rgba(48, 46, 42, 0.16)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0.45', transform: 'translateY(7px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        rise: 'rise 0.35s ease both',
      },
      screens: {
        'xl': '1500px',
        'md-down': { 'max': '900px' },
        'sm-down': { 'max': '640px' },
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
}