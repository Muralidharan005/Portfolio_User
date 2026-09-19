import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/About':      'http://localhost:8080',
      '/education':  'http://localhost:8080',
      '/project':    'http://localhost:8080',
      '/skill':      'http://localhost:8080',
      '/internship': 'http://localhost:8080',
      '/contact':    'http://localhost:8080',
      '/images':     'http://localhost:8080',
      '/resume':     'http://localhost:8080',
    }
  }
})
