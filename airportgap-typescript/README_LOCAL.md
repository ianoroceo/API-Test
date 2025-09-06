# AirportGap API Tests (TypeScript • ESM)

ESM-ready Vitest project for the Airport Gap exam.

## Prerequisites
- Node.js **18+**
- Airport Gap API token (keep it secret). Base URL: `https://airportgap.com/api`

## Setup
```bash
# unzip
cd airportgap-typescript-esm
cp .env.example .env
# put your token in .env
```

## Run
```bash
npm install

# Linux/macOS
export BASE_URL=https://airportgap.com/api
export TOKEN=$(grep TOKEN .env | cut -d= -f2)
npm test

# Windows PowerShell
$env:BASE_URL="https://airportgap.com/api"
$env:TOKEN="<your_token>"
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
