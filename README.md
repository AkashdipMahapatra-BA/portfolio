# Akashdip Mahapatra — Portfolio

Personal portfolio website built with Next.js, tRPC, and Turborepo.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running Locally](#running-locally)
- [Modern Frontend Architecture — Why `.env`?](#modern-frontend-architecture)
- [Contact Form — How It Works](#contact-form)
- [Monorepo — Why Turborepo?](#monorepo)
- [Deployment — GitHub to Vercel](#deployment)
- [CV / Resume](#cv--resume)
- [Extending This Site — Blog, Newsletter & Comments](#extending)

---

<a name="tech-stack"></a>
## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Monorepo | Turborepo + npm workspaces |
| API | tRPC |
| Validation | Zod (via `packages/validators`) |
| Email | Resend |
| Animations | GSAP |
| Database | Drizzle ORM + Neon (Postgres) — scaffolded, not yet active |

---

<a name="project-structure"></a>
## Project Structure

```
portfolio/
├── apps/
│   └── web/              # Next.js frontend (pages, components, styles)
├── packages/
│   ├── api/              # tRPC router — server-only, never imported by the browser
│   ├── validators/       # Zod schemas — shared, safe to import on client or server
│   └── db/               # Drizzle ORM schema + Neon client — future use
├── .env.example          # Template for environment variables
├── turbo.json            # Turborepo task pipeline config
└── package.json          # Workspace root — run all commands from here
```

The import graph is strictly one-directional:

```
web → validators ← api
```

This means the browser never accidentally loads server-only code (like tRPC internals or the Resend API key).

---

<a name="running-locally"></a>
## Running Locally

Since this project uses **Turborepo**, you manage everything from the **root folder** — not from inside `apps/web`.

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

> The contact form won't send emails without a valid `RESEND_API_KEY`, but the rest of the site works fine without it.

### 3. Install dependencies

Always run from the **root folder** — npm workspaces will link all packages automatically:

```bash
npm install
```

### 4. Start the dev server

```bash
npm run dev
```

Turborepo spins up all packages in parallel — Next.js frontend + tRPC backend simultaneously.

Alternatively: `npx turbo run dev`

### 5. Open in browser

```
http://localhost:3000
```

---

<a name="modern-frontend-architecture"></a>
## Modern Frontend Architecture — Why `.env`?

If you come from an AWS cloud infrastructure background, the easiest way to understand Next.js is to think of it not just as a website, but as a **unified infrastructure definition**.

Next.js is a **hybrid framework**. When deployed to Vercel, it automatically splits your codebase into two separate infrastructure components:

```
Your Next.js codebase
        ↓
┌───────────────────────────────────────────────────────┐
│                      Vercel                           │
│                                                       │
│  ┌─────────────────────┐   ┌───────────────────────┐ │
│  │   Static Assets     │   │  Serverless Functions  │ │
│  │  (CDN — global)     │   │  (/api/trpc routes)    │ │
│  │                     │   │                        │ │
│  │  Like:              │   │  Like:                 │ │
│  │  AWS S3 +           │   │  AWS Lambda behind     │ │
│  │  CloudFront         │   │  API Gateway           │ │
│  └─────────────────────┘   └───────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

- **Frontend UI** — your Hero, Experience, Projects, Education sections are compiled into hyper-optimised static HTML, CSS, and JavaScript. These are cached on a global CDN and served instantly to visitors worldwide
- **Backend API Layer** — the tRPC router (`/api/trpc`) is compiled into ephemeral serverless functions. These spin up on demand, run your server code, and shut down — you never manage a server

### Why the `.env` key must stay server-side

- **The risk** — if this were a pure static site, `RESEND_API_KEY` would be bundled into the JavaScript the browser downloads. Anyone could open DevTools → Network tab and steal your key to send spam using your Resend account
- **The solution** — the key lives only inside the Vercel serverless function's secure environment. The browser never sees it. It sends form data to the function over an encrypted tRPC call, the function reads the key, sends the email, and returns `{ success: true }`

---

<a name="contact-form"></a>
## Contact Form — How It Works

The contact form is the only dynamic part of the site. Everything else is static.

**Stack used:**
- **Resend** — email delivery service (like a postman). Sends the email to your Gmail
- **tRPC** — type-safe API layer between the form and the server
- **Zod** (`packages/validators`) — validates name, email, subject, message before anything hits the server
- **react-hook-form** — manages form state and wires Zod validation to the UI

**End-to-end flow:**

```
Visitor fills ContactForm.tsx
        ↓
Zod validates input (client-side, instant feedback)
        ↓
trpc.contact.send.useMutation() fires
        ↓
Next.js API route → apps/web/src/app/api/trpc/[trpc]/route.ts
        ↓
packages/api/src/router/contact.ts runs on Vercel serverless function
        ↓
Resend sends email to CONTACT_TO_EMAIL (your Gmail)
        ↓
Browser receives { success: true } → shows confirmation UI
```

**Why not Mailchimp?** Mailchimp is for marketing newsletters (one-to-many). Resend is for transactional emails (one contact form submission → one email to you). Resend is the correct tool here.

**Why no database yet?** `packages/db` is scaffolded for a future feature — storing contact submissions so you can review them in a dashboard. It is never called in the current codebase. `DATABASE_URL` can stay as a placeholder.

---

<a name="monorepo"></a>
## Monorepo — Why Turborepo?

This project uses a **monorepo** — multiple packages living in one repository, managed together.

```
Without Turborepo          With Turborepo
──────────────────         ──────────────────────────────
Build api manually    →    turbo run build (builds all
Build web manually         packages in correct order,
                           caches results, skips unchanged)
```

Key benefits for this project:

- `packages/validators` is shared between `apps/web` (client) and `packages/api` (server) — one source of truth for Zod schemas
- Turborepo ensures `packages/api` builds before `apps/web` since web depends on it
- The `.turbo/cache` folder caches build outputs — if nothing changed, it skips the rebuild entirely

---

<a name="deployment"></a>
## Deployment — GitHub to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial turborepo architecture setup"
git branch -M main
git remote add origin https://github.com/AkashdipMahapatra-BA/portfolio.git
git push -u origin main
```

### Step 2: Import into Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New > Project**
2. Connect your GitHub account and select the portfolio repository
3. Set **Framework Preset** to `Next.js` and **Root Directory** to `apps/web`
4. Add environment variables:
   - `RESEND_API_KEY` — your secret key from resend.com
   - `CONTACT_TO_EMAIL` — the email where you want to receive messages
   - `DATABASE_URL` — `postgresql://placeholder/placeholder`
5. Click **Deploy**

Vercel builds your static assets, provisions your serverless functions, and gives you a live URL.

### Automatic deployments

Every `git push` to `main` triggers a new deployment automatically.

### Preview deployments

Create a feature branch → push it → Vercel builds a unique temporary URL just for that branch. Test it live before merging to `main`.

### Custom domain

When you buy a `.com` or `.in` domain, go to Vercel → **Settings > Domains**, add your domain, and point your registrar's DNS records to Vercel. Live within minutes.

---

<a name="extending"></a>
## Extending This Site — Blog, Newsletter & Comments

The current site has no blog, no subscriber list, and no comment section. But if you add a blog in the future, here are the industry-standard tools and exactly when you'd need them:

### Mailchimp — Newsletter & Subscriber Updates

[Mailchimp](https://mailchimp.com) is one of the most widely used marketing email platforms. It is built for **one-to-many** communication — you write one post, Mailchimp sends it to hundreds of subscribers at once.

**When you'd need it:**
- You add a blog section to this portfolio
- Visitors subscribe with their email ("Notify me when you post")
- Every time you publish a new post, Mailchimp sends a broadcast email to all subscribers automatically

**Why not now?** The current contact form is **one-to-one** (one visitor → one email to you). Mailchimp is overkill for that. Resend is the correct tool for transactional emails. Mailchimp becomes relevant only when you have a subscriber list to manage.

```
Current site (Resend)          Future blog (Mailchimp)
──────────────────────         ──────────────────────────────
Visitor → contact form    →    Subscriber list
       → one email to you      → you publish post
                               → Mailchimp emails all subscribers
```

### Disqus — Comments & Discussions on Blog Posts

[Disqus](https://disqus.com) is one of the most popular third-party comment systems, used by millions of blogs and news sites worldwide. It embeds a full comment/discussion thread at the bottom of any page with a single script tag — no backend needed.

**When you'd need it:**
- You add a blog section with individual post pages (e.g. `/blog/my-first-post`)
- Readers want to leave comments, ask questions, or discuss the post
- Disqus handles all of it — accounts, moderation, spam filtering, notifications

**Why not now?** There are no blog post pages on this site. The contact form already handles direct messages. Disqus only makes sense when you have public content that visitors can react to.

### Summary — What to add when

| Feature | Tool | When to add |
|---|---|---|
| Contact form | Resend + tRPC | ✅ Already built |
| Blog posts | Next.js MDX or Contentlayer | When you start writing |
| Subscriber newsletter | Mailchimp | When you have a subscriber list |
| Post comments & discussion | Disqus | When you have public blog posts |
| Store contact submissions | Drizzle + Neon (`packages/db`) | Already scaffolded, not yet active |

---

<a name="cv--resume"></a>
## CV / Resume

The PDF is served as a static asset from `apps/web/public/`:

```
# Local
http://localhost:3000/Akashdip_Mahapatra_CV.pdf

# Live
https://your-vercel-domain.vercel.app/Akashdip_Mahapatra_CV.pdf
```

Next.js serves everything inside `public/` automatically — no configuration needed.
