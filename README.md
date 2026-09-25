# Regista Frontend

Regista is a football creator and analysis platform. This repository contains the initial Next.js frontend boilerplate only.

## Prerequisites

- Node.js 20.9 or newer
- npm
- The separate Go API running locally when API-backed features are added

## Installation

```bash
npm install
```

## Environment Setup

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.local.example .env.local
```

Set the backend base URL:

```text
NEXT_PUBLIC_API_URL=http://localhost:8080
```

No secrets are required for the initial boilerplate.

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Expected Backend URL

The frontend expects the Go backend at `http://localhost:8080` by default. Set `NEXT_PUBLIC_API_URL` when the backend uses a different URL. The frontend communicates only through the REST client in `lib/api.ts`; it does not connect to PostgreSQL or Redis.

## Current Route Structure

| Route | Source | Purpose |
| --- | --- | --- |
| `/` | `app/page.tsx` | Regista landing placeholder |
| `/dashboard` | `app/(dashboard)/dashboard/page.tsx` | Dashboard placeholder |
| `/tactics-board` | `app/(dashboard)/tactics-board/page.tsx` | Tactics board placeholder |
| `/content-pipeline` | `app/(dashboard)/content-pipeline/page.tsx` | Content pipeline placeholder |
| `/[creator-slug]` | `app/(public)/[creator-slug]/page.tsx` | Public creator placeholder |

The `(dashboard)` and `(public)` directories are route groups, so their names do not appear in URLs.

## Architecture

- Next.js App Router with TypeScript and Tailwind CSS
- No `src/` directory
- Frontend and backend are separate repositories and services
- REST communication is limited to the reusable wrapper in `lib/api.ts`
- No authentication, database models, global state, or product integrations are included
