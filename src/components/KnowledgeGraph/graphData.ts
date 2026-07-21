// =====================================================================
// LinkedIn Knowledge Graph — Data Layer
// =====================================================================

export interface GraphNode {
  id: string;
  name: string;
  type: 'center' | 'hub' | 'company' | 'role' | 'hashtag' | 'following' | 'cause';
  r: number;
  color: string;
  count?: number;
  sector?: string;
  year?: number;
  fx?: number;
  fy?: number;
  fz?: number;
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  strength: number;
}

export const stats = {
  connections: '11,658',
  following: '1,031',
  companies: '820',
  hashtags: '135',
};

const companies = [
  { name: 'Amazon', count: 150, sector: 'Big Tech' },
  { name: 'Google', count: 109, sector: 'Big Tech' },
  { name: 'Microsoft', count: 94, sector: 'Big Tech' },
  { name: 'CaptainFresh', count: 66, sector: 'Startup' },
  { name: 'CoinDCX', count: 49, sector: 'FinTech' },
  { name: 'Apple', count: 45, sector: 'Big Tech' },
  { name: 'Meta', count: 41, sector: 'Big Tech' },
  { name: 'Deloitte', count: 41, sector: 'Consulting' },
  { name: 'Salesforce', count: 36, sector: 'SaaS' },
  { name: 'EY', count: 35, sector: 'Consulting' },
  { name: 'Accenture', count: 35, sector: 'Consulting' },
  { name: 'Uber', count: 29, sector: 'Tech' },
  { name: 'PhonePe', count: 29, sector: 'FinTech' },
  { name: 'Flipkart', count: 29, sector: 'eCommerce' },
  { name: 'AWS', count: 28, sector: 'Cloud' },
  { name: 'Swiggy', count: 26, sector: 'FoodTech' },
  { name: 'NVIDIA', count: 26, sector: 'Hardware' },
  { name: 'Adobe', count: 25, sector: 'SaaS' },
  { name: 'Zomato', count: 22, sector: 'FoodTech' },
  { name: 'Zepto', count: 21, sector: 'Startup' },
  { name: 'Paytm', count: 21, sector: 'FinTech' },
  { name: 'Atlassian', count: 20, sector: 'SaaS' },
  { name: 'Goldman Sachs', count: 18, sector: 'Finance' },
  { name: 'Razorpay', count: 17, sector: 'FinTech' },
  { name: 'Nykaa', count: 17, sector: 'eCommerce' },
];

const roles = [
  { name: 'Founder', count: 390 },
  { name: 'Co-Founder', count: 374 },
  { name: 'Product Manager', count: 265 },
  { name: 'Sr. Product Manager', count: 227 },
  { name: 'Sr. Software Engineer', count: 134 },
  { name: 'Founder & CEO', count: 134 },
  { name: 'Software Engineer', count: 130 },
  { name: 'Director', count: 124 },
  { name: 'Engineering Manager', count: 54 },
  { name: 'Head of Product', count: 47 },
  { name: 'Product Designer', count: 38 },
  { name: 'VP', count: 65 },
  { name: 'CEO', count: 32 },
];

const companyFollows = [
  'OpenAI', 'NVIDIA', 'Stripe', 'Cursor', 'Lovable',
  'n8n', 'McKinsey', 'Netflix', 'J.P. Morgan', 'ChatGPT',
  'Rubrik', 'Atlabs AI', 'Token Company', 'Wispr Flow',
  'Potpie AI', 'Fam', 'JioHotstar', 'Mono', 'Cent', 'Sila',
];

const hashtags = [
  { tag: 'startupindia', year: 2021 },
  { tag: 'technology', year: 2014 },
  { tag: 'innovation', year: 2014 },
  { tag: 'entrepreneurship', year: 2014 },
  { tag: 'startups', year: 2014 },
  { tag: 'venturecapital', year: 2014 },
  { tag: 'productmanagement', year: 2014 },
  { tag: 'ai', year: 2014 },
  { tag: 'bigdata', year: 2014 },
  { tag: 'analytics', year: 2014 },
  { tag: 'softwareengineering', year: 2014 },
  { tag: 'digitalmarketing', year: 2014 },
  { tag: 'personalbranding', year: 2013 },
  { tag: 'india', year: 2015 },
  { tag: 'futurism', year: 2014 },
];

const causes = ['Arts & Culture', 'Children', 'Education', 'Disaster Relief', 'Politics', 'Social Services'];

export type FilterType = 'all' | 'companies' | 'roles' | 'hashtags' | 'interests';

export function buildGraphData(filter: FilterType = 'all') {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // Center node
  nodes.push({
    id: 'center',
    name: 'Suresh Victor',
    type: 'center',
    r: 28,
    color: 'var(--accent-solid)',
  });

  if (filter === 'all' || filter === 'companies') {
    nodes.push({ id: 'hub-companies', name: 'Companies', type: 'hub', r: 14, color: '#8b5cf6' });
    links.push({ source: 'center', target: 'hub-companies', strength: 0.08 });

    companies.slice(0, filter === 'companies' ? 25 : 14).forEach((c) => {
      const id = 'co-' + c.name;
      nodes.push({
        id,
        name: c.name,
        type: 'company',
        r: Math.max(6, Math.min(18, c.count / 10)),
        color: '#8b5cf6',
        count: c.count,
        sector: c.sector,
      });
      links.push({ source: 'hub-companies', target: id, strength: 0.05 });
    });
  }

  if (filter === 'all' || filter === 'roles') {
    nodes.push({ id: 'hub-roles', name: 'Roles', type: 'hub', r: 14, color: '#10b981' });
    links.push({ source: 'center', target: 'hub-roles', strength: 0.08 });

    roles.slice(0, filter === 'roles' ? 13 : 8).forEach((r) => {
      const id = 'role-' + r.name;
      nodes.push({
        id,
        name: r.name,
        type: 'role',
        r: Math.max(5, Math.min(16, r.count / 26)),
        color: '#10b981',
        count: r.count,
      });
      links.push({ source: 'hub-roles', target: id, strength: 0.05 });
    });
  }

  if (filter === 'all' || filter === 'hashtags') {
    nodes.push({ id: 'hub-hash', name: 'Hashtags', type: 'hub', r: 14, color: '#f59e0b' });
    links.push({ source: 'center', target: 'hub-hash', strength: 0.08 });

    hashtags.slice(0, filter === 'hashtags' ? 15 : 9).forEach((h) => {
      const id = 'hash-' + h.tag;
      nodes.push({
        id,
        name: '#' + h.tag,
        type: 'hashtag',
        r: 7,
        color: '#f59e0b',
        year: h.year,
      });
      links.push({ source: 'hub-hash', target: id, strength: 0.04 });
    });
  }

  if (filter === 'all' || filter === 'interests') {
    nodes.push({ id: 'hub-causes', name: 'Causes', type: 'hub', r: 12, color: '#ec4899' });
    links.push({ source: 'center', target: 'hub-causes', strength: 0.08 });

    causes.forEach((c, i) => {
      const id = 'cause-' + i;
      nodes.push({ id, name: c, type: 'cause', r: 7, color: '#ec4899' });
      links.push({ source: 'hub-causes', target: id, strength: 0.04 });
    });

    nodes.push({ id: 'hub-following', name: 'Following', type: 'hub', r: 12, color: '#f97316' });
    links.push({ source: 'center', target: 'hub-following', strength: 0.08 });

    companyFollows.slice(0, 12).forEach((cf) => {
      const id = 'cf-' + cf;
      nodes.push({ id, name: cf, type: 'following', r: 6, color: '#f97316' });
      links.push({ source: 'hub-following', target: id, strength: 0.04 });
    });
  }

  return { nodes, links };
}

export function getTooltipContent(d: GraphNode) {
  switch (d.type) {
    case 'center':
      return {
        type: 'YOU',
        color: 'var(--accent-solid)',
        name: 'Suresh Victor',
        meta: '11,658 connections | Bangalore, India\nCreator | Indie Developer | Product Thinker',
      };
    case 'hub':
      return { type: 'CLUSTER', color: '#6366f1', name: d.name, meta: 'Connected cluster node' };
    case 'company':
      return { type: 'COMPANY', color: '#8b5cf6', name: d.name, meta: `${d.count} connections | ${d.sector || 'Tech'}` };
    case 'role':
      return { type: 'ROLE', color: '#10b981', name: d.name, meta: `${d.count} people in your network` };
    case 'hashtag':
      return { type: 'HASHTAG', color: '#f59e0b', name: d.name, meta: `Following since ${d.year}` };
    case 'following':
      return { type: 'COMPANY FOLLOW', color: '#f97316', name: d.name, meta: 'Company you follow on LinkedIn' };
    case 'cause':
      return { type: 'CAUSE', color: '#ec4899', name: d.name, meta: 'Cause you care about' };
  }
}
