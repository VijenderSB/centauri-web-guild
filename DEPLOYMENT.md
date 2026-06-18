# WebCentauri — Self-Hosted Production Deployment

Domain: **https://www.webcentauri.com** (apex `webcentauri.com` should 301 → `www`).

## 1. Build

```bash
# Install
bun install            # or: npm ci

# Production build (SSR + client bundles, output to .output/)
bun run build

# Smoke test locally
bun run preview
```

Output: `.output/` is a Nitro server bundle (Node preset by default on a Node host). Start it with:

```bash
node .output/server/index.mjs
```

Run behind **Nginx** or **Caddy** as a reverse proxy on ports 80/443 with HTTPS (Let's Encrypt). Use `pm2` or `systemd` to keep the Node process alive.

## 2. Environment variables (`.env` on the server)

| Variable | Purpose |
|---|---|
| `NODE_ENV=production` | Required |
| `PORT=3000` | Node listen port (proxy 443 → 3000) |
| `LEAD_NOTIFY_EMAIL=support@webcentauri.com` | Where lead-popup submissions are emailed |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Outbound SMTP for lead emails |
| `DATABASE_URL=postgres://user:pass@host:5432/webcentauri` | Postgres (leads, future content) |
| `SESSION_SECRET` | 32+ random bytes |
| `VITE_SITE_URL=https://www.webcentauri.com` | Public site URL injected at build time |

Never commit `.env`. Keep `.env.example` only.

## 3. Database (Postgres 15+)

Minimum schema for the lead-popup form (run once on the server DB):

```sql
CREATE TABLE IF NOT EXISTS leads (
  id           BIGSERIAL PRIMARY KEY,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT NOT NULL,
  message      TEXT NOT NULL,
  page_url     TEXT,
  page_title   TEXT,
  context      TEXT,
  ip           INET,
  user_agent   TEXT
);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx       ON leads(email);
```

Daily backups: `pg_dump -Fc webcentauri > /backups/webcentauri-$(date +%F).dump` via cron, retain 30 days, mirror to off-site S3-compatible storage.

## 4. DNS records (at registrar)

| Type | Name | Value |
|---|---|---|
| A | `@` (webcentauri.com) | your-server-ip |
| A | `www` | your-server-ip |
| CAA | `@` | `0 issue "letsencrypt.org"` |
| TXT | `@` | `v=spf1 -all` (no mail from root) |
| TXT | `_dmarc` | `v=DMARC1; p=reject; rua=mailto:dmarc@webcentauri.com` |

If you send email from the domain, add SPF/DKIM for your provider and update the `_dmarc` `rua`.

## 5. Nginx config (reference)

```nginx
server {
  listen 80;
  server_name webcentauri.com www.webcentauri.com;
  return 301 https://www.webcentauri.com$request_uri;
}

server {
  listen 443 ssl http2;
  server_name webcentauri.com;
  ssl_certificate     /etc/letsencrypt/live/webcentauri.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/webcentauri.com/privkey.pem;
  return 301 https://www.webcentauri.com$request_uri;
}

server {
  listen 443 ssl http2;
  server_name www.webcentauri.com;

  ssl_certificate     /etc/letsencrypt/live/webcentauri.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/webcentauri.com/privkey.pem;
  ssl_protocols       TLSv1.2 TLSv1.3;

  client_max_body_size 1m;
  proxy_read_timeout   30s;

  # Static assets — long cache
  location /_build/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_cache_valid 200 30d;
    add_header Cache-Control "public, max-age=2592000, immutable";
  }

  location / {
    proxy_pass         http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header   Host              $host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto https;
  }
}
```

## 6. SEO — already wired in code

- Canonical/OG/Twitter URLs use `https://www.webcentauri.com`.
- One `<h1>` per route, rest `<h2>`.
- JSON-LD: `Organization` + `ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`.
- `public/sitemap.xml` served dynamically at `/sitemap.xml` — submit to:
  - Google Search Console
  - Bing Webmaster Tools
  - IndexNow (Bing/Yandex auto-ping)
- `public/robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, OAI-SearchBot.

## 7. GEO (Generative Engine Optimization for US + Canada)

- `public/llms.txt` is published at `/llms.txt` with Quick Facts and Q&A for AI answer engines.
- `areaServed: ["US","GB","AU","CA","IN"]` in Organization schema.
- Local landing pages under `/locations/{slug}` and `/{keyword}/{city}` for city-level intent.
- Recommended after go-live: claim Google Business Profile, Bing Places, Apple Business Connect.

## 8. Security patches (already implemented)

Edge (`src/server.ts`):
- HSTS (2 yr, preload), X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, COOP, CORP, Permissions-Policy locking down geo/mic/camera/payment/USB/etc., strict CSP.
- Probe-path blocker (`wp-admin`, `.env`, `.git`, `phpmyadmin`, …).
- 1 MB body cap.
- `Server` / `X-Powered-By` headers stripped.

Lead API (`src/routes/api/public/lead.ts`):
- Same-origin CSRF check, JSON-only, 20 KB payload cap.
- Per-IP token-bucket rate limit (5 / 10 min).
- Honeypot field + min submit-time (2 s) bot trap.
- Input sanitization (control chars stripped, HTML tags neutralized).
- Spam classifier (link flood, CJK/Cyrillic spam runs, repeated chars, common spam tokens).

Recommended server hardening:
- **Cloudflare** in front for DDoS, WAF, Bot Fight Mode (free tier is enough to start).
- **Fail2ban** on Nginx 4xx floods.
- **Auto security updates** on the OS (`unattended-upgrades` on Ubuntu).
- Open only ports 22 (key-only), 80, 443 in the firewall.
- Weekly `npm audit --production` / `bun audit`; patch high/critical within 7 days.
- Disclosure inbox: `security@webcentauri.com` (see `/.well-known/security.txt`).

## 9. Go-live checklist

- [ ] DNS A records propagated (`dig www.webcentauri.com`)
- [ ] HTTPS valid (`curl -I https://www.webcentauri.com`)
- [ ] `https://webcentauri.com` 301s to `www`
- [ ] `/sitemap.xml` returns XML
- [ ] `/robots.txt` returns 200
- [ ] `/.well-known/security.txt` returns 200
- [ ] `/llms.txt` returns 200
- [ ] Lead-popup test submission lands in DB and email
- [ ] Google Search Console + Bing Webmaster verified, sitemap submitted
- [ ] Lighthouse: Performance ≥ 90, SEO 100, Best Practices ≥ 95
- [ ] Backups verified by a restore-test
