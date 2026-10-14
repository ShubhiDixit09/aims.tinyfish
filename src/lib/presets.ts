import { MissionPreset } from './types';

export const MISSION_PRESETS: MissionPreset[] = [
  {
    id: 'db-pricing',
    title: 'Cloud Database Pricing & SLA Auditor',
    category: 'procurement',
    url: 'https://supabase.com/pricing',
    goal: 'Analyze the pricing tiers (Free, Pro, Team, Enterprise). Extract the price per month, compute limits, storage allowances, and SLA commitments for each tier. Return structured JSON.',
    description: 'Autonomous extraction of multi-tier cloud specs, computing limits, and overage billing rates.',
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
              key_features: {
                type: 'array',
                items: { type: 'string' }
              }
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
    id: 'hn-sentinel',
    title: 'Tech Trending & Launch Intelligence',
    category: 'technical',
    url: 'https://news.ycombinator.com',
    goal: 'Extract the top 5 highest-ranking stories on Hacker News including rank, title, points, comment count, and target URL.',
    description: 'Instant live radar of trending tech innovations, developer releases, and community discussions.',
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
              comments: { type: 'string' }
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
    goal: 'Navigate to the enterprise security section. Extract certifications (SOC2, ISO, HIPAA), Single Sign-On (SSO/SAML) availability, and SLA guarantees.',
    description: 'Automated verification of vendor enterprise readiness, security compliance, and support SLAs.',
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
        compliance_notes: { type: 'string' }
      },
      required: ['vendor', 'certifications', 'sso_supported']
    }
  },
  {
    id: 'github-trending',
    title: 'Open Source Repo Metrics & Health',
    category: 'technical',
    url: 'https://github.com/trending',
    goal: 'Extract the top 3 trending open source repositories today with repository name, language, star count, and description.',
    description: 'Real-time extraction of breakout developer tools and libraries.',
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
