import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/customer': {
        target: 'http://localhost:8084',
        changeOrigin: true,
      },
      '/products': {
        target: 'http://localhost:8084',
        changeOrigin: true,
      },
    },
  },
})
