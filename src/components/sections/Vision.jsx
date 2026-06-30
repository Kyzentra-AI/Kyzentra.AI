import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Users2, ShieldCheck, HelpCircle } from 'lucide-react';
import ScrollSection from './ScrollSection';

function TiltCard({ title, icon, desc, details, color }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    const rotateX = -mouseY * 10;
    const rotateY = mouseX * 10;
    
    setCoords({ x: rotateY, y: rotateX, rawX: e.clientX - rect.left, rawY: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, rawX: 0, rawY: 0 });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 80, damping: 12 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="glass-card"
      style={{
        padding: '32px',
        cursor: 'default',
        transform: `perspective(1000px) rotateX(${coords.y}deg) rotateY(${coords.x}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: isHovered ? 'none' : 'transform 0.5s ease',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* Spotlight Hover Glow */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: `${coords.rawY - 150}px`,
          left: `${coords.rawX - 150}px`,
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 1
        }} />
      )}

      {/* Header Icon */}
      <div style={{
        background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`,
        border: `1px solid ${color}33`,
        color: color,
        width: '52px',
        height: '52px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isHovered ? `0 0 15px ${color}22` : 'none',
        transition: 'all 0.3s ease',
        zIndex: 2
      }}>
        {icon}
      </div>

      {/* Title & Core Desc */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', fontFamily: 'var(--font-heading)' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          {desc}
        </p>
      </div>

      {/* Extra Hover Details */}
      <div style={{
        maxHeight: isHovered ? '100px' : '0px',
        opacity: isHovered ? 1 : 0,
        transition: 'all 0.4s ease',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        lineHeight: 1.5,
        zIndex: 2,
        overflow: 'hidden',
        borderTop: isHovered ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        paddingTop: isHovered ? '12px' : '0px'
      }}>
        {details}
      </div>
    </motion.div>
  );
}

export default function Vision() {
  const cards = [
    {
      title: 'AI First',
      icon: <Brain size={24} />,
      desc: 'Every product is designed with AI at its core.',
      details: 'Instead of appending AI wrappers onto outdated modules, our applications use intelligent prompt agents, generative pipelines, and vector index databases directly in the logic loop.',
      color: 'var(--accent-blue)'
    },
    {
      title: 'Modern Architecture',
      icon: <Cpu size={24} />,
      desc: 'Cloud-native, scalable, and built for performance.',
      details: 'Built with microservices, serverless clusters, and reactive client rendering. We guarantee 99.99% uptime with sub-100ms load operations worldwide.',
      color: 'var(--accent-purple)'
    },
    {
      title: 'User-Centric Design',
      icon: <Users2 size={24} />,
      desc: 'Simple, intuitive experiences for every user.',
      details: 'Complex administrative tables are simplified into structured, readable views. Every student, teacher, parent, and admin gets an application optimized for their immediate tasks.',
      color: 'var(--accent-cyan)'
    },
    {
      title: 'Future Ready',
      icon: <ShieldCheck size={24} />,
      desc: 'Designed to evolve with changing technology.',
      details: 'Modular plugins, flexible configuration formats, and standard APIs. We update modules constantly to leverage new model releases and web structures.',
      color: '#10b981'
    }
  ];

  return (
    <ScrollSection id="vision" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)' }}
        >
          <HelpCircle size={16} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            Why Kyzentra
          </span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, fontWeight: 800 }}
        >
          Engineered for Excellence.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', lineHeight: 1.6 }}
        >
          We focus on building software that solves complex problems through elegant engineering, beautiful interfaces, and advanced automation.
        </motion.p>
      </div>

      {/* Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto'
        }}
      >
        {cards.map((card, index) => (
          <TiltCard
            key={index}
            title={card.title}
            icon={card.icon}
            desc={card.desc}
            details={card.details}
            color={card.color}
          />
        ))}
      </div>
    </ScrollSection>
  );
}
