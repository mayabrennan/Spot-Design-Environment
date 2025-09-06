/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#313a45',
          hover: '#6c7179',
        },
        accent: {
          DEFAULT: '#5857e8',
          hover: '#8181ff',
          light: '#f5f5fe',
        },
        success: {
          DEFAULT: '#00b070',
          light: '#e8fff7',
        },
        warning: {
          DEFAULT: '#ff950a',
          light: '#ffe9cc',
        },
        grid: '#e4e4e7',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '100%' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '100%' }],
        'lg': ['20px', { lineHeight: '100%' }],
      },
      spacing: {
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
      },
      borderRadius: {
        'sm': '2px',
        'lg': '8px',
      },
    },
  },
  plugins: [],
} 