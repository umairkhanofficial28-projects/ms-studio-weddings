export default {
  content: ['./src/**/*.{astro,html,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f6f1e8', cream: '#fbf8f2', champagne: '#d9c4a0',
        beige: '#e7dccb', charcoal: '#222120', ink: '#0f0e0d', burgundy: '#8f1d24',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
