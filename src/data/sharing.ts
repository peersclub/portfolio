export interface SharingResource {
  slug: string;
  tag: string;
  number: string;
  shortTitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  features: string[];
  howItWorks: { title: string; desc: string }[];
  safetyRails: { label: string; desc: string }[];
  insightTitle: string;
  insight: string;
  insightHighlight?: string;
  terminalPreview: string;
  promptContent: string;
  emailSubject: string;
}

const MAC_CLEANUP_PROMPT = `You are a Mac cleanup assistant. Your job is to help the user reclaim disk space safely on their macOS developer machine.

Follow these steps strictly in order:

---

## STEP 1 — AUDIT (run silently, no deletions yet)

Run all of the following commands in parallel to understand the system:

\`\`\`
df -h /
\`\`\`

\`\`\`
brew list --formula | while read pkg; do size=$(du -sh "$(brew --cellar)/$pkg" 2>/dev/null | cut -f1); echo "$size    $pkg"; done | sort -h
\`\`\`

\`\`\`
du -sh \\
  ~/.cargo ~/.rustup \\
  ~/.pub-cache \\
  ~/.gradle ~/.m2 \\
  ~/.nvm/versions/node/* \\
  ~/.gemini ~/.antigravity ~/.antigravity_cockpit \\
  ~/Library/Caches/ms-playwright \\
  ~/Library/Developer/Xcode/DerivedData \\
  ~/Library/Developer/CoreSimulator/Devices \\
  ~/Library/Caches \\
  ~/.docker \\
  ~/.minikube \\
  2>/dev/null | sort -rh
\`\`\`

\`\`\`
du -sh ~/.gemini/antigravity/* ~/.gemini/antigravity-browser-profile 2>/dev/null | sort -rh
\`\`\`

\`\`\`
du -sh ~/.antigravity/extensions/* 2>/dev/null | sort -rh
\`\`\`

\`\`\`
find ~/Projects ~/Projects22 ~/Desktop ~/Documents -maxdepth 4 \\
  \\( -name ".next" -o -name "node_modules" -o -name "dist" -o -name ".vercel" \\) \\
  -type d 2>/dev/null | while read d; do du -sh "$d" 2>/dev/null; done | sort -rh
\`\`\`

\`\`\`
find ~/Downloads -name "*.dmg" -o -name "*.pkg" -o -name "*.zip" 2>/dev/null | \\
  while read f; do du -sh "$f"; done | sort -rh
\`\`\`

\`\`\`
du -sh ~/Downloads/* 2>/dev/null | sort -rh | head -20
\`\`\`

\`\`\`
du -sh \\
  ~/Library/Application\\ Support/Cursor/logs \\
  ~/Library/Application\\ Support/Cursor/User/workspaceStorage \\
  ~/Library/Application\\ Support/Code/logs \\
  ~/Library/Application\\ Support/Code/User/workspaceStorage \\
  2>/dev/null | sort -rh
\`\`\`

\`\`\`
docker system df 2>/dev/null || echo "Docker not running or not installed"
\`\`\`

\`\`\`
grep -n "cargo\\|nvm\\|pyenv\\|rbenv\\|flutter\\|pub\\|gradle" \\
  ~/.zshrc ~/.zshenv ~/.zprofile ~/.bashrc ~/.bash_profile 2>/dev/null | \\
  grep -v "^Binary"
\`\`\`

---

## STEP 2 — CONFIRMATION REPORT (show this before doing ANYTHING)

After running the audit, present a clean confirmation table like this:

\`\`\`
DISK USAGE BEFORE CLEANUP
Current free space: X GB of Y GB

WHAT WILL BE CLEANED                         SIZE        WHY IT IS SAFE
─────────────────────────────────────────────────────────────────────────
[list each item found, one per row]          [size]      [one-line reason]

WHAT WILL NOT BE TOUCHED                     WHY
─────────────────────────────────────────────────────────────────────────
[list anything skipped]                      [reason]

ESTIMATED SPACE RECOVERED: X GB

Type YES to proceed, or tell me what to skip.
\`\`\`

Rules for building the confirmation table:
- Only include items that actually exist and have size > 0
- Mark anything in Downloads as MANUAL REVIEW — never auto-delete personal files
- If a Homebrew package has dependents outside the removal list, flag it
- If node_modules exists, list it separately and note it requires \`npm install\` to restore
- If Antigravity conversations/brain exist, list them as DESTRUCTIVE — irreversible
- If Docker volumes exist, list them as DESTRUCTIVE — may contain important data
- Group items by category: Homebrew / Runtimes / Build Caches / AI Tools / IDEs / System

---

## STEP 3 — EXECUTE (only after the user types YES or approves)

Clean everything the user confirmed. For each item:
1. Delete it
2. Print a one-line confirmation: \`DONE  [size freed]  [what was deleted]\`

After all deletions, run:
\`\`\`
df -h /
\`\`\`

Then print a final summary:

\`\`\`
CLEANUP COMPLETE
─────────────────────────────
Before:   X GB free
After:    Y GB free
Freed:    Z GB

[List every item deleted with size]
\`\`\`

---

## RULES YOU MUST FOLLOW

- NEVER delete anything before showing the confirmation table and receiving YES
- NEVER delete ~/Downloads contents automatically — always mark as manual review
- NEVER delete Docker volumes without a separate explicit warning
- NEVER delete Antigravity conversations/brain without labelling it IRREVERSIBLE
- NEVER delete node_modules without noting the user must run npm/yarn/pnpm install after
- ALWAYS check brew uses --installed before removing a Homebrew package
- ALWAYS preserve OAuth/credential files when resetting AI tools
- If the user says skip something, remove it from the plan and re-show the table
- If a deletion fails, report it clearly — do not silently continue`;

export const sharingResources: SharingResource[] = [
  {
    slug: 'mac-cleanup-runbook',
    tag: 'Claude Prompt · Free',
    number: '01',
    shortTitle: 'Mac Developer Cleanup Runbook',
    titleLine1: 'Mac Developer',
    titleLine2: 'Cleanup Runbook',
    description:
      "A battle-tested Claude Code prompt that audits your Mac's disk usage across Homebrew, Docker, node_modules, Xcode, Rust, Flutter, and more — then gives you a full confirmation table before touching a single file. Safe, surgical, and satisfying to run.",
    features: [
      'Parallel audit in one shot',
      'Confirmation required before any deletion',
      'Groups by: Homebrew / Runtimes / IDEs / AI tools',
      'Flags irreversible actions clearly',
      'Before & after disk usage summary',
    ],
    howItWorks: [
      {
        title: 'Paste → Claude silently audits',
        desc: 'Runs all discovery commands in parallel — df, Homebrew sizes, runtime caches, project build artifacts, IDE data, Docker. No deletions. No questions yet.',
      },
      {
        title: 'Claude shows a confirmation table',
        desc: "Every item listed with its size, why it's safe to remove (or flagged as DESTRUCTIVE / IRREVERSIBLE), and an estimated total recovery. Nothing ambiguous.",
      },
      {
        title: 'You type YES — or say "skip X"',
        desc: 'Claude cleans only what you approved and prints DONE [size freed] [item] for each deletion. Skipped items are dropped from the plan.',
      },
      {
        title: 'Final report',
        desc: 'Before and after free space printed side by side, with a full list of everything freed. You see exactly what happened.',
      },
    ],
    safetyRails: [
      { label: '~/Downloads', desc: 'Always MANUAL REVIEW — never auto-deleted' },
      { label: 'Antigravity memory', desc: "Labelled IRREVERSIBLE — you're warned explicitly" },
      { label: 'Docker volumes', desc: 'Gets a separate explicit warning before any touch' },
      { label: 'node_modules', desc: 'Always reminds you to run npm/yarn/pnpm install after' },
      { label: 'Homebrew packages', desc: 'Checks dependents before suggesting removal' },
      { label: 'Nothing runs', desc: 'Until you explicitly type YES — no silent actions' },
    ],
    insightTitle: 'Why a prompt, not a bash script',
    insight:
      'Writing this as a Claude prompt flips the trust model entirely. A bash script runs blindly — you have to understand it before running. A Claude prompt makes the AI do the understanding first and puts a human checkpoint between audit and action. The IRREVERSIBLE labelling is borrowed from how good CLI tools handle destructive operations — it forces a moment of conscious decision rather than passive acceptance.',
    insightHighlight: 'IRREVERSIBLE',
    terminalPreview: `## STEP 1 — AUDIT
Runs in parallel — no deletions yet:
  · df -h /                         → current disk state
  · Homebrew packages by size        → find bloated formulae
  · ~/.nvm, ~/.cargo, ~/.gradle      → runtime caches
  · node_modules / .next / dist      → project build artifacts
  · Xcode DerivedData, Simulators    → often 20-50 GB
  · Docker volumes & images          → flagged as destructive
  · Downloads folder                 → manual review only

## STEP 2 — CONFIRMATION TABLE
Shows exactly what will be deleted and why it is safe.
Requires an explicit YES before touching anything.

## STEP 3 — EXECUTE
Deletes only what you approved.
Prints a before / after disk usage summary.`,
    promptContent: MAC_CLEANUP_PROMPT,
    emailSubject: 'Re%3A%20Mac%20Cleanup%20Runbook',
  },
];

export function getResource(slug: string): SharingResource | undefined {
  return sharingResources.find((r) => r.slug === slug);
}
