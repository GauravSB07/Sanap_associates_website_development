import React from 'react';
import { siteData } from '../data/content';

export const Funfact = () => {
  return (
    <section className="funfact-area style-one">
      <div className="container-fluid px-xxl-5">
        <div className="funfact-wrap style-one">
          {siteData.funfacts.map((fact, idx) => (
            <div key={idx} className="funfact-card style-one mb-15">
              <h4 className="fw-semibold mb-0 text_primary">{fact.value}</h4>
              <span className="fs-xxl-18 text-title d-block mb-0">{fact.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
