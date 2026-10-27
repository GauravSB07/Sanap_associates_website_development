import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';

export const Header = ({ 
  currentPage = 'home',
  onNavigate,
  onOpenConsultation
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const popularTopics = [
    'Direct Tax & Accounting',
    'GST Consultation & Returns',
    'Labour Law (PF / ESIC / PT)',
    'RERA Consultancy',
    'Corporate Law & ROC',
    'Trademark & Patent (IPR)',
    'Loan Advisory',
    'Govt Licenses (FSSAI/MSME)'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle Escape key when mobile menu is active
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (pageId) => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    onNavigate?.(pageId);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    onNavigate?.('services');
  };

  const handleSelectTopic = (topic) => {
    setSearchQuery(topic);
    setSearchOpen(false);
    onNavigate?.('services');
  };

  const navPages = [
    { id: 'home', label: 'Home', icon: 'ri-home-4-line' },
    { id: 'about-us', label: 'About Us', icon: 'ri-shield-user-line' },
    { id: 'our-team', label: 'Our Team', icon: 'ri-team-line' },
    { id: 'services', label: 'Services', icon: 'ri-folder-shield-2-line' },
    { id: 'news', label: 'News', icon: 'ri-newspaper-line' },
    { id: 'careers', label: 'Careers', icon: 'ri-briefcase-line' },
    { id: 'event-sa', label: 'Event @ S&A', icon: 'ri-calendar-event-line' },
    { id: 'contact-us', label: 'Contact Us', icon: 'ri-phone-line' }
  ];

  return (
    <>
      <header className={`prestige-header ${isScrolled ? 'is-sticky' : ''}`} id="navbar">
        <div className="header-container">
          <div className="header-inner d-flex align-items-center justify-content-between">
            
            {/* Left Zone: Natural Brand Logo & Name (Human-Coded, No Artificial LLP Badges) */}
            <div className="header-left-zone">
              <a 
                href="#/" 
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
                className="header-brand d-flex align-items-center gap-12"
              >
                <div className="brand-emblem-frame">
                  <img 
                    src={siteData.brand.logo || "/images/logo.jpg"} 
                    alt="Sanap & Associates" 
                    className="brand-logo-img" 
                  />
                </div>
                <div className="brand-text-block">
                  <span className="brand-primary-name">Sanap &amp; Associates</span>
                  <span className="brand-tagline">Advocates &amp; Consultants</span>
                </div>
              </a>
            </div>

            {/* Middle Zone: Desktop Navigation Links (Strictly the 8 pages from previous site) */}
            <nav className="header-navigation d-none d-lg-block">
              <ul className="nav-link-list d-flex align-items-center m-0 p-0 list-unstyled">
                {navPages.map((page) => {
                  const isActive = currentPage === page.id;
                  return (
                    <li key={page.id}>
                      <a 
                        href={`#/${page.id === 'home' ? '' : page.id}`} 
                        onClick={(e) => { e.preventDefault(); handleNavClick(page.id); }} 
                        className={`nav-anchor ${isActive ? 'is-active' : ''}`}
                      >
                        {page.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right Zone: Book Consultation CTA, Quick Search & Mobile Toggle */}
            <div className="header-actions d-flex align-items-center gap-10">
              
              {/* Consultation CTA Button */}
              <div className="d-none d-lg-block">
                <button 
                  onClick={onOpenConsultation}
                  className="btn-prestige btn-prestige-gold btn-prestige-sm"
                  id="header-consultation-btn"
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
                >
                  <i className={searchOpen ? "ri-close-line" : "ri-search-line"}></i>
                </button>

                {/* Search Dropdown with Practice Quick Topics */}
                {searchOpen && (
                  <div className="search-flyout-dropdown show">
                    <form className="search-input-wrap position-relative mb-16" onSubmit={handleSearchSubmit}>
                      <input 
                        type="search" 
                        className="search-input-field" 
                        placeholder="Search GST, Direct Tax, RERA, Trademark, Loans..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button type="submit" className="search-action-submit" aria-label="Search">
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </form>

                    <div className="search-suggestions-block">
                      <span className="suggestions-label">Explore Practice Areas:</span>
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

              {/* Mobile Hamburger Toggle - Three Bars + Menu Text (Tactile, Accessible) */}
              <div className="d-lg-none">
                <button 
                  type="button" 
                  className="mobile-hamburger-btn"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open mobile navigation menu"
                  id="mobile-menu-toggler"
                >
                  <div className="ham-bars-wrap">
                    <span className="ham-line"></span>
                    <span className="ham-line"></span>
                    <span className="ham-line"></span>
                  </div>
                  <span className="ham-text-label">Menu</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Offcanvas Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer-overlay" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Mobile Offcanvas Drawer - Responsive, Scrollable Container */}
      <div 
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Fixed Header of Drawer */}
        <div className="mobile-drawer-top d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-10">
            <div className="brand-emblem-frame">
              <img 
                src={siteData.brand.logo || "/images/logo.jpg"} 
                alt="Sanap & Associates" 
                className="brand-logo-img" 
              />
            </div>
            <div>
              <span className="brand-primary-name text-white fs-15 fw-bold d-block">Sanap &amp; Associates</span>
              <span className="brand-tagline text-gold fs-11">Advocates &amp; Consultants</span>
            </div>
          </div>

          <button 
            type="button" 
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* Scrollable Inner Body */}
        <div className="mobile-drawer-scrollable-body">
          {/* Mobile Navigation Links - Strictly the 8 pages */}
          <nav className="mobile-menu-links">
            {navPages.map((page) => {
              const isActive = currentPage === page.id;
              return (
                <a 
                  key={page.id}
                  href={`#/${page.id === 'home' ? '' : page.id}`} 
                  onClick={(e) => { e.preventDefault(); handleNavClick(page.id); }} 
                  className={`mobile-nav-item ${isActive ? 'is-active' : ''}`}
                >
                  <div className="d-flex align-items-center gap-10">
                    <i className={`${page.icon} text-gold fs-18`}></i>
                    <span>{page.label}</span>
                  </div>
                  <i className="ri-arrow-right-s-line nav-item-arrow"></i>
                </a>
              );
            })}
          </nav>

          {/* Direct Consultation Booking Action */}
          <div className="mobile-drawer-cta">
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation?.(); }}
              className="btn-prestige btn-prestige-gold w-100"
              id="mobile-drawer-consult-btn"
            >
              <span>Book a Consultation</span>
              <i className="ri-arrow-right-line ms-2"></i>
            </button>
          </div>

          {/* Drawer Footer with Verified Contacts & Admin Access */}
          <div className="mobile-drawer-footer pt-18 border-top-dark">
            <div className="mobile-contact-row mb-10">
              <i className="ri-phone-fill text-gold me-2"></i>
              <a href={`tel:${siteData.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-white fw-bold">
                {siteData.contact.phoneDisplay || siteData.contact.phone}
              </a>
            </div>
            <div className="mobile-contact-row mb-14">
              <i className="ri-mail-fill text-gold me-2"></i>
              <a href={`mailto:${siteData.contact.email}`} className="text-white-muted fs-13">
                {siteData.contact.email}
              </a>
            </div>
            <div className="mobile-contact-row mb-16 fs-12 text-white-muted">
              <i className="ri-map-pin-line text-gold me-2"></i>
              <span>{siteData.contact.address}</span>
            </div>

            <div className="border-top-dark pt-12 d-flex align-items-center justify-content-between">
              <a 
                href="#/admin" 
                onClick={(e) => { e.preventDefault(); handleNavClick('admin'); }}
                className="fs-12 text-white-muted d-inline-flex align-items-center gap-6"
              >
                <i className="ri-lock-line text-gold"></i>
                <span>Admin Portal</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
