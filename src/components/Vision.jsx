import React from 'react';
import { siteData } from '../data/content';

export const Vision = () => {
  const { vision } = siteData;

  return (
    <section id="vision" className="vision-section section-padding">
      <div className="container">
        <div className="vision-card">
          
          <div className="section-tag section-tag-primary mb-24">
            {vision.heading}
          </div>

          <div className="mb-20 text-muted" style={{ fontSize: '32px', lineHeight: 1 }}>
            <i className="ri-double-quotes-l"></i>
          </div>

          <blockquote className="vision-quote">
            {vision.quote}
          </blockquote>

        </div>
      </div>
    </section>
  );
};
