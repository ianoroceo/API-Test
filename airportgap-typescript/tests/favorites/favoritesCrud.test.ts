import { describe, it, expect } from 'vitest'
import { randomUUID } from 'node:crypto'
import { ApiClient } from '../../src/http/apiClient'
import { Env } from '../../src/config/env'

describe('Favorites CRUD', () => {
  const api = new ApiClient()

  it('create, read, update, delete', async function () {
    if (!Env.token) {
      console.warn('Skipping favorites test: TOKEN not set')
      return
    }

    const note = `created-by-tests-${randomUUID()}`
    const create = await api.auth.post('/favorites', { airport_id: 'JFK', note })
    expect(create.status).toBe(201)
    const id = create.data?.data?.id
    expect(id).toBeTruthy()

    const list = await api.auth.get('/favorites')
    expect(list.status).toBe(200)
    const ids = (list.data?.data ?? []).map((x: any) => x.id)
    expect(ids).toContain(id)

    const newNote = `${note}-updated`
    const upd = await api.auth.patch(`/favorites/${id}`, { note: newNote })
    expect(upd.status).toBe(200)
    const one = await api.auth.get(`/favorites/${id}`)
    expect(one.data?.data?.attributes?.note).toBe(newNote)

    const del = await api.auth.delete(`/favorites/${id}`)
    expect(del.status).toBe(204)
  })
})
