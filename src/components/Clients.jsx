import React from 'react';
import { siteData } from '../data/content';

export const Clients = () => {
  const { clients } = siteData;

  return (
    <section id="clients" className="clients-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag section-tag-primary">
            Institutional Trust
          </div>
          <h2 className="section-title">
            {clients.heading}
          </h2>
          <p className="section-desc">
            Serving leading trusts, healthcare bodies, community trusts, and CSR foundations across India.
          </p>
        </div>

        {/* 8 Client Badges Grid (4x2 on Desktop, 2x4 on Tablet/Mobile) */}
        <div className="row g-3 mb-32">
          {clients.list.map((client, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div className="client-badge-card">
                <div className="client-badge-name">
                  {client.name}
                </div>
                <div className="client-badge-type">
                  {client.type}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Note */}
        <div className="text-center">
          <span className="fs-14 text-muted" style={{ fontStyle: 'italic' }}>
            <i className="ri-information-line me-1"></i> {clients.supportingNote}
          </span>
        </div>

      </div>
    </section>
  );
};
