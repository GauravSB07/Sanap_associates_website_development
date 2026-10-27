import React, { useState } from 'react';
import { siteData } from '../data/content';

export const CareersModal = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [applicant, setApplicant] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const openings = [
    {
      title: "Co-ordinator",
      type: "Full Time • Mumbai",
      desc: "Client liaison, documentation coordination, and portal communication. Requires fluency in English, Hindi & Marathi, team spirit, and computer proficiency."
    },
    {
      title: "CA Intern / Articled Assistant",
      type: "Internship • Mumbai",
      desc: "Direct tax filings, BPT Act schedules, statutory audit procedures, 10B/10BB documentation, and GST compliance under senior partners."
    },
    {
      title: "Accountant",
      type: "Full Time • Mumbai",
      desc: "Tally ERP & Prime bookkeeping, bank reconciliations, GST return preparation, and annual non-profit statement compilation."
    },
    {
      title: "Legal Executive / Research Associate",
      type: "Full Time • Mumbai",
      desc: "Bombay Public Trust Act compliance, change report drafting, charity commissioner case liaison, and statutory deed drafting."
    },
    {
      title: "Receptionist & Front Desk Executive",
      type: "Full Time • Mumbai",
      desc: "Welcoming visitors, managing executive correspondence, scheduling trustee meetings, and incoming advisory calls."
    }
  ];

  const handleApply = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedRole(null);
      onClose();
    }, 2800);
  };

  return (
    <div className="prestige-modal-overlay" onClick={onClose}>
      <div 
        className="prestige-modal-card max-w-720" 
        onClick={(e) => e.stopPropagation()}
        data-theme="light"
      >
        <button 
          className="modal-dismiss-btn" 
          onClick={onClose} 
          aria-label="Close careers modal"
        >
          <i className="ri-close-line"></i>
        </button>

        {submitted ? (
          <div className="modal-success-state text-center py-40">
            <div className="success-icon-orb mb-20">
              <i className="ri-checkbox-circle-fill"></i>
            </div>
            <h3 className="fs-22 fw-bold text-title mb-10">Application Received</h3>
            <p className="text-body fs-15 mb-24 max-w-450 mx-auto">
              Thank you, <strong>{applicant.name}</strong>. Our human resources desk at Sanap &amp; Associates has received your interest for <strong>{selectedRole || 'a career position'}</strong> and will get in touch shortly.
            </p>
            <div className="success-footer-badge">
              <i className="ri-mail-check-line text-gold me-2"></i>
              <span>Careers Desk • careers@sanapassociates.com</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="modal-form-header mb-24">
              <div className="section-badge-tag mb-10">
                <i className="ri-briefcase-line me-1"></i> Professional Growth &amp; Careers
              </div>
              <h2 className="modal-title-text mb-6">Careers at Sanap &amp; Associates</h2>
              <p className="text-muted fs-14 mb-0">
                Join India's premier advisory practice specializing in non-profit governance, taxation, and statutory jurisprudence.
              </p>
            </div>

            {selectedRole ? (
              <form onSubmit={handleApply}>
                <div className="p-16 mb-20 bg-alabaster rounded-sm border-subtle d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-muted text-uppercase fw-bold">Applying for:</span>
                    <h4 className="m-0 fs-16 text-title">{selectedRole}</h4>
                  </div>
                  <button 
                    type="button" 
                    className="btn-link text-gold fs-13 fw-bold"
                    onClick={() => setSelectedRole(null)}
                  >
                    Change Position
                  </button>
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

                <div className="row g-3 mb-14">
                  <div className="col-sm-6">
                    <div className="form-field-group">
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
                  </div>
                  <div className="col-sm-6">
                    <div className="form-field-group">
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
                  </div>
                </div>

                <div className="form-field-group mb-20">
                  <label className="field-label">Brief Background / Qualifications</label>
                  <textarea 
                    rows="3" 
                    className="field-textarea" 
                    placeholder="Mention your relevant experience, degrees, or CA inter status..."
                    value={applicant.message}
                    onChange={(e) => setApplicant({ ...applicant, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="d-flex align-items-center justify-content-between gap-12">
                  <button 
                    type="button" 
                    className="btn-prestige-outline" 
                    onClick={() => setSelectedRole(null)}
                  >
                    Back to Openings
                  </button>
                  <button type="submit" className="btn-prestige btn-prestige-gold">
                    <span>Submit Application</span>
                    <i className="ri-arrow-right-line ms-1"></i>
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="openings-list d-flex flex-column gap-12 mb-24">
                  {openings.map((job, idx) => (
                    <div key={idx} className="career-opening-card p-18 border-card rounded-md bg-white">
                      <div className="d-flex align-items-center justify-content-between mb-8">
                        <div>
                          <h4 className="fs-16 fw-bold text-title m-0">{job.title}</h4>
                          <span className="fs-12 text-muted">{job.type}</span>
                        </div>
                        <button 
                          type="button" 
                          className="btn-prestige-outline btn-sm"
                          onClick={() => setSelectedRole(job.title)}
                        >
                          Apply Now
                        </button>
                      </div>
                      <p className="fs-13 text-body m-0">{job.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-14 bg-alabaster rounded-sm border-subtle text-center">
                  <span className="fs-13 text-muted">
                    Looking for direct resume submission? Email directly to{' '}
                    <a href={`mailto:${siteData.contact.email}`} className="text-gold fw-bold">
                      {siteData.contact.email}
                    </a>
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersModal;
