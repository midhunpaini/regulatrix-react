# Regulatrix Frontend (React + Vite)

Landing page starter for Regulatrix (ZATCA Phase 2 compliance for Shopify) built with React and Tailwind CSS.

## Stack

- React 19
- Vite
- Tailwind CSS

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Backend Integration

This frontend posts early access form data to your backend:

- Endpoint called by UI: `POST {VITE_API_BASE_URL}/api/early-access`
- Configure API base URL in `.env`:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

Webhook handling should live in your backend service (FastAPI), not in this frontend.
