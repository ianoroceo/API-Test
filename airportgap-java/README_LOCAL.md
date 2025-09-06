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

## Run
```bash
# Linux/macOS
export BASE_URL=https://airportgap.com/api
export TOKEN=$(cat .env | grep TOKEN | cut -d= -f2)  # or set manually
mvn -q clean test

# Windows (PowerShell)
$env:BASE_URL="https://airportgap.com/api"
$env:TOKEN="your_token_here"
mvn -q clean test
```

## Project Structure
```
src/
  main/java/
    config/Env.java
    http/ApiClient.java
  test/java/
    spec/airports/ListAirportsTest.java
    spec/distance/DistanceBasicTest.java
    spec/favorites/FavoritesCrudTest.java
```

## Notes
- Authorization header format: `Authorization: Bearer token=<TOKEN>`
- Basic retry/backoff on 429 is included in `ApiClient.rateLimitRetry(...)`.
