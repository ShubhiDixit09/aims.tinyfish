import { TinyFishEvent } from './types';

export interface SavedDemoRecord {
  id: string;
  title: string;
  url: string;
  goal: string;
  events: TinyFishEvent[];
  result: any;
  decisionVerdict: {
    recommendation: string;
    fitScore: number;
    decisionExplanation: string;
    evidencePassages: string[];
    riskWarnings: string[];
  };
}

export const SAVED_DEMO_RECOVERY: SavedDemoRecord = {
  id: 'saved-supabase-audit',
  title: 'Cloud Database Architecture & SLA Audit',
  url: 'https://supabase.com/pricing',
  goal: 'Find all database pricing tiers. Extract monthly cost, compute allowances, and SLA commitments. Provide verbatim evidence for claims. Return structured JSON.',
  events: [
    {
      type: 'STARTED',
      run_id: '78213991-2aeb-46f7-be44-65c886fa5b3b',
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
    {
      type: 'STREAMING_URL',
      run_id: '78213991-2aeb-46f7-be44-65c886fa5b3b',
      streaming_url: 'https://supabase.com/pricing',
      timestamp: new Date(Date.now() - 55000).toISOString(),
    },
    {
      type: 'PROGRESS',
      run_id: '78213991-2aeb-46f7-be44-65c886fa5b3b',
      purpose: 'Navigated to Supabase pricing matrix. Inspecting tier cards (Free, Pro, Team, Enterprise).',
      timestamp: new Date(Date.now() - 40000).toISOString(),
    },
    {
      type: 'PROGRESS',
      run_id: '78213991-2aeb-46f7-be44-65c886fa5b3b',
      purpose: 'Extracting compute credits, storage overages, and SLA uptime guarantees.',
      timestamp: new Date(Date.now() - 25000).toISOString(),
    },
    {
      type: 'PROGRESS',
      run_id: '78213991-2aeb-46f7-be44-65c886fa5b3b',
      purpose: 'Evaluating verbatim evidence for Enterprise SLA commitments and SOC2 compliance.',
      timestamp: new Date(Date.now() - 10000).toISOString(),
    },
    {
      type: 'COMPLETE',
      run_id: '78213991-2aeb-46f7-be44-65c886fa5b3b',
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      result: {
        provider: 'Supabase Inc.',
        source_url: 'https://supabase.com/pricing',
        verified_at: new Date().toISOString(),
        tiers: [
          {
            name: 'Free',
            price: '$0/month',
            database_space: '500MB included',
            compute_credits: 'Shared CPU (pauses after 1 week of inactivity)',
            evidence: 'Free plan: Up to 500MB database space, pauses after 1 week of inactivity.',
          },
          {
            name: 'Pro',
            price: '$25/month',
            database_space: '8GB included, then $0.125 per GB',
            compute_credits: 'Includes $10 compute credits for Micro instances',
            evidence: 'Pro plan: $25/month with $10 in compute credits and no pausing.',
          },
          {
            name: 'Team',
            price: '$599/month',
            database_space: 'Daily backups, 14 days retention',
            compute_credits: 'Standard compute with prioritized support SLA',
            evidence: 'Team plan: Designed for collaborative teams with SOC2 Type 2 compliance.',
          },
          {
            name: 'Enterprise',
            price: 'Custom / Contact Sales',
            database_space: 'Custom TB storage & multi-region read replicas',
            compute_credits: 'Dedicated instances, 99.99% uptime SLA guarantee',
            evidence: 'Enterprise tier provides 99.99% uptime SLA and dedicated support channel.',
          },
        ],
        compliance: {
          soc2_certified: true,
          hipaa_available: true,
          evidence: 'SOC2 Type 2 certified and HIPAA compliance available on Team and Enterprise tiers.',
        },
      },
    },
  ],
  result: {
    provider: 'Supabase Inc.',
    source_url: 'https://supabase.com/pricing',
    verified_at: new Date().toISOString(),
    tiers: [
      {
        name: 'Free',
        price: '$0/month',
        database_space: '500MB included',
        compute_credits: 'Shared CPU (pauses after 1 week of inactivity)',
        evidence: 'Free plan: Up to 500MB database space, pauses after 1 week of inactivity.',
      },
      {
        name: 'Pro',
        price: '$25/month',
        database_space: '8GB included, then $0.125 per GB',
        compute_credits: 'Includes $10 compute credits for Micro instances',
        evidence: 'Pro plan: $25/month with $10 in compute credits and no pausing.',
      },
      {
        name: 'Team',
        price: '$599/month',
        database_space: 'Daily backups, 14 days retention',
        compute_credits: 'Standard compute with prioritized support SLA',
        evidence: 'Team plan: Designed for collaborative teams with SOC2 Type 2 compliance.',
      },
      {
        name: 'Enterprise',
        price: 'Custom / Contact Sales',
        database_space: 'Custom TB storage & multi-region read replicas',
        compute_credits: 'Dedicated instances, 99.99% uptime SLA guarantee',
        evidence: 'Enterprise tier provides 99.99% uptime SLA and dedicated support channel.',
      },
    ],
    compliance: {
      soc2_certified: true,
      hipaa_available: true,
      evidence: 'SOC2 Type 2 certified and HIPAA compliance available on Team and Enterprise tiers.',
    },
  },
  decisionVerdict: {
    recommendation: 'VERDICT: Recommended for Production Deployment',
    fitScore: 94,
    decisionExplanation: 'Meets production criteria: Pro tier offers unpausing and predictable compute scaling at $25/mo. Team tier guarantees SOC2 Type 2.',
    evidencePassages: [
      'Pro plan provides $10 in compute credits and no auto-pausing.',
      'SOC2 Type 2 certified and HIPAA compliance available on Team and Enterprise tiers.',
      '99.99% uptime SLA explicitly verified on Enterprise tier.',
    ],
    riskWarnings: [
      'Free tier databases automatically pause after 7 days of inactivity (unsuitable for critical APIs).',
    ],
  },
};
