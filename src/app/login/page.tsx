// src/app/login/page.tsx
'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createBrowserSupabase } from '@/src/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const params = useSearchParams()
  const next = params.get('next') || '/'

  const { supabase, error } = useMemo(() => createBrowserSupabase(), [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    if (!supabase) {
      setStatus(error || 'Supabase client not available.')
      return
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const emailRedirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo },
    })

    if (otpError) {
      setStatus(otpError.message)
      return
    }

    setStatus('Check your email for the magic link.')
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Login</h1>
        <p style={{ color: 'crimson' }}>{error}</p>
        <p>Fix: Add env vars in Vercel for Preview/Production, then redeploy.</p>
      </main>
    )
  }

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          style={{ width: '100%', padding: 12, marginTop: 12 }}
        />
        <button style={{ marginTop: 12, padding: 12, width: '100%' }} type="submit">
          Send magic link
        </button>
      </form>
      {status ? <p style={{ marginTop: 12 }}>{status}</p> : null}
    </main>
  )
}