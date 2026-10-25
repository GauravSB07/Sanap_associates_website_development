import React from 'react';
import { siteData } from '../data/content';

export const Leadership = () => {
  return (
    <section id="leadership" className="pt-90 pb-90">
      <div className="container">
        
        {/* Title */}
        <div className="row mb-45">
          <div className="col-xl-8 offset-xl-2">
            <h2 className="section-title style-two fw-semibold text-center mb-45">
              The Experienced <span className="position-relative z-1">Professionals</span> Guiding Our Commitment To Non-Profit Excellence
            </h2>
          </div>
        </div>

        {/* 3 Leadership Cards */}
        <div className="row justify-content-center">
          {siteData.leadership.map((leader, idx) => (
            <div key={idx} className="col-xl-4 col-md-6 mb-30">
              <div className="team-card style-one">
                
                {/* Image Box */}
                <div className="team-img">
                  <img src={leader.image} alt={leader.name} />
                  
                  <div className="team-info">
                    <div>
                      <h3 className="fs-20 fw-bold mb-1 text-white">{leader.name}</h3>
                      <span className="fs-15 text-gray">{leader.role}</span>
                    </div>

                    <a 
                      href={`mailto:${leader.email}`} 
                      className="mail-link"
                      title={`Email ${leader.name}`}
                    >
                      <i className="ri-mail-fill"></i>
                    </a>
                  </div>
                </div>

                {/* Expertise Details */}
                <div className="team-meta-desc">
                  <p className="text-para mb-15">{leader.bio}</p>
                  
                  <h6 className="fs-14 font-primary fw-bold text-title mb-10 text-uppercase" style={{ letterSpacing: '0.08em' }}>
                    AREAS OF EXPERTISE
                  </h6>

                  <ul className="skill-list list-unstyled mb-0">
                    {leader.expertise.map((skill, sIdx) => (
                      <li key={sIdx}>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
