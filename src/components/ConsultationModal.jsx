import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';

export const ConsultationModal = ({ isOpen, onClose, initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    trustName: '',
    email: '',
    phone: '',
    service: initialService || 'Registration & Certification',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <i className="ri-close-line"></i>
        </button>

        {submitted ? (
          <div className="text-center py-40">
            <div className="w-60 h-60 bg_secondary rounded-circle d-inline-flex align-items-center justify-content-center mb-20 text_primary fs-32">
              <i className="ri-checkbox-circle-fill"></i>
            </div>
            <h3 className="fs-24 mb-10 text-title">Consultation Confirmed</h3>
            <p className="text-para fs-16 mb-0">
              Thank you, {formData.name}. Our senior NPO advisory consultant will connect with you via phone/email within 24 business hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-25">
              <span className="badge bg_secondary text_primary px-3 py-1 rounded-pill mb-10 d-inline-block font-secondary fw-bold" style={{ fontSize: '11px', letterSpacing: '0.08em' }}>
                DIRECT STATUTORY ADVISORY
              </span>
              <h2 className="fs-28 text-title mb-8">Schedule A Free Consultation</h2>
              <p className="text-para fs-15 mb-0">
                Discuss 12A/80G approvals, Form 10B/10BB audits, FCRA compliances, or Charity Commissioner proceedings directly with our expert team.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-20">
                  <label className="fs-13 fw-bold text-title mb-6 d-block">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    className="form-control"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D9D9D9' }}
                  />
                </div>

                <div className="col-md-6 mb-20">
                  <label className="fs-13 fw-bold text-title mb-6 d-block">Trust / Foundation Name</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="e.g. Vidya Welfare Trust"
                    value={formData.trustName}
                    onChange={(e) => setFormData({ ...formData, trustName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D9D9D9' }}
                  />
                </div>

                <div className="col-md-6 mb-20">
                  <label className="fs-13 fw-bold text-title mb-6 d-block">Official Email *</label>
                  <input 
                    type="email" 
                    required
                    className="form-control"
                    placeholder="name@foundation.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D9D9D9' }}
                  />
                </div>

                <div className="col-md-6 mb-20">
                  <label className="fs-13 fw-bold text-title mb-6 d-block">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D9D9D9' }}
                  />
                </div>

                <div className="col-12 mb-20">
                  <label className="fs-13 fw-bold text-title mb-6 d-block">Service Area of Interest</label>
                  <select 
                    className="form-control"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D9D9D9', cursor: 'pointer' }}
                  >
                    <option value="Registration & Certification">Registration & Certification (12A, 80G, FCRA, CSR-1)</option>
                    <option value="Audit & Taxation">Audit & Taxation (Form 10B/10BB, ITR-7, Exemption)</option>
                    <option value="Legal & Governance">Legal & Governance (Charity Comm. Schedule III, Sec 36)</option>
                    <option value="Accounting & Advisory">Accounting & Advisory (Grants, Donor Reporting)</option>
                    <option value="Compliance Retainers">Comprehensive NPO Compliance Retainer</option>
                    <option value="Custom Advisory">Other Custom Regulatory Requirement</option>
                  </select>
                </div>

                <div className="col-12 mb-25">
                  <label className="fs-13 fw-bold text-title mb-6 d-block">Brief Query / Details</label>
                  <textarea 
                    rows="3"
                    className="form-control"
                    placeholder="Mention any specific filing deadline or statutory issue..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D9D9D9', resize: 'none' }}
                  ></textarea>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn style-one w-100 justify-content-between">
                    <span className="btn-icon-one"><i className="ri-calendar-check-line"></i></span>
                    <span className="btn-text">Confirm Consultation Request</span>
                    <span className="btn-icon-two"><i className="ri-calendar-check-line"></i></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
