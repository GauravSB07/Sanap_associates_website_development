import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

export const AdminPage = ({ onNavigate }) => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => dataService.isAuthenticated());
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Dynamic Data State
  const [careers, setCareers] = useState(() => dataService.getCareers());
  const [news, setNews] = useState(() => dataService.getNews());
  const [events, setEvents] = useState(() => dataService.getEvents());
  const [firmInfo, setFirmInfo] = useState(() => dataService.getFirmInfo());
  const [inquiries, setInquiries] = useState(() => dataService.getInquiries());
  const [applications, setApplications] = useState(() => dataService.getApplications());

  // Search & Filter State
  const [careerFilter, setCareerFilter] = useState('All');
  const [inquiryFilter, setInquiryFilter] = useState('All');

  // Notification Toast
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Sync with storage events
  useEffect(() => {
    const handleUpdate = () => {
      setIsAuthenticated(dataService.isAuthenticated());
      setCareers(dataService.getCareers());
      setNews(dataService.getNews());
      setEvents(dataService.getEvents());
      setFirmInfo(dataService.getFirmInfo());
      setInquiries(dataService.getInquiries());
      setApplications(dataService.getApplications());
    };

    window.addEventListener('sanap_data_updated', handleUpdate);
    return () => window.removeEventListener('sanap_data_updated', handleUpdate);
  }, []);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = dataService.login(loginForm.username, loginForm.password);
    if (res.success) {
      setIsAuthenticated(true);
      showToast('Welcome to Sanap & Associates Executive Console');
    } else {
      setLoginError(res.message);
    }
  };

  const handleLogout = () => {
    dataService.logout();
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
  };

  // Careers Form State (Add / Edit)
  const [editingCareerId, setEditingCareerId] = useState(null);
  const [careerForm, setCareerForm] = useState({
    title: '',
    department: 'Legal & Regulatory Compliance',
    type: 'Full Time',
    location: 'Mumbai',
    experience: '1-3 Years',
    openings: 1,
    desc: '',
    requirements: '',
    isActive: true
  });
  const [showCareerModal, setShowCareerModal] = useState(false);

  const openNewCareerModal = () => {
    setEditingCareerId(null);
    setCareerForm({
      title: '',
      department: 'Legal & Regulatory Compliance',
      type: 'Full Time',
      location: 'Mumbai',
      experience: '1-3 Years',
      openings: 1,
      desc: '',
      requirements: '',
      isActive: true
    });
    setShowCareerModal(true);
  };

  const openEditCareerModal = (job) => {
    setEditingCareerId(job.id);
    setCareerForm({
      title: job.title || '',
      department: job.department || 'Legal & Regulatory Compliance',
      type: job.type || 'Full Time',
      location: job.location || 'Mumbai',
      experience: job.experience || '1-3 Years',
      openings: job.openings || 1,
      desc: job.desc || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
      isActive: job.isActive !== undefined ? job.isActive : true
    });
    setShowCareerModal(true);
  };

  const handleSaveCareer = (e) => {
    e.preventDefault();
    const reqArray = careerForm.requirements
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);

    const payload = {
      title: careerForm.title.trim(),
      department: careerForm.department,
      type: careerForm.type,
      location: careerForm.location.trim() || 'Mumbai',
      experience: careerForm.experience.trim(),
      openings: parseInt(careerForm.openings, 10) || 1,
      desc: careerForm.desc.trim(),
      requirements: reqArray,
      isActive: careerForm.isActive
    };

    if (editingCareerId) {
      dataService.updateCareer(editingCareerId, payload);
      showToast('Job opening updated successfully');
    } else {
      dataService.addCareer(payload);
      showToast('New job opening published to public website');
    }
    setShowCareerModal(false);
  };

  const handleDeleteCareer = (id, title) => {
    if (window.confirm(`Are you sure you want to remove the job opening "${title}"?`)) {
      dataService.deleteCareer(id);
      showToast('Job opening removed');
    }
  };

  // News Form State (Add / Edit)
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Charity Commissioner',
    date: 'Statutory Directive',
    summary: '',
    details: '',
    tags: 'BPT Act, Compliance'
  });
  const [showNewsModal, setShowNewsModal] = useState(false);

  const openNewNewsModal = () => {
    setEditingNewsId(null);
    setNewsForm({
      title: '',
      category: 'Charity Commissioner',
      date: 'Statutory Directive',
      summary: '',
      details: '',
      tags: 'BPT Act, Compliance'
    });
    setShowNewsModal(true);
  };

  const openEditNewsModal = (item) => {
    setEditingNewsId(item.id);
    setNewsForm({
      title: item.title || '',
      category: item.category || 'Charity Commissioner',
      date: item.date || 'Statutory Directive',
      summary: item.summary || '',
      details: item.details || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || '')
    });
    setShowNewsModal(true);
  };

  const handleSaveNews = (e) => {
    e.preventDefault();
    const tagsArray = newsForm.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const payload = {
      title: newsForm.title.trim(),
      category: newsForm.category,
      date: newsForm.date.trim(),
      summary: newsForm.summary.trim(),
      details: newsForm.details.trim(),
      tags: tagsArray
    };

    if (editingNewsId) {
      dataService.updateNews(editingNewsId, payload);
      showToast('Regulatory circular updated');
    } else {
      dataService.addNews(payload);
      showToast('New regulatory circular published');
    }
    setShowNewsModal(false);
  };

  const handleDeleteNews = (id, title) => {
    if (window.confirm(`Remove circular "${title}"?`)) {
      dataService.deleteNews(id);
      showToast('Circular removed');
    }
  };

  // Events Form State
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    type: 'Masterclass',
    location: 'Mumbai, Maharashtra',
    date: 'Trustee Series',
    desc: '',
    highlights: ''
  });
  const [showEventModal, setShowEventModal] = useState(false);

  const openNewEventModal = () => {
    setEditingEventId(null);
    setEventForm({
      title: '',
      type: 'Masterclass',
      location: 'Mumbai, Maharashtra',
      date: 'Trustee Series',
      desc: '',
      highlights: ''
    });
    setShowEventModal(true);
  };

  const openEditEventModal = (item) => {
    setEditingEventId(item.id);
    setEventForm({
      title: item.title || '',
      type: item.type || 'Masterclass',
      location: item.location || 'Mumbai, Maharashtra',
      date: item.date || 'Trustee Series',
      desc: item.desc || '',
      highlights: Array.isArray(item.highlights) ? item.highlights.join('\n') : (item.highlights || '')
    });
    setShowEventModal(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    const highlightsArray = eventForm.highlights
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);

    const payload = {
      title: eventForm.title.trim(),
      type: eventForm.type,
      location: eventForm.location.trim(),
      date: eventForm.date.trim(),
      desc: eventForm.desc.trim(),
      highlights: highlightsArray
    };

    if (editingEventId) {
      dataService.updateEvent(editingEventId, payload);
      showToast('Event updated');
    } else {
      dataService.addEvent(payload);
      showToast('New event added to calendar');
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = (id, title) => {
    if (window.confirm(`Remove event "${title}"?`)) {
      dataService.deleteEvent(id);
      showToast('Event removed');
    }
  };

  // Firm Info Form State
  const [infoForm, setInfoForm] = useState(firmInfo);

  const handleSaveFirmInfo = (e) => {
    e.preventDefault();
    dataService.saveFirmInfo(infoForm);
    showToast('Firm contact and identity information updated');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to restore factory default firm data? Any custom entries will be reset to the original website baseline.')) {
      dataService.resetAllToDefaults();
      showToast('Factory baseline data restored');
    }
  };

  // Filtered lists
  const filteredCareers = careerFilter === 'All'
    ? careers
    : careerFilter === 'Active'
      ? careers.filter(c => c.isActive)
      : careers.filter(c => !c.isActive);

  const filteredInquiries = inquiryFilter === 'All'
    ? inquiries
    : inquiries.filter(i => i.status === inquiryFilter);

  // ==========================================
  // UN-AUTHENTICATED VIEW: SECURE LOGIN CARD
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-ambient-1"></div>
        <div className="admin-login-ambient-2"></div>

        <div className="admin-login-card text-white">
          <div className="text-center mb-28">
            <div className="admin-brand-logo-frame mb-16 shadow-sm">
              <img 
                src="/images/logo.jpg" 
                alt="Sanap & Associates" 
                className="admin-brand-logo-img"
              />
            </div>
            <h1 className="fs-22 fw-bold text-white mb-6">Firm Administration Console</h1>
            <p className="fs-13 text-white-muted m-0">Authorized Executive &amp; Content Management Gateway</p>
          </div>

          {loginError && (
            <div className="p-12 mb-20 rounded-md bg-danger-subtle text-danger fs-13 d-flex align-items-center gap-10 border border-danger">
              <i className="ri-error-warning-fill fs-18 flex-shrink-0"></i>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="d-flex flex-column gap-18">
            <div>
              <label className="fs-12 text-uppercase fw-bold text-white-muted mb-6 d-block letter-spacing-wider">
                Administrator Username
              </label>
              <div className="position-relative">
                <i className="ri-user-line position-absolute text-gold fs-16" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }}></i>
                <input
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  placeholder="admin"
                  className="form-control-prestige"
                  style={{ paddingLeft: '42px' }}
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="fs-12 text-uppercase fw-bold text-white-muted mb-6 d-block letter-spacing-wider">
                Security Password
              </label>
              <div className="position-relative">
                <i className="ri-lock-line position-absolute text-gold fs-16" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }}></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Admin@123"
                  className="form-control-prestige"
                  style={{ paddingLeft: '42px', paddingRight: '42px' }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="position-absolute border-0 bg-transparent text-white-muted"
                  style={{ right: '14px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                  aria-label="Toggle password visibility"
                >
                  <i className={showPassword ? 'ri-eye-off-line fs-16' : 'ri-eye-line fs-16'}></i>
                </button>
              </div>
            </div>

            <div className="p-12 rounded-md fs-12 text-white-muted" style={{ backgroundColor: 'rgba(197, 164, 103, 0.12)', border: '1px solid rgba(197, 164, 103, 0.25)' }}>
              <div className="d-flex align-items-center gap-6 mb-4 text-gold fw-bold">
                <i className="ri-key-2-fill"></i>
                <span>Standard Test Credentials:</span>
              </div>
              <div>Username: <strong className="text-white">admin</strong> &bull; Password: <strong className="text-white">Admin@123</strong></div>
            </div>

            <button type="submit" className="btn-prestige btn-prestige-gold w-100 py-12 mt-4">
              <span>Sign In to Executive Console</span>
              <i className="ri-arrow-right-line ms-2"></i>
            </button>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => onNavigate?.('home')}
                className="btn-link text-white-muted fs-13 border-0 bg-transparent text-decoration-none d-inline-flex align-items-center gap-6"
              >
                <i className="ri-arrow-left-line"></i>
                <span>Return to Public Website</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED VIEW: MASTER ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="admin-portal-wrapper" data-theme="light">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="admin-toast-banner">
          <i className="ri-checkbox-circle-fill text-gold fs-20"></i>
          <span className="fs-13 fw-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Admin Top Executive Header */}
      <header className="admin-navbar">
        <div className="admin-navbar-inner">
          <div className="d-flex align-items-center gap-14">
            <div className="admin-nav-emblem">
              <img 
                src="/images/logo.jpg" 
                alt="Sanap & Associates" 
              />
            </div>
            <div>
              <div className="d-flex align-items-center gap-10">
                <span className="fs-16 fw-bold text-white">Sanap &amp; Associates</span>
              </div>
              <span className="fs-11 text-white-muted d-block mt-2">Specialist Non-Profit Advisory Firm &bull; LLP No. AAG-6746</span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-12">
            <button
              onClick={() => onNavigate?.('home')}
              className="btn-prestige btn-prestige-ghost btn-sm"
            >
              <i className="ri-external-link-line me-1"></i>
              <span>View Public Site</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="btn-admin-action btn-admin-action-danger"
            >
              <i className="ri-logout-box-r-line"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <div className="admin-dashboard-container">
        <div className="admin-layout-grid">
          
          {/* Left Navigation Sidebar */}
          <aside className="admin-sidebar-pane">
            <div className="admin-sidebar-card">
              
              {/* Profile Card */}
              <div className="admin-user-profile-badge mb-20">
                <div className="avatar-admin-orb">
                  <span>SA</span>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="fs-14 fw-bold text-title m-0">Administrator</h4>
                  </div>
                  <span className="fs-11 text-muted text-truncate d-block mt-2">advisory@sanapassociates.com</span>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="admin-nav-tabs">
                <button
                  type="button"
                  className={`admin-nav-btn ${activeTab === 'overview' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <i className="ri-dashboard-3-line"></i>
                  <span>Dashboard Overview</span>
                </button>

                <button
                  type="button"
                  className={`admin-nav-btn ${activeTab === 'careers' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('careers')}
                >
                  <i className="ri-briefcase-line"></i>
                  <span>Careers &amp; Vacancies</span>
                  <span className="badge-count">{careers.filter(c => c.isActive).length}</span>
                </button>

                <button
                  type="button"
                  className={`admin-nav-btn ${activeTab === 'news' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('news')}
                >
                  <i className="ri-newspaper-line"></i>
                  <span>News &amp; Bulletins</span>
                  <span className="badge-count">{news.length}</span>
                </button>

                <button
                  type="button"
                  className={`admin-nav-btn ${activeTab === 'events' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('events')}
                >
                  <i className="ri-calendar-event-line"></i>
                  <span>Events &amp; Workshops</span>
                  <span className="badge-count">{events.length}</span>
                </button>

                <button
                  type="button"
                  className={`admin-nav-btn ${activeTab === 'inquiries' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('inquiries')}
                >
                  <i className="ri-inbox-line"></i>
                  <span>Client Inquiries</span>
                  <span className="badge-count" style={{ backgroundColor: 'rgba(185, 248, 177, 0.25)', color: 'var(--primary-midnight)' }}>{inquiries.length}</span>
                </button>

                <button
                  type="button"
                  className={`admin-nav-btn ${activeTab === 'applications' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('applications')}
                >
                  <i className="ri-user-shared-line"></i>
                  <span>Candidate Resumes</span>
                  <span className="badge-count">{applications.length}</span>
                </button>

                <button
                  type="button"
                  className={`admin-nav-btn ${activeTab === 'settings' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <i className="ri-settings-4-line"></i>
                  <span>Firm Settings</span>
                </button>
              </nav>

              {/* Maintenance Tools */}
              <div className="mt-24 pt-16 border-top text-center">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="btn-link text-muted fs-12 border-0 bg-transparent text-decoration-none d-inline-flex align-items-center gap-6"
                  title="Reset all dynamic content to original website baseline"
                >
                  <i className="ri-refresh-line"></i>
                  <span>Restore Factory Baseline</span>
                </button>
              </div>

            </div>
          </aside>

          {/* Main Content Workspace */}
          <main className="admin-main-pane">
            
            {/* ================================================= */}
            {/* TAB 1: OVERVIEW */}
            {/* ================================================= */}
            {activeTab === 'overview' && (
              <div className="d-flex flex-column gap-28">
                
                {/* KPI Metrics Grid */}
                <div className="row g-4">
                  <div className="col-sm-6 col-xl-3">
                    <div className="kpi-metric-card">
                      <div className="d-flex align-items-center justify-content-between mb-16">
                        <span className="fs-12 text-muted fw-bold text-uppercase letter-spacing-wider">Job Openings</span>
                        <div className="kpi-icon-orb bg-gold-soft">
                          <i className="ri-briefcase-line"></i>
                        </div>
                      </div>
                      <div className="fs-32 fw-bold text-title mb-4">{careers.filter(c => c.isActive).length}</div>
                      <span className="fs-12 text-muted mt-auto">Out of {careers.length} total listed positions</span>
                    </div>
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <div className="kpi-metric-card">
                      <div className="d-flex align-items-center justify-content-between mb-16">
                        <span className="fs-12 text-muted fw-bold text-uppercase letter-spacing-wider">Regulatory News</span>
                        <div className="kpi-icon-orb bg-teal-soft">
                          <i className="ri-newspaper-line"></i>
                        </div>
                      </div>
                      <div className="fs-32 fw-bold text-title mb-4">{news.length}</div>
                      <span className="fs-12 text-muted mt-auto">Published statutory bulletins</span>
                    </div>
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <div className="kpi-metric-card">
                      <div className="d-flex align-items-center justify-content-between mb-16">
                        <span className="fs-12 text-muted fw-bold text-uppercase letter-spacing-wider">Client Inquiries</span>
                        <div className="kpi-icon-orb bg-blue-soft">
                          <i className="ri-chat-voice-line"></i>
                        </div>
                      </div>
                      <div className="fs-32 fw-bold text-title mb-4">{inquiries.length}</div>
                      <span className="fs-12 text-muted mt-auto">Inbound consultations &amp; callbacks</span>
                    </div>
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <div className="kpi-metric-card">
                      <div className="d-flex align-items-center justify-content-between mb-16">
                        <span className="fs-12 text-muted fw-bold text-uppercase letter-spacing-wider">Job Applicants</span>
                        <div className="kpi-icon-orb bg-purple-soft">
                          <i className="ri-file-user-line"></i>
                        </div>
                      </div>
                      <div className="fs-32 fw-bold text-title mb-4">{applications.length}</div>
                      <span className="fs-12 text-muted mt-auto">Candidate resume submissions</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Command Strip */}
                <div className="admin-card">
                  <div className="d-flex align-items-center justify-content-between mb-20 pb-12 border-bottom">
                    <div>
                      <h3 className="fs-17 fw-bold text-title m-0">Quick Administrative Actions</h3>
                      <p className="fs-13 text-muted m-0 mt-2">Publish announcements, add vacancies, and manage public site content in real time.</p>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-12">
                    <button onClick={openNewCareerModal} className="btn-prestige btn-prestige-gold btn-sm">
                      <i className="ri-add-line me-1"></i> Post New Vacancy
                    </button>
                    <button onClick={openNewNewsModal} className="btn-prestige-midnight btn-sm">
                      <i className="ri-file-add-line me-1"></i> Publish Circular
                    </button>
                    <button onClick={openNewEventModal} className="btn-prestige btn-prestige-outline btn-sm">
                      <i className="ri-calendar-add-line me-1"></i> Schedule Symposium
                    </button>
                    <button onClick={() => setActiveTab('inquiries')} className="btn-prestige btn-prestige-outline btn-sm">
                      <i className="ri-inbox-line me-1"></i> Review Leads ({inquiries.length})
                    </button>
                  </div>
                </div>

                {/* Recent Inquiries Preview Table */}
                <div className="admin-card">
                  <div className="d-flex align-items-center justify-content-between mb-20">
                    <div>
                      <h3 className="fs-17 fw-bold text-title m-0">Recent Client Inquiries</h3>
                      <p className="fs-13 text-muted m-0 mt-2">Latest consultations booked from the website.</p>
                    </div>
                    <button onClick={() => setActiveTab('inquiries')} className="btn-link text-gold fs-13 border-0 bg-transparent fw-bold text-decoration-none d-inline-flex align-items-center gap-4">
                      <span>View All Leads</span>
                      <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>

                  <div className="admin-table-wrapper table-responsive">
                    <table className="admin-table align-middle">
                      <thead>
                        <tr>
                          <th>Client Name</th>
                          <th>Trust / Entity</th>
                          <th>Service Requested</th>
                          <th>Received</th>
                          <th className="text-end">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.slice(0, 5).map((inq) => (
                          <tr key={inq.id}>
                            <td className="fw-bold text-title">{inq.name}</td>
                            <td className="text-muted">{inq.trustName || 'Private NPO'}</td>
                            <td><span className="badge-event-type">{inq.service}</span></td>
                            <td className="text-muted">{inq.submittedAt}</td>
                            <td className="text-end">
                              <span className={`badge-status-pill ${
                                inq.status === 'New' ? 'status-draft' :
                                inq.status === 'Contacted' ? 'status-active' : 'status-active'
                              }`}>
                                {inq.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {inquiries.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center py-28 text-muted">
                              No client inquiries recorded yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ================================================= */}
            {/* TAB 2: CAREERS MANAGER */}
            {/* ================================================= */}
            {activeTab === 'careers' && (
              <div className="d-flex flex-column gap-20">
                
                {/* Header Card */}
                <div className="admin-card d-flex flex-wrap align-items-center justify-content-between gap-16">
                  <div>
                    <h2 className="fs-20 fw-bold text-title m-0">Careers &amp; Vacancies Management</h2>
                    <p className="fs-13 text-muted m-0 mt-2">Publish, edit, or archive job postings displayed on the public Careers portal.</p>
                  </div>

                  <div className="d-flex align-items-center gap-12">
                    <div className="d-flex align-items-center gap-6 p-4 bg-alabaster rounded-md border">
                      {['All', 'Active', 'Archived'].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setCareerFilter(f)}
                          className={`border-0 rounded-sm px-14 py-6 fs-12 fw-semibold transition-all ${careerFilter === f ? 'bg-midnight text-white shadow-sm' : 'bg-transparent text-muted'}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>

                    <button onClick={openNewCareerModal} className="btn-prestige btn-prestige-gold btn-sm">
                      <i className="ri-add-line me-1"></i> Post New Job
                    </button>
                  </div>
                </div>

                {/* Job Cards List */}
                <div className="d-flex flex-column gap-16">
                  {filteredCareers.map((job) => (
                    <div key={job.id} className="admin-data-card">
                      <div className="d-flex flex-wrap align-items-start justify-content-between gap-16 mb-16">
                        <div>
                          <div className="d-flex align-items-center gap-10 mb-8">
                            <h3 className="fs-18 fw-bold text-title m-0">{job.title}</h3>
                            <span className="fs-12 text-muted fw-semibold">
                              ({job.isActive ? 'Active' : 'Archived'})
                            </span>
                          </div>

                          <div className="d-flex flex-wrap align-items-center gap-8 fs-12 text-muted">
                            <span className="p-4 px-10 bg-alabaster rounded-sm border fw-semibold text-title">
                              <i className="ri-folder-line text-gold me-1"></i>{job.department}
                            </span>
                            <span className="p-4 px-10 bg-alabaster rounded-sm border fw-semibold">
                              <i className="ri-time-line text-gold me-1"></i>{job.type}
                            </span>
                            <span className="p-4 px-10 bg-alabaster rounded-sm border fw-semibold">
                              <i className="ri-map-pin-line text-gold me-1"></i>{job.location}
                            </span>
                            <span className="p-4 px-10 bg-alabaster rounded-sm border fw-semibold">
                              <i className="ri-award-line text-gold me-1"></i>Exp: {job.experience}
                            </span>
                            <span className="p-4 px-10 bg-alabaster rounded-sm border fw-bold text-title">
                              <i className="ri-user-star-line text-gold me-1"></i>{job.openings} {job.openings === 1 ? 'Opening' : 'Openings'}
                            </span>
                          </div>
                        </div>

                        {/* Action Toolbar */}
                        <div className="d-flex align-items-center gap-8">
                          <button
                            onClick={() => dataService.toggleCareerStatus(job.id)}
                            className="btn-admin-action"
                            title={job.isActive ? "Hide position" : "Show position"}
                          >
                            <i className={job.isActive ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                            <span>{job.isActive ? 'Hide' : 'Show'}</span>
                          </button>

                          <button
                            onClick={() => openEditCareerModal(job)}
                            className="btn-admin-action btn-admin-action-edit"
                            title="Edit this opening"
                          >
                            <i className="ri-edit-line"></i>
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDeleteCareer(job.id, job.title)}
                            className="btn-admin-action btn-admin-action-danger"
                            title="Delete this opening"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>

                      <p className="fs-13 text-body m-0 line-height-relaxed">{job.desc}</p>

                      {job.requirements && job.requirements.length > 0 && (
                        <div className="mt-14 pt-14 border-top">
                          <span className="fs-12 fw-bold text-muted d-block mb-8">Key Requirements:</span>
                          <div className="d-flex flex-wrap gap-8">
                            {job.requirements.map((req, rIdx) => (
                              <span key={rIdx} className="fs-12 p-4 px-10 bg-alabaster rounded-sm border text-muted">
                                &bull; {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {filteredCareers.length === 0 && (
                    <div className="admin-card text-center py-40 text-muted">
                      <i className="ri-briefcase-line fs-32 text-gold d-block mb-10"></i>
                      <p className="m-0">No job openings found matching filter criteria.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ================================================= */}
            {/* TAB 3: NEWS & BULLETINS */}
            {/* ================================================= */}
            {activeTab === 'news' && (
              <div className="d-flex flex-column gap-20">
                <div className="admin-card d-flex flex-wrap align-items-center justify-content-between gap-16">
                  <div>
                    <h2 className="fs-20 fw-bold text-title m-0">Regulatory Directives &amp; News Bulletins</h2>
                    <p className="fs-13 text-muted m-0 mt-2">Publish compliance circulars, Charity Commissioner alerts, and tax amendments.</p>
                  </div>

                  <button onClick={openNewNewsModal} className="btn-prestige btn-prestige-gold btn-sm">
                    <i className="ri-add-line me-1"></i> Publish Circular
                  </button>
                </div>

                <div className="d-flex flex-column gap-16">
                  {news.map((item) => (
                    <div key={item.id} className="admin-data-card">
                      <div className="d-flex flex-wrap align-items-start justify-content-between gap-14 mb-12">
                        <div>
                          <div className="d-flex align-items-center gap-8 mb-6">
                            <span className="fs-11 fw-bold text-gold text-uppercase letter-spacing-wider p-3 px-8 rounded bg-gold-soft">
                              {item.category}
                            </span>
                            <span className="fs-12 text-muted">&bull; {item.date}</span>
                          </div>
                          <h3 className="fs-18 fw-bold text-title m-0">{item.title}</h3>
                        </div>

                        <div className="d-flex align-items-center gap-8">
                          <button
                            onClick={() => openEditNewsModal(item)}
                            className="btn-admin-action btn-admin-action-edit"
                          >
                            <i className="ri-edit-line"></i>
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteNews(item.id, item.title)}
                            className="btn-admin-action btn-admin-action-danger"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>

                      <p className="fs-13 text-body m-0 line-height-relaxed">{item.summary}</p>

                      {item.tags && item.tags.length > 0 && (
                        <div className="d-flex flex-wrap gap-8 mt-14 pt-12 border-top">
                          {item.tags.map((t, idx) => (
                            <span key={idx} className="fs-11 text-muted p-3 px-8 bg-alabaster rounded-sm border">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================================================= */}
            {/* TAB 4: EVENTS & WORKSHOPS */}
            {/* ================================================= */}
            {activeTab === 'events' && (
              <div className="d-flex flex-column gap-20">
                <div className="admin-card d-flex flex-wrap align-items-center justify-content-between gap-16">
                  <div>
                    <h2 className="fs-20 fw-bold text-title m-0">Events, Masterclasses &amp; Workshops</h2>
                    <p className="fs-13 text-muted m-0 mt-2">Manage trustee training programs, compliance clinics, and symposium schedules.</p>
                  </div>

                  <button onClick={openNewEventModal} className="btn-prestige btn-prestige-gold btn-sm">
                    <i className="ri-add-line me-1"></i> Add New Event
                  </button>
                </div>

                <div className="d-flex flex-column gap-16">
                  {events.map((evt) => (
                    <div key={evt.id} className="admin-data-card">
                      <div className="d-flex flex-wrap align-items-start justify-content-between gap-14 mb-12">
                        <div>
                          <div className="d-flex align-items-center gap-8 mb-6">
                            <span className="fs-11 fw-bold text-gold text-uppercase letter-spacing-wider p-3 px-8 rounded bg-gold-soft">
                              {evt.type}
                            </span>
                            <span className="fs-12 text-muted">&bull;</span>
                            <span className="fs-12 text-muted"><i className="ri-map-pin-line text-gold me-1"></i>{evt.location}</span>
                            <span className="fs-12 text-muted">&bull;</span>
                            <span className="fs-12 text-muted"><i className="ri-calendar-line text-gold me-1"></i>{evt.date}</span>
                          </div>
                          <h3 className="fs-18 fw-bold text-title m-0">{evt.title}</h3>
                        </div>

                        <div className="d-flex align-items-center gap-8">
                          <button
                            onClick={() => openEditEventModal(evt)}
                            className="btn-admin-action btn-admin-action-edit"
                          >
                            <i className="ri-edit-line"></i>
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id, evt.title)}
                            className="btn-admin-action btn-admin-action-danger"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>

                      <p className="fs-13 text-body m-0 line-height-relaxed">{evt.desc}</p>

                      {evt.highlights && evt.highlights.length > 0 && (
                        <div className="mt-14 pt-12 border-top">
                          <span className="fs-12 fw-bold text-muted d-block mb-6">Program Highlights:</span>
                          <div className="d-flex flex-wrap gap-8">
                            {evt.highlights.map((h, hIdx) => (
                              <span key={hIdx} className="fs-12 p-3 px-10 bg-alabaster rounded-sm border text-muted">
                                <i className="ri-check-line text-gold me-1"></i> {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================================================= */}
            {/* TAB 5: CLIENT INQUIRIES & LEADS */}
            {/* ================================================= */}
            {activeTab === 'inquiries' && (
              <div className="d-flex flex-column gap-20">
                <div className="admin-card d-flex flex-wrap align-items-center justify-content-between gap-16">
                  <div>
                    <h2 className="fs-20 fw-bold text-title m-0">Inbound Client Inquiries &amp; Consultations</h2>
                    <p className="fs-13 text-muted m-0 mt-2">Direct consultation bookings submitted from the public website in real time.</p>
                  </div>

                  <div className="d-flex align-items-center gap-8">
                    <span className="fs-12 text-muted fw-bold">Filter Status:</span>
                    <select
                      value={inquiryFilter}
                      onChange={(e) => setInquiryFilter(e.target.value)}
                      className="admin-input admin-select fs-12 fw-semibold"
                      style={{ width: '150px' }}
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex flex-column gap-16">
                  {filteredInquiries.map((inq) => (
                    <div key={inq.id} className="admin-data-card">
                      <div className="d-flex flex-wrap align-items-start justify-content-between gap-16 mb-14">
                        <div>
                          <div className="d-flex align-items-center gap-10 mb-6">
                            <h3 className="fs-18 fw-bold text-title m-0">{inq.name}</h3>
                            <span className="fs-12 text-gold fw-bold">({inq.trustName || 'Private Trust / Body'})</span>
                            <span className="fs-11 text-muted">&bull; {inq.submittedAt}</span>
                          </div>

                          <div className="d-flex flex-wrap align-items-center gap-16 fs-13 text-muted">
                            <span>
                              <i className="ri-phone-line text-gold me-1"></i>
                              <a href={`tel:${inq.phone}`} className="text-title fw-bold text-decoration-none">{inq.phone}</a>
                            </span>
                            <span>&bull;</span>
                            <span>
                              <i className="ri-mail-line text-gold me-1"></i>
                              <a href={`mailto:${inq.email}`} className="text-title text-decoration-none">{inq.email}</a>
                            </span>
                          </div>
                        </div>

                        {/* Status selector & delete */}
                        <div className="d-flex align-items-center gap-10">
                          <select
                            value={inq.status}
                            onChange={(e) => {
                              dataService.updateInquiryStatus(inq.id, e.target.value);
                              showToast(`Lead marked as ${e.target.value}`);
                            }}
                            className="admin-input admin-select fs-12 fw-semibold"
                            style={{ width: '160px' }}
                          >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete inquiry from ${inq.name}?`)) {
                                dataService.deleteInquiry(inq.id);
                                showToast('Inquiry removed');
                              }
                            }}
                            className="btn-admin-action btn-admin-action-danger"
                            title="Remove lead"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>

                      {/* Detail Box */}
                      <div className="p-16 bg-alabaster rounded-md border fs-13 mt-14">
                        <div className="mb-8">
                          <strong className="text-title">Service Requested:</strong>
                          <span className="ms-2 badge-event-type">{inq.service}</span>
                        </div>
                        {inq.message && (
                          <div>
                            <strong className="text-title d-block mb-3">Client Brief:</strong>
                            <p className="m-0 text-body fst-italic">"{inq.message}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredInquiries.length === 0 && (
                    <div className="admin-card text-center py-40 text-muted">
                      <i className="ri-inbox-line fs-32 text-gold d-block mb-10"></i>
                      <p className="m-0">No client consultation leads match current view.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================================================= */}
            {/* TAB 6: JOB APPLICATIONS */}
            {/* ================================================= */}
            {activeTab === 'applications' && (
              <div className="d-flex flex-column gap-20">
                <div className="admin-card">
                  <h2 className="fs-20 fw-bold text-title m-0">Candidate Resume Submissions</h2>
                  <p className="fs-13 text-muted m-0 mt-2">Applications submitted directly through the online Careers page.</p>
                </div>

                <div className="d-flex flex-column gap-16">
                  {applications.map((app) => (
                    <div key={app.id} className="admin-data-card">
                      <div className="d-flex flex-wrap align-items-start justify-content-between gap-16 mb-14">
                        <div>
                          <div className="d-flex align-items-center gap-10 mb-6">
                            <h3 className="fs-18 fw-bold text-title m-0">{app.name}</h3>
                            <span className="fs-12 text-gold fw-bold">&bull; Applied for: {app.role}</span>
                            <span className="fs-11 text-muted">&bull; {app.submittedAt}</span>
                          </div>

                          <div className="d-flex flex-wrap align-items-center gap-16 fs-13 text-muted">
                            <span><i className="ri-phone-line text-gold me-1"></i>{app.phone}</span>
                            <span>&bull;</span>
                            <span><i className="ri-mail-line text-gold me-1"></i>{app.email}</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-10">
                          <select
                            value={app.status}
                            onChange={(e) => {
                              dataService.updateApplicationStatus(app.id, e.target.value);
                              showToast(`Candidate status: ${e.target.value}`);
                            }}
                            className="admin-input admin-select fs-12 fw-semibold"
                            style={{ width: '190px' }}
                          >
                            <option value="New Application">New Application</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Rejected">Rejected</option>
                          </select>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete candidate ${app.name}?`)) {
                                dataService.deleteApplication(app.id);
                                showToast('Application removed');
                              }
                            }}
                            className="btn-admin-action btn-admin-action-danger"
                            title="Delete candidate"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>

                      <div className="p-16 bg-alabaster rounded-md border fs-13 mt-14">
                        <div className="mb-8">
                          <strong className="text-title">Academic &amp; Professional Background:</strong>
                          <span className="ms-2">{app.qualification}</span>
                        </div>
                        {app.message && (
                          <div>
                            <strong className="text-title d-block mb-3">Candidate Cover Statement:</strong>
                            <p className="m-0 text-body fst-italic">"{app.message}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {applications.length === 0 && (
                    <div className="admin-card text-center py-40 text-muted">
                      <i className="ri-user-shared-line fs-32 text-gold d-block mb-10"></i>
                      <p className="m-0">No candidate submissions recorded yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================================================= */}
            {/* TAB 7: FIRM INFO & SETTINGS */}
            {/* ================================================= */}
            {activeTab === 'settings' && (
              <div className="d-flex flex-column gap-20">
                <div className="admin-card">
                  <h2 className="fs-20 fw-bold text-title m-0">Firm Identity &amp; Contact Configurations</h2>
                  <p className="fs-13 text-muted m-0 mt-2">Changes saved here automatically update the header, footer, hero, and advisory desk across the entire website.</p>
                </div>

                <form onSubmit={handleSaveFirmInfo} className="d-flex flex-column gap-20">
                  
                  {/* Card 1: Legal Brand Identity */}
                  <div className="admin-card">
                    <h3 className="fs-16 fw-bold text-title mb-16 pb-10 border-bottom d-flex align-items-center gap-8">
                      <i className="ri-shield-check-line text-gold"></i>
                      <span>Legal Identity &amp; Registration</span>
                    </h3>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="fs-12 text-uppercase fw-bold text-muted mb-6 d-block letter-spacing-wider">Firm Registered Name *</label>
                        <input
                          type="text"
                          value={infoForm.name}
                          onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                          className="admin-input"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="fs-12 text-uppercase fw-bold text-muted mb-6 d-block letter-spacing-wider">LLP Registration / License No. *</label>
                        <input
                          type="text"
                          value={infoForm.llpNo}
                          onChange={(e) => setInfoForm({ ...infoForm, llpNo: e.target.value })}
                          className="admin-input"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Communication Channels */}
                  <div className="admin-card">
                    <h3 className="fs-16 fw-bold text-title mb-16 pb-10 border-bottom d-flex align-items-center gap-8">
                      <i className="ri-phone-line text-gold"></i>
                      <span>Official Advisory Channels</span>
                    </h3>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="fs-12 text-uppercase fw-bold text-muted mb-6 d-block letter-spacing-wider">Primary Telephone Hotline *</label>
                        <input
                          type="text"
                          value={infoForm.phonePrimary}
                          onChange={(e) => setInfoForm({ ...infoForm, phonePrimary: e.target.value })}
                          className="admin-input"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="fs-12 text-uppercase fw-bold text-muted mb-6 d-block letter-spacing-wider">Executive Direct Mobile *</label>
                        <input
                          type="text"
                          value={infoForm.phoneMobile}
                          onChange={(e) => setInfoForm({ ...infoForm, phoneMobile: e.target.value })}
                          className="admin-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="row g-3 mt-1">
                      <div className="col-md-6">
                        <label className="fs-12 text-uppercase fw-bold text-muted mb-6 d-block letter-spacing-wider">Official Correspondence Email *</label>
                        <input
                          type="email"
                          value={infoForm.emailPrimary}
                          onChange={(e) => setInfoForm({ ...infoForm, emailPrimary: e.target.value })}
                          className="admin-input"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="fs-12 text-uppercase fw-bold text-muted mb-6 d-block letter-spacing-wider">Advisory Operating Schedule *</label>
                        <input
                          type="text"
                          value={infoForm.officeHours}
                          onChange={(e) => setInfoForm({ ...infoForm, officeHours: e.target.value })}
                          className="admin-input"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Address & Site Notices */}
                  <div className="admin-card">
                    <h3 className="fs-16 fw-bold text-title mb-16 pb-10 border-bottom d-flex align-items-center gap-8">
                      <i className="ri-map-pin-line text-gold"></i>
                      <span>Headquarters &amp; Site Notices</span>
                    </h3>

                    <div className="mb-16">
                      <label className="fs-12 text-uppercase fw-bold text-muted mb-6 d-block letter-spacing-wider">Registered Office Address *</label>
                      <input
                        type="text"
                        value={infoForm.address}
                        onChange={(e) => setInfoForm({ ...infoForm, address: e.target.value })}
                        className="admin-input"
                        required
                      />
                    </div>

                    <div>
                      <label className="fs-12 text-uppercase fw-bold text-muted mb-6 d-block letter-spacing-wider">Public Announcement Banner (Optional)</label>
                      <input
                        type="text"
                        value={infoForm.announcementBanner}
                        onChange={(e) => setInfoForm({ ...infoForm, announcementBanner: e.target.value })}
                        placeholder="Leave blank to disable banner on public site"
                        className="admin-input"
                      />
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-12">
                    <button type="submit" className="btn-prestige btn-prestige-gold px-28 py-12">
                      <i className="ri-save-line me-2"></i> Save Changes to Website
                    </button>
                  </div>

                </form>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* ================================================= */}
      {/* MODAL: ADD / EDIT CAREER OPENING */}
      {/* ================================================= */}
      {showCareerModal && (
        <div className="prestige-modal-overlay" onClick={() => setShowCareerModal(false)}>
          <div className="prestige-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-dismiss-btn" onClick={() => setShowCareerModal(false)} aria-label="Close modal">
              <i className="ri-close-line"></i>
            </button>
            
            <h3 className="fs-20 fw-bold text-title mb-4 pb-12 border-bottom">
              {editingCareerId ? 'Edit Job Opening' : 'Post New Job Opening'}
            </h3>
            <p className="fs-13 text-muted mb-20">Job listings appear immediately on the public Careers portal.</p>

            <form onSubmit={handleSaveCareer} className="d-flex flex-column gap-16">
              <div className="row g-3">
                <div className="col-md-7">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    value={careerForm.title}
                    onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                    placeholder="e.g. Senior NPO Tax Associate"
                    className="admin-input"
                  />
                </div>
                <div className="col-md-5">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Employment Type</label>
                  <select
                    value={careerForm.type}
                    onChange={(e) => setCareerForm({ ...careerForm, type: e.target.value })}
                    className="admin-input admin-select"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contractual">Contractual</option>
                  </select>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Department</label>
                  <input
                    type="text"
                    value={careerForm.department}
                    onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div className="col-md-3">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Experience</label>
                  <input
                    type="text"
                    value={careerForm.experience}
                    onChange={(e) => setCareerForm({ ...careerForm, experience: e.target.value })}
                    placeholder="1-3 Years"
                    className="admin-input"
                  />
                </div>
                <div className="col-md-3">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Openings</label>
                  <input
                    type="number"
                    min="1"
                    value={careerForm.openings}
                    onChange={(e) => setCareerForm({ ...careerForm, openings: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="fs-12 fw-bold text-muted mb-6 d-block">Role Description *</label>
                <textarea
                  required
                  rows="3"
                  value={careerForm.desc}
                  onChange={(e) => setCareerForm({ ...careerForm, desc: e.target.value })}
                  placeholder="Overview of day-to-day statutory responsibilities..."
                  className="admin-input"
                ></textarea>
              </div>

              <div>
                <label className="fs-12 fw-bold text-muted mb-6 d-block">Key Requirements (One line per bullet)</label>
                <textarea
                  rows="3"
                  value={careerForm.requirements}
                  onChange={(e) => setCareerForm({ ...careerForm, requirements: e.target.value })}
                  placeholder="LL.B or CA Inter qualified&#10;In-depth knowledge of Bombay Public Trust Act&#10;Experience in Charity Commissioner liaison"
                  className="admin-input"
                ></textarea>
              </div>

              <div className="p-12 bg-alabaster rounded border">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="isActiveCheck"
                    checked={careerForm.isActive}
                    onChange={(e) => setCareerForm({ ...careerForm, isActive: e.target.checked })}
                    className="form-check-input"
                  />
                  <label htmlFor="isActiveCheck" className="form-check-label fs-13 text-title fw-bold">
                    Active (Visible on public Careers page)
                  </label>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-10 mt-10 pt-14 border-top">
                <button type="button" onClick={() => setShowCareerModal(false)} className="btn-prestige btn-prestige-outline btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn-prestige btn-prestige-gold btn-sm px-24">
                  {editingCareerId ? 'Save Changes' : 'Publish Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MODAL: ADD / EDIT NEWS CIRCULAR */}
      {/* ================================================= */}
      {showNewsModal && (
        <div className="prestige-modal-overlay" onClick={() => setShowNewsModal(false)}>
          <div className="prestige-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-dismiss-btn" onClick={() => setShowNewsModal(false)} aria-label="Close modal">
              <i className="ri-close-line"></i>
            </button>
            
            <h3 className="fs-20 fw-bold text-title mb-4 pb-12 border-bottom">
              {editingNewsId ? 'Edit Regulatory Bulletin' : 'Publish Regulatory Directive'}
            </h3>
            <p className="fs-13 text-muted mb-20">Notices are broadcasted on the News and Bulletins portal.</p>

            <form onSubmit={handleSaveNews} className="d-flex flex-column gap-16">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Regulatory Category *</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="admin-input admin-select"
                  >
                    <option value="Charity Commissioner">Charity Commissioner</option>
                    <option value="Direct Tax & 12A/80G">Direct Tax &amp; 12A/80G</option>
                    <option value="FCRA Directives">FCRA Directives</option>
                    <option value="CSR Governance">CSR Governance</option>
                    <option value="Trust Governance">Trust Governance</option>
                    <option value="GST & Indirect Tax">GST &amp; Indirect Tax</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Directive Tag / Date *</label>
                  <input
                    type="text"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    placeholder="e.g. CBDT Circular / October 2026"
                    className="admin-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="fs-12 fw-bold text-muted mb-6 d-block">Circular Headline *</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="Official headline of the statutory directive..."
                  className="admin-input"
                />
              </div>

              <div>
                <label className="fs-12 fw-bold text-muted mb-6 d-block">Executive Summary *</label>
                <textarea
                  required
                  rows="3"
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  placeholder="Concise overview of the regulatory amendment..."
                  className="admin-input"
                ></textarea>
              </div>

              <div>
                <label className="fs-12 fw-bold text-muted mb-6 d-block">Compliance Scope / Actionable Steps</label>
                <textarea
                  rows="3"
                  value={newsForm.details}
                  onChange={(e) => setNewsForm({ ...newsForm, details: e.target.value })}
                  placeholder="Detailed instructions for managing trustees and accountants..."
                  className="admin-input"
                ></textarea>
              </div>

              <div>
                <label className="fs-12 fw-bold text-muted mb-6 d-block">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={newsForm.tags}
                  onChange={(e) => setNewsForm({ ...newsForm, tags: e.target.value })}
                  placeholder="BPT Act, Form 10B, Section 50A"
                  className="admin-input"
                />
              </div>

              <div className="d-flex justify-content-end gap-10 mt-10 pt-14 border-top">
                <button type="button" onClick={() => setShowNewsModal(false)} className="btn-prestige btn-prestige-outline btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn-prestige btn-prestige-gold btn-sm px-24">
                  {editingNewsId ? 'Save Changes' : 'Publish Circular'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MODAL: ADD / EDIT EVENT */}
      {/* ================================================= */}
      {showEventModal && (
        <div className="prestige-modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="prestige-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-dismiss-btn" onClick={() => setShowEventModal(false)} aria-label="Close modal">
              <i className="ri-close-line"></i>
            </button>
            
            <h3 className="fs-20 fw-bold text-title mb-4 pb-12 border-bottom">
              {editingEventId ? 'Edit Event @ S&A' : 'Schedule New Event'}
            </h3>
            <p className="fs-13 text-muted mb-20">Events appear on the Events &amp; Symposiums schedule.</p>

            <form onSubmit={handleSaveEvent} className="d-flex flex-column gap-16">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Event Type</label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                    className="admin-input admin-select"
                  >
                    <option value="Masterclass">Masterclass</option>
                    <option value="Tax Workshop">Tax Workshop</option>
                    <option value="Social Impact">Social Impact</option>
                    <option value="Corporate Colloquium">Corporate Colloquium</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Date / Schedule Tag</label>
                  <input
                    type="text"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    placeholder="e.g. Trustee Series / November 2026"
                    className="admin-input"
                    required
                  />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-8">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div className="col-md-4">
                  <label className="fs-12 fw-bold text-muted mb-6 d-block">Location *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="fs-12 fw-bold text-muted mb-6 d-block">Description *</label>
                <textarea
                  required
                  rows="3"
                  value={eventForm.desc}
                  onChange={(e) => setEventForm({ ...eventForm, desc: e.target.value })}
                  className="admin-input"
                ></textarea>
              </div>

              <div>
                <label className="fs-12 fw-bold text-muted mb-6 d-block">Key Highlights (One line per point)</label>
                <textarea
                  rows="3"
                  value={eventForm.highlights}
                  onChange={(e) => setEventForm({ ...eventForm, highlights: e.target.value })}
                  placeholder="150+ Trustees in attendance&#10;Charity Commissioner procedural walkthrough"
                  className="admin-input"
                ></textarea>
              </div>

              <div className="d-flex justify-content-end gap-10 mt-10 pt-14 border-top">
                <button type="button" onClick={() => setShowEventModal(false)} className="btn-prestige btn-prestige-outline btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn-prestige btn-prestige-gold btn-sm px-24">
                  {editingEventId ? 'Save Changes' : 'Schedule Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;
