import React from 'react';
import { siteData } from '../data/content';

export const CtaBox = ({ onOpenConsultation }) => {
  const { ctaBox } = siteData;

  return (
    <section className="pb-90">
      <div className="container">
        
        <div className="cta-box style-one">
          
          {/* Decorative SVG shapes */}
          <svg className="cta-shape-one" width="280" height="280" viewBox="0 0 280 280" fill="none">
            <circle cx="140" cy="140" r="139.5" stroke="#B9F8B1" strokeDasharray="8 8" />
            <circle cx="140" cy="140" r="99.5" stroke="#B9F8B1" strokeOpacity="0.4" />
          </svg>

          <svg className="cta-shape-two" width="280" height="280" viewBox="0 0 280 280" fill="none">
            <circle cx="140" cy="140" r="139.5" stroke="#91D089" strokeDasharray="8 8" />
            <circle cx="140" cy="140" r="99.5" stroke="#91D089" strokeOpacity="0.4" />
          </svg>

          <h2>{ctaBox.title}</h2>
          <p>{ctaBox.description}</p>

          <div className="cta-btn-wrap">
            <button 
              onClick={() => onOpenConsultation("Custom Quote Request")}
              className="btn style-one"
            >
              <span className="btn-icon-one">
                <i className="ri-phone-line"></i>
              </span>
              <span className="btn-text">{ctaBox.primaryBtn}</span>
              <span className="btn-icon-two">
                <i className="ri-phone-line"></i>
              </span>
            </button>

            <button 
              onClick={() => onOpenConsultation("Free Consultation")}
              className="btn style-two"
            >
              <span className="btn-icon-one">
                <i className="ri-calendar-line"></i>
              </span>
              <span className="btn-text">{ctaBox.secondaryBtn}</span>
              <span className="btn-icon-two">
                <i className="ri-calendar-line"></i>
              </span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
