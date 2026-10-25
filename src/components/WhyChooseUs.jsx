import React from 'react';
import { siteData } from '../data/content';

export const WhyChooseUs = () => {
  const { whyChooseUs } = siteData;

  return (
    <section id="why-us" className="why-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag section-tag-primary">
            Our Core Hallmarks
          </div>
          <h2 className="section-title">
            {whyChooseUs.heading}
          </h2>
          <p className="section-desc">
            {whyChooseUs.subtitle}
          </p>
        </div>

        {/* 7 Benefits in a Clean, Aligned Grid */}
        <div className="row g-4">
          {whyChooseUs.points.map((benefit, idx) => (
            <div key={idx} className={idx < 6 ? "col-md-6 col-lg-4" : "col-12 col-lg-4"}>
              <div className="benefit-card">
                <div className="benefit-number">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="benefit-title">
                    {benefit.title}
                  </h3>
                  <p className="benefit-desc">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
