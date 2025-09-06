# Local Setup & Run (TypeScript - CommonJS compatible)
## Prerequisites
- Node.js **18+**
- Airport Gap API token (keep it secret). Base URL: `https://airportgap.com/api`
## Environment
```bash
cp .env.example .env
# edit TOKEN=...
```
## Install & Run
```bash
npm install
# Linux/macOS
export BASE_URL=https://airportgap.com/api
export TOKEN=$(grep TOKEN .env | cut -d= -f2)   # or set manually
npm test
# Windows (PowerShell)
$env:BASE_URL="https://airportgap.com/api"
$env:TOKEN="your_token_here"
npm test
```
