import React from 'react';
import { siteData } from '../data/content';

export const FounderNote = () => {
  const { founder } = siteData;

  return (
    <section 
      id="founder" 
      className="founder-section section-padding" 
      data-theme="dark"
    >
      <div className="container">
        <div className="row align-items-center g-5">
          
          {/* Left Column: Letter & Dialogue from the Founder */}
          <div className="col-lg-7">
            <div className="founder-letter-wrap reveal-up">
              
              <div className="section-badge-tag badge-dark-gold mb-24">
                <i className="ri-quill-pen-line me-1"></i> Executive Leadership Perspective
              </div>

              <blockquote className="founder-master-quote mb-28">
                {founder.quote}
              </blockquote>

              <div className="founder-letter-body mb-32">
                <p className="letter-paragraph">
                  "Over the past 15 years working alongside trustees, philanthropists, medical boards, and community foundations, one reality has remained constant: the social sector is India's quietest and most resilient engine of progress."
                </p>
                <p className="letter-paragraph">
                  "Yet, navigating the ever-tightening regulatory landscape—from Charity Commissioner inquiries to rigorous 12A/80G re-registrations and FCRA mandates—should never exhaust the sacred energy of those dedicated to public good. Our practice is built on a singular conviction: to shoulder your compliance burden completely, with absolute legal precision and proactive foresight."
                </p>
              </div>

              <div className="founder-signoff-strip pt-24 border-top-dark d-flex align-items-center justify-content-between">
                <div>
                  <div className="founder-name-text text-gold fw-bold fs-22 mb-4">
                    {founder.author}
                  </div>
                  <div className="founder-title-text text-white-muted fs-14">
                    {founder.role}
                  </div>
                </div>

                <div className="rotary-affiliation-badge">
                  <span className="rotary-wheel-icon">
                    <i className="ri-compass-discover-line"></i>
                  </span>
                  <span className="rotary-badge-text">Rotarian Leadership</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Executive Seal & Institutional Credentials Card */}
          <div className="col-lg-5">
            <div className="founder-insignia-card reveal-up">
              
              <div className="insignia-monogram-circle mb-24">
                <span className="monogram-letters">NS</span>
                <span className="verified-seal-dot" title="Verified Domain Leader">
                  <i className="ri-award-fill"></i>
                </span>
              </div>

              <h3 className="insignia-leader-name text-white mb-6">
                {founder.author}
              </h3>
              
              <p className="insignia-leader-title text-gold mb-20">
                15+ Years Social Sector Jurisprudence
              </p>

              <div className="insignia-credentials-list mb-24">
                <div className="cred-row d-flex align-items-center gap-10 mb-12">
                  <i className="ri-checkbox-circle-fill text-gold"></i>
                  <span>2,000+ Non-Profit Bodies Successfully Represented</span>
                </div>
                <div className="cred-row d-flex align-items-center gap-10 mb-12">
                  <i className="ri-checkbox-circle-fill text-gold"></i>
                  <span>Specialist Bombay Public Trust Act Counsel</span>
                </div>
                <div className="cred-row d-flex align-items-center gap-10 mb-12">
                  <i className="ri-checkbox-circle-fill text-gold"></i>
                  <span>CSR-1 &amp; Section-8 Governance Advisory</span>
                </div>
                <div className="cred-row d-flex align-items-center gap-10">
                  <i className="ri-checkbox-circle-fill text-gold"></i>
                  <span>Rotary Club Social Welfare &amp; Community Impact</span>
                </div>
              </div>

              <div className="insignia-card-footer pt-18 border-top-dark">
                <span className="fs-12 text-white-muted text-uppercase letter-spacing-1">
                  Registered Advisory LLP • Mumbai, Maharashtra
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderNote;
