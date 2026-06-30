import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollSection from './ScrollSection';

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      q: 'What is UniOS.ai?',
      a: 'UniOS.ai is an intelligent operating system designed specifically for modern school management. It integrates administrative workflows, classroom planners, grading tools, fee ledgers, and parent updates into a single cohesive, AI-first platform.'
    },
    {
      q: 'How does the AI Assistant assist teachers and administrators?',
      a: 'The integrated AI copilot acts as a virtual assistant: drafting school circulars, resolving schedule clashes, generating academic progress reports, summarizing student performance metrics, and assisting teachers with grading workflows.'
    },
    {
      q: "Is our school's data secure on Kyzentra's servers?",
      a: 'Yes, data security is our top priority. We use strict tenant isolation, role-based access protocols, standard AES-256 data encryption at rest, and TLS 1.3 in transit. Student privacy conforms to standard EduTech compliance frameworks.'
    },
    {
      q: 'What does the timeline look like for onboarding early institutions?',
      a: 'We are launching partner beta programs in Q3 2026. General availability along with developer platform SDK modules will roll out progressively. Schools on the waitlist will get priority access to closed onboarding slots.'
    },
    {
      q: 'Does Kyzentra offer training or documentation for school staff?',
      a: 'Yes. Every school onboarded into our pilot or general release receives live training workshops, full document walkthroughs, and direct chat support channels to make the transition to UniOS.ai frictionless.'
    }
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollSection id="faq" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)' }}>
            <HelpCircle size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              Faq
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, fontWeight: 800 }}>
            Frequently Asked Questions.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Everything you need to know about our products, platform compatibility, timelines, and security protocols.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className="glass-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: isExpanded ? '1px solid var(--accent-blue-glow)' : '1px solid var(--border-light)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleExpand(index)}
                  style={{
                    width: '100%',
                    padding: '24px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    color: 'white'
                  }}
                >
                  <span style={{
                    fontSize: '1.08rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-heading)',
                    color: isExpanded ? 'var(--accent-cyan)' : 'white',
                    transition: 'color 0.2s'
                  }}>
                    {faq.q}
                  </span>
                  
                  <span style={{
                    color: isExpanded ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div style={{
                        padding: '0 24px 24px 24px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.96rem',
                        lineHeight: 1.6,
                        borderTop: '1px solid rgba(255, 255, 255, 0.03)',
                        paddingTop: '16px'
                      }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </ScrollSection>
  );
}
