import React, { useState } from 'react';
import { siteData } from '../data/content';

export const SearchModal = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  // Search across services, articles, and entities
  const results = [];
  if (query.trim().length > 1) {
    const q = query.toLowerCase();

    // Check services
    siteData.services.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.features.some(f => f.toLowerCase().includes(q))) {
        results.push({ type: 'Service', title: s.title, snippet: s.details, targetId: 'services' });
      }
    });

    // Check entities
    siteData.entities.forEach((e) => {
      if (e.title.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q)) {
        results.push({ type: 'Entity', title: e.title, snippet: e.desc, targetId: 'entities' });
      }
    });

    // Check articles
    siteData.blog.forEach((b) => {
      if (b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)) {
        results.push({ type: 'Insight', title: b.title, snippet: b.excerpt, targetId: 'insights' });
      }
    });
  }

  const handleSelect = (targetId) => {
    onClose();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close search">
          <i className="ri-close-line"></i>
        </button>

        <h3 className="fs-22 text-title mb-15">Search Compliance Services & Statutory Insights</h3>
        
        <div className="position-relative mb-25">
          <input 
            type="search" 
            autoFocus
            className="form-control"
            placeholder="Type keyword e.g. 12A, 80G, FCRA, Form 10B, Change Report..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '14px 44px 14px 16px', 
              borderRadius: '10px', 
              border: '2px solid var(--optionalColor)',
              fontSize: '16px'
            }}
          />
          <i className="ri-search-line position-absolute top-50 end-0 translate-middle-y me-3 fs-20 text-gray"></i>
        </div>

        {/* Results */}
        {query.trim().length > 1 && (
          <div className="search-results-list" style={{ maxHeight: '350px', overflowY: 'auto' }}>
            {results.length > 0 ? (
              results.map((r, i) => (
                <div 
                  key={i} 
                  className="p-3 mb-2 rounded bg-albastor" 
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => handleSelect(r.targetId)}
                >
                  <span className="badge bg_secondary text_primary px-2 py-1 rounded me-2 fs-12 fw-bold">
                    {r.type}
                  </span>
                  <strong className="text-title fs-16 d-inline">{r.title}</strong>
                  <p className="fs-13 text-para mt-1 mb-0">{r.snippet}</p>
                </div>
              ))
            ) : (
              <p className="text-gray text-center py-20">No matching services or articles found for "{query}".</p>
            )}
          </div>
        )}

        {query.trim().length <= 1 && (
          <div className="text-gray fs-14">
            <span className="fw-bold d-block mb-2 text-title">Popular searches:</span>
            <div className="d-flex flex-wrap gap-2">
              {['12A & 80G Re-validation', 'Form 10B Audit', 'FCRA Prior Permission', 'Charity Commissioner Schedule III', 'CSR-1 Registration'].map((tag, idx) => (
                <span 
                  key={idx} 
                  className="badge bg-albastor text-title p-2 rounded" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setQuery(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
