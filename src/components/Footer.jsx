import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';
import { dataService } from '../services/dataService';

export const Footer = ({ onOpenConsultation, onNavigate }) => {
  const { brand, services } = siteData;
  const [firmInfo, setFirmInfo] = useState(() => dataService.getFirmInfo());

  useEffect(() => {
    const handleUpdate = () => {
      setFirmInfo(dataService.getFirmInfo());
    };
    window.addEventListener('sanap_data_updated', handleUpdate);
    return () => window.removeEventListener('sanap_data_updated', handleUpdate);
  }, []);

  const handleNav = (pageId) => {
    onNavigate?.(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    Sanap &amp; Associates
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
                <span>Statutory Practice • Est. 2010</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (Original Site Pages) */}
          <div className="col-lg-2 col-md-6 col-sm-6">
            <h4 className="footer-column-heading text-white mb-20">Pages</h4>
            <ul className="footer-nav-list list-unstyled m-0 p-0">
              <li>
                <a href="#/" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#/about-us" onClick={(e) => { e.preventDefault(); handleNav('about-us'); }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#/our-team" onClick={(e) => { e.preventDefault(); handleNav('our-team'); }}>
                  Our Team
                </a>
              </li>
              <li>
                <a href="#/services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>
                  Services
                </a>
              </li>
              <li>
                <a href="#/news" onClick={(e) => { e.preventDefault(); handleNav('news'); }}>
                  News
                </a>
              </li>
              <li>
                <a href="#/careers" onClick={(e) => { e.preventDefault(); handleNav('careers'); }}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#/event-sa" onClick={(e) => { e.preventDefault(); handleNav('event-sa'); }}>
                  Event @ S&amp;A
                </a>
              </li>
              <li>
                <a href="#/contact-us" onClick={(e) => { e.preventDefault(); handleNav('contact-us'); }}>
                  Contact Us
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
                <a href={`tel:${firmInfo.phonePrimary.replace(/[^0-9+]/g, '')}`} className="advisory-value-tel text-gold">
                  {firmInfo.phonePrimary}
                </a>
              </div>

              <div className="advisory-row mb-14">
                <span className="advisory-label">Executive Mobile</span>
                <a href={`tel:${firmInfo.phoneMobile.replace(/[^0-9+]/g, '')}`} className="advisory-value text-white">
                  {firmInfo.phoneMobile}
                </a>
              </div>

              <div className="advisory-row mb-14">
                <span className="advisory-label">Official Correspondence</span>
                <a href={`mailto:${firmInfo.emailPrimary}`} className="advisory-value text-white">
                  {firmInfo.emailPrimary}
                </a>
              </div>

              <div className="advisory-row mb-14">
                <span className="advisory-label">Operating Schedule</span>
                <span className="advisory-value text-white-muted">{firmInfo.officeHours}</span>
              </div>

              <div className="advisory-row mb-20">
                <span className="advisory-label">Advisory Office</span>
                <span className="advisory-value text-white-muted fs-13">{firmInfo.address}</span>
              </div>

              <button 
                onClick={onOpenConsultation}
                className="btn-prestige btn-prestige-gold btn-prestige-sm w-100"
                id="footer-callback-btn"
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
            &copy; {new Date().getFullYear()} {firmInfo.name || brand.name}. All statutory non-profit governance rights reserved.
          </p>

          <div className="d-flex align-items-center gap-20">
            <a 
              href="#/admin" 
              onClick={(e) => { e.preventDefault(); handleNav('admin'); }} 
              className="admin-portal-link text-white-muted fs-12 d-inline-flex align-items-center gap-6"
              title="Restricted Staff & Administrator Console"
            >
              <i className="ri-lock-line text-gold"></i>
              <span>Admin Portal</span>
            </a>

            <div className="footer-social-deck d-flex align-items-center gap-10">
              <a href="https://www.facebook.com/Sanap-Associates-LLP-339510096471608/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-emblem-btn">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-emblem-btn">
                <i className="ri-linkedin-fill"></i>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-emblem-btn">
                <i className="ri-twitter-x-line"></i>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
