import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: change `site` to your real Netlify URL (or custom domain) after the first deploy.
export default defineConfig({
  site: 'https://weddingsbyumair.netlify.app',
  integrations: [react(), tailwind(), sitemap()],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
