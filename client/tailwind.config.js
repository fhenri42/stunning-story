/* eslint-disable global-require */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  theme: {
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   black: '#212121',
    //   grey: '#3a4042',
    //   blue: '#50717b',
    //   cyan: 'bg-blue-600',
    // },

    extend: {
      keyframes: {
        float01: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        float02: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        swipe: {
          '0%': {
            transform: 'translateX(20px)',
            opacity: 1,
          },
          '80%': {
            opacity: 1,
          },
          '100%': {
            transform: 'translateX(-20px)',
            opacity: 0,
          },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float01 4s ease-in-out infinite',
        bubbleFloat01: 'float02 4s ease-in-out infinite',
        bubbleFloat02: 'float02 3s ease-in-out infinite',
        bubbleFloat03: 'float02 6s ease-in-out infinite',
        bubbleFloat04: 'float02 7s ease-in-out infinite',
        swipe: 'swipe 1s ease-in-out infinite',
        breathing: 'breathing 4s ease-in-out infinite',
        rotate: 'rotate 4s linear infinite',
        'rotate-reverse': 'rotate 4s linear reverse infinite',
      },
      fontSize: {
        '8.5xl': '6.5rem',
      },
      screens: {
        'village-landscape': {
          max: '820px',
          raw: '(orientation: landscape)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
};
