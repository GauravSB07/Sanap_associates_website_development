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
    }, 3000);
  };

  // Flatten all services for dropdown selection
  const allServicesList = siteData.services.categories.flatMap(c => c.items);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <i className="ri-close-line"></i>
        </button>

        {submitted ? (
          <div className="text-center py-40">
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '20px' }}>
              <i className="ri-checkbox-circle-fill"></i>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-title)', marginBottom: '10px' }}>Consultation Scheduled</h3>
            <p style={{ color: 'var(--color-body)', fontSize: '0.95rem', margin: 0 }}>
              Thank you, {formData.name}. A Sanap & Associates LLP compliance advisor will reach out to you within 24 business hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-24">
              <div className="section-tag section-tag-primary mb-12">
                NPO Advisory & Statutory Support
              </div>
              <h2 style={{ fontSize: '1.65rem', color: 'var(--color-title)', marginBottom: '8px' }}>
                Schedule a Consultation
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', margin: 0 }}>
                Direct consultation for Public Trusts, Societies, Section-8 Companies, and CSR Foundations.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name / Trustee Name *</label>
                <input 
                  type="text" 
                  required
                  className="form-control"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Trust / Foundation Name</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="e.g. Charitable Trust Name"
                  value={formData.trustName}
                  onChange={(e) => setFormData({ ...formData, trustName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label>Official Email *</label>
                  <input 
                    type="email" 
                    required
                    className="form-control"
                    placeholder="name@trust.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Contact Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Select Statutory Service of Interest</label>
                <select 
                  className="form-control"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  style={{ cursor: 'pointer' }}
                >
                  {allServicesList.map((srv, idx) => (
                    <option key={idx} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Brief Query or Filing Deadline</label>
                <textarea 
                  rows="3"
                  className="form-control"
                  placeholder="Mention any pending audit, change report, 12A/80G status, or statutory urgency..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ resize: 'none' }}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-16">
                <span>Confirm Consultation Request</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
