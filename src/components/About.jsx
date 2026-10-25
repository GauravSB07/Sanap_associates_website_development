import React from 'react';
import { siteData } from '../data/content';

export const About = () => {
  const { about } = siteData;

  return (
    <section id="about" className="about-area style-two">
      <div className="container">
        
        {/* Intro Section Title Statement */}
        <div className="row mb-45">
          <div className="col-xl-10 offset-xl-1">
            <h2 className="section-title style-two fw-semibold text-center mb-35">
              {about.sectionTitle}
            </h2>
          </div>
        </div>

        {/* 2-Column About Grid */}
        <div className="row">
          
          {/* Left Column: Mission, Vision, Feature Image & Trust Builders */}
          <div className="col-lg-7 mb-30 mb-lg-0">
            <div className="about-content">
              <div className="row">
                
                {/* Mission Card */}
                <div className="col-md-6 mb-25">
                  <div className="about-card style-one bg-albastor h-100">
                    <h3 className="fs-22 text-title mb-12">{about.mission.title}</h3>
                    <p className="fs-15 text-para mb-0">{about.mission.desc}</p>
                  </div>
                </div>

                {/* Vision Card (in neon mint green bg_secondary) */}
                <div className="col-md-6 mb-25">
                  <div className="about-card style-one bg_secondary h-100">
                    <h3 className="fs-22 text_primary mb-12">{about.vision.title}</h3>
                    <p className="fs-15 text_primary mb-0">{about.vision.desc}</p>
                  </div>
                </div>

                {/* Trust Builders Block */}
                <div className="col-12">
                  <div className="features-wrap">
                    <div className="feature-img">
                      <img src={about.featureImg} alt="Trust Builders Team" />
                    </div>
                    <div className="feature-info">
                      <h3 className="fs-22 text-title">Trust Builders</h3>
                      <ul className="feature-list style-one list-unstyled mb-0">
                        {about.features.map((feature, idx) => (
                          <li key={idx} className="fs-16 text-title">
                            <i className="ri-check-line check-icon"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Founder's Note Card */}
          <div className="col-lg-5">
            <div className="about-img-wrap h-100">
              <div>
                <span className="badge bg-albastor text-title px-3 py-1 rounded-pill mb-20 d-inline-block font-secondary fw-bold" style={{ fontSize: '12px', letterSpacing: '0.08em' }}>
                  FOUNDER'S NOTE
                </span>
                <h3>{about.foundersNote.quote}</h3>
                <span className="founder-attribution">{about.foundersNote.author}</span>
                <span className="text-gray fs-15 d-block mt-1">{about.foundersNote.role}</span>
              </div>

              <div className="mt-40">
                <p className="text-gray fs-16 mb-0" style={{ lineHeight: '1.65' }}>
                  {about.foundersNote.teamText}
                </p>
              </div>

              <div className="about-watermark">SANAP</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
