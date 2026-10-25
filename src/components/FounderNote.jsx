import React from 'react';
import { siteData } from '../data/content';

export const FounderNote = () => {
  const { founder, images } = siteData;

  return (
    <section id="founder" className="founder-section section-padding">
      <div className="container">
        <div className="row align-items-center g-4">
          
          {/* Left Column: Quote & Attribution */}
          <div className="col-lg-7">
            <div className="founder-content">
              
              <div className="section-tag section-tag-dark mb-24">
                {founder.heading}
              </div>

              <blockquote className="founder-quote">
                {founder.quote}
              </blockquote>

              <div className="founder-meta">
                <div className="founder-name">
                  {founder.author}
                </div>
                <div className="founder-role">
                  {founder.role}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Founder Photograph Placeholder (Dignified & Transparent) */}
          <div className="col-lg-5">
            <div className="neutral-placeholder-box">
              <div className="neutral-placeholder-icon">
                <i className="ri-user-star-line"></i>
              </div>
              <h3 className="fs-18 fw-bold text-white mb-8">
                {founder.author}
              </h3>
              <p className="fs-14 text-white-muted mb-16">
                {founder.role}
              </p>
              <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', padding: '6px 14px', borderRadius: '50px', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
                <i className="ri-camera-lens-line me-1 text_secondary"></i> {images.founder.placeholderLabel}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
