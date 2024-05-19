import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => { 
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.MAPS_KEY': JSON.stringify(env.MAPS_KEY),
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    plugins: [react()],
  }
})
