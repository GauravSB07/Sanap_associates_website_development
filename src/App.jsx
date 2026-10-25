import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Clients } from './components/Clients';
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

  return (
    <div className="page-wrapper">
      {/* Interactive trailing cursor */}
      <CustomCursor />

      {/* Section 1: Header */}
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      <main>
        {/* Section 2: Hero */}
        <Hero onOpenConsultation={() => handleOpenConsultation()} />

        {/* Section 3: About Us */}
        <About />

        {/* Section 4: Core Services */}
        <Services onOpenConsultation={handleOpenConsultation} />

        {/* Section 5: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 6: Clients */}
        <Clients />

        {/* Section 7: Vision */}
        <Vision />

        {/* Section 8: Founder's Note */}
        <FounderNote />

        {/* Section 9: Final CTA */}
        <FinalCta onOpenConsultation={() => handleOpenConsultation()} />
      </main>

      {/* Section 9: Footer */}
      <Footer onOpenConsultation={() => handleOpenConsultation()} />

      {/* Consultation Booking Modal */}
      <ConsultationModal 
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        initialService={selectedService}
      />

      {/* Circular Scroll Progress Back To Top */}
      <BackToTop />
    </div>
  );
};

export default App;
