import React from 'react';
import { siteData } from '../data/content';

export const FinalCta = ({ onOpenConsultation }) => {
  const { cta, contact } = siteData;

  return (
    <section 
      className="final-cta-section section-padding-sm" 
      data-theme="light"
    >
      <div className="container">
        <div 
          className="cta-master-banner position-relative overflow-hidden reveal-up bg_primary round-30"
          data-theme="dark"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="cta-ambient-glow"></div>

          <div className="row align-items-center justify-content-between g-4 position-relative z-2 p-xxl-4 p-3">
            
            <div className="col-lg-8">
              <div className="cta-text-block">
                <div className="section-badge-tag badge-dark-gold mb-16">
                  <i className="ri-shield-flash-line me-1"></i> Dedicated Compliance Partnership
                </div>

                <h2 className="cta-headline text-white mb-16">
                  {cta.heading}
                </h2>

                <p className="cta-subtext text-white-muted mb-20 max-w-620">
                  {cta.supportingText}
                </p>

                <div className="cta-trust-indicators d-flex flex-wrap gap-16">
                  <span className="trust-indicator-item">
                    <i className="ri-check-line text_secondary me-1"></i> 100% Confidential
                  </span>
                  <span className="trust-indicator-item">
                    <i className="ri-check-line text_secondary me-1"></i> Expert Trustee Counsel
                  </span>
                  <span className="trust-indicator-item">
                    <i className="ri-check-line text_secondary me-1"></i> 24h Response Window
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 text-lg-end">
              <div className="cta-action-block d-flex flex-column align-items-lg-end gap-16">
                <button 
                  onClick={onOpenConsultation}
                  className="btn style-one"
                  id="final-cta-book-consultation"
                  type="button"
                >
                  <span className="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition">
                    <i className="ri-arrow-right-line"></i>
                  </span>
                  <span className="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">
                    {cta.buttonText}
                  </span>
                  <span className="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition">
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </button>

                <div className="cta-direct-call text-white-muted fs-13">
                  <span>Or call direct: </span>
                  <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="text_secondary fw-bold">
                    {contact.phoneDisplay || contact.phone}
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCta;
