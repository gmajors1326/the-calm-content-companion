import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const { plan } = await request.json();

        if (!['free', 'starter', 'pro', 'elite'].includes(plan)) {
            return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const { error } = await supabase
            .from('profiles')
            .update({ plan })
            .eq('id', user.id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, plan });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
