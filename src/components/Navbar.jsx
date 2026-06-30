import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onOpenWaitlist, onOpenDemo, activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'vision', label: 'Vision' },
    { id: 'products', label: 'Products' },
    { id: 'careers', label: 'Careers' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/70 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(5, 5, 8, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick('hero')} 
          style={{ cursor: 'pointer' }}
        >
          <Logo size={34} />
        </div>

        {/* Desktop Menu */}
        <div style={{ display: 'none', alignItems: 'center', gap: '32px' }} className="md-flex">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '28px' }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeSection === link.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: activeSection === link.id ? '600' : '400',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: '0',
                      right: '0',
                      height: '2px',
                      background: 'linear-gradient(to right, var(--accent-blue), var(--accent-purple))',
                      borderRadius: '999px'
                    }} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop CTAs */}
        <div style={{ display: 'none', alignItems: 'center', gap: '12px' }} className="md-flex">
          <button 
            onClick={onOpenWaitlist}
            className="btn-secondary" 
            style={{ padding: '8px 20px', fontSize: '0.875rem' }}
          >
            Join Waitlist
          </button>
          <button 
            onClick={onOpenDemo}
            className="btn-primary" 
            style={{ padding: '9px 20px', fontSize: '0.875rem', boxShadow: 'none' }}
          >
            Book Demo
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="md-hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            backgroundColor: 'rgba(9, 9, 14, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
          className="md-hidden"
        >
          <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', gap: '20px' }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeSection === link.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: activeSection === link.id ? '600' : '400',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    textAlign: 'left',
                    width: '100%',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <button 
              onClick={() => { setIsOpen(false); onOpenWaitlist(); }}
              className="btn-secondary" 
              style={{ width: '100%', padding: '12px' }}
            >
              Join Waitlist
            </button>
            <button 
              onClick={() => { setIsOpen(false); onOpenDemo(); }}
              className="btn-primary" 
              style={{ width: '100%', padding: '12px' }}
            >
              Book Demo
            </button>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS Helper */}
      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; }
          .md-hidden { display: none !important; }
        }
        @media (max-width: 767px) {
          .md-flex { display: none !important; }
          .md-hidden { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
