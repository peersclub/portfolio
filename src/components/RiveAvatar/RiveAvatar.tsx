'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRive, Layout, Fit, Alignment, useStateMachineInput } from '@rive-app/react-canvas';

interface RiveAvatarProps {
    size?: number;
    className?: string;
}

/**
 * Interactive Rive Avatar Component
 * 
 * Since we don't have a custom .riv file, this creates a CSS-based
 * interactive avatar with the same principles - it tracks cursor
 * and responds to interactions. When you have a real .riv file,
 * replace the fallback with the Rive canvas.
 */
export default function RiveAvatar({ size = 200, className = '' }: RiveAvatarProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [blinkState, setBlinkState] = useState(false);

    // Track mouse position relative to avatar center
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate angle and distance from center
        const deltaX = (e.clientX - centerX) / 500;
        const deltaY = (e.clientY - centerY) / 500;

        // Clamp values
        setMousePosition({
            x: Math.max(-1, Math.min(1, deltaX)),
            y: Math.max(-1, Math.min(1, deltaY)),
        });
    }, []);

    // Random blinking
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setBlinkState(true);
            setTimeout(() => setBlinkState(false), 150);
        }, 3000 + Math.random() * 2000);

        return () => clearInterval(blinkInterval);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 800);
    };

    // Eye position based on mouse
    const eyeOffset = {
        x: mousePosition.x * 8,
        y: mousePosition.y * 5,
    };

    return (
        <div
            ref={containerRef}
            className={`rive-avatar-container ${className}`}
            style={{ width: size, height: size }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {/* Avatar Face - Interactive CSS Avatar */}
            <div className="avatar-face">
                {/* Glow Effect */}
                <div className="avatar-glow" />

                {/* Face Circle */}
                <div className="face-circle">
                    {/* Eyes Container */}
                    <div className="eyes-container">
                        {/* Left Eye */}
                        <div className={`eye ${blinkState ? 'blink' : ''} ${isClicked ? 'wink-left' : ''}`}>
                            <div
                                className="pupil"
                                style={{
                                    transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                                }}
                            />
                        </div>

                        {/* Right Eye */}
                        <div className={`eye ${blinkState ? 'blink' : ''}`}>
                            <div
                                className="pupil"
                                style={{
                                    transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Mouth */}
                    <div className={`mouth ${isHovered ? 'smile' : ''} ${isClicked ? 'open' : ''}`} />

                    {/* Blush on hover */}
                    <div className={`blush blush-left ${isHovered ? 'visible' : ''}`} />
                    <div className={`blush blush-right ${isHovered ? 'visible' : ''}`} />
                </div>

                {/* Wave Hand (appears on click) */}
                <div className={`wave-hand ${isClicked ? 'waving' : ''}`}>
                    👋
                </div>
            </div>

            <style jsx>{`
                .rive-avatar-container {
                    position: relative;
                    cursor: pointer;
                    user-select: none;
                }

                .avatar-face {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .avatar-glow {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
                    opacity: ${isHovered ? 0.3 : 0.1};
                    transition: opacity 0.3s ease;
                    animation: pulse 3s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: ${isHovered ? 0.3 : 0.1}; }
                    50% { transform: scale(1.05); opacity: ${isHovered ? 0.4 : 0.15}; }
                }

                .face-circle {
                    width: 80%;
                    height: 80%;
                    border-radius: 50%;
                    background: linear-gradient(145deg, var(--bg-secondary), var(--bg-primary));
                    border: 2px solid var(--glass-border);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    transition: transform 0.3s ease, border-color 0.3s ease;
                    transform: ${isHovered ? 'scale(1.05)' : 'scale(1)'};
                    border-color: ${isHovered ? 'var(--accent)' : 'var(--glass-border)'};
                }

                .eyes-container {
                    display: flex;
                    gap: 20%;
                    margin-bottom: 10%;
                }

                .eye {
                    width: ${size * 0.15}px;
                    height: ${size * 0.15}px;
                    background: white;
                    border-radius: 50%;
                    position: relative;
                    transition: transform 0.15s ease;
                    overflow: hidden;
                }

                .eye.blink {
                    transform: scaleY(0.1);
                }

                .eye.wink-left {
                    transform: scaleY(0.1);
                }

                .pupil {
                    width: 50%;
                    height: 50%;
                    background: #1a1a2e;
                    border-radius: 50%;
                    position: absolute;
                    top: 25%;
                    left: 25%;
                    transition: transform 0.1s ease-out;
                }

                .pupil::after {
                    content: '';
                    position: absolute;
                    width: 30%;
                    height: 30%;
                    background: white;
                    border-radius: 50%;
                    top: 10%;
                    right: 10%;
                }

                .mouth {
                    width: 30%;
                    height: 8%;
                    background: transparent;
                    border-bottom: 3px solid var(--text-secondary);
                    border-radius: 0 0 50% 50%;
                    transition: all 0.3s ease;
                }

                .mouth.smile {
                    height: 12%;
                    border-bottom-width: 4px;
                    border-color: var(--accent);
                }

                .mouth.open {
                    width: 20%;
                    height: 15%;
                    background: var(--text-primary);
                    border: none;
                    border-radius: 50%;
                }

                .blush {
                    position: absolute;
                    width: 15%;
                    height: 8%;
                    background: rgba(255, 100, 100, 0.5);
                    border-radius: 50%;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    top: 55%;
                }

                .blush.visible {
                    opacity: 1;
                }

                .blush-left {
                    left: 15%;
                }

                .blush-right {
                    right: 15%;
                }

                .wave-hand {
                    position: absolute;
                    right: -10%;
                    bottom: 20%;
                    font-size: ${size * 0.3}px;
                    opacity: 0;
                    transform: rotate(-20deg) scale(0);
                    transition: all 0.3s ease;
                }

                .wave-hand.waving {
                    opacity: 1;
                    transform: rotate(0deg) scale(1);
                    animation: wave 0.6s ease-in-out;
                }

                @keyframes wave {
                    0%, 100% { transform: rotate(0deg) scale(1); }
                    25% { transform: rotate(20deg) scale(1.1); }
                    50% { transform: rotate(-10deg) scale(1); }
                    75% { transform: rotate(15deg) scale(1.05); }
                }
            `}</style>
        </div>
    );
}
