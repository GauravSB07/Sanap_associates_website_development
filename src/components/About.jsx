import React from 'react';
import { siteData } from '../data/content';
import { useEffect } from "react";

export const About = () => {
  const { about, images, founder } = siteData;

  const statutoryHighlights = [
    {
      title: "Bombay Public Trust Act (BPT)",
      desc: "State charity commissioner compliance, change report jurisprudence, and constitutional trust deeds.",
      icon: "ri-scales-3-line"
    },
    {
      title: "Tax Exemptions (12A, 80G, 10B/10BB)",
      desc: "Provisional to permanent conversions, donor 10BD/10BE disclosures, and specialised ITR-7 audits.",
      icon: "ri-file-shield-line"
    },
    {
      title: "Section-8 MCA & CSR-1 Filings",
      desc: "Corporate Affairs non-profit secretarial compliance, CSR-1 approvals, and mandatory CSR-2 disclosures.",
      icon: "ri-building-line"
    },
    {
      title: "FCRA Foreign Contribution Governance",
      desc: "MHA approvals, prior permission, dedicated SBI banking compliance, and annual return filings.",
      icon: "ri-global-line"
    }
  ];


  useEffect(() => {
    const elements = document.querySelectorAll(
      ".about-page .sentence-reveal"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="about-section section-padding"
      data-theme="light"
    >
      <div className="container">

        {/* Section Header */}
        <div className="section-header text-center mb-50">
          <div className="section-badge-tag reveal-up">
            <i className="ri-shield-user-line me-1"></i> Practice Pedigree &amp; Governance
          </div>
          <h2 className="section-heading-editorial reveal-up">
            {about.heading}
          </h2>
          <p className="section-subtext reveal-up">
            Dedicated single-window execution partner for non-profit governance, legal drafting, direct taxation, and charity commissioner liaison.
          </p>
        </div>

        {/* Executive Overview & Highlights */}
        <div className="row g-4 align-items-center mb-50">

          {/* Narrative Box */}
          <div className="col-lg-7">
            <div className="about-narrative-card reveal-up">
              <div className="narrative-tag mb-16">
                <span>Domain Leadership Since 2011</span>
              </div>

              <h3 className="narrative-title mb-20">
                A Decade and a Half of Uncompromising Non-Profit Jurisprudence.
              </h3>

              <div className="narrative-paragraphs">
                <p className="narrative-text">
                  {about.paragraphs[0]}
                </p>
                <p className="narrative-text">
                  {about.paragraphs[1]}
                </p>
                <p className="narrative-text highlight-statement">
                  {about.paragraphs[2]}
                </p>
              </div>

              {/* Distinctive Executive Credentials Bar */}
              <div className="about-trust-strip d-flex flex-wrap gap-16 pt-20 border-top-subtle">
                <div className="trust-strip-item">
                  <i className="ri-checkbox-circle-fill text-gold me-2"></i>
                  <span>Single-Window Execution</span>
                </div>
                <div className="trust-strip-item">
                  <i className="ri-checkbox-circle-fill text-gold me-2"></i>
                  <span>Pan-India Portals &amp; Physical Liaison</span>
                </div>
                <div className="trust-strip-item">
                  <i className="ri-checkbox-circle-fill text-gold me-2"></i>
                  <span>Zero Statutory Rejection Record</span>
                </div>
              </div>
            </div>
          </div>

          {/* Portrait & Founder Leadership Frame */}
          <div className="col-lg-5">
            <div className="about-portrait-card reveal-up">
              <div className="portrait-image-wrapper">
                <img
                  src={images.about.url}
                  alt={images.about.alt}
                  loading="lazy"
                  className="founder-portrait-image"
                />
                <div className="portrait-gradient-shade"></div>

                {/* Floating Founder Leadership Badge */}
                <div className="portrait-nameplate">
                  <div className="nameplate-name">{founder.author}</div>
                  <div className="nameplate-role">{founder.role}</div>
                  <div className="nameplate-accreditation">
                    Rotarian &amp; NPO Jurisprudence Advisor
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="portrait-floating-stat">
                <div className="stat-icon-wrap">
                  <i className="ri-award-line"></i>
                </div>
                <div>
                  <div className="stat-bold">15+ Years</div>
                  <div className="stat-sub">Domain Specialisation</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Statutory Disciplines Grid */}
        <div className="row g-4">
          {statutoryHighlights.map((pillar, idx) => (
            <div key={idx} className="col-md-6 col-lg-3 reveal-up">
              <div
                className="statutory-pillar-card"
              >
                <div className="pillar-icon-box mb-16">
                  <i className={pillar.icon}></i>
                </div>
                <h4 className="pillar-heading mb-10">
                  {pillar.title}
                </h4>
                <p className="pillar-desc mb-0">
                  {pillar.desc}
                </p>
                <div className="pillar-card-accent-bar"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
