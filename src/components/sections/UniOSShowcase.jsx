import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Eye } from 'lucide-react';
import LaptopDemo from '../LaptopDemo';
import ScrollSection from './ScrollSection';

export default function UniOSShowcase({ activeTab, onTabSelect, onOpenWaitlist }) {
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
    <ScrollSection id="unios-showcase" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.04) 0%, transparent 70%)',
        filter: 'blur(120px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', maxWidth: '750px' }}>
          <motion.div 
            variants={contentVariants}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', padding: '6px 14px', borderRadius: '9999px', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'var(--font-heading)' }}
          >
            <Sparkles size={12} style={{ color: 'var(--accent-cyan)' }} />
            <span>Interactive Demo</span>
          </motion.div>

          <motion.h2 
            variants={contentVariants}
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15 }}
          >
            Experience UniOS.ai
          </motion.h2>
          
          <motion.p 
            variants={contentVariants}
            style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.6 }}
          >
            A high-fidelity overview of the intelligent operating system. Click the dashboard tabs below to switch screens on the 3D model.
          </motion.p>

          <motion.div 
            variants={contentVariants}
            style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <button 
              onClick={() => handleScrollTo('waitlist')}
              className="btn-primary"
              style={{ display: 'flex', gap: '8px', padding: '12px 28px', background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%)' }}
            >
              Join the Waitlist
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => handleScrollTo('features')}
              className="btn-secondary"
              style={{ display: 'flex', gap: '8px', padding: '12px 28px' }}
            >
              <Eye size={16} />
              View Portals
            </button>
          </motion.div>
        </div>

        {/* 3D Laptop Demo Component */}
        <motion.div 
          variants={contentVariants}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <LaptopDemo activeTab={activeTab} onTabSelect={onTabSelect} />
        </motion.div>

      </div>
    </ScrollSection>
  );
}
