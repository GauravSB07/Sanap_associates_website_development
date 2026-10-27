import React from 'react';

export const AboutPage = ({ onOpenConsultation, onNavigate }) => {
  return (
    <div className="subpage-wrapper">
      {/* Editorial Page Header Banner */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate?.('home'); }} className="crumb-link">Home</a>
              <span className="crumb-separator">/</span>
              <span className="crumb-current">About Us</span>
            </div>
            <h1 className="page-banner-title">About Us</h1>
            <p className="page-banner-desc">
              Established in India in December 2010. Dedicated to statutory precision, legal governance, and client trust.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="page-content-section section-padding bg-white" data-theme="light">
        <div className="container">
          
          {/* Firm Overview Card with Image Grid */}
          <div className="editorial-overview-card p-32 rounded-md bg-alabaster border-card mb-48 reveal-up">
            <div className="row g-4 align-items-center">
              <div className="col-lg-7">
                <span className="section-badge-tag mb-12">
                  <i className="ri-history-line me-1"></i> Established December 2010
                </span>
                <h2 className="fs-24 fw-bold text-title mb-14">Institutional Background</h2>
                <p className="fs-15 text-body line-height-relaxed mb-16">
                  Sanap &amp; Associates is a specialized advisory practice established in India in December 2010 as a partnership firm, later converted into an LLP. Operating across India and overseas, the firm provides end-to-end Legal, Financial &amp; Business Advisory, Tax &amp; Regulatory Services, RERA consultancy, GST, Corporate Governance, and statutory facilitation.
                </p>
                <p className="fs-15 text-body line-height-relaxed m-0">
                  Our practice is guided by senior Advocates, Chartered Accountants, Company Secretaries, and MBAs who bring direct partner-level accountability to every engagement.
                </p>

                {/* Quantitative Stats Row */}
                <div className="row g-3 mt-16 pt-20 border-top-subtle">
                  <div className="col-4">
                    <div className="about-stat-number text-gold fw-bold fs-24">15+</div>
                    <div className="fs-12 text-muted fw-bold">Years of Practice</div>
                  </div>
                  <div className="col-4">
                    <div className="about-stat-number text-gold fw-bold fs-24">2,000+</div>
                    <div className="fs-12 text-muted fw-bold">Trusts Served</div>
                  </div>
                  <div className="col-4">
                    <div className="about-stat-number text-gold fw-bold fs-24">10+</div>
                    <div className="fs-12 text-muted fw-bold">Legal &amp; Tax Partners</div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="about-credentials-panel p-24 rounded-md bg-white border-card text-center">
                  <div className="about-emblem-wrap mb-16">
                    <img 
                      src="/images/logo.jpg" 
                      alt="Sanap & Associates LLP" 
                      className="about-official-logo" 
                      style={{ maxHeight: '72px', width: 'auto', objectFit: 'contain' }}
                    />
                  </div>
                  <h4 className="fs-16 fw-bold text-title mb-4">Sanap &amp; Associates LLP</h4>
                  <p className="fs-12 text-muted mb-16">Legal, Financial &amp; Business Advisory</p>
                  <div className="credential-chips d-flex flex-column gap-8 text-start fs-12">
                    <div className="d-flex align-items-center justify-content-between p-8 bg-alabaster rounded-sm border-subtle">
                      <span className="text-muted">Registration Status:</span>
                      <span className="fw-bold text-title">LLP No. AAG-6746</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-8 bg-alabaster rounded-sm border-subtle">
                      <span className="text-muted">Established:</span>
                      <span className="fw-bold text-title">December 2010</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-8 bg-alabaster rounded-sm border-subtle">
                      <span className="text-muted">Headquarters:</span>
                      <span className="fw-bold text-title">Borivali (E), Mumbai</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Leadership Spotlight */}
          <div className="p-32 rounded-md bg-white border-card mb-48 reveal-up">
            <div className="row g-4 align-items-center">
              <div className="col-md-3 text-center">
                <div className="founder-portrait-frame mx-auto">
                  <img 
                    src="/images/founder.png" 
                    alt="Mr. Nishant Sanap - Managing Director" 
                    className="founder-portrait-img" 
                  />
                </div>
                <h4 className="fs-16 fw-bold text-title mt-12 mb-2">Mr. Nishant Sanap</h4>
                <span className="fs-12 text-gold fw-bold">Managing Director</span>
              </div>
              <div className="col-md-9">
                <div className="ps-md-3">
                  <div className="quote-mark-icon text-gold fs-28 mb-8">
                    <i className="ri-double-quotes-l"></i>
                  </div>
                  <blockquote className="fs-16 text-body line-height-relaxed fst-italic mb-16">
                    "We at Sanap &amp; Associates believe that protection of your fund and rigorous statutory adherence is a prime responsibility. It needs to be addressed with lots of knowledge, absolute sincerity, and proper planning. We produce the right results at the right time for the right cost!"
                  </blockquote>
                  <span className="fs-13 text-muted fw-bold">
                    — Executive Note, Sanap &amp; Associates
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Grid */}
          <div className="row g-4 mb-50">
            {/* Vision */}
            <div className="col-lg-6">
              <div className="content-pillar-card p-30 border-card rounded-md bg-white h-100 reveal-up">
                <div className="d-flex align-items-center gap-12 mb-20">
                  <div className="pillar-icon-box">
                    <i className="ri-eye-line text-gold fs-22"></i>
                  </div>
                  <h3 className="fs-22 fw-bold text-title m-0">Vision</h3>
                </div>
                <ul className="editorial-bullets-list list-unstyled m-0 p-0 d-flex flex-column gap-14">
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">
                      To be amongst the most admired KPO Company delivering reliable and quality products and services to all customers at competitive cost.
                    </span>
                  </li>
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">
                      We envision a client relationship that is based on trust and confidence and mutual success.
                    </span>
                  </li>
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">
                      Sanap &amp; Associates will produce the right results at the right time for the right cost!
                    </span>
                  </li>
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">
                      We are foreseeing for the happiness of the client with our best delivered services.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mission */}
            <div className="col-lg-6">
              <div className="content-pillar-card p-30 border-card rounded-md bg-white h-100 reveal-up">
                <div className="d-flex align-items-center gap-12 mb-20">
                  <div className="pillar-icon-box">
                    <i className="ri-compass-3-line text-gold fs-22"></i>
                  </div>
                  <h3 className="fs-22 fw-bold text-title m-0">Mission</h3>
                </div>
                <ul className="editorial-bullets-list list-unstyled m-0 p-0 d-flex flex-column gap-12">
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">To encourage ideas, talent and value systems.</span>
                  </li>
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">To expand and diversify our earnings across business and geographies.</span>
                  </li>
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">
                      To leverage our people, technology and capital to achieve excellence in service, quality, reliability, safety and work with vigor, dedication and innovation with total customer satisfaction as the ultimate goal.
                    </span>
                  </li>
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">
                      To uphold the guiding principles of trust, integrity and transparency in all aspects of interactions and dealings.
                    </span>
                  </li>
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">
                      To promote work culture that fosters individual growth, team spirit and creativity to overcome challenges and attain goals.
                    </span>
                  </li>
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">To Create Value for Customers, Clients, Shareholders, Business Associates.</span>
                  </li>
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">
                      We strive to offer high quality data processing services at most competitive rates and ensure security and confidentiality.
                    </span>
                  </li>
                  <li className="d-flex align-items-start gap-12">
                    <i className="ri-arrow-right-s-line text-gold fs-18 flex-shrink-0 mt-2"></i>
                    <span className="fs-14 text-body">
                      We are confident that we would leave no stone unturned in our endeavor to become one of the most preferred KPO companies in the industry.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guiding Values Section */}
          <div className="mb-48 reveal-up">
            <h2 className="fs-24 fw-bold text-title mb-24 text-center">Our Guiding Values</h2>
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="value-box p-24 bg-alabaster border-card rounded-md h-100">
                  <div className="value-number text-gold fs-14 fw-bold mb-8">01. PRINCIPLE</div>
                  <h4 className="fs-18 fw-bold text-title mb-10">Quality</h4>
                  <p className="fs-13 text-body m-0 line-height-relaxed">
                    Quality is an essential ingredient and an integral part of what we do. We ensure that whatever we do and whatever we deliver follows strict quality standards so that you get accurate and error-free solutions all the time.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="value-box p-24 bg-alabaster border-card rounded-md h-100">
                  <div className="value-number text-gold fs-14 fw-bold mb-8">02. PRINCIPLE</div>
                  <h4 className="fs-18 fw-bold text-title mb-10">Client Requirements</h4>
                  <p className="fs-13 text-body m-0 line-height-relaxed">
                    We have a long list of clients to which we pay special attention and provide solutions to their requirements, maintaining rigorous standards for every file.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="value-box p-24 bg-alabaster border-card rounded-md h-100">
                  <div className="value-number text-gold fs-14 fw-bold mb-8">03. PRINCIPLE</div>
                  <h4 className="fs-18 fw-bold text-title mb-10">Value Added Business</h4>
                  <p className="fs-13 text-body m-0 line-height-relaxed">
                    We value the business of our clients and our esteemed partners. We constantly look out for unique ways to further enhance the business capability of our clients.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="value-box p-24 bg-alabaster border-card rounded-md h-100">
                  <div className="value-number text-gold fs-14 fw-bold mb-8">04. PRINCIPLE</div>
                  <h4 className="fs-18 fw-bold text-title mb-10">Integrity</h4>
                  <p className="fs-13 text-body m-0 line-height-relaxed">
                    We seek to build long lasting relationships with all our clients, business partners, and employees through open and clear communication. Our team is always ready to help our clients and partners in all possible ways and earn trust and respect by demonstrating absolute sincerity and honesty at work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA Box */}
          <div className="page-bottom-cta p-32 rounded-md bg-midnight text-white text-center reveal-up">
            <h3 className="fs-22 fw-bold text-white mb-10">Need Assistance With Your Statutory Compliance?</h3>
            <p className="text-white-muted fs-14 max-w-620 mx-auto mb-20">
              Speak directly with our senior partners and legal counsel to assess your organization's legal, tax, or governance requirements.
            </p>
            <div className="d-flex justify-content-center gap-12">
              <button 
                onClick={onOpenConsultation}
                className="btn-prestige btn-prestige-gold"
              >
                <span>Book a Consultation</span>
                <i className="ri-arrow-right-line ms-1"></i>
              </button>
              <button 
                onClick={() => onNavigate?.('contact-us')}
                className="btn-prestige btn-prestige-ghost"
              >
                <span>Get In Touch</span>
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;
