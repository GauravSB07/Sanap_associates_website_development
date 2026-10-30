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

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      hasDropdown: true,
      children: [
        { id: 'home', label: 'Home Tax Audit Consulting' }
      ]
    },
    {
      id: 'pages',
      label: 'Pages',
      hasDropdown: true,
      children: [
        { id: 'about-us', label: 'About Us' },
        { id: 'our-team', label: 'Our Team' },
        { id: 'careers', label: 'Careers' },
        { id: 'event-sa', label: 'Event @ S&A' }
      ]
    },
    {
      id: 'services',
      label: 'Services',
      hasDropdown: true,
      children: [
        { id: 'services', label: 'All Practice Areas' },
        { id: 'services', label: 'Direct Tax & Accounting' },
        { id: 'services', label: 'GST Consultation & Returns' },
        { id: 'services', label: 'Trust & Society Compliance' },
        { id: 'services', label: 'RERA Consultancy' },
        { id: 'services', label: 'Corporate ROC Law' }
      ]
    },
    {
      id: 'case-studies',
      label: 'Case Studies',
      hasDropdown: true,
      children: [
        { id: 'services', label: 'Statutory Compliance' },
        { id: 'services', label: 'Trust Governance' },
        { id: 'services', label: 'FCRA & NGO Advisory' }
      ]
    },
    {
      id: 'blog',
      label: 'Blog',
      hasDropdown: true,
      children: [
        { id: 'news', label: 'News & Updates' },
        { id: 'news', label: 'Circulars & Notifications' }
      ]
    },
    {
      id: 'contact-us',
      label: 'Contact',
      hasDropdown: false
    }
  ];

  const navPages = [
    { id: 'home', label: 'Home' },
    { id: 'about-us', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'our-team', label: 'Our Team' },
    { id: 'news', label: 'News' },
    { id: 'careers', label: 'Careers' },
    { id: 'event-sa', label: 'Event @ S&A' },
    { id: 'contact-us', label: 'Contact' }
  ];

  const isItemActive = (item) => {
    if (item.id === currentPage) return true;
    if (item.id === 'pages' && ['about-us', 'our-team', 'careers', 'event-sa'].includes(currentPage)) return true;
    if (item.id === 'services' && currentPage === 'services') return true;
    if (item.id === 'blog' && currentPage === 'news') return true;
    return false;
  };

  return (
    <>
      <header className={`navbar-area style-two ${isScrolled ? 'sticky' : ''}`} id="navbar">
        <div className="container-fluid">
          <div className="navbar-wrapper d-flex justify-content-between align-items-center flex-nowrap">
            
            {/* Left Zone: Restored Original Emblem Logo & Brand Title */}
            <div className="d-flex align-items-center header-left-zone flex-shrink-0">
              <a 
                href="#/" 
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
                className="navbar-brand d-inline-flex align-items-center"
              >
                <div className="brand-emblem-frame">
                  <img 
                    src={siteData.brand.logo || "/images/logo.jpg"} 
                    alt="Sanap & Associates" 
                    className="brand-logo-img" 
                  />
                </div>
                <div className="brand-title-wrap">
                  <span className="brand-title-main">Sanap &amp; Associates</span>
                  <span className="brand-title-sub">Advocates &amp; Consultants</span>
                </div>
              </a>
            </div>

            {/* Middle Zone: Limpa Centered Pill Navigation Menu matching reference exactly */}
            <div className="menu-area d-none d-lg-block">
              <nav className="menu">
                <ul className="menu-section p-0 mb-0 lh-1 d-flex align-items-center flex-nowrap list-unstyled">
                  {navItems.map((item) => {
                    const active = isItemActive(item);
                    return (
                      <li key={item.id} className={`menu-item ${item.hasDropdown ? 'menu-item-has-children' : ''} ${active ? 'active' : ''}`}>
                        <a 
                          href={item.hasDropdown ? '#/' : `#/${item.id === 'home' ? '' : item.id}`} 
                          onClick={(e) => {
                            if (!item.hasDropdown) {
                              e.preventDefault();
                              handleNavClick(item.id);
                            } else if (item.id === 'home') {
                              e.preventDefault();
                              handleNavClick('home');
                            } else if (item.children && item.children.length > 0) {
                              e.preventDefault();
                              handleNavClick(item.children[0].id);
                            }
                          }} 
                          className={`menu-link ${active ? 'active' : ''}`}
                        >
                          {item.label}
                          {item.hasDropdown && <i className="ri-arrow-down-s-line ms-1"></i>}
                        </a>

                        {/* Dropdown Sub-menu */}
                        {item.hasDropdown && item.children && (
                          <ul className="sub-menu">
                            {item.children.map((child, cIdx) => (
                              <li key={cIdx}>
                                <a
                                  href={`#/${child.id === 'home' ? '' : child.id}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(child.id);
                                  }}
                                >
                                  <span>{child.label}</span>
                                  <i className="ri-arrow-right-s-line fs-14"></i>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Right Zone: Limpa Pill Button + Search + Mobile Toggle */}
            <div className="other-options d-flex align-items-center justify-content-end flex-nowrap gap-12 flex-shrink-0">
              
              {/* Consultation CTA Button matching Limpa "Get A Free Consultation" */}
              <div className="option-item d-none d-lg-block">
                <button 
                  onClick={onOpenConsultation}
                  className="btn style-one d-inline-flex align-items-center"
                  id="header-consultation-btn"
                  type="button"
                >
                  <span className="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition">
                    <i className="ri-arrow-right-line"></i>
                  </span>
                  <span className="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">
                    Get A Free Consultation
                  </span>
                  <span className="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition">
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </button>
              </div>

              {/* Quick Search Button (Enlarged Limpa circular search-btn) */}
              <div className="option-item position-relative d-flex align-items-center">
                <button 
                  type="button" 
                  className={`search-btn bg_primary border-0 rounded-circle d-flex flex-column align-items-center justify-content-center transition ${searchOpen ? 'show' : ''}`}
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Toggle search"
                >
                  <i className={searchOpen ? "ri-close-line" : "ri-search-line"}></i>
                </button>

                {/* Search Dropdown with Practice Quick Topics */}
                <div className={`search-dropdown dropdown-menu dropdown-menu-right ${searchOpen ? 'show' : ''}`}>
                  <form className="search-popup position-relative mb-16" onSubmit={handleSearchSubmit}>
                    <input 
                      type="search" 
                      name="s" 
                      className="form-control text-para" 
                      placeholder="Search GST, Direct Tax, RERA, Trademark, Loans..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus={searchOpen}
                    />
                    <button type="submit" className="position-absolute top-0 end-0 h-100 border-0 bg-transparent d-flex flex-column align-items-center justify-content-center px-3" aria-label="Search">
                      <i className="ri-search-2-line"></i>
                    </button>
                  </form>

                  <div className="search-suggestions-block">
                    <span className="suggestions-label text-gray fs-13 fw-semibold">Explore Practice Areas:</span>
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
              </div>

              {/* Mobile Hamburger Toggle */}
              <div className="option-item d-lg-none">
                <button 
                  type="button" 
                  className="menu-mobile-trigger bg-transparent border-0"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open navigation menu"
                  id="mobile-menu-toggler"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Offcanvas Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="offcanvas-backdrop show" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Mobile Offcanvas Drawer */}
      <div 
        className={`responsive-navbar mobile-navbar offcanvas offcanvas-end ${mobileMenuOpen ? 'show is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        style={{ visibility: mobileMenuOpen ? 'visible' : 'hidden' }}
      >
        {/* Fixed Header of Drawer */}
        <div className="offcanvas-header d-flex align-items-center justify-content-between">
          <a 
            href="#/" 
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
            className="logo d-inline-flex align-items-center gap-12"
          >
            <div className="brand-emblem-frame">
              <img 
                src={siteData.brand.logo || "/images/logo.jpg"} 
                alt="Sanap & Associates" 
                className="brand-logo-img" 
              />
            </div>
            <div>
              <span className="text-white fs-16 fw-bold d-block">Sanap &amp; Associates</span>
              <span className="text_secondary fs-12">Advocates &amp; Consultants</span>
            </div>
          </a>

          <button 
            type="button" 
            className="close-btn bg-transparent position-relative lh-1 p-0 border-0 text-white fs-28"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* Scrollable Inner Body */}
        <div className="offcanvas-body">
          <ul className="navbar-nav p-0 list-unstyled">
            {navPages.map((page) => {
              const isActive = currentPage === page.id;
              return (
                <li key={page.id} className={`menu-item ${isActive ? 'active' : ''}`}>
                  <a 
                    href={`#/${page.id === 'home' ? '' : page.id}`} 
                    onClick={(e) => { e.preventDefault(); handleNavClick(page.id); }} 
                    className={`d-flex align-items-center justify-content-between ${isActive ? 'active text_secondary' : 'text-white'}`}
                  >
                    <span>{page.label}</span>
                    <i className="ri-arrow-right-s-line fs-18"></i>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Direct Consultation Booking Action */}
          <div className="mobile-drawer-cta mt-24 mb-24">
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation?.(); }}
              className="btn style-one w-100 d-inline-flex align-items-center justify-content-center"
              id="mobile-drawer-consult-btn"
              type="button"
            >
              <span className="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition">
                <i className="ri-arrow-right-line"></i>
              </span>
              <span className="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">
                Book Consultation
              </span>
            </button>
          </div>

          {/* Drawer Footer with Verified Contacts & Admin Access */}
          <div className="mobile-drawer-footer pt-20 border-top border-white-10">
            <div className="mobile-contact-row mb-12">
              <i className="ri-phone-fill text_secondary me-2"></i>
              <a href={`tel:${siteData.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-white fw-bold">
                {siteData.contact.phoneDisplay || siteData.contact.phone}
              </a>
            </div>
            <div className="mobile-contact-row mb-12">
              <i className="ri-mail-fill text_secondary me-2"></i>
              <a href={`mailto:${siteData.contact.email}`} className="text-gray fs-13">
                {siteData.contact.email}
              </a>
            </div>
            <div className="mobile-contact-row mb-16 fs-12 text-gray">
              <i className="ri-map-pin-line text_secondary me-2"></i>
              <span>{siteData.contact.address}</span>
            </div>

            <div className="border-top border-white-10 pt-12 d-flex align-items-center justify-content-between">
              <a 
                href="#/admin" 
                onClick={(e) => { e.preventDefault(); handleNavClick('admin'); }}
                className="fs-12 text-gray d-inline-flex align-items-center gap-6"
              >
                <i className="ri-lock-line text_secondary"></i>
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
