export interface TinyFishProgressEvent {
  type: 'PROGRESS';
  run_id: string;
  purpose: string;
  timestamp: string;
}

export interface TinyFishStreamingUrlEvent {
  type: 'STREAMING_URL';
  run_id: string;
  streaming_url: string;
  timestamp: string;
}

export interface TinyFishCompleteEvent {
  type: 'COMPLETE';
  run_id: string;
  status: 'COMPLETED' | 'FAILED' | 'CANCELLED';
  result?: any;
  error?: string | null;
  timestamp: string;
}

export interface TinyFishStartedEvent {
  type: 'STARTED';
  run_id: string;
  timestamp: string;
}

export type TinyFishEvent =
  | TinyFishStartedEvent
  | TinyFishStreamingUrlEvent
  | TinyFishProgressEvent
  | TinyFishCompleteEvent;

export interface MissionPreset {
  id: string;
  title: string;
  category: 'procurement' | 'developer' | 'competitive' | 'opportunity';
  url: string;
  goal: string;
  description: string;
  schema: Record<string, any>;
  sampleDecisionCriteria?: string;
}

export interface SearchResultItem {
  position: number;
  title: string;
  url: string;
  snippet: string;
  site_name?: string;
}

export interface MonitorItem {
  id: string;
  name: string;
  type: 'page' | 'topic';
  target: string;
  schedule: string;
  lastChecked?: string;
  status: 'active' | 'changed' | 'baseline';
  purpose?: string;
}
