import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',           // kompatybilne z większością przeglądarek
    minify: true,               // opcjonalnie zmniejsza rozmiar pliku
    rollupOptions: {
      output: {
        manualChunks: undefined, // <-- Łączy wszystko w jeden plik JS
      },
    },
  },
});