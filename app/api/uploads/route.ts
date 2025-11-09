import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  try {
    // Expecting multipart/form-data with file field 'image' OR a JSON body with base64
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const { base64, fileName = `upload-${Date.now()}.png`, bucket = 'public' } = await req.json();
      if (!base64) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

      const buffer = Buffer.from(base64, 'base64');
      const { data, error } = await supabaseServer.storage.from(bucket).upload(fileName, buffer, {
        contentType: 'image/png',
      });
      if (error) throw error;

      const publicUrl = supabaseServer.storage.from(bucket).getPublicUrl(data.path).data.publicUrl;
      return NextResponse.json({ url: publicUrl });
    }

    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
  } catch (err: any) {
    console.error('Upload error', err);
    return NextResponse.json({ error: err.message ?? 'Unknown' }, { status: 500 });
  }
}
