import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cloud, GraduationCap, BarChart3, Settings, Rocket, Shield, Cpu } from 'lucide-react';

export default function Overview() {
  const roadmap = [
    {
      phase: 'Phase 1',
      date: 'Q3 2026',
      title: 'UniOS.ai Beta Launch',
      desc: 'Deploying the core operating system to primary partner institutions. Testing AI assistant cores and automated attendance loops.',
      icon: <GraduationCap size={18} />,
      color: 'var(--accent-blue)'
    },
    {
      phase: 'Phase 2',
      date: 'Q4 2026',
      title: 'Cinematic Analytics Hub',
      desc: 'Rolling out comprehensive dashboard reporting modules for multi-school principals. Deep analytics integrations.',
      icon: <BarChart3 size={18} />,
      color: 'var(--accent-purple)'
    },
    {
      phase: 'Phase 3',
      date: 'Q1 2027',
      title: 'Voice Copilot & AI Grading',
      desc: 'Introducing vocal commands for administration and automatic quiz processing engine for teachers.',
      icon: <Brain size={18} />,
      color: 'var(--accent-cyan)'
    },
    {
      phase: 'Phase 4',
      date: 'Q2 2027',
      title: 'Developer Platform & SDK',
      desc: 'Opening standard API integrations and custom widgets ecosystem, empowering developers to extend UniOS.ai.',
      icon: <Settings size={18} />,
      color: '#10b981'
    }
  ];

  const floatingIcons = [
    { icon: <Brain size={24} />, delay: 0, top: '15%', left: '10%', color: 'var(--accent-blue)' },
    { icon: <Cloud size={24} />, delay: 1, top: '25%', right: '12%', color: 'var(--accent-purple)' },
    { icon: <BarChart3 size={24} />, delay: 0.5, bottom: '20%', left: '15%', color: 'var(--accent-cyan)' },
    { icon: <Settings size={24} />, delay: 1.5, bottom: '30%', right: '20%', color: '#10b981' }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="about"
      style={{
        padding: '120px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        position: 'relative'
      }}
    >
      {/* Background blurs specific to overview */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(139, 92, 246, 0.04)',
        filter: 'blur(80px)',
        zIndex: -1
      }} />

      {/* Decorative Floating Tech Icons */}
      <div className="md-block" style={{ display: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: -1 }}>
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 6,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              color: item.color,
              opacity: 0.25,
              filter: 'drop-shadow(0 0 10px currentColor)'
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px', alignItems: 'start' }} className="lg-grid-2">
        
        {/* Left Column: Text description */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)' }}>
            <Cpu size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              Corporate Overview
            </span>
          </div>
          
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, fontWeight: 800 }}>
            Intelligent Software, <br/>Redefined from Scratch.
          </h2>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Kyzentra builds intelligent software products that empower organizations through AI, automation, and modern user experiences. The company is focused on creating scalable platforms that simplify complex workflows and improve productivity.
          </p>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            By designing core systems with an AI-first philosophy, we bypass the legacy software layers that drag down organizational efficiency. Our product ecosystem integrates directly, communicates smoothly, and makes decisions dynamically.
          </p>

          <div style={{ display: 'flex', gap: '24px', marginTop: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>100%</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>AI-First Architecture</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>&lt; 90%</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Operational Lag Reduction</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Timeline Roadmap */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
            Product Horizon Roadmap
          </h3>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '24px', paddingLeft: '16px' }}>
            {/* Center connector line */}
            <div style={{
              position: 'absolute',
              top: '12px',
              bottom: '12px',
              left: '23px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-blue), var(--accent-purple), var(--accent-cyan), #10b981)',
              opacity: 0.3
            }} />

            {roadmap.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                className="glass-card"
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.01)',
                  position: 'relative'
                }}
              >
                {/* Timeline node */}
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-darker)',
                  border: `3px solid ${item.color}`,
                  position: 'absolute',
                  left: '-23px',
                  top: '24px',
                  boxShadow: `0 0 10px ${item.color}`,
                  zIndex: 2
                }} />

                {/* Left icon wrapper */}
                <div style={{
                  background: `linear-gradient(135deg, ${item.color}33 0%, ${item.color}11 100%)`,
                  border: `1px solid ${item.color}55`,
                  color: item.color,
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {item.icon}
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>{item.title}</h4>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      color: item.color
                    }}>
                      {item.date}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.phase}</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginTop: '4px' }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg-grid-2 { grid-template-columns: repeat(2, 1fr) !important; }
          .md-block { display: block !important; }
        }
      `}</style>
    </section>
  );
}
