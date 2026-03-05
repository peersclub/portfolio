'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Mail, ArrowUpRight, Sparkles, Package } from 'lucide-react';
import Footer from '@/components/Footer/Footer';

const MAC_CLEANUP_RUNBOOK = `You are a Mac cleanup assistant. Your job is to help the user reclaim disk space safely on their macOS developer machine.

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

const PREVIEW = `## STEP 1 — AUDIT
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
Prints a before / after disk usage summary.`;

const email = 'sureshthejosephite@gmail.com';

export default function SharingPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(MAC_CLEANUP_RUNBOOK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <div className="sharing-page">
        <div className="container">

          {/* ── Page Header ── */}
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="mono-label">Open Source</span>
            <h1>Things I&apos;m <span className="golden-text">Sharing</span></h1>
            <p className="subtitle">
              Resources, tools, and ideas — free for anyone who finds them useful.
              More dropping as I build them.
            </p>
          </motion.div>

          {/* ── Resource Card ── */}
          <motion.div
            className="resource-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Card Top */}
            <div className="card-top">
              <div className="card-meta">
                <span className="resource-tag">
                  <Sparkles size={11} />
                  Claude Prompt · Free
                </span>
                <span className="resource-number">01</span>
              </div>

              <h2 className="resource-title">Mac Developer<br />Cleanup Runbook</h2>
              <p className="resource-description">
                A battle-tested Claude Code prompt that audits your Mac&apos;s disk usage across
                Homebrew, Docker, node_modules, Xcode, Rust, Flutter, and more — then gives you
                a full confirmation table before touching a single file. Safe, surgical, and
                satisfying to run.
              </p>

              <div className="features-list">
                {[
                  'Parallel audit in one shot',
                  'Confirmation required before any deletion',
                  'Groups by: Homebrew / Runtimes / IDEs / AI tools',
                  'Flags irreversible actions clearly',
                  'Before & after disk usage summary',
                ].map((f) => (
                  <span key={f} className="feature-pill">
                    <span className="pill-check">✓</span> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Terminal Preview */}
            <div className="terminal-card">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="terminal-title">
                  <Terminal size={12} />
                  mac-cleanup-runbook.md
                </span>
                <Package size={13} className="terminal-icon-right" />
              </div>
              <pre className="terminal-body">
                <code>{PREVIEW}</code>
              </pre>
            </div>

            {/* How to use */}
            <div className="how-to-use">
              <span className="how-label">How to use</span>
              <p>
                Copy the prompt below and paste it into{' '}
                <strong>Claude Code</strong> (or any Claude interface).
                It will audit, confirm, then clean — with your explicit approval at every step.
              </p>
            </div>

            {/* Actions */}
            <div className="card-actions">
              <motion.button
                className={`btn-copy ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                whileTap={{ scale: 0.97 }}
              >
                {copied
                  ? <><Check size={16} strokeWidth={2.5} /> Copied to clipboard!</>
                  : <><Copy size={16} /> Copy Full Prompt</>}
              </motion.button>

              <a
                href={`mailto:${email}?subject=Re%3A%20Mac%20Cleanup%20Runbook`}
                className="btn-write"
              >
                <Mail size={15} />
                Write to me
                <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>

          {/* ── More Coming ── */}
          <motion.div
            className="more-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="more-card">
              <span className="mono-label">More Coming</span>
              <p>
                Ideas, templates, playbooks, and prompts — dripping out as I build them.
              </p>
              <a
                href={`mailto:${email}?subject=Sharing%20Page%20%E2%80%94%20Request`}
                className="more-link"
              >
                Got a request? Write to me
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      <Footer />

      <style jsx>{`
        /* ── Page Layout ── */
        .sharing-page {
          padding-top: 120px;
          padding-bottom: var(--space-5xl);
          min-height: 100vh;
        }

        .container {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 var(--space-xl);
        }

        /* ── Header ── */
        .page-header {
          text-align: center;
          margin-bottom: var(--space-5xl);
        }

        .mono-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: var(--space-md);
        }

        h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          line-height: 1.1;
          margin-bottom: var(--space-md);
        }

        .subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 460px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Resource Card ── */
        .resource-card {
          background: var(--surface-primary);
          border: 1px solid var(--line-subtle);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .resource-card:hover {
          border-color: var(--accent-border);
          box-shadow: 0 12px 48px var(--accent-subtle);
        }

        .card-top {
          padding: var(--space-2xl);
          border-bottom: 1px solid var(--line-subtle);
        }

        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
        }

        .resource-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-subtle);
          border: 1px solid var(--accent-border);
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .resource-number {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--line-subtle);
          letter-spacing: 0.1em;
        }

        .resource-title {
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          line-height: 1.15;
          margin-bottom: var(--space-md);
        }

        .resource-description {
          color: var(--text-secondary);
          line-height: 1.75;
          font-size: 0.95rem;
          margin-bottom: var(--space-xl);
          max-width: 620px;
        }

        .features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .feature-pill {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--surface-secondary, var(--bg-secondary));
          border: 1px solid var(--line-subtle);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .pill-check {
          color: var(--accent);
          font-size: 0.65rem;
        }

        /* ── Terminal ── */
        .terminal-card {
          background: #0d1117;
          border-top: 1px solid #21262d;
          border-bottom: 1px solid #21262d;
        }

        .terminal-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: #161b22;
          border-bottom: 1px solid #21262d;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot.red    { background: #ff5f57; }
        .dot.yellow { background: #febc2e; }
        .dot.green  { background: #28c840; }

        .terminal-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #8b949e;
          margin-left: 4px;
          flex: 1;
        }

        .terminal-icon-right {
          color: #3d444d;
          margin-left: auto;
        }

        .terminal-body {
          padding: var(--space-xl) var(--space-2xl);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          line-height: 1.75;
          color: #c9d1d9;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0;
        }

        /* ── How To ── */
        .how-to-use {
          padding: var(--space-lg) var(--space-2xl);
          background: var(--accent-subtle);
          border-bottom: 1px solid var(--line-subtle);
          display: flex;
          align-items: flex-start;
          gap: var(--space-md);
        }

        .how-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          flex-shrink: 0;
          padding-top: 2px;
        }

        .how-to-use p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .how-to-use strong {
          color: var(--text-primary);
        }

        /* ── Actions ── */
        .card-actions {
          padding: var(--space-xl) var(--space-2xl);
          display: flex;
          align-items: center;
          gap: var(--space-md);
          flex-wrap: wrap;
        }

        .btn-copy {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          background: var(--accent-gradient);
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.25s var(--ease-out-expo);
          box-shadow: 0 2px 12px var(--accent-subtle);
        }

        .btn-copy:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px var(--accent-border);
        }

        .btn-copy.copied {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
        }

        .btn-write {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 13px 22px;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          background: transparent;
          border: 1px solid var(--line-subtle);
          text-decoration: none;
          transition: all 0.25s var(--ease-out-expo);
        }

        .btn-write:hover {
          border-color: var(--accent-border);
          background: var(--accent-subtle);
          color: var(--accent);
          transform: translateY(-2px);
        }

        /* ── More Section ── */
        .more-section {
          margin-top: var(--space-3xl);
        }

        .more-card {
          text-align: center;
          padding: var(--space-3xl) var(--space-2xl);
          border: 1px dashed var(--line-subtle);
          border-radius: var(--radius-xl);
          background: transparent;
          transition: border-color 0.3s ease;
        }

        .more-card:hover {
          border-color: var(--accent-border);
        }

        .more-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: var(--space-sm) 0 var(--space-lg);
          line-height: 1.6;
        }

        .more-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--accent);
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: gap 0.2s ease, opacity 0.2s ease;
        }

        .more-link:hover {
          gap: 9px;
          opacity: 0.8;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .card-top {
            padding: var(--space-lg);
          }

          .card-actions {
            padding: var(--space-lg);
            flex-direction: column;
          }

          .btn-copy,
          .btn-write {
            width: 100%;
            justify-content: center;
          }

          .how-to-use {
            flex-direction: column;
            padding: var(--space-md) var(--space-lg);
            gap: var(--space-sm);
          }

          .terminal-body {
            padding: var(--space-md) var(--space-lg);
            font-size: 0.72rem;
          }
        }
      `}</style>
    </>
  );
}
