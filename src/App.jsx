import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ClientShowcase } from './components/ClientShowcase';
import { About } from './components/About';
import { Services } from './components/Services';
import { Industries } from './components/Industries';
import { Funfact } from './components/Funfact';
import { CaseStudies } from './components/CaseStudies';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Leadership } from './components/Leadership';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { CtaBox } from './components/CtaBox';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { BackToTop } from './components/BackToTop';
import { ConsultationModal } from './components/ConsultationModal';
import { SearchModal } from './components/SearchModal';

export const App = () => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleOpenConsultation = (serviceName = '') => {
    setSelectedService(typeof serviceName === 'string' ? serviceName : '');
    setConsultationModalOpen(true);
  };

  const handleOpenSearch = () => {
    setSearchModalOpen(true);
  };

  return (
    <div className="page-wrapper">
      {/* Custom Cursor Follower */}
      <CustomCursor />

      {/* Header / Navbar */}
      <Header 
        onOpenConsultation={() => handleOpenConsultation()} 
        onOpenSearch={handleOpenSearch} 
      />

      {/* 1. Hero Section */}
      <Hero onOpenConsultation={() => handleOpenConsultation()} />

      {/* 2. Client Showcase (Our Esteemed Clients) */}
      <ClientShowcase />

      {/* 3. About Section */}
      <About />

      {/* 4. Services Section (4 Groups) */}
      <Services onOpenConsultation={handleOpenConsultation} />

      {/* 5. Entities We Serve (Industries) */}
      <Industries onOpenConsultation={handleOpenConsultation} />

      {/* 6. Funfact Statistics Bar */}
      <Funfact />

      {/* 7. Case Studies / How We Helped Clients */}
      <CaseStudies onOpenConsultation={handleOpenConsultation} />

      {/* 8. Why Choose Us / What Sets Us Apart */}
      <WhyChooseUs />

      {/* 9. Leadership Section */}
      <Leadership />

      {/* 10. Testimonials Slider */}
      <Testimonials />

      {/* 11. Compliance Retainers / Pricing Plans */}
      <Pricing onOpenConsultation={handleOpenConsultation} />

      {/* 12. Custom Solution CTA Box */}
      <CtaBox onOpenConsultation={handleOpenConsultation} />

      {/* 13. Blog / Expert Articles */}
      <Blog onOpenConsultation={handleOpenConsultation} />

      {/* 14. Contact / Get In Touch Area */}
      <Contact />

      {/* 15. Footer Area */}
      <Footer onOpenConsultation={handleOpenConsultation} />

      {/* Interactive Back To Top Progress */}
      <BackToTop />

      {/* Consultation Booking Modal */}
      <ConsultationModal 
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        initialService={selectedService}
      />

      {/* Interactive Search Modal */}
      <SearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </div>
  );
};

export default App;
