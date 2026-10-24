// @ts-check
import preact from '@astrojs/preact';
import { defineConfig } from 'astro/config';

// Static site: every page is prerendered, and the check runs entirely in the browser
// (no server, no analytics, no cookies; docs/plan.md §4).
export default defineConfig({
  integrations: [preact()],
  output: 'static',
  devToolbar: { enabled: false },
});
