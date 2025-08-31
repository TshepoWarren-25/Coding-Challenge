# Flag Explorer (NestJS + Next.js)

This variant uses a NestJS backend and a Next.js frontend.

## Quick start (dev)

### Prereqs
- Node 20+
- npm

### Install
```bash
npm ci
```

### Run backend (dev)
```bash
cd backend
npm run start:dev
# http://localhost:3001
```

### Run frontend (dev)
```bash
cd frontend
npm run dev
# http://localhost:3000
```

API:
- GET /countries -> [{ name, flag }]
- GET /countries/:name -> { name, population, capital, flag }

OpenAPI spec: backend/openapi.yaml

