import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, ArrowDown } from 'lucide-react';
import AISphere from '../AISphere';
import ScrollSection from './ScrollSection';

export default function Hero({ onOpenWaitlist, onOpenDemo }) {
  const chips = [
    'AI Assistant',
    'Attendance Management',
    'Fee Management',
    'Timetable',
    'Examination Management',
    'Homework & Assignments',
    'Parent Communication',
    'Student Portal',
    'Faculty Portal',
    'Admin Dashboard',
    'AI Analytics',
    'Resource Management'
  ];

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15 }
    }
  };

  const chipVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = nextSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ScrollSection 
      id="hero"
      style={{
        padding: '120px 24px 80px'
      }}
    >
      {/* 3D Sphere Background */}
      <AISphere />

      {/* Hero Content Wrapper */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '960px',
          textAlign: 'center',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {/* Hitting the Market Soon Badge */}
        <motion.div 
          variants={badgeVariants}
          className="pulse-badge"
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
            letterSpacing: '0.02em',
            fontFamily: 'var(--font-heading)',
            boxShadow: '0 0 15px rgba(37, 99, 235, 0.1)'
          }}
        >
          <Sparkles size={13} style={{ color: 'var(--accent-cyan)' }} />
          <span>🚀 Hitting the Market Soon</span>
        </motion.div>

        {/* Heading Reveal Line-by-Line */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1 
            variants={lineVariants}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(to right, #ffffff 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              paddingBottom: '8px'
            }}
          >
            Building the Future of <br/>AI-Powered Software.
          </motion.h1>
        </div>

        {/* Subheadline Fades Upward */}
        <motion.p 
          variants={lineVariants}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          Introducing <strong style={{ color: 'white', fontWeight: 600 }}>UniOS.ai</strong> — an intelligent operating system designed for modern schools. Launching soon. Join the waitlist and be among the first to experience the future of school management.
        </motion.p>

        {/* CTAs Scale In */}
        <motion.div 
          variants={lineVariants}
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <button 
            onClick={onOpenDemo}
            className="btn-primary"
            style={{ display: 'flex', gap: '8px', padding: '14px 32px' }}
          >
            <Calendar size={18} />
            Book a Demo
          </button>
          
          <button 
            onClick={onOpenWaitlist}
            className="btn-secondary"
            style={{ display: 'flex', gap: '8px', padding: '14px 32px' }}
          >
            Join Waitlist
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Feature Chips Cascade Into View */}
        <motion.div 
          variants={containerVariants}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            maxWidth: '850px',
            marginTop: '36px'
          }}
        >
          {chips.map((chip, index) => (
            <motion.div
              key={index}
              variants={chipVariants}
              className="chip"
            >
              {chip}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 2.2, 
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        onClick={handleScrollDown}
        style={{
          position: 'absolute',
          bottom: '24px',
          zIndex: 2,
          cursor: 'pointer',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8rem',
          fontWeight: 500
        }}
      >
        <span>Explore Kyzentra</span>
        <ArrowDown size={14} />
      </motion.div>
    </ScrollSection>
  );
}
