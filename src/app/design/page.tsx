'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette, Type, Grid3X3, Square, MousePointer, Zap,
  Copy, Check, ChevronRight, Sun, Moon
} from 'lucide-react';

// ============ DATA ============
const sections = [
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'typography', label: 'Typography', icon: Type },
  { id: 'spacing', label: 'Spacing', icon: Grid3X3 },
  { id: 'components', label: 'Components', icon: Square },
  { id: 'motion', label: 'Motion', icon: Zap },
  { id: 'cursor', label: 'Cursor', icon: MousePointer },
];

const colorTokens = {
  'Background': [
    { name: '--bg-void', value: '#0a0a0f', desc: 'Deepest black' },
    { name: '--bg-primary', value: '#0d0d12', desc: 'Main canvas' },
    { name: '--bg-secondary', value: '#13131a', desc: 'Elevated surfaces' },
    { name: '--bg-glass', value: 'rgba(255,255,255,0.03)', desc: 'Glassmorphism' },
  ],
  'Accent': [
    { name: '--accent', value: '#E8C547', desc: 'Primary gold' },
    { name: '--accent-dim', value: 'rgba(232,197,71,0.6)', desc: 'Muted gold' },
    { name: '--glow-color', value: 'rgba(232,197,71,0.15)', desc: 'Glow effect' },
  ],
  'Text': [
    { name: '--text-primary', value: '#FAFAFA', desc: 'Headlines' },
    { name: '--text-secondary', value: '#A1A1AA', desc: 'Body text' },
    { name: '--text-muted', value: '#52525B', desc: 'Captions' },
  ],
  'Semantic': [
    { name: '--success', value: '#10B981', desc: 'Success states' },
    { name: '--warning', value: '#F59E0B', desc: 'Warning states' },
    { name: '--error', value: '#EF4444', desc: 'Error states' },
  ],
};

const typographyScale = [
  { name: 'Hero', css: 'clamp(4rem, 12vw, 8rem)', weight: 800, example: 'Aa' },
  { name: 'Display', css: '3.5rem', weight: 700, example: 'Display Text' },
  { name: 'H1', css: '2.5rem', weight: 700, example: 'Heading 1' },
  { name: 'H2', css: '2rem', weight: 600, example: 'Heading 2' },
  { name: 'H3', css: '1.5rem', weight: 600, example: 'Heading 3' },
  { name: 'Body', css: '1rem', weight: 400, example: 'Body text for paragraphs and content.' },
  { name: 'Small', css: '0.875rem', weight: 400, example: 'Small text and labels' },
  { name: 'Caption', css: '0.75rem', weight: 400, example: 'Caption text' },
  { name: 'Mono', css: '0.875rem', weight: 400, example: 'console.log("code")', mono: true },
];

const spacingScale = [
  { name: 'space-1', value: '4px', px: 4 },
  { name: 'space-2', value: '8px', px: 8 },
  { name: 'space-3', value: '12px', px: 12 },
  { name: 'space-4', value: '16px', px: 16 },
  { name: 'space-6', value: '24px', px: 24 },
  { name: 'space-8', value: '32px', px: 32 },
  { name: 'space-12', value: '48px', px: 48 },
  { name: 'space-16', value: '64px', px: 64 },
  { name: 'space-24', value: '96px', px: 96 },
];

const motionTokens = [
  { name: 'ease-out-expo', value: 'cubic-bezier(0.16, 1, 0.3, 1)', desc: 'Primary snappy exit' },
  { name: 'ease-spring', value: 'type: spring, stiffness: 300', desc: 'Bouncy feel' },
  { name: 'duration-fast', value: '200ms', desc: 'Hovers, toggles' },
  { name: 'duration-normal', value: '400ms', desc: 'Page transitions' },
  { name: 'duration-slow', value: '800ms', desc: 'Hero reveals' },
];

// ============ COMPONENT ============
export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState('colors');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, token: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  return (
    <div className="design-system">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo">DS</span>
          <span className="sidebar-title">Design System</span>
        </div>
        <nav className="sidebar-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <section.icon size={18} />
              <span>{section.label}</span>
              <ChevronRight size={14} className="nav-arrow" />
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span>v1.0.0</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeSection === 'colors' && (
            <Section key="colors" title="Colors" subtitle="Color tokens for consistent theming">
              {Object.entries(colorTokens).map(([group, tokens]) => (
                <div key={group} className="token-group">
                  <h3 className="group-title">{group}</h3>
                  <div className="color-grid">
                    {tokens.map((token) => (
                      <motion.div
                        key={token.name}
                        className="color-card"
                        whileHover={{ y: -4 }}
                        onClick={() => copyToClipboard(`var(${token.name})`, token.name)}
                      >
                        <div
                          className="color-preview"
                          style={{ background: token.value }}
                        />
                        <div className="color-info">
                          <code className="token-name">{token.name}</code>
                          <span className="token-value">{token.value}</span>
                          <span className="token-desc">{token.desc}</span>
                        </div>
                        <div className="copy-indicator">
                          {copiedToken === token.name ? <Check size={14} /> : <Copy size={14} />}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {activeSection === 'typography' && (
            <Section key="typography" title="Typography" subtitle="Type scale and font styles">
              <div className="type-table">
                <div className="type-header">
                  <span>Name</span>
                  <span>Size</span>
                  <span>Preview</span>
                </div>
                {typographyScale.map((type) => (
                  <div key={type.name} className="type-row">
                    <span className="type-name">{type.name}</span>
                    <code className="type-css">{type.css}</code>
                    <span
                      className="type-preview"
                      style={{
                        fontSize: type.css,
                        fontWeight: type.weight,
                        fontFamily: type.mono ? 'var(--font-mono)' : 'inherit'
                      }}
                    >
                      {type.example}
                    </span>
                  </div>
                ))}
              </div>

              <div className="code-block">
                <div className="code-header">Usage</div>
                <pre>{`/* Import fonts in layout */
font-family: var(--font-heading);
font-family: var(--font-body);
font-family: var(--font-mono);

/* Apply scale */
font-size: var(--text-xl);`}</pre>
              </div>
            </Section>
          )}

          {activeSection === 'spacing' && (
            <Section key="spacing" title="Spacing" subtitle="Consistent spacing scale (8px base)">
              <div className="spacing-grid">
                {spacingScale.map((space) => (
                  <div
                    key={space.name}
                    className="spacing-row"
                    onClick={() => copyToClipboard(`var(--${space.name})`, space.name)}
                  >
                    <code className="spacing-name">--{space.name}</code>
                    <span className="spacing-value">{space.value}</span>
                    <div className="spacing-visual">
                      <div
                        className="spacing-bar"
                        style={{ width: Math.min(space.px, 200) }}
                      />
                    </div>
                    <div className="copy-indicator">
                      {copiedToken === space.name ? <Check size={14} /> : <Copy size={14} />}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {activeSection === 'components' && (
            <Section key="components" title="Components" subtitle="Reusable UI components">
              <div className="component-group">
                <h3 className="group-title">Buttons</h3>
                <div className="component-row">
                  <button className="btn btn-primary">Primary</button>
                  <button className="btn btn-secondary">Secondary</button>
                  <button className="btn btn-ghost">Ghost</button>
                  <button className="btn btn-primary" disabled>Disabled</button>
                </div>
              </div>

              <div className="component-group">
                <h3 className="group-title">Cards</h3>
                <div className="cards-row">
                  <div className="demo-card">
                    <h4>Glass Card</h4>
                    <p>Glassmorphism with blur backdrop</p>
                  </div>
                  <div className="demo-card elevated">
                    <h4>Elevated Card</h4>
                    <p>With shadow and solid background</p>
                  </div>
                </div>
              </div>

              <div className="component-group">
                <h3 className="group-title">Badges</h3>
                <div className="component-row">
                  <span className="badge">Default</span>
                  <span className="badge accent">Accent</span>
                  <span className="badge success">Success</span>
                  <span className="badge warning">Warning</span>
                </div>
              </div>
            </Section>
          )}

          {activeSection === 'motion' && (
            <Section key="motion" title="Motion" subtitle="Animation curves and timing">
              <div className="motion-grid">
                {motionTokens.map((token) => (
                  <div key={token.name} className="motion-card">
                    <div className="motion-header">
                      <code>{token.name}</code>
                      <span className="motion-desc">{token.desc}</span>
                    </div>
                    <div className="motion-demo">
                      <motion.div
                        className="motion-ball"
                        animate={{ x: [0, 150, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: token.name === 'ease-out-expo' ? [0.16, 1, 0.3, 1] : 'easeInOut'
                        }}
                      />
                    </div>
                    <code className="motion-value">{token.value}</code>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {activeSection === 'cursor' && (
            <Section key="cursor" title="Cursor" subtitle="Enhanced cursor behavior">
              <div className="cursor-demo-area" data-cursor-text="Custom Label">
                <p>Move your cursor around this area to see:</p>
                <ul>
                  <li>Particle trails on fast movement</li>
                  <li>Click anywhere for ripple effect</li>
                  <li>Hover on buttons to see morphing</li>
                </ul>
                <div className="component-row" style={{ marginTop: '2rem' }}>
                  <button className="btn btn-primary">Hover Me</button>
                  <a href="#" className="link">Link Element</a>
                </div>
              </div>

              <div className="code-block">
                <div className="code-header">Custom Cursor Labels</div>
                <pre>{`/* Add data attribute for hover labels */
<div data-cursor-text="View Project">
  ...
</div>`}</pre>
              </div>
            </Section>
          )}
        </AnimatePresence>
      </main>

      <style jsx>{`
        .design-system {
          display: flex;
          min-height: 100vh;
          background: var(--bg-primary);
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 100;
        }

        .sidebar-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .sidebar-logo {
          width: 36px;
          height: 36px;
          background: var(--accent);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .sidebar-title {
          font-weight: 600;
          font-size: 1rem;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.875rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          width: 100%;
        }

        .nav-item:hover {
          background: var(--bg-glass);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: var(--accent);
          color: #000;
        }

        .nav-arrow {
          margin-left: auto;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .nav-item:hover .nav-arrow,
        .nav-item.active .nav-arrow {
          opacity: 1;
        }

        .sidebar-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--glass-border);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 260px;
          padding: 3rem 4rem;
          max-width: 1000px;
        }

        /* Token Groups */
        .token-group {
          margin-bottom: 3rem;
        }

        .group-title {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        /* Color Grid */
        .color-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .color-card {
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .color-card:hover {
          border-color: var(--accent);
        }

        .color-preview {
          height: 80px;
          border-bottom: 1px solid var(--glass-border);
        }

        .color-info {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .token-name {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
        }

        .token-value {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .token-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .copy-indicator {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          color: var(--text-muted);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .color-card:hover .copy-indicator {
          opacity: 1;
        }

        /* Typography Table */
        .type-table {
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          overflow: hidden;
        }

        .type-header {
          display: grid;
          grid-template-columns: 100px 150px 1fr;
          padding: 1rem 1.5rem;
          background: var(--bg-glass);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          border-bottom: 1px solid var(--glass-border);
        }

        .type-row {
          display: grid;
          grid-template-columns: 100px 150px 1fr;
          padding: 1rem 1.5rem;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
        }

        .type-row:last-child {
          border-bottom: none;
        }

        .type-name {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .type-css {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
        }

        .type-preview {
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Spacing */
        .spacing-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .spacing-row {
          display: grid;
          grid-template-columns: 120px 60px 1fr 30px;
          align-items: center;
          padding: 0.75rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .spacing-row:hover {
          border-color: var(--accent);
        }

        .spacing-name {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
        }

        .spacing-value {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .spacing-visual {
          display: flex;
          align-items: center;
        }

        .spacing-bar {
          height: 12px;
          background: var(--accent);
          border-radius: 2px;
        }

        /* Components */
        .component-group {
          margin-bottom: 2.5rem;
        }

        .component-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cards-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .demo-card {
          background: var(--bg-glass);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(8px);
        }

        .demo-card.elevated {
          background: var(--bg-secondary);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .demo-card h4 {
          margin: 0 0 0.5rem;
          font-weight: 600;
        }

        .demo-card p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        /* Buttons */
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.875rem;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: var(--accent);
          color: #000;
        }

        .btn-primary:hover {
          filter: brightness(1.1);
        }

        .btn-secondary {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border-color: var(--glass-border);
        }

        .btn-secondary:hover {
          border-color: var(--accent);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-primary);
          border-color: var(--glass-border);
        }

        .btn-ghost:hover {
          background: var(--bg-glass);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Badges */
        .badge {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 500;
          border-radius: 999px;
          background: var(--bg-glass);
          border: 1px solid var(--glass-border);
        }

        .badge.accent {
          background: var(--accent);
          color: #000;
          border-color: transparent;
        }

        .badge.success {
          background: rgba(16, 185, 129, 0.2);
          color: #10B981;
          border-color: #10B981;
        }

        .badge.warning {
          background: rgba(245, 158, 11, 0.2);
          color: #F59E0B;
          border-color: #F59E0B;
        }

        /* Motion */
        .motion-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .motion-card {
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .motion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .motion-header code {
          font-family: var(--font-mono);
          color: var(--accent);
        }

        .motion-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .motion-demo {
          height: 40px;
          background: var(--bg-glass);
          border-radius: 8px;
          margin-bottom: 1rem;
          position: relative;
          overflow: hidden;
        }

        .motion-ball {
          width: 24px;
          height: 24px;
          background: var(--accent);
          border-radius: 50%;
          position: absolute;
          top: 8px;
          left: 8px;
        }

        .motion-value {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        /* Cursor Demo */
        .cursor-demo-area {
          background: var(--bg-secondary);
          border: 2px dashed var(--glass-border);
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
        }

        .cursor-demo-area p {
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .cursor-demo-area ul {
          list-style: none;
          padding: 0;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .cursor-demo-area li {
          margin-bottom: 0.5rem;
        }

        .link {
          color: var(--accent);
          text-decoration: underline;
        }

        /* Code Block */
        .code-block {
          margin-top: 2rem;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          overflow: hidden;
        }

        .code-header {
          padding: 0.75rem 1rem;
          background: var(--bg-glass);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          border-bottom: 1px solid var(--glass-border);
        }

        .code-block pre {
          padding: 1rem;
          margin: 0;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-secondary);
          overflow-x: auto;
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 80px;
          }

          .sidebar-title,
          .nav-item span,
          .nav-arrow {
            display: none;
          }

          .nav-item {
            justify-content: center;
          }

          .main-content {
            margin-left: 80px;
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

// Section wrapper component
function Section({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="section-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="section-content">{children}</div>

      <style jsx>{`
        .section-header {
          margin-bottom: 3rem;
        }

        .section-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }

        .section-header p {
          color: var(--text-secondary);
          margin: 0;
        }

        .section-content {
          margin-bottom: 4rem;
        }
      `}</style>
    </motion.section>
  );
}
