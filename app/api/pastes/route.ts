import { NextRequest, NextResponse } from 'next/server';

interface Paste {
  content: string;
  ttl_seconds: number;
  max_views: number;
}

const pastes: { [id: string]: Paste } = {};

export async function POST(req: NextRequest) {
  const body = await req.json() as Paste;
  const id = Math.random().toString(36).substring(2, 8);
  pastes[id] = body;

  return NextResponse.json({
    id,
    url: 'https://pastebin-litee-ten.vercel.app/p/' + id
  });
}
