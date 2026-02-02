import { NextResponse } from "next/server";

type Paste = {
  content: string;
  expiresAt: number;
  viewsLeft: number;
};

const store = new Map<string, Paste>();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.content || !body.ttl_seconds || !body.max_views) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const id = Math.random().toString(36).substring(2, 8);

    store.set(id, {
      content: body.content,
      expiresAt: Date.now() + body.ttl_seconds * 1000,
      viewsLeft: body.max_views,
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://pastebin-litee-ten.vercel.app";

    return NextResponse.json({
      id,
      url: `${baseUrl}/p/${id}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  const id = parts[parts.length - 1];

  const paste = store.get(id);

  if (!paste) {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (Date.now() > paste.expiresAt || paste.viewsLeft <= 0) {
    store.delete(id);
    return new NextResponse("Expired", { status: 410 });
  }

  paste.viewsLeft--;

  return NextResponse.json({
    content: paste.content,
    viewsLeft: paste.viewsLeft,
  });
}
