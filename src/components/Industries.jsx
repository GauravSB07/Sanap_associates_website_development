import React from 'react';
import { siteData } from '../data/content';

export const Industries = ({ onOpenConsultation }) => {
  return (
    <section id="entities" className="industry-area style-two position-relative overflow-hidden z-1">
      {/* Background Image with Dark Teal Overlay */}
      <div className="industry-bg">
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1400&auto=format&fit=crop&q=80" 
          alt="Entities We Serve Background" 
        />
      </div>

      <div className="container position-relative z-1">
        <div className="row">
          <div className="col-xl-10 offset-xl-1">
            <h2 className="section-title style-two fw-semibold text-center text-white mb-0">
              <span className="position-relative z-1">Entities We Serve</span> — Tailored Statutory Solutions for Every Non-Profit Structure
            </h2>
          </div>
        </div>

        {/* 8 Sector Cards with Limpa Polygon Clip-Path */}
        <div className="industry-card-wrap">
          {siteData.entities.map((item, idx) => (
            <div 
              key={idx} 
              className="industry-category-card style-one"
              onClick={() => onOpenConsultation(item.title)}
            >
              <div className="industry-icon-wrap">
                <i className={item.icon}></i>
              </div>
              <h3 className="font-primary fw-bold text-white mb-6">{item.title}</h3>
              <p className="mb-0">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
