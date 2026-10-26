import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';

export const ConsultationModal = ({ isOpen, onClose, initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    trustName: '',
    email: '',
    phone: '',
    service: initialService || 'Trust Registration (BPT Act / Trust Deed Drafting / Online Filing)',
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
    }, 3200);
  };

  // Flatten all services for dropdown selection
  const allServicesList = siteData.services.categories.flatMap(c => c.items);

  return (
    <div className="prestige-modal-overlay" onClick={onClose}>
      <div 
        className="prestige-modal-card" 
        onClick={(e) => e.stopPropagation()}
        data-theme="light"
      >
        <button 
          className="modal-dismiss-btn" 
          onClick={onClose} 
          aria-label="Close consultation modal"
        >
          <i className="ri-close-line"></i>
        </button>

        {submitted ? (
          <div className="modal-success-state text-center py-40">
            <div className="success-icon-orb mb-20">
              <i className="ri-checkbox-circle-fill"></i>
            </div>
            <h3 className="fs-22 fw-bold text-title mb-10">
              Statutory Consultation Scheduled
            </h3>
            <p className="text-body fs-15 mb-24 max-w-450 mx-auto">
              Thank you, <strong className="text-dark">{formData.name}</strong>. A dedicated compliance associate from <strong className="text-dark">Sanap &amp; Associates LLP</strong> will review your entity's requirements and connect with you within 24 business hours.
            </p>
            <div className="success-footer-badge">
              <i className="ri-shield-check-fill text-gold me-2"></i>
              <span>Confidential Non-Profit Legal &amp; Compliance Advisory</span>
            </div>
          </div>
        ) : (
          <div className="modal-form-content">
            <div className="modal-form-header mb-28">
              <div className="section-badge-tag mb-12">
                <i className="ri-scales-3-line me-1"></i> Non-Profit Advisory Desk
              </div>
              <h2 className="modal-title-text mb-8">
                Schedule a Consultation
              </h2>
              <p className="modal-subtitle-text text-muted mb-0">
                Direct statutory advisory for Public Trusts, Societies, Section-8 Companies, and CSR Foundations across India.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-field-group mb-16">
                <label className="field-label">Trustee / Representative Full Name *</label>
                <input 
                  type="text" 
                  required
                  className="field-input"
                  placeholder="e.g. Adv. Rajesh Sharma / Trustee"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-field-group mb-16">
                <label className="field-label">Trust / Foundation / Section-8 Entity Name</label>
                <input 
                  type="text" 
                  className="field-input"
                  placeholder="e.g. Saraswati Charitable Trust"
                  value={formData.trustName}
                  onChange={(e) => setFormData({ ...formData, trustName: e.target.value })}
                />
              </div>

              <div className="row g-3 mb-16">
                <div className="col-md-6">
                  <div className="form-field-group">
                    <label className="field-label">Official Email Address *</label>
                    <input 
                      type="email" 
                      required
                      className="field-input"
                      placeholder="trustee@foundation.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-field-group">
                    <label className="field-label">Contact Telephone Number *</label>
                    <input 
                      type="tel" 
                      required
                      className="field-input"
                      placeholder="+91 98200 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-field-group mb-16">
                <label className="field-label">Primary Statutory Matter of Interest</label>
                <select 
                  className="field-select"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  {allServicesList.map((srv, idx) => (
                    <option key={idx} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field-group mb-24">
                <label className="field-label">Brief Specifics / Pending Statutory Urgency</label>
                <textarea 
                  rows="3"
                  className="field-textarea"
                  placeholder="Specify any upcoming charity commissioner hearings, pending 12A/80G renewals, trustee change reports, or audit queries..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-prestige btn-prestige-gold w-100"
                data-cursor-text="Submit"
              >
                <span>Confirm Advisory Consultation</span>
                <i className="ri-arrow-right-line ms-2"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;
