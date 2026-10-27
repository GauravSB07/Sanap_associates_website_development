import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { BackToTop } from './components/BackToTop';
import { CustomCursor } from './components/CustomCursor';

// Dedicated Page Views (incorporating exact content from sanapassociates.com)
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { ServicesPage } from './pages/ServicesPage';
import { NewsPage } from './pages/NewsPage';
import { CareersPage } from './pages/CareersPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export const App = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const raw = window.location.hash.replace('#/', '').replace('#', '').trim();
      return raw || 'home';
    }
    return 'home';
  });

  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  // Handle URL hash changes for native browser back/forward and deep linking
  useEffect(() => {
    const onHashChange = () => {
      const raw = window.location.hash.replace('#/', '').replace('#', '').trim();
      setCurrentPage(raw || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId === 'home' ? '#/' : `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (serviceName = '') => {
    setSelectedService(typeof serviceName === 'string' ? serviceName : '');
    setConsultationModalOpen(true);
  };

  // High-performance scroll reveal observer on page change
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.1
    });

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentPage]);

  // Page Routing Switch
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about-us':
        return <AboutPage onOpenConsultation={handleOpenConsultation} onNavigate={handleNavigate} />;
      case 'our-team':
        return <TeamPage onOpenConsultation={handleOpenConsultation} onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onOpenConsultation={handleOpenConsultation} onNavigate={handleNavigate} />;
      case 'news':
        return <NewsPage onOpenConsultation={handleOpenConsultation} onNavigate={handleNavigate} />;
      case 'careers':
        return <CareersPage onNavigate={handleNavigate} />;
      case 'event-sa':
        return <EventsPage onOpenConsultation={handleOpenConsultation} onNavigate={handleNavigate} />;
      case 'contact-us':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPage onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomePage onOpenConsultation={handleOpenConsultation} onNavigate={handleNavigate} />;
    }
  };

  const isAdminPage = currentPage === 'admin';

  return (
    <div className="page-wrapper">
      {/* Universal Prestige Header (hidden on dedicated admin portal) */}
      {!isAdminPage && (
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenConsultation={() => handleOpenConsultation()}
        />
      )}

      <main
        id="main-content"
        className={
          currentPage === 'home'
            ? 'home-page'
            : currentPage === 'admin'
              ? 'admin-page'
              : 'inner-page'
        }
      >
        {renderCurrentPage()}
      </main>

      {/* Universal Footer (hidden on dedicated admin portal) */}
      {!isAdminPage && (
        <Footer
          onOpenConsultation={() => handleOpenConsultation()}
          onNavigate={handleNavigate}
        />
      )}

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        initialService={selectedService}
      />

      {/* Circular Scroll Progress Back To Top */}
      <BackToTop />

      {/* Surface-Aware Custom Cursor (clean physics, no text popups) */}
      <CustomCursor />
    </div>
  );
};

export default App;
