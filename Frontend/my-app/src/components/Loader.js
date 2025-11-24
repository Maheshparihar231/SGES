import React, { useEffect, useState } from 'react'
import '../styles/Loader.css';

/**
 * Loader
 * Props:
 * - size: 'sm' | 'md' | 'lg'
 * - label: accessible label for screen readers
 * - className: additional wrapper classes
 * - variant: 'auto' | 'radar' | 'svg' (auto will choose svg when reduced motion is requested)
 * - showLabel: boolean to show visible label text
 */
const Loader = ({ size = 'md', label = 'Loading', className = '', variant = 'auto', showLabel = false }) => {
    const sizeClass = `loader--${size}`;
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
            setPrefersReducedMotion(mq.matches);
            const handler = (e) => setPrefersReducedMotion(e.matches);
            try { mq.addEventListener('change', handler); } catch { mq.addListener(handler); }
            return () => {
                try { mq.removeEventListener('change', handler); } catch { mq.removeListener(handler); }
            }
        }
    }, []);

    const effectiveVariant = (variant === 'auto' && prefersReducedMotion) ? 'svg' : (variant === 'auto' ? 'radar' : variant);

    return (
        <div className={`loader-wrap ${className}`} role="status" aria-live="polite" aria-label={label}>
            {effectiveVariant === 'svg' ? (
                <svg className={`loader-svg ${sizeClass}`} viewBox="0 0 50 50" aria-hidden="true">
                    <circle className="loader-ring" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
                </svg>
            ) : (
                <div className={`loader ${sizeClass}`} aria-hidden="true">
                    <span></span>
                </div>
            )}

            <span className="sr-only">{label}</span>
            {showLabel && <div className="loader-label">{label}</div>}
        </div>
    )
}

export default Loader
