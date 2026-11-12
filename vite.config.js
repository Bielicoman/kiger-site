import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    target: 'es2020',
    // nada embutido como data: — mantém a CSP estrita (font-src/img-src 'self')
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        links: resolve(import.meta.dirname, 'links/index.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
})
