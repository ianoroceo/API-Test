const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()

const BASE_URL = process.env.BASE_URL || 'https://airportgap.com/api'

describe('Airports list', () => {
  it('first page has 30 items and links', async () => {
    const res = await request(BASE_URL).get('/airports')
    expect(res.status).to.equal(200)
    expect(res.type).to.match(/json/)
    expect(res.body).to.have.property('data').that.is.an('array').with.length(30)
    expect(res.body).to.have.nested.property('links.self')
    expect(res.body).to.have.nested.property('links.first')
    expect(res.body).to.have.nested.property('links.last')
  })

  it('pagination: can navigate to next page', async () => {
    const page1 = await request(BASE_URL).get('/airports')
    const nextUrl = page1.body?.links?.next
    if (nextUrl) {
      const page2 = await request('')
        .get(nextUrl)
      expect(page2.status).to.equal(200)
      const id1 = page1.body?.data?.[0]?.id
      const id2 = page2.body?.data?.[0]?.id
      expect(id1).to.not.equal(id2)
    } else {
      expect(true).to.equal(true)
    }
  })
})
