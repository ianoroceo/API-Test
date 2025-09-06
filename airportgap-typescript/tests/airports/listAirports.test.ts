import { describe, it, expect } from 'vitest'
import { ApiClient } from '../../src/http/apiClient'
describe('Airports list', () => {
  const api = new ApiClient()
  it('@smoke first page has 30 items and links', async () => {
    const r = await api.base.get('/airports')
    expect(r.status).toBe(200)
    const data = r.data?.data
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(30)
    expect(r.data.links?.self).toBeTruthy()
    expect(r.data.links?.first).toBeTruthy()
    expect(r.data.links?.last).toBeTruthy()
  })
})
