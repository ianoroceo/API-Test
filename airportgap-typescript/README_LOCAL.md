# Local Setup & Run

## Prerequisites
- Have your **Airport Gap API** token ready (keep it secret).
- Base URL: `https://airportgap.com/api`

## Environment
Copy and edit the example env file:
```bash
cp .env.example .env
# then open .env and set TOKEN=your_token_here
```

> Tests will read `TOKEN` from environment. Do **not** commit real tokens.

## Install & Run
```bash
npm install
# or: pnpm install / yarn

# Linux/macOS
export BASE_URL=https://airportgap.com/api
export TOKEN=$(grep TOKEN .env | cut -d= -f2)   # or set manually
npm test

# Windows (PowerShell)
$env:BASE_URL="https://airportgap.com/api"
$env:TOKEN="your_token_here"
npm test
```

## Project Structure
```
src/
  config/env.ts
  http/apiClient.ts
tests/
  airports/listAirports.test.ts
  distance/distanceBasic.test.ts
  favorites/favoritesCrud.test.ts
```
