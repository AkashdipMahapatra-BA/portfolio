# Akashdip Mahapatra - Portfolio

Personal portfolio website built with Next.js, tRPC, and Turborepo.

## Tech Stack

- **Framework** - Next.js 15 (App Router)
- **Monorepo** - Turborepo + npm workspaces
- **API** - tRPC
- **Email** - Resend
- **Animations** - GSAP
- **Database** - Drizzle ORM + Neon (Postgres) - scaffolded, not yet active

## Project Structure

```
portfolio/
├── apps/
│   └── web/          # Next.js frontend
├── packages/
│   ├── api/          # tRPC router (server-only)
│   ├── validators/   # Zod schemas (shared, client-safe)
│   └── db/           # Drizzle ORM schema + Neon client (future use)
```

## Running Locally

### 1. Clone the repo

```bash
git clone https://github.com/AkashdipMahapatra-BA/portfolio.git
cd portfolio
```

### 2. Set up environment variables

```bash
copy .env.example .env
```

Open `.env` and fill in:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx   # from resend.com/api-keys
CONTACT_TO_EMAIL=your@email.com          # where contact form emails go
DATABASE_URL=postgresql://placeholder/placeholder  # not needed yet
```

> The contact form won't send emails without a valid `RESEND_API_KEY`, but the rest of the site works without it.

### 3. Install dependencies

Run from the **root folder** (not inside `apps/web`):

```bash
npm install
```

### 4. Start the dev server

```bash
npm run dev
```

Turborepo will spin up all packages in parallel.

### 5. Open in browser

```
http://localhost:3000
```

## CV / Resume

The PDF is served as a static asset:

```
http://localhost:3000/Akashdip_Mahapatra_CV.pdf
```

## Deployment

Deployed on Vercel. Add the environment variables under **Settings → Environment Variables** in your Vercel project, then connect the GitHub repo for automatic deployments on every push to `main`.
