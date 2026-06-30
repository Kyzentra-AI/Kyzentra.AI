import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Vision from './components/sections/Vision';
import Products from './components/sections/Products';
import UniOSShowcase from './components/sections/UniOSShowcase';
import Features from './components/sections/Features';
import Roadmap from './components/sections/Roadmap';
import Careers from './components/sections/Careers';
import FAQ from './components/sections/FAQ';
import Waitlist from './components/sections/Waitlist';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';

export default function App() {
  // Modal toggle state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('waitlist'); // 'waitlist' or 'demo'

  // Scroll active section tracking
  const [activeSection, setActiveSection] = useState('hero');

  // R3F Screen dashboard tab mapping state
  const [activeDemoTab, setActiveDemoTab] = useState('admin');

  // Trigger modal handlers
  const handleOpenWaitlist = () => {
    setModalType('waitlist');
    setModalOpen(true);
  };

  const handleOpenDemo = () => {
    setModalType('demo');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Track user scroll intersection to highlight the correct navbar links
  useEffect(() => {
    const handleScrollIntersection = () => {
      const sections = [
        'hero', 'about', 'vision', 'products', 
        'unios-showcase', 'features', 'roadmap', 
        'careers', 'faq', 'waitlist', 'contact'
      ];
      
      const scrollPosition = window.scrollY + 250; // offset for triggers

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            // Map intermediate scrolling anchors to main navbar links
            if (sectionId === 'unios-showcase' || sectionId === 'features') {
              setActiveSection('products');
            } else if (sectionId === 'roadmap') {
              setActiveSection('about');
            } else if (sectionId === 'waitlist') {
              setActiveSection('contact');
            } else {
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollIntersection);
    return () => window.removeEventListener('scroll', handleScrollIntersection);
  }, []);

  return (
    <>
      {/* Ambient Aurora Glow Backdrop */}
      <div className="aurora-bg">
        <div className="aurora-glow-1" />
        <div className="aurora-glow-2" />
        <div className="aurora-glow-3" />
      </div>

      {/* Sticky Global Navigation */}
      <Navbar
        onOpenWaitlist={handleOpenWaitlist}
        onOpenDemo={handleOpenDemo}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Single Page Sections with Snapping */}
      <main className="scroll-snap-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Hero 
          onOpenWaitlist={handleOpenWaitlist} 
          onOpenDemo={handleOpenDemo} 
        />
        
        <About />
        
        <Vision />
        
        <Products />
        
        <UniOSShowcase 
          activeTab={activeDemoTab} 
          onTabSelect={setActiveDemoTab} 
          onOpenWaitlist={handleOpenWaitlist} 
        />
        
        <Features />
        
        <Roadmap />
        
        <Careers />
        
        <FAQ />
        
        <Waitlist />
        
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer 
        onOpenWaitlist={handleOpenWaitlist} 
        onOpenDemo={handleOpenDemo} 
        setActiveSection={setActiveSection}
      />

      {/* Global Glass Modal (Waitlist / Demo Forms) */}
      <Modal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        type={modalType} 
      />
    </>
  );
}
