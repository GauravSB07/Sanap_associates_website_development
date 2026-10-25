import React from 'react';
import { siteData } from '../data/content';

export const Services = ({ onOpenConsultation }) => {
  const { services } = siteData;

  return (
    <section id="services" className="services-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag section-tag-primary">
            Statutory Practice Areas
          </div>
          <h2 className="section-title">
            {services.heading}
          </h2>
          <p className="section-desc">
            {services.subtitle}
          </p>
        </div>

        {/* 4 Category Cards in a Balanced 2x2 Grid */}
        <div className="row g-4">
          {services.categories.map((category) => (
            <div key={category.id} className="col-md-6">
              <div className="service-card">
                
                <div className="service-icon-box">
                  <i className={category.icon}></i>
                </div>

                <h3 className="service-card-title">
                  {category.title}
                </h3>

                <p className="service-card-desc">
                  {category.desc}
                </p>

                <ul className="service-item-list">
                  {category.items.map((item, idx) => (
                    <li key={idx}>
                      <i className="ri-checkbox-circle-fill"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => onOpenConsultation(category.title)}
                  className="btn-card-action"
                  aria-label={`Inquire about ${category.title}`}
                >
                  <span>Request Checklist & Consultation</span>
                  <i className="ri-arrow-right-line"></i>
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
