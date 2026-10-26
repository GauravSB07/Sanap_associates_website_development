import React from 'react';
import { siteData } from '../data/content';

export const Vision = () => {
  const { vision } = siteData;

  const visionPillars = [
    { title: "Statutory Simplicity", text: "Transforming dense charity commissioner acts into clear, actionable checklists." },
    { title: "Radical Transparency", text: "Zero ambiguity in filing deadlines, audit schedules, and trustee governance." },
    { title: "Frontline Empowerment", text: "Freeing non-profit visionaries to focus entirely on human and social impact." }
  ];

  return (
    <section 
      id="vision" 
      className="vision-section section-padding-sm" 
      data-theme="light"
    >
      <div className="container">
        <div className="vision-editorial-card reveal-up">
          
          <div className="vision-header text-center mb-30">
            <div className="section-badge-tag mb-16">
              <i className="ri-compass-3-line me-1"></i> Purpose &amp; Philosophical Vision
            </div>
            
            <div className="vision-quote-ornament mb-16">
              <i className="ri-double-quotes-l text-gold"></i>
            </div>

            <blockquote className="vision-quote-statement mb-24">
              {vision.quote}
            </blockquote>

            <p className="vision-author-creed">
              — The Institutional Manifesto of Sanap &amp; Associates LLP
            </p>
          </div>

          {/* 3 Core Vision Principles */}
          <div className="row g-3 pt-30 border-top-subtle">
            {visionPillars.map((p, idx) => (
              <div key={idx} className="col-md-4">
                <div className="vision-principle-item text-center">
                  <div className="principle-dot mb-8"></div>
                  <h4 className="principle-title mb-6">{p.title}</h4>
                  <p className="principle-text mb-0">{p.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Vision;
