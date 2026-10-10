export default {
  content: ['./src/**/*.{astro,html,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f6f1e8', cream: 'rgb(var(--ms-cream) / <alpha-value>)', champagne: '#d9c4a0',
        beige: 'rgb(var(--ms-beige) / <alpha-value>)', charcoal: 'rgb(var(--ms-charcoal) / <alpha-value>)', ink: '#0f0e0d', burgundy: '#8f1d24',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
};
