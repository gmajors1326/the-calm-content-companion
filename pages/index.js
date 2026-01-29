import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  const supabase = typeof window !== 'undefined' ? createClient(SUPABASE_URL, SUPABASE_ANON) : null

  useEffect(() => {
    if (typeof window !== 'undefined' && supabase) {
      const {
        data: { session }
      } = supabase.auth || {}
      setLoggedIn(!!session)
      // Listen to auth state changes
      supabase.auth.onAuthStateChange((event, sess) => {
        setLoggedIn(!!sess)
      })
    }
  }, [])

  async function loginWithEmail(e) {
    e.preventDefault()
    const email = e.target.email.value
    if (!email) return
    // Use Supabase magic link
    if (supabase) {
      const { error } = await supabase.auth.signIn({ email })
      if (error) console.error('Supabase login error', error)
      else alert('Magic link sent. Check your email.')
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>The Calm Content Companion</h1>
      <p>Welcome. Use the admin area to manage access.</p>
      <form onSubmit={loginWithEmail}>
        <input name="email" placeholder="Email" type="email" />
        <button type="submit">Send magic link</button>
      </form>
      <div style={{ marginTop: 20 }}>
        {loggedIn ? 'You are logged in (session persisted).' : 'Not logged in.'}
      </div>
    </div>
  )
}
