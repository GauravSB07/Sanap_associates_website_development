import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';

export const Header = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  const popularTopics = [
    '12A & 80G Exemption',
    'FCRA Banking & Filing',
    'CSR-1 Registration',
    'Change Report (Trustee)',
    'Charity Commissioner Audit',
    'Section-8 MCA Compliance'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = ['hero', 'clients', 'about', 'services', 'why-us', 'founder', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    scrollToSection('services');
  };

  const handleSelectTopic = (topic) => {
    setSearchQuery(topic);
    scrollToSection('services');
  };

  return (
    <>
      <header className={`prestige-header ${isScrolled ? 'is-sticky' : ''}`} id="navbar">
        <div className="container">
          <div className="header-inner d-flex align-items-center justify-content-between">
            
            {/* Brand Logo & Editorial Title */}
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} 
              className="header-brand d-flex align-items-center gap-12"
              data-cursor-text="Home"
            >
              <div className="brand-emblem-frame">
                <img 
                  src={siteData.brand.logo || "/images/logo.jpg"} 
                  alt={siteData.brand.name} 
                  className="brand-logo-img" 
                />
              </div>
              <div className="brand-text-block">
                <span className="brand-primary-name">{siteData.brand.name}</span>
                <span className="brand-statutory-tag">{siteData.brand.tagline}</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="header-navigation d-none d-lg-block">
              <ul className="nav-link-list d-flex align-items-center m-0 p-0 list-unstyled">
                <li>
                  <a 
                    href="#hero" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} 
                    className={`nav-anchor ${activeSection === 'hero' ? 'is-active' : ''}`}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#clients" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('clients'); }} 
                    className={`nav-anchor ${activeSection === 'clients' ? 'is-active' : ''}`}
                  >
                    Institutions
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} 
                    className={`nav-anchor ${activeSection === 'about' ? 'is-active' : ''}`}
                  >
                    About Practice
                  </a>
                </li>
                <li>
                  <a 
                    href="#services" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} 
                    className={`nav-anchor ${activeSection === 'services' ? 'is-active' : ''}`}
                  >
                    Statutory Services
                  </a>
                </li>
                <li>
                  <a 
                    href="#why-us" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('why-us'); }} 
                    className={`nav-anchor ${activeSection === 'why-us' ? 'is-active' : ''}`}
                  >
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a 
                    href="#founder" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('founder'); }} 
                    className={`nav-anchor ${activeSection === 'founder' ? 'is-active' : ''}`}
                  >
                    Leadership
                  </a>
                </li>
              </ul>
            </nav>

            {/* Actions: Search, Book Consultation & Mobile Hamburger */}
            <div className="header-actions d-flex align-items-center gap-12">
              
              {/* Consultation CTA Button */}
              <div className="d-none d-lg-block">
                <button 
                  onClick={onOpenConsultation}
                  className="btn-prestige btn-prestige-gold btn-prestige-sm"
                  id="header-consultation-btn"
                  data-cursor-text="Book"
                >
                  <span>Book Consultation</span>
                  <i className="ri-arrow-right-line ms-1"></i>
                </button>
              </div>

              {/* Quick Search Trigger */}
              <div className="position-relative">
                <button 
                  type="button"
                  className="header-icon-btn"
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Toggle search"
                  data-cursor-text="Search"
                >
                  <i className={searchOpen ? "ri-close-line" : "ri-search-line"}></i>
                </button>

                {/* Search Dropdown with Statutory Quick Topics */}
                {searchOpen && (
                  <div className="search-flyout-dropdown show">
                    <form className="search-input-wrap position-relative mb-16" onSubmit={handleSearchSubmit}>
                      <input 
                        type="search" 
                        className="search-input-field" 
                        placeholder="Search BPT Act, 12A, FCRA, CSR-1, Audits..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button type="submit" className="search-action-submit" aria-label="Search">
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </form>

                    <div className="search-suggestions-block">
                      <span className="suggestions-label">Popular Statutory Topics:</span>
                      <div className="suggestions-chips-wrap d-flex flex-wrap gap-6 mt-8">
                        {popularTopics.map((topic, idx) => (
                          <button
                            type="button"
                            key={idx}
                            className="suggestion-chip"
                            onClick={() => handleSelectTopic(topic)}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Drawer Trigger */}
              <div className="d-lg-none">
                <button 
                  type="button" 
                  className="mobile-hamburger-btn"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open mobile navigation"
                >
                  <span className="ham-line"></span>
                  <span className="ham-line"></span>
                  <span className="ham-line"></span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Offcanvas Drawer */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-drawer-top d-flex align-items-center justify-content-between mb-24">
          <div className="d-flex align-items-center gap-10">
            <div className="brand-emblem-frame">
              <img 
                src={siteData.brand.logo || "/images/logo.jpg"} 
                alt={siteData.brand.name} 
                className="brand-logo-img" 
              />
            </div>
            <div>
              <span className="brand-primary-name text-white fs-16 d-block">{siteData.brand.shortName}</span>
              <span className="brand-statutory-tag">{siteData.brand.tagline}</span>
            </div>
          </div>

          <button 
            type="button" 
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <nav className="mobile-menu-links mb-32">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="mobile-nav-item">
            <i className="ri-home-4-line me-2 text-gold"></i> Home
          </a>
          <a href="#clients" onClick={(e) => { e.preventDefault(); scrollToSection('clients'); }} className="mobile-nav-item">
            <i className="ri-building-line me-2 text-gold"></i> Esteemed Clients
          </a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="mobile-nav-item">
            <i className="ri-shield-user-line me-2 text-gold"></i> About Us
          </a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="mobile-nav-item">
            <i className="ri-folder-shield-2-line me-2 text-gold"></i> Statutory Services
          </a>
          <a href="#why-us" onClick={(e) => { e.preventDefault(); scrollToSection('why-us'); }} className="mobile-nav-item">
            <i className="ri-award-line me-2 text-gold"></i> Why Choose Us
          </a>
          <a href="#founder" onClick={(e) => { e.preventDefault(); scrollToSection('founder'); }} className="mobile-nav-item">
            <i className="ri-quill-pen-line me-2 text-gold"></i> Founder's Note
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="mobile-nav-item">
            <i className="ri-phone-line me-2 text-gold"></i> Contact Desk
          </a>
        </nav>

        <div className="mobile-drawer-cta mb-24">
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
            className="btn-prestige btn-prestige-gold w-100"
          >
            <span>Book a Consultation</span>
            <i className="ri-arrow-right-line ms-2"></i>
          </button>
        </div>

        <div className="mobile-drawer-footer mt-auto pt-20 border-top-dark">
          <div className="mobile-contact-row mb-8">
            <i className="ri-phone-fill text-gold me-2"></i>
            <a href={`tel:${siteData.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-white">
              {siteData.contact.phoneDisplay || siteData.contact.phone}
            </a>
          </div>
          <div className="mobile-contact-row">
            <i className="ri-mail-fill text-gold me-2"></i>
            <a href={`mailto:${siteData.contact.email}`} className="text-white-muted fs-13">
              {siteData.contact.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
