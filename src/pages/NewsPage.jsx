
import React, { useState, useEffect } from "react";
import { dataService } from "../services/dataService";

const categories = [
  "All",
  "Charity Commissioner",
  "Direct Tax & 12A/80G",
  "FCRA Directives",
  "CSR Governance",
  "Trust Governance",
  "GST & Indirect Tax",
];

const splitIntoSentences = (text = "") => {
  return (
    text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()) ||
    (text ? [text] : [])
  );
};

const AnimatedSentences = ({ text, startDelay = 0, className = "" }) => {
  const sentences = splitIntoSentences(text);

  return (
    <>
      {sentences.map((sentence, index) => (
        <span
          key={`${sentence}-${index}`}
          className={`sentence-reveal news-copy-sentence ${className}`}
          style={{
            "--sentence-delay": `${startDelay + index * 140}ms`,
          }}
        >
          {sentence}
        </span>
      ))}
    </>
  );
};

export const NewsPage = ({ onOpenConsultation, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [newsItems, setNewsItems] = useState(() => dataService.getNews());
  const [isFiltering, setIsFiltering] = useState(false);
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setNewsItems(dataService.getNews());
    };

    window.addEventListener("sanap_data_updated", handleUpdate);

    return () => {
      window.removeEventListener("sanap_data_updated", handleUpdate);
    };
  }, []);

  const filteredNews =
    activeFilter === "All"
      ? newsItems
      : newsItems.filter((item) => item.category === activeFilter);

  // Reset the card sequence when the category or news data changes.
  useEffect(() => {
    setVisibleCardIndex(0);
  }, [activeFilter, newsItems]);

  // Reveal sentences in one card, then allow the next card to animate.
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll(".news-page .news-page-card")
    );

    if (!cards.length) return;

    let cancelled = false;
    let observer;
    let activeTimer;
    let currentCardIndex = 0;

    const revealCard = (index) => {
      if (cancelled || index >= cards.length) return;

      const card = cards[index];
      const sentences = Array.from(
        card.querySelectorAll(".sentence-reveal")
      );

      // The card's content is revealed in DOM order.
      sentences.forEach((element, sentenceIndex) => {
        element.style.setProperty(
          "--sentence-delay",
          `${sentenceIndex * 140}ms`
        );
      });

      // Trigger the transitions after the delay values are applied.
      requestAnimationFrame(() => {
        if (cancelled) return;

        sentences.forEach((element) => {
          element.classList.add("is-visible");
        });

        const longestDelay = Math.max(
          0,
          ...sentences.map((element) =>
            parseFloat(element.style.getPropertyValue("--sentence-delay")) || 0
          )
        );

        // Wait for the final sentence's transition to finish.
        const transitionDuration = 450;
        const pauseBetweenCards = 150;

        activeTimer = window.setTimeout(() => {
          if (cancelled) return;

          currentCardIndex += 1;
          setVisibleCardIndex(currentCardIndex);

          if (currentCardIndex < cards.length) {
            waitForNextCard(currentCardIndex);
          }
        }, longestDelay + transitionDuration + pauseBetweenCards);
      });
    };

    const waitForNextCard = (index) => {
      if (cancelled || index >= cards.length) return;

      const nextCard = cards[index];

      // Start the next card only when it enters the viewport.
      if (!("IntersectionObserver" in window)) {
        revealCard(index);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries.find(
            (observedEntry) =>
              observedEntry.target === nextCard && observedEntry.isIntersecting
          );

          if (entry) {
            observer.disconnect();
            observer = null;
            revealCard(index);
          }
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -30px 0px",
        }
      );

      observer.observe(nextCard);
    };

    // Wait for the first card to enter the viewport as well.
    waitForNextCard(0);

    return () => {
      cancelled = true;

      if (observer) observer.disconnect();
      if (activeTimer) window.clearTimeout(activeTimer);

      cards.forEach((card) => {
        card.querySelectorAll(".sentence-reveal").forEach((element) => {
          element.classList.remove("is-visible");
          element.style.removeProperty("--sentence-delay");
        });
      });
    };
  }, [activeFilter, newsItems]);

  const handleCategoryChange = (category) => {
    if (category === activeFilter || isFiltering) return;

    setIsFiltering(true);

    window.setTimeout(() => {
      setActiveFilter(category);
      setIsFiltering(false);
    }, 240);
  };

  return (
    <div className="subpage-wrapper news-page">
      {/* Hero banner */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a
                href="#/"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate?.("home");
                }}
                className="crumb-link"
              >
                Home
              </a>

              <span className="crumb-separator">/</span>
              <span className="crumb-current">News &amp; Insights</span>
            </div>

            <h1 className="page-banner-title">
              News &amp;{" "}
              <span className="title-accent-gold">Regulatory Updates.</span>
            </h1>

            <p className="page-banner-desc">
              Stay informed about statutory notifications, Charity Commissioner
              circulars, tax directives, and important regulatory developments
              affecting charitable trusts and non-profit organisations.
            </p>
          </div>
        </div>
      </section>

      {/* Main news content */}
      <section
        className="page-content-section section-padding bg-alabaster"
        data-theme="light"
      >
        <div className="container">
          <div className="text-center mb-40 reveal-up">
            <div className="section-badge-tag mb-12">
              <i className="ri-newspaper-line me-1"></i>
              Latest Updates
            </div>

            <h2 className="section-heading-editorial mb-16">
              News &amp; Notifications
            </h2>

            <p className="section-subtext">
              Important legal, tax, and compliance updates to help you stay
              informed and prepared.
            </p>
          </div>

          {/* Category filters */}
          <div
            className="d-flex flex-wrap gap-8 justify-content-center mb-40 news-category-filters"
            role="group"
            aria-label="Filter news by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`service-filter-chip ${
                  activeFilter === category ? "is-active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
                aria-pressed={activeFilter === category}
                disabled={isFiltering}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results heading */}
          <div className="news-results-heading mb-20">
            <span className="fs-13 text-muted">
              {activeFilter === "All" ? "All News" : activeFilter}
            </span>

            <span className="fs-13 text-muted">
              {filteredNews.length}{" "}
              {filteredNews.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {/* News cards */}
          <div
            className={`news-filter-results ${
              isFiltering ? "is-filtering" : ""
            }`}
            aria-live="polite"
            aria-busy={isFiltering}
          >
            {filteredNews.length > 0 ? (
              <div className="row g-4 justify-content-center mb-50">
                {filteredNews.map((item, index) => (
                  <div
                    key={item.id || `${item.category}-${item.title}`}
                    className="col-lg-8 news-card-column"
                    style={{
                      "--news-card-delay": `${Math.min(index * 90, 450)}ms`,
                    }}
                  >
                    <article className="news-page-card p-24 p-md-32 bg-white border-card rounded-md news-card-enter">
                      {/* Category and date */}
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-10 mb-16">
                        <span className="badge-news-category text-gold fw-bold fs-12 text-uppercase sentence-reveal">
                          {item.category}
                        </span>

                        <span className="fs-12 text-muted sentence-reveal">
                          <i className="ri-calendar-line me-1"></i>
                          {item.date || "Latest Update"}
                        </span>
                      </div>

                      {/* Headline */}
                      <h2 className="fs-20 fw-bold text-title mb-12 news-card-title">
                        <AnimatedSentences text={item.title} />
                      </h2>

                      {/* Summary */}
                      {item.summary && (
                        <p className="fs-14 text-body line-height-relaxed mb-18 news-card-summary">
                          <AnimatedSentences text={item.summary} />
                        </p>
                      )}

                      {/* Statutory implications */}
                      {item.details && (
                        <div className="p-16 bg-alabaster rounded-sm border-subtle mb-16 news-statutory-box">
                          <span className="fs-12 text-muted fw-bold text-uppercase d-block mb-8 sentence-reveal">
                            Statutory Implication
                          </span>

                          <p className="fs-13 text-body m-0 news-card-details">
                            <AnimatedSentences text={item.details} />
                          </p>
                        </div>
                      )}

                      {/* Tags and consultation action */}
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-12 pt-14 border-top-subtle">
                        <div className="d-flex flex-wrap gap-6">
                          {(item.tags || []).map((tag, tagIndex) => (
                            <span
                              key={`${tag}-${tagIndex}`}
                              className="fs-11 px-2 py-1 bg-alabaster border-subtle rounded-xs text-muted sentence-reveal"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => onOpenConsultation?.(item.title)}
                          className="btn-link text-gold fw-bold fs-13 border-0 bg-transparent p-0 d-inline-flex align-items-center gap-4 news-consult-link sentence-reveal"
                        >
                          <span>Consult on this circular</span>
                          <i className="ri-arrow-right-line"></i>
                        </button>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            ) : (
              <div className="news-empty-state text-center bg-white border-card rounded-md p-32 p-md-48 mb-50">
                <div className="news-empty-icon mb-16">
                  <i className="ri-file-search-line"></i>
                </div>

                <h3 className="fs-20 fw-bold text-title mb-10">
                  No news found in this category
                </h3>

                <p className="fs-14 text-body line-height-relaxed mb-20">
                  There are currently no news articles available in{" "}
                  {activeFilter === "All"
                    ? "the news section"
                    : `"${activeFilter}"`}
                  . Please check another category or return to all news.
                </p>

                {activeFilter !== "All" && (
                  <button
                    type="button"
                    className="service-filter-chip is-active"
                    onClick={() => handleCategoryChange("All")}
                  >
                    <i className="ri-arrow-left-line me-1"></i>
                    View All News
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
