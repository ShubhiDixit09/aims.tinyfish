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

    const body = await req.json();
    const { url, goal, output_schema, browser_profile } = body;

    if (!url || !goal) {
      return NextResponse.json(
        { error: 'Both "url" and "goal" parameters are required.' },
        { status: 400 }
      );
    }

    const payload: Record<string, any> = {
      url,
      goal,
    };

    if (output_schema && typeof output_schema === 'object' && Object.keys(output_schema).length > 0) {
      payload.output_schema = output_schema;
    }

    if (browser_profile === 'stealth') {
      payload.browser_profile = 'stealth';
    }

    const response = await fetch('https://agent.tinyfish.ai/v1/automation/run-sse', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `TinyFish API error (${response.status}): ${errText}` },
        { status: response.status }
      );
    }

    if (!response.body) {
      return NextResponse.json(
        { error: 'No stream body returned by TinyFish.' },
        { status: 502 }
      );
    }

    // Stream the SSE directly to the frontend
    const headers = new Headers();
    headers.set('Content-Type', 'text/event-stream');
    headers.set('Cache-Control', 'no-cache, no-transform');
    headers.set('Connection', 'keep-alive');
    headers.set('X-Accel-Buffering', 'no');

    return new Response(response.body, { headers });
  } catch (error: any) {
    console.error('Error in TinyFish stream route:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error while streaming automation.' },
      { status: 500 }
    );
  }
}
