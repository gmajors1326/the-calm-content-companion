import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth/requireUser';

export async function GET(request: Request) {
  try {
    const { supabaseUser, dbUser } = await requireUser(request);
    return NextResponse.json({ supabaseUser, dbUser });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
