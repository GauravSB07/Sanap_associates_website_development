import React from 'react';
import { siteData } from '../data/content';

export const Hero = ({ onOpenConsultation, onNavigate }) => {
  const { hero, contact } = siteData;

  const scrollToServices = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('services');
    }
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="hero-split-partition position-relative overflow-hidden bg_primary"
    >
      {/* =========================================================================
         LEFT HALF (50% WIDTH): Headline, Stat Box, Copy & Explore Services CTA
         ========================================================================= */}
      <div className="hero-partition-left position-relative">
        {/* Subtle decorative compliance analytics graphic at bottom left */}
        <img
          src="/images/limpa/diagram-2.png"
          alt="Compliance Analytics Graphic"
          className="hero-shape-diagram position-absolute start-0 pointer-events-none"
        />

        <div className="hero-left-content position-relative z-2">
          {/* Master Headline matching reference layout & styling with authentic NPO focus */}
          <h1 className="fw-bold text-white hero-master-title">
            Premier <span className="text_secondary">NPO Compliance &amp;</span><br />
            <span className="text_secondary">Statutory Advisory</span> For Public<br />
            Trusts &amp; Foundations
          </h1>

          {/* Lower Row: Cut-Corner Stat Card + Supporting Paragraph & White Pill Button */}
          <div className="hero-stat-row d-flex align-items-center">
            
            {/* Cut-Corner Chamfered Stat Box */}
            <div className="stat-card style-one round-20 flex-shrink-0">
              <h3 className="text-white fw-bold lh-1 mb-0 stat-number">15+</h3>
              <span className="text-gray fs-16 d-block mb-18 mt-1">Years Of Domain Expertise</span>
              
              {/* Overlapping Client Avatars */}
              <ul className="client-list list-unstyled mb-10 d-flex align-items-center">
                <li className="rounded-circle" title="Ghanashyam Lotlikar - Founder &amp; CEO, Digitometrix">
                  <img src="/images/testimonials/t1.png" alt="Ghanashyam Lotlikar" className="rounded-circle" />
                </li>
                <li className="rounded-circle" title="Mr. Rajendra Pawar - Regional Forest Officer">
                  <img src="/images/testimonials/t2.jpg" alt="Mr. Rajendra Pawar" className="rounded-circle" />
                </li>
                <li className="rounded-circle" title="Mr. Ashish Patil - Director, Aseem Medical &amp; Education Foundation">
                  <img src="/images/testimonials/t3.jpg" alt="Mr. Ashish Patil" className="rounded-circle" />
                </li>
                <li className="rounded-circle" title="Sanjay Gandhi National Park">
                  <img src="/images/clients/logo1.jpg" alt="Sanjay Gandhi National Park" className="rounded-circle client-logo-avatar" />
                </li>
              </ul>

              <p className="text-gray fs-15 mb-0">2,000+ Trusts &amp; Foundations<br />trust it across India.</p>
            </div>

            {/* Supporting Copy & Explore Services Action */}
            <div className="hero-para-block">
              <p className="fs-17 text-gray mb-32 hero-lead-desc">
                End-to-end statutory, legal, audit, taxation and governance support for Public Trusts, NGOs, Section-8 Companies, Societies, Religious Institutions, Mandals and Foundations across India.
              </p>

              <a 
                className="btn style-two d-inline-flex align-items-center"
                href="#services"
                onClick={scrollToServices}
                id="hero-explore-services"
              >
                <span className="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition">
                  <i className="ri-arrow-right-line"></i>
                </span>
                <span className="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">
                  Explore NPO Services
                </span>
                <span className="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition">
                  <i className="ri-arrow-right-line"></i>
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
         RIGHT HALF (50% WIDTH): Dedicated Image Partition + Bottom Contact Deck
         ========================================================================= */}
      <div className="hero-partition-right position-relative">
        {/* Full-bleed right partition image with Nishant Sanap */}
        <div className="hero-right-img-container">
          <img 
            src="/images/nishant-sanap.png" 
            alt="Rtn. Nishant Sanap - Founder & CEO, Sanap & Associates" 
            className="hero-right-photo" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/founder.png';
            }}
          />
          {/* Subtle gradient vignette overlay matching Limpa theme */}
          <div className="hero-right-img-overlay" aria-hidden="true"></div>
        </div>

        {/* Bottom Contact Hotline & Social Profiles Overlay */}
        <div className="hero-right-bottom-deck position-absolute bottom-0 start-0 w-100 z-3">
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-24">
            
            {/* Direct Contact Hotline & Email */}
            <div className="hero-contact-info-deck">
              <div className="mb-6">
                <a 
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} 
                  className="contact-num fw-bold text_secondary d-inline-block"
                >
                  {contact.phoneDisplay || contact.phone}
                </a>
              </div>
              <div className="mb-6">
                <a 
                  href={`mailto:${contact.email}`} 
                  className="contact-mail fw-semibold text-white d-inline-block"
                >
                  {contact.email}
                </a>
              </div>
              <div className="text-gray fs-15">
                {contact.hours || "Monday – Saturday: 9:30 AM – 7:30 PM IST"}
              </div>
            </div>

            {/* Social Profile Links (Limpa style-five) */}
            <div className="hero-social-deck">
              <ul className="social-profile style-five d-flex flex-column align-items-sm-end align-items-start list-unstyled mb-0">
                <li className="fs-18">
                  <a 
                    href={contact.socials?.facebook || "https://www.facebook.com/"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li className="fs-18">
                  <a 
                    href={contact.socials?.twitter || "https://x.com/"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
                <li className="fs-18">
                  <a 
                    href={contact.socials?.linkedin || "https://www.linkedin.com/"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
