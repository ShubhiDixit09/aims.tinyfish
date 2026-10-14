import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.TINYFISH_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'TINYFISH_API_KEY is not configured on the server.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const limit = searchParams.get('limit') || '5';
    const location = searchParams.get('location') || 'US';

    if (!query) {
      return NextResponse.json({ error: 'Missing "query" parameter' }, { status: 400 });
    }

    const targetUrl = new URL('https://api.search.tinyfish.ai');
    targetUrl.searchParams.set('query', query);
    targetUrl.searchParams.set('limit', limit);
    targetUrl.searchParams.set('location', location);

    const response = await fetch(targetUrl.toString(), {
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `TinyFish Search error: ${err}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Search failed' }, { status: 500 });
  }
}
