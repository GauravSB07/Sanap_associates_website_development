import React from 'react';
import { siteData } from '../data/content';

export const Hero = ({ onOpenConsultation }) => {
  const { hero, contact, images, brand } = siteData;

  const scrollToServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="hero-section position-relative overflow-hidden" 
      data-theme="dark"
    >
      {/* Ambient background light gradients */}
      <div className="hero-ambient-glow hero-glow-1"></div>
      <div className="hero-ambient-glow hero-glow-2"></div>
      <div className="hero-grid-pattern"></div>

      <div className="container position-relative z-2">
        <div className="row align-items-center g-4">
          
          {/* Left Column: Heading, Domain Authority, Authentic Metrics & CTA */}
          <div className="col-lg-7">
            <div className="hero-content-wrap">
              
              {/* Prestigious Editorial Domain Badge */}
              <div className="hero-badge-pill reveal-up">
                <span className="badge-pulse-dot"></span>
                <span className="badge-text">Premier Non-Profit Statutory &amp; Governance Advisory</span>
              </div>

              {/* Master Headline */}
              <h1 className="hero-main-title reveal-up">
                NPO Compliance. <span className="title-accent-gold">Simplified.</span>
              </h1>

              {/* Executive Supporting Statement */}
              <p className="hero-lead-text reveal-up">
                End-to-end statutory, legal, audit, taxation and governance execution for Public Trusts, NGOs, Section-8 Companies, Societies, Religious Institutions, Mandals and Foundations across India.
              </p>

              {/* Action Buttons */}
              <div className="hero-action-buttons d-flex flex-wrap align-items-center gap-16 mb-40 reveal-up">
                <button 
                  onClick={onOpenConsultation}
                  className="btn-prestige btn-prestige-gold"
                  id="hero-book-consultation"
                  data-cursor-text="Book"
                >
                  <span>{hero.primaryCta}</span>
                  <i className="ri-arrow-right-line btn-arrow-icon"></i>
                </button>

                <a 
                  href="#services" 
                  onClick={scrollToServices}
                  className="btn-prestige btn-prestige-ghost"
                  id="hero-explore-services"
                  data-cursor-text="Explore"
                >
                  <i className="ri-shield-check-line me-1"></i>
                  <span>{hero.secondaryCta}</span>
                </a>
              </div>

              {/* Authentic Institutional Proof Metrics Bar */}
              <div className="hero-metrics-bar row g-3 reveal-up">
                <div className="col-sm-4 col-6">
                  <div className="metric-cell">
                    <div className="metric-number">15+</div>
                    <div className="metric-label">Years Exclusive NPO Focus</div>
                  </div>
                </div>

                <div className="col-sm-4 col-6">
                  <div className="metric-cell">
                    <div className="metric-number">2,000+</div>
                    <div className="metric-label">Charitable Trusts Advised</div>
                  </div>
                </div>

                <div className="col-sm-4 col-12">
                  <div className="metric-cell">
                    <div className="metric-number">100%</div>
                    <div className="metric-label">Statutory Audit Rigour</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Executive Practice Overview Card */}
          <div className="col-lg-5">
            <div className="hero-executive-card-wrap reveal-up">
              
              <div className="hero-visual-card">
                {/* Visual Architectural Image Frame */}
                <div className="hero-image-container">
                  <img 
                    src={images.hero.url} 
                    alt={images.hero.alt} 
                    loading="eager"
                    className="hero-office-img"
                  />
                  <div className="hero-image-overlay"></div>
                  
                  {/* Verified Institutional Tag */}
                  <div className="hero-verified-chip">
                    <i className="ri-verified-badge-fill text-gold"></i>
                    <span>{brand.llpNo}</span>
                  </div>
                </div>

                {/* Direct Advisory Contact Deck */}
                <div className="hero-advisory-desk">
                  <div className="desk-header d-flex align-items-center justify-content-between mb-16">
                    <div>
                      <span className="desk-sub">Direct Trustee Hotline</span>
                      <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="desk-tel">
                        {contact.phoneDisplay || contact.phone}
                      </a>
                    </div>
                    <div className="desk-status-pill">
                      <span className="live-status-dot"></span>
                      <span>Advisory Active</span>
                    </div>
                  </div>

                  <div className="desk-details-list">
                    <div className="desk-detail-item">
                      <i className="ri-mail-send-line text-gold"></i>
                      <a href={`mailto:${contact.email}`} className="desk-link">{contact.email}</a>
                    </div>
                    <div className="desk-detail-item">
                      <i className="ri-map-pin-2-line text-gold"></i>
                      <span>{contact.address}</span>
                    </div>
                    <div className="desk-detail-item">
                      <i className="ri-time-line text-gold"></i>
                      <span>{contact.hours}</span>
                    </div>
                  </div>

                  {/* Statutory Practice Tags */}
                  <div className="desk-statutory-tags d-flex flex-wrap gap-8 pt-16 mt-16 border-top-subtle">
                    <span className="stat-tag-chip">BPT Act</span>
                    <span className="stat-tag-chip">12A &amp; 80G</span>
                    <span className="stat-tag-chip">FCRA</span>
                    <span className="stat-tag-chip">CSR-1</span>
                    <span className="stat-tag-chip">Change Reports</span>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
