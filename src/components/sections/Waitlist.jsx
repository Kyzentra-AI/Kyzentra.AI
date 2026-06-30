import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, User, Building, Mail, Phone, Users, Send } from 'lucide-react';
import ScrollSection from './ScrollSection';
import Turnstile from '../forms/Turnstile';
import { submitForm } from '../../utils/api';

// Confetti particle simulator
function runConfetti(canvas) {
  const ctx = canvas.getContext('2d');
  let animationId;
  const colors = ['#2563eb', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
  const count = 120;
  const particles = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 5 + 4,
      d: Math.random() * 150 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.05 + 0.02,
      tiltAngle: Math.random() * Math.PI
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach((p) => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) * 0.6;
      p.x += Math.sin(p.tiltAngle) * 0.5;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      if (p.y < canvas.height) {
        active = true;
      } else {
        // Recycle to top
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();
    });

    if (active) {
      animationId = requestAnimationFrame(draw);
    }
  }

  draw();
  return () => {
    cancelAnimationFrame(animationId);
  };
}

export default function Waitlist() {
  const [formData, setFormData] = useState({
    fullName: '',
    schoolName: '',
    designation: '',
    email: '',
    phone: '',
    studentCount: '250-1000',
    city: '',
    state: '',
    country: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitError, setSubmitError] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isSuccess && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;

      const stopConfetti = runConfetti(canvas);

      const handleResize = () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      };
      window.addEventListener('resize', handleResize);

      return () => {
        stopConfetti();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isSuccess]);

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.schoolName.trim()) newErrors.schoolName = 'School name is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{8,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!turnstileToken) {
      newErrors.turnstile = 'Please verify that you are not a robot (Turnstile)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitForm('waitlist', formData, turnstileToken);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollSection id="waitlist" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div 
        style={{
          width: '100%',
          maxWidth: '650px',
          margin: '0 auto',
          position: 'relative'
        }}
        className="glass-card waitlist-wrapper"
      >
        {isSuccess && (
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              width: '100%', height: '100%',
              pointerEvents: 'none',
              borderRadius: '16px',
              zIndex: 5
            }}
          />
        )}

        <div style={{
          padding: '40px',
          position: 'relative',
          zIndex: 6
        }}>
          {!isSuccess ? (
            <div>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)', padding: '6px 14px', borderRadius: '9999px', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                  <Sparkles size={13} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Early Access Onboarding</span>
                </div>
                
                <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>
                  Ready to transform your institution?
                </h2>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.5, maxWidth: '500px' }}>
                  Join the UniOS.ai waitlist. Be among the first schools to experience AI-powered education management.
                </p>
              </div>

              {/* Waitlist Form */}
              {submitError && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#fca5a5',
                  fontSize: '0.88rem',
                  marginBottom: '16px',
                  textAlign: 'left'
                }}>
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Row 1: Name and School */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-waitlist">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Alex Johnson"
                        style={inputStyle(errors.fullName)}
                        className="waitlist-input"
                      />
                    </div>
                    {errors.fullName && <span style={errorStyle}>{errors.fullName}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>School / Institution</label>
                    <div style={{ position: 'relative' }}>
                      <Building size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        value={formData.schoolName}
                        onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                        placeholder="Kyzentra Academy"
                        style={inputStyle(errors.schoolName)}
                        className="waitlist-input"
                      />
                    </div>
                    {errors.schoolName && <span style={errorStyle}>{errors.schoolName}</span>}
                  </div>
                </div>

                {/* Row 2: Designation and Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-waitlist">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Designation / Role</label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        placeholder="Principal / IT Director"
                        style={inputStyle(errors.designation)}
                        className="waitlist-input"
                      />
                    </div>
                    {errors.designation && <span style={errorStyle}>{errors.designation}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Work Email</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@school.edu"
                        style={inputStyle(errors.email)}
                        className="waitlist-input"
                      />
                    </div>
                    {errors.email && <span style={errorStyle}>{errors.email}</span>}
                  </div>
                </div>

                {/* Row 3: Phone and Student Count */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-waitlist">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Phone Number</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 555-0199"
                        style={inputStyle(errors.phone)}
                        className="waitlist-input"
                      />
                    </div>
                    {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Total Student Count</label>
                    <div style={{ position: 'relative' }}>
                      <Users size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <select
                        value={formData.studentCount}
                        onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                        style={{ ...inputStyle(false), appearance: 'none', background: 'rgba(255,255,255,0.02)', padding: '12px 14px 12px 38px', color: 'white' }}
                        className="waitlist-input"
                      >
                        <option value="under-250" style={{ backgroundColor: '#09090e' }}>&lt; 250 students</option>
                        <option value="250-1000" style={{ backgroundColor: '#09090e' }}>250 - 1,000 students</option>
                        <option value="1000-3000" style={{ backgroundColor: '#09090e' }}>1,000 - 3,000 students</option>
                        <option value="above-3000" style={{ backgroundColor: '#09090e' }}>3,000+ students</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 4: City and State */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-waitlist">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Boston"
                      style={inputStyle(errors.city)}
                      className="waitlist-input"
                    />
                    {errors.city && <span style={errorStyle}>{errors.city}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>State / Region</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Massachusetts"
                      style={inputStyle(errors.state)}
                      className="waitlist-input"
                    />
                    {errors.state && <span style={errorStyle}>{errors.state}</span>}
                  </div>
                </div>

                {/* Row 5: Country */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="United States"
                    style={inputStyle(errors.country)}
                    className="waitlist-input"
                  />
                  {errors.country && <span style={errorStyle}>{errors.country}</span>}
                </div>

                {/* Row 6: Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Message (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any specific institutional requirements or questions..."
                    rows={2}
                    style={{ ...inputStyle(false), resize: 'none', padding: '12px 14px', height: '65px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', color: 'white', border: '1px solid rgba(255,255,255,0.08)' }}
                    className="waitlist-input"
                  />
                </div>

                {/* Turnstile Protection */}
                <Turnstile
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setErrors(prev => ({ ...prev, turnstile: 'Turnstile check failed. Please refresh.' }))}
                  onExpire={() => setTurnstileToken('')}
                />
                {errors.turnstile && <span style={{ ...errorStyle, textAlign: 'center', display: 'block' }}>{errors.turnstile}</span>}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '12px',
                    width: '100%'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      Registering School...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Join Waitlist
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px 0' }}>
              <motion.div
                initial={{ rotate: -20, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                style={{ color: 'var(--accent-cyan)', marginBottom: '20px' }}
              >
                <CheckCircle2 size={64} style={{ filter: 'drop-shadow(0 0 15px currentColor)' }} />
              </motion.div>
              
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
                Welcome to the Future!
              </h2>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', maxWidth: '380px', lineHeight: 1.6, marginBottom: '24px' }}>
                Thank you for joining the UniOS.ai waitlist. We'll keep you updated about our launch.
              </p>

              <button 
                onClick={() => setIsSuccess(false)} 
                className="btn-secondary" 
                style={{ minWidth: '120px' }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .waitlist-input {
          width: 100%;
          padding: 12px 14px 12px 38px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .waitlist-input:focus {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.15);
        }

        @media (max-width: 640px) {
          .form-row-waitlist {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </ScrollSection>
  );
}

// Styling helper functions
const inputStyle = (hasError) => ({
  border: hasError ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: hasError ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none'
});

const errorStyle = {
  fontSize: '0.72rem',
  color: '#ef4444',
  fontWeight: 500,
  marginTop: '2px'
};
