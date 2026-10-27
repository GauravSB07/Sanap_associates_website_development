import React, { useState } from 'react';

export const NewsModal = ({ isOpen, onClose }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  if (!isOpen) return null;

  const newsItems = [
    {
      category: "Charity Commissioner",
      date: "Latest Circular",
      title: "Mandatory Online Filing of Annual Accounts & Budget Estimates",
      summary: "Maharashtra Charity Organisation portal update: All registered Public Trusts must submit their audited balance sheets, income & expenditure statements, and annual budgets through the official e-filing system within the statutory window.",
      tags: ["BPT Act", "Annual Audit", "Compliance"]
    },
    {
      category: "Direct Tax & 12A/80G",
      date: "CBDT Notification",
      title: "Audit Reports in Form 10B & 10BB for Charitable & Religious Trusts",
      summary: "Clarification on applicability of Form 10B (for trusts with income exceeding Rs. 5 Crores, foreign contributions, or out-of-India application) versus Form 10BB. Ensuring flawless cross-verification with annual ITR-7 filings.",
      tags: ["Income Tax", "Form 10B", "12A / 80G"]
    },
    {
      category: "FCRA Directives",
      date: "MHA Regulatory Update",
      title: "Foreign Contribution (Regulation) Act Renewal & Annual Returns (FC-4)",
      summary: "Guidelines on operational compliance for associations holding FCRA registration, maintenance of designated FCRA bank accounts with SBI NDMB, quarterly reporting, and strict adherence to administrative expense caps.",
      tags: ["FCRA", "MHA", "Foreign Funds"]
    },
    {
      category: "CSR Governance",
      date: "MCA Advisory",
      title: "Form CSR-1 Mandatory Registration for Implementing Agencies",
      summary: "Corporate Social Responsibility amendments: Non-profits executing CSR projects funded by corporate entities must maintain active CSR-1 registration, audited fund track records, and impact evaluation metrics.",
      tags: ["CSR-1", "MCA", "Corporate Grants"]
    },
    {
      category: "Trust Governance",
      date: "High Court Judgment",
      title: "Expedited Adjudication of Trustee Change Reports (Section 22)",
      summary: "Judicial directives mandating accelerated hearings and disposal of Change Reports involving trustee appointments, resignations, and amendment of trust constitutions before the Assistant Charity Commissioner.",
      tags: ["Change Report", "Trustee Succession", "Judiciary"]
    }
  ];

  const categories = ['All', 'Charity Commissioner', 'Direct Tax & 12A/80G', 'FCRA Directives', 'CSR Governance'];

  const filteredNews = activeFilter === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

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
          aria-label="Close news modal"
        >
          <i className="ri-close-line"></i>
        </button>

        <div className="modal-form-header mb-20">
          <div className="section-badge-tag mb-10">
            <i className="ri-newspaper-line me-1"></i> Regulatory &amp; Compliance News
          </div>
          <h2 className="modal-title-text mb-6">Statutory News &amp; Legal Circulars</h2>
          <p className="text-muted fs-14 mb-0">
            Critical regulatory updates, notifications, and compliance alerts curated by Sanap &amp; Associates for non-profit trustees and administrators.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="d-flex flex-wrap gap-8 mb-20">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`suggestion-chip ${activeFilter === cat ? 'active-filter' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News List */}
        <div className="news-items-stack d-flex flex-column gap-14 max-h-480 overflow-y-auto pr-6">
          {filteredNews.map((item, idx) => (
            <div key={idx} className="news-card-entry p-18 border-card rounded-md bg-white">
              <div className="d-flex align-items-center justify-content-between mb-8">
                <span className="badge-news-category fs-11 text-uppercase fw-bold text-gold">
                  {item.category}
                </span>
                <span className="fs-12 text-muted">
                  <i className="ri-calendar-line me-1"></i> {item.date}
                </span>
              </div>
              <h3 className="fs-16 fw-bold text-title mb-8">{item.title}</h3>
              <p className="fs-13 text-body mb-12 line-height-relaxed">{item.summary}</p>
              <div className="d-flex flex-wrap gap-6">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="fs-11 py-1 px-2 bg-alabaster rounded-xs text-muted border-subtle">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer-strip mt-20 pt-16 border-top-subtle d-flex flex-wrap align-items-center justify-content-between gap-12">
          <span className="fs-13 text-muted">
            Need advice on how these circulars affect your trust?
          </span>
          <a href="#contact" onClick={onClose} className="btn-link text-gold fw-bold fs-13 d-inline-flex align-items-center gap-4">
            <span>Speak with our compliance desk</span>
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
