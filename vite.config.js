import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',           // kompatybilne z większością przeglądarek
    minify: true,               // opcjonalnie zmniejsza rozmiar pliku
    manualChunks: {
  // Grupa 1: Podstawa działania (najwyższy priorytet cache)
  'vendor-react': ['react', 'react-dom'],
  
  // Grupa 2: Ciężki interfejs (rzadkie zmiany, duża waga)
  'vendor-mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
  
  // Grupa 3: Twoje dane (częste zmiany, mała waga)
  'machines-data': ['./src/data/converted2.json', './src/data/csvjson2.json'],
}
  },
});