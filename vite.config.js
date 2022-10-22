import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      styl: {
        additionalData: `
          $base-dark = rgb(26,26,29)
          $light-grey = rgb(78,78,80)
          $light-red = rgb(195,7,63)
          $claret = rgb(111,34,82)
          $blood-red = rgb(149,7,64)
        `
      }
    }
  }
})
