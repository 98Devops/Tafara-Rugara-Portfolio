import type { Project } from '@/types';

// Project scope and links from the current October 2026 CV.
export const recentProjects: Project[] = [
  {
    id: 'munda',
    title: 'Munda — Farm-Control Platform',
    category: 'webapp',
    description:
      'A farm-control product for owners who cannot be on the farm every day. Track seed, fertiliser, chemicals and fuel, even when the signal disappears.',
    problem:
      'Farm records need to stay consistent when work happens offline and owners manage from a distance.',
    technicalArchitecture:
      'React and TypeScript with a Dexie offline queue, idempotent sync and Supabase PostgreSQL. Farm arithmetic runs in PL/pgSQL under Row-Level Security.',
    outcome:
      'A live product combining an auditable input ledger with an AI assistant that uses read-only tools.',
    technologies: ['TypeScript', 'React', 'Supabase', 'Dexie', 'Groq'],
    highlights: [
      'Double-entry farm-input ledger',
      'Offline capture with idempotent synchronization',
      'Owner, storeman and pump-attendant roles',
      'Read-only AI tools with number checks and an evaluation harness',
    ],
    demoUrl: 'https://munda-mvp.netlify.app',
  },
  {
    id: 'synapse',
    title: 'Synapse — Voice-First Knowledge',
    category: 'webapp',
    description:
      'An AI knowledge application that turns spoken ideas into structured information you can retrieve and explore.',
    problem:
      'Capturing a thought is easy. Finding the context and connections later is harder.',
    technicalArchitecture:
      'Next.js, Gemini extraction and classification, a knowledge graph and Qdrant vector embeddings. LangChain tools combine relationships with retrieval.',
    outcome:
      'An independent AI engineering project exploring voice, structured memory and retrieval.',
    technologies: ['Next.js', 'TypeScript', 'LangChain', 'Gemini', 'Qdrant'],
    highlights: [
      'Speech transcription and classification',
      'Graph relationships plus vector retrieval',
      'Tool-based question answering',
      'Text-to-speech playback',
    ],
  },
  {
    id: 'runproduce',
    title: 'RunProduce — Broiler Operations',
    category: 'webapp',
    description:
      'A prelaunch client project connecting flock records to harvest decisions and cashflow planning.',
    problem:
      'Daily production figures need to inform when to harvest, how to sell and what the next batch should cost.',
    technicalArchitecture:
      'Next.js and Supabase around a pure TypeScript planning engine using integer grams, bigint cents and explicit missing-input results.',
    outcome:
      'Prelaunch: a planning workflow for harvest timing, sales allocation, next-batch sizing and cashflow.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    highlights: [
      'Harvest timing calculations',
      'Gate-versus-bulk sales planning',
      'Next-batch sizing',
      'Projected cash calendar',
    ],
  },
  {
    id: 'iats',
    title: 'IATS — Asset Tracking',
    category: 'webapp',
    description:
      'An asset-management product for schools, NGOs and businesses that need to know who has what.',
    problem:
      'An inventory list does not explain who last handled an asset or how it moved between people.',
    technicalArchitecture:
      'React, TypeScript and Supabase with PL/pgSQL Row-Level Security, append-only custody history and QR scan workflows.',
    outcome:
      'An independent multi-tenant product with traceable asset assignment and custody.',
    technologies: ['React', 'TypeScript', 'Zod', 'Supabase', 'PostgreSQL'],
    highlights: [
      'Multi-tenant asset inventory',
      'Role-based access policies',
      'Append-only chain of custody',
      'QR scan workflows',
    ],
  },
  {
    id: 'ops-engine',
    title: 'Ops Engine — Acquisition Workflows',
    category: 'automation',
    description:
      'A self-built automation project bringing lead intake, scoring, AI-assisted drafting and follow-up workflows together.',
    problem:
      'Opportunities arrive across inboxes and chats, while context and follow-up are easy to lose.',
    technicalArchitecture:
      'n8n workflows, Python and Supabase with a React pipeline dashboard. AI models assist with scoring and drafting, with Telegram as an interface.',
    outcome:
      'A homelab automation project exploring the full client-acquisition workflow.',
    technologies: ['n8n', 'Docker', 'Python', 'Supabase', 'React', 'Telegram'],
    highlights: [
      'Gmail and Telegram intake workflows',
      'Rubric-based lead and job scoring',
      'AI-assisted proposal and email drafts',
      'Follow-up status and pipeline views',
    ],
  },
];
