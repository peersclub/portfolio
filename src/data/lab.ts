// The Lab — products built on my own time (not in the resume, so the facts
// come from each repository and its vault instead of data/career.ts).
//   started  = first git commit in the product's repository
//   after    = dated market moves AFTER `started`, each kept only if Jev
//              judged it real validation (p >= 0.75, 2026-10-22 run)
//   before   = what already existed, so nothing here claims to be first
// Research, sources and Jev scores: Portfolio vault `09-Lab/`.

export interface LabEvent {
    name: string;
    /** completes the sentence after the linked name */
    what: string;
    date: string; // YYYY-MM-DD
    source: string;
    /** the big name the head-start bar runs to */
    key?: boolean;
}

export interface LabProject {
    slug: string;
    name: string;
    started: string; // YYYY-MM-DD, first commit
    status: string;
    url?: string;
    /** the head-start line, checked against the dates by Jev */
    lead: string;
    /** brand signal color, used for this product's lane in the chart */
    accent: string;
    /** real product UI, cropped to exclude unverified marketing claims */
    shot?: { src: string; w: number; h: number; alt: string; caption: string };
    oneLine: string;
    what: string;
    why: string;
    credit?: string;
    stack: string[];
    after: LabEvent[];
    afterNote?: string;
    before: string;
}

export const labProjects: LabProject[] = [
    {
        slug: 'ai-cost-guardian',
        name: 'AI Cost Guardian',
        started: '2025-08-05',
        status: 'Live',
        url: 'https://aicostguardian.com',
        lead: '13 days before Anthropic shipped its cost API. Nine months before Datadog.',
        accent: '#8b5cf6',
        oneLine: 'One place to see, govern and cut what a company spends on AI models.',
        what: 'It connects a company’s OpenAI, Anthropic, Gemini and Grok accounts, keeps the API keys encrypted, and shows spend by provider, model, person and team. Budgets, alerts, roles and audit logs sit on top. A built-in chat workbench sends each prompt to the cheapest model that can handle it.',
        why: 'Companies were adding AI providers faster than anyone could read the bill. Nobody had one view of what was spent, where it was wasted, or who was accountable for it. I built that view.',
        stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Provider admin APIs', 'Model routing'],
        after: [
            {
                name: 'Anthropic',
                what: 'opened a Usage & Cost API for organisation-wide spend reports.',
                date: '2025-08-18',
                source: 'https://platform.claude.com/docs/en/release-notes/api',
            },
            {
                name: 'Claude Code for Teams',
                what: 'added per-organisation and per-user spend limits.',
                date: '2025-08-20',
                source: 'https://www.anthropic.com/news/claude-code-on-team-and-enterprise',
            },
            {
                name: 'Vantage',
                what: 'put Claude costs next to cloud spend in its FinOps product.',
                date: '2025-09-10',
                source: 'https://www.vantage.sh/blog/anthropic-support',
            },
            {
                name: 'Datadog',
                what: 'launched AI cost tracking across OpenAI, Anthropic, Gemini and Bedrock, by user, key and model.',
                date: '2026-05-14',
                source: 'https://datadoghq.com/blog/cloud-cost-management-ai-costs',
                key: true,
            },
            {
                name: 'Claude Enterprise',
                what: 'added cost by group and user, spend alerts and model entitlements for admins.',
                date: '2026-07-02',
                source: 'https://claude.com/resources/articles/giving-admins-more-visibility-and-control-over-claude-usage-and-spend',
            },
        ],
        before: 'Helicone and Langfuse (2023) tracked LLM cost for developers, OpenAI had a usage and cost API (December 2024), and OpenRouter routed prompts automatically (January 2025). What came after, from Anthropic, Vantage and Datadog, was spend control for admins and finance teams.',
    },
    {
        slug: 'nomail',
        name: 'NoMail',
        started: '2025-08-21',
        status: 'In build',
        lead: 'Almost five months before Google announced an AI Inbox for Gmail that surfaces bills due and deliveries.',
        accent: '#6b7280',
        oneLine: 'An email client that reads Gmail and hands back what you have to do: what is arriving, what is due, what renews.',
        what: 'It reads Gmail without changing it and pulls out deliveries, bills, subscriptions with their yearly cost, renewals and invites. Each one comes with the action it needs: track, pay, manage or join. When an email doesn’t match a shape it knows, AI writes a new rule for that sender, so the next sync handles it without AI. It never sends, moves or deletes mail. It runs on my iPhone and isn’t public yet: its Google sign-in is still in testing mode.',
        why: 'Most of what lands in an inbox isn’t a conversation. It is an order, a bill or a renewal, and the one thing you need from it is buried inside the email. I wanted the inbox to hand that thing back.',
        stack: ['Flutter', 'Gmail API', 'Claude via OpenRouter', 'Self-learning extraction rules'],
        after: [
            {
                name: 'Gmail AI Inbox',
                what: 'was announced with suggested to-dos, such as a bill due tomorrow, and catch-up updates, such as an order delivered.',
                date: '2026-01-08',
                key: true,
                source: 'https://techcrunch.com/2026/01/08/gmail-debuts-a-personalized-ai-inbox-ai-overviews-in-search-and-more',
            },
        ],
        afterNote: 'The first version, with orders, bills and subscriptions, went in on 21 August 2025. I put it down and rebuilt it as NoMail in August 2026, so the date here is the first commit, not the rebuild.',
        before: 'Gmail already put packages arriving that day at the top of the inbox, and from July 2025 it had a page for unsubscribing from mailing lists. Shortwave and Superhuman already summarised email with AI.',
    },
    {
        slug: 'clarity',
        name: 'Clarity',
        started: '2026-02-26',
        status: 'Live',
        url: 'https://needclarity.ai',
        lead: 'Three months before Glean made context its pitch. Seven months before Atlassian called its graph the context layer.',
        accent: '#00a88b',
        shot: { src: '/lab/clarity.jpg', w: 1960, h: 760, alt: 'Clarity landing page headline about strategic initiatives drifting off course', caption: 'needclarity.ai' },
        oneLine: 'An early-warning system for when a company’s execution drifts from what it decided.',
        what: 'Clarity reads the tools where work happens, such as Slack and Gmail, and builds a graph of decisions, the reasoning behind them and what came of them. Each morning it sends leaders a memo on where execution has drifted, and an investigate view traces each signal back to its cause.',
        why: 'While building AssetWorks AI we hit a wall: giving the model all the context made it too expensive to run, and trimming the context made its answers unreliable. We built an engine that finds the minimum context a decision needs. Then we saw the same gap inside companies. Strategy is set at the top, and its reasoning gets lost at every layer on the way to execution.',
        credit: 'Co-founded with Ram S.',
        stack: ['Next.js', 'PostgreSQL + pgvector', 'Causal decision graph', 'Slack and Gmail integrations'],
        after: [
            {
                name: 'Glean',
                what: 'pitched its context graph as the way to spend far fewer tokens.',
                date: '2026-05-28',
                source: 'https://techcrunch.com/2026/05/28/gleans-top-line-crosses-300m-as-ai-budget-cutting-becomes-its-major-selling-point/',
            },
            {
                name: 'Gartner',
                what: 'told delivery teams to build context engineering into how they ship.',
                date: '2026-06-16',
                source: 'https://www.gartner.com/en/documents/8007769',
            },
            {
                name: 'Glean:GO',
                what: 'launched products to capture, route and apply company context.',
                date: '2026-08-30',
                source: 'https://thelettertwo.com/2026/08/30/glean-go-context-enterprise-ai/',
            },
            {
                name: 'Atlassian',
                what: 'positioned its Teamwork Graph as the context layer for enterprise agents.',
                date: '2026-10-09',
                key: true,
                source: 'https://www.forbes.com/sites/stevemcdowell/2026/10/09/atlassians-move-to-own-the-context-powering-enterprise-agentic-ai/',
            },
            {
                name: 'Uvi',
                what: 'raised a $7.5M seed to turn Slack, Jira and Confluence into business context for agents.',
                date: '2026-10-14',
                source: 'https://siliconangle.com/2026/10/14/uvi-raises-7-5m-help-ai-agents-learn-business-context/',
            },
        ],
        before: '“Context engineering” got its name in mid-2025, and Microsoft’s Work IQ, the “context graphs” thesis and OpenAI Frontier all came before our first commit, so we don’t claim to be first. I haven’t found anyone else shipping a drift signal or a daily drift memo.',
    },
    {
        slug: 'shortcut-generator',
        name: 'Shortcut Generator',
        started: '2026-04-07',
        status: 'Prototype',
        lead: 'Two months before Apple announced it at WWDC.',
        accent: '#2563eb',
        shot: { src: '/lab/shortcut-generator.jpg', w: 1440, h: 1120, alt: 'Shortcut Generator create screen: a prompt box with example shortcuts', caption: 'The create screen' },
        oneLine: 'Describe an Apple Shortcut in a sentence and get the shortcut file back.',
        what: 'You type what you want, for example “tell me the weather and my battery level”. Claude turns it into a list of Shortcuts actions, and a compiler writes the .shortcut file. A gallery lets people download and remix each other’s shortcuts. All eight commits landed in one afternoon. It stayed a prototype: the files it writes are unsigned, and Apple only imports signed ones.',
        why: 'In the Shortcuts app you build each automation by finding actions and wiring them together by hand. Here, one sentence does the wiring.',
        stack: ['Next.js', 'Claude API', 'plist compiler', 'Shortcuts file format'],
        after: [
            {
                name: 'Apple',
                what: 'announced “Describe a Shortcut” at WWDC: Shortcuts builds the steps from your description. It shipped to everyone in iOS 27 on 14 September 2026.',
                date: '2026-06-08',
                key: true,
                source: 'https://www.apple.com/newsroom/2026/06/apple-intelligence-brings-powerful-ai-capabilities-into-everyday-experiences/',
            },
        ],
        afterNote: 'A week after I started, MacStories’ Federico Viticci began a similar open-source tool, released in May 2026. That was parallel work, not a follower.',
        before: 'People tried GPT-written shortcuts on r/shortcuts in 2023, a Claude Code skill that writes signed shortcuts appeared in January 2026, and reports that Apple was working on this surfaced a week before I started.',
    },
    {
        slug: 'flowpilot',
        name: 'FlowPilot',
        started: '2026-08-02',
        status: 'In build',
        lead: 'Ten days before edelkrone launched a dolly for self-filming. Ten weeks before it let ChatGPT and Claude drive its gear.',
        accent: '#ffb300',
        shot: { src: '/lab/flowpilot.jpg', w: 796, h: 1000, alt: 'FlowPilot Cine Guide screen: a list of camera moves such as Tilt-Up Hero Reveal and Room Sweep, each with its path drawn in amber', caption: 'The Cine Guide, a catalogue of camera moves' },
        oneLine: 'An iPhone in a motorized gimbal, turned into a camera robot that performs the move you ask for.',
        what: 'It drives an Insta360 Flow 2 Pro through Apple’s DockKit, with no Insta360 SDK. You draw a camera move on the screen or pick one from a catalogue of 21, and the gimbal performs it with cinematic easing. An AI shot planner turns a description of the shoot into an ordered shot list built only from those moves. A second phone, home-screen widgets and an Apple Watch app start and stop a take from across the room. It runs on my iPhone and isn’t in the App Store yet.',
        why: 'A solo creator is the whole crew, and often the subject too. There is nobody else to hold the camera, so the camera has to move by itself, on cue.',
        stack: ['Flutter', 'Apple DockKit', 'Swift', 'watchOS', 'AI shot planner'],
        after: [
            {
                name: 'edelkrone Dolly GO',
                what: 'launched for self-filmers: a motorized base that carries a phone gimbal and joins the positions you mark into a smooth path.',
                date: '2026-08-12',
                source: 'https://www.newsshooter.com/2026/08/12/edelkrone-dolly-go/',
            },
            {
                name: 'edelkrone MCP',
                what: 'connected its motion-control gear to ChatGPT and Claude, so you describe a move in plain words and the assistant runs it.',
                date: '2026-10-11',
                key: true,
                source: 'https://edelkrone.com/blogs/edelkrone-news-updates/introducing-edelkrone-mcp',
            },
        ],
        before: 'edelkrone’s motorized JibONE dates back to 2020, and its app already chained saved positions on its own sliders and jibs in early 2026. Insta360 and DJI phone gimbals tracked subjects through DockKit from 2024. What came after was edelkrone moving toward phone-gimbal creators and plain-language control.',
    },
    {
        slug: 'credably',
        name: 'Credably',
        started: '2026-08-27',
        status: 'In build',
        lead: 'Nobody has followed yet. Still the only one I’ve found proving the money landed in the bank.',
        accent: '#2f6bff',
        shot: { src: '/lab/credably.jpg', w: 950, h: 820, alt: 'Credably verification receipt card for a sample stealth listing, marked settled', caption: 'Verification receipt, sample listing' },
        oneLine: 'Proof of what Indian software businesses actually earn, so they can be bought, sold or lent against.',
        what: 'A founder connects a read-only payment account and gets a public profile with revenue that was checked, not claimed, plus a badge for their own site. Buyers make offers, and an accepted offer opens a deal room that runs from NDA to letter of intent, purchase agreement and escrow.',
        why: 'Every global verified-revenue directory reads Stripe, and none of them can read a rupee from Razorpay, Cashfree or UPI. The metric doesn’t transfer either. RBI caps recurring debits without OTP at ₹15,000, so a lot of Indian software revenue is one-time or annual, and an MRR leaderboard shows an empty India. Credably’s headline number is verified 30-day net revenue, and the bank settlement can be proved through India’s Account Aggregator network.',
        stack: ['Dart (Jaspr + Flutter)', 'Next.js API', 'PostgreSQL', 'Payment-provider adapters'],
        after: [],
        afterNote: 'Too early to tell. I started it in August 2026, and I haven’t found a launch since that moves toward it.',
        before: 'TrustMRR (November 2025) made verified revenue a public leaderboard and marketplace, and VerifiedMRR.in (April 2026) already verifies Razorpay revenue in India. I haven’t found anyone else proving bank settlement through Account Aggregator or using a metric built for non-recurring revenue.',
    },
];

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function parse(iso: string): Date {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d ?? 1));
}

export function formatMonth(iso: string): string {
    const d = parse(iso);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function formatDay(iso: string): string {
    const d = parse(iso);
    return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** "+13 days" under two months, "+9 mo" after. */
export function gapLabel(from: string, to: string): string {
    const days = Math.round((parse(to).getTime() - parse(from).getTime()) / 86_400_000);
    return days < 60 ? `+${days} days` : `+${Math.round(days / 30.44)} mo`;
}
