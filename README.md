# landing-page

Portfolio site built with Next.js, TypeScript, and Tailwind CSS. Deployed as a Docker container behind Caddy as part of the infrastructure stack.

## Stack

- **Next.js** (App Router, standalone output)
- **TypeScript**
- **Tailwind CSS**
- **Docker** (multi-stage build)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Password to access the `/admin` portal |

For local dev, create a `.env.local`:

```env
ADMIN_PASSWORD=dev
```

## Admin portal

`/admin` embeds Grafana and is protected by a password-gated cookie. Visiting `/admin` without a valid session redirects to `/admin/login`.

The admin password is set via the `ADMIN_PASSWORD` environment variable and never exposed client-side.

## CV

The CV PDF is served from `/public/william-edwards-cv.pdf` but is excluded from the repository via `.gitignore`. Place the file manually on the server before building:

```bash
cp william-edwards-cv.pdf landing-page/public/
```

## Docker

The app uses `output: "standalone"` in `next.config.ts` so the image only includes what's needed to run.

```bash
docker build -t landing-page .
docker run -p 3000:3000 -e ADMIN_PASSWORD=changeme landing-page
```

In production this is managed by Docker Compose in the `infrastructure` repo.
