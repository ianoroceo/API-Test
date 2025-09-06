const request = require('supertest')
const { expect } = require('chai')
const { randomUUID } = require('crypto')
require('dotenv').config()

const BASE_URL = process.env.BASE_URL || 'https://airportgap.com/api'
const TOKEN = process.env.TOKEN

describe('Favorites CRUD (auth)', () => {
  const auth = () => request(BASE_URL).set('Authorization', `Bearer token=${TOKEN}`)

  it('create, read, update, delete favorite (skips if no TOKEN)', async function () {
    if (!TOKEN) {
      this.skip()
    }

    // create
    const note = `created-by-tests-${randomUUID()}`
    const create = await auth()
      .post('/favorites')
      .send({ airport_id: 'JFK', note })
      .set('Content-Type','application/json')
    expect(create.status).to.equal(201)
    const favId = create.body?.data?.id
    expect(favId).to.be.ok

    // read list
    const list = await auth().get('/favorites')
    expect(list.status).to.equal(200)
    const ids = (list.body?.data ?? []).map(x => x.id)
    expect(ids).to.include(favId)

    // update
    const newNote = `${note}-updated`
    const upd = await auth()
      .patch(`/favorites/${favId}`)
      .send({ note: newNote })
    expect(upd.status).to.equal(200)

    const one = await auth().get(`/favorites/${favId}`)
    expect(one.status).to.equal(200)
    expect(one.body?.data?.attributes?.note).to.equal(newNote)

    // delete
    const del = await auth().delete(`/favorites/${favId}`)
    expect(del.status).to.equal(204)
  })

  it('401 when missing Authorization header', async () => {
    const res = await request(BASE_URL).get('/favorites')
    expect([401,403]).to.include(res.status)
  })
})
