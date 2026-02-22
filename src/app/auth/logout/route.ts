import { NextResponse } from 'next/server'
export async function GET() {
  // Clear the session cookie by setting an empty value and immediate expiry
  const url = new URL('/', 'http://localhost:3000')
  return NextResponse.redirect(url, {
    headers: {
      'Set-Cookie': 'session=; HttpOnly; Max-Age=0; Path=/'
    }
  })
}
