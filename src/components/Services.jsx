import React, { useState } from 'react';
import { siteData } from '../data/content';

export const Services = ({ onOpenConsultation }) => {
  const { services } = siteData;
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section 
      id="services" 
      className="services-section section-padding" 
      data-theme="light"
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center mb-50">
          <div className="section-badge-tag reveal-up">
            <i className="ri-folder-shield-2-line me-1"></i> Core Statutory Disciplines
          </div>
          <h2 className="section-heading-editorial reveal-up">
            {services.heading}
          </h2>
          <p className="section-subtext reveal-up">
            {services.subtitle}
          </p>
        </div>

        {/* 4 Practice Discipline Cards in 2x2 Grid */}
        <div className="row g-4">
          {services.categories.map((category, idx) => (
            <div key={category.id} className="col-lg-6 reveal-up">
              <div 
                className={`service-practice-card ${hoveredCard === idx ? 'is-focused' : ''}`}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                
                {/* Card Top: Practice Header & Icon */}
                <div className="practice-header-deck d-flex align-items-start justify-content-between mb-24">
                  <div className="practice-info">
                    <span className="practice-index-num">Practice 0{idx + 1}</span>
                    <h3 className="practice-title mt-4 mb-8">
                      {category.title}
                    </h3>
                    <p className="practice-summary">
                      {category.desc}
                    </p>
                  </div>

                  <div className="practice-icon-box flex-shrink-0">
                    <i className={category.icon}></i>
                  </div>
                </div>

                <div className="practice-divider mb-20"></div>

                {/* Statutory Scope Checklist */}
                <div className="practice-scope-wrapper mb-28">
                  <div className="scope-title-label mb-12">Statutory Deliverables &amp; Filings:</div>
                  <ul className="practice-scope-list list-unstyled m-0">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="scope-list-item d-flex align-items-start gap-10">
                        <span className="scope-bullet-icon">
                          <i className="ri-checkbox-circle-line"></i>
                        </span>
                        <span className="scope-item-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom CTA */}
                <div className="practice-card-footer mt-auto pt-20 border-top-subtle d-flex align-items-center justify-content-between">
                  <button 
                    onClick={() => onOpenConsultation(category.title)}
                    className="btn-prestige-outline"
                    aria-label={`Inquire about ${category.title}`}
                  >
                    <span>Request Filing Scope &amp; Consultation</span>
                    <i className="ri-arrow-right-line ms-2"></i>
                  </button>

                  <span className="compliance-shield-tag">
                    <i className="ri-verified-badge-fill text-gold me-1"></i> Full Advisory
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
