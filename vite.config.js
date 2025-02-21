import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/child_ai_h5/',
  plugins: [react()],
  server: {
    port: 3001
  }
})
