import { describe, it, expect } from 'vitest'
import { ApiClient } from '../../src/http/apiClient.js'

describe('Distance basic', () => {
  const api = new ApiClient()

  it('KIX <-> NRT has unit values', async () => {
    const r = await api.base.post('/airports/distance', { from: 'KIX', to: 'NRT' })
    expect(r.status).toBe(200)
    const a = r.data?.data?.attributes
    expect(a.miles).toBeGreaterThanOrEqual(0)
    expect(a.kilometers).toBeGreaterThanOrEqual(0)
    expect(a.nautical_miles).toBeGreaterThanOrEqual(0)
  })
})
