import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Eye } from 'lucide-react';
import ScrollSection from './ScrollSection';

export default function Products() {
  const contentVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ScrollSection id="products" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div 
        style={{
          maxWidth: '850px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {/* Products Header Badge */}
        <motion.div 
          variants={contentVariants}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            padding: '6px 14px',
            borderRadius: '9999px',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)'
          }}
        >
          <Sparkles size={13} style={{ color: 'var(--accent-blue)' }} />
          <span>Products</span>
        </motion.div>

        {/* Flagship Platform Label */}
        <motion.span 
          variants={contentVariants}
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--accent-cyan)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            display: 'block'
          }}
        >
          Our flagship AI platform
        </motion.span>

        {/* Main Product Title */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h2 
            variants={contentVariants}
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              lineHeight: 1,
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(to right, #ffffff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              paddingBottom: '10px'
            }}
          >
            UniOS.ai
          </motion.h2>
        </div>

        {/* Launching Soon Badge */}
        <motion.div
          variants={contentVariants}
          style={{
            fontSize: '0.78rem',
            backgroundColor: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            padding: '4px 12px',
            borderRadius: '4px',
            color: 'var(--accent-cyan)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}
        >
          Launching Soon
        </motion.div>

        {/* Dynamic Taglines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          <motion.p 
            variants={contentVariants}
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontWeight: 500,
              color: 'white',
              lineHeight: 1.3
            }}
          >
            AI-powered school operating system.
          </motion.p>
          <motion.p 
            variants={contentVariants}
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 400,
              color: 'var(--text-secondary)'
            }}
          >
            One platform. Unlimited possibilities.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div 
          variants={contentVariants}
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <button 
            onClick={() => handleScrollTo('unios-showcase')}
            className="btn-primary"
            style={{ display: 'flex', gap: '8px', padding: '14px 32px' }}
          >
            Learn More
            <ArrowRight size={18} />
          </button>
          
          <button 
            onClick={() => handleScrollTo('waitlist')}
            className="btn-secondary"
            style={{ display: 'flex', gap: '8px', padding: '14px 32px' }}
          >
            <Sparkles size={18} />
            Join Waitlist
          </button>
        </motion.div>
      </div>
    </ScrollSection>
  );
}
