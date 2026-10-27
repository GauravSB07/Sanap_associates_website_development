import React, { useState } from 'react';

export const ServicesPage = ({ onOpenConsultation, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const servicesList = [
    {
      id: "direct-tax",
      title: "Direct Tax & Accounting Services",
      category: "taxation",
      desc: "Direct taxation in India is overseen by the Central Board of Direct Taxes (CBDT), formed under the Central Board of Revenue Act, 1924. CBDT is a part of the Department of Revenue in the Ministry of Finance and is responsible for the administration of the direct tax laws, policy inputs, and planning. Direct taxes are paid directly to the government by the taxpayer and liability cannot be transferred.",
      items: [
        "Income Tax assessments & annual return filing",
        "Corporation Tax compliance & advisory",
        "Wealth Tax reconciliation & reporting",
        "Statutory accounting & financial statement preparation"
      ]
    },
    {
      id: "gst",
      title: "GST (Goods and Services Tax)",
      category: "taxation",
      desc: "GST is an indirect tax that replaced many indirect taxes in India. The Goods and Service Tax Act came into effect on 1st July 2017. Goods & Services Tax Law in India is a comprehensive, multi-stage, destination-based tax levied on every value addition. It covers CGST (Central intra-state), SGST (State intra-state), and IGST (inter-state).",
      items: [
        "GST Consultation and Registration",
        "GST Training & Implementation",
        "GST Monthly & Annual Return Filings",
        "Input Tax Credit (ITC) audits & reconciliations"
      ]
    },
    {
      id: "legal-services",
      title: "Legal Services",
      category: "legal",
      desc: "We have an in-house team of expert advocates & para-legal manpower for all types of Legal & Para-Legal Services in India to execute our work in the most efficient and accurate manner. All legal drafting and filing services are handled under the supervision and control of our legal experts, delivering simple, direct and uncompromising solutions to complex issues in commercial realities.",
      items: [
        "Consulting on civil & commercial law",
        "Legal Drafting of deeds, contracts & petitions",
        "Registration of legal instruments & agreements",
        "Litigation support, evidence presentation & court matters"
      ]
    },
    {
      id: "labour-law",
      title: "Labour Law Compliances",
      category: "compliance",
      desc: "Indian labour laws regulate labour protections across Employees' State Insurance Corporation (ESIC under Ministry of Labour and Employment) and Provident Fund (PF). We cater to our clients with consultation, registration, and ongoing maintenance of various statutory labour-related mandates.",
      items: [
        "Free Registration of PTEC & PTRC",
        "PF / ESIC / PT Registrations & Monthly Filings",
        "MLWF (Maharashtra Labour Welfare Fund) & Labour Licenses",
        "Regular Provident Fund Compliances & Payroll Services"
      ]
    },
    {
      id: "rera",
      title: "RERA Consultancy",
      category: "legal",
      desc: "The Government of India enacted the Real Estate (Regulation and Development) Act 2016 to protect the interests of buyers and boost investments. RERA aims to create a more equitable and fair transaction between sellers and buyers by bringing in better accountability and transparency under state regulatory authorities.",
      items: [
        "RERA Consultation for Developers, Buyers & Agents",
        "RERA Registration of Builder & Broker Entities",
        "RERA Accounting, Escrow compliance & Quarterly Updates"
      ]
    },
    {
      id: "corporate-law",
      title: "Corporate Law",
      category: "corporate",
      desc: "Corporate law governs the rights, relations, and conduct of companies, directors, shareholders, employees, creditors, and communities. We handle statutory compliances involving Company Secretaries, Chartered Accountants, and Cost Accountants across the full lifecycle of corporate entities.",
      items: [
        "Consultation on various Corporate Laws & MCA mandates",
        "Documentation, Board Resolutions & Statutory Registers",
        "Incorporation / Registration of Private, Public & Section-8 Companies",
        "Annual Filings, Secretarial Audits & NCLT matters"
      ]
    },
    {
      id: "loan",
      title: "Loan Advisory",
      category: "financial",
      desc: "Structured facilitation of borrowing liabilities and credit facilities against institutional security or asset valuation across nationalized and private banking networks.",
      items: [
        "Home Loan & Mortgage Loan / Loan Against Property",
        "Cash Credit (CC) Limit, Overdraft (OD) Limit & Working Capital",
        "Personal Loan, Business Loan & Lease Rent Discounting",
        "New Car Loan, Used Car Loan & Education Loans"
      ]
    },
    {
      id: "govt-licenses",
      title: "Government Registrations & Licenses",
      category: "compliance",
      desc: "Clients can obtain consultation and registration of various government licenses under different governmental authorities under one single roof with end-to-end follow up.",
      items: [
        "Udyog Aadhaar / MSME Registration",
        "Food and Drug License & FSSAI (Central, State & Local)",
        "Trade License, Health License & Fire Department NOC",
        "Central & State Government Authorizations"
      ]
    },
    {
      id: "ipr",
      title: "Trademark & Patent (IPR)",
      category: "legal",
      desc: "Comprehensive intellectual property protection for brand identity, industrial designs, and patentable inventions from initial availability search through prosecution, opposition, and renewal.",
      items: [
        "Trademark Search, Registrability Opinion & Application Filing",
        "Responding to Examination Reports & Office Actions",
        "Handling Trademark Opposition proceedings & Cease & Desist Notices",
        "Patent Consultation (Provisional, Non-Provisional, PCT Applications)"
      ]
    },
    {
      id: "investments",
      title: "Investments & Wealth Management",
      category: "financial",
      desc: "Protection and planned growth of funds through a disciplined four-step Financial Planning process: Risk Profiling, Goal Planning, Portfolio Structuring, and Portfolio Tracking. Recommending diversification through mutual funds and professional portfolio strategies.",
      items: [
        "Mutual Fund Portfolio Structuring",
        "Term Insurance & General Insurance Advisory",
        "Tax Saving Funds (ELSS) & Wealth Accumulation Plans",
        "Dedicated Portfolio Tracking & Periodic Rebalancing"
      ]
    },
    {
      id: "other-services",
      title: "Other Basic Government Services",
      category: "compliance",
      desc: "Basic governmental documentation and verification services executed through our experienced team to simplify administrative routines for individuals and institutions.",
      items: [
        "PAN Card application, correction & verification",
        "Official Name Change (Maharashtra Government Gazette)",
        "Shop & Establishment License (Gumasta)",
        "Digital Signature Certificates (Class 3 DSC) & TIN facilitation"
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

  const filteredServices = activeCategory === 'all'
    ? servicesList
    : servicesList.filter(s => s.category === activeCategory);

  return (
    <div className="subpage-wrapper">
      {/* Editorial Page Header Banner */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate?.('home'); }} className="crumb-link">Home</a>
              <span className="crumb-separator">/</span>
              <span className="crumb-current">Services</span>
            </div>
            <h1 className="page-banner-title">Our Services</h1>
            <p className="page-banner-desc">
              Comprehensive legal, financial, tax, regulatory, corporate, and governmental compliance solutions under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="page-content-section section-padding bg-alabaster" data-theme="light">
        <div className="container">

          {/* Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-10 mb-40 reveal-up">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`service-filter-chip ${activeCategory === cat.key ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="row g-4 mb-50">
            {filteredServices.map((service, idx) => (
              <div key={service.id} className="col-lg-6">
                <div className="service-detail-card p-32 bg-white border-card rounded-md h-100 reveal-up d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-16">
                    <span className="service-index-number text-gold fs-12 fw-bold text-uppercase">
                      0{idx + 1}. Practice Area
                    </span>
                    <span className="service-cat-pill fs-11 text-muted text-uppercase fw-bold">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="fs-20 fw-bold text-title mb-12">{service.title}</h3>
                  <p className="fs-14 text-body line-height-relaxed mb-20">
                    {service.desc}
                  </p>

                  <div className="service-scope-box p-16 bg-alabaster rounded-sm border-subtle mt-auto mb-20">
                    <span className="fs-12 text-uppercase fw-bold text-muted d-block mb-10">Key Offerings:</span>
                    <ul className="list-unstyled m-0 p-0 d-flex flex-column gap-8">
                      {service.items.map((item, iIdx) => (
                        <li key={iIdx} className="d-flex align-items-center gap-8 fs-13 text-title">
                          <i className="ri-check-line text-gold fs-15 flex-shrink-0"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenConsultation?.(service.title)}
                    className="btn-link text-gold fw-bold fs-13 d-inline-flex align-items-center gap-4 text-start border-0 bg-transparent p-0"
                  >
                    <span>Inquire About {service.title}</span>
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Authentic Practice Breakdown from sanapassociates.com */}
          <div className="practice-breakdown-card p-36 rounded-md bg-midnight text-white mb-50 reveal-up">
            <div className="text-center mb-32">
              <span className="fs-12 text-gold fw-bold text-uppercase letter-spacing-wider mb-8 d-block">
                Firm Capability &amp; Allocation
              </span>
              <h2 className="fs-24 fw-bold text-white m-0">How We Can Help</h2>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex flex-column gap-20">
                  <div className="progress-item">
                    <div className="d-flex justify-content-between fs-13 mb-6">
                      <span className="fw-semibold text-white">Business Planning</span>
                      <span className="text-gold fw-bold">92%</span>
                    </div>
                    <div className="progress-track-bg rounded-pill" style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}>
                      <div className="progress-bar-fill rounded-pill" style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-gold-light))' }}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="d-flex justify-content-between fs-13 mb-6">
                      <span className="fw-semibold text-white">Corporate Loan</span>
                      <span className="text-gold fw-bold">87%</span>
                    </div>
                    <div className="progress-track-bg rounded-pill" style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}>
                      <div className="progress-bar-fill rounded-pill" style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-gold-light))' }}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="d-flex justify-content-between fs-13 mb-6">
                      <span className="fw-semibold text-white">ROC Compliance</span>
                      <span className="text-gold fw-bold">76%</span>
                    </div>
                    <div className="progress-track-bg rounded-pill" style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}>
                      <div className="progress-bar-fill rounded-pill" style={{ width: '76%', height: '100%', background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-gold-light))' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex flex-column gap-20">
                  <div className="progress-item">
                    <div className="d-flex justify-content-between fs-13 mb-6">
                      <span className="fw-semibold text-white">Legal Compliance</span>
                      <span className="text-gold fw-bold">69%</span>
                    </div>
                    <div className="progress-track-bg rounded-pill" style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}>
                      <div className="progress-bar-fill rounded-pill" style={{ width: '69%', height: '100%', background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-gold-light))' }}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="d-flex justify-content-between fs-13 mb-6">
                      <span className="fw-semibold text-white">Taxation</span>
                      <span className="text-gold fw-bold">50%</span>
                    </div>
                    <div className="progress-track-bg rounded-pill" style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}>
                      <div className="progress-bar-fill rounded-pill" style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-gold-light))' }}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="d-flex justify-content-between fs-13 mb-6">
                      <span className="fw-semibold text-white">Trust &amp; Foundation</span>
                      <span className="text-gold fw-bold">41%</span>
                    </div>
                    <div className="progress-track-bg rounded-pill" style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}>
                      <div className="progress-bar-fill rounded-pill" style={{ width: '41%', height: '100%', background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-gold-light))' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Help Banner */}
          <div className="p-32 rounded-md bg-white border-card text-center reveal-up">
            <h3 className="fs-20 fw-bold text-title mb-8">Looking for Specific Statutory Filings?</h3>
            <p className="text-muted fs-14 max-w-620 mx-auto mb-20">
              Our team manages both routine monthly filings and critical judicial matters across Maharashtra and Central authorities.
            </p>
            <button 
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
