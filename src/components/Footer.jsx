import React, { useState } from 'react';
import { siteData } from '../data/content';

export const Footer = ({ onOpenConsultation }) => {
  const { brand, contact } = siteData;
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-area style-one">
      <div className="container">
        
        {/* Top 3-Column Widgets */}
        <div className="row pb-40">
          
          {/* Column 1: Brand & Direct Contacts */}
          <div className="col-lg-4 col-md-6 mb-35">
            <div className="footer-widget">
              <div className="d-flex align-items-center gap-12 mb-25">
                <div className="brand-logo-mark" style={{ width: '48px', height: '48px', fontSize: '20px' }}>S&A</div>
                <div>
                  <h4 className="text-white fw-bold mb-0 fs-22">Sanap & Associates</h4>
                  <span className="text_secondary fs-13 text-uppercase" style={{ letterSpacing: '0.15em' }}>LLP • Non-Profit Advisory</span>
                </div>
              </div>

              <p className="text-gray fs-16 mb-25">
                Premier NPO statutory compliance, audit, taxation, and legal advisory firm serving 2,000+ Trusts, Societies & Foundations across India.
              </p>

              <a href={`tel:${contact.phonePrimary.replace(/[^0-9+]/g, '')}`} className="contact-num d-block fw-bold text_secondary mb-12">
                {contact.phonePrimary}
              </a>
              <a href={`mailto:${contact.email}`} className="contact-mail fs-18 fw-bold text-white">
                {contact.email}
              </a>
              <span className="d-block text-gray fs-14 mt-2">
                <i className="ri-building-line text_secondary me-2"></i> {brand.llpNo}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-4 col-md-6 mb-35">
            <div className="footer-widget ps-lg-4">
              <h3 className="footer-widget-title">Quick Links</h3>
              <ul className="footer-menu style-one list-unstyled mb-0">
                <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About Us</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Services</a></li>
                <li><a href="#entities" onClick={(e) => { e.preventDefault(); scrollTo('entities'); }}>Entities We Serve</a></li>
                <li><a href="#case-studies" onClick={(e) => { e.preventDefault(); scrollTo('case-studies'); }}>Case Studies</a></li>
                <li><a href="#why-us" onClick={(e) => { e.preventDefault(); scrollTo('why-us'); }}>Why Choose Us</a></li>
                <li><a href="#retainers" onClick={(e) => { e.preventDefault(); scrollTo('retainers'); }}>Retainers</a></li>
                <li><a href="#leadership" onClick={(e) => { e.preventDefault(); scrollTo('leadership'); }}>Our Leadership</a></li>
                <li><a href="#insights" onClick={(e) => { e.preventDefault(); scrollTo('insights'); }}>Articles & FAQs</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact Details</a></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Newsletter & Regulatory Alerts */}
          <div className="col-lg-4 col-md-12 mb-35">
            <div className="footer-widget">
              <h3 className="footer-widget-title">Regulatory Alerts</h3>
              <p className="text-gray fs-16 mb-20">
                Stay updated with critical compliance deadlines, Form 10B/10BB revisions, FCRA notifications, and Charity Commissioner rules.
              </p>

              {subscribed ? (
                <div className="p-16 rounded bg-albastor text_primary fs-15 fw-semibold">
                  <i className="ri-checkbox-circle-fill text_optional me-2"></i>
                  Subscribed to statutory compliance alerts!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form style-one">
                  <input 
                    type="email" 
                    required
                    placeholder="Enter official email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button type="submit" aria-label="Subscribe">
                    <i className="ri-send-plane-fill"></i>
                  </button>
                </form>
              )}

              <p className="fs-13 text-gray opacity-75 mt-2">
                Strict privacy. No spam. Only vital NPO statutory updates.
              </p>
            </div>
          </div>

        </div>

        {/* Giant Typographic Brand Banner */}
        <div className="footer-giant-brand">
          <span className="logo-text">SANAP & ASSOCIATES LLP</span>
          
          <div className="footer-social-bar">
            <p className="text-gray fs-16 mb-0" style={{ maxWidth: '600px' }}>
              “NPOs work for society. We work for them.” Single-window legal, tax, audit, and governance execution across India.
            </p>

            <ul className="social-profile style-one list-unstyled mb-0">
              <li>
                <a href={contact.socials.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                  <i className="ri-facebook-fill"></i>
                </a>
              </li>
              <li>
                <a href={contact.socials.twitter} target="_blank" rel="noopener noreferrer" title="Twitter / X">
                  <i className="ri-twitter-x-line"></i>
                </a>
              </li>
              <li>
                <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <i className="ri-linkedin-fill"></i>
                </a>
              </li>
              <li>
                <a href={contact.socials.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                  <i className="ri-instagram-line"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom d-flex flex-wrap align-items-center justify-content-between">
          <p className="text-gray fs-15 mb-10 mb-md-0">
            <i className="ri-copyright-line me-1"></i> 2026 <span className="text_secondary">{brand.name}</span>. All Rights Reserved. [Client Placeholders Ready]
          </p>

          <ul className="footer-bottom-menu list-unstyled mb-0">
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Terms & Conditions</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Privacy Policy</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); onOpenConsultation("Statutory Disclaimer"); }}>Statutory Disclaimer</a>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
};
