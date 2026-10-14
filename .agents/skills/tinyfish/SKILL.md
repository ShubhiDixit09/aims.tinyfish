---
name: tinyfish
description: Comprehensive reference, SDK usage, and API patterns for TinyFish Web Agent, Search, Fetch, Monitor, and Live Browser Streaming.
---

# TinyFish Developer & Integration Guide

TinyFish provides autonomous web agent infrastructure, live browser viewport streaming, anti-bot bypass, structured output extraction, and scheduled monitors.

## Key Endpoints & APIs

1. **Agent SSE Streaming Endpoint**:
   - `POST https://agent.tinyfish.ai/v1/automation/run-sse`
   - Headers: `X-API-Key: <TINYFISH_API_KEY>`, `Content-Type: application/json`
   - Stream Events:
     - `STARTED`: `{ "type": "STARTED", "run_id": "..." }`
     - `STREAMING_URL`: `{ "type": "STREAMING_URL", "run_id": "...", "streaming_url": "https://..." }` (Embed in responsive `<iframe>`)
     - `PROGRESS`: `{ "type": "PROGRESS", "purpose": "..." }`
     - `COMPLETE`: `{ "type": "COMPLETE", "result": { ... } }`

2. **Agent Synchronous Endpoint with Structured Output**:
   - `POST https://agent.tinyfish.ai/v1/automation/run`
   - Schema validation: Top level must be `type: "object"`. Supports `properties`, `required`, `propertyOrdering`.

3. **Search API**:
   - `GET https://api.search.tinyfish.ai?query=<query>&limit=10&location=US`
   - Returns ranked URLs, titles, and snippets.

4. **Fetch API**:
   - `POST https://api.fetch.tinyfish.ai`
   - Body: `{ "urls": ["https://..."] }`
   - Extracts clean Markdown/text, bypasses JS rendering.

5. **Deep Research API**:
   - `POST https://agent.tinyfish.ai/v1/automation/run-research`
   - Returns multi-iteration source synthesis with citations.

6. **Monitor API**:
   - `GET / POST https://agent.tinyfish.ai/v1/monitor`
   - Tracks changes on target pages or search topics with diff highlights.
