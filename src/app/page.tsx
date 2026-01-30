// src/app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 32, margin: 0 }}>The Calm Content Companion</h1>
      <p style={{ marginTop: 12, lineHeight: 1.6, opacity: 0.8 }}>
        Super minimal for now. Home exists, routes work, we can build up from here.
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <Link
          href="/login"
          style={{
            padding: '10px 14px',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: 10,
            textDecoration: 'none',
          }}
        >
          Login
        </Link>

        <Link
          href="/admin"
          style={{
            padding: '10px 14px',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: 10,
            textDecoration: 'none',
          }}
        >
          Admin
        </Link>
      </div>

      <p style={{ marginTop: 28, fontSize: 13, opacity: 0.65 }}>
        If /admin redirects you to /login, that's correct.
      </p>
    </main>
  )
}
