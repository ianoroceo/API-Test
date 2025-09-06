import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    reporters: 'default',
    poolOptions: { threads: { singleThread: false } },
    maxThreads: 4,
    minThreads: 1,
    testTimeout: 30000
  }
})
