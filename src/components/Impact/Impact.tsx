'use client';

import React from 'react';
import BrandName from '@/components/BrandName';

import { motion } from 'framer-motion';
import { CountUpMetric } from '@/components/CountUpMetric/CountUpMetric';
import {
  TrendingUp, Rocket, Target, Bot,
} from 'lucide-react';

// Brand-accurate accents (KoinBX blue, BabyChakra cyan, CoinDCX orange),
// matched to src/data/projects.ts.
const IMPACT_CARD_PALETTE = [
  { accent: '#006AFE', gradientFrom: 'rgba(0, 106, 254, 0.2)',   gradientTo: 'rgba(0, 106, 254, 0.05)'   },
  { accent: '#89EBF5', gradientFrom: 'rgba(137, 235, 245, 0.2)', gradientTo: 'rgba(137, 235, 245, 0.05)' },
  { accent: '#FA4A2A', gradientFrom: 'rgba(250, 74, 42, 0.2)',   gradientTo: 'rgba(250, 74, 42, 0.05)'   },
  { accent: '#006AFE', gradientFrom: 'rgba(0, 106, 254, 0.16)', gradientTo: 'rgba(0, 106, 254, 0.04)' },
] as const;

// Every metric here is stated in the resume (data/career.ts). No decorative
// growth curves: a chart without data under a real number reads as data.
const impacts = [
  {
    number: '01',
    metric: 'Aug 2026',
    description: 'crypto futures taken from strategy to market',
    context: 'A new derivatives business line at KoinBX, with subscription-based membership pricing',
    company: 'KoinBX',
    icon: TrendingUp,
    size: 'large',
    accentColor: IMPACT_CARD_PALETTE[0].accent,
    gradientFrom: IMPACT_CARD_PALETTE[0].gradientFrom,
    gradientTo: IMPACT_CARD_PALETTE[0].gradientTo,
  },
  {
    number: '02',
    metric: '+42%',
    description: 'app user retention within 8 months',
    context: 'Stickiness rose 21% over the same period',
    company: 'BabyChakra',
    icon: Rocket,
    size: 'medium',
    accentColor: IMPACT_CARD_PALETTE[1].accent,
    gradientFrom: IMPACT_CARD_PALETTE[1].gradientFrom,
    gradientTo: IMPACT_CARD_PALETTE[1].gradientTo,
  },
  {
    number: '03',
    metric: '4',
    description: 'trading products led as Product Lead',
    context: 'DCX Insta, DCX Trade, DCX Margin and DCX Futures, on mobile app and desktop web',
    company: 'CoinDCX',
    icon: Target,
    size: 'medium',
    accentColor: IMPACT_CARD_PALETTE[2].accent,
    gradientFrom: IMPACT_CARD_PALETTE[2].gradientFrom,
    gradientTo: IMPACT_CARD_PALETTE[2].gradientTo,
  },
  {
    number: '04',
    metric: '~9×',
    description: 'delivery throughput in four months',
    context: 'After restructuring product and engineering at KoinBX and adopting AI-assisted engineering',
    company: 'KoinBX',
    icon: Bot,
    accentColor: IMPACT_CARD_PALETTE[3].accent,
    gradientFrom: IMPACT_CARD_PALETTE[3].gradientFrom,
    gradientTo: IMPACT_CARD_PALETTE[3].gradientTo,
  },
];


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
            Results I can put a number or a date to.
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
                    <span className="badge-company"><BrandName name={item.company} /></span>
                  </div>
                </div>

                {/* Main metric - THE HERO */}
                <div className="card-metric-section">
                  <div className="metric-container">
                    <CountUpMetric value={item.metric} className="impact-metric" />
                    <div className="metric-underline" />
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
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%);
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
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
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
          background: var(--surface-elevated);
          border: 1px solid var(--line-subtle);
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
          color: var(--content-primary);
          padding: 8px 14px;
          background: var(--surface-overlay);
          border: 1px solid var(--line-subtle);
          border-radius: var(--radius-full);
          transition: all 0.3s ease;
        }

        .impact-card:hover .badge-company {
          background: var(--surface-elevated);
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
          color: var(--content-primary);
          margin-bottom: var(--space-sm);
        }

        .impact-context {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--content-secondary);
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
