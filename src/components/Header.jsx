import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';

export const Header = ({ onOpenConsultation, onOpenSearch }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar-area style-two ${isSticky ? 'sticky-nav' : ''}`}>
        <div className="container style-two">
          <div className="navbar-wrapper d-flex justify-content-between align-items-center">
            
            {/* Logo */}
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="navbar-brand">
              <div className="brand-logo-mark">S&A</div>
              <div>
                <span className="brand-name-text">Sanap & Associates</span>
                <span className="brand-sub-text">LLP • NPO Compliance</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="menu-area d-none d-lg-block">
              <ul className="menu-section mb-0">
                <li className="menu-item">
                  <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="menu-link active">Home</a>
                </li>
                <li className="menu-item">
                  <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="menu-link">About Us</a>
                </li>
                <li className="menu-item">
                  <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} className="menu-link">
                    Services <i className="ri-arrow-down-s-line"></i>
                  </a>
                  <ul className="menu-subs">
                    <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} className="menu-sub-link">Registration & Certification</a></li>
                    <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} className="menu-sub-link">Audit & Taxation (Form 10B/10BB)</a></li>
                    <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} className="menu-sub-link">Legal & Governance</a></li>
                    <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} className="menu-sub-link">Accounting & Advisory</a></li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="#entities" onClick={(e) => { e.preventDefault(); scrollTo('entities'); }} className="menu-link">Entities We Serve</a>
                </li>
                <li className="menu-item">
                  <a href="#case-studies" onClick={(e) => { e.preventDefault(); scrollTo('case-studies'); }} className="menu-link">Case Studies</a>
                </li>
                <li className="menu-item">
                  <a href="#retainers" onClick={(e) => { e.preventDefault(); scrollTo('retainers'); }} className="menu-link">Retainers</a>
                </li>
                <li className="menu-item">
                  <a href="#insights" onClick={(e) => { e.preventDefault(); scrollTo('insights'); }} className="menu-link">Insights</a>
                </li>
                <li className="menu-item">
                  <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className="menu-link">Contact</a>
                </li>
              </ul>
            </nav>

            {/* Right Options */}
            <div className="other-options">
              {/* Consultation Button */}
              <div className="option-item d-none d-lg-block">
                <button 
                  onClick={onOpenConsultation}
                  className="btn style-one"
                  aria-label="Get Free Consultation"
                >
                  <span className="btn-icon-one">
                    <i className="ri-arrow-right-line"></i>
                  </span>
                  <span className="btn-text">Get A Free Consultation</span>
                  <span className="btn-icon-two">
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </button>
              </div>

              {/* Search Button */}
              <div className="option-item">
                <button 
                  onClick={onOpenSearch}
                  className="search-btn"
                  title="Search Services & Compliance Guides"
                  aria-label="Search"
                >
                  <i className="ri-search-line"></i>
                </button>
              </div>

              {/* Mobile Hamburger Toggle */}
              <div className="option-item d-lg-none">
                <button 
                  type="button" 
                  className="menu-mobile-trigger"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Toggle Navigation"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Offcanvas Drawer */}
      {mobileMenuOpen && (
        <div className="offcanvas-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
      )}
      <div className={`mobile-offcanvas ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="d-flex justify-content-between align-items-center mb-35">
          <div className="navbar-brand">
            <div className="brand-logo-mark">S&A</div>
            <div>
              <span className="brand-name-text">Sanap & Associates</span>
              <span className="brand-sub-text">LLP • NPO Compliance</span>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white fs-28"
            aria-label="Close menu"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <ul className="d-flex flex-column gap-15 mb-35">
          <li>
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="text-white fs-18 fw-medium d-block py-8">Home</a>
          </li>
          <li>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="text-white fs-18 fw-medium d-block py-8">About Us</a>
          </li>
          <li>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} className="text-white fs-18 fw-medium d-block py-8">Services & Approvals</a>
          </li>
          <li>
            <a href="#entities" onClick={(e) => { e.preventDefault(); scrollTo('entities'); }} className="text-white fs-18 fw-medium d-block py-8">Entities We Serve</a>
          </li>
          <li>
            <a href="#case-studies" onClick={(e) => { e.preventDefault(); scrollTo('case-studies'); }} className="text-white fs-18 fw-medium d-block py-8">Case Studies</a>
          </li>
          <li>
            <a href="#why-us" onClick={(e) => { e.preventDefault(); scrollTo('why-us'); }} className="text-white fs-18 fw-medium d-block py-8">Why Choose Us</a>
          </li>
          <li>
            <a href="#leadership" onClick={(e) => { e.preventDefault(); scrollTo('leadership'); }} className="text-white fs-18 fw-medium d-block py-8">Leadership</a>
          </li>
          <li>
            <a href="#retainers" onClick={(e) => { e.preventDefault(); scrollTo('retainers'); }} className="text-white fs-18 fw-medium d-block py-8">Compliance Retainers</a>
          </li>
          <li>
            <a href="#insights" onClick={(e) => { e.preventDefault(); scrollTo('insights'); }} className="text-white fs-18 fw-medium d-block py-8">Articles & Updates</a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className="text-white fs-18 fw-medium d-block py-8">Contact & Address</a>
          </li>
        </ul>

        <div className="mt-auto">
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
            className="btn style-one w-100"
          >
            <span className="btn-icon-one"><i className="ri-arrow-right-line"></i></span>
            <span className="btn-text">Book Free Consultation</span>
            <span className="btn-icon-two"><i className="ri-arrow-right-line"></i></span>
          </button>
          
          <div className="mt-25 text-gray fs-14">
            <p className="mb-6"><i className="ri-phone-line text_secondary me-2"></i> {siteData.contact.phonePrimary}</p>
            <p className="mb-0"><i className="ri-mail-line text_secondary me-2"></i> {siteData.contact.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};
