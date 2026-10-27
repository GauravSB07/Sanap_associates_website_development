
import React, { useEffect } from "react";

const teamMembers = [
  {
    name: "Mr. Nishant Sanap",
    role: "Managing Director",
    qualification: "Senior NPO Counsel & Founder",
    photo: "/images/team/nishant-sanap.jpg",
    linkedin: "https://www.linkedin.com/",
    bio: "Spearheading Bombay Public Trust Act advisory, statutory audits, and national non-profit governance over 15+ years.",
  },
  {
    name: "Adv. Tanaji Londhe",
    role: "Chief Legal Officer",
    qualification: "High Court Advocate",
    photo: "/images/team/tanaji-londhe.jpg",
    linkedin: "https://www.linkedin.com/",
    bio: "Expert in charity commissioner disputes, scheme framing under Section 50A, and non-profit civil litigation.",
  },
  {
    name: "Adv. Purva Shah",
    role: "Senior Advocate",
    qualification: "Legal Counsel",
    photo: "/images/team/purva-shah.jpg",
    linkedin: "https://www.linkedin.com/",
    bio: "Specializing in trust deed drafting, governance restructuring, trustee succession, and statutory compliance.",
  },
  {
    name: "Ms. Gauri Jadhav",
    role: "Research Head",
    qualification: "Jurisprudence & Research",
    photo: "/images/team/gauri-jadhav.jpg",
    linkedin: "https://www.linkedin.com/",
    bio: "Leading legal intelligence on evolving statutory mandates, judicial precedents, and regulatory exemptions.",
  },
  {
    name: "CA Satish Dhotre",
    role: "Head – Indirect Tax",
    qualification: "Chartered Accountant",
    photo: "/images/team/satish-dhotre.jpg",
    linkedin: "https://www.linkedin.com/",
    bio: "Heading institutional GST assessments, trust audits, input tax reconciliations, and indirect tax compliance.",
  },
  {
    name: "Vartika Keshri",
    role: "Tax & Financial Consultant",
    qualification: "Chartered Accountant & MBA Finance",
    photo: "/images/team/vartika-keshri.jpg",
    linkedin: "https://www.linkedin.com/",
    bio: "Focusing on 12A/80G re-registrations, Form 10B/10BB audits, and financial governance for foundations.",
  },
  {
    name: "CS Sarika More",
    role: "Chief Compliance Officer",
    qualification: "Company Secretary",
    photo: "/images/team/sarika-more.jpg",
    linkedin: "https://www.linkedin.com/",
    bio: "Leading Section-8 MCA filings, CSR-1 donor verifications, secretarial audits, and statutory corporate filings.",
  },
  {
    name: "Mr. Vijendra Kumar Roy",
    role: "President – Corporate Advisory",
    qualification: "Corporate Affairs",
    photo: "/images/team/vijendra-roy.jpg",
    linkedin: "https://www.linkedin.com/",
    bio: "Managing institutional bank relations, project financing documentation, and large-scale trust endowments.",
  },
  {
    name: "Ms. Sheetal Gupta",
    role: "Chief Operations Manager",
    qualification: "Operations & Client Liaison",
    photo: "/images/team/sheetal-gupta.jpg",
    linkedin: "https://www.linkedin.com/",
    bio: "Overseeing day-to-day statutory filings, client correspondence, documentation workflow, and trustee desk support.",
  },
  {
    name: "Mr. Deepak Phatak",
    role: "President – Client Relations",
    qualification: "Institutional Relations",
    photo: "/images/team/deepak-phatak.jpg",
    linkedin: "https://www.linkedin.com/",
    bio: "Coordinating strategic advisory engagements for charitable trusts, educational societies, and religious bodies.",
  },
];

const splitIntoSentences = (text) => {
  return (
    text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()) || [
      text,
    ]
  );
};

export const TeamPage = ({ onOpenConsultation, onNavigate }) => {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".team-page .sentence-reveal"
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
    <div className="subpage-wrapper team-page">
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.("home");
                }}
                className="crumb-link"
              >
                Home
              </a>

              <span className="crumb-separator">/</span>
              <span className="crumb-current">Our Team</span>
            </div>

            <h1 className="page-banner-title">
              Our <span className="title-accent-gold">Team.</span>
            </h1>

            <p className="page-banner-desc">
              Meet the professionals behind Sanap &amp; Associates. Our
              multidisciplinary team brings together legal, financial, tax,
              and governance expertise to support our clients with care and
              accountability.
            </p>
          </div>
        </div>
      </section>

      <section
        className="page-content-section section-padding bg-alabaster"
        data-theme="light"
      >
        <div className="container">
          <div className="text-center mb-48 reveal-up">
            <div className="section-badge-tag mb-12">
              <i className="ri-team-line me-1"></i>
              Multidisciplinary Team
            </div>

            <h2 className="section-heading-editorial mb-16">
              Our Professional Team
            </h2>

            <p className="section-subtext">
              Committed to providing comprehensive Legal, Financial, Tax &amp;
              Business Advisory solutions.
            </p>
          </div>

          <div className="row g-4 mb-50 team-grid">
            {teamMembers.map((member) => {
              const bioSentences = splitIntoSentences(member.bio);

              return (
                <div
                  key={member.name}
                  className="col-lg-4 col-md-6 team-card-column"
                >
                  <div className="team-member-card bg-white border-card rounded-md p-24 h-100 reveal-up d-flex flex-column">
                    <div className="d-flex align-items-center gap-16 mb-16">
                      <div className="member-photo-frame">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="member-real-photo"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";

                            const avatar =
                              e.currentTarget.nextElementSibling;

                            if (avatar) {
                              avatar.style.display = "flex";
                            }
                          }}
                        />

                        <div
                          className="member-avatar-orb"
                          style={{ display: "none" }}
                        >
                          <span>
                            {member.name
                              .split(" ")
                              .filter((part) => !part.endsWith("."))
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                        </div>
                      </div>

                      <div className="flex-grow-1">
                        <h3 className="member-name fs-17 fw-bold text-title m-0">
                          <span
                            className="sentence-reveal"
                            style={{ "--sentence-delay": "0ms" }}
                          >
                            {member.name}
                          </span>
                        </h3>

                        <div className="member-role text-gold fs-13 fw-semibold mt-2">
                          <span
                            className="sentence-reveal"
                            style={{ "--sentence-delay": "140ms" }}
                          >
                            {member.role}
                          </span>
                        </div>

                        <div className="member-qualification fs-12 text-muted mt-2">
                          <span
                            className="sentence-reveal"
                            style={{ "--sentence-delay": "280ms" }}
                          >
                            {member.qualification}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="member-bio fs-14 text-body mt-16 mb-20">
                      {bioSentences.map((sentence, index) => (
                        <span
                          key={`${member.name}-bio-${index}`}
                          className="sentence-reveal team-bio-sentence"
                          style={{
                            "--sentence-delay": `${420 + index * 180}ms`,
                          }}
                        >
                          {sentence}{" "}
                        </span>
                      ))}
                    </p>

                    <div className="mt-auto pt-14 border-top-subtle d-flex align-items-center justify-content-between">
                      <span className="fs-12 text-muted">
                        Sanap &amp; Associates
                      </span>

                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-linkedin-link"
                        aria-label={`Open LinkedIn for ${member.name}`}
                        title="Visit LinkedIn"
                      >
                        <i className="ri-linkedin-fill"></i>
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-24 bg-white border-card rounded-md text-center reveal-up">
            <div className="row g-3 justify-content-center">
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-center gap-8 text-title fs-14 fw-bold">
                  <i className="ri-shield-check-fill text-gold fs-18"></i>
                  <span>Direct Partner-Led Accountability</span>
                </div>
              </div>

              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-center gap-8 text-title fs-14 fw-bold">
                  <i className="ri-scales-3-line text-gold fs-18"></i>
                  <span>High Court &amp; Regulatory Liaison</span>
                </div>
              </div>

              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-center gap-8 text-title fs-14 fw-bold">
                  <i className="ri-lock-password-line text-gold fs-18"></i>
                  <span>Strict Professional Confidentiality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
