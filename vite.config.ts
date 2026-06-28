/// <reference types="vitest" />

import path from 'path'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { createRequire } from 'module'

// import via require to avoid TypeScript moduleResolution errors with the
// ESM-only types in @tailwindcss/vite when using older TS moduleResolution.
const require = createRequire(import.meta.url)
const tailwindcss = require('@tailwindcss/vite')?.default || require('@tailwindcss/vite')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    legacy(),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
