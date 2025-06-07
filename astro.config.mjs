import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  integrations: [mdx(), sitemap(), react(), tailwind()],
  // not actually prefetching all pages, astro is not generating the runtime script for injecting prefetch links
  // prefetchAll: true is to ensure script is loaded. all anchor tags still have prefetch specifically configured
  prefetch: {
    prefetchAll: true
  }
});