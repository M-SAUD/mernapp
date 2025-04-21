import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  // Disable Rollup’s native bindings in environments that cannot compile them
  build: {
    rollupOptions: {
      // Avoid using native optional bindings
      external: ['@rollup/rollup-linux-x64-gnu'],
    },
    // Optional: Force Vite to use esbuild more strictly
    target: 'esnext',
  },

  server: {
    proxy: {
      "/api": {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
