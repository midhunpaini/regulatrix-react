# Regulatrix Frontend (Production Baseline)

Frontend landing application for Regulatrix (ZATCA Phase 2 compliance for Shopify), hardened for production baseline standards.

## Stack

- React 19 + TypeScript (strict mode)
- Vite
- Tailwind CSS
- Zod (runtime schema validation)
- ESLint + Prettier
- Vitest + React Testing Library
- GitHub Actions CI

## Scripts

- `npm run dev`: Start local development server.
- `npm run build`: Create production build.
- `npm run preview`: Preview production build locally.
- `npm run lint`: Run ESLint checks.
- `npm run typecheck`: Run strict TypeScript checks.
- `npm run test`: Run tests in watch mode.
- `npm run test:ci`: Run tests once with coverage output.
- `npm run format`: Auto-format codebase using Prettier.
- `npm run format:check`: Validate formatting without edits.
- `npm run ci`: Local equivalent of CI quality gates.

## Environment Variables

Copy `.env.example` to `.env` and set values:

```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_ENV=development
VITE_RELEASE=dev
```

## Backend API Contracts

### Early Access Submission

- Endpoint: `POST {VITE_API_BASE_URL}/api/early-access`
- Request:
  - `name: string`
  - `email: string`
  - `company: string`
  - `website?: string`
  - `role: "agency" | "merchant"`
- Response:
  - `success: boolean`
  - `message?: string`
  - `error?: string`
  - `request_id?: string`

### Frontend Event Ingestion

- Endpoint: `POST {VITE_API_BASE_URL}/api/frontend-events`
- Event names:
  - `page_view`
  - `early_access_submit_attempt`
  - `early_access_submit_success`
  - `early_access_submit_failure`
  - `frontend_error`
- Response:
  - `success: boolean`
  - `request_id?: string`

## Static Hosting and Security

Nginx reference config is available at `deploy/nginx.conf` and includes:

- SPA fallback (`try_files ... /index.html`)
- Security headers:
  - `Content-Security-Policy`
  - `Referrer-Policy`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Permissions-Policy`
- Cache strategy:
  - immutable long cache for `/assets/*`
  - no-store for `index.html`

For non-Nginx platforms (Vercel, Netlify, CDN edge), apply equivalent headers and cache rules in platform config.

## SEO

- Canonical production domain: `https://regulatrix.tech`
- Static SEO files:
  - `public/robots.txt`
  - `public/sitemap.xml`
- Maintenance rule: whenever a new public route is added, add it to `public/sitemap.xml`.

## Quality Gates

CI workflow (`.github/workflows/ci.yml`) enforces:

- lint
- typecheck
- tests
- build
