import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollSection({ children, id, className, style }) {
  const ref = useRef(null);

  // Measure scroll progress relative to this section's visibility
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate a smooth parallax offset for any floating element decoration inside the section
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 70, filter: 'blur(10px)' }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)'
      }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12,
        delayChildren: 0.1
      }}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px 24px',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Decorative Parallax Glow Shapes */}
      <motion.div
        style={{
          position: 'absolute',
          top: '25%',
          left: '10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
          y: parallaxY,
          opacity: parallaxOpacity,
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '8%',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.03) 0%, transparent 70%)',
          filter: 'blur(90px)',
          y: useTransform(scrollYProgress, [0, 1], [80, -80]),
          opacity: parallaxOpacity,
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
      
      {children}
    </motion.section>
  );
}
