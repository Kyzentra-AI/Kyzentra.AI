import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Briefcase, Users, LayoutDashboard, Sparkles, 
  CheckSquare, CreditCard, Award, BookOpen, MessageSquare, 
  BarChart3, Layers, Home, Bus, UserCheck, Wallet, Grid
} from 'lucide-react';
import ScrollSection from './ScrollSection';

export default function Features() {
  const featuresList = [
    { title: 'Student Portal', icon: <GraduationCap size={20} />, desc: 'Personalized dashboard, timetables, grading tracking, and resources access.', color: 'var(--accent-blue)' },
    { title: 'Faculty Portal', icon: <Briefcase size={20} />, desc: 'Classroom manager, attendance trackers, grading logs, and curriculum plans.', color: 'var(--accent-purple)' },
    { title: 'Parent Portal', icon: <Users size={20} />, desc: 'Real-time updates on children progress, fees status, and teacher chats.', color: 'var(--accent-cyan)' },
    { title: 'Admin Dashboard', icon: <LayoutDashboard size={20} />, desc: 'Complete high-level operation matrix, control loops, and configuration panels.', color: '#10b981' },
    { title: 'AI Assistant', icon: <Sparkles size={20} />, desc: '24/7 smart companion answering queries, drafting mail, and generating reports.', color: '#f59e0b' },
    { title: 'Attendance', icon: <CheckSquare size={20} />, desc: 'Biometric, automated, and mobile-based student and faculty registration.', color: '#ec4899' },
    { title: 'Fees', icon: <CreditCard size={20} />, desc: 'Online digital fee invoices, installment models, and automatic ledger entries.', color: '#3b82f6' },
    { title: 'Examinations', icon: <Award size={20} />, desc: 'Smart exam planner, online assessment builders, and automatic result cards.', color: '#8b5cf6' },
    { title: 'Homework', icon: <BookOpen size={20} />, desc: 'Instant file sharing, assignment dispatching, and feedback review loops.', color: '#06b6d4' },
    { title: 'Communication', icon: <MessageSquare size={20} />, desc: 'School-wide circulars, SMS updates, emails, and direct chats.', color: '#10b981' },
    { title: 'Analytics', icon: <BarChart3 size={20} />, desc: 'Comprehensive data analytics, enrollment pipelines, and academic performance.', color: '#f59e0b' },
    { title: 'Resource Management', icon: <Layers size={20} />, desc: 'Smart inventory logs, library tracking, and classroom scheduling.', color: '#e11d48' },
    { title: 'Hostel', icon: <Home size={20} />, desc: 'Warden dashboards, room occupancy allocation, and gate logs.', color: '#0ea5e9' },
    { title: 'Transport', icon: <Bus size={20} />, desc: 'Live GPS vehicle location tracking, driver logs, and route managers.', color: '#84cc16' },
    { title: 'HR', icon: <UserCheck size={20} />, desc: 'Faculty payroll processing, leaves tracker, and recruitment pipes.', color: '#a855f7' },
    { title: 'Finance', icon: <Wallet size={20} />, desc: 'Comprehensive ledger accounting, expense reporting, and financial balances.', color: '#10b981' }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };

  return (
    <ScrollSection id="features" style={{ padding: '100px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
            <Grid size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              Core Features
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, fontWeight: 800 }}>
            Unified Modules. Endless Power.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '650px', lineHeight: 1.6 }}>
            UniOS.ai packages sixteen primary education pillars into a single, cohesive operating system. All interfaces are responsive, rapid, and assisted by AI.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
            width: '100%'
          }}
        >
          {featuresList.map((feat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="feature-card glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              whileHover={{
                y: -6,
                borderColor: feat.color,
                boxShadow: `0 12px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px ${feat.color}15`
              }}
            >
              {/* Feature Icon Header */}
              <div style={{
                background: `linear-gradient(135deg, ${feat.color}22 0%, ${feat.color}08 100%)`,
                border: `1px solid ${feat.color}33`,
                color: feat.color,
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}
              className="feat-icon"
              >
                {feat.icon}
              </div>

              {/* Title & Desc */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h4 style={{ fontSize: '1.08rem', fontWeight: 700, color: 'white' }}>
                  {feat.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.45 }}>
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <style>{`
        .feature-card:hover .feat-icon {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>
    </ScrollSection>
  );
}
