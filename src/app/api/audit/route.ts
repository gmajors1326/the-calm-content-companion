import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
export const runtime = 'nodejs'
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const userId = body.userId
    const action = body.action ?? 'unknown'
    const log = await (prisma as any).auditLog.create({ data: { userId, action } })
    return NextResponse.json({ ok: true, log })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
