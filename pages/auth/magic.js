import React from 'react'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'test-secret'

export default function MagicLink() {
  // Placeholder page. Real login happens via cookie being set on API call.
  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <p>If you reached this page via a magic link, your session may be established.</p>
    </div>
  )
}

// In a real system, you would verify the token from the query and set a session cookie here.
// This placeholder exists to satisfy the route in the flow.
