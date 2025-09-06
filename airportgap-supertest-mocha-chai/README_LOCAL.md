# AirportGap API Tests — supertest + mocha + chai (JavaScript, CJS)

This is a minimal sample solution using **supertest + mocha + chai**. It hits the live Airport Gap API.

## Prerequisites
- Node.js **16+** (18+ recommended)
- Airport Gap API token for favorites CRUD (optional for public endpoints)

## Setup
```bash
cp .env.example .env
# edit TOKEN=... (optional) and BASE_URL if needed
npm install
```

## Run
```bash
npm test            # full suite
npm run test:smoke  # smoke subset (if you add *smoke*.test.js files)
```

## Notes
- Authorization header format: `Authorization: Bearer token=<TOKEN>`
- Tests skip favorites CRUD if `TOKEN` is not set.
