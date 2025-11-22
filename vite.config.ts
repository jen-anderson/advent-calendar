///<reference types='vitest' />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./client/setupTests.ts'],
  },
})
//globals is a convenience, so we no longer need to import describe, it, expect, vi from vitest in every file
