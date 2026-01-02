'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface UseGSAPScrollOptions {
    /** Enable debug markers */
    debug?: boolean;
}

/**
 * Custom hook to set up GSAP ScrollTrigger with Lenis smooth scroll.
 * Call this once in the root layout or in components that need scroll animations.
 */
export function useGSAPScrollSetup(options: UseGSAPScrollOptions = {}) {
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        // Configure ScrollTrigger defaults
        ScrollTrigger.defaults({
            markers: options.debug ?? false,
            toggleActions: 'play none none reverse',
        });

        // Refresh ScrollTrigger after fonts/images load
        const handleLoad = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('load', handleLoad);

        // Clean up on unmount
        return () => {
            window.removeEventListener('load', handleLoad);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [options.debug]);
}

/**
 * Creates a staggered reveal animation for a set of elements.
 */
export function createStaggerReveal(
    containerSelector: string,
    itemSelector: string,
    options: {
        start?: string;
        end?: string;
        stagger?: number;
        duration?: number;
    } = {}
) {
    const {
        start = 'top 80%',
        end = 'bottom 20%',
        stagger = 0.15,
        duration = 0.8,
    } = options;

    const container = document.querySelector(containerSelector);
    if (!container) return null;

    const items = container.querySelectorAll(itemSelector);
    if (!items.length) return null;

    // Set initial state
    gsap.set(items, {
        opacity: 0,
        y: 60,
        scale: 0.95,
    });

    // Create ScrollTrigger animation
    return ScrollTrigger.create({
        trigger: container,
        start,
        end,
        onEnter: () => {
            gsap.to(items, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration,
                stagger,
                ease: 'power3.out',
            });
        },
        onLeaveBack: () => {
            gsap.to(items, {
                opacity: 0,
                y: 60,
                scale: 0.95,
                duration: duration * 0.5,
                stagger: stagger * 0.5,
                ease: 'power2.in',
            });
        },
    });
}

/**
 * Creates a parallax effect on an element based on scroll.
 */
export function createParallax(
    elementSelector: string,
    options: {
        speed?: number; // -1 to 1, negative = opposite direction
        start?: string;
        end?: string;
    } = {}
) {
    const { speed = 0.3, start = 'top bottom', end = 'bottom top' } = options;

    const element = document.querySelector(elementSelector);
    if (!element) return null;

    return gsap.to(element, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub: true,
        },
    });
}
