
import React, { useEffect, useRef, useState } from 'react';
import { dataService } from '../services/dataService';

const GALLERY_IMAGES = [
  {
    id: 9,
    url: 'https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1279.jpg',
    title: 'Public Trust Governance Seminar',
  },
  {
    id: 8,
    url: 'https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1259.jpg',
    title: 'Trustee Audit & Legal Guidance Meet',
  },
  {
    id: 7,
    url: 'https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1250.jpg',
    title: 'Executive Consultation & Delegation',
  },
  {
    id: 6,
    url: 'https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1248.jpg',
    title: 'Panel Discussion on Direct Tax for NGOs',
  },
  {
    id: 5,
    url: 'https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1246.jpg',
    title: 'Statutory Compliance Interactive Session',
  },
  {
    id: 4,
    url: 'https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1244.jpg',
    title: 'Trustee Series Address by Mr. Nishant Sanap',
  },
  {
    id: 3,
    url: 'https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1230.jpg',
    title: 'Institutional Leadership Forum',
  },
  {
    id: 2,
    url: 'https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1223.jpg',
    title: 'Community Welfare & Rotary Outreach',
  },
  {
    id: 1,
    url: 'https://sanapassociates.com/wp-content/uploads/photo-gallery/imported_from_media_libray/IMG_1222.jpg',
    title: 'Annual Compliance Colloquium',
  },
];

const splitSentences = (value) => {
  if (value === null || value === undefined || value === '') return [];

  return (
    String(value)
      .match(/[^.!?]+[.!?]+[\])'"”’]*|[^.!?]+$/g)
      ?.map((sentence) => sentence.trim())
      .filter(Boolean) || [String(value)]
  );
};

const AnimatedText = ({ children, counter, className = '' }) => {
  const sentences = splitSentences(children);

  return (
    <span className={className}>
      {sentences.map((sentence) => {
        const sentenceIndex = counter.current++;

        return (
          <span
            className="event-sentence"
            key={`${sentenceIndex}-${sentence}`}
            style={{
              '--event-sentence-delay': `${sentenceIndex * 180}ms`,
            }}
          >
            {sentence}{' '}
          </span>
        );
      })}
    </span>
  );
};

const SectionHeading = ({ first, second }) => (
  <h2 className="events-section-heading">
    <span className="event-heading-dark">{first}</span>{' '}
    <span className="event-heading-mint">{second}</span>
  </h2>
);

export const EventsPage = ({ onOpenConsultation, onNavigate }) => {
  const [events, setEvents] = useState(() => dataService.getEvents());
  const [lightboxImg, setLightboxImg] = useState(null);
  const [galleryScattered, setGalleryScattered] = useState(false);
  const [visibleRows, setVisibleRows] = useState([]);

  const galleryBlockRef = useRef(null);
  const galleryGridRef = useRef(null);
  const galleryItemRefs = useRef([]);

  const cardsGridRef = useRef(null);
  const animationTimerRef = useRef(null);
  const mountedRef = useRef(true);

  // Keep event data synchronized with the existing data service.
  useEffect(() => {
    const handleUpdate = () => {
      setEvents(dataService.getEvents());
    };

    window.addEventListener('sanap_data_updated', handleUpdate);

    return () => {
      window.removeEventListener('sanap_data_updated', handleUpdate);
    };
  }, []);

  // Gallery: stack the images visually at the centre without removing
  // their grid positions, then scatter them when the user scrolls to it.
  useEffect(() => {
    const galleryBlock = galleryBlockRef.current;
    const galleryGrid = galleryGridRef.current;

    if (!galleryBlock || !galleryGrid) return undefined;

    let userHasScrolled = false;
    let galleryIsInView = false;
    let animationStarted = false;
    let observer;

    const positionStack = () => {
      if (animationStarted) return;

      const gridRect = galleryGrid.getBoundingClientRect();
      const centerX = gridRect.left + gridRect.width / 2;
      const centerY = gridRect.top + gridRect.height / 2;

      galleryItemRefs.current.forEach((item) => {
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const itemX = rect.left + rect.width / 2;
        const itemY = rect.top + rect.height / 2;

        item.style.setProperty('--stack-x', `${centerX - itemX}px`);
        item.style.setProperty('--stack-y', `${centerY - itemY}px`);
      });
    };

    const startGallery = () => {
      if (!userHasScrolled || !galleryIsInView || animationStarted) return;

      animationStarted = true;
      setGalleryScattered(true);
      observer?.disconnect();
    };

    const handleScroll = () => {
      userHasScrolled = true;
      startGallery();
    };

    const setupFrame = requestAnimationFrame(() => {
      positionStack();

      observer = new IntersectionObserver(
        ([entry]) => {
          galleryIsInView = entry.isIntersecting;
          startGallery();
        },
        { threshold: 0.12 }
      );

      observer.observe(galleryBlock);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!animationStarted) positionStack();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(setupFrame);
      observer?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Cards: reveal two cards together, one row at a time.
  // The next row starts only after the current row's sentences finish.
  useEffect(() => {
    const grid = cardsGridRef.current;

    if (!grid || events.length === 0) {
      setVisibleRows([]);
      return undefined;
    }

    let cancelled = false;
    let userHasScrolled = false;
    let rowIsInView = false;
    let nextRow = 0;
    let rowIsAnimating = false;

    const readyRows = new Set();
    const rowCount = Math.ceil(events.length / 2);
    const rowElements = new Map();

    setVisibleRows([]);

    const columns = Array.from(
      grid.querySelectorAll('.event-card-column')
    );

    columns.forEach((column) => {
      const rowIndex = Number(column.dataset.cardRow);

      if (!rowElements.has(rowIndex)) {
        rowElements.set(rowIndex, []);
      }

      rowElements.get(rowIndex).push(column);
    });

    const startNextRow = () => {
      if (cancelled || !userHasScrolled || rowIsAnimating) return;
      if (!readyRows.has(nextRow) || nextRow >= rowCount) return;

      const currentRow = nextRow;
      const currentColumns = rowElements.get(currentRow) || [];

      rowIsAnimating = true;

      setVisibleRows((previous) =>
        previous.includes(currentRow)
          ? previous
          : [...previous, currentRow]
      );

      requestAnimationFrame(() => {
        if (cancelled) return;

        const sentenceElements = currentColumns.flatMap((column) =>
          Array.from(column.querySelectorAll('.event-sentence'))
        );

        const maximumDelay = sentenceElements.reduce((maximum, element) => {
          const delay =
            parseFloat(
              getComputedStyle(element).getPropertyValue(
                '--event-sentence-delay'
              )
            ) || 0;

          return Math.max(maximum, delay);
        }, 0);

        animationTimerRef.current = window.setTimeout(() => {
          if (cancelled) return;

          nextRow += 1;
          rowIsAnimating = false;
          startNextRow();
        }, maximumDelay + 500);
      });
    };

    const handleScroll = () => {
      userHasScrolled = true;
      startNextRow();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          readyRows.add(Number(entry.target.dataset.cardRow));
        });

        startNextRow();
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    columns.forEach((column) => observer.observe(column));

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(animationTimerRef.current);
    };
  }, [events]);

  // Close the lightbox using Escape or by clicking outside the image.
  useEffect(() => {
    if (!lightboxImg) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxImg(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImg]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      window.clearTimeout(animationTimerRef.current);
    };
  }, []);

  return (
    <div className="subpage-wrapper events-page">
      {/* Hero banner */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a
                href="#/"
                className="crumb-link"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate?.('home');
                }}
              >
                Home
              </a>

              <span className="crumb-separator">/</span>
              <span className="crumb-current">Events</span>
            </div>

            <h1 className="page-banner-title">
              Events at{' '}
              <span className="title-accent-gold">Sanap &amp; Associates</span>
            </h1>

            <p className="page-banner-desc">
              Seminars, statutory workshops, and community welfare initiatives
              hosted and mentored by Sanap &amp; Associates.
            </p>
          </div>
        </div>
      </section>

      {/* Main page content */}
      <section
        className="page-content-section section-padding bg-alabaster"
        data-theme="light"
      >
        <div className="container">
          {/* Gallery */}
          <section
            className="event-gallery-block mb-60"
            ref={galleryBlockRef}
          >
            <div className="event-section-intro text-center mb-36">
              <div className="section-badge-tag mb-10">
                <i className="ri-camera-lens-line me-1" aria-hidden="true" />
                Gallery
              </div>

              <SectionHeading
                first="Event & Seminar"
                second="Photo Gallery"
              />

              <p className="section-subtext">
                Moments from our masterclasses, statutory symposiums, and
                community outreach drives.
              </p>
            </div>

            <div className="row g-3 event-gallery-grid" ref={galleryGridRef}>
              {GALLERY_IMAGES.map((img, index) => (
                <div
                  key={img.id}
                  ref={(element) => {
                    galleryItemRefs.current[index] = element;
                  }}
                  className={`col-md-4 col-sm-6 event-gallery-item ${
                    galleryScattered ? 'is-scattered' : ''
                  }`}
                  style={{ '--gallery-order': index }}
                >
                  <button
                    type="button"
                    className="gallery-thumbnail-card bg-white border-card rounded-md overflow-hidden"
                    onClick={() => setLightboxImg(img)}
                    aria-label={`Enlarge ${img.title}`}
                  >
                    <div className="gallery-thumb-wrap position-relative">
                      <img
                        src={img.url}
                        alt={img.title}
                        className="gallery-thumb-img w-100 d-block"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.parentElement?.classList.add(
                            'img-fallback-active'
                          );
                        }}
                      />

                      <div className="gallery-thumb-overlay d-flex align-items-center justify-content-center">
                        <i
                          className="ri-zoom-in-line text-white fs-24"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <div className="p-12 text-center">
                      <span className="fs-13 fw-semibold text-title line-clamp-1">
                        {img.title}
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Knowledge Sharing */}
          <section className="event-knowledge-section mb-48">
            <div className="event-section-intro event-knowledge-intro text-center">
              <div className="section-badge-tag mb-10">
                <i className="ri-calendar-event-line me-1" aria-hidden="true" />
                Knowledge Sharing
              </div>

              <SectionHeading
                first="Workshops, Seminars"
                second="& Community Drives"
              />

              <p className="section-subtext">
                Fostering good governance, regulatory clarity, and community
                leadership through structured consultative meets.
              </p>
            </div>
          </section>

          {/* Event cards */}
          <div className="row g-4 mb-48 event-cards-grid" ref={cardsGridRef}>
            {events.map((evt, index) => {
              const sentenceCounter = { current: 0 };
              const rowIndex = Math.floor(index / 2);

              return (
                <div
                  className="col-lg-6 event-card-column"
                  key={evt.id ?? `${evt.title}-${index}`}
                  data-card-row={rowIndex}
                >
                  <article
                    className={`event-page-card p-32 bg-white border-card rounded-md h-100 d-flex flex-column ${
                      visibleRows.includes(rowIndex) ? 'is-visible' : ''
                    }`}
                  >
                    <div className="event-card-meta d-flex align-items-center justify-content-between mb-14">
                      <div className="d-flex align-items-center gap-8 flex-wrap">
                        <span className="badge-event-type fs-11 fw-bold text-gold text-uppercase">
                          <AnimatedText
                            counter={sentenceCounter}
                          >
                            {evt.type}
                          </AnimatedText>
                        </span>

                        <span className="text-muted fs-12" aria-hidden="true">
                          •
                        </span>

                        <span className="fs-12 text-muted fw-bold">
                          <i
                            className="ri-map-pin-line me-1 text-gold"
                            aria-hidden="true"
                          />
                          <AnimatedText counter={sentenceCounter}>
                            {evt.location}
                          </AnimatedText>
                        </span>
                      </div>

                      <span className="fs-12 text-muted event-card-date">
                        <i className="ri-time-line me-1" aria-hidden="true" />
                        <AnimatedText counter={sentenceCounter}>
                          {evt.date}
                        </AnimatedText>
                      </span>
                    </div>

                    <h3 className="fs-20 fw-bold text-title mb-12">
                      <AnimatedText counter={sentenceCounter}>
                        {evt.title}
                      </AnimatedText>
                    </h3>

                    <p className="fs-14 text-body line-height-relaxed mb-20">
                      <AnimatedText counter={sentenceCounter}>
                        {evt.desc}
                      </AnimatedText>
                    </p>

                    <div className="event-highlights p-16 bg-alabaster rounded-sm border-subtle mt-auto mb-16">
                      <span className="fs-12 text-uppercase fw-bold text-muted d-block mb-8">
                        <AnimatedText counter={sentenceCounter}>
                          Key Highlights:
                        </AnimatedText>
                      </span>

                      <ul className="list-unstyled m-0 p-0 d-flex flex-column gap-6">
                        {(Array.isArray(evt.highlights) ? evt.highlights : []).map(
                          (highlight, highlightIndex) => (
                            <li
                              key={highlightIndex}
                              className="d-flex align-items-start gap-8 fs-13 text-title"
                            >
                              <i
                                className="ri-checkbox-circle-fill text-gold fs-15 flex-shrink-0"
                                aria-hidden="true"
                              />

                              <AnimatedText counter={sentenceCounter}>
                                {highlight}
                              </AnimatedText>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Workshop inquiry */}
          <section className="event-workshop-cta p-32 bg-white border-card rounded-md text-center">
            <div className="section-badge-tag mb-10">
              <i className="ri-chat-quote-line me-1" aria-hidden="true" />
              Collaborate With Us
            </div>

            <h3 className="fs-20 fw-bold text-title mb-8">
              Host a Trustee Governance Session For Your Board
            </h3>

            <p className="text-muted fs-14 max-w-620 mx-auto mb-20">
              Our partners frequently conduct customized governance
              walkthroughs, audit briefings, and legal compliance sessions for
              educational, medical, and religious trusts.
            </p>

            <button
              type="button"
              onClick={() =>
                onOpenConsultation?.('Trustee Governance Workshop')
              }
              className="btn-prestige btn-prestige-gold"
            >
              <span>Inquire For Trustee Workshops</span>
              <i className="ri-arrow-right-line ms-1" aria-hidden="true" />
            </button>
          </section>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="gallery-lightbox-backdrop d-flex align-items-center justify-content-center p-20"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="gallery-lightbox-content position-relative"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxImg.title}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightboxImg(null)}
              aria-label="Close preview"
            >
              <i className="ri-close-line fs-24" aria-hidden="true" />
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
