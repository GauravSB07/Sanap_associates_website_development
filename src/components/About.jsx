import React from 'react';
import { siteData } from '../data/content';

export const About = () => {
  const { about, images } = siteData;

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="row align-items-center g-4">
          
          {/* Left Column: Narrative Copy in 3 Readable Paragraphs + Pillars */}
          <div className="col-lg-7">
            <div className="about-content">
              
              <div className="section-tag section-tag-primary">
                About Sanap & Associates LLP
              </div>

              <h2 className="section-title">
                {about.heading}
              </h2>

              <p className="about-paragraph">
                {about.paragraphs[0]}
              </p>

              <p className="about-paragraph">
                {about.paragraphs[1]}
              </p>

              <p className="about-paragraph">
                {about.paragraphs[2]}
              </p>

              {/* Key Statutory Pillars Grid */}
              <div className="about-pillars-grid">
                {about.highlights.map((pillar, idx) => (
                  <div key={idx} className="pillar-item">
                    <i className="ri-checkbox-circle-fill"></i>
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Restrained Image Area (4:3 ratio) */}
          <div className="col-lg-5">
            <div className="about-image-wrapper">
              <div className="image-placeholder-frame">
                <img 
                  src={images.about.url} 
                  alt={images.about.alt} 
                  loading="lazy"
                />
                <span className="image-placeholder-tag">
                  {images.about.placeholderLabel}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
