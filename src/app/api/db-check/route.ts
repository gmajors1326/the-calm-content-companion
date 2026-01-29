import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
export const runtime = 'nodejs'

export async function GET() {
  // Simple health check against Prisma client
  try {
    const count = await (prisma as any).auditLog?.count?.() ?? 0
    return NextResponse.json({ ok: true, count })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
