const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()

const BASE_URL = process.env.BASE_URL || 'https://airportgap.com/api'

describe('Airport by ID', () => {
  it('lookup MNL returns required fields', async () => {
    const res = await request(BASE_URL).get('/airports/MNL')
    expect(res.status).to.equal(200)
    const attr = res.body?.data?.attributes || {}
    expect(attr).to.include.keys(['name','city','country','iata','latitude','longitude','timezone'])
    expect(attr.iata).to.equal('MNL')
  })

  it('invalid IATA should return 404', async () => {
    const res = await request(BASE_URL).get('/airports/XXX')
    expect([404,400]).to.include(res.status)
  })
})
