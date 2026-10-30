import React, { useState } from 'react';
import { siteData } from '../data/content';

const clientIcons = [
  'ri-hospital-line',
  'ri-building-4-line',
  'ri-shield-star-line',
  'ri-plant-line',
  'ri-hand-heart-line',
  'ri-shake-hands-line',
  'ri-heart-pulse-line',
  'ri-service-line'
];

export const Clients = () => {
  const { clients } = siteData;
  const [activeCategory, setActiveCategory] = useState("All Sectors");

  const filteredClients = activeCategory === "All Sectors"
    ? clients.list
    : clients.list.filter(c => c.category === activeCategory);

  const testimonials = [
    {
      author: "Ghanashyam Lotlikar",
      position: "Founder & CEO, Digitometrix",
      photo: "/images/testimonials/t1.png",
      text: "Absolutely fantastic work. I have formed all my companies with their legal help , they offer 360 degree solution to all company related matters. Right from company formation , GST, trademark registration, taxation etc.all staff are cooperative. Definitely recommend to all."
    },
    {
      author: "Mr. Rajendra Pawar",
      position: "Regional forest officer",
      photo: "/images/testimonials/t2.jpg",
      text: "It has been a great experience working with Sanap & Associates LLP. Their expertise and focused approach to our voice and data process helped us to invest our energies on marketing and sales activities."
    },
    {
      author: "Mr. Ashish Patil",
      position: "Director of Aseem Medical & Education foundation",
      photo: "/images/testimonials/t3.jpg",
      text: "Sanap & Associates LLP has supported our organization operations outstandingly well for some business critical processes. Good service levels, commitment, and passion for delivering quality work have been the hallmark of our journey so far! We look forward to a long-standing relationship."
    }
  ];

  const clientPartnerLogos = [
    { id: 1, src: "/images/clients/logo1.jpg", alt: "Client Partner 1" },
    { id: 2, src: "/images/clients/logo2.jpg", alt: "Client Partner 2" },
    { id: 3, src: "/images/clients/logo3.jpg", alt: "Client Partner 3" },
    { id: 4, src: "/images/clients/logo4.jpg", alt: "Client Partner 4" },
    { id: 5, src: "/images/clients/logo5.jpg", alt: "Client Partner 5" },
    { id: 6, src: "/images/clients/logo6.jpg", alt: "Client Partner 6" },
    { id: 7, src: "/images/clients/logo7.jpg", alt: "Client Partner 7" },
    { id: 8, src: "/images/clients/logo8.jpg", alt: "Client Partner 8" }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      id="clients" 
      className="clients-section section-padding-sm" 
      data-theme="light"
    >
      <div className="container">

        {/* Client Partner Logos Carousel Strip from Previous Website */}
        <div className="client-logos-showcase mb-50 reveal-up">
          <div className="text-center mb-24">
            <span className="fs-12 text-muted fw-bold text-uppercase letter-spacing-wider">
              Trusted Across The Trust, NGO &amp; CSR Sector
            </span>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-24 client-partner-logo-row">
            {clientPartnerLogos.map((logo) => (
              <div key={logo.id} className="partner-logo-box">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="partner-logo-img"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    e.target.parentElement.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Real Testimonials from sanapassociates.com (One-Liner Horizontal Banner) */}
        <div className="real-testimonials-card text-white mb-60 reveal-up">
          <div className="row g-4 align-items-center">
            
            {/* Left Column: Heading, Pagination & Controls */}
            <div className="col-lg-4 d-flex flex-column justify-content-between testimonial-intro-col">
              <div>
                <span className="fs-12 text-gold fw-bold text-uppercase letter-spacing-wider mb-8 d-block">
                  Client Feedback
                </span>
                <h3 className="fs-22 fw-bold text-white mb-16 line-height-tight">
                  Here’s what just some of our clients have said:
                </h3>
              </div>
              
              <div className="d-flex align-items-center justify-content-between pt-12">
                <div className="d-flex align-items-center gap-8">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`testimonial-dot-btn ${activeTestimonial === idx ? 'active' : ''}`}
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`Testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="d-flex align-items-center gap-8">
                  <button
                    type="button"
                    onClick={handlePrevTestimonial}
                    className="testimonial-nav-arrow"
                    aria-label="Previous Review"
                  >
                    <i className="ri-arrow-left-s-line"></i>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextTestimonial}
                    className="testimonial-nav-arrow"
                    aria-label="Next Review"
                  >
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Clean spacious Quote and Author without nested border clutter */}
            <div className="col-lg-8 testimonial-quote-col">
              <div className="testimonial-quote-wrap">
                <i className="ri-double-quotes-l quote-gold-icon mb-12 d-block"></i>
                <p className="testimonial-text mb-20">
                  "{testimonials[activeTestimonial].text}"
                </p>

                <div className="d-flex align-items-center gap-14 pt-16 border-top-subtle-dark">
                  <div className="client-logo-frame">
                    <img 
                      src={testimonials[activeTestimonial].photo} 
                      alt={testimonials[activeTestimonial].author}
                      className="client-logo-img"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="client-logo-fallback" style={{ display: 'none' }}>
                      {testimonials[activeTestimonial].author.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h4 className="fs-16 fw-bold text-white m-0 text-truncate">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <span className="fs-13 text-gold d-block mt-2 text-truncate">
                      {testimonials[activeTestimonial].position}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section Header */}
        <div className="section-header text-center mb-40">
          <div className="section-badge-tag reveal-up">
            Institutional Clients
          </div>
          <h2 className="section-heading-editorial reveal-up">
            {clients.heading}
          </h2>
          <p className="section-subtext reveal-up">
            Advising esteemed state associations, healthcare councils, corporate CSR foundations, and historical public charitable trusts across India.
          </p>
        </div>

        {/* Dynamic Sector Filter Navigation */}
        <div className="client-filter-bar d-flex flex-wrap justify-content-center gap-10 mb-40 reveal-up">
          {clients.categories.map((cat, idx) => (
            <button
              key={idx}
              className={`category-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Institutional Cards Grid */}
        <div className="row g-3 mb-32">
          {filteredClients.map((client, idx) => (
            <div key={client.name} className="col-md-6 col-lg-3 reveal-up">
              <div 
                className="brand-logo-card"
              >
                <div className="brand-card-top d-flex align-items-center justify-content-between mb-16">
                  <div className="brand-icon-wrapper">
                    <i className={clientIcons[idx % clientIcons.length]}></i>
                  </div>
                  <span className="brand-sector-pill">
                    {client.category || client.type}
                  </span>
                </div>

                <div className="brand-content">
                  <h3 className="brand-title-text">
                    {client.name}
                  </h3>
                  <div className="brand-tag-strip">
                    <span className="brand-tag-bullet">•</span>
                    <span className="brand-tag-name">{client.tag || client.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote with institutional verification notice */}
        <div className="text-center reveal-up">
          <div className="clients-disclaimer-chip">
            <i className="ri-information-line text-gold me-2"></i>
            <span>{clients.supportingNote}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Clients;
