import React from 'react'
import { parse } from 'cookie'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'test-secret'

function requireAdmin(req) {
  const cookies = parse(req.headers.cookie || '')
  const token = cookies.session
  if (!token) return { ok: false }
  try {
    const payload = jwt.verify(token, SECRET)
    if (payload?.isAdmin) return { ok: true, user: payload }
  } catch {
    return { ok: false }
  }
  return { ok: false }
}

export default function Admin({ isAdmin }) {
  if (!isAdmin) return <div>Access denied. Admins only.</div>
  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>
      <p>Protected by allowlist-based access.</p>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context
  const auth = requireAdmin(req)
  if (!auth.ok) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      },
      props: {}
    }
  }
  return { props: { isAdmin: true } }
}
