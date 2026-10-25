import React from 'react';
import { siteData } from '../data/content';

export const Pricing = ({ onOpenConsultation }) => {
  return (
    <section id="retainers" className="pt-115 pb-90">
      <div className="container">
        
        {/* Title */}
        <div className="row mb-45">
          <div className="col-xl-10 offset-xl-1">
            <h2 className="section-title style-two fw-semibold text-center mb-35">
              Our Compliance Retainers — <span className="position-relative z-1">Simple, Transparent,</span> And Tailored For Non-Profits
            </h2>
          </div>
        </div>

        {/* 3 Pricing / Retainer Cards */}
        <div className="row justify-content-center">
          {siteData.retainers.map((plan, idx) => (
            <div key={idx} className="col-lg-4 col-md-6 mb-30">
              <div className={`pricing-card style-one round-20 ${plan.recommended ? 'recommended' : ''}`}>
                
                <div>
                  {plan.recommended && (
                    <span className="pricing-badge">Most Popular For Active NPOs</span>
                  )}

                  <h5 className="fw-bold text-title">{plan.name}</h5>
                  
                  <h2 className="fw-semibold">
                    {plan.price} <span className="font-primary">/{plan.period}</span>
                  </h2>

                  <p className="fs-15">{plan.tagline}</p>

                  <h4 className="fs-20 fw-bold mb-18 text-title">What's Included</h4>

                  <ul className="pricing-features list-unstyled">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <i className="ri-checkbox-circle-fill"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button 
                    onClick={() => onOpenConsultation(plan.name)}
                    className={`btn ${plan.recommended ? 'style-one' : 'style-three'} w-100 justify-content-between`}
                    style={!plan.recommended ? { backgroundColor: 'var(--primaryColor)', color: 'var(--whiteColor)' } : {}}
                  >
                    <span className="btn-icon-one">
                      <i className="ri-arrow-right-line"></i>
                    </span>
                    <span className="btn-text" style={!plan.recommended ? { color: 'var(--whiteColor)' } : {}}>
                      Get Retainer Details
                    </span>
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
