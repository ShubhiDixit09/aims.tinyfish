import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.TINYFISH_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'TINYFISH_API_KEY is not configured on the server.' },
        { status: 500 }
      );
    }

    const { query, mode } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'Missing "query" parameter' }, { status: 400 });
    }

    const response = await fetch('https://agent.tinyfish.ai/v1/automation/run-research', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        mode: mode || 'standard',
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `TinyFish Research error: ${err}` }, { status: response.status });
    }

    if (!response.body) {
      return NextResponse.json({ error: 'No response body' }, { status: 502 });
    }

    const headers = new Headers();
    headers.set('Content-Type', 'text/event-stream');
    headers.set('Cache-Control', 'no-cache');
    headers.set('Connection', 'keep-alive');

    return new Response(response.body, { headers });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Research failed' }, { status: 500 });
  }
}
