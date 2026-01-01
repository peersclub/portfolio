'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { CountUpMetric } from '@/components/CountUpMetric/CountUpMetric';
import {
  TrendingUp, Rocket, Target, Bot,
} from 'lucide-react';

const impacts = [
  {
    number: '01',
    metric: '1M+',
    description: 'users on India\'s largest crypto exchange',
    context: 'Led product for DCXInsta, DCXTrade, DCXMargin, and DCXFutures platforms',
    company: 'CoinDCX',
    icon: TrendingUp,
    size: 'large',
    accentColor: '#F97316', // Orange
    gradientFrom: 'rgba(249, 115, 22, 0.2)',
    gradientTo: 'rgba(249, 115, 22, 0.05)',
    chartType: 'area', // Hockey Stick
  },
  {
    number: '02',
    metric: '42%',
    description: 'retention increase in 8 months',
    context: 'Complete platform revamp with improved UX and engagement features',
    company: 'Babychakra',
    icon: Rocket,
    size: 'medium',
    accentColor: '#F43F5E', // Pinkish Red (Rose)
    gradientFrom: 'rgba(244, 63, 94, 0.2)',
    gradientTo: 'rgba(244, 63, 94, 0.05)',
    chartType: 'retention', // Step Up
  },
  {
    number: '03',
    metric: 'First',
    description: 'in-industry supply chain platform',
    context: 'Built B2B platform and ops team from scratch for seafood logistics',
    company: 'CaptainFresh',
    icon: Target,
    size: 'medium',
    accentColor: '#EF4444', // Red
    gradientFrom: 'rgba(239, 68, 68, 0.2)',
    gradientTo: 'rgba(239, 68, 68, 0.05)',
    chartType: 'bar', // Growth Bars
  },
  {
    number: '04',
    metric: 'AI-Native',
    description: 'financial analytics with natural language',
    context: 'Co-founded platform integrating Claude AI & GPT for investment insights',
    company: 'Assetworks AI',
    icon: Bot,
    accentColor: '#94A3B8', // Grey
    gradientFrom: 'rgba(148, 163, 184, 0.2)',
    chartType: 'line',
  },
];

const MicroChart = ({ type, color }: { type: string; color: string }) => {
  const isHovered = true;

  switch (type) {
    case 'area': // CoinDCX - Hockey Stick Growth
      return (
        <svg viewBox="0 0 100 40" className="micro-chart">
          <defs>
            <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 40 L 40 40 Q 75 40 100 2 L 100 40 Z" // Hockey stick shape
            fill={`url(#grad-${color})`}
            initial={{ d: "M0 40 L 40 40 Q 75 40 100 40 L 100 40 Z" }}
            whileInView={{ d: "M0 40 L 40 40 Q 75 40 100 2 L 100 40 Z" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 40 L 40 40 Q 75 40 100 2"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </svg>
      );
    case 'bar': // CaptainFresh - Growth Bars (0 -> 1)
      return (
        <svg viewBox="0 0 100 40" className="micro-chart">
          {[0, 1, 2, 3, 4].map((i) => {
            const h = [5, 12, 18, 24, 30][i]; // Scaled down to prevent sharp clipping
            const x = i * 20 + 10;
            return (
              <motion.line
                key={i}
                x1={x}
                y1="40"
                x2={x}
                y2="40"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round" // User wants CURVED
                initial={{ y2: 40 }}
                whileInView={{ y2: 40 - h }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "backOut" }}
                opacity={1}
              />
            );
          })}
        </svg>
      );
    case 'retention': // Babychakra - Step Up (Retention)
      return (
        <svg viewBox="0 0 100 40" className="micro-chart">
          <motion.path
            d="M5 35 L 35 35 L 35 20 L 70 20 L 70 5 L 95 5"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.circle cx="35" cy="35" r="3" fill={color} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 }} />
          <motion.circle cx="70" cy="20" r="3" fill={color} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.8 }} />
          <motion.circle cx="95" cy="5" r="4" fill={color} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.2 }} />
        </svg>
      );
    case 'trend': // Fallback / Generic
      return (
        <svg viewBox="0 0 100 40" className="micro-chart">
          <motion.path
            d="M0 35 L 100 5"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
        </svg>
      );
    case 'line': // Assetworks - AI Efficiency
      return (
        <svg viewBox="0 0 100 40" className="micro-chart">
          <motion.polyline
            points="0,35 20,30 40,32 60,15 80,18 100,5"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.2 }}
          />
        </svg>
      );
    default:
      return null;
  }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9]
    }
  }
};

export default function Impact() {
  return (
    <section className="impact section" id="impact">
      {/* Animated background elements */}
      <div className="impact-bg-orb orb-1" />
      <div className="impact-bg-orb orb-2" />
      <div className="impact-grid-pattern" />

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          <span className="label">What I&apos;ve Built</span>
          <h2>
            Products that <span className="golden-text">matter</span>
          </h2>
          <p className="section-subtitle">
            Measurable outcomes across fintech, consumer tech, and AI products
          </p>
        </motion.div>

        <motion.div
          className="impact-bento"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {impacts.map((item) => (
            <motion.div
              key={item.number}
              className={`impact-card impact-card--${item.size}`}
              variants={itemVariant}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                '--accent-color': item.accentColor,
                '--gradient-from': item.gradientFrom,
                '--gradient-to': item.gradientTo,
              } as React.CSSProperties}
            >
              {/* Animated border glow */}
              <div className="card-border-glow" />

              {/* Gradient background */}
              <div className="card-bg-gradient" />

              {/* Texture Pattern (CSS Only - Safe) */}
              <div className="card-texture" />



              {/* Shimmer effect */}
              <div className="card-shimmer" />

              {/* Card content */}
              <div className="card-inner">
                {/* Header: Icon + Company */}
                <div className="card-header">
                  <div className="card-icon-wrapper">
                    <item.icon className="card-icon" size={26} strokeWidth={1.8} />
                  </div>
                  <div className="card-badge">
                    <span className="badge-number">{item.number}</span>
                    <span className="badge-company">{item.company}</span>
                  </div>
                </div>

                {/* Main metric - THE HERO */}
                <div className="card-metric-section">
                  <div className="metric-container">
                    <CountUpMetric value={item.metric} className="impact-metric" />
                    <div className="metric-underline" />
                  </div>
                  <div className="metric-chart-wrapper">
                    <MicroChart type={item.chartType || 'area'} color={item.accentColor} />
                  </div>
                </div>

                {/* Description */}
                <div className="card-footer">
                  <p className="impact-description">{item.description}</p>
                  <p className="impact-context">{item.context}</p>
                </div>

                {/* Decorative elements */}
                <div className="card-corner-accent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .impact {
          background: var(--bg-primary);
          min-height: auto;
          padding: var(--space-5xl) 0;
          overflow: hidden;
          position: relative;
        }

        /* Animated floating orbs */
        .impact-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          top: 10%;
          left: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(232, 197, 71, 0.08) 0%, transparent 70%);
          animation-delay: 0s;
        }

        .orb-2 {
          bottom: 10%;
          right: 10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%);
          animation-delay: -10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(-20px, 20px) scale(0.95); }
          75% { transform: translate(-30px, -10px) scale(1.02); }
        }

        /* Subtle grid pattern */
        .impact-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse at center, transparent 20%, black 70%);
        }

        .section-header {
          margin-bottom: var(--space-4xl);
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .label {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          display: inline-block;
          margin-bottom: var(--space-md);
          padding: 8px 16px;
          background: rgba(232, 197, 71, 0.1);
          border: 1px solid rgba(232, 197, 71, 0.2);
          border-radius: var(--radius-full);
        }

        .section-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.7;
          margin-top: var(--space-md);
        }

        @media (max-width: 768px) {
          .section-subtitle {
            font-size: 1rem;
          }
        }

        /* Bento Grid */
        .impact-bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: minmax(380px, auto);
          gap: var(--space-xl);
          position: relative;
          z-index: 2;
        }

        /* Card positioning */
        .impact-card:nth-child(1) { grid-column: 1 / span 7; }
        .impact-card:nth-child(2) { grid-column: 8 / span 5; }
        .impact-card:nth-child(3) { grid-column: 1 / span 5; }
        .impact-card:nth-child(4) { grid-column: 6 / span 7; }

        /* Card base styles */
        .impact-card {
          position: relative;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.5s ease;
        }

        .impact-card:hover {
          border-color: var(--accent-color);
        }

        /* Animated border glow on hover */
        .card-border-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            135deg,
            var(--accent-color) 0%,
            transparent 50%,
            var(--accent-color) 100%
          );
          border-radius: 26px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.5s ease;
        }

        .impact-card:hover .card-border-glow {
          opacity: 0.6;
          animation: borderPulse 2s ease-in-out infinite;
        }

        @keyframes borderPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        /* Background gradient */
        .card-bg-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            var(--gradient-from) 0%,
            var(--gradient-to) 60%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .impact-card:hover .card-bg-gradient {
          opacity: 1;
        }

        /* Shimmer effect - Steel Flash */
        .card-shimmer {
          position: absolute;
          top: 0;
          left: -150%;
          width: 150%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.1) 40%,
            rgba(255, 255, 255, 0.2) 45%,
            var(--accent-color) 50%,
            rgba(255, 255, 255, 0.2) 55%,
            rgba(255, 255, 255, 0.1) 60%,
            transparent 80%
          );
          opacity: 0.3;
          transform: skewX(-20deg);
          pointer-events: none;
          z-index: 2;
          transition: left 0.7s ease;
        }

        .impact-card:hover .card-shimmer {
          left: 150%;
          transition: left 0.7s ease;
        }

        /* Texture Pattern */
        .card-texture {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image: radial-gradient(var(--accent-color) 1px, transparent 1px);
          background-size: 24px 24px;
          mask-image: linear-gradient(to bottom right, black, transparent 80%);
          pointer-events: none;
        }

        /* Card inner content */
        .card-inner {
          position: relative;
          z-index: 1;
          padding: var(--space-2xl) var(--space-2xl) var(--space-xl);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-xl);
        }

        .card-icon-wrapper {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--gradient-from), transparent);
          border: 1px solid var(--accent-color);
          border-radius: 16px;
          transition: all 0.4s ease;
        }

        .impact-card:hover .card-icon-wrapper {
          background: var(--accent-color);
          transform: scale(1.1) rotate(-8deg);
          box-shadow: 0 8px 30px -5px var(--accent-color);
        }

        .card-icon {
          color: var(--accent-color);
          transition: all 0.4s ease;
        }

        .impact-card:hover .card-icon {
          color: var(--bg-primary);
          transform: scale(1.15);
        }

        .card-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .badge-number {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-color);
          opacity: 0.8;
        }

        .badge-company {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-primary);
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          transition: all 0.3s ease;
        }

        .impact-card:hover .badge-company {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-color);
        }

        /* Metric Section - THE HERO */
        .card-metric-section {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .metric-container {
          position: relative;
        }

        .impact-metric {
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.04em;
          background: linear-gradient(
            135deg,
            var(--text-primary) 30%,
            var(--accent-color) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.4s ease;
        }

        .impact-card:hover .impact-metric {
          transform: scale(1.05);
          filter: drop-shadow(0 0 30px var(--accent-color));
        }

        .metric-underline {
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-color), transparent);
          border-radius: 2px;
          transition: width 0.4s ease;
        }

        .impact-card:hover .metric-underline {
          width: 100%;
        }

        .metric-chart-wrapper {
          width: 140px; /* Fixed width instead of flex: 1 */
          height: 50px;
          margin-left: var(--space-xl);
          margin-bottom: 6px; /* Align with text baseline */
          opacity: 0.9;
          display: flex;
          align-items: flex-end;
        }

        .micro-chart {
          width: 100%;
          height: 100%;
          overflow: hidden; /* Prevent spillover */
        }

        /* Description */
        .card-footer {
          margin-top: auto;
          padding-top: var(--space-lg);
        }

        .impact-description {
          font-size: 1.15rem;
          font-weight: 500;
          line-height: 1.6;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }

        .impact-context {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 90%;
        }

        /* Corner accent decoration */
        .card-corner-accent {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 120px;
          height: 120px;
          background: radial-gradient(
            circle at bottom right,
            var(--accent-color) 0%,
            transparent 70%
          );
          opacity: 0.25;
          transition: all 0.4s ease;
        }

        .impact-card:hover .card-corner-accent {
          opacity: 0.35;
          width: 160px;
          height: 160px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .impact-bento {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-lg);
          }

          .impact-card:nth-child(1),
          .impact-card:nth-child(2),
          .impact-card:nth-child(3),
          .impact-card:nth-child(4) {
            grid-column: span 1;
          }

          .impact-bento {
            grid-auto-rows: minmax(260px, auto);
          }
        }

        @media (max-width: 640px) {
          .impact-bento {
            grid-template-columns: 1fr;
          }

          .card-inner {
            padding: var(--space-xl);
          }

          .impact-metric {
            font-size: 3.5rem;
          }

          .card-icon-wrapper {
            width: 50px;
            height: 50px;
            border-radius: 12px;
          }
        }
      `}</style>
    </section >
  );
}
