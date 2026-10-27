import React from 'react';

export const Team = () => {
  const teamMembers = [
    {
      name: "Mr. Nishant Sanap",
      role: "Managing Director",
      qualification: "Senior NPO Counsel & Founder",
      photo: "/images/team/nishant-sanap.jpg",
      bio: "Spearheading Bombay Public Trust Act advisory, statutory audits, and national non-profit governance over 15+ years."
    },
    {
      name: "Adv. Tanaji Londhe",
      role: "Chief Legal Officer",
      qualification: "High Court Advocate",
      photo: "/images/team/tanaji-londhe.jpg",
      bio: "Expert in charity commissioner disputes, scheme framing under Section 50A, and non-profit civil litigation."
    },
    {
      name: "Adv. Purva Shah",
      role: "Senior Advocate",
      qualification: "Legal Counsel",
      photo: "/images/team/purva-shah.jpg",
      bio: "Specializing in trust deed drafting, governance restructuring, trustee succession, and statutory statutory compliance."
    },
    {
      name: "MS Gauri Jadhav",
      role: "Research Head",
      qualification: "Jurisprudence & Research",
      photo: "/images/team/gauri-jadhav.jpg",
      bio: "Leading legal intelligence on evolving statutory mandates, judicial precedents, and regulatory exemptions."
    },
    {
      name: "CA Satish Dhotre",
      role: "Head – Indirect Tax",
      qualification: "Chartered Accountant",
      photo: "/images/team/satish-dhotre.jpg",
      bio: "Heading institutional GST assessments, trust audits, input tax reconciliations, and indirect tax compliance."
    },
    {
      name: "Vartika Keshri",
      role: "Tax & Financial Consultant",
      qualification: "Chartered Accountant & MBA Finance",
      photo: "/images/team/vartika-keshri.jpg",
      bio: "Focusing on 12A/80G re-registrations, Form 10B/10BB audits, and financial governance for foundations."
    },
    {
      name: "CS Sarika More",
      role: "Chief Compliance Officer",
      qualification: "Company Secretary",
      photo: "/images/team/sarika-more.jpg",
      bio: "Leading Section-8 MCA filings, CSR-1 donor verifications, secretarial audits, and statutory corporate filings."
    },
    {
      name: "Mr. Vijendra Kumar Roy",
      role: "President – Corporate Advisory",
      qualification: "Corporate Affairs",
      photo: "/images/team/vijendra-roy.jpg",
      bio: "Managing institutional bank relations, project financing documentation, and large-scale trust endowments."
    },
    {
      name: "Ms. Sheetal Gupta",
      role: "Chief Operations Manager",
      qualification: "Operations & Client Liaison",
      photo: "/images/team/sheetal-gupta.jpg",
      bio: "Overseeing day-to-day statutory filings, client correspondence, documentation workflow, and trustee desk support."
    },
    {
      name: "Mr. Deepak Phatak",
      role: "President – Client Relations",
      qualification: "Institutional Relations",
      photo: "/images/team/deepak-phatak.jpg",
      bio: "Coordinating strategic advisory engagements for charitable trusts, educational societies, and religious bodies."
    }
  ];

  return (
    <section id="team" className="team-section section-padding bg-alabaster" data-theme="light">
      <div className="container">
        
        {/* Section Heading */}
        <div className="text-center mb-48 reveal-up">
          <div className="section-badge-tag mb-12">
            <i className="ri-team-line me-1"></i> Legal, Tax &amp; Governance Experts
          </div>
          <h2 className="section-heading-editorial mb-16">
            Meet Our Leadership &amp; Advisory Team
          </h2>
          <p className="section-subtext">
            A seasoned multidisciplinary team of advocates, chartered accountants, company secretaries, and regulatory research specialists dedicated exclusively to India's non-profit sector.
          </p>
        </div>

        {/* Team Grid */}
        <div className="row g-4 justify-content-center">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div className="team-member-card reveal-up h-100">
                <div className="member-card-header d-flex align-items-center gap-14 mb-16">
                  <div className="member-photo-frame">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="member-real-photo"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="member-avatar-orb" style={{ display: 'none' }}>
                      <span>{member.name.split(' ').filter(n => !n.includes('.')).map(n => n[0]).slice(0, 2).join('')}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="member-name fs-18 fw-bold text-title m-0">{member.name}</h3>
                    <div className="member-role text-gold fs-13 fw-bold mt-2">{member.role}</div>
                    <div className="member-qualification fs-12 text-muted">{member.qualification}</div>
                  </div>
                </div>
                <p className="member-bio fs-14 text-body m-0">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Team Footer Note */}
        <div className="team-footer-note mt-40 p-20 bg-white rounded-md border-card text-center reveal-up">
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-20">
            <div className="d-flex align-items-center gap-8 text-title fs-14 fw-bold">
              <i className="ri-shield-check-fill text-gold fs-18"></i>
              <span>Direct Partner-Led Accountability on Every File</span>
            </div>
            <div className="d-flex align-items-center gap-8 text-title fs-14 fw-bold">
              <i className="ri-scales-3-line text-gold fs-18"></i>
              <span>High Court &amp; Charity Commissioner Representation</span>
            </div>
            <div className="d-flex align-items-center gap-8 text-title fs-14 fw-bold">
              <i className="ri-file-shield-line text-gold fs-18"></i>
              <span>Strict Confidentiality &amp; Ethical Practice</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Team;
