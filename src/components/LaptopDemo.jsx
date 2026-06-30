import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { LayoutDashboard, Users, Calendar, Award, MessageSquare, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

// The 3D Laptop Model
function Laptop({ activeTab, scrollProgress, mouseX, mouseY }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    
    // Calculate targets based on scroll and mouse position
    const targetYRotation = -Math.PI / 4.5 + (scrollProgress.current * Math.PI / 2.25) + (mouseX.current * 0.15);
    const targetXRotation = Math.PI / 15 + (mouseY.current * 0.1);
    
    // Smoothly interpolate (lerp) rotation angles
    groupRef.current.rotation.y += (targetYRotation - groupRef.current.rotation.y) * 0.15;
    groupRef.current.rotation.x += (targetXRotation - groupRef.current.rotation.x) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Laptop Base (Keyboard Part) */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[4.4, 0.1, 3.0]} />
        <meshStandardMaterial color="#1e1e24" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Keyboard trackpad/keys details */}
      <mesh position={[0, 0.005, 0.8]}>
        <boxGeometry args={[1.2, 0.01, 0.8]} />
        <meshStandardMaterial color="#2d2d34" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.005, -0.4]}>
        <boxGeometry args={[3.8, 0.01, 1.2]} />
        <meshStandardMaterial color="#0f0f12" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Screen Hinge */}
      <mesh position={[0, 0.02, -1.48]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 4.0, 16]} />
        <meshStandardMaterial color="#0f0f12" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Screen Lid (Opened at 110 degrees / ~0.35 rad backward from vertical) */}
      <group position={[0, 0.02, -1.48]} rotation={[-0.35, 0, 0]}>
        {/* Lid Plastic/Metal Shell */}
        <mesh position={[0, 1.4, -0.04]}>
          <boxGeometry args={[4.4, 2.9, 0.08]} />
          <meshStandardMaterial color="#111115" metalness={0.8} roughness={0.3} />
        </mesh>
        
        {/* Screen Bezel */}
        <mesh position={[0, 1.4, 0.005]}>
          <boxGeometry args={[4.3, 2.8, 0.01]} />
          <meshStandardMaterial color="#0a0a0d" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Live Screen Canvas */}
        <mesh position={[0, 1.4, 0.015]}>
          <planeGeometry args={[4.1, 2.6]} />
          <meshBasicMaterial color="#000000" />
          
          {/* HTML Projector Overlay */}
          <Html
            transform
            occlude
            distanceFactor={2.3}
            position={[0, 0, 0.005]}
            style={{
              width: '1024px',
              height: '640px',
              backgroundColor: '#07070a',
              border: 'none',
              overflow: 'hidden',
              userSelect: 'none',
              borderRadius: '6px'
            }}
          >
            <div className="dashboard-frame">
              {renderDashboardContent(activeTab)}
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
}

// Function to render our high-fidelity HTML dashboard mockups
function renderDashboardContent(tab) {
  switch (tab) {
    case 'admin':
      return (
        <div className="dash-container">
          <div className="dash-sidebar">
            <div className="dash-logo"><Sparkles size={14} /> UniOS.ai</div>
            <div className="menu-group">
              <div className="menu-item active"><LayoutDashboard size={14} /> Analytics</div>
              <div className="menu-item"><Users size={14} /> Users & Roles</div>
              <div className="menu-item"><Calendar size={14} /> Schedule</div>
              <div className="menu-item"><Award size={14} /> Report Cards</div>
            </div>
            <div className="sidebar-footer">
              <span className="badge">Admin Hub</span>
            </div>
          </div>
          <div className="dash-content">
            <div className="dash-header">
              <h3>Kyzentra Academy Dashboard</h3>
              <div className="header-status">
                <span className="dot pulse" /> Live Academics
              </div>
            </div>
            
            <div className="stats-row">
              <div className="stat-box">
                <span className="label">Total Students</span>
                <span className="val">1,248</span>
                <span className="change positive">+4.2% this year</span>
              </div>
              <div className="stat-box">
                <span className="label">Active Faculty</span>
                <span className="val">84</span>
                <span className="change neutral">100% capacity</span>
              </div>
              <div className="stat-box">
                <span className="label">Tuition Collected</span>
                <span className="val">$348,200</span>
                <span className="change positive">96% completion</span>
              </div>
            </div>

            <div className="chart-section">
              <div className="chart-header">
                <h4>School-wide Attendance & Engagement</h4>
                <div className="chart-legend">
                  <span className="leg"><span className="color cyan" /> Present</span>
                  <span className="leg"><span className="color purple" /> Engaged</span>
                </div>
              </div>
              <div className="bar-chart">
                <div className="bar-group"><div className="bar cyan" style={{ height: '85%' }} /><div className="bar purple" style={{ height: '90%' }} /><span>Mon</span></div>
                <div className="bar-group"><div className="bar cyan" style={{ height: '92%' }} /><div className="bar purple" style={{ height: '95%' }} /><span>Tue</span></div>
                <div className="bar-group"><div className="bar cyan" style={{ height: '88%' }} /><div className="bar purple" style={{ height: '91%' }} /><span>Wed</span></div>
                <div className="bar-group"><div className="bar cyan" style={{ height: '90%' }} /><div className="bar purple" style={{ height: '89%' }} /><span>Thu</span></div>
                <div className="bar-group"><div className="bar cyan" style={{ height: '75%' }} /><div className="bar purple" style={{ height: '80%' }} /><span>Fri</span></div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'teacher':
      return (
        <div className="dash-container">
          <div className="dash-sidebar">
            <div className="dash-logo"><Sparkles size={14} /> UniOS.ai</div>
            <div className="menu-group">
              <div className="menu-item"><LayoutDashboard size={14} /> Dashboard</div>
              <div className="menu-item active"><Users size={14} /> My Classes</div>
              <div className="menu-item"><Calendar size={14} /> Lesson Planner</div>
              <div className="menu-item"><MessageSquare size={14} /> Direct Chat</div>
            </div>
            <div className="sidebar-footer">
              <span className="badge">Faculty Portal</span>
            </div>
          </div>
          <div className="dash-content">
            <div className="dash-header">
              <h3>Faculty Management Center</h3>
              <div className="ai-assistant-badge">
                <Sparkles size={12} /> AI Lesson Copilot: Active
              </div>
            </div>

            <div className="class-grid">
              <div className="class-card-ui">
                <div className="card-top">
                  <h5>Grade 10 Calculus</h5>
                  <span className="badge-class">Period 2</span>
                </div>
                <div className="card-detail">
                  <div className="detail-item"><span>Students</span><strong>28</strong></div>
                  <div className="detail-item"><span>Avg Score</span><strong>87%</strong></div>
                </div>
                <div className="card-progress"><div className="progress-fill" style={{ width: '87%', background: 'var(--accent-blue)' }} /></div>
              </div>

              <div className="class-card-ui">
                <div className="card-top">
                  <h5>Grade 11 Physics</h5>
                  <span className="badge-class">Period 4</span>
                </div>
                <div className="card-detail">
                  <div className="detail-item"><span>Students</span><strong>24</strong></div>
                  <div className="detail-item"><span>Avg Score</span><strong>79%</strong></div>
                </div>
                <div className="card-progress"><div className="progress-fill" style={{ width: '79%', background: 'var(--accent-purple)' }} /></div>
              </div>
            </div>

            {/* AI Assistant chat area */}
            <div className="ai-chat-section">
              <div className="chat-header-small"><Sparkles size={12} /> Ask UniOS Assistant</div>
              <div className="chat-bubble user">Draft a 45-minute lesson outline on electric flux.</div>
              <div className="chat-bubble assistant">
                <strong>Here is your outline:</strong><br/>
                1. Hook (5m): Rub balloon on hair demonstration.<br/>
                2. Concept (15m): Explain flux mathematically with E·A vector formulas.<br/>
                3. Activity (20m): Practice calculation worksheet.<br/>
                4. Wrap-up (5m): Quick conceptual poll.
              </div>
            </div>
          </div>
        </div>
      );

    case 'student':
      return (
        <div className="dash-container">
          <div className="dash-sidebar">
            <div className="dash-logo"><Sparkles size={14} /> UniOS.ai</div>
            <div className="menu-group">
              <div className="menu-item active"><LayoutDashboard size={14} /> Homework</div>
              <div className="menu-item"><Award size={14} /> My Grades</div>
              <div className="menu-item"><Calendar size={14} /> My Timetable</div>
            </div>
            <div className="sidebar-footer">
              <span className="badge">Student View</span>
            </div>
          </div>
          <div className="dash-content">
            <div className="dash-header">
              <h3>Welcome back, Alex!</h3>
              <div className="header-status">
                <span className="points-label">🌟 420 Streak Points</span>
              </div>
            </div>

            <div className="student-tasks">
              <h4>Pending Assignments</h4>
              
              <div className="task-row">
                <div className="task-title">
                  <div className="task-color purple" />
                  <div>
                    <strong>Quantum Mechanics Worksheet</strong>
                    <span>AP Physics - Due tomorrow</span>
                  </div>
                </div>
                <button className="task-btn">Complete</button>
              </div>

              <div className="task-row">
                <div className="task-title">
                  <div className="task-color blue" />
                  <div>
                    <strong>Shakespeare Essay Draft</strong>
                    <span>Literature - Due in 3 days</span>
                  </div>
                </div>
                <button className="task-btn done">Submitted</button>
              </div>
            </div>

            <div className="grades-summary">
              <div className="grade-box"><span>Math</span><strong>A+</strong></div>
              <div className="grade-box"><span>Physics</span><strong>A</strong></div>
              <div className="grade-box"><span>History</span><strong>B+</strong></div>
              <div className="grade-box"><span>Literature</span><strong>A-</strong></div>
            </div>
          </div>
        </div>
      );

    case 'parent':
      return (
        <div className="dash-container">
          <div className="dash-sidebar">
            <div className="dash-logo"><Sparkles size={14} /> UniOS.ai</div>
            <div className="menu-group">
              <div className="menu-item active"><LayoutDashboard size={14} /> Children Portal</div>
              <div className="menu-item"><MessageSquare size={14} /> Teachers</div>
              <div className="menu-item"><ShieldAlert size={14} /> Attendance Records</div>
            </div>
            <div className="sidebar-footer">
              <span className="badge">Parent Portal</span>
            </div>
          </div>
          <div className="dash-content">
            <div className="dash-header">
              <h3>Parent Center — Child: Alex Doe</h3>
              <span className="contact-btn"><MessageSquare size={12} /> Chat with Principal</span>
            </div>

            <div className="gpa-container">
              <div className="gpa-stats">
                <h4>Alex's Cumulative GPA</h4>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>3.86</span>
                  <span style={{ color: 'var(--text-secondary)' }}>/ 4.00</span>
                </div>
              </div>
              <div className="attendance-gauge">
                <h4>Yearly Attendance Rate</h4>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-purple)' }}>98.4%</span>
              </div>
            </div>

            <div className="fee-card">
              <div className="fee-info">
                <strong>Next Installment: $1,250</strong>
                <span>Due Date: July 15, 2026</span>
              </div>
              <button className="pay-btn">Pay Invoice</button>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function LaptopDemo({ activeTab, onTabSelect }) {
  const scrollProgress = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('unios-showcase');
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the showcase section is scrolled relative to view
      const start = rect.top - viewportHeight;
      const total = rect.height + viewportHeight;
      const progress = Math.max(0, Math.min(1, -start / total));
      
      scrollProgress.current = progress;
    };

    const handleMouseMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const tabs = [
    { id: 'admin', label: 'Admin Hub', icon: <LayoutDashboard size={14} /> },
    { id: 'teacher', label: 'Faculty App', icon: <Users size={14} /> },
    { id: 'student', label: 'Student View', icon: <Award size={14} /> },
    { id: 'parent', label: 'Parent Portal', icon: <MessageSquare size={14} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '40px', alignItems: 'center' }}>
      {/* Dynamic Tab Controls */}
      <div 
        style={{
          display: 'inline-flex',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '9999px',
          padding: '6px',
          zIndex: 10
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabSelect(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              background: activeTab === tab.id 
                ? 'linear-gradient(to right, rgba(37, 99, 235, 0.15), rgba(139, 92, 246, 0.15))' 
                : 'transparent',
              color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
              borderBottom: activeTab === tab.id ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
              borderRadius: '9999px',
              padding: '10px 20px',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: activeTab === tab.id ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 0 10px rgba(37,99,235,0.1)' : 'none'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* R3F Canvas Container */}
      <div 
        style={{
          width: '100%',
          maxWidth: '850px',
          height: '460px',
          position: 'relative',
          cursor: 'grab'
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4.3], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.65} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#8b5cf6" />
          
          <Laptop 
            activeTab={activeTab} 
            scrollProgress={scrollProgress} 
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        </Canvas>
      </div>

      {/* Nested stylesheet for the HTML Screen Mockup App */}
      <style>{`
        /* Global screen framing */
        .dashboard-frame {
          width: 1024px;
          height: 640px;
          font-family: 'Inter', system-ui, sans-serif;
          color: #f1f5f9;
          overflow: hidden;
        }

        /* Sidebar Styling */
        .dash-container {
          display: flex;
          height: 100%;
          width: 100%;
          background-color: #07070b;
        }
        
        .dash-sidebar {
          width: 220px;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          background-color: #040407;
        }

        .dash-logo {
          font-weight: 800;
          font-size: 1.15rem;
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
          font-family: 'Sora', sans-serif;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .menu-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          color: #94a3b8;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .menu-item:hover, .menu-item.active {
          background-color: rgba(255, 255, 255, 0.04);
          color: white;
        }

        .menu-item.active {
          border-left: 2px solid #2563eb;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }

        .sidebar-footer {
          margin-top: auto;
        }

        .badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          color: #8b5cf6;
          border: 1px solid rgba(139, 92, 246, 0.2);
          background-color: rgba(139, 92, 246, 0.05);
          padding: 4px 10px;
          border-radius: 999px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Content Area */
        .dash-content {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding-bottom: 16px;
        }

        .dash-header h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: white;
          font-family: 'Sora', sans-serif;
        }

        .header-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #10b981;
          font-weight: 600;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #10b981;
        }

        .dot.pulse {
          box-shadow: 0 0 8px #10b981;
          animation: pulse-dot 1.5s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
        }

        /* Admin Hub stats widgets */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-box {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-box .label {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .stat-box .val {
          font-size: 1.6rem;
          font-weight: 700;
          color: white;
        }

        .stat-box .change {
          font-size: 0.72rem;
          font-weight: 500;
        }

        .stat-box .change.positive { color: #10b981; }
        .stat-box .change.neutral { color: #94a3b8; }

        /* Chart */
        .chart-section {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chart-header h4 {
          font-size: 0.95rem;
          font-weight: 600;
          color: white;
        }

        .chart-legend {
          display: flex;
          gap: 12px;
        }

        .leg {
          font-size: 0.75rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .leg .color {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .leg .color.cyan { background-color: #06b6d4; }
        .leg .color.purple { background-color: #8b5cf6; }

        .bar-chart {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 140px;
          padding-top: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .bar-group {
          display: flex;
          gap: 4px;
          height: 100%;
          align-items: flex-end;
          width: 60px;
          justify-content: center;
          position: relative;
        }

        .bar-group span {
          position: absolute;
          bottom: -22px;
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 500;
        }

        .bar {
          width: 12px;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          transition: height 0.6s ease;
        }

        .bar.cyan {
          background: linear-gradient(to top, #0284c7, #06b6d4);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.15);
        }

        .bar.purple {
          background: linear-gradient(to top, #6d28d9, #8b5cf6);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.15);
        }

        /* Faculty UI details */
        .ai-assistant-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #f59e0b;
          background-color: rgba(245, 158, 11, 0.05);
          border: 1px solid rgba(245, 158, 11, 0.15);
          padding: 4px 10px;
          border-radius: 999px;
        }

        .class-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .class-card-ui {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-top h5 {
          font-size: 1rem;
          font-weight: 600;
          color: white;
        }

        .badge-class {
          font-size: 0.7rem;
          font-weight: 600;
          color: #94a3b8;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background-color: rgba(255, 255, 255, 0.02);
          padding: 2px 8px;
          border-radius: 999px;
        }

        .card-detail {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-item span {
          font-size: 0.75rem;
          color: #64748b;
        }

        .detail-item strong {
          font-size: 1rem;
          color: white;
        }

        .card-progress {
          width: 100%;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.04);
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
        }

        .ai-chat-section {
          background-color: rgba(245, 158, 11, 0.02);
          border: 1px solid rgba(245, 158, 11, 0.06);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .chat-header-small {
          font-size: 0.72rem;
          font-weight: 600;
          color: #f59e0b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chat-bubble {
          font-size: 0.8rem;
          padding: 8px 12px;
          border-radius: 8px;
          max-width: 90%;
        }

        .chat-bubble.user {
          background-color: rgba(255, 255, 255, 0.04);
          color: #f1f5f9;
          align-self: flex-end;
          border-bottom-right-radius: 2px;
        }

        .chat-bubble.assistant {
          background-color: rgba(245, 158, 11, 0.05);
          color: #ffedd5;
          align-self: flex-start;
          border-bottom-left-radius: 2px;
          line-height: 1.4;
        }

        /* Student View detail elements */
        .points-label {
          font-size: 0.8rem;
          color: #f59e0b;
          font-weight: 600;
          background-color: rgba(245, 158, 11, 0.08);
          padding: 4px 10px;
          border-radius: 999px;
        }

        .student-tasks {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .student-tasks h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .task-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          padding: 10px 14px;
        }

        .task-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .task-color {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .task-color.purple { background-color: #8b5cf6; }
        .task-color.blue { background-color: #3b82f6; }

        .task-title div {
          display: flex;
          flex-direction: column;
        }

        .task-title strong {
          font-size: 0.82rem;
          color: white;
        }

        .task-title span {
          font-size: 0.72rem;
          color: #64748b;
        }

        .task-btn {
          border: none;
          background-color: #2563eb;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
        }

        .task-btn.done {
          background-color: rgba(255,255,255,0.05);
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,0.05);
          cursor: not-allowed;
        }

        .grades-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .grade-box {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          padding: 10px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .grade-box span {
          font-size: 0.72rem;
          color: #64748b;
        }

        .grade-box strong {
          font-size: 1.1rem;
          color: white;
        }

        /* Parent Portal Detail elements */
        .contact-btn {
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          background-color: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 6px 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .gpa-container {
          display: flex;
          gap: 16px;
        }

        .gpa-stats, .attendance-gauge {
          flex: 1;
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .gpa-container h4 {
          font-size: 0.85rem;
          font-weight: 600;
          color: #94a3b8;
        }

        .fee-card {
          background-color: rgba(6, 182, 212, 0.02);
          border: 1px solid rgba(6, 182, 212, 0.1);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
        }

        .fee-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .fee-info strong {
          font-size: 0.95rem;
          color: white;
        }

        .fee-info span {
          font-size: 0.75rem;
          color: #06b6d4;
          font-weight: 500;
        }

        .pay-btn {
          border: none;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
