import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
// `isSsrBuild` distingue les deux passes du script `build` : le bundle client
// et le bundle SSR consommé par scripts/prerender.mjs. Le découpage en chunks
// ne vaut que pour le client — en SSR, React est externe et rollup refuse de
// le placer dans un chunk manuel.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Pas de sourcemap en production : elle exposait tout le code source de
    // l'app en clair (1,9 Mo servis publiquement sur /assets/*.js.map).
    sourcemap: false,
    // Un seul chunk de 644 Ko partait au navigateur pour chaque page. Le
    // contenu étant prérendu, cela ne pesait pas sur le LCP mais sur
    // l'hydratation (INP, TBT). Le socle React, framer-motion et les icônes
    // sont isolés : identiques d'une page à l'autre, ils se mettent en cache
    // une fois pour tout le site.
    rollupOptions: isSsrBuild
      ? {}
      : {
          // Deux pages HTML : le site, et la page de consentement OAuth du
          // connecteur MCP (servie sur /oauth/consent, cf. netlify.toml). Elle
          // a son propre point d'entrée pour ne charger ni les pixels ni le
          // SDK d'attribution du site, et pour rester hors du prérendu SEO.
          input: {
            main: resolve(__dirname, 'index.html'),
            oauthConsent: resolve(__dirname, 'oauth-consent.html'),
          },
          output: {
            manualChunks: {
              react: ['react', 'react-dom', 'react-router-dom'],
              motion: ['framer-motion'],
              icons: ['lucide-react'],
            },
          },
        }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: ['lucide-react'],
    exclude: []
  }
}))
