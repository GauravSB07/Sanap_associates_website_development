import React from 'react';
import { Hero } from '../components/Hero';
import { Clients } from '../components/Clients';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Vision } from '../components/Vision';
import { FounderNote } from '../components/FounderNote';
import { Team } from '../components/Team';
import { FinalCta } from '../components/FinalCta';

export const HomePage = ({ onOpenConsultation, onNavigate }) => {
  return (
    <>
      {/* Section 1: Hero */}
      <Hero onOpenConsultation={() => onOpenConsultation?.()} onNavigate={onNavigate} />

      {/* Section 2: Esteemed Institutions & Clients */}
      <Clients />

      {/* Section 3: About Overview */}
      <About onNavigate={onNavigate} />

      {/* Section 4: Practice Areas & Core Services */}
      <Services onOpenConsultation={onOpenConsultation} onNavigate={onNavigate} />

      {/* Section 5: Why Choose Us / Guiding Values */}
      <WhyChooseUs />

      {/* Section 6: Vision & Mission */}
      <Vision onNavigate={onNavigate} />

      {/* Section 7: Founder's Note */}
      <FounderNote />

      {/* Section 8: Multidisciplinary Team */}
      <Team onNavigate={onNavigate} />

      {/* Section 9: Final Call To Action */}
      <FinalCta onOpenConsultation={() => onOpenConsultation?.()} onNavigate={onNavigate} />
    </>
  );
};

export default HomePage;
