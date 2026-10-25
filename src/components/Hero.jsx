import React from 'react';
import { siteData } from '../data/content';

export const Hero = ({ onOpenConsultation }) => {
  const { hero, images } = siteData;

  const scrollToServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="row align-items-center g-4">
          
          {/* Left Column: Heading, Supporting Text, CTAs, 2 Trust Indicators */}
          <div className="col-lg-7">
            <div className="hero-content">
              
              <div className="section-tag section-tag-dark">
                Specialised Indian NPO Advisory & Governance
              </div>

              <h1 className="hero-headline">
                NPO Compliance. <span className="text_secondary">Simplified.</span>
              </h1>

              <p className="hero-copy">
                {hero.supportingCopy}
              </p>

              <div className="hero-actions">
                <button 
                  onClick={onOpenConsultation}
                  className="btn btn-primary"
                  id="hero-book-consultation"
                >
                  <span className="btn-icon-one">
                    <i className="ri-arrow-right-line"></i>
                  </span>
                  <span>{hero.primaryCta}</span>
                </button>

                <a 
                  href="#services" 
                  onClick={scrollToServices}
                  className="btn btn-outline"
                  id="hero-explore-services"
                >
                  <span className="btn-icon-one">
                    <i className="ri-file-list-3-line"></i>
                  </span>
                  <span>{hero.secondaryCta}</span>
                </a>
              </div>

              {/* Two Trust Indicators Only */}
              <div className="hero-trust-indicators">
                {hero.trustIndicators.map((stat, idx) => (
                  <div key={idx} className="trust-indicator-card">
                    <div className="trust-indicator-val">{stat.value}</div>
                    <div className="trust-indicator-label">{stat.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Balanced One Main Hero Image Area (16:10 ratio) */}
          <div className="col-lg-5">
            <div className="hero-image-wrapper">
              <div className="image-placeholder-frame">
                <img 
                  src={images.hero.url} 
                  alt={images.hero.alt} 
                  loading="eager"
                />
                <span className="image-placeholder-tag">
                  {images.hero.placeholderLabel}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
