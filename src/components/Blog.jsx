import React from 'react';
import { siteData } from '../data/content';

export const Blog = ({ onOpenConsultation }) => {
  const featured = siteData.blog.find((b) => b.featured) || siteData.blog[0];
  const others = siteData.blog.filter((b) => b.id !== featured.id);

  return (
    <section id="insights" className="pt-120 pb-90">
      <div className="container">
        
        {/* Header Row */}
        <div className="row align-items-center mb-35">
          <div className="col-lg-8 mb-20 mb-lg-0">
            <h2 className="section-title style-two fw-semibold mb-0">
              <span className="position-relative z-1">Expert Articles</span> On NPO Compliance, 12A/80G, FCRA, And Trust Governance To Help You Stay Ahead.
            </h2>
          </div>

          <div className="col-lg-4 text-lg-end">
            <button 
              onClick={() => onOpenConsultation("Newsletter & Advisory Subscription")}
              className="btn style-one"
            >
              <span className="btn-icon-one">
                <i className="ri-arrow-right-line"></i>
              </span>
              <span className="btn-text">View All Articles</span>
              <span className="btn-icon-two">
                <i className="ri-arrow-right-line"></i>
              </span>
            </button>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="row justify-content-center">
          
          {/* Featured Large Card */}
          <div className="col-xl-6 col-lg-8 mb-30">
            <div className="blog-card style-two round-20">
              <div className="blog-bg">
                <img src={featured.image} alt={featured.title} />
              </div>

              <div className="blog-info">
                <span className="blog-category-badge">{featured.category}</span>
                
                <div className="blog-date-meta">
                  <i className="ri-calendar-line text_secondary"></i>
                  <span className="text-white">{featured.date}</span>
                </div>

                <h3 className="text-white mb-0">
                  <a href="#insights" onClick={(e) => { e.preventDefault(); onOpenConsultation(featured.title); }} className="text-white link-hover-secondary">
                    {featured.title}
                  </a>
                </h3>
              </div>
            </div>
          </div>

          {/* 2 Compact Cards */}
          {others.map((post) => (
            <div key={post.id} className="col-xl-3 col-lg-4 col-md-6 mb-30">
              <div className="blog-card style-three round-20">
                <div className="blog-img">
                  <img src={post.image} alt={post.title} />
                  <span className="blog-category-badge position-absolute top-0 start-0 m-3">
                    {post.category}
                  </span>
                </div>

                <div className="blog-info">
                  <div className="blog-date-meta">
                    <i className="ri-calendar-line text_primary"></i>
                    <span>{post.date}</span>
                  </div>

                  <h3>
                    <a href="#insights" onClick={(e) => { e.preventDefault(); onOpenConsultation(post.title); }} className="text-title link-hover-primary">
                      {post.title}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
