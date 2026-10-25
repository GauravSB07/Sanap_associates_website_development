import React from 'react';
import { siteData } from '../data/content';

export const WhyChooseUs = () => {
  const { whyChooseUs } = siteData;

  return (
    <section id="why-us" className="pt-90 pb-90">
      <div className="container">
        
        <div className="wh-box style-one">
          
          {/* Top Heading */}
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <h2 className="section-title style-two text-white fw-bold mb-35 text-center">
                {whyChooseUs.headline}
              </h2>
            </div>
          </div>

          {/* Body: Left Photo & Right Points + Quote */}
          <div className="row gx-0 position-relative align-items-end">
            
            {/* Left Image */}
            <div className="col-lg-6">
              <div className="wh-bg">
                <img src={whyChooseUs.bgImage} alt="Sanap & Associates Consultation" />
              </div>
            </div>

            {/* Right Content */}
            <div className="col-lg-6 d-flex flex-column justify-content-between">
              <div className="wh-content position-relative">
                <p className="text-gray fs-xxl-18 mb-25">
                  {whyChooseUs.paragraph}
                </p>

                <h3 className="fs-24 text-white mb-20">What Sets Us Apart</h3>

                <ul className="feature-list style-one list-unstyled mb-35">
                  {whyChooseUs.points.map((pt, idx) => (
                    <li key={idx} className="position-relative fs-xxl-18 text-gray">
                      <i className="ri-check-line check-icon text_secondary"></i>
                      <span className="text-white">{pt}</span>
                    </li>
                  ))}
                </ul>

                <span className="vertical-text">Why Choose Sanap & Associates</span>
              </div>

              {/* Mint Quote Box */}
              <div className="wh-quote-box">
                <h4>{whyChooseUs.quote}</h4>
                <span>{whyChooseUs.author} — {whyChooseUs.role}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
