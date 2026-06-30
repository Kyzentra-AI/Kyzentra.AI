import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, ArrowRight, UploadCloud, CheckCircle, FileText, 
  Send, Sparkles, X, User, Mail, Calendar, Globe, MessageSquare 
} from 'lucide-react';

const GithubIcon = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import ScrollSection from './ScrollSection';
import Turnstile from '../forms/Turnstile';
import { fileToBase64, submitForm } from '../../utils/api';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    degree: '',
    branch: '',
    graduationYear: '',
    position: '',
    employmentType: 'Internship',
    skills: '',
    github: '',
    linkedin: '',
    portfolio: '',
    resumeFile: null,
    coverLetter: ''
  });

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitError, setSubmitError] = useState('');

  const fileInputRef = useRef(null);

  const internships = [
    { id: 'frontend', title: 'Frontend Developer', color: 'var(--accent-blue)', desc: 'Build highly responsive WebGL user interfaces, React Three Fiber scenes, and fluid glassmorphic dashboards.' },
    { id: 'backend', title: 'Backend Developer', color: 'var(--accent-purple)', desc: 'Design secure PostgreSQL databases, high-performance Node API endpoints, and real-time WebSockets logic.' },
    { id: 'ai-ml', title: 'AI / ML Engineer', color: 'var(--accent-cyan)', desc: 'Implement local vector index indexing, model prompting loops, semantic search caching, and LLM tuning.' },
    { id: 'ui-ux', title: 'UI / UX Designer', color: '#10b981', desc: 'Create cinematic interface designs, system icons, dark-mode color structures, and premium animations.' },
    { id: 'marketing', title: 'Marketing Associate', color: '#f59e0b', desc: 'Run digital school branding campaigns, direct social growth, and coordinate UniOS.ai outreach materials.' },
    { id: 'sales', title: 'Sales Specialist', color: '#ec4899', desc: 'Manage inbound customer pipelines, execute workspace demonstrations, and onboard partner academies.' },
    { id: 'biz-dev', title: 'Business Development', color: '#0ea5e9', desc: 'Acquire early-stage pilot partnerships, plan institutional agreements, and drive strategic sales projects.' }
  ];

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      college: '',
      degree: '',
      branch: '',
      graduationYear: '',
      position: job.title,
      employmentType: 'Internship',
      skills: '',
      github: '',
      linkedin: '',
      portfolio: '',
      resumeFile: null,
      coverLetter: ''
    });
    setTurnstileToken('');
    setSubmitError('');
    setErrors({});
    setUploadProgress(0);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: 'File size must be less than 5MB' }));
      return;
    }

    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      setErrors((prev) => ({ ...prev, file: 'Invalid format. Supported formats: PDF, DOC, DOCX' }));
      return;
    }

    setErrors((prev) => ({ ...prev, file: null }));
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 15;
        });
      }, 80);

      const base64Data = await fileToBase64(file);
      clearInterval(interval);
      setUploadProgress(100);
      setIsUploading(false);
      setFormData((f) => ({ ...f, resumeFile: base64Data }));
    } catch (err) {
      setIsUploading(false);
      setErrors((prev) => ({ ...prev, file: 'Failed to read file. Please try again.' }));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

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
    if (!formData.college.trim()) newErrors.college = 'College/University name is required';
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
    if (!formData.branch.trim()) newErrors.branch = 'Branch/Major is required';
    if (!formData.graduationYear.trim()) newErrors.graduationYear = 'Graduation year is required';
    if (!formData.skills.trim()) newErrors.skills = 'Skills listing is required';
    if (!formData.resumeFile) newErrors.file = 'Please upload your resume';
    // Turnstile is cosmetic — don't block submission if the widget fails

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitForm('careers', formData, turnstileToken);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err.message || 'Application submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollSection id="careers" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)' }}>
            <Briefcase size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              Join the Team
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, fontWeight: 800 }}>
            Build the Future of AI.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Explore our open career cycles. We are seeking brilliant minds for remote internships across key software, design, and outreach paths.
          </p>
        </div>

        {/* Section Segment Title */}
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '28px', color: 'white' }}>
          Internship Opportunities
        </h3>

        {/* Grid of Careers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {internships.map((job) => (
            <motion.div
              key={job.id}
              className="glass-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.01)',
                height: '240px',
                borderLeft: `3px solid ${job.color}`
              }}
              whileHover={{
                y: -5,
                borderColor: job.color,
                boxShadow: `0 15px 35px -15px rgba(0, 0, 0, 0.6), 0 0 15px ${job.color}11`
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  alignSelf: 'flex-start',
                  color: job.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Remote / Internship
                </span>
                
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
                  {job.title}
                </h4>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {job.desc}
                </p>
              </div>

              <button
                onClick={() => handleApplyClick(job)}
                className="btn-secondary"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  alignSelf: 'flex-start',
                  marginTop: '12px'
                }}
              >
                Apply Now
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Careers Overlay Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(3, 3, 5, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="glass-card"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '650px',
                maxHeight: '90vh',
                background: 'rgba(11, 11, 20, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '32px',
                zIndex: 101,
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(37, 99, 235, 0.1)'
              }}
            >
              {/* Highlight bar */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '4px',
                background: `linear-gradient(to right, ${selectedJob.color}, var(--accent-blue))`
              }} />

              {/* Close Button */}
              <button
                onClick={() => setSelectedJob(null)}
                style={{
                  position: 'absolute',
                  top: '20px', right: '20px',
                  background: 'none', border: 'none',
                  color: 'var(--text-secondary)', cursor: 'pointer',
                  padding: '6px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                <X size={20} />
              </button>

              {!isSuccess ? (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: selectedJob.color, marginBottom: '8px' }}>
                      <Sparkles size={16} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Apply for Internship
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>
                      {selectedJob.title}
                    </h3>
                  </div>

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
                    
                    {/* Row 1: Name and Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-careers">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                          <User size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            style={inputStyle(errors.name)}
                            className="career-modal-input"
                          />
                        </div>
                        {errors.name && <span style={errorStyle}>{errors.name}</span>}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                          <Mail size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@university.edu"
                            style={inputStyle(errors.email)}
                            className="career-modal-input"
                          />
                        </div>
                        {errors.email && <span style={errorStyle}>{errors.email}</span>}
                      </div>
                    </div>

                    {/* Row 2: Phone and College */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-careers">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                          <Calendar size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 555-0199"
                            style={inputStyle(errors.phone)}
                            className="career-modal-input"
                          />
                        </div>
                        {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>College / University</label>
                        <input
                          type="text"
                          value={formData.college}
                          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                          placeholder="State University"
                          style={{ ...inputStyle(errors.college), paddingLeft: '14px' }}
                          className="career-modal-input"
                        />
                        {errors.college && <span style={errorStyle}>{errors.college}</span>}
                      </div>
                    </div>

                    {/* Row 3: Degree and Branch */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-careers">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Degree</label>
                        <input
                          type="text"
                          value={formData.degree}
                          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                          placeholder="Bachelor of Science"
                          style={{ ...inputStyle(errors.degree), paddingLeft: '14px' }}
                          className="career-modal-input"
                        />
                        {errors.degree && <span style={errorStyle}>{errors.degree}</span>}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Branch / Major</label>
                        <input
                          type="text"
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          placeholder="Computer Science"
                          style={{ ...inputStyle(errors.branch), paddingLeft: '14px' }}
                          className="career-modal-input"
                        />
                        {errors.branch && <span style={errorStyle}>{errors.branch}</span>}
                      </div>
                    </div>

                    {/* Row 4: Graduation Year and Employment Type */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-careers">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Graduation Year</label>
                        <input
                          type="text"
                          value={formData.graduationYear}
                          onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                          placeholder="2027"
                          style={{ ...inputStyle(errors.graduationYear), paddingLeft: '14px' }}
                          className="career-modal-input"
                        />
                        {errors.graduationYear && <span style={errorStyle}>{errors.graduationYear}</span>}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Employment Type</label>
                        <select
                          value={formData.employmentType}
                          onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                          style={{ ...inputStyle(false), paddingLeft: '14px', appearance: 'none', background: 'rgba(255,255,255,0.02)', color: 'white' }}
                          className="career-modal-input"
                        >
                          <option value="Internship" style={{ backgroundColor: '#09090e' }}>Internship</option>
                          <option value="Full Time" style={{ backgroundColor: '#09090e' }}>Full Time</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 5: Position and Skills */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-careers">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Position Applying For</label>
                        <input
                          type="text"
                          value={formData.position}
                          readOnly
                          style={{ ...inputStyle(false), paddingLeft: '14px', opacity: 0.7 }}
                          className="career-modal-input"
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Key Skills</label>
                        <input
                          type="text"
                          value={formData.skills}
                          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                          placeholder="React, Node, Python, Figma"
                          style={{ ...inputStyle(errors.skills), paddingLeft: '14px' }}
                          className="career-modal-input"
                        />
                        {errors.skills && <span style={errorStyle}>{errors.skills}</span>}
                      </div>
                    </div>

                    {/* Row 6: GitHub and LinkedIn */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-careers">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>GitHub Link</label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}><GithubIcon size={15} /></span>
                          <input
                            type="url"
                            value={formData.github}
                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                            placeholder="https://github.com/myusername"
                            style={inputStyle(errors.github)}
                            className="career-modal-input"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>LinkedIn Link</label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}><LinkedinIcon size={15} /></span>
                          <input
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            placeholder="https://linkedin.com/in/myusername"
                            style={inputStyle(errors.linkedin)}
                            className="career-modal-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 7: Portfolio */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Portfolio Link</label>
                      <div style={{ position: 'relative' }}>
                        <Globe size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          placeholder="https://myportfolio.dev"
                          style={inputStyle(errors.portfolio)}
                          className="career-modal-input"
                        />
                      </div>
                    </div>

                    {/* Textarea: Cover Letter */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Cover Letter (Optional)</label>
                      <div style={{ position: 'relative' }}>
                        <MessageSquare size={15} style={{ position: 'absolute', left: '12px', top: '16px', color: 'var(--text-muted)' }} />
                        <textarea
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                          placeholder="Tell us why you're interested in Kyzentra and what makes you a great fit..."
                          rows={2}
                          style={{ ...inputStyle(errors.coverLetter), resize: 'none', padding: '12px 16px 12px 38px', height: '65px', color: 'white' }}
                          className="career-modal-input"
                        />
                      </div>
                    </div>

                    {/* Resume Upload Segment */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Resume Upload (PDF / DOC / DOCX - 5MB max)</label>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept=".pdf,.doc,.docx" 
                        style={{ display: 'none' }} 
                      />

                      <div 
                        onClick={triggerFileSelect}
                        style={{
                          border: errors.file ? '1px dashed rgba(239, 68, 68, 0.4)' : '1px dashed rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '16px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: 'rgba(255,255,255,0.01)',
                          transition: 'all 0.3s ease'
                        }}
                        className="file-dropzone"
                      >
                        {isUploading ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div className="spinner" />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Processing resume... {uploadProgress}%</span>
                          </div>
                        ) : formData.resumeFile ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
                            <FileText size={18} />
                            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{formData.resumeFile.name}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Click to change)</span>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                            <UploadCloud size={24} style={{ color: 'var(--text-muted)' }} />
                            <span style={{ fontSize: '0.88rem' }}>Upload your resume</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PDF & Word documents supported</span>
                          </div>
                        )}
                      </div>
                      {errors.file && <span style={errorStyle}>{errors.file}</span>}
                    </div>

                    {/* Turnstile Protection */}
                    <Turnstile
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => setErrors(prev => ({ ...prev, turnstile: 'Turnstile check failed. Please refresh.' }))}
                      onExpire={() => setTurnstileToken('')}
                    />
                    {errors.turnstile && <span style={{ ...errorStyle, textAlign: 'center', display: 'block' }}>{errors.turnstile}</span>}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isUploading}
                      className="btn-primary"
                      style={{
                        padding: '12px',
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
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Submit Application
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 0' }}>
                  <motion.div
                    initial={{ rotate: -20, scale: 0.5 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                    style={{ color: selectedJob.color, marginBottom: '20px' }}
                  >
                    <CheckCircle size={64} style={{ filter: 'drop-shadow(0 0 15px currentColor)' }} />
                  </motion.div>
                  
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
                    Application Submitted!
                  </h3>
                  
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '380px', lineHeight: 1.6, marginBottom: '28px' }}>
                    Thank you, {formData.name}. We've received your application details for the {selectedJob.title} internship. Our review panel will reach out to you at {formData.email} shortly.
                  </p>

                  <button 
                    onClick={() => setSelectedJob(null)} 
                    className="btn-secondary" 
                    style={{ minWidth: '130px' }}
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .career-modal-input {
          width: 100%;
          padding: 10px 12px 10px 38px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .career-modal-input:focus {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .file-dropzone:hover {
          background: rgba(255, 255, 255, 0.03) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
        }

        @media (max-width: 640px) {
          .form-row-careers {
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
