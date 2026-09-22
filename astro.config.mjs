// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.techblues.com.br',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api/lead': {
          target: 'https://automacoes.integratudo.com.br',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/lead/, '/webhook/techblues-lead'),
        },
      },
    },
  },
});
