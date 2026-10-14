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
  category: 'opportunity' | 'personal_agent';
  url: string;
  goal: string;
  description: string;
  schema: Record<string, any>;
  sampleDecisionCriteria?: string;
  defaultApplicantName?: string;
  stateOrRegion?: string;
}

export interface CitizenDocumentCheck {
  id: string;
  name: string;
  requiredType: string;
  maxSizeKb: number;
  uploadedFileName?: string;
  uploadedFileSizeKb?: number;
  isCompliant: boolean;
  complianceNotes: string;
  nameDetected?: string;
  nameMatchConfidence?: number;
}

export type WorkflowStage =
  | '1_REQUIREMENTS'
  | '2_DOCUMENT_CHECK'
  | '3_DECLARATION_PREPARED'
  | '4_AGENT_NAVIGATING'
  | '5_USER_APPROVAL_CHECKPOINT'
  | '6_SUBMITTED_ACKNOWLEDGEMENT';

export interface WorkflowCheckpoint {
  requiresUserAction: boolean;
  actionType: 'LOGIN_OTP' | 'DOCUMENT_OVERSIZE' | 'FINAL_SUBMISSION_APPROVAL' | 'NONE';
  description: string;
  resolved: boolean;
}
