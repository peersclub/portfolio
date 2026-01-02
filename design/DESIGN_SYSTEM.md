# 🎨 SURESH VICTOR — Design System

> A pixel-perfect, Apple/Stripe-tier design language for a world-class portfolio.

---

## 🎯 Design Philosophy

**"Technical elegance meets emotional resonance."**

Every pixel serves a purpose. Every animation tells a story. Every interaction feels inevitable.

---

## 📐 Foundation

### Color Tokens

```css
/* Primary Palette */
--bg-void:        #0a0a0f;      /* Pure void - deepest black */
--bg-primary:     #0d0d12;      /* Canvas */
--bg-elevated:    #13131a;      /* Cards, modals */
--bg-glass:       rgba(255, 255, 255, 0.03);

/* Accent - The Signature Gold */
--accent:         #E8C547;      /* Primary gold */
--accent-dim:     rgba(232, 197, 71, 0.6);
--accent-glow:    rgba(232, 197, 71, 0.15);

/* Text Hierarchy */
--text-primary:   #FAFAFA;      /* Headlines */
--text-secondary: #A1A1AA;      /* Body */
--text-muted:     #52525B;      /* Captions */

/* Semantic */
--success:        #10B981;
--warning:        #F59E0B;
--error:          #EF4444;
```

### Typography Scale

```css
/* Font Families */
--font-heading:   'Inter', system-ui, sans-serif;
--font-body:      'Inter', system-ui, sans-serif;
--font-mono:      'JetBrains Mono', 'Fira Code', monospace;

/* Scale (Perfect Fourth - 1.333) */
--text-xs:        0.75rem;    /* 12px */
--text-sm:        0.875rem;   /* 14px */
--text-base:      1rem;       /* 16px */
--text-lg:        1.333rem;   /* 21px */
--text-xl:        1.777rem;   /* 28px */
--text-2xl:       2.369rem;   /* 38px */
--text-3xl:       3.157rem;   /* 50px */
--text-4xl:       4.209rem;   /* 67px */
--text-hero:      clamp(4rem, 12vw, 8rem);
```

### Spacing System

```css
/* 8px base unit */
--space-1:   0.25rem;   /* 4px */
--space-2:   0.5rem;    /* 8px */
--space-3:   0.75rem;   /* 12px */
--space-4:   1rem;      /* 16px */
--space-6:   1.5rem;    /* 24px */
--space-8:   2rem;      /* 32px */
--space-12:  3rem;      /* 48px */
--space-16:  4rem;      /* 64px */
--space-24:  6rem;      /* 96px */
--space-32:  8rem;      /* 128px */
```

---

## ✨ Motion Language

### Timing Functions

```css
/* Signature Curves */
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);     /* Primary - snappy exit */
--ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1);   /* Transitions */
--ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful bounce */
```

### Duration Scale

```css
--duration-instant:   100ms;   /* Micro-interactions */
--duration-fast:      200ms;   /* Hovers, toggles */
--duration-normal:    400ms;   /* Page transitions */
--duration-slow:      800ms;   /* Hero reveals */
--duration-slower:    1200ms;  /* Orchestrated sequences */
```

### Stagger Pattern

```css
/* Stagger for lists/grids */
--stagger-delay: 60ms;
/* index * var(--stagger-delay) */
```

---

## 🌟 Interaction Patterns

### 1. Magnetic Elements
Elements subtly gravitate toward cursor before interaction.

### 2. Liquid Hover
Content warps/ripples on hover like disturbed water.

### 3. Parallax Depth
Multi-layer depth with different scroll velocities.

### 4. Text Reveal
Characters/words animate in with stagger and subtle blur.

### 5. Glow States
Accent color radiates on focus/active states.

---

## 📱 Responsive Breakpoints

```css
--bp-sm:   640px;   /* Mobile landscape */
--bp-md:   768px;   /* Tablet portrait */
--bp-lg:   1024px;  /* Tablet landscape */
--bp-xl:   1280px;  /* Desktop */
--bp-2xl:  1536px;  /* Large desktop */
```

---

## 🏗️ Component Tokens

### Cards

```css
--card-radius:     16px;
--card-padding:    var(--space-6);
--card-border:     1px solid rgba(255, 255, 255, 0.06);
--card-shadow:     0 4px 24px rgba(0, 0, 0, 0.3);
```

### Buttons

```css
--btn-height:      48px;
--btn-radius:      8px;
--btn-padding:     0 var(--space-6);
```

### Glass Effect

```css
--glass-bg:        rgba(255, 255, 255, 0.03);
--glass-border:    rgba(255, 255, 255, 0.08);
--glass-blur:      16px;
```

---

## ✅ Quality Checklist

Before shipping any page:

- [ ] 60fps animations (no dropped frames)
- [ ] Touch targets ≥ 44px
- [ ] Color contrast ≥ 4.5:1
- [ ] Focus states visible
- [ ] Reduced motion respected
- [ ] No layout shift on load
- [ ] Images optimized (WebP)
- [ ] Fonts subset loaded
