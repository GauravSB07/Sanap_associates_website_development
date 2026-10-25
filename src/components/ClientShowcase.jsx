import React from 'react';
import { siteData } from '../data/content';

export const ClientShowcase = () => {
  const row1 = siteData.clients.slice(0, 3);
  const row2 = siteData.clients.slice(3, 10);

  return (
    <section className="limpa-brand-area container">
      <div className="row align-items-center mb-25">
        <div className="col-xxl-5 col-xl-4 col-lg-5 mb-20 mb-lg-0">
          <h6 className="limpa-brand-title">OUR ESTEEMED CLIENTS</h6>
          <p className="text-gray fs-14 mt-1 mb-0">Trusted by over 2,000+ non-profit institutions & foundations across India</p>
        </div>
        
        {/* Top 3 client cards */}
        <div className="col-xxl-7 col-xl-8 col-lg-7">
          <div className="brand-logo-wrap">
            {row1.map((client, idx) => (
              <div key={idx} className="brand-logo style-one round-20">
                <span className="brand-client-name">{client.name}</span>
                <span className="brand-client-cat">{client.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remaining 7 client cards in a second row matching Limpa layout */}
      <div className="row">
        <div className="col-12">
          <div className="brand-logo-wrap">
            {row2.map((client, idx) => (
              <div key={idx} className="brand-logo style-one round-20">
                <span className="brand-client-name">{client.name}</span>
                <span className="brand-client-cat">{client.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
