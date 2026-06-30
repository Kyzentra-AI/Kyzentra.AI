import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Calendar, Mail, User, Building2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Turnstile from './forms/Turnstile';
import { submitForm } from '../utils/api';

export default function Modal({ isOpen, onClose, type }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    designation: '',
    studentCount: '250-1000',
    preferredDate: '',
    preferredTime: '',
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

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{8,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.schoolName.trim()) newErrors.schoolName = 'School/Institution name is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation/Role is required';

    if (type === 'demo') {
      if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
      if (!formData.preferredTime.trim()) newErrors.preferredTime = 'Preferred time is required';
    } else {
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
    }

    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (siteKey && siteKey !== 'disabled' && !turnstileToken) {
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

    let payload;
    if (type === 'waitlist') {
      payload = {
        fullName: formData.name,
        schoolName: formData.schoolName,
        designation: formData.designation,
        email: formData.email,
        phone: formData.phone,
        studentCount: formData.studentCount,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        message: formData.message
      };
    } else {
      payload = {
        name: formData.name,
        school: formData.schoolName,
        designation: formData.designation,
        email: formData.email,
        phone: formData.phone,
        studentCount: formData.studentCount,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        notes: formData.message
      };
    }

    try {
      await submitForm(type, payload, turnstileToken);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      schoolName: '',
      designation: '',
      studentCount: '250-1000',
      preferredDate: '',
      preferredTime: '',
      city: '',
      state: '',
      country: '',
      message: ''
    });
    setTurnstileToken('');
    setSubmitError('');
    setErrors({});
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(3, 3, 5, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="glass-card"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            background: 'rgba(11, 11, 20, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '32px',
            zIndex: 101,
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(37, 99, 235, 0.1)'
          }}
        >
          {/* Neon Top Glow Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: type === 'demo' 
              ? 'linear-gradient(to right, var(--accent-blue), var(--accent-cyan))' 
              : 'linear-gradient(to right, var(--accent-purple), var(--accent-blue))'
          }} />

          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '50%'
            }}
            onMouseEnter={(e) => e.target.style.color = '#ffffff'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
          >
            <X size={20} />
          </button>

          {!isSuccess ? (
            <div>
              {/* Header */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: type === 'demo' ? 'var(--accent-cyan)' : 'var(--accent-purple)', marginBottom: '8px' }}>
                  <Sparkles size={16} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                    {type === 'demo' ? 'Book a Free Demo' : 'Join UniOS.ai Waitlist'}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px' }}>
                  {type === 'demo' ? 'Experience the Future of Schools' : 'Secure Your Early Access'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  {type === 'demo' 
                    ? "See how UniOS.ai can transform your institution's management, communication, and learning tools."
                    : 'Be among the first to experience the AI-powered operating system built for modern schools.'}
                </p>
              </div>

              {submitError && (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#fca5a5',
                  fontSize: '0.85rem',
                  marginBottom: '16px',
                  textAlign: 'left'
                }}>
                  {submitError}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Row 1: Name and Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="input-field"
                        style={inputStyle(errors.name)}
                      />
                    </div>
                    {errors.name && <span style={errorStyle}>{errors.name}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Work Email</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@school.edu"
                        className="input-field"
                        style={inputStyle(errors.email)}
                      />
                    </div>
                    {errors.email && <span style={errorStyle}>{errors.email}</span>}
                  </div>
                </div>

                {/* Row 2: Phone and School Name */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Phone Number</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 555-0199"
                        className="input-field"
                        style={inputStyle(errors.phone)}
                      />
                    </div>
                    {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>School / Institution</label>
                    <div style={{ position: 'relative' }}>
                      <Building2 size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        value={formData.schoolName}
                        onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                        placeholder="St. Mary Academy"
                        className="input-field"
                        style={inputStyle(errors.schoolName)}
                      />
                    </div>
                    {errors.schoolName && <span style={errorStyle}>{errors.schoolName}</span>}
                  </div>
                </div>

                {/* Row 3: Designation and Student Count */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Designation / Role</label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="Principal / IT Director"
                      className="input-field"
                      style={{ ...inputStyle(errors.designation), paddingLeft: '14px' }}
                    />
                    {errors.designation && <span style={errorStyle}>{errors.designation}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Student Count</label>
                    <select
                      value={formData.studentCount}
                      onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                      className="input-field"
                      style={{ ...inputStyle(false), paddingLeft: '14px', appearance: 'none', background: 'rgba(255, 255, 255, 0.03)', color: 'white' }}
                    >
                      <option value="under-250" style={{ backgroundColor: '#09090e' }}>&lt; 250 students</option>
                      <option value="250-1000" style={{ backgroundColor: '#09090e' }}>250 - 1,000 students</option>
                      <option value="1000-3000" style={{ backgroundColor: '#09090e' }}>1,000 - 3,000 students</option>
                      <option value="above-3000" style={{ backgroundColor: '#09090e' }}>3,000+ students</option>
                    </select>
                  </div>
                </div>

                {/* Type specific fields */}
                {type === 'demo' ? (
                  <>
                    {/* Row 4: Preferred Date and Preferred Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Preferred Date</label>
                        <div style={{ position: 'relative' }}>
                          <Calendar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                          <input
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                            className="input-field"
                            style={{ ...inputStyle(errors.preferredDate), paddingLeft: '38px', colorScheme: 'dark' }}
                          />
                        </div>
                        {errors.preferredDate && <span style={errorStyle}>{errors.preferredDate}</span>}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Preferred Time</label>
                        <input
                          type="text"
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          placeholder="e.g. 2:00 PM EST"
                          className="input-field"
                          style={{ ...inputStyle(errors.preferredTime), paddingLeft: '14px' }}
                        />
                        {errors.preferredTime && <span style={errorStyle}>{errors.preferredTime}</span>}
                      </div>
                    </div>

                    {/* Row 5: Notes */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Notes / Special Requests</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your specific software requirements or notes..."
                        className="input-field"
                        rows={2}
                        style={{ ...inputStyle(false), resize: 'none', height: '65px', padding: '12px 16px', color: 'white' }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Row 4: City and State */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Boston"
                          className="input-field"
                          style={{ ...inputStyle(errors.city), paddingLeft: '14px' }}
                        />
                        {errors.city && <span style={errorStyle}>{errors.city}</span>}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>State / Region</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          placeholder="Massachusetts"
                          className="input-field"
                          style={{ ...inputStyle(errors.state), paddingLeft: '14px' }}
                        />
                        {errors.state && <span style={errorStyle}>{errors.state}</span>}
                      </div>
                    </div>

                    {/* Row 5: Country */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="United States"
                        className="input-field"
                        style={{ ...inputStyle(errors.country), paddingLeft: '14px' }}
                      />
                      {errors.country && <span style={errorStyle}>{errors.country}</span>}
                    </div>

                    {/* Row 6: Message */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Message (Optional)</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Any specific institutional requirements..."
                        className="input-field"
                        rows={2}
                        style={{ ...inputStyle(false), resize: 'none', height: '65px', padding: '12px 16px', color: 'white' }}
                      />
                    </div>
                  </>
                )}

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
                  className="btn-primary"
                  disabled={isSubmitting}
                  style={{
                    marginTop: '8px',
                    padding: '14px',
                    width: '100%',
                    background: type === 'demo' 
                      ? 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%)' 
                      : 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      Processing...
                    </>
                  ) : (
                    type === 'demo' ? 'Schedule Free Demo' : 'Join Waitlist'
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Success State */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px 0'
              }}
            >
              <motion.div
                initial={{ rotate: -20, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                style={{
                  color: type === 'demo' ? 'var(--accent-cyan)' : 'var(--accent-blue)',
                  marginBottom: '20px'
                }}
              >
                <CheckCircle2 size={64} style={{ filter: 'drop-shadow(0 0 15px currentColor)' }} />
              </motion.div>
              
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '12px' }}>
                {type === 'demo' ? 'Demo Request Scheduled!' : 'Welcome to the Future!'}
              </h2>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '360px', marginBottom: '28px' }}>
                {type === 'demo' 
                  ? `Thank you, ${formData.name}. We've sent a confirmation email to ${formData.email}. Our team will contact you shortly to lock in your workspace showcase.`
                  : `Success! You've joined the UniOS.ai early-access queue. We will keep you updated on progress, features, and launch schedules at ${formData.email}.`}
              </p>

              <button 
                onClick={handleClose} 
                className="btn-secondary" 
                style={{ minWidth: '120px' }}
              >
                Close Window
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 12px 16px 12px 38px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .input-field:focus {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .form-row {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}

// Styling helper functions
const inputStyle = (hasError) => ({
  border: hasError ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: hasError ? '0 0 0 4px rgba(239, 68, 68, 0.15)' : 'none'
});

const errorStyle = {
  fontSize: '0.75rem',
  color: '#ef4444',
  fontWeight: 500,
  marginTop: '2px'
};
