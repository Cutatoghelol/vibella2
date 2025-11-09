import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, tags = [], image_url = null } = body;

    // Get user from auth header (supabase jwt) if provided
    const authHeader = req.headers.get('authorization') || '';
    let userId: string | null = null;
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error: userErr } = await supabaseServer.auth.getUser(token);
      if (userErr) throw userErr;
      userId = user?.id ?? null;
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
