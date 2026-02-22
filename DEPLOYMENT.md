Deployment Guide for The Calm Content Companion

1) Vercel environment variables
- SUPABASE_URL
- SUPABASE_ANON_KEY
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_SUPABASE_URL (optional, if you want client-side to use a different URL)
- NEXT_PUBLIC_SUPABASE_ANON_KEY (optional)
- RESEND_API_KEY
- DATABASE_URL (Postgres, e.g., postgres://USER:PASS@HOST:PORT/DB)
- JWT_SECRET
- ADMIN_EMAILS (comma-separated or JSON array of allowed admin emails)
- ADMIN_INITIAL_EMAIL (optional seed)
- SUPABASE_EMAIL_SMTP_CONFIG (if using SMTP in Suabase console)

2) Supabase Auth URLs
- Site URL: yourverceldomain or localhost for local testing
- Redirect URLs include:
  http://localhost:3000/auth/callback
  https://<vercel-preview>/auth/callback
  https://<prod-domain>/auth/callback

3) Prisma migration flow
- Local: npx prisma migrate dev
- Deploy: npx prisma migrate deploy (in CI/CD or prebuild step)

4) Local smoke tests
- Start: npm run dev
- Open: http://localhost:3000
- Login: go to /login, enter an email, check email for login link
- Click login link which triggers /auth/callback and sets SSR session cookie
- Access /admin with an email present in ADMIN_EMAILS
