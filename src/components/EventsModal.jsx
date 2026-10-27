import React, { useState } from 'react';

export const EventsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('all');

  if (!isOpen) return null;

  const events = [
    {
      title: "Symposium on Public Trust Governance & Statutory Audit",
      location: "Mumbai",
      type: "Masterclass",
      date: "Trustee Series",
      desc: "Comprehensive workshop led by Mr. Nishant Sanap addressing Bombay Public Trust Act compliance, maintenance of accounts, budgeting, and statutory inspection procedures.",
      highlights: ["150+ Trustees in attendance", "Charity Commissioner procedural walkthrough", "Q&A on Section 50A scheme framing"]
    },
    {
      title: "Direct Tax & Form 10B/10BB Intensive for NGOs",
      location: "Pune",
      type: "Tax Workshop",
      date: "Advisory Seminar",
      desc: "Deliberation on revised audit formats, 12A/80G re-registration compliance, corpus fund handling, and anonymous donations rules under Section 115BBC.",
      highlights: ["CA Satish Dhotre & Senior Legal Panel", "Real-world scrutiny case studies", "Form 10B compliance checklist distribution"]
    },
    {
      title: "Rotary Community Welfare & Medical Outreach Drive",
      location: "Maharashtra",
      type: "Social Impact",
      date: "Community Initiative",
      desc: "Community service initiative in association with Rotary clubs supporting health checkups, educational scholarships, and local welfare infrastructure.",
      highlights: ["Healthcare screening for 500+ beneficiaries", "Rotarian leadership partnership", "Educational grant facilitation"]
    },
    {
      title: "CSR-1 & Corporate NGO Partnership Round Table",
      location: "Mumbai",
      type: "Corporate Colloquium",
      date: "Executive Forum",
      desc: "Bringing corporate CSR heads and non-profit leaders together to streamline CSR fund utilization, impact audits, and statutory disclosure mandates.",
      highlights: ["MCA compliance best practices", "Impact assessment framework", "Transparency & reporting benchmarks"]
    }
  ];

  return (
    <div className="prestige-modal-overlay" onClick={onClose}>
      <div 
        className="prestige-modal-card max-w-720" 
        onClick={(e) => e.stopPropagation()}
        data-theme="light"
      >
        <button 
          className="modal-dismiss-btn" 
          onClick={onClose} 
          aria-label="Close events modal"
        >
          <i className="ri-close-line"></i>
        </button>

        <div className="modal-form-header mb-24">
          <div className="section-badge-tag mb-10">
            <i className="ri-calendar-event-line me-1"></i> Knowledge Sharing &amp; Community
          </div>
          <h2 className="modal-title-text mb-6">Events @ Sanap &amp; Associates</h2>
          <p className="text-muted fs-14 mb-0">
            Seminars, statutory workshops, and community welfare initiatives hosted and mentored by Sanap &amp; Associates across Maharashtra and India.
          </p>
        </div>

        {/* Event Cards */}
        <div className="events-stack d-flex flex-column gap-16 max-h-480 overflow-y-auto pr-6">
          {events.map((evt, idx) => (
            <div key={idx} className="event-item-card p-20 border-card rounded-md bg-white">
              <div className="d-flex align-items-center justify-content-between mb-10">
                <div className="d-flex align-items-center gap-8">
                  <span className="badge-event-type fs-11 fw-bold text-gold text-uppercase">
                    {evt.type}
                  </span>
                  <span className="text-muted fs-12">•</span>
                  <span className="fs-12 text-muted fw-bold">
                    <i className="ri-map-pin-line me-1 text-gold"></i> {evt.location}
                  </span>
                </div>
                <span className="fs-12 text-muted">
                  <i className="ri-time-line me-1"></i> {evt.date}
                </span>
              </div>

              <h3 className="fs-17 fw-bold text-title mb-8">{evt.title}</h3>
              <p className="fs-13 text-body mb-14 line-height-relaxed">{evt.desc}</p>

              <div className="event-highlights-list bg-alabaster p-12 rounded-sm border-subtle">
                <span className="fs-11 text-uppercase fw-bold text-muted d-block mb-6">Session Highlights:</span>
                <div className="d-flex flex-wrap gap-10">
                  {evt.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="fs-12 text-title d-inline-flex align-items-center gap-4">
                      <i className="ri-checkbox-circle-fill text-gold fs-13"></i>
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-16 mt-20 bg-alabaster rounded-sm border-subtle text-center">
          <span className="fs-13 text-muted">
            Interested in having Sanap &amp; Associates conduct a governance or compliance workshop for your trust's board?{' '}
            <a href="#contact" onClick={onClose} className="text-gold fw-bold">
              Inquire for Trustee Workshops
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventsModal;
