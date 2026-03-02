import {
  Pencil, Palette, Wind, Feather, Camera,
  Users, Crown, Globe, Rocket, Briefcase,
  Trophy, Sparkles,
  type LucideIcon
} from 'lucide-react';

// ─── Phase ────────────────────────────────────────────────────────────────────

export type PhaseId = 'childhood' | 'emergence' | 'professional' | 'frontier';

export interface Phase {
  id: PhaseId;
  numeral: 'I' | 'II' | 'III' | 'IV';
  label: string;
  yearRange: [number, number];
  gradient: string;
  primaryColor: string;
  secondaryColor: string;
  atmosphericDescription: string;
  backgroundPattern: 'dots' | 'grid' | 'waves' | 'neural';
  eventIds: number[];
}

// ─── Skill Lineage ─────────────────────────────────────────────────────────────

export interface SkillConnection {
  fromEventId: number;
  toEventId: number;
  label: string;
  type: 'feeds' | 'amplifies' | 'transforms';
}

// ─── Timeline Event ────────────────────────────────────────────────────────────

export interface TimelineEvent {
  id: number;
  year: number;
  age: string;
  title: string;
  context: string;
  quote: string;
  points: string[];
  skills: string[];
  phaseId: PhaseId;
  primaryColor: string;
  position: 'top' | 'bottom';
  icon: LucideIcon;
  connectsTo: number[];
}

// ─── Phase Data ────────────────────────────────────────────────────────────────

export const phases: Phase[] = [
  {
    id: 'childhood',
    numeral: 'I',
    label: 'Childhood Craft',
    yearRange: [1992, 2010],
    primaryColor: '#00F0FF',
    secondaryColor: '#0A4FFF',
    gradient: 'linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(10,79,255,0.04) 100%)',
    atmosphericDescription: 'Where curiosity became craft',
    backgroundPattern: 'dots',
    eventIds: [1, 2, 3, 4, 5],
  },
  {
    id: 'emergence',
    numeral: 'II',
    label: 'The Emergence',
    yearRange: [2011, 2015],
    primaryColor: '#7B2FFF',
    secondaryColor: '#B44FFF',
    gradient: 'linear-gradient(135deg, rgba(123,47,255,0.08) 0%, rgba(180,79,255,0.04) 100%)',
    atmosphericDescription: 'Skills finding each other',
    backgroundPattern: 'grid',
    eventIds: [6, 7, 8],
  },
  {
    id: 'professional',
    numeral: 'III',
    label: 'Professional Rise',
    yearRange: [2016, 2022],
    primaryColor: '#FFB800',
    secondaryColor: '#FF7A00',
    gradient: 'linear-gradient(135deg, rgba(255,184,0,0.08) 0%, rgba(255,122,0,0.04) 100%)',
    atmosphericDescription: 'The craft becoming a career',
    backgroundPattern: 'waves',
    eventIds: [9, 10, 11],
  },
  {
    id: 'frontier',
    numeral: 'IV',
    label: 'AI Frontier',
    yearRange: [2024, 2030],
    primaryColor: '#FF0080',
    secondaryColor: '#FF4400',
    gradient: 'linear-gradient(135deg, rgba(255,0,128,0.10) 0%, rgba(255,68,0,0.05) 100%)',
    atmosphericDescription: 'All roads converge here',
    backgroundPattern: 'neural',
    eventIds: [12],
  },
];

// ─── Timeline Events ───────────────────────────────────────────────────────────

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1, year: 1995, age: '03',
    title: 'Visual Foundations', context: 'DRAWING',
    quote: 'The line that became the roadmap.',
    points: ['Memorizing shapes', 'Replicating reality', 'Mastering patience'],
    skills: ['Visual Thinking', 'Patience', 'Precision'],
    phaseId: 'childhood', primaryColor: '#00F0FF', position: 'top', icon: Pencil,
    connectsTo: [9, 11],
  },
  {
    id: 2, year: 2002, age: '10',
    title: 'Creative Analysis', context: 'PAINTING',
    quote: 'Every color tells a story nobody asked for — yet everyone feels.',
    points: ['Love for colors', 'Attention to detailing', 'Unleashing creativity'],
    skills: ['Color Theory', 'Detail Orientation', 'Creative Expression'],
    phaseId: 'childhood', primaryColor: '#00F0FF', position: 'bottom', icon: Palette,
    connectsTo: [9],
  },
  {
    id: 3, year: 2004, age: '12',
    title: 'Adaptive Strategy', context: 'FLYING KITES',
    quote: 'Read the wind or lose the sky.',
    points: ['Strategic planning', 'Adapting to winds', 'Never giving up'],
    skills: ['Strategic Thinking', 'Adaptability', 'Resilience'],
    phaseId: 'childhood', primaryColor: '#00F0FF', position: 'top', icon: Wind,
    connectsTo: [10],
  },
  {
    id: 4, year: 2007, age: '15',
    title: 'Design Precision', context: 'CALLIGRAPHY',
    quote: 'The space between letters is where meaning breathes.',
    points: ['Typography & Design', 'Pattern recognition', 'The art of details'],
    skills: ['Typography', 'Pattern Recognition', 'Systematic Thinking'],
    phaseId: 'childhood', primaryColor: '#00F0FF', position: 'bottom', icon: Feather,
    connectsTo: [9],
  },
  {
    id: 5, year: 2010, age: '18',
    title: 'Perspective Shift', context: 'PHOTOGRAPHY',
    quote: 'Frame it differently and you change what\'s possible.',
    points: ['New perspectives', 'Capturing moments', 'Time & Composition'],
    skills: ['Perspective', 'Composition', 'Storytelling'],
    phaseId: 'childhood', primaryColor: '#00F0FF', position: 'top', icon: Camera,
    connectsTo: [9, 12],
  },
  {
    id: 6, year: 2011, age: '19',
    title: 'Synergy', context: 'TEAM PLAYER',
    quote: 'Alone you build faster. Together you build further.',
    points: ['Empathy & Synergy', 'Learning from others', 'Shared success'],
    skills: ['Empathy', 'Collaboration', 'Active Listening'],
    phaseId: 'emergence', primaryColor: '#7B2FFF', position: 'bottom', icon: Users,
    connectsTo: [10],
  },
  {
    id: 7, year: 2012, age: '20',
    title: 'Orchestration', context: 'LEADERSHIP',
    quote: "The conductor doesn't play an instrument — and that's the point.",
    points: ['Creative Coordinator', 'Guiding vision', 'Taking ownership'],
    skills: ['Leadership', 'Vision Articulation', 'Ownership'],
    phaseId: 'emergence', primaryColor: '#7B2FFF', position: 'top', icon: Crown,
    connectsTo: [11],
  },
  {
    id: 8, year: 2014, age: '22',
    title: 'Global Context', context: 'TRAVELLING',
    quote: 'Every border crossed is a bias dismantled.',
    points: ['Global Mindset', 'Risk management', 'Budgeting & Courage'],
    skills: ['Global Mindset', 'Risk Management', 'Cultural Intelligence'],
    phaseId: 'emergence', primaryColor: '#7B2FFF', position: 'bottom', icon: Globe,
    connectsTo: [10, 12],
  },
  {
    id: 9, year: 2016, age: '24',
    title: 'Product Strategy', context: 'PRODUCT MANAGER',
    quote: 'Every user story started as a drawn one.',
    points: ['User Empathy', 'Roadmap strategy', 'Feature prioritization'],
    skills: ['User Research', 'Roadmapping', 'Prioritization'],
    phaseId: 'professional', primaryColor: '#FFB800', position: 'top', icon: Rocket,
    connectsTo: [12],
  },
  {
    id: 10, year: 2019, age: '27',
    title: 'Scale & Optimization', context: 'SENIOR PM',
    quote: 'A great product is a great system.',
    points: ['Scaling products', 'Data-driven decisions', 'Mentoring teams'],
    skills: ['Systems Thinking', 'Data Analysis', 'Mentorship'],
    phaseId: 'professional', primaryColor: '#FFB800', position: 'bottom', icon: Briefcase,
    connectsTo: [12],
  },
  {
    id: 11, year: 2022, age: '30',
    title: 'Org Architecture', context: 'PRODUCT DIRECTOR',
    quote: 'Design the team. The team designs the product.',
    points: ['Visionary leadership', 'Market expansion', 'Org building'],
    skills: ['Org Design', 'Strategic Vision', 'Market Expansion'],
    phaseId: 'professional', primaryColor: '#FFB800', position: 'top', icon: Trophy,
    connectsTo: [12],
  },
  {
    id: 12, year: 2024, age: '32',
    title: 'Future Systems', context: 'AI INNOVATION',
    quote: 'The canvas was always infinite. Now the brush thinks.',
    points: ['LLM integration', 'Future-tech stack', 'AI Strategy'],
    skills: ['AI Strategy', 'LLM Architecture', 'Future Systems'],
    phaseId: 'frontier', primaryColor: '#FF0080', position: 'bottom', icon: Sparkles,
    connectsTo: [],
  },
];

// ─── Skill Connections ─────────────────────────────────────────────────────────

export const skillConnections: SkillConnection[] = [
  { fromEventId: 1, toEventId: 9,  label: 'Visual thinking → UX wireframing',          type: 'feeds'      },
  { fromEventId: 1, toEventId: 11, label: 'Precision drawing → Org design',             type: 'amplifies'  },
  { fromEventId: 2, toEventId: 9,  label: 'Color & detail → Product aesthetics',        type: 'feeds'      },
  { fromEventId: 3, toEventId: 10, label: 'Wind strategy → Market timing',              type: 'transforms' },
  { fromEventId: 4, toEventId: 9,  label: 'Typography → Information architecture',      type: 'feeds'      },
  { fromEventId: 5, toEventId: 9,  label: 'New perspectives → User research',           type: 'feeds'      },
  { fromEventId: 5, toEventId: 12, label: 'Framing moments → AI use-case vision',       type: 'amplifies'  },
  { fromEventId: 6, toEventId: 10, label: 'Team synergy → Cross-functional leadership', type: 'amplifies'  },
  { fromEventId: 7, toEventId: 11, label: 'Creative coordination → Director vision',    type: 'feeds'      },
  { fromEventId: 8, toEventId: 10, label: 'Risk management → Data-driven scaling',      type: 'feeds'      },
  { fromEventId: 8, toEventId: 12, label: 'Global mindset → AI global strategy',        type: 'amplifies'  },
];

// ─── Utilities ─────────────────────────────────────────────────────────────────

const YEAR_MIN = 1992;
const YEAR_MAX = 2026;
const PAD_PERCENT = 4;

export function getProportionalPosition(year: number): number {
  const raw = (year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN);
  return PAD_PERCENT + raw * (100 - PAD_PERCENT * 2);
}

export function getPhase(phaseId: PhaseId): Phase {
  return phases.find(p => p.id === phaseId)!;
}

export function getPhaseZoneBounds(phase: Phase): { leftPercent: number; widthPercent: number } {
  const [startYear, endYear] = phase.yearRange;
  const leftPercent = getProportionalPosition(startYear);
  const rightPercent = getProportionalPosition(Math.min(endYear, YEAR_MAX));
  return { leftPercent, widthPercent: rightPercent - leftPercent };
}

const YEAR_FIRST_EVENT = timelineEvents[0].year;
const YEAR_LAST_EVENT = timelineEvents[timelineEvents.length - 1].year;

export const TIMELINE_STATS = {
  totalEvents: timelineEvents.length,
  totalSkills: timelineEvents.reduce((s, e) => s + e.skills.length, 0),
  totalYears: YEAR_LAST_EVENT - YEAR_FIRST_EVENT,
  totalChapters: timelineEvents.length,
} as const;
