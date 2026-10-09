import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ms-studio-weddings.pages.dev',
  integrations: [react(), tailwind()],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
