# AirportGap Postman Bundle

This folder contains a ready-to-import **Postman collection** and **environment** for AirportGap.

## Files
- `airportgap-postman-collection.json` — Prebuilt requests + tests (Airports list, Airport by ID, Distance, Favorites CRUD). Includes a **Pre-request Script** to randomize the favorites note.
- `airportgap-env.postman_environment.json` — Environment with `base_url` and `token` variables.

## Import (Postman App)
1. Open **Postman** → **Import** → select both JSON files.
2. Select **AirportGap Environment**.
3. Set your **token** (for Favorites endpoints): `Bearer token=<TOKEN>` is added by tests automatically.
4. Hit **Run** on the collection (Collection Runner).

## Run via Newman (CLI)
```bash
# Install newman if needed
# npm i -g newman

# Run with explicit env file
newman run airportgap-postman-collection.json -e airportgap-env.postman_environment.json --reporters cli

# Or pass token inline
newman run airportgap-postman-collection.json --env-var "token=YOUR_TOKEN"
```

## Variables
- `base_url` defaults to `https://airportgap.com/api`
- `token` — required for favorites (CRUD) tests; leave empty to skip those steps.

## Notes
- The Favorites **Create** request generates a random `note` each run to avoid collisions.
- The collection includes Delete to clean up the created favorite.
