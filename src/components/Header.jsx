import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';

export const Header = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-container">
            
            {/* Brand Logo & Name */}
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} 
              className="header-brand"
            >
              <div className="brand-badge">S&A</div>
              <div className="brand-text">
                <h1>{siteData.brand.name}</h1>
                <span>NPO Compliance & Advisory</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="header-nav">
              <a 
                href="#hero" 
                onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} 
                className="nav-link"
              >
                Home
              </a>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} 
                className="nav-link"
              >
                About
              </a>
              <a 
                href="#services" 
                onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} 
                className="nav-link"
              >
                Services
              </a>
              <a 
                href="#why-us" 
                onClick={(e) => { e.preventDefault(); scrollToSection('why-us'); }} 
                className="nav-link"
              >
                Why Choose Us
              </a>
              <a 
                href="#clients" 
                onClick={(e) => { e.preventDefault(); scrollToSection('clients'); }} 
                className="nav-link"
              >
                Clients
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} 
                className="nav-link"
              >
                Contact
              </a>
            </nav>

            {/* Actions: One Prominent Consultation CTA + Mobile Toggle */}
            <div className="header-actions">
              <button 
                onClick={onOpenConsultation}
                className="btn btn-primary"
                id="header-consultation-btn"
              >
                <span className="btn-icon-one">
                  <i className="ri-arrow-right-line"></i>
                </span>
                <span>Book a Consultation</span>
              </button>

              <button 
                type="button" 
                className="mobile-toggle"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Toggle navigation menu"
              >
                <i className="ri-menu-line"></i>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer-backdrop" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="d-flex justify-content-between align-items-center mb-32">
          <div className="header-brand">
            <div className="brand-badge">S&A</div>
            <div className="brand-text">
              <h1 style={{ fontSize: '1.1rem' }}>{siteData.brand.name}</h1>
              <span>NPO Compliance</span>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-toggle"
            aria-label="Close menu"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <nav className="d-flex flex-column gap-16 mb-32">
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} 
            className="nav-link" 
            style={{ fontSize: '1.1rem' }}
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} 
            className="nav-link" 
            style={{ fontSize: '1.1rem' }}
          >
            About
          </a>
          <a 
            href="#services" 
            onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} 
            className="nav-link" 
            style={{ fontSize: '1.1rem' }}
          >
            Services
          </a>
          <a 
            href="#why-us" 
            onClick={(e) => { e.preventDefault(); scrollToSection('why-us'); }} 
            className="nav-link" 
            style={{ fontSize: '1.1rem' }}
          >
            Why Choose Us
          </a>
          <a 
            href="#clients" 
            onClick={(e) => { e.preventDefault(); scrollToSection('clients'); }} 
            className="nav-link" 
            style={{ fontSize: '1.1rem' }}
          >
            Clients
          </a>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} 
            className="nav-link" 
            style={{ fontSize: '1.1rem' }}
          >
            Contact
          </a>
        </nav>

        <div className="mt-auto">
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
            className="btn btn-primary w-100"
          >
            <span>Book a Consultation</span>
          </button>

          <p className="fs-14 text-muted mt-20 mb-0 text-center">
            {siteData.brand.llpNo}
          </p>
        </div>
      </div>
    </>
  );
};
