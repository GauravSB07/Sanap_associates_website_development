import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

export const NewsPage = ({ onOpenConsultation, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [newsItems, setNewsItems] = useState(() => dataService.getNews());

  useEffect(() => {
    const handleUpdate = () => {
      setNewsItems(dataService.getNews());
    };
    window.addEventListener('sanap_data_updated', handleUpdate);
    return () => window.removeEventListener('sanap_data_updated', handleUpdate);
  }, []);

  const categories = ['All', 'Charity Commissioner', 'Direct Tax & 12A/80G', 'FCRA Directives', 'CSR Governance', 'Trust Governance', 'GST & Indirect Tax'];

  const filteredNews = activeFilter === 'All'
    ? newsItems
    : newsItems.filter(item => item.category === activeFilter);

  return (
    <div className="subpage-wrapper">
      {/* Editorial Page Header Banner */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate?.('home'); }} className="crumb-link">Home</a>
              <span className="crumb-separator">/</span>
              <span className="crumb-current">News</span>
            </div>
            <h1 className="page-banner-title">News &amp; Regulatory Updates</h1>
            <p className="page-banner-desc">
              Statutory notifications, Charity Commissioner circulars, direct tax directives, and compliance alerts.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="page-content-section section-padding bg-alabaster" data-theme="light">
        <div className="container">

          {/* Filter Chips */}
          <div className="d-flex flex-wrap gap-8 justify-content-center mb-40 reveal-up">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`service-filter-chip ${activeFilter === cat ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News Stack */}
          <div className="row g-4 justify-content-center mb-50">
            {filteredNews.map((item, idx) => (
              <div key={idx} className="col-lg-8">
                <article className="news-page-card p-32 bg-white border-card rounded-md reveal-up">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-10 mb-12">
                    <span className="badge-news-category text-gold fw-bold fs-12 text-uppercase">
                      {item.category}
                    </span>
                    <span className="fs-12 text-muted">
                      <i className="ri-calendar-line me-1"></i> {item.date}
                    </span>
                  </div>

                  <h2 className="fs-20 fw-bold text-title mb-12">{item.title}</h2>
                  <p className="fs-14 text-body line-height-relaxed mb-14">{item.summary}</p>
                  
                  <div className="p-16 bg-alabaster rounded-sm border-subtle mb-16">
                    <span className="fs-12 text-muted fw-bold text-uppercase d-block mb-4">Statutory Implication:</span>
                    <p className="fs-13 text-body m-0">{item.details}</p>
                  </div>

                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-12 pt-12 border-top-subtle">
                    <div className="d-flex flex-wrap gap-6">
                      {item.tags.map((t, tIdx) => (
                        <span key={tIdx} className="fs-11 px-2 py-1 bg-alabaster border-subtle rounded-xs text-muted">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => onOpenConsultation?.(item.title)}
                      className="btn-link text-gold fw-bold fs-13 border-0 bg-transparent p-0 d-inline-flex align-items-center gap-4"
                    >
                      <span>Consult on this circular</span>
                      <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default NewsPage;
