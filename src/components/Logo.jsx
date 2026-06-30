import React from 'react';

export default function Logo({ size = 32, showText = true, className = '', vertical = false }) {
  return (
    <div 
      className={`logo-container ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: 'center',
        gap: vertical ? '16px' : '12px',
        textAlign: vertical ? 'center' : 'left',
        userSelect: 'none'
      }}
    >
      {/* SVG K-Ribbon Icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="logoStemGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1530" />
            <stop offset="100%" stopColor="#1E2B58" />
          </linearGradient>
          <linearGradient id="logoArmGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="logoLegGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Vertical Left Stem */}
        <rect 
          x="14" 
          y="12" 
          width="12" 
          height="76" 
          rx="6" 
          fill="url(#logoStemGrad)" 
        />

        {/* Upper diagonal arm (curved ribbon fold) */}
        <path 
          d="M 26 48 
             C 32 36, 44 26, 68 26 
             C 62 36, 48 48, 34 54 
             C 30 52, 28 50, 26 48 Z" 
          fill="url(#logoArmGrad)" 
        />

        {/* Lower diagonal leg (ribbon fold going down-right) */}
        <path 
          d="M 34 54 
             C 40 56, 44 60, 44 66 
             C 40 72, 34 76, 26 76 
             C 26 68, 28 60, 34 54 Z" 
          fill="url(#logoLegGrad)" 
          opacity="0.85"
        />
        <path 
          d="M 34 54 
             L 72 88 
             H 86 
             L 44 56 Z" 
          fill="url(#logoLegGrad)" 
        />

        {/* Floating cyan/blue pixel nodes */}
        <rect x="74" y="15" width="8" height="8" rx="1.5" fill="#06B6D4" />
        <rect x="85" y="22" width="6" height="6" rx="1" fill="#3B82F6" />
        <rect x="78" y="32" width="9" height="9" rx="2" fill="#2563EB" />
        <rect x="68" y="40" width="5" height="5" rx="1" fill="#06B6D4" />
      </svg>

      {/* Wordmark and Tagline */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: vertical ? '6px' : '2px', alignItems: vertical ? 'center' : 'flex-start' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: vertical ? 'center' : 'baseline', 
            justifyContent: vertical ? 'center' : 'flex-start',
            fontFamily: 'var(--font-heading)', 
            fontWeight: 800, 
            fontSize: vertical ? '1.85rem' : '1.25rem', 
            letterSpacing: '-0.03em' 
          }}>
            <span style={{ color: '#ffffff' }}>Kyzentra</span>
            <span style={{ 
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800
            }}>.Ai</span>
          </div>
          <span style={{ 
            fontSize: vertical ? '0.72rem' : '0.5rem', 
            fontWeight: 700, 
            letterSpacing: '0.18em', 
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-sans)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            textAlign: vertical ? 'center' : 'left'
          }}>
            Intelligence. <span style={{ color: '#3b82f6' }}>Automation</span>. Transformation.
          </span>
        </div>
      )}
    </div>
  );
}
