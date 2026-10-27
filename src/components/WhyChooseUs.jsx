import React from 'react';
import { siteData } from '../data/content';

export const WhyChooseUs = () => {
  const { whyChooseUs, founder } = siteData;

  const hallmarkIcons = [
    'ri-medal-line',
    'ri-building-line',
    'ri-global-line',
    'ri-bank-line',
    'ri-government-line',
    'ri-file-text-line',
    'ri-magic-line'
  ];

  return (
    <section 
      id="why-us" 
      className="why-us-section section-padding" 
      data-theme="dark"
    >
      <div className="container">
        
        {/* Main Dark Obsidian Enclosure */}
        <div className="why-us-enclosure position-relative overflow-hidden">
          
          {/* Subtle Ambient Decorative Gradients */}
          <div className="why-ambient-glow"></div>

          {/* Section Header */}
          <div className="section-header text-center mb-50 position-relative z-2">
            <div className="section-badge-tag badge-dark-gold reveal-up">
              <i className="ri-award-fill me-1"></i> The Sanap &amp; Associates Distinction
            </div>
            <h2 className="section-heading-editorial text-white reveal-up">
              {whyChooseUs.heading}
            </h2>
            <p className="section-subtext text-white-muted reveal-up">
              {whyChooseUs.subtitle}
            </p>
          </div>

          {/* Strategic Hallmarks Grid */}
          <div className="row g-4 mb-45 position-relative z-2">
            {whyChooseUs.points.slice(0, 6).map((benefit, idx) => (
              <div key={idx} className="col-md-6 col-lg-4 reveal-up">
                <div 
                  className="hallmark-card"
                >
                  <div className="hallmark-top d-flex align-items-center justify-content-between mb-16">
                    <div className="hallmark-icon-wrap">
                      <i className={hallmarkIcons[idx]}></i>
                    </div>
                    <span className="hallmark-index">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="hallmark-title text-white mb-10">
                    {benefit.title}
                  </h3>

                  <p className="hallmark-desc text-white-muted mb-0">
                    {benefit.desc}
                  </p>

                  <div className="hallmark-hover-bar"></div>
                </div>
              </div>
            ))}
          </div>

          {/* 7th Hallmark Feature & Executive Quote Banner */}
          <div className="why-quote-banner position-relative z-2 reveal-up">
            <div className="row align-items-center g-4">
              
              <div className="col-lg-8">
                <div className="d-flex align-items-start gap-20">
                  <div className="quote-insignia-circle flex-shrink-0">
                    <i className="ri-double-quotes-l"></i>
                  </div>
                  <div>
                    <span className="quote-banner-tag mb-4 d-block">
                      Core Practice Creed • {whyChooseUs.points[6].title}
                    </span>
                    <blockquote className="quote-banner-phrase mb-8">
                      {founder.quote}
                    </blockquote>
                    <p className="quote-banner-explanation mb-0">
                      {whyChooseUs.points[6].desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 text-lg-end">
                <div className="founder-quote-signature">
                  <div className="signature-name text-gold fw-bold fs-18">
                    {founder.author}
                  </div>
                  <div className="signature-role text-white-muted fs-13">
                    {founder.role}
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

export default WhyChooseUs;
