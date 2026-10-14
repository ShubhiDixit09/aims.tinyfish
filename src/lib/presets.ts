import { MissionPreset } from './types';

export const MISSION_PRESETS: MissionPreset[] = [
  {
    id: 'db-pricing',
    title: 'Cloud Database Architecture & SLA Auditor',
    category: 'procurement',
    url: 'https://supabase.com/pricing',
    goal: 'Analyze the pricing tiers (Free, Pro, Team, Enterprise). For each tier, extract the exact name, price per month, compute limits, and verbatim evidence quote for storage or SLA. Use null for missing values. Stop after analyzing all visible tiers. Return structured JSON.',
    description: 'Autonomous extraction of multi-tier cloud specs, compute limits, and verbatim SLA evidence.',
    sampleDecisionCriteria: 'Production Readiness Verdict: Must have unpausing compute and 99.9%+ SLA guarantee.',
    schema: {
      type: 'object',
      properties: {
        provider: { type: 'string' },
        tiers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              price: { type: 'string' },
              database_space: { type: 'string' },
              compute_credits: { type: 'string' },
              evidence: { type: 'string' }
            },
            required: ['name', 'price']
          }
        },
        enterprise_summary: { type: 'string' }
      },
      required: ['provider', 'tiers']
    }
  },
  {
    id: 'dtu-opportunities',
    title: 'Student Grants & Hackathon Opportunity Scout',
    category: 'opportunity',
    url: 'https://news.ycombinator.com',
    goal: 'Scan the top submissions. Find up to 5 opportunities, grants, or developer project launches. Extract rank, title, URL, points, and brief relevance. Exclude unrelated posts. Use null for missing values. Stop after 5 verified records. Return structured JSON.',
    description: 'Instant radar of tech launches, student grants, and open hackathon programs with verbatim proof.',
    sampleDecisionCriteria: 'Eligibility Verdict: Score by relevance, community validation (points > 50), and verified URL.',
    schema: {
      type: 'object',
      properties: {
        captured_at: { type: 'string' },
        top_stories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rank: { type: 'integer' },
              title: { type: 'string' },
              url: { type: 'string' },
              points: { type: 'string' },
              evidence: { type: 'string' }
            },
            required: ['rank', 'title', 'url']
          }
        }
      },
      required: ['top_stories']
    }
  },
  {
    id: 'compliance-audit',
    title: 'Security & Enterprise Compliance Scanner',
    category: 'competitive',
    url: 'https://vercel.com/pricing',
    goal: 'Navigate to enterprise security and compliance details. Extract vendor name, SOC2 compliance status, SSO/SAML availability, uptime SLA, and verbatim evidence passage. Use null if not disclosed. Return structured JSON.',
    description: 'Automated verification of vendor enterprise readiness, security compliance, and support SLAs.',
    sampleDecisionCriteria: 'Enterprise Risk Audit: SOC2 certification and SSO support required for enterprise sign-off.',
    schema: {
      type: 'object',
      properties: {
        vendor: { type: 'string' },
        certifications: {
          type: 'array',
          items: { type: 'string' }
        },
        sso_supported: { type: 'boolean' },
        sla_guarantee: { type: 'string' },
        evidence: { type: 'string' }
      },
      required: ['vendor', 'sso_supported']
    }
  },
  {
    id: 'github-trending',
    title: 'Open Source Intelligence & Repo Health',
    category: 'developer',
    url: 'https://github.com/trending',
    goal: 'Extract the top 3 trending open source repositories today. Extract repository name, description, primary language, and stars count. Stop after 3 verified records. Return structured JSON.',
    description: 'Real-time extraction of breakout developer tools and libraries.',
    sampleDecisionCriteria: 'Technical Adoption Verdict: Prioritize high star velocity and active maintainers.',
    schema: {
      type: 'object',
      properties: {
        trending_repositories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              repo_name: { type: 'string' },
              description: { type: 'string' },
              primary_language: { type: 'string' },
              stars_today: { type: 'string' }
            },
            required: ['repo_name', 'description']
          }
        }
      },
      required: ['trending_repositories']
    }
  }
];
