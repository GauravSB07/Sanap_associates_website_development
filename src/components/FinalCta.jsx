import React from 'react';
import { siteData } from '../data/content';

export const FinalCta = ({ onOpenConsultation }) => {
  const { cta } = siteData;

  return (
    <section className="final-cta-section section-padding-sm">
      <div className="container">
        <div className="cta-banner-box">
          
          <div className="section-tag section-tag-dark mb-16">
            Non-Profit Compliance Partner
          </div>

          <h2>
            {cta.heading}
          </h2>

          <p>
            {cta.supportingText}
          </p>

          <button 
            onClick={onOpenConsultation}
            className="btn btn-primary"
            id="final-cta-book-consultation"
          >
            <span className="btn-icon-one">
              <i className="ri-arrow-right-line"></i>
            </span>
            <span>{cta.buttonText}</span>
          </button>

        </div>
      </div>
    </section>
  );
};
