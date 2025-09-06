import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    reporters: 'default',
    maxThreads: 4,
    minThreads: 1,
    testTimeout: 30000
  }
})
