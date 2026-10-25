import React, { useState } from 'react';
import { siteData } from '../data/content';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = siteData.testimonials;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[currentIndex];

  return (
    <section className="testimonial-area style-one bg_primary">
      <div className="container-fluid px-0">
        <div className="row gx-0 align-items-center">
          
          {/* Left Column: Background Photo & Floating Rating Box */}
          <div className="col-lg-6">
            <div className="testimonial-bg">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80" 
                alt="Client Consultation Feedback" 
              />
              
              <div className="rating-box">
                <div className="d-flex align-items-center gap-15 mb-10">
                  <span className="score">4.9</span>
                  <div>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="ri-star-fill"></i>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="fs-15 text-white mb-0">Based on 50+ Trust reviews</p>
              </div>
            </div>
          </div>

          {/* Right Column: Active Review Slider */}
          <div className="col-lg-6">
            <div className="testimonial-content">
              
              <h2 className="section-title style-two text-white mb-35">
                Hear What <span className="text_secondary">Our Clients Say</span> About Working With Us
              </h2>

              <div className="testimonial-card style-two">
                <div className="rating-stars mb-25" style={{ fontSize: '20px' }}>
                  {[...Array(current.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill"></i>
                  ))}
                </div>

                <p>{current.quote}</p>

                <div className="client-info-wrap">
                  <div className="client-img">
                    <img src={current.avatar} alt={current.author} />
                  </div>
                  <div className="client-info">
                    <h5>{current.author}</h5>
                    <span>{current.role}</span>
                  </div>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="slider-btn">
                <button 
                  onClick={prevReview}
                  className="slider-arrow-btn"
                  aria-label="Previous Review"
                >
                  <i className="ri-arrow-left-line"></i>
                </button>
                <button 
                  onClick={nextReview}
                  className="slider-arrow-btn"
                  aria-label="Next Review"
                >
                  <i className="ri-arrow-right-line"></i>
                </button>
                
                <span className="text-gray fs-14 align-self-center ms-3">
                  {currentIndex + 1} / {reviews.length}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
