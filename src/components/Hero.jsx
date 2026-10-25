import React from 'react';
import { siteData } from '../data/content';

export const Hero = ({ onOpenConsultation }) => {
  const { hero, contact } = siteData;

  const scrollToServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-area style-two position-relative z-1 overflow-hidden bg_primary">
      {/* Decorative SVG floating shape */}
      <svg 
        className="hero-shape-one position-absolute start-0 z-n1" 
        width="450" 
        height="450" 
        viewBox="0 0 450 450" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="225" cy="225" r="224.5" stroke="#B9F8B1" strokeDasharray="12 12" />
        <circle cx="225" cy="225" r="169.5" stroke="#B9F8B1" strokeOpacity="0.5" />
        <circle cx="225" cy="225" r="109.5" stroke="#B9F8B1" strokeOpacity="0.25" />
      </svg>

      <div className="container style-two">
        <div className="row align-items-end">
          
          {/* Left Column: Heading, Stats & CTAs */}
          <div className="col-xxl-6 col-xl-7 col-lg-7">
            <div className="hero-content">
              
              <div className="hero-badge-pill">
                <i className="ri-shield-check-line"></i> {hero.badge}
              </div>

              <h1 className="fw-bold text-white">
                {hero.headlinePart1} <b className="fw-bold text_secondary">{hero.headlineHighlight}</b> {hero.headlinePart2}
              </h1>

              <div className="hero-stat-wrapper">
                {/* Polygon clipped Stat Card */}
                <div className="stat-card style-one position-relative z-1 round-20">
                  <h3 className="text-white fw-semibold mb-0">{hero.statNumber}</h3>
                  <span className="text-gray d-block">{hero.statLabel}</span>

                  <ul className="client-list list-unstyled">
                    {hero.avatars.map((imgUrl, idx) => (
                      <li key={idx} className="rounded-circle">
                        <img src={imgUrl} alt={`Trust Representative ${idx + 1}`} />
                      </li>
                    ))}
                  </ul>

                  <p className="text-gray fs-15 mb-0">{hero.statSubtext}</p>
                </div>

                {/* Hero Description & CTA */}
                <div className="hero-para position-relative">
                  <p>{hero.paragraph}</p>

                  <div className="d-flex flex-wrap gap-15 align-items-center">
                    <a 
                      href="#services" 
                      onClick={scrollToServices}
                      className="btn style-two d-inline-flex align-items-center"
                    >
                      <span className="btn-icon-one">
                        <i className="ri-arrow-right-line"></i>
                      </span>
                      <span className="btn-text">{hero.ctaPrimary}</span>
                      <span className="btn-icon-two">
                        <i className="ri-arrow-right-line"></i>
                      </span>
                    </a>

                    <button 
                      onClick={onOpenConsultation}
                      className="btn style-three d-inline-flex align-items-center"
                    >
                      <span className="btn-icon-one">
                        <i className="ri-calendar-check-line"></i>
                      </span>
                      <span className="btn-text">Consultation</span>
                      <span className="btn-icon-two">
                        <i className="ri-calendar-check-line"></i>
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Contact details and Social channels */}
          <div className="col-xxl-5 offset-xxl-1 col-xl-5 col-lg-5 ps-xxl-0 mt-40 mt-lg-0">
            <div className="row align-items-end">
              <div className="col-xl-8 col-md-8 mb-20 mb-md-0">
                <ul className="contact-info list-unstyled d-flex flex-column mb-0">
                  <li className="fs-24">
                    <a href={`tel:${contact.phonePrimary.replace(/[^0-9+]/g, '')}`} className="contact-num">
                      {contact.phonePrimary}
                    </a>
                  </li>
                  <li className="fs-18">
                    <a href={`mailto:${contact.email}`} className="contact-mail">
                      {contact.email}
                    </a>
                  </li>
                  <li className="text-gray fs-16">
                    <i className="ri-time-line text_secondary me-2"></i> {contact.hours}
                  </li>
                  <li className="text-gray fs-14 mt-1">
                    <span className="badge bg-albastor text-title px-2 py-1 rounded" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                      {siteData.brand.llpNo}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="col-xl-4 col-md-4">
                <ul className="social-profile style-five list-unstyled mb-0">
                  <li>
                    <a href={contact.socials.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                  </li>
                  <li>
                    <a href={contact.socials.twitter} target="_blank" rel="noopener noreferrer">Twitter / X</a>
                  </li>
                  <li>
                    <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </li>
                  <li>
                    <a href={contact.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Hero background image on right with gradient blend */}
      <div className="hero-bg d-none d-lg-block">
        <img 
          src={hero.bgImage} 
          alt="Sanap & Associates LLP Non-Profit Advisory" 
        />
      </div>
    </section>
  );
};
