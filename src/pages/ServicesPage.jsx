
import React, { useEffect, useRef, useState } from 'react';

export const ServicesPage = ({ onOpenConsultation, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCategoryChanging, setIsCategoryChanging] = useState(false);
  const [animationVersion, setAnimationVersion] = useState(0);
  const [capabilityVisible, setCapabilityVisible] = useState(false);
  const [animatedPercentages, setAnimatedPercentages] = useState({
    'Business Planning': 0,
    'Corporate Loan': 0,
    'ROC Compliance': 0,
    'Legal Compliance': 0,
    'Taxation': 0,
    'Trust & Foundation': 0
  });

  const categoryTimer = useRef(null);
  const revealObserver = useRef(null);
  const capabilityRef = useRef(null);

  const servicesList = [
    {
      id: 'direct-tax',
      title: 'Direct Tax & Accounting Services',
      category: 'taxation',
      desc: 'Direct taxation in India is overseen by the Central Board of Direct Taxes (CBDT), formed under the Central Board of Revenue Act, 1924. CBDT is a part of the Department of Revenue in the Ministry of Finance and is responsible for the administration of the direct tax laws, policy inputs, and planning. Direct taxes are paid directly to the government by the taxpayer and liability cannot be transferred.',
      items: [
        'Income Tax assessments & annual return filing',
        'Corporation Tax compliance & advisory',
        'Wealth Tax reconciliation & reporting',
        'Statutory accounting & financial statement preparation'
      ]
    },
    {
      id: 'gst',
      title: 'GST (Goods and Services Tax)',
      category: 'taxation',
      desc: 'GST is an indirect tax that replaced many indirect taxes in India. The Goods and Service Tax Act came into effect on 1st July 2017. Goods & Services Tax Law in India is a comprehensive, multi-stage, destination-based tax levied on every value addition. It covers CGST (Central intra-state), SGST (State intra-state), and IGST (inter-state).',
      items: [
        'GST Consultation and Registration',
        'GST Training & Implementation',
        'GST Monthly & Annual Return Filings',
        'Input Tax Credit (ITC) audits & reconciliations'
      ]
    },
    {
      id: 'legal-services',
      title: 'Legal Services',
      category: 'legal',
      desc: 'We have an in-house team of expert advocates & para-legal manpower for all types of Legal & Para-Legal Services in India to execute our work in the most efficient and accurate manner. All legal drafting and filing services are handled under the supervision and control of our legal experts, delivering simple, direct and uncompromising solutions to complex issues in commercial realities.',
      items: [
        'Consulting on civil & commercial law',
        'Legal Drafting of deeds, contracts & petitions',
        'Registration of legal instruments & agreements',
        'Litigation support, evidence presentation & court matters'
      ]
    },
    {
      id: 'labour-law',
      title: 'Labour Law Compliances',
      category: 'compliance',
      desc: "Indian labour laws regulate labour protections across Employees' State Insurance Corporation (ESIC under Ministry of Labour and Employment) and Provident Fund (PF). We cater to our clients with consultation, registration, and ongoing maintenance of various statutory labour-related mandates.",
      items: [
        'Free Registration of PTEC & PTRC',
        'PF / ESIC / PT Registrations & Monthly Filings',
        'MLWF (Maharashtra Labour Welfare Fund) & Labour Licenses',
        'Regular Provident Fund Compliances & Payroll Services'
      ]
    },
    {
      id: 'rera',
      title: 'RERA Consultancy',
      category: 'legal',
      desc: 'The Government of India enacted the Real Estate (Regulation and Development) Act 2016 to protect the interests of buyers and boost investments. RERA aims to create a more equitable and fair transaction between sellers and buyers by bringing in better accountability and transparency under state regulatory authorities.',
      items: [
        'RERA Consultation for Developers, Buyers & Agents',
        'RERA Registration of Builder & Broker Entities',
        'RERA Accounting, Escrow compliance & Quarterly Updates'
      ]
    },
    {
      id: 'corporate-law',
      title: 'Corporate Law',
      category: 'corporate',
      desc: 'Corporate law governs the rights, relations, and conduct of companies, directors, shareholders, employees, creditors, and communities. We handle statutory compliances involving Company Secretaries, Chartered Accountants, and Cost Accountants across the full lifecycle of corporate entities.',
      items: [
        'Consultation on various Corporate Laws & MCA mandates',
        'Documentation, Board Resolutions & Statutory Registers',
        'Incorporation / Registration of Private, Public & Section-8 Companies',
        'Annual Filings, Secretarial Audits & NCLT matters'
      ]
    },
    {
      id: 'loan',
      title: 'Loan Advisory',
      category: 'financial',
      desc: 'Structured facilitation of borrowing liabilities and credit facilities against institutional security or asset valuation across nationalized and private banking networks.',
      items: [
        'Home Loan & Mortgage Loan / Loan Against Property',
        'Cash Credit (CC) Limit, Overdraft (OD) Limit & Working Capital',
        'Personal Loan, Business Loan & Lease Rent Discounting',
        'New Car Loan, Used Car Loan & Education Loans'
      ]
    },
    {
      id: 'govt-licenses',
      title: 'Government Registrations & Licenses',
      category: 'compliance',
      desc: 'Clients can obtain consultation and registration of various government licenses under different governmental authorities under one single roof with end-to-end follow up.',
      items: [
        'Udyog Aadhaar / MSME Registration',
        'Food and Drug License & FSSAI (Central, State & Local)',
        'Trade License, Health License & Fire Department NOC',
        'Central & State Government Authorizations'
      ]
    },
    {
      id: 'ipr',
      title: 'Trademark & Patent (IPR)',
      category: 'legal',
      desc: 'Comprehensive intellectual property protection for brand identity, industrial designs, and patentable inventions from initial availability search through prosecution, opposition, and renewal.',
      items: [
        'Trademark Search, Registrability Opinion & Application Filing',
        'Responding to Examination Reports & Office Actions',
        'Handling Trademark Opposition proceedings & Cease & Desist Notices',
        'Patent Consultation (Provisional, Non-Provisional, PCT Applications)'
      ]
    },
    {
      id: 'investments',
      title: 'Investments & Wealth Management',
      category: 'financial',
      desc: 'Protection and planned growth of funds through a disciplined four-step Financial Planning process: Risk Profiling, Goal Planning, Portfolio Structuring, and Portfolio Tracking. Recommending diversification through mutual funds and professional portfolio strategies.',
      items: [
        'Mutual Fund Portfolio Structuring',
        'Term Insurance & General Insurance Advisory',
        'Tax Saving Funds (ELSS) & Wealth Accumulation Plans',
        'Dedicated Portfolio Tracking & Periodic Rebalancing'
      ]
    },
    {
      id: 'other-services',
      title: 'Other Basic Government Services',
      category: 'compliance',
      desc: 'Basic governmental documentation and verification services executed through our experienced team to simplify administrative routines for individuals and institutions.',
      items: [
        'PAN Card application, correction & verification',
        'Official Name Change (Maharashtra Government Gazette)',
        'Shop & Establishment License (Gumasta)',
        'Digital Signature Certificates (Class 3 DSC) & TIN facilitation'
      ]
    }
  ];

  const categories = [
    { key: 'all', label: 'All Services' },
    { key: 'taxation', label: 'Taxation & GST' },
    { key: 'legal', label: 'Legal & RERA' },
    { key: 'corporate', label: 'Corporate & MCA' },
    { key: 'compliance', label: 'Labor & Govt Licenses' },
    { key: 'financial', label: 'Loans & Investments' }
  ];

  const capabilityGroups = [
    [
      ['Business Planning', 92],
      ['Corporate Loan', 87],
      ['ROC Compliance', 76]
    ],
    [
      ['Legal Compliance', 69],
      ['Taxation', 50],
      ['Trust & Foundation', 41]
    ]
  ];

  const filteredServices =
    activeCategory === 'all'
      ? servicesList
      : servicesList.filter(
          (service) => service.category === activeCategory
        );

  const changeCategory = (category) => {
    if (category === activeCategory || isCategoryChanging) return;

    if (categoryTimer.current) {
      clearTimeout(categoryTimer.current);
    }

    setIsCategoryChanging(true);

    categoryTimer.current = setTimeout(() => {
      setActiveCategory(category);
      setAnimationVersion((version) => version + 1);

      categoryTimer.current = setTimeout(() => {
        setIsCategoryChanging(false);
        categoryTimer.current = null;
      }, 30);
    }, 220);
  };

  // Reveal service cards and their content while scrolling.
  useEffect(() => {
    const page = document.querySelector('.services-page');
    if (!page) return;

    const elements = page.querySelectorAll(
      '.service-card-reveal, .service-reveal'
    );

    revealObserver.current?.disconnect();

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => {
        element.classList.add('is-visible');
      });
      return;
    }

    revealObserver.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -25px 0px'
      }
    );

    elements.forEach((element) => {
      element.classList.remove('is-visible');
      revealObserver.current.observe(element);
    });

    return () => revealObserver.current?.disconnect();
  }, [activeCategory, animationVersion]);

  // Start the capability animation only when its card enters the viewport.
  useEffect(() => {
    const card = capabilityRef.current;
    if (!card) return;

    if (!('IntersectionObserver' in window)) {
      setCapabilityVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setCapabilityVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  // Count each percentage from zero to its exact final value.
  useEffect(() => {
    if (!capabilityVisible) return;

    const targets = Object.fromEntries(
      capabilityGroups.flat().map(([label, percentage]) => [
        label,
        percentage
      ])
    );

    const duration = 1500;
    let frameId;
    let startTime;

    const animate = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      // Ease out so the numbers slow down before reaching their final values.
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValues = {};

      Object.entries(targets).forEach(([label, target]) => {
        nextValues[label] =
          progress === 1
            ? target
            : Math.round(target * easedProgress);
      });

      setAnimatedPercentages(nextValues);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [capabilityVisible]);

  // Clear timers and observers when leaving the page.
  useEffect(() => {
    return () => {
      if (categoryTimer.current) {
        clearTimeout(categoryTimer.current);
      }

      revealObserver.current?.disconnect();
    };
  }, []);

  return (
    <div className="subpage-wrapper services-page">

      {/* Hero banner */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a
                href="#/"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate?.('home');
                }}
                className="crumb-link"
              >
                Home
              </a>

              <span className="crumb-separator">/</span>
              <span className="crumb-current">Services</span>
            </div>

            <h1 className="page-banner-title">
              Our <span className="title-accent-gold">Services.</span>
            </h1>

            <p className="page-banner-desc">
              Comprehensive legal, financial, tax, regulatory, corporate, and
              governmental compliance solutions under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Services content */}
      <section
        className="page-content-section section-padding bg-alabaster"
        data-theme="light"
      >
        <div className="container">

          {/* Category filters */}
          <div className="services-filter-list d-flex flex-wrap justify-content-center gap-10 mb-40">
            {categories.map((category) => (
              <button
                key={category.key}
                type="button"
                className={`service-filter-chip ${
                  activeCategory === category.key ? 'is-active' : ''
                }`}
                onClick={() => changeCategory(category.key)}
                disabled={isCategoryChanging}
                aria-pressed={activeCategory === category.key}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Animated services grid */}
          <div
            key={animationVersion}
            className={`services-results ${
              isCategoryChanging ? 'is-changing' : 'is-entering'
            }`}
            aria-live="polite"
            aria-busy={isCategoryChanging}
          >
            {filteredServices.length > 0 ? (
              <div className="row g-4 mb-50 services-grid">
                {filteredServices.map((service, index) => (
                  <div
                    key={service.id}
                    className="col-lg-6 service-card-column"
                    style={{ '--card-order': index }}
                  >
                    <article className="service-detail-card p-32 bg-white border-card rounded-md service-card-reveal">

                      <div className="service-card-top d-flex align-items-center justify-content-between mb-16">
                        <span className="service-index-number text-gold fs-12 fw-bold text-uppercase">
                          {String(index + 1).padStart(2, '0')}. Practice Area
                        </span>

                        <span className="service-cat-pill fs-11 text-muted text-uppercase fw-bold">
                          {service.category}
                        </span>
                      </div>

                      <h3 className="fs-20 fw-bold text-title mb-12 service-reveal">
                        {service.title}
                      </h3>

                      <p className="fs-14 text-body line-height-relaxed mb-20 service-reveal">
                        {service.desc}
                      </p>

                      <div className="service-scope-box p-16 bg-alabaster rounded-sm border-subtle service-reveal">
                        <span className="fs-12 text-uppercase fw-bold text-muted d-block mb-10">
                          Key Offerings:
                        </span>

                        <ul className="list-unstyled m-0 p-0 d-flex flex-column gap-8">
                          {service.items.map((item, itemIndex) => (
                            <li
                              key={item}
                              className="d-flex align-items-start gap-8 fs-13 text-title service-reveal"
                              style={{ '--item-order': itemIndex }}
                            >
                              <i className="ri-check-line text-gold fs-15 flex-shrink-0"></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenConsultation?.(service.title)}
                        className="service-inquiry-button btn-link text-gold fw-bold fs-13 d-inline-flex align-items-center gap-4 text-start border-0 bg-transparent p-0 service-reveal"
                      >
                        <span>Inquire About {service.title}</span>
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </article>
                  </div>
                ))}
              </div>
            ) : (
              <div className="services-empty-state text-center bg-white border-card rounded-md p-32 mb-50">
                <div className="services-empty-icon mb-16">
                  <i className="ri-folder-search-line"></i>
                </div>

                <h3 className="fs-20 fw-bold text-title mb-12">
                  No Services Found
                </h3>

                <p className="fs-14 text-muted mb-20">
                  We couldn't find any services in this category at the moment.
                  Please explore all our services or choose another category.
                </p>

                <button
                  type="button"
                  className="btn-prestige btn-prestige-gold"
                  onClick={() => changeCategory('all')}
                >
                  <span>Go Back to All Services</span>
                  <i className="ri-arrow-right-line ms-1"></i>
                </button>
              </div>
            )}
          </div>

          {/* Firm capability section with animated percentages */}
          <div
            ref={capabilityRef}
            className={`practice-breakdown-card p-36 rounded-md bg-midnight text-white mb-50 ${
              capabilityVisible ? 'capability-visible' : ''
            }`}
          >
            <div className="text-center mb-32">
              <span className="fs-12 text-gold fw-bold text-uppercase letter-spacing-wider mb-8 d-block">
                Firm Capability &amp; Allocation
              </span>

              <h2 className="fs-24 fw-bold text-white m-0">
                How We Can Help
              </h2>
            </div>

            <div className="row g-4 capability-progress-grid">
              {capabilityGroups.map((group, groupIndex) => (
                <div className="col-md-6" key={groupIndex}>
                  <div className="d-flex flex-column gap-20 h-100">
                    {group.map(([label, percentage], itemIndex) => (
                      <div
                        className="progress-item"
                        key={label}
                        style={{
                          '--progress-order': groupIndex * 3 + itemIndex
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center fs-13 mb-6">
                          <span className="fw-semibold text-white">
                            {label}
                          </span>

                          <span className="text-gold fw-bold capability-number">
                            {animatedPercentages[label] ?? 0}%
                          </span>
                        </div>

                        <div className="progress-track-bg rounded-pill services-progress-track">
                          <div
                            className={`progress-bar-fill rounded-pill services-progress-fill ${
                              capabilityVisible ? 'is-filled' : ''
                            }`}
                            style={{
                              '--progress-value': `${percentage}%`,
                              transitionDelay: capabilityVisible
                                ? `${groupIndex * 3 * 100 + itemIndex * 100}ms`
                                : '0ms'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom help banner */}
          <div className="services-bottom-banner p-32 rounded-md bg-white border-card text-center reveal-up">
            <h3 className="fs-20 fw-bold text-title mb-8">
              Looking for Specific Statutory Filings?
            </h3>

            <p className="text-muted fs-14 max-w-620 mx-auto mb-20">
              Our team manages both routine monthly filings and critical
              judicial matters across Maharashtra and Central authorities.
            </p>

            <button
              type="button"
              onClick={() => onOpenConsultation?.()}
              className="btn-prestige btn-prestige-gold"
            >
              <span>Schedule Advisory Discussion</span>
              <i className="ri-arrow-right-line ms-1"></i>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
