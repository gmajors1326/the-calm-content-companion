The Calm Content Companion – production-ready App Router refactor

Setup
- Copy .env.example to .env and fill in values.
- Run npm install
- Run npm run dev

Notes
- Uses Supabase Auth for session (client-side), SSR cookies for sessions, and Prisma with SQLite for data.
- Admin area is protected via a simple allowlist in env var ADMIN_ALLOWLIST.
- Magic-link emails are sent via Resend API (tied to login flow).
