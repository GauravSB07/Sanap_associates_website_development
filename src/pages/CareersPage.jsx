
import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';
import { dataService } from '../services/dataService';

export const CareersPage = ({ onNavigate }) => {
  const [openings, setOpenings] = useState(() => dataService.getCareers());
  const [selectedRole, setSelectedRole] = useState(null);
  const [applicant, setApplicant] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setOpenings(dataService.getCareers());
    };

    window.addEventListener('sanap_data_updated', handleUpdate);
    return () => window.removeEventListener('sanap_data_updated', handleUpdate);
  }, []);

  const activeOpenings = openings.filter((job) => job.isActive);

  // Reveal job cards sequentially as the user scrolls.
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll('.careers-page .career-listing-card')
    );

    if (!cards.length) return;

    let cancelled = false;
    let observer;
    let activeTimer;
    let nextCardIndex = 0;

    const visibleCards = new Set();

    const revealNextCard = () => {
      if (cancelled || nextCardIndex >= cards.length) return;

      const index = nextCardIndex;
      const card = cards[index];

      if (!visibleCards.has(card)) return;

      card.classList.add('is-visible');
      nextCardIndex += 1;

      // Allow the current card and its content to finish before revealing the next.
      activeTimer = window.setTimeout(() => {
        if (cancelled) return;
        revealNextCard();
      }, 1050);
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleCards.add(entry.target);
              observer.unobserve(entry.target);
            }
          });

          revealNextCard();
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -35px 0px'
        }
      );

      cards.forEach((card) => observer.observe(card));
    } else {
      cards.forEach((card) => card.classList.add('is-visible'));
    }

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (activeTimer) window.clearTimeout(activeTimer);
      cards.forEach((card) => card.classList.remove('is-visible'));
    };
  }, [activeOpenings.length]);

  // Reveal the application form when it enters the viewport.
  useEffect(() => {
    const formCard = document.querySelector(
      '.careers-page .career-form-reveal'
    );

    if (!formCard) return;

    if (!('IntersectionObserver' in window)) {
      formCard.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          formCard.classList.add('is-visible');
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -25px 0px'
      }
    );

    observer.observe(formCard);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

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
      setApplicant({
        name: '',
        email: '',
        phone: '',
        qualification: '',
        message: ''
      });
    }, 4000);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);

    document
      .getElementById('application-form-block')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="subpage-wrapper careers-page">
      {/* Hero Banner */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('home');
                }}
                className="crumb-link"
              >
                Home
              </a>

              <span className="crumb-separator">/</span>
              <span className="crumb-current">Careers</span>
            </div>

            <h1 className="page-banner-title">
              Careers at{' '}
              <span className="title-accent-gold">
                Sanap &amp; Associates
              </span>
            </h1>

            <p className="page-banner-desc">
              Join a multidisciplinary practice committed to excellence in
              legal, taxation, and non-profit governance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section
        className="page-content-section section-padding bg-alabaster"
        data-theme="light"
      >
        <div className="container">
          <div className="row g-4 justify-content-center">
            {/* Job Openings */}
            <div className="col-lg-7">
              <div className="career-openings-heading mb-32">
                <span className="career-section-eyebrow">
                  <i className="ri-briefcase-line"></i>
                  JOIN OUR TEAM
                </span>

                <h2 className="career-openings-title">
                  Professional <span>Openings</span>
                </h2>

                <p className="career-openings-description">
                  Explore opportunities across legal drafting, statutory
                  auditing, direct taxation, and client administration.
                </p>

                <div className="career-heading-rule">
                  <span></span>
                </div>
              </div>

              <div className="career-listings">
                {activeOpenings.length > 0 ? (
                  activeOpenings.map((job, idx) => (
                    <article
                      key={job.id ?? job.title ?? idx}
                      className={`career-listing-card p-24 bg-white border-card rounded-md ${
                        selectedRole === job.title ? 'is-selected' : ''
                      }`}
                    >
                      <div className="career-card-content">
                        <div className="career-card-top">
                          <div className="career-card-heading">
                            <span className="career-card-number">
                              {String(idx + 1).padStart(2, '0')}
                            </span>

                            <div>
                              <h3 className="fs-18 fw-bold text-title m-0">
                                {job.title}
                              </h3>

                              <span className="fs-12 text-muted fw-bold career-job-type">
                                {job.type}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn-prestige-outline btn-sm career-apply-button"
                            onClick={() => handleRoleSelect(job.title)}
                          >
                            {selectedRole === job.title
                              ? 'Selected'
                              : 'Apply Now'}
                            <i className="ri-arrow-right-line ms-1"></i>
                          </button>
                        </div>

                        <p className="fs-14 text-body m-0 line-height-relaxed career-job-description">
                          {job.desc}
                        </p>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="career-empty-state">
                    <i className="ri-briefcase-3-line"></i>
                    <h3>No Current Openings</h3>
                    <p>
                      There are no active vacancies at the moment. You can
                      still submit your CV using the contact email below.
                    </p>
                  </div>
                )}
              </div>

              {/* Direct CV Submission */}
              <div className="career-direct-mail p-20 bg-white border-card rounded-md">
                <i className="ri-mail-send-line"></i>

                <p className="fs-14 text-muted m-0">
                  Looking for an internship or want to submit your resume
                  directly? Send your CV to{' '}
                  <a
                    href={`mailto:${siteData.contact.email}`}
                    className="text-gold fw-bold"
                  >
                    {siteData.contact.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Application Form */}
            <div className="col-lg-5" id="application-form-block">
              <div className="career-form-card p-32 bg-white border-card rounded-md sticky-top-form career-form-reveal">
                {submitted ? (
                  <div className="text-center py-40 career-form-success">
                    <div className="success-icon-orb mb-20 mx-auto">
                      <i className="ri-checkbox-circle-fill"></i>
                    </div>

                    <h3 className="fs-20 fw-bold text-title mb-8">
                      Application Submitted
                    </h3>

                    <p className="fs-14 text-body mb-20">
                      Thank you, <strong>{applicant.name}</strong>. Our human
                      resources desk has received your application for{' '}
                      <strong>
                        {selectedRole || 'a career position'}
                      </strong>{' '}
                      and will contact you shortly.
                    </p>

                    <span className="fs-12 text-muted d-block">
                      Official Careers Desk • {siteData.contact.email}
                    </span>
                  </div>
                ) : (
                  <div className="career-form-content">
                    <div className="career-form-heading">
                      <span className="career-form-eyebrow">
                        TAKE THE NEXT STEP
                      </span>

                      <h3 className="fs-20 fw-bold text-title mb-6">
                        Submit Your Application
                      </h3>

                      <p className="fs-13 text-muted mb-20">
                        {selectedRole
                          ? `Applying for: ${selectedRole}`
                          : 'Select an opening or apply generally'}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="form-field-group mb-14">
                        <label className="field-label" htmlFor="career-role">
                          Target Role *
                        </label>

                        <select
                          id="career-role"
                          className="field-input"
                          value={selectedRole || ''}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          required
                        >
                          <option value="">Select a Position</option>

                          {activeOpenings.map((op, idx) => (
                            <option
                              key={op.id ?? op.title ?? idx}
                              value={op.title}
                            >
                              {op.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-field-group mb-14">
                        <label className="field-label" htmlFor="career-name">
                          Full Name *
                        </label>

                        <input
                          id="career-name"
                          type="text"
                          required
                          className="field-input"
                          placeholder="Your Full Name"
                          value={applicant.name}
                          onChange={(e) =>
                            setApplicant({
                              ...applicant,
                              name: e.target.value
                            })
                          }
                        />
                      </div>

                      <div className="form-field-group mb-14">
                        <label className="field-label" htmlFor="career-email">
                          Email Address *
                        </label>

                        <input
                          id="career-email"
                          type="email"
                          required
                          className="field-input"
                          placeholder="you@email.com"
                          value={applicant.email}
                          onChange={(e) =>
                            setApplicant({
                              ...applicant,
                              email: e.target.value
                            })
                          }
                        />
                      </div>

                      <div className="form-field-group mb-14">
                        <label className="field-label" htmlFor="career-phone">
                          Phone Number *
                        </label>

                        <input
                          id="career-phone"
                          type="tel"
                          required
                          className="field-input"
                          placeholder="+91 XXXXX XXXXX"
                          value={applicant.phone}
                          onChange={(e) =>
                            setApplicant({
                              ...applicant,
                              phone: e.target.value
                            })
                          }
                        />
                      </div>

                      <div className="form-field-group mb-14">
                        <label
                          className="field-label"
                          htmlFor="career-qualification"
                        >
                          Highest Qualification
                        </label>

                        <input
                          id="career-qualification"
                          type="text"
                          className="field-input"
                          placeholder="e.g. CA Inter, B.Com, LLB, MBA"
                          value={applicant.qualification}
                          onChange={(e) =>
                            setApplicant({
                              ...applicant,
                              qualification: e.target.value
                            })
                          }
                        />
                      </div>

                      <div className="form-field-group mb-20">
                        <label
                          className="field-label"
                          htmlFor="career-message"
                        >
                          Cover Note / Key Experience
                        </label>

                        <textarea
                          id="career-message"
                          rows="3"
                          className="field-textarea"
                          placeholder="Briefly mention relevant experience or software skills (Tally, MCA portal)..."
                          value={applicant.message}
                          onChange={(e) =>
                            setApplicant({
                              ...applicant,
                              message: e.target.value
                            })
                          }
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="btn-prestige btn-prestige-gold w-100 career-submit-button"
                      >
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
