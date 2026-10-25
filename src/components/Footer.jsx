import React from 'react';
import { siteData } from '../data/content';

export const Footer = ({ onOpenConsultation }) => {
  const { brand, contact } = siteData;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        
        {/* Main Footer Widgets */}
        <div className="row g-4">
          
          {/* Column 1: Brand & Firm Specialisation */}
          <div className="col-lg-5">
            <div className="d-flex align-items-center gap-12 mb-20">
              <div className="brand-badge">S&A</div>
              <div>
                <h2 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>
                  {brand.name}
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {brand.category}
                </span>
              </div>
            </div>

            <p className="footer-desc">
              Dedicated statutory, legal, audit, taxation and governance support for Public Trusts, NGOs, Section-8 Companies, Societies, Religious Institutions, Mandals and Foundations across India.
            </p>

            <span className="fs-13 text-muted">
              {brand.llpNo}
            </span>
          </div>

          {/* Column 2: Clean Navigation Links */}
          <div className="col-md-6 col-lg-3">
            <h3 className="footer-widget-title">Navigation</h3>
            <ul className="footer-links">
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>
                  Core Services
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => { e.preventDefault(); scrollTo('why-us'); }}>
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#clients" onClick={(e) => { e.preventDefault(); scrollTo('clients'); }}>
                  Our Clients
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels & Placeholders */}
          <div className="col-md-6 col-lg-4">
            <h3 className="footer-widget-title">Consultation Channels</h3>
            <ul className="footer-contact-list">
              <li>
                <i className="ri-phone-line"></i>
                <div>
                  <span className="d-block fs-12 text-muted">Phone Placeholder:</span>
                  <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} style={{ color: '#FFFFFF' }}>
                    {contact.phone}
                  </a>
                </div>
              </li>

              <li>
                <i className="ri-mail-line"></i>
                <div>
                  <span className="d-block fs-12 text-muted">Email Placeholder:</span>
                  <a href={`mailto:${contact.email.split(' ')[0]}`} style={{ color: '#FFFFFF' }}>
                    {contact.email}
                  </a>
                </div>
              </li>

              <li>
                <i className="ri-map-pin-line"></i>
                <div>
                  <span className="d-block fs-12 text-muted">Office Location Placeholder:</span>
                  <span>{contact.address}</span>
                </div>
              </li>
            </ul>

            <div className="mt-20">
              <button 
                onClick={onOpenConsultation}
                className="btn btn-outline"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                <span>Request Advisory Callback</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="m-0">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>

          <p className="m-0 fs-13 text-muted">
            [Contact channels & address represent editable client placeholders]
          </p>
        </div>

      </div>
    </footer>
  );
};
