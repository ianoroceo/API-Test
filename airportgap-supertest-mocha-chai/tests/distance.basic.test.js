const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()

const BASE_URL = process.env.BASE_URL || 'https://airportgap.com/api'

describe('Distance basics', () => {
  it('KIX -> NRT returns non-negative unit values', async () => {
    const res = await request(BASE_URL)
      .post('/airports/distance')
      .send({ from: 'KIX', to: 'NRT' })
      .set('Content-Type','application/json')
    expect(res.status).to.equal(200)
    const a = res.body?.data?.attributes || {}
    expect(a.miles).to.be.a('number').and.gte(0)
    expect(a.kilometers).to.be.a('number').and.gte(0)
    expect(a.nautical_miles).to.be.a('number').and.gte(0)
  })

  it('missing "to" should return 422', async () => {
    const res = await request(BASE_URL)
      .post('/airports/distance')
      .send({ from: 'KIX' })
      .set('Content-Type','application/json')
    expect([422,400]).to.include(res.status)
  })
})
