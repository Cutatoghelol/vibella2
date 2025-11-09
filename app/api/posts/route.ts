import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

    if (!url || !serviceRole) {
      return NextResponse.json({ error: 'Server misconfigured: missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL' }, { status: 500 });
    }

    const supabaseServer = createClient(url, serviceRole, { auth: { persistSession: false } });

    const body = await req.json();
    const { content, tags = [], image_url = null } = body;

    const authHeader = req.headers.get('authorization') || '';
    let userId: string | null = null;
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const { data: userData, error: userErr } = await supabaseServer.auth.getUser(token);
      if (userErr) throw userErr;
      userId = userData?.user?.id ?? null;
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseServer
      .from('posts')
      .insert([{ user_id: userId, content, image_url, tags }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ post: data });
  } catch (err: any) {
    console.error('Create post error', err);
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 });
  }
}
