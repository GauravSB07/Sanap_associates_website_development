import React, { useState } from 'react';
import { siteData } from '../data/content';

export const Contact = () => {
  const { contact } = siteData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Registration & Certification',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Registration & Certification',
        message: ''
      });
    }, 5000);
  };

  return (
    <section id="contact" className="contact-area style-one">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Column: Heading and Address block */}
          <div className="col-xl-6 col-md-5 mb-40 mb-md-0">
            <div className="d-flex flex-column justify-content-between h-100">
              <div>
                <h2 className="section-title style-two fw-semibold mb-35 text_primary">
                  <span className="position-relative z-1">Get In Touch</span> For A Free Consultation
                </h2>

                <p className="fs-18 text_primary opacity-85 mb-30">
                  Have a question regarding 12A/80G re-validation, FCRA annual filings, Form 10B/10BB statutory audits, or Charity Commissioner change reports? Connect with our team of specialists today.
                </p>
              </div>

              <div>
                <div className="contact-address style-one">
                  <div className="contact-icon">
                    <i className="ri-map-pin-line"></i>
                  </div>
                  <div>
                    <span className="fs-13 text-uppercase fw-bold text-dusty d-block">Registered Office [Editable Placeholder]</span>
                    <p className="mb-0">{contact.address}</p>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-20 mt-30">
                  <a href={`tel:${contact.phonePrimary.replace(/[^0-9+]/g, '')}`} className="fw-bold text_primary fs-18">
                    <i className="ri-phone-line me-2"></i> {contact.phonePrimary}
                  </a>
                  <a href={`mailto:${contact.email}`} className="fw-bold text_primary fs-18">
                    <i className="ri-mail-line me-2"></i> {contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="col-xl-6 col-md-7 ps-xxl-4">
            <div className="bg-white p-40 round-20 shadow-sm">
              
              {submitted ? (
                <div className="text-center py-40">
                  <div className="w-60 h-60 bg_secondary rounded-circle d-inline-flex align-items-center justify-content-center mb-20 text_primary fs-32">
                    <i className="ri-checkbox-circle-line"></i>
                  </div>
                  <h3 className="fs-24 mb-10 text-title">Consultation Request Received!</h3>
                  <p className="text-para fs-16 mb-0">
                    Thank you, {formData.name || 'valued partner'}. Our NPO compliance lead will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form style-one">
                  <div className="row">
                    
                    <div className="col-md-6">
                      <div className="form-group mb-25">
                        <input 
                          type="text" 
                          required
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-25">
                        <input 
                          type="email" 
                          required
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-25">
                        <input 
                          type="tel" 
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-25">
                        <select 
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          style={{ cursor: 'pointer' }}
                        >
                          <option value="Registration & Certification">Registration & Certification (12A/80G, FCRA)</option>
                          <option value="Audit & Taxation">Audit & Taxation (Form 10B/10BB, ITR-7)</option>
                          <option value="Legal & Governance">Legal & Governance (Charity Comm. / Sched. III)</option>
                          <option value="Accounting & Advisory">Accounting & Advisory (Grants, CSR-1)</option>
                          <option value="Other Consultation">Other / General Statutory Advisory</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mb-30">
                        <textarea 
                          rows="4"
                          placeholder="Briefly describe your Trust/NPO compliance query..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn style-three w-100 justify-content-between" style={{ backgroundColor: 'var(--primaryColor)' }}>
                        <span className="btn-icon-one">
                          <i className="ri-send-plane-fill"></i>
                        </span>
                        <span className="btn-text" style={{ color: 'var(--whiteColor)' }}>
                          Send Message / Request Consultation
                        </span>
                        <span className="btn-icon-two">
                          <i className="ri-send-plane-fill"></i>
                        </span>
                      </button>
                    </div>

                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
