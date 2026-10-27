import React from 'react';

export const TeamPage = ({ onOpenConsultation, onNavigate }) => {
  const teamMembers = [
    {
      name: "Mr. Nishant Sanap",
      role: "Managing Director",
      photo: "/images/team/nishant-sanap.jpg",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Adv. Tanaji londhe",
      role: "Chief Legal Officer",
      photo: "/images/team/tanaji-londhe.jpg",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Adv. Purva shah",
      role: "Senior Advocate",
      photo: "/images/team/purva-shah.jpg",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "MS Gauri Jadhav",
      role: "Research head",
      photo: "/images/team/gauri-jadhav.jpg",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Mr Vijendra Kumar Roy",
      role: "President- Corporate Loan",
      photo: "/images/team/vijendra-roy.jpg",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "CA Satish Dhotre",
      role: "Head – Indirect Tax",
      photo: "/images/team/satish-dhotre.jpg",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Vartika Keshri",
      role: "Chartered Accountant & MBA Finance",
      photo: "/images/team/vartika-keshri.jpg",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "CS Sarika More",
      role: "Chief Compliance Officer",
      photo: "/images/team/sarika-more.jpg",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Ms.Sheetal Gupta",
      role: "Chief Operation manager",
      photo: "/images/team/sheetal-gupta.jpg",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Mr Deepak Phatak",
      role: "President -Retail Loan",
      photo: "/images/team/deepak-phatak.jpg",
      linkedin: "https://www.linkedin.com/"
    }
  ];

  return (
    <div className="subpage-wrapper">
      {/* Editorial Page Header Banner */}
      <section className="page-header-banner" data-theme="dark">
        <div className="container">
          <div className="d-flex flex-column align-items-start">
            <div className="page-breadcrumbs mb-12">
              <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate?.('home'); }} className="crumb-link">Home</a>
              <span className="crumb-separator">/</span>
              <span className="crumb-current">Our Team</span>
            </div>
            <h1 className="page-banner-title">Our Team</h1>
            <p className="page-banner-desc">
              We have a team of professionals like Chartered Accountants, Company Secretaries, Advocates, Architects &amp; MBA.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="page-content-section section-padding bg-alabaster" data-theme="light">
        <div className="container">
          
          <div className="text-center mb-48 reveal-up">
            <div className="section-badge-tag mb-12">
              <i className="ri-team-line me-1"></i> Multidisciplinary Team
            </div>
            <h2 className="section-heading-editorial mb-16">
              Our Professional Team
            </h2>
            <p className="section-subtext">
              Committed to providing comprehensive Legal, Financial, Tax &amp; Business Advisory solutions.
            </p>
          </div>

          {/* Team Grid */}
          <div className="row g-4 mb-50">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="team-member-card bg-white border-card rounded-md p-24 h-100 reveal-up d-flex flex-column">
                  <div className="d-flex align-items-center gap-16 mb-16">
                    <div className="member-photo-frame">
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        className="member-real-photo"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="member-avatar-orb" style={{ display: 'none' }}>
                        <span>{member.name.split(' ').filter(n => !n.includes('.')).map(n => n[0]).slice(0, 2).join('')}</span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="member-name fs-17 fw-bold text-title m-0">{member.name}</h3>
                      <div className="member-role text-gold fs-13 fw-semibold mt-2">{member.role}</div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-14 border-top-subtle d-flex align-items-center justify-content-between">
                    <span className="fs-12 text-muted">Sanap &amp; Associates</span>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="team-social-link text-muted"
                      aria-label={`${member.name} LinkedIn Profile`}
                    >
                      <i className="ri-linkedin-box-line fs-18"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Standards Strip */}
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
