import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.TINYFISH_API_KEY;
  const isConfigured = Boolean(apiKey && apiKey.length > 20);

  return NextResponse.json({
    status: isConfigured ? 'ready' : 'missing_key',
    configured: isConfigured,
    key_length: apiKey ? apiKey.length : 0,
    timestamp: new Date().toISOString(),
    engine: 'TinyFish Autonomous Web Agent v1',
    capabilities: [
      'Live Browser Preview Streaming (SSE)',
      'Natural-Language Goal Execution',
      'Strict JSON Schema Extraction',
      'Stealth Anti-Bot Bypass',
      'Continuous Web & Topic Sentinels (Monitors)',
      'Multi-Source Deep Research'
    ]
  });
}
