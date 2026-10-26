import React, { useState } from 'react';
import { siteData } from '../data/content';

const clientIcons = [
  'ri-hospital-line',
  'ri-building-4-line',
  'ri-shield-star-line',
  'ri-plant-line',
  'ri-hand-heart-line',
  'ri-shake-hands-line',
  'ri-heart-pulse-line',
  'ri-service-line'
];

export const Clients = () => {
  const { clients } = siteData;
  const [activeCategory, setActiveCategory] = useState("All Sectors");

  const filteredClients = activeCategory === "All Sectors"
    ? clients.list
    : clients.list.filter(c => c.category === activeCategory);

  return (
    <section 
      id="clients" 
      className="clients-section section-padding-sm" 
      data-theme="light"
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center mb-40">
          <div className="section-badge-tag reveal-up">
            <i className="ri-building-line me-1"></i> Institutional Trust &amp; Retainers
          </div>
          <h2 className="section-heading-editorial reveal-up">
            {clients.heading}
          </h2>
          <p className="section-subtext reveal-up">
            Advising esteemed state associations, healthcare councils, corporate CSR foundations, and historical public charitable trusts across India.
          </p>
        </div>

        {/* Dynamic Sector Filter Navigation */}
        <div className="client-filter-bar d-flex flex-wrap justify-content-center gap-10 mb-40 reveal-up">
          {clients.categories.map((cat, idx) => (
            <button
              key={idx}
              className={`category-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              data-cursor-text="Filter"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Institutional Cards Grid */}
        <div className="row g-3 mb-32">
          {filteredClients.map((client, idx) => (
            <div key={client.name} className="col-md-6 col-lg-3 reveal-up">
              <div 
                className="brand-logo-card"
                data-cursor-text="Client"
              >
                <div className="brand-card-top d-flex align-items-center justify-content-between mb-16">
                  <div className="brand-icon-wrapper">
                    <i className={clientIcons[idx % clientIcons.length]}></i>
                  </div>
                  <span className="brand-sector-pill">
                    {client.category || client.type}
                  </span>
                </div>

                <div className="brand-content">
                  <h3 className="brand-title-text">
                    {client.name}
                  </h3>
                  <div className="brand-tag-strip">
                    <span className="brand-tag-bullet">•</span>
                    <span className="brand-tag-name">{client.tag || client.type}</span>
                  </div>
                </div>

                <div className="brand-card-footer mt-16 pt-12 border-top-subtle d-flex align-items-center justify-content-between">
                  <span className="verified-badge-text">
                    <i className="ri-shield-check-fill text-gold me-1"></i> Verified Retainer
                  </span>
                  <i className="ri-arrow-right-up-line brand-arrow-hint"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote with institutional verification notice */}
        <div className="text-center reveal-up">
          <div className="clients-disclaimer-chip">
            <i className="ri-information-line text-gold me-2"></i>
            <span>{clients.supportingNote}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Clients;
