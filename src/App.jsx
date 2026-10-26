import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Clients } from './components/Clients';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Vision } from './components/Vision';
import { FounderNote } from './components/FounderNote';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { BackToTop } from './components/BackToTop';
import { CustomCursor } from './components/CustomCursor';

export const App = () => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenConsultation = (serviceName = '') => {
    setSelectedService(typeof serviceName === 'string' ? serviceName : '');
    setConsultationModalOpen(true);
  };

  // High-performance scroll reveal observer
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-stagger');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, unobserve to keep performance high
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="page-wrapper">
      {/* Section 1: Prestige Sticky Header */}
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      <main>
        {/* Section 2: Hero */}
        <Hero onOpenConsultation={() => handleOpenConsultation()} />

        {/* Section 3: Esteemed Clients / Institutional Trust */}
        <Clients />

        {/* Section 4: About Us */}
        <About />

        {/* Section 5: Core Services */}
        <Services onOpenConsultation={handleOpenConsultation} />

        {/* Section 6: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 7: Vision */}
        <Vision />

        {/* Section 8: Founder's Note */}
        <FounderNote />

        {/* Section 9: Final CTA */}
        <FinalCta onOpenConsultation={() => handleOpenConsultation()} />
      </main>

      {/* Section 10: Footer */}
      <Footer onOpenConsultation={() => handleOpenConsultation()} />

      {/* Consultation Booking Modal */}
      <ConsultationModal 
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        initialService={selectedService}
      />

      {/* Circular Scroll Progress Back To Top */}
      <BackToTop />

      {/* Surface-Aware Custom Cursor */}
      <CustomCursor />
    </div>
  );
};

export default App;
