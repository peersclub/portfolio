'use client';

import { useEffect, useState, useCallback } from 'react';

interface TypewriterProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    className?: string;
}

export function Typewriter({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
    className,
}: TypewriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const tick = useCallback(() => {
        const currentWord = words[currentWordIndex];

        if (isPaused) return;

        if (!isDeleting) {
            // Typing
            if (currentText.length < currentWord.length) {
                setCurrentText(currentWord.slice(0, currentText.length + 1));
            } else {
                // Finished typing, pause before deleting
                setIsPaused(true);
                setTimeout(() => {
                    setIsPaused(false);
                    setIsDeleting(true);
                }, pauseDuration);
            }
        } else {
            // Deleting
            if (currentText.length > 0) {
                setCurrentText(currentWord.slice(0, currentText.length - 1));
            } else {
                // Finished deleting, move to next word
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
        }
    }, [currentText, currentWordIndex, isDeleting, isPaused, pauseDuration, words]);

    useEffect(() => {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        const timer = setTimeout(tick, speed);
        return () => clearTimeout(timer);
    }, [tick, isDeleting, typingSpeed, deletingSpeed]);

    return (
        <span className={className}>
            {currentText}
            <span className="cursor" style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                background: 'var(--accent)',
                marginLeft: '4px',
                animation: 'blink 1s step-end infinite',
                verticalAlign: 'text-bottom',
            }} />
        </span>
    );
}
