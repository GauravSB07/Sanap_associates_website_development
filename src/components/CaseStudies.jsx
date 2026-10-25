import React from 'react';
import { siteData } from '../data/content';

export const CaseStudies = ({ onOpenConsultation }) => {
  const leftCases = siteData.cases.slice(0, 2);
  const rightCases = siteData.cases.slice(2, 5);

  return (
    <section id="case-studies" className="case-area style-two pt-115 pb-90">
      <div className="container">
        
        {/* Title */}
        <div className="row mb-45">
          <div className="col-xl-10 offset-xl-1">
            <h2 className="section-title style-two fw-semibold text-center mb-35">
              How Sanap & Associates <span className="position-relative z-1">Helped NPOs</span> Overcome Compliance Hurdles and Secure Approvals
            </h2>
          </div>
        </div>

        {/* Asymmetric Case Grid */}
        <div className="row">
          
          {/* Left Column (2 cases + View All Button) */}
          <div className="col-lg-5">
            {leftCases.map((item) => (
              <div key={item.id} className="case-card mb-45">
                <div className="case-img">
                  <img src={item.image} alt={item.title} />
                  <span className="case-category">{item.category}</span>
                </div>
                <h3 className="fs-22 text-title">
                  {item.title}
                </h3>
                <p className="case-result-text mt-2">{item.result}</p>
              </div>
            ))}

            <div className="view-all-case mb-40">
              <button 
                onClick={() => onOpenConsultation("Case Study Inquiries")}
                className="btn style-one d-inline-flex align-items-center"
              >
                <span className="btn-icon-one">
                  <i className="ri-arrow-right-line"></i>
                </span>
                <span className="btn-text">Consult On Your Case</span>
                <span className="btn-icon-two">
                  <i className="ri-arrow-right-line"></i>
                </span>
              </button>
            </div>
          </div>

          {/* Right Column (3 cases) */}
          <div className="col-lg-6 offset-lg-1">
            {rightCases.map((item) => (
              <div key={item.id} className="case-card mb-45">
                <div className="case-img">
                  <img src={item.image} alt={item.title} />
                  <span className="case-category">{item.category}</span>
                </div>
                <h3 className="fs-22 text-title">
                  {item.title}
                </h3>
                <p className="case-result-text mt-2">{item.result}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
