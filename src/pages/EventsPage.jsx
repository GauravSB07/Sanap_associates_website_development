import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

export const EventsPage = ({ onOpenConsultation, onNavigate }) => {
  const [events, setEvents] = useState(() => dataService.getEvents());

  useEffect(() => {
    const handleUpdate = () => {
      setEvents(dataService.getEvents());
    };
    window.addEventListener('sanap_data_updated', handleUpdate);
    return () => window.removeEventListener('sanap_data_updated', handleUpdate);
  }, []);

  const galleryImages = [
    { id: 9, url: "https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1279.jpg", title: "Public Trust Governance Seminar" },
    { id: 8, url: "https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1259.jpg", title: "Trustee Audit & Legal Guidance Meet" },
    { id: 7, url: "https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1250.jpg", title: "Executive Consultation & Delegation" },
    { id: 6, url: "https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1248.jpg", title: "Panel Discussion on Direct Tax for NGOs" },
    { id: 5, url: "https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1246.jpg", title: "Statutory Compliance Interactive Session" },
    { id: 4, url: "https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1244.jpg", title: "Trustee Series Address by Mr. Nishant Sanap" },
    { id: 3, url: "https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1230.jpg", title: "Institutional Leadership Forum" },
    { id: 2, url: "https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1223.jpg", title: "Community Welfare & Rotary Outreach" },
    { id: 1, url: "https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1222.jpg", title: "Annual Compliance Colloquium" }
  ];

  const [lightboxImg, setLightboxImg] = React.useState(null);

  return (
    <div className="subpage-wrapper">
      {/* Editorial Page Header Banner */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate?.('home'); }} className="crumb-link">Home</a>
              <span className="crumb-separator">/</span>
              <span className="crumb-current">Event @ S&amp;A</span>
            </div>
            <h1 className="page-banner-title">Event @ S&amp;A</h1>
            <p className="page-banner-desc">
              Seminars, statutory workshops, and community welfare initiatives hosted and mentored by Sanap &amp; Associates.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="page-content-section section-padding bg-alabaster" data-theme="light">
        <div className="container">

          {/* Authentic Event Photo Gallery from Previous Website */}
          <div className="event-gallery-block mb-60 reveal-up">
            <div className="text-center mb-36">
              <div className="section-badge-tag mb-10">
                <i className="ri-camera-lens-line me-1"></i> Gallery
              </div>
              <h2 className="section-heading-editorial mb-12">
                Event &amp; Seminar Photo Gallery
              </h2>
              <p className="section-subtext">
                Moments from our masterclasses, statutory symposiums, and community outreach drives.
              </p>
            </div>

            <div className="row g-3">
              {galleryImages.map((img) => (
                <div key={img.id} className="col-md-4 col-sm-6">
                  <div 
                    className="gallery-thumbnail-card bg-white border-card rounded-md overflow-hidden cursor-pointer"
                    onClick={() => setLightboxImg(img)}
                  >
                    <div className="gallery-thumb-wrap position-relative">
                      <img 
                        src={img.url} 
                        alt={img.title}
                        className="gallery-thumb-img w-100 d-block"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          e.target.parentElement.classList.add('img-fallback-active');
                        }}
                      />
                      <div className="gallery-thumb-overlay d-flex align-items-center justify-content-center">
                        <i className="ri-zoom-in-line text-white fs-24"></i>
                      </div>
                    </div>
                    <div className="p-12 text-center">
                      <span className="fs-13 fw-semibold text-title line-clamp-1">{img.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-48 reveal-up">
            <div className="section-badge-tag mb-10">
              <i className="ri-calendar-event-line me-1"></i> Knowledge Sharing
            </div>
            <h2 className="section-heading-editorial mb-14">
              Workshops, Seminars &amp; Community Drives
            </h2>
            <p className="section-subtext">
              Fostering good governance, regulatory clarity, and community leadership through structured consultative meets.
            </p>
          </div>

          {/* Events Grid */}
          <div className="row g-4 mb-48">
            {events.map((evt, idx) => (
              <div key={idx} className="col-lg-6">
                <article className="event-page-card p-32 bg-white border-card rounded-md h-100 reveal-up d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-14">
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

                  <h3 className="fs-20 fw-bold text-title mb-12">{evt.title}</h3>
                  <p className="fs-14 text-body line-height-relaxed mb-20">{evt.desc}</p>

                  <div className="p-16 bg-alabaster rounded-sm border-subtle mt-auto mb-16">
                    <span className="fs-12 text-uppercase fw-bold text-muted d-block mb-8">Key Highlights:</span>
                    <ul className="list-unstyled m-0 p-0 d-flex flex-column gap-6">
                      {evt.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="d-flex align-items-center gap-8 fs-13 text-title">
                          <i className="ri-checkbox-circle-fill text-gold fs-15 flex-shrink-0"></i>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Workshop Inquiries CTA Box */}
          <div className="p-32 bg-white border-card rounded-md text-center reveal-up">
            <h3 className="fs-20 fw-bold text-title mb-8">Host a Trustee Governance Session For Your Board</h3>
            <p className="text-muted fs-14 max-w-620 mx-auto mb-20">
              Our partners frequently conduct customized governance walkthroughs, audit briefings, and legal compliance sessions for educational, medical, and religious trusts.
            </p>
            <button 
              onClick={() => onOpenConsultation?.('Trustee Governance Workshop')}
              className="btn-prestige btn-prestige-gold"
            >
              <span>Inquire For Trustee Workshops</span>
              <i className="ri-arrow-right-line ms-1"></i>
            </button>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div 
          className="gallery-lightbox-backdrop d-flex align-items-center justify-content-center p-20"
          onClick={() => setLightboxImg(null)}
        >
          <div className="gallery-lightbox-content position-relative" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close-btn" 
              onClick={() => setLightboxImg(null)}
              aria-label="Close Preview"
            >
              <i className="ri-close-line fs-24"></i>
            </button>
            <img 
              src={lightboxImg.url} 
              alt={lightboxImg.title} 
              className="lightbox-modal-img rounded-md"
              referrerPolicy="no-referrer"
            />
            <div className="lightbox-modal-caption p-14 text-center bg-midnight text-white fs-14 rounded-bottom">
              {lightboxImg.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
