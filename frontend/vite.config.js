import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,      // Forzamos el puerto 5173
    strictPort: true, // Si el 5173 está ocupado, NO saltes al 5174, da un error.
    allowedHosts: ['janyce-eruptive-kristie.ngrok-free.dev', 'localhost', 'all'],
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Laravel server (php artisan serve)
        changeOrigin: true,
        // NO rewrite: Laravel routes expect /api/products, /api/orders, etc.
      }
    }
  }
})
