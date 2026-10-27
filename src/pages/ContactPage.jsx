import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';
import { dataService } from '../services/dataService';

export const ContactPage = ({ onNavigate }) => {
  const [firmInfo, setFirmInfo] = useState(() => dataService.getFirmInfo());
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setFirmInfo(dataService.getFirmInfo());
    };
    window.addEventListener('sanap_data_updated', handleUpdate);
    return () => window.removeEventListener('sanap_data_updated', handleUpdate);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dataService.addInquiry({
      name: formData.firstName,
      email: formData.email,
      phone: formData.phone,
      service: formData.subject || 'General Contact Desk Inquiry',
      message: formData.message,
      type: 'Contact Desk Message'
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ firstName: '', email: '', phone: '', subject: '', message: '' });
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
              <span className="crumb-current">Contact Us</span>
            </div>
            <h1 className="page-banner-title">Contact Us</h1>
            <p className="page-banner-desc">
              Call our office at any time or visit our headquarters in Borivali East, Mumbai.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="page-content-section section-padding bg-alabaster" data-theme="light">
        <div className="container">

          <div className="row g-4">
            {/* Left Column: Contact Information & Location */}
            <div className="col-lg-5">
              <div className="contact-info-panel p-32 bg-white border-card rounded-md h-100 reveal-up">
                <h2 className="fs-22 fw-bold text-title mb-20">Contact Information</h2>

                {/* Address */}
                <div className="d-flex align-items-start gap-14 mb-24">
                  <div className="contact-icon-orb flex-shrink-0">
                    <i className="ri-map-pin-2-line text-gold fs-20"></i>
                  </div>
                  <div>
                    <span className="fs-12 text-muted fw-bold text-uppercase d-block mb-4">Company Address</span>
                    <p className="fs-14 text-body m-0 line-height-relaxed">
                      {firmInfo.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="d-flex align-items-start gap-14 mb-24">
                  <div className="contact-icon-orb flex-shrink-0">
                    <i className="ri-phone-line text-gold fs-20"></i>
                  </div>
                  <div>
                    <span className="fs-12 text-muted fw-bold text-uppercase d-block mb-4">Call Us Now</span>
                    <div className="fs-14 fw-bold text-title">
                      <a href={`tel:${firmInfo.phonePrimary.replace(/[^0-9+]/g, '')}`} className="text-title me-3">
                        {firmInfo.phonePrimary}
                      </a>
                      <a href={`tel:${firmInfo.phoneMobile.replace(/[^0-9+]/g, '')}`} className="text-gold">
                        {firmInfo.phoneMobile}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="d-flex align-items-start gap-14 mb-24">
                  <div className="contact-icon-orb flex-shrink-0">
                    <i className="ri-mail-line text-gold fs-20"></i>
                  </div>
                  <div>
                    <span className="fs-12 text-muted fw-bold text-uppercase d-block mb-4">Email Us</span>
                    <div className="fs-14">
                      <a href={`mailto:${firmInfo.emailPrimary}`} className="text-title d-block">
                        {firmInfo.emailPrimary}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="d-flex align-items-start gap-14 mb-28">
                  <div className="contact-icon-orb flex-shrink-0">
                    <i className="ri-time-line text-gold fs-20"></i>
                  </div>
                  <div>
                    <span className="fs-12 text-muted fw-bold text-uppercase d-block mb-4">Office Hours</span>
                    <p className="fs-14 text-body m-0">
                      {firmInfo.officeHours}
                    </p>
                  </div>
                </div>

                {/* Google Maps Embed representation */}
                <div className="contact-map-frame rounded-sm overflow-hidden border-subtle">
                  <iframe 
                    title="Sanap & Associates Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1883.5657568273998!2d72.86502115822691!3d19.2330993467495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0cfc417db03%3A0x85487eb14103f241!2sShree+Krishna+Hospital!5e0!3m2!1sen!2sin!4v1524132357982" 
                    width="100%" 
                    height="190" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                  ></iframe>
                </div>

              </div>
            </div>

            {/* Right Column: Feedback & Inquiry Form */}
            <div className="col-lg-7">
              <div className="contact-form-card p-32 bg-white border-card rounded-md h-100 reveal-up">
                {submitted ? (
                  <div className="text-center py-40">
                    <div className="success-icon-orb mb-20 mx-auto">
                      <i className="ri-checkbox-circle-fill"></i>
                    </div>
                    <h3 className="fs-22 fw-bold text-title mb-10">Message Received</h3>
                    <p className="fs-15 text-body max-w-450 mx-auto mb-20">
                      Thank you, <strong>{formData.firstName}</strong>. Your inquiry has been routed to our advisory desk. One of our associates will contact you within 24 business hours.
                    </p>
                    <span className="fs-13 text-muted">
                      Direct Support • 022-2828009 / +91-9594002606
                    </span>
                  </div>
                ) : (
                  <div>
                    <h2 className="fs-22 fw-bold text-title mb-6">Send an Inquiry / Feedback</h2>
                    <p className="fs-14 text-muted mb-24">
                      Fill out the form below to connect directly with our advisory, audit, or legal teams.
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="row g-3 mb-16">
                        <div className="col-sm-6">
                          <div className="form-field-group">
                            <label className="field-label">First Name *</label>
                            <input 
                              type="text" 
                              required 
                              className="field-input" 
                              placeholder="Your Name"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-field-group">
                            <label className="field-label">Email Address *</label>
                            <input 
                              type="email" 
                              required 
                              className="field-input" 
                              placeholder="you@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row g-3 mb-16">
                        <div className="col-sm-6">
                          <div className="form-field-group">
                            <label className="field-label">Phone Number *</label>
                            <input 
                              type="tel" 
                              required 
                              className="field-input" 
                              placeholder="+91 XXXXX XXXXX"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-field-group">
                            <label className="field-label">Subject</label>
                            <input 
                              type="text" 
                              className="field-input" 
                              placeholder="e.g. Trust Audit, GST, 12A/80G, RERA"
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-field-group mb-24">
                        <label className="field-label">Message / Details *</label>
                        <textarea 
                          rows="4" 
                          required 
                          className="field-textarea" 
                          placeholder="Please describe your requirements, questions, or the statutory assistance needed..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                      </div>

                      <button type="submit" className="btn-prestige btn-prestige-gold w-100">
                        <span>Send Message</span>
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

export default ContactPage;
