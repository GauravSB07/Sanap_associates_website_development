import React, { useState } from 'react';
import { siteData } from '../data/content';

export const Services = ({ onOpenConsultation }) => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="pt-115 pb-90">
      <div className="container">
        
        {/* Title */}
        <div className="row mb-45">
          <div className="col-xl-10 offset-xl-1">
            <h2 className="section-title style-two fw-semibold text-center mb-35">
              Tailored NPO Compliance, Audit & Legal <span className="position-relative z-1">Services</span> For Sustainable Impact
            </h2>
          </div>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="row justify-content-center">
          {siteData.services.map((service) => (
            <div key={service.id} className="col-xxl-3 col-lg-6 col-md-6 mb-30">
              <div className="service-card style-two position-relative z-1 round-20">
                
                <div>
                  <div className="service-icon-box">
                    <i className={service.icon}></i>
                  </div>

                  <h3 className="fs-22 text-title">
                    {service.title}
                  </h3>

                  <ul className="feature-list style-one list-unstyled">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="position-relative fs-15 text-title">
                        <i className="ri-check-line check-icon"></i>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-20">
                  <button 
                    onClick={() => onOpenConsultation(service.title)}
                    className="btn style-one d-inline-flex align-items-center w-100 justify-content-between"
                  >
                    <span className="btn-icon-one">
                      <i className="ri-arrow-right-line"></i>
                    </span>
                    <span className="btn-text">Discover more</span>
                    <span className="btn-icon-two">
                      <i className="ri-arrow-right-line"></i>
                    </span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
