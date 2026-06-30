import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import ScrollSection from './ScrollSection';

export default function About() {
  const contentVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const metricVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 80, damping: 12 } 
    }
  };

  return (
    <ScrollSection id="about" style={{ display: 'flex', alignItems: 'center' }}>
      <div 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          width: '100%', 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '48px', 
          alignItems: 'center' 
        }} 
        className="about-grid"
      >
        {/* Left Graphics / Branding Details */}
        <motion.div
          variants={contentVariants}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '320px',
            borderRadius: '24px',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, rgba(13, 13, 22, 0.2) 100%)',
            border: '1px solid var(--border-light)',
            overflow: 'hidden',
            padding: '40px'
          }}
        >
          {/* Animated Glow Elements */}
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, var(--accent-blue) 0%, transparent 60%)',
            filter: 'blur(50px)',
            opacity: 0.3,
            animation: 'pulse-slow 4s infinite alternate'
          }} />
          
          <div style={{ zIndex: 2, textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }}>
              Kyzentra
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginTop: '8px' }}>
              Intelligence Suite
            </span>
          </div>
        </motion.div>

        {/* Right Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Section Badge */}
          <motion.div 
            variants={contentVariants}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)' }}
          >
            <Cpu size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              Corporate Overview
            </span>
          </motion.div>
          
          <motion.h2 
            variants={contentVariants}
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', lineHeight: 1.15, fontWeight: 800 }}
          >
            Intelligent Software, <br/>Redefined from Scratch.
          </motion.h2>
          
          <motion.p 
            variants={contentVariants}
            style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7 }}
          >
            Kyzentra builds intelligent software products that empower organizations through AI, automation, and modern user experiences. The company is focused on creating scalable platforms that simplify complex workflows and improve productivity.
          </motion.p>

          <motion.p 
            variants={contentVariants}
            style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7 }}
          >
            By designing core systems with an AI-first philosophy, we bypass the legacy software layers that drag down organizational efficiency. Our product ecosystem integrates directly, communicates smoothly, and makes decisions dynamically.
          </motion.p>

          {/* Stats matrix */}
          <motion.div 
            variants={contentVariants}
            style={{ display: 'flex', gap: '32px', marginTop: '16px' }}
          >
            <motion.div variants={metricVariants} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>100%</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>AI-First Architecture</span>
            </motion.div>
            <motion.div 
              variants={metricVariants}
              style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '32px' }}
            >
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>&lt; 90%</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Operational Lag Reduction</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid { grid-template-columns: 1fr 1.2fr !important; }
        }
      `}</style>
    </ScrollSection>
  );
}
