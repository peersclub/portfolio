'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Pencil, Palette, Wind, Feather, Camera,
  Users, Crown, Globe, Rocket, Briefcase,
  Trophy, Sparkles, GraduationCap, Zap,
  ArrowRight, MapPin,
  type LucideIcon,
} from 'lucide-react';
import Footer from '@/components/Footer/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

interface Moment {
  year: string;
  label: string;
  detail: string;
  icon: LucideIcon;
}

interface Chapter {
  numeral: string;
  title: string;
  years: string;
  color: string;
  description: string;
  moments: Moment[];
  quote: string;
  decoration: 'kite' | 'nodes' | 'chart' | 'neural';
  palette?: string[];
}

const chapters: Chapter[] = [
  {
    numeral: 'I',
    title: 'Childhood Craft',
    years: '1992 — 2010',
    color: '#00F0FF',
    description:
      'Where curiosity became craft. Drawing, painting, flying kites, calligraphy, and photography — each hobby quietly wiring the brain for product thinking.',
    moments: [
      { year: '1995', label: 'Visual Foundations', detail: 'Drawing — memorizing shapes, replicating reality', icon: Pencil },
      { year: '2002', label: 'Creative Analysis', detail: 'Painting — love for colors, attention to detailing', icon: Palette },
      { year: '2004', label: 'Adaptive Strategy', detail: 'Flying Kites — reading the wind, never giving up', icon: Wind },
      { year: '2007', label: 'Design Precision', detail: 'Calligraphy — typography & pattern recognition', icon: Feather },
      { year: '2010', label: 'Perspective Shift', detail: 'Photography — framing moments, composition', icon: Camera },
    ],
    quote: 'The line that became the roadmap.',
    decoration: 'kite',
    palette: ['#FF6B6B', '#FFB800', '#00F0FF', '#7B2FFF', '#10B981', '#F472B6'],
  },
  {
    numeral: 'II',
    title: 'The Emergence',
    years: '2011 — 2015',
    color: '#7B2FFF',
    description:
      'Skills finding each other. Team play, leadership at NITK Surathkal, organizing ENGINEER fest, and traveling shaped the mindset for building at scale.',
    moments: [
      { year: '2011', label: 'Synergy', detail: 'Team player — empathy, learning from others', icon: Users },
      { year: '2012', label: 'Orchestration', detail: 'Engineer Fest — guiding vision, taking ownership', icon: Crown },
      { year: '2013', label: 'NITK Surathkal', detail: 'B.Tech — building the engineering mindset', icon: GraduationCap },
      { year: '2014', label: 'Global Context', detail: 'Travelling — global mindset, cultural intelligence', icon: Globe },
    ],
    quote: "The conductor doesn't play an instrument — and that's the point.",
    decoration: 'nodes',
  },
  {
    numeral: 'III',
    title: 'Professional Rise',
    years: '2016 — 2024',
    color: '#FFB800',
    description:
      'The craft becoming a career. From first PM role to leading products at CoinDCX and CaptainFresh — building teams and products that scaled to millions.',
    moments: [
      { year: '2016', label: 'Product Strategy', detail: 'KleverKid — first PM role, user research', icon: Rocket },
      { year: '2017', label: 'Growth Engine', detail: 'Babychakra — 42% retention increase in 8 months', icon: Zap },
      { year: '2019', label: 'Scale & Impact', detail: "CoinDCX — India's largest crypto exchange, 1M+ users", icon: Briefcase },
      { year: '2021', label: 'Industry First', detail: 'CaptainFresh — supply chain platform from scratch', icon: Trophy },
    ],
    quote: 'Every user story started as a drawn one.',
    decoration: 'chart',
  },
  {
    numeral: 'IV',
    title: 'AI Frontier',
    years: '2024 — Present',
    color: '#FF0080',
    description:
      'All roads converge here. Co-founding Assetworks AI, building with Claude & GPT, leading product & tech at the highest level.',
    moments: [
      { year: '2024', label: 'SVP Product & Tech', detail: 'Cox & Kings — personalised travel experience', icon: Briefcase },
      { year: '2025', label: 'Co-Founder', detail: 'Assetworks AI — AI-powered financial analytics', icon: Sparkles },
      { year: 'Now', label: 'Future Systems', detail: 'LLM integration, AI strategy, what comes next', icon: Sparkles },
    ],
    quote: 'The canvas was always infinite. Now the brush thinks.',
    decoration: 'neural',
  },
];

const metricsData = [
  { value: 10, suffix: '+', label: 'Years Building Products' },
  { value: 6, suffix: '+', label: 'Companies Shaped' },
  { value: 1, suffix: 'M+', label: 'Users Impacted' },
  { value: 4, suffix: '', label: 'Products from Scratch' },
];

const philosophyText =
  'Life is a sequence of moments. Building products taught me to make each one count. From drawing lines as a child to architecting systems that serve millions — it has always been the same story told in different mediums.';

/* ═══════════════════════════════════════════════════════════════════════════
   DECORATIVE SVG COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function KiteDecoration({ color }: { color: string }) {
  return (
    <div className="ch-deco">
      <svg viewBox="0 0 140 200" fill="none" className="ch-deco-svg ch-deco-kite">
        <motion.path d="M70 8 L110 65 L70 130 L30 65 Z" stroke={color} strokeWidth="2" fill={`${color}10`}
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }} />
        <motion.line x1="70" y1="8" x2="70" y2="130" stroke={color} strokeWidth="1" opacity="0.3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
        <motion.line x1="30" y1="65" x2="110" y2="65" stroke={color} strokeWidth="1" opacity="0.3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7 }} />
        <motion.path d="M70 130 Q 62 148, 78 155 Q 90 162, 65 175 Q 50 183, 72 195"
          stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }} />
        {[{ cx: 62, cy: 148, r: 4 }, { cx: 78, cy: 162, r: 3.5 }, { cx: 65, cy: 178, r: 3 }, { cx: 72, cy: 195, r: 2.5 }].map((b, i) => (
          <motion.circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={color} opacity={0.3 - i * 0.05}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 + i * 0.2, type: 'spring', stiffness: 200 }} />
        ))}
        <motion.line x1="70" y1="65" x2="20" y2="190" stroke={color} strokeWidth="0.8" opacity="0.2" strokeDasharray="4 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3 }} />
      </svg>
    </div>
  );
}

function NodesDecoration({ color }: { color: string }) {
  const nodes = [{ x: 25, y: 25, r: 6 }, { x: 85, y: 15, r: 5 }, { x: 55, y: 55, r: 8 }, { x: 15, y: 85, r: 5 }, { x: 95, y: 70, r: 6 }, { x: 55, y: 110, r: 7 }];
  const lines: [number, number][] = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [0, 1]];
  return (
    <div className="ch-deco">
      <svg viewBox="0 0 120 130" fill="none" className="ch-deco-svg">
        {lines.map(([a, b], i) => (
          <motion.line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke={color} strokeWidth="1" opacity="0.2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: i * 0.15 }} />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <motion.circle cx={n.x} cy={n.y} r={n.r + 4} fill={color} opacity="0.06"
              initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ delay: 0.4 + i * 0.12, duration: 0.8 }} />
            <motion.circle cx={n.x} cy={n.y} r={n.r} fill={`${color}20`} stroke={color} strokeWidth="1.5"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.12, type: 'spring', stiffness: 180 }} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function ChartDecoration({ color }: { color: string }) {
  return (
    <div className="ch-deco">
      <svg viewBox="0 0 130 110" fill="none" className="ch-deco-svg">
        {[22, 38, 30, 58, 80].map((h, i) => (
          <motion.rect key={i} x={i * 24 + 8} y={100 - h} width="16" height={h} rx="4"
            fill={`${color}18`} stroke={color} strokeWidth="1"
            initial={{ height: 0, y: 100 }} animate={{ height: h, y: 100 - h }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: 'backOut' }} />
        ))}
        <motion.path d="M16 78 L40 62 L64 70 L88 42 L112 20" stroke={color} strokeWidth="2.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.5 }} />
        <motion.circle cx="112" cy="20" r="4" fill={color}
          initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ delay: 2 }} />
      </svg>
    </div>
  );
}

function NeuralDecoration({ color }: { color: string }) {
  const layers = [[{ y: 30 }, { y: 60 }, { y: 90 }], [{ y: 20 }, { y: 45 }, { y: 70 }, { y: 95 }], [{ y: 40 }, { y: 75 }]];
  return (
    <div className="ch-deco">
      <svg viewBox="0 0 130 120" fill="none" className="ch-deco-svg">
        {layers.map((layer, li) => {
          const x = 20 + li * 45;
          const next = layers[li + 1];
          return layer.map((node, ni) => (
            <g key={`${li}-${ni}`}>
              {next?.map((n2, nj) => (
                <motion.line key={`l-${nj}`} x1={x} y1={node.y} x2={x + 45} y2={n2.y}
                  stroke={color} strokeWidth="0.8" opacity="0.15"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: li * 0.25 + ni * 0.08 }} />
              ))}
              <motion.circle cx={x} cy={node.y} r="6" fill={`${color}20`} stroke={color} strokeWidth="1.5"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: li * 0.25 + ni * 0.1, type: 'spring' }} />
              <motion.circle cx={x} cy={node.y} r="2.5" fill={color} opacity="0.6"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: li * 0.3 + ni * 0.15 + 0.5 }} />
            </g>
          ));
        })}
      </svg>
    </div>
  );
}

const decoMap = { kite: KiteDecoration, nodes: NodesDecoration, chart: ChartDecoration, neural: NeuralDecoration };

/* ═══════════════════════════════════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function FloatingParticles({ color, count = 8 }: { color: string; count?: number }) {
  return (
    <div className="fp-wrap">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="fp-dot" style={{
          '--px': `${10 + Math.random() * 80}%`, '--py': `${10 + Math.random() * 80}%`,
          '--ps': `${2 + Math.random() * 4}px`, '--pd': `${4 + Math.random() * 6}s`,
          '--pdel': `${Math.random() * 4}s`, background: color,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}

function ColorPalette({ colors }: { colors: string[] }) {
  return (
    <div className="cpal">
      {colors.map((c, i) => (
        <motion.span key={i} className="cpal-dot" style={{ background: c }}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.07, type: 'spring', stiffness: 220 }}
          whileHover={{ scale: 1.5, y: -6 }} />
      ))}
    </div>
  );
}

function useCountUp(end: number, dur = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const start = useCallback(() => {
    if (started) return;
    setStarted(true);
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, dur, started]);
  return { count, start };
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function MyLifePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLElement>(null);
  const chWrapRef = useRef<HTMLDivElement>(null);
  const chTrackRef = useRef<HTMLDivElement>(null);
  const philRef = useRef<HTMLElement>(null);
  const metRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLElement>(null);
  const gsapCtx = useRef<gsap.Context | null>(null);

  const [mounted, setMounted] = useState(false);
  const [activeCh, setActiveCh] = useState(0);

  const m0 = useCountUp(metricsData[0].value);
  const m1 = useCountUp(metricsData[1].value);
  const m2 = useCountUp(metricsData[2].value);
  const m3 = useCountUp(metricsData[3].value);
  const mArr = [m0, m1, m2, m3];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    let dead = false;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (dead || !containerRef.current) return;

        gsapCtx.current = gsap.context(() => {

          /* ── 1. HERO — sticky + scrub (NO pin) ── */
          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroWrapRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
          heroTl
            .to('.ml-hero-title', { scale: 3, opacity: 0, duration: 1 })
            .to('.ml-hero-orb', { scale: 2, opacity: 0, duration: 1 }, 0)
            .to('.ml-hero-grid', { opacity: 0, duration: 0.4 }, 0)
            .fromTo('.ml-hero-sub', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3 }, 0.15)
            .to('.ml-hero-sub', { opacity: 0, y: -40, duration: 0.2 }, 0.65)
            .to('.ml-hero-scroll', { opacity: 0, duration: 0.1 }, 0);

          /* ── 2. ORIGIN — staggered line reveal ── */
          gsap.from('.ml-origin-line', {
            opacity: 0,
            y: 100,
            rotateX: 50,
            stagger: 0.2,
            scrollTrigger: {
              trigger: originRef.current,
              start: 'top 75%',
              end: 'center center',
              scrub: 1,
            },
          });

          /* ── 3. CHAPTERS — sticky + horizontal scrub (NO pin) ── */
          if (chTrackRef.current && chWrapRef.current) {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const totalW = chTrackRef.current.scrollWidth;
            const dist = totalW - vw;
            // Set wrapper height so 1px vertical scroll ≈ 1px horizontal movement
            chWrapRef.current.style.height = `${dist + vh}px`;

            gsap.to(chTrackRef.current, {
              x: -dist,
              ease: 'none',
              scrollTrigger: {
                trigger: chWrapRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  setActiveCh(Math.min(
                    Math.floor(self.progress * chapters.length),
                    chapters.length - 1,
                  ));
                },
              },
            });
          }

          /* ── 4. PHILOSOPHY — word reveal ── */
          const words = gsap.utils.toArray<HTMLElement>('.ml-pw');
          if (words.length) {
            gsap.set(words, { opacity: 0.08 });
            gsap.to(words, {
              opacity: 1,
              stagger: { each: 0.04 },
              scrollTrigger: {
                trigger: philRef.current,
                start: 'top 65%',
                end: 'center 35%',
                scrub: 1,
              },
            });
          }

          /* ── 5. METRICS ── */
          ScrollTrigger.create({
            trigger: metRef.current,
            start: 'top 75%',
            once: true,
            onEnter: () => mArr.forEach((h) => h.start()),
          });
          gsap.from('.ml-mc', {
            opacity: 0, y: 80, scale: 0.85, stagger: 0.12, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: metRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          });

          /* ── 6. CLOSING ── */
          gsap.from('.ml-cl-inner', {
            opacity: 0, scale: 0.8, y: 80, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: closeRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
          });

          ScrollTrigger.refresh();
        }, containerRef);
      });
    });

    return () => {
      dead = true;
      gsapCtx.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const philWords = philosophyText.split(' ');

  /* ═══════════════════════════════════════════════════════════════════════
     JSX
     ═══════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <div ref={containerRef} className={`ml-page${mounted ? ' ml-ready' : ''}`}>

        {/* ════════════ HERO (tall wrapper + sticky inner) ════════════ */}
        <div ref={heroWrapRef} className="ml-hero-wrap">
          <div className="ml-hero-sticky">
            <div className="ml-hero-grid" />
            <div className="ml-hero-orb" />
            <div className="ml-hero-orb ml-hero-orb2" />
            <h1 className="ml-hero-title">My Life</h1>
            <p className="ml-hero-sub">A story of curiosity, craft, and building things that matter</p>
            <div className="ml-hero-scroll">
              <span className="ml-scroll-lbl">Scroll to explore</span>
              <div className="ml-scroll-line"><div className="ml-scroll-dot" /></div>
            </div>
          </div>
        </div>

        {/* ════════════ ORIGIN ════════════ */}
        <section ref={originRef} className="ml-origin">
          <div className="ml-origin-pin"><MapPin size={20} /></div>
          <div className="ml-origin-content">
            <div className="ml-origin-line"><span className="ml-accent-text">Born in Bangalore.</span></div>
            <div className="ml-origin-line"><span>Raised on curiosity</span></div>
            <div className="ml-origin-line"><span>and the belief that</span></div>
            <div className="ml-origin-line"><span className="ml-accent-text">every craft connects.</span></div>
          </div>
        </section>

        {/* ════════════ CHAPTERS (tall wrapper + sticky inner) ════════════ */}
        <div ref={chWrapRef} className="ml-ch-wrap">
          <div className="ml-ch-sticky">
            <div ref={chTrackRef} className="ml-ch-track">
              {chapters.map((ch, i) => {
                const Deco = decoMap[ch.decoration];
                return (
                  <div key={i} className="ch-card" style={{ '--ch': ch.color } as React.CSSProperties}>
                    {/* Decoration — absolute positioned top-right */}
                    <div className="ch-deco-float"><Deco color={ch.color} /></div>

                    {/* Floating particles behind card */}
                    <FloatingParticles color={ch.color} count={5} />

                    <div className="ch-inner">
                      <div className="ch-hdr">
                        <span className="ch-badge">Chapter {ch.numeral}</span>
                        <span className="ch-years">{ch.years}</span>
                      </div>

                      <h2 className="ch-title">{ch.title}</h2>
                      <p className="ch-desc">{ch.description}</p>

                      <div className="ch-moments">
                        {ch.moments.map((m, j) => {
                          const Ic = m.icon;
                          return (
                            <motion.div key={j} className="ch-moment"
                              whileHover={{ x: 8, transition: { duration: 0.2 } }}>
                              <div className="m-icon"><Ic size={16} strokeWidth={2} /></div>
                              <span className="m-year">{m.year}</span>
                              <div className="m-txt">
                                <span className="m-lbl">{m.label}</span>
                                <span className="m-dtl">{m.detail}</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <blockquote className="ch-quote">&ldquo;{ch.quote}&rdquo;</blockquote>
                      {ch.palette && <ColorPalette colors={ch.palette} />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress dots */}
            <div className="ch-prog">
              {chapters.map((ch, i) => (
                <motion.span key={i}
                  className={`ch-prog-dot${activeCh === i ? ' active' : ''}`}
                  style={{ '--ch': ch.color } as React.CSSProperties}
                  animate={{ scale: activeCh === i ? 1 : 0.6, opacity: activeCh === i ? 1 : 0.3 }}
                  transition={{ duration: 0.3 }} />
              ))}
            </div>
          </div>
        </div>

        {/* ════════════ PHILOSOPHY ════════════ */}
        <section ref={philRef} className="ml-phil">
          <div className="ml-phil-inner">
            <span className="ml-phil-lbl">Philosophy</span>
            <p className="ml-phil-txt">
              {philWords.map((w, i) => <span key={i} className="ml-pw">{w} </span>)}
            </p>
          </div>
        </section>

        {/* ════════════ METRICS ════════════ */}
        <section ref={metRef} className="ml-met">
          <div className="ml-met-grid">
            {metricsData.map((m, i) => (
              <motion.div key={i} className="ml-mc"
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.25 } }}>
                <div className="mc-glow" />
                <span className="mc-val">{mArr[i].count}{m.suffix}</span>
                <span className="mc-lbl">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════ CLOSING ════════════ */}
        <section ref={closeRef} className="ml-cl">
          <div className="ml-cl-orb" />
          <div className="ml-cl-inner">
            <p className="ml-cl-q">&ldquo;The canvas was always infinite.<br />Now the brush thinks.&rdquo;</p>
            <motion.a href="/contact" className="ml-cl-cta"
              whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
              Let&apos;s build something <ArrowRight size={18} />
            </motion.a>
          </div>
        </section>
      </div>

      <Footer />

      {/* ═══════════════════════════════════════════════════════════════════
          STYLES
          ═══════════════════════════════════════════════════════════════════ */}
      <style jsx>{`
        .ml-page { opacity: 0; transition: opacity 0.6s ease; }
        .ml-page.ml-ready { opacity: 1; }

        /* ══════ HERO ══════ */
        .ml-hero-wrap {
          position: relative;
          height: 250vh;                /* tall wrapper = scroll room */
        }

        .ml-hero-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .ml-hero-grid {
          position: absolute; inset: 0;
          opacity: 0.12;
          background-image:
            linear-gradient(to right, var(--line-subtle) 1px, transparent 1px),
            linear-gradient(to bottom, var(--line-subtle) 1px, transparent 1px);
          background-size: calc(100%/12) 80px;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%);
          will-change: opacity;
        }

        .ml-hero-orb {
          position: absolute; top: 30%; left: 50%;
          transform: translate(-50%,-50%);
          width: 550px; height: 550px;
          background: radial-gradient(circle, var(--accent-subtle) 0%, transparent 65%);
          pointer-events: none; will-change: transform, opacity;
        }
        .ml-hero-orb2 {
          top: 55%; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(118,75,162,0.15) 0%, transparent 65%);
        }

        .ml-hero-title {
          position: relative; z-index: 2;
          font-family: var(--font-heading);
          font-size: clamp(5rem, 18vw, 14rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          text-transform: none !important;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          will-change: transform, opacity;
        }

        .ml-hero-sub {
          position: relative; z-index: 2;
          font-size: clamp(1.1rem, 2.5vw, 1.75rem);
          color: var(--content-secondary);
          max-width: 600px !important;
          text-align: center; line-height: 1.6;
          margin-top: var(--space-xl);
          opacity: 0; will-change: transform, opacity;
        }

        .ml-hero-scroll {
          position: absolute; bottom: var(--space-3xl);
          display: flex; flex-direction: column; align-items: center;
          gap: var(--space-md); z-index: 2;
        }
        .ml-scroll-lbl {
          font-family: var(--font-mono); font-size: 0.6875rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--content-muted);
        }
        .ml-scroll-line { width: 1px; height: 60px; background: var(--line-default); position: relative; }
        .ml-scroll-dot {
          position: absolute; top: 0; left: -2px;
          width: 5px; height: 5px;
          background: var(--accent-solid); border-radius: 50%;
          animation: mlsd 2s ease-in-out infinite;
        }
        @keyframes mlsd { 0%,100%{top:0;opacity:1} 80%{top:55px;opacity:0} }

        /* ══════ ORIGIN ══════ */
        .ml-origin {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: var(--space-4xl) var(--space-xl);
          position: relative;
        }
        .ml-origin-pin {
          position: absolute; top: 15%;
          color: var(--accent-solid); opacity: 0.5;
          animation: pinb 2s ease-in-out infinite;
        }
        @keyframes pinb { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .ml-origin-content { max-width: 900px; }
        .ml-origin-line { overflow: hidden; perspective: 800px; }
        .ml-origin-line span {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 7vw, 5.5rem);
          font-weight: 700; line-height: 1.25;
          color: var(--content-primary);
          letter-spacing: -0.03em;
          text-transform: none !important;
          max-width: none !important;
        }
        .ml-accent-text {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ══════ CHAPTERS ══════ */
        .ml-ch-wrap {
          position: relative;
          /* height set dynamically in JS based on track scrollWidth */
        }

        .ml-ch-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .ml-ch-track {
          display: flex;
          gap: 32px;
          /* center each 340px card in the viewport */
          padding: 0 calc(50vw - 170px);
          height: auto;
          align-items: center;
          will-change: transform;
        }

        .ch-card {
          flex: 0 0 340px;
          width: 340px;
          position: relative;
          background: var(--surface-primary);
          border: 1px solid var(--line-subtle);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
        }
        .ch-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 24px 60px color-mix(in srgb, var(--ch) 20%, transparent);
        }
        .ch-card:hover {
          border-color: color-mix(in srgb, var(--ch) 40%, transparent);
        }

        /* Decoration — floated top-right inside the card */
        .ch-deco-float {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 80px;
          height: 95px;
          opacity: 0.25;
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.3s;
        }
        .ch-card:hover .ch-deco-float { opacity: 0.45; }
        .ch-deco-float :global(.ch-deco-svg) { width: 100%; height: 100%; }
        .ch-deco-float :global(.ch-deco-kite) { animation: kf 4s ease-in-out infinite; }
        @keyframes kf {
          0%,100%{transform:translateY(0) rotate(0deg)}
          25%{transform:translateY(-6px) rotate(2deg)}
          75%{transform:translateY(3px) rotate(-1deg)}
        }

        /* Floating particles */
        .fp-wrap { position: absolute; inset: 0; pointer-events: none; overflow: hidden; border-radius: 24px; }
        .fp-dot {
          position: absolute; left: var(--px); top: var(--py);
          width: var(--ps); height: var(--ps);
          border-radius: 50%; opacity: 0.2;
          animation: fpf var(--pd) ease-in-out var(--pdel) infinite;
        }
        @keyframes fpf {
          0%,100%{transform:translateY(0) scale(1);opacity:0.2}
          50%{transform:translateY(-15px) scale(1.3);opacity:0.45}
        }

        /* Card glow border on hover */
        .ch-card::before {
          content: '';
          position: absolute; inset: -1px;
          border-radius: 25px;
          background: linear-gradient(135deg, color-mix(in srgb, var(--ch) 40%, transparent), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
          z-index: -1;
        }
        .ch-card:hover::before { opacity: 1; }

        .ch-inner {
          position: relative; z-index: 2;
          padding: 20px 20px 16px;
        }

        .ch-hdr { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .ch-badge {
          font-family: var(--font-mono); font-size: 0.6rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ch); padding: 3px 10px;
          border: 1px solid var(--ch); border-radius: var(--radius-full);
          transition: background 0.3s;
        }
        .ch-badge:hover { background: color-mix(in srgb, var(--ch) 12%, transparent); }
        .ch-years { font-family: var(--font-mono); font-size: 0.6rem; color: var(--content-muted); letter-spacing: 0.1em; }

        .ch-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800; color: var(--content-primary);
          letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: 6px;
          text-transform: none !important;
        }
        .ch-desc {
          font-size: 0.75rem; color: var(--content-secondary);
          line-height: 1.55; max-width: none !important;
          margin-bottom: 14px;
        }

        /* Moments */
        .ch-moments { display: flex; flex-direction: column; gap: 1px; margin-bottom: 12px; }
        .ch-moment {
          display: flex; align-items: center; gap: 8px;
          padding: 5px 6px; border-radius: 7px;
          cursor: default; transition: background 0.2s;
        }
        .ch-moment:hover { background: color-mix(in srgb, var(--ch) 8%, transparent); }

        .m-icon {
          display: flex; align-items: center; justify-content: center;
          width: 24px; height: 24px; border-radius: 6px;
          background: color-mix(in srgb, var(--ch) 15%, transparent);
          color: var(--ch); flex-shrink: 0;
          transition: transform 0.2s, background 0.2s;
        }
        .ch-moment:hover .m-icon {
          transform: scale(1.15) rotate(-5deg);
          background: color-mix(in srgb, var(--ch) 25%, transparent);
        }

        .m-year { font-family: var(--font-mono); font-size: 0.58rem; font-weight: 600; color: var(--ch); min-width: 28px; flex-shrink: 0; }
        .m-txt { display: flex; flex-direction: column; gap: 0; min-width: 0; }
        .m-lbl { font-weight: 600; font-size: 0.75rem; color: var(--content-primary); white-space: nowrap; }
        .m-dtl { font-size: 0.65rem; color: var(--content-tertiary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .ch-quote {
          font-size: 0.72rem; font-style: italic;
          color: var(--ch); opacity: 0.7;
          padding-left: 10px;
          border-left: 2px solid var(--ch);
          margin-bottom: 10px;
          max-width: none !important;
        }

        /* Color palette */
        .cpal { display: flex; gap: 5px; align-items: center; }
        .cpal-dot {
          width: 12px; height: 12px; border-radius: 50%; cursor: pointer;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.08);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .cpal-dot:hover { box-shadow: 0 0 10px currentColor; transform: scale(1.3); }

        /* Progress dots */
        .ch-prog {
          position: absolute; bottom: var(--space-lg); left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 10px; z-index: 20;
        }
        .ch-prog-dot {
          width: 10px; height: 10px; border-radius: 50%;
          border: 2px solid var(--ch); background: transparent;
          padding: 0; cursor: default;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .ch-prog-dot.active {
          background: var(--ch);
          box-shadow: 0 0 12px color-mix(in srgb, var(--ch) 50%, transparent);
        }

        /* ══════ PHILOSOPHY ══════ */
        .ml-phil {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: var(--space-5xl) var(--space-xl);
        }
        .ml-phil-inner { max-width: 850px; text-align: center; }
        .ml-phil-lbl {
          font-family: var(--font-mono); font-size: 0.75rem;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--accent-solid);
          display: inline-block; margin-bottom: var(--space-3xl);
          padding: 8px 20px;
          border: 1px solid var(--accent-border); border-radius: var(--radius-full);
        }
        .ml-phil-txt {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 3.8vw, 2.5rem);
          font-weight: 500; line-height: 1.6;
          color: var(--content-primary); letter-spacing: -0.01em;
          max-width: none !important;
        }
        .ml-pw { display: inline; will-change: opacity; }

        /* ══════ METRICS ══════ */
        .ml-met { padding: var(--space-5xl) var(--space-xl); }
        .ml-met-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: var(--space-xl); max-width: 1100px; margin: 0 auto;
        }
        .ml-mc {
          position: relative;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          padding: var(--space-3xl) var(--space-xl);
          background: var(--surface-primary);
          border: 1px solid var(--line-subtle);
          border-radius: 24px; overflow: hidden; cursor: default;
          transition: border-color 0.3s;
        }
        .ml-mc:hover { border-color: var(--accent-border); }
        .mc-glow {
          position: absolute; top: -50%; left: 50%; transform: translateX(-50%);
          width: 200px; height: 200px;
          background: radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.4s; pointer-events: none;
        }
        .ml-mc:hover .mc-glow { opacity: 1; }
        .mc-val {
          position: relative;
          font-family: var(--font-heading);
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 800; letter-spacing: -0.04em;
          background: var(--accent-gradient);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1; margin-bottom: var(--space-md);
        }
        .mc-lbl { font-size: 0.85rem; color: var(--content-secondary); max-width: none !important; }

        /* ══════ CLOSING ══════ */
        .ml-cl {
          min-height: 80vh;
          display: flex; align-items: center; justify-content: center;
          padding: var(--space-5xl) var(--space-xl);
          position: relative;
        }
        .ml-cl-orb {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 500px; height: 500px;
          background: radial-gradient(circle, var(--accent-subtle) 0%, transparent 65%);
          pointer-events: none; animation: orbf 10s ease-in-out infinite;
        }
        @keyframes orbf {
          0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.6}
          50%{transform:translate(-50%,-50%) scale(1.15);opacity:1}
        }
        .ml-cl-inner { text-align: center; position: relative; z-index: 2; }
        .ml-cl-q {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 3.75rem);
          font-weight: 700; color: var(--content-primary);
          line-height: 1.3; letter-spacing: -0.03em;
          margin-bottom: var(--space-3xl);
          max-width: none !important;
          text-transform: none !important;
        }
        .ml-cl-cta {
          display: inline-flex; align-items: center; gap: var(--space-sm);
          font-family: var(--font-mono); font-size: 0.85rem; font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--surface-root);
          background: var(--accent-gradient);
          padding: 16px 40px; border-radius: var(--radius-full);
          text-decoration: none;
          box-shadow: 0 4px 24px var(--accent-subtle);
          transition: box-shadow 0.3s;
        }
        .ml-cl-cta:hover { box-shadow: 0 8px 40px var(--accent-border); }

        /* ══════ RESPONSIVE ══════ */
        @media (max-width: 1024px) {
          .ml-met-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ml-hero-title { font-size: clamp(3.5rem, 16vw, 7rem); }
          .ml-origin-line span { font-size: clamp(1.8rem, 6vw, 3rem); }
          .ch-card { flex: 0 0 300px; width: 300px; }
          .ml-ch-track { padding: 0 calc(50vw - 150px); }
          .ch-title { font-size: 1.3rem; }
          .m-dtl { display: none; }
          .ml-met-grid { gap: var(--space-md); }
          .ml-mc { padding: var(--space-2xl) var(--space-md); }
          .mc-val { font-size: clamp(2.5rem, 8vw, 3.5rem); }
          .ml-phil-txt { font-size: clamp(1.2rem, 3.5vw, 1.8rem); }
          .ml-cl-q { font-size: clamp(1.5rem, 4.5vw, 2.5rem); }
        }
        @media (max-width: 480px) {
          .ml-met-grid { grid-template-columns: 1fr; }
          .ch-card { flex: 0 0 80vw; width: 80vw; }
          .ml-ch-track { padding: 0 10vw; }
          .ch-deco-float { display: none; }
        }
      `}</style>
    </>
  );
}
