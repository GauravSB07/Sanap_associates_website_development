export const siteData = {
  brand: {
    name: "Sanap & Associates LLP",
    shortName: "S&A LLP",
    tagline: "NPO Compliance. Simplified.",
    category: "Non-Profit Advisory & Legal Compliance Firm",
    llpNo: "LLP No. AAG-6746",
    logo: "/images/logo.jpg"
  },
  
  // Curated imagery and institutional assets
  images: {
    hero: {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      alt: "Sanap & Associates LLP - Premier Non-Profit Advisory & Governance Office"
    },
    about: {
      url: "/images/founder.png",
      alt: "Rtn. Nishant Sanap - Founder & CEO, Sanap & Associates LLP"
    },
    founder: {
      url: "/images/founder.png",
      alt: "Rtn. Nishant Sanap - CEO & Founder, Sanap & Associates LLP"
    }
  },

  contact: {
    phone: "+91 95940 02606",
    phoneDisplay: "+91 95940 02606",
    email: "advisory@sanapassociates.com",
    address: "Plot No. 72, Omkar Smruti, Office No. 101-102, Borivali East, Mumbai, Maharashtra 400066",
    hours: "Monday – Saturday: 9:30 AM – 7:30 PM IST",
    socials: {
      facebook: "https://www.facebook.com/Sanap-Associates-LLP-339510096471608/",
      linkedin: "https://www.linkedin.com/",
      twitter: "https://x.com/"
    }
  },

  hero: {
    headline: "NPO Compliance. Simplified.",
    supportingCopy: "End-to-end statutory, legal, audit, taxation and governance support for Public Trusts, NGOs, Section-8 Companies, Societies, Religious Institutions, Mandals and Foundations across India.",
    primaryCta: "Book a Consultation",
    secondaryCta: "Explore Our Services",
    trustIndicators: [
      {
        value: "15+",
        label: "Years of Domain Expertise"
      },
      {
        value: "2,000+",
        label: "Trusts & Foundations Served"
      }
    ]
  },

  about: {
    heading: "Your Trusted Partner in NPO Compliance",
    paragraphs: [
      "Sanap & Associates LLP is a specialised compliance and advisory firm dedicated to Non-Profit Organisations (NPOs) including Public Trusts, NGOs, Section-8 Companies, Societies, Religious Institutions, Mandals and Foundations.",
      "With 15+ years of domain expertise and experience serving 2,000+ Trusts & Foundations across India, we provide end-to-end statutory, legal, audit, taxation and governance support—from registration to renewal, from documentation to certification, from compliance to consultation.",
      "We operate as a single-window execution partner under the Bombay Public Trust Act, Income-tax Act, Companies Act, CSR Rules, FCRA and all major NGO governance laws."
    ],
    highlights: [
      "Bombay Public Trust Act & State Charity Laws",
      "Income-tax Exemptions (12A, 80G, Form 10B/10BB)",
      "Section-8 MCA Filings & CSR-1 Compliance",
      "Foreign Contribution Regulation Act (FCRA) Governance"
    ]
  },

  services: {
    heading: "Comprehensive NPO Compliance & Advisory",
    subtitle: "Complete statutory lifecycle support grouped across four core non-profit practice disciplines.",
    categories: [
      {
        id: "registration-certification",
        title: "Registration & Certification",
        desc: "Foundational trust incorporation, tax exemption certifications, and central ministry portal registrations.",
        icon: "ri-file-shield-line",
        items: [
          "Trust Registration (BPT Act / Trust Deed Drafting / Online Filing)",
          "12A & 80G Registration / Conversion (Provisional → Final)",
          "CSR-1 Registration & CSR-2 Filing (Sec-8 Companies)",
          "Darpan (NGO Portal / NITI Aayog) Registration & Updation"
        ]
      },
      {
        id: "audit-taxation",
        title: "Audit & Taxation",
        desc: "Specialised direct tax filings, Charity Commissioner statutory audits, and mandatory donation disclosures.",
        icon: "ri-scales-3-line",
        items: [
          "Change Report Filing: Trustee / Address / Property / Object",
          "Charity Commissioner Audit & Schedules (IX, IX-A, IX-C, IX-D, VIII)",
          "ITR-7 Filing + 10B / 10BB Audit",
          "10BD & 10BE Donation Compliance"
        ]
      },
      {
        id: "legal-governance",
        title: "Legal & Governance",
        desc: "Foreign funding regulatory approvals, institutional compliance calendars, and constitutional documentation.",
        icon: "ri-government-line",
        items: [
          "FCRA Advisory, Banking & Documentation",
          "Annual Compliance Calendar & Governance Advisory",
          "Drafting: Trust Deeds, Policies, Minutes, Resolutions, Bye-laws"
        ]
      },
      {
        id: "accounting-financial",
        title: "Accounting & Financial Support",
        desc: "Dedicated fund accounting formats, corpus accumulation controls, and donor utilisation tracking.",
        icon: "ri-funds-box-line",
        items: [
          "NGO Accounting Setup, Ledger Formats, Corpus/Utilisation Tracking"
        ]
      }
    ]
  },

  whyChooseUs: {
    heading: "Why NPOs Choose Sanap & Associates LLP",
    subtitle: "Practical, legally defensible, and proactive advisory tailored strictly to non-profit governance.",
    points: [
      {
        title: "15+ Years of Exclusive Trust/NGO Expertise",
        desc: "Uninterrupted focus on social sector jurisprudence and charity commissioner statutory systems."
      },
      {
        title: "2,000+ Registered & Compliant Non-Profits Served",
        desc: "Deep exposure across diverse charitable bodies, public trusts, educational societies, and section-8 entities."
      },
      {
        title: "Pan-India Execution with Online + Physical Support",
        desc: "Seamless filing capability across central portals paired with physical presence for regulatory liaison."
      },
      {
        title: "Support for CSR Funding, Bank Documentation & Audit Queries",
        desc: "Ensuring banking transparency, FCRA compliance, and flawless donor utilization certificates."
      },
      {
        title: "Strong Network with Auditors, Lawyers, CSR Heads & Govt Portals",
        desc: "Multi-disciplinary execution capability ensuring your trust avoids delays and technical rejections."
      },
      {
        title: "Accurate, Timely, Legally Defensible Documentation",
        desc: "Meticulous drafting of resolutions, deeds, and change reports built to withstand scrutiny."
      },
      {
        title: "Focus on Practical, Simple & Compliance-Ready Formats",
        desc: "Demystifying complex NGO regulations so trustees can operate with confidence and clarity."
      }
    ]
  },

  clients: {
    heading: "Trusted Across the NPO & CSR Sector",
    supportingNote: "Representative engagement portfolio. Complete institutional register available on verified request.",
    categories: ["All Sectors", "Healthcare & Medicine", "Corporate CSR", "Public Foundations", "Community & Ecology"],
    list: [
      { name: "Indian Medical Association – Maharashtra Division", type: "State Medical Association", category: "Healthcare & Medicine", tag: "Statutory Governance" },
      { name: "Glenmark Foundation", type: "Corporate CSR Foundation", category: "Corporate CSR", tag: "CSR-1 & MCA Filings" },
      { name: "Vilasrao Deshmukh Centre Trust", type: "Public Charitable Trust", category: "Public Foundations", tag: "Charity Commissioner" },
      { name: "Sanjay Gandhi National Park", type: "Protected Wildlife & Public Trust", category: "Community & Ecology", tag: "Public Trust Advisory" },
      { name: "Desh Foundation (Actor Ritesh Deshmukh)", type: "Philanthropic Foundation", category: "Public Foundations", tag: "12A & 80G Advisory" },
      { name: "Saturday Club Trustees & Members", type: "Entrepreneurial & Community Trust", category: "Community & Ecology", tag: "Governance Framework" },
      { name: "Ajay Ashok Piramal Foundation", type: "Social Welfare & Healthcare Foundation", category: "Corporate CSR", tag: "Audit & Compliance" },
      { name: "10+ Rotary Clubs & Charitable Trusts", type: "Legal + Accounting Compliance", category: "Community & Ecology", tag: "Full-Cycle Retainer" }
    ]
  },

  vision: {
    heading: "Our Vision for the Non-Profit Sector",
    quote: "“To make compliance simple, transparent and empowering — so that NGOs can focus on impact, not paperwork.”"
  },

  founder: {
    heading: "A Message from Our Founder",
    quote: "“NPOs work for society. We work for them.”",
    author: "Rtn. Nishant Sanap",
    role: "CEO & Founder, Sanap & Associates LLP",
    image: "/images/founder.png"
  },

  cta: {
    heading: "Focus on Your Mission. Leave Compliance to Us.",
    supportingText: "Get practical, end-to-end compliance and advisory support for your non-profit organisation.",
    buttonText: "Book a Consultation"
  }
};
