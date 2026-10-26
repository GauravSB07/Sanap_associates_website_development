import React from 'react';
import { siteData } from '../data/content';

export const Footer = ({ onOpenConsultation }) => {
  const { brand, contact, services } = siteData;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer 
      id="contact" 
      className="site-master-footer" 
      data-theme="dark"
    >
      <div className="container">
        
        {/* Main Footer Grid */}
        <div className="row g-4 mb-50">
          
          {/* Column 1: Brand & Firm Identity */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-identity-card mb-24">
              <div className="d-flex align-items-center gap-12 mb-16">
                <div className="brand-emblem-frame bg-white">
                  <img 
                    src={brand.logo || "/images/logo.jpg"} 
                    alt={brand.name} 
                    className="brand-logo-img" 
                  />
                </div>
                <div>
                  <h3 className="footer-firm-title text-white m-0">
                    {brand.name}
                  </h3>
                  <span className="footer-firm-category text-gold">
                    {brand.category}
                  </span>
                </div>
              </div>

              <p className="footer-firm-desc text-white-muted mb-20">
                Dedicated statutory, legal, audit, taxation and governance support for Public Trusts, NGOs, Section-8 Companies, Societies, Religious Institutions, Mandals and Foundations across India.
              </p>

              <div className="footer-statutory-seal">
                <i className="ri-shield-check-fill text-gold me-2"></i>
                <span>{brand.llpNo} • Statutory Legal Practice</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="col-lg-2 col-md-6 col-sm-6">
            <h4 className="footer-column-heading text-white mb-20">Navigation</h4>
            <ul className="footer-nav-list list-unstyled m-0 p-0">
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#clients" onClick={(e) => { e.preventDefault(); scrollTo('clients'); }}>
                  Esteemed Institutions
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>
                  About Our Practice
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>
                  Statutory Services
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => { e.preventDefault(); scrollTo('why-us'); }}>
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#founder" onClick={(e) => { e.preventDefault(); scrollTo('founder'); }}>
                  Founder's Letter
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Statutory Practice Areas */}
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h4 className="footer-column-heading text-white mb-20">Practice Areas</h4>
            <ul className="footer-nav-list list-unstyled m-0 p-0">
              {services.categories.map((cat) => (
                <li key={cat.id}>
                  <a 
                    href="#services" 
                    onClick={(e) => { e.preventDefault(); scrollTo('services'); }}
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>
                  Charity Commissioner Change Reports
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>
                  FCRA Prior Permission &amp; Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Advisory Hotline & Office */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-column-heading text-white mb-20">Advisory Desk</h4>
            <div className="footer-advisory-block">
              
              <div className="advisory-row mb-14">
                <span className="advisory-label">Direct Telephone Hotline</span>
                <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="advisory-value-tel text-gold">
                  {contact.phoneDisplay || contact.phone}
                </a>
              </div>

              <div className="advisory-row mb-14">
                <span className="advisory-label">Official Correspondence</span>
                <a href={`mailto:${contact.email}`} className="advisory-value text-white">
                  {contact.email}
                </a>
              </div>

              <div className="advisory-row mb-14">
                <span className="advisory-label">Operating Schedule</span>
                <span className="advisory-value text-white-muted">{contact.hours}</span>
              </div>

              <div className="advisory-row mb-20">
                <span className="advisory-label">Advisory Office</span>
                <span className="advisory-value text-white-muted fs-13">{contact.address}</span>
              </div>

              <button 
                onClick={onOpenConsultation}
                className="btn-prestige btn-prestige-gold btn-prestige-sm w-100"
                id="footer-callback-btn"
                data-cursor-text="Schedule"
              >
                <span>Schedule Legal Callback</span>
                <i className="ri-arrow-right-line ms-1"></i>
              </button>

            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar pt-24 border-top-dark d-flex flex-wrap align-items-center justify-content-between gap-16">
          <p className="copyright-statement m-0 text-white-muted fs-13">
            &copy; {new Date().getFullYear()} {brand.name}. All statutory non-profit governance rights reserved.
          </p>

          <div className="footer-social-deck d-flex align-items-center gap-10">
            <a href={contact.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-emblem-btn">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-emblem-btn">
              <i className="ri-linkedin-fill"></i>
            </a>
            <a href={contact.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-emblem-btn">
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
