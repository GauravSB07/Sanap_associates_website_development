import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';
import { dataService } from '../services/dataService';

export const CareersPage = ({ onNavigate }) => {
  const [openings, setOpenings] = useState(() => dataService.getCareers());
  const [selectedRole, setSelectedRole] = useState(null);
  const [applicant, setApplicant] = useState({ name: '', email: '', phone: '', qualification: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setOpenings(dataService.getCareers());
    };
    window.addEventListener('sanap_data_updated', handleUpdate);
    return () => window.removeEventListener('sanap_data_updated', handleUpdate);
  }, []);

  const activeOpenings = openings.filter(j => j.isActive);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Record application in data store for admin review
    dataService.addApplication({
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      qualification: applicant.qualification,
      message: applicant.message,
      role: selectedRole || 'General Practice Application'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedRole(null);
      setApplicant({ name: '', email: '', phone: '', qualification: '', message: '' });
    }, 4000);
  };

  return (
    <div className="subpage-wrapper">
      {/* Editorial Page Header Banner */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate?.('home'); }} className="crumb-link">Home</a>
              <span className="crumb-separator">/</span>
              <span className="crumb-current">Careers</span>
            </div>
            <h1 className="page-banner-title">Careers at Sanap &amp; Associates</h1>
            <p className="page-banner-desc">
              Join a multidisciplinary practice committed to excellence in legal, taxation, and non-profit governance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="page-content-section section-padding bg-alabaster" data-theme="light">
        <div className="container">

          <div className="row g-4 justify-content-center">
            {/* Left Column: Job Openings */}
            <div className="col-lg-7">
              <div className="mb-32 reveal-up">
                <div className="section-badge-tag mb-10">
                  <i className="ri-briefcase-line me-1"></i> Current Vacancies
                </div>
                <h2 className="fs-24 fw-bold text-title mb-8">Professional Openings</h2>
                <p className="fs-14 text-muted mb-24">
                  Explore opportunities across legal drafting, statutory auditing, direct taxation, and client administration.
                </p>

                <div className="d-flex flex-column gap-16">
                  {activeOpenings.map((job, idx) => (
                    <div 
                      key={idx} 
                      className={`career-listing-card p-24 bg-white border-card rounded-md ${selectedRole === job.title ? 'is-selected' : ''}`}
                    >
                      <div className="d-flex align-items-center justify-content-between mb-8">
                        <div>
                          <h3 className="fs-18 fw-bold text-title m-0">{job.title}</h3>
                          <span className="fs-12 text-muted fw-bold">{job.type}</span>
                        </div>
                        <button
                          type="button"
                          className="btn-prestige-outline btn-sm"
                          onClick={() => {
                            setSelectedRole(job.title);
                            document.getElementById('application-form-block')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {selectedRole === job.title ? 'Selected' : 'Apply Now'}
                        </button>
                      </div>
                      <p className="fs-14 text-body m-0 line-height-relaxed">{job.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Mail Strip */}
              <div className="p-20 bg-white border-card rounded-md text-center reveal-up">
                <span className="fs-14 text-muted">
                  Looking for direct internship or resume submission? Send your CV directly to{' '}
                  <a href={`mailto:${siteData.contact.email}`} className="text-gold fw-bold">
                    {siteData.contact.email}
                  </a>
                </span>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="col-lg-5" id="application-form-block">
              <div className="career-form-card p-32 bg-white border-card rounded-md sticky-top-form reveal-up">
                {submitted ? (
                  <div className="text-center py-40">
                    <div className="success-icon-orb mb-20 mx-auto">
                      <i className="ri-checkbox-circle-fill"></i>
                    </div>
                    <h3 className="fs-20 fw-bold text-title mb-8">Application Submitted</h3>
                    <p className="fs-14 text-body mb-20">
                      Thank you, <strong>{applicant.name}</strong>. Our human resources desk has received your application for <strong>{selectedRole || 'a career position'}</strong> and will contact you shortly.
                    </p>
                    <span className="fs-12 text-muted d-block">
                      Official Careers Desk • {siteData.contact.email}
                    </span>
                  </div>
                ) : (
                  <div>
                    <h3 className="fs-20 fw-bold text-title mb-6">Submit Your Application</h3>
                    <p className="fs-13 text-muted mb-20">
                      {selectedRole ? `Applying for: ${selectedRole}` : 'Select an opening or apply generally'}
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="form-field-group mb-14">
                        <label className="field-label">Target Role *</label>
                        <select 
                          className="field-input"
                          value={selectedRole || ''}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          required
                        >
                          <option value="">Select a Position</option>
                          {openings.map((op, idx) => (
                            <option key={idx} value={op.title}>{op.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-field-group mb-14">
                        <label className="field-label">Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          className="field-input" 
                          placeholder="Your Full Name"
                          value={applicant.name}
                          onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                        />
                      </div>

                      <div className="form-field-group mb-14">
                        <label className="field-label">Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          className="field-input" 
                          placeholder="you@email.com"
                          value={applicant.email}
                          onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                        />
                      </div>

                      <div className="form-field-group mb-14">
                        <label className="field-label">Phone Number *</label>
                        <input 
                          type="tel" 
                          required 
                          className="field-input" 
                          placeholder="+91 XXXXX XXXXX"
                          value={applicant.phone}
                          onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                        />
                      </div>

                      <div className="form-field-group mb-14">
                        <label className="field-label">Highest Qualification</label>
                        <input 
                          type="text" 
                          className="field-input" 
                          placeholder="e.g. CA Inter, B.Com, LLB, MBA"
                          value={applicant.qualification}
                          onChange={(e) => setApplicant({ ...applicant, qualification: e.target.value })}
                        />
                      </div>

                      <div className="form-field-group mb-20">
                        <label className="field-label">Cover Note / Key Experience</label>
                        <textarea 
                          rows="3" 
                          className="field-textarea" 
                          placeholder="Briefly mention relevant experience or software skills (Tally, MCA portal)..."
                          value={applicant.message}
                          onChange={(e) => setApplicant({ ...applicant, message: e.target.value })}
                        ></textarea>
                      </div>

                      <button type="submit" className="btn-prestige btn-prestige-gold w-100">
                        <span>Send Application</span>
                        <i className="ri-arrow-right-line ms-1"></i>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default CareersPage;
