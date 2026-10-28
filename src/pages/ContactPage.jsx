
import React, { useEffect, useRef, useState } from 'react';
import { dataService } from '../services/dataService';

export const ContactPage = ({ onNavigate }) => {
  const [firmInfo, setFirmInfo] = useState(() => dataService.getFirmInfo());
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);

  const pageRef = useRef(null);
  const hasUserScrolled = useRef(false);
  const submitTimer = useRef(null);

  useEffect(() => {
    const handleUpdate = () => {
      setFirmInfo(dataService.getFirmInfo());
    };

    window.addEventListener('sanap_data_updated', handleUpdate);

    return () => {
      window.removeEventListener('sanap_data_updated', handleUpdate);
    };
  }, []);

  // Reveal each information/form item only after the user starts scrolling.
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    let animationFrame = null;

    const revealVisibleItems = () => {
      if (!hasUserScrolled.current) return;

      const items = page.querySelectorAll('.contact-reveal');

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const isInViewport =
          rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

        if (isInViewport) {
          const itemId = item.dataset.contactRevealId;

          if (itemId) {
            setVisibleItems((previous) =>
              previous.includes(itemId) ? previous : [...previous, itemId]
            );
          }
        }
      });
    };

    const handleScroll = () => {
      hasUserScrolled.current = true;

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(revealVisibleItems);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (submitTimer.current) {
        window.clearTimeout(submitTimer.current);
      }
    };
  }, []);

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dataService.addInquiry({
      name: formData.firstName,
      email: formData.email,
      phone: formData.phone,
      service: formData.subject || 'General Contact Desk Inquiry',
      message: formData.message,
      type: 'Contact Desk Message',
    });

    setSubmitted(true);

    if (submitTimer.current) {
      window.clearTimeout(submitTimer.current);
    }

    submitTimer.current = window.setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      submitTimer.current = null;
    }, 4000);
  };

  const revealClass = (id) =>
    `contact-reveal ${visibleItems.includes(id) ? 'is-visible' : ''}`;

  return (
    <div className="subpage-wrapper contact-page" ref={pageRef}>
      {/* Hero banner — consistent with the other subpages */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a
                href="#/"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate?.('home');
                }}
                className="crumb-link"
              >
                Home
              </a>

              <span className="crumb-separator">/</span>
              <span className="crumb-current">Contact Us</span>
            </div>


            <h1 className="page-banner-title">
              Contact <span className="title-accent-gold">Us.</span>
            </h1>
            <p className="page-banner-desc">
              Call our office or visit our headquarters in Borivali East,
              Mumbai.
            </p>
          </div>
        </div>
      </section>

      {/* Contact information and inquiry form */}
      <section
        className="page-content-section section-padding bg-alabaster"
        data-theme="light"
      >
        <div className="container">
          <div className="row g-4 contact-layout">
            {/* Contact information */}
            <div className="col-lg-5">
              <div className="contact-info-panel p-32 bg-white border-card rounded-md h-100">
                <h2
                  className={`${revealClass('info-heading')} fs-22 fw-bold text-title mb-24`}
                  data-contact-reveal-id="info-heading"
                >
                  Contact Information
                </h2>

                {/* Address */}
                <div
                  className={`${revealClass('info-address')} d-flex align-items-start gap-14 mb-24`}
                  data-contact-reveal-id="info-address"
                >
                  <div className="contact-icon-orb flex-shrink-0">
                    <i className="ri-map-pin-2-line text-gold fs-20" />
                  </div>

                  <div className="contact-detail-content">
                    <span className="fs-12 text-muted fw-bold text-uppercase d-block mb-4">
                      Company Address
                    </span>

                    <p className="fs-14 text-body m-0 line-height-relaxed">
                      {firmInfo.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div
                  className={`${revealClass('info-phone')} d-flex align-items-start gap-14 mb-24`}
                  data-contact-reveal-id="info-phone"
                >
                  <div className="contact-icon-orb flex-shrink-0">
                    <i className="ri-phone-line text-gold fs-20" />
                  </div>

                  <div className="contact-detail-content">
                    <span className="fs-12 text-muted fw-bold text-uppercase d-block mb-4">
                      Call Us Now
                    </span>

                    <div className="fs-14 fw-bold text-title contact-phone-links">
                      <a
                        href={`tel:${(firmInfo.phonePrimary || '').replace(/[^0-9+]/g, '')}`}
                        className="text-title"
                      >
                        {firmInfo.phonePrimary}
                      </a>

                      <a
                        href={`tel:${(firmInfo.phoneMobile || '').replace(/[^0-9+]/g, '')}`}
                        className="text-gold"
                      >
                        {firmInfo.phoneMobile}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div
                  className={`${revealClass('info-email')} d-flex align-items-start gap-14 mb-24`}
                  data-contact-reveal-id="info-email"
                >
                  <div className="contact-icon-orb flex-shrink-0">
                    <i className="ri-mail-line text-gold fs-20" />
                  </div>

                  <div className="contact-detail-content">
                    <span className="fs-12 text-muted fw-bold text-uppercase d-block mb-4">
                      Email Us
                    </span>

                    <a
                      href={`mailto:${firmInfo.emailPrimary}`}
                      className="text-title fs-14 contact-email-link"
                    >
                      {firmInfo.emailPrimary}
                    </a>
                  </div>
                </div>

                {/* Office hours */}
                <div
                  className={`${revealClass('info-hours')} d-flex align-items-start gap-14 mb-28`}
                  data-contact-reveal-id="info-hours"
                >
                  <div className="contact-icon-orb flex-shrink-0">
                    <i className="ri-time-line text-gold fs-20" />
                  </div>

                  <div className="contact-detail-content">
                    <span className="fs-12 text-muted fw-bold text-uppercase d-block mb-4">
                      Office Hours
                    </span>

                    <p className="fs-14 text-body m-0">
                      {firmInfo.officeHours}
                    </p>
                  </div>
                </div>

                {/* Google Maps */}
                <div
                  className={`${revealClass('info-map')} contact-map-frame rounded-sm overflow-hidden border-subtle`}
                  data-contact-reveal-id="info-map"
                >
                  <iframe
                    title="Sanap & Associates Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1883.5657568273998!2d72.86502115822691!3d19.2330993467495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0cfc417db03%3A0x85487eb14103f241!2sShree+Krishna+Hospital!5e0!3m2!1sen!2sin!4v1524132357982"
                    width="100%"
                    height="190"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Inquiry form */}
            <div className="col-lg-7">
              <div className="contact-form-card p-32 bg-white border-card rounded-md h-100">
                {submitted ? (
                  <div className="text-center py-40">
                    <div
                      className={`${revealClass('form-success-icon')} success-icon-orb mb-20 mx-auto`}
                      data-contact-reveal-id="form-success-icon"
                    >
                      <i className="ri-checkbox-circle-fill" />
                    </div>

                    <h3
                      className={`${revealClass('form-success-heading')} fs-22 fw-bold text-title mb-10`}
                      data-contact-reveal-id="form-success-heading"
                    >
                      Message Received
                    </h3>

                    <p
                      className={`${revealClass('form-success-message')} fs-15 text-body max-w-450 mx-auto mb-20`}
                      data-contact-reveal-id="form-success-message"
                    >
                      Thank you, <strong>{formData.firstName}</strong>. Your
                      inquiry has been routed to our advisory desk. One of our
                      associates will contact you within 24 business hours.
                    </p>

                    <span
                      className={`${revealClass('form-success-support')} fs-13 text-muted`}
                      data-contact-reveal-id="form-success-support"
                    >
                      Direct Support • 022-2828009 / +91-9594002606
                    </span>
                  </div>
                ) : (
                  <div>
                    <h2
                      className={`${revealClass('form-heading')} fs-22 fw-bold text-title mb-6`}
                      data-contact-reveal-id="form-heading"
                    >
                      Send an Inquiry / Feedback
                    </h2>

                    <p
                      className={`${revealClass('form-intro')} fs-14 text-muted mb-24`}
                      data-contact-reveal-id="form-intro"
                    >
                      Fill out the form below to connect directly with our
                      advisory, audit, or legal teams.
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="row g-3 mb-16">
                        <div className="col-sm-6">
                          <div
                            className={`${revealClass('form-first-name')} form-field-group`}
                            data-contact-reveal-id="form-first-name"
                          >
                            <label className="field-label" htmlFor="contact-first-name">
                              First Name *
                            </label>

                            <input
                              id="contact-first-name"
                              type="text"
                              required
                              autoComplete="given-name"
                              className="field-input"
                              placeholder="Your Name"
                              value={formData.firstName}
                              onChange={(event) =>
                                updateField('firstName', event.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div
                            className={`${revealClass('form-email')} form-field-group`}
                            data-contact-reveal-id="form-email"
                          >
                            <label className="field-label" htmlFor="contact-email">
                              Email Address *
                            </label>

                            <input
                              id="contact-email"
                              type="email"
                              required
                              autoComplete="email"
                              className="field-input"
                              placeholder="you@email.com"
                              value={formData.email}
                              onChange={(event) =>
                                updateField('email', event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row g-3 mb-16">
                        <div className="col-sm-6">
                          <div
                            className={`${revealClass('form-phone')} form-field-group`}
                            data-contact-reveal-id="form-phone"
                          >
                            <label className="field-label" htmlFor="contact-phone">
                              Phone Number *
                            </label>

                            <input
                              id="contact-phone"
                              type="tel"
                              required
                              autoComplete="tel"
                              className="field-input"
                              placeholder="+91 XXXXX XXXXX"
                              value={formData.phone}
                              onChange={(event) =>
                                updateField('phone', event.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div
                            className={`${revealClass('form-subject')} form-field-group`}
                            data-contact-reveal-id="form-subject"
                          >
                            <label className="field-label" htmlFor="contact-subject">
                              Subject
                            </label>

                            <input
                              id="contact-subject"
                              type="text"
                              className="field-input"
                              placeholder="e.g. Trust Audit, GST, 12A/80G, RERA"
                              value={formData.subject}
                              onChange={(event) =>
                                updateField('subject', event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${revealClass('form-message')} form-field-group mb-24`}
                        data-contact-reveal-id="form-message"
                      >
                        <label className="field-label" htmlFor="contact-message">
                          Message / Details *
                        </label>

                        <textarea
                          id="contact-message"
                          rows="4"
                          required
                          className="field-textarea"
                          placeholder="Please describe your requirements, questions, or the statutory assistance needed..."
                          value={formData.message}
                          onChange={(event) =>
                            updateField('message', event.target.value)
                          }
                        />
                      </div>

                      <div
                        className={revealClass('form-submit')}
                        data-contact-reveal-id="form-submit"
                      >
                        <button
                          type="submit"
                          className="btn-prestige btn-prestige-gold w-100"
                        >
                          <span>Send Message</span>
                          <i className="ri-arrow-right-line ms-1" />
                        </button>
                      </div>
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
