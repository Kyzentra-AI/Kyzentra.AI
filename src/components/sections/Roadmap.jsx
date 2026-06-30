import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BarChart3, Brain, Settings, GitCommit } from 'lucide-react';
import ScrollSection from './ScrollSection';

export default function Roadmap() {
  const phases = [
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

  const cardVariants = {
    hidden: { opacity: 0, y: 35, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <ScrollSection id="roadmap" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', position: 'relative' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)' }}>
            <GitCommit size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              Development Timeline
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, fontWeight: 800 }}>
            Product Horizon Roadmap.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Our progressive trajectory for introducing, refining, and scaling the Kyzentra AI operating systems.
          </p>
        </div>

        {/* Timeline body */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '32px', paddingLeft: '16px', paddingRight: '16px' }}>
          {/* Connector Line */}
          <div style={{
            position: 'absolute',
            top: '20px',
            bottom: '20px',
            left: '32px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-blue), var(--accent-purple), var(--accent-cyan), #10b981)',
            opacity: 0.25
          }} className="roadmap-line" />

          {phases.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              className="glass-card"
              style={{
                display: 'flex',
                gap: '24px',
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.01)',
                marginLeft: '42px',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              whileHover={{
                transform: 'translateY(-2px)',
                borderColor: item.color,
                boxShadow: `0 15px 35px -15px rgba(0, 0, 0, 0.6), 0 0 20px ${item.color}0c`
              }}
            >
              {/* Timeline outer node */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#050508',
                border: `3px solid ${item.color}`,
                position: 'absolute',
                left: '-54px',
                top: '32px',
                boxShadow: `0 0 10px ${item.color}`,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} className="roadmap-node">
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: item.color
                }} />
              </div>

              {/* Icon panel */}
              <div style={{
                background: `linear-gradient(135deg, ${item.color}22 0%, ${item.color}08 100%)`,
                border: `1px solid ${item.color}33`,
                color: item.color,
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>

              {/* Details text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'white' }}>{item.title}</h4>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    color: item.color
                  }}>
                    {item.date}
                  </span>
                </div>
                
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.phase}
                </span>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginTop: '4px' }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </ScrollSection>
  );
}
