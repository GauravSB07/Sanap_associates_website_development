/**
 * Sanap & Associates - Central Data & Persistence Service
 * Manages administrative overrides, dynamic listings (careers, news, events),
 * client inquiries, job applications, and admin authentication.
 */

// Initial Default Careers from sanapassociates.com
const DEFAULT_CAREERS = [
  {
    id: "job-1",
    title: "Co-ordinator",
    department: "Administration & Client Liaison",
    type: "Full Time",
    location: "Mumbai",
    experience: "1-3 Years",
    openings: 2,
    desc: "Client liaison, documentation coordination, and portal communication. Requires fluency in English, Hindi & Marathi, team spirit, and computer proficiency.",
    requirements: [
      "Fluency in English, Marathi, and Hindi",
      "Proficiency in MS Office and government portal filings",
      "Strong coordination and client management skills",
      "Prior experience in law firm / CA office preferred"
    ],
    isActive: true,
    postedAt: "2026-10-01"
  },
  {
    id: "job-2",
    title: "CA Intern / Articled Assistant",
    department: "Direct Tax & Statutory Audit",
    type: "Internship",
    location: "Mumbai",
    experience: "CA Inter Passed",
    openings: 4,
    desc: "Direct tax filings, BPT Act schedules, statutory audit procedures, 10B/10BB documentation, and GST compliance under senior partners.",
    requirements: [
      "Cleared IPCC / CA Intermediate both or single group",
      "Knowledge of Income Tax, BPT Act, and GST basic provisions",
      "Familiarity with Tally Prime and e-filing utilities",
      "High attention to statutory detail and reporting"
    ],
    isActive: true,
    postedAt: "2026-10-05"
  },
  {
    id: "job-3",
    title: "Accountant",
    department: "Accounts & Financial Reporting",
    type: "Full Time",
    location: "Mumbai",
    experience: "2-5 Years",
    openings: 2,
    desc: "Tally ERP & Prime bookkeeping, bank reconciliations, GST return preparation, and annual non-profit statement compilation.",
    requirements: [
      "B.Com / M.Com with strong accounting fundamentals",
      "Hands-on mastery in Tally Prime, TDS, and GST returns",
      "Experience preparing final balance sheets for trusts / companies",
      "Timely statutory ledger reconciliation capability"
    ],
    isActive: true,
    postedAt: "2026-10-10"
  },
  {
    id: "job-4",
    title: "Legal Executive / Research Associate",
    department: "Legal & Regulatory Compliance",
    type: "Full Time",
    location: "Mumbai",
    experience: "1-4 Years",
    openings: 2,
    desc: "Bombay Public Trust Act compliance, change report drafting, charity commissioner case liaison, and statutory deed drafting.",
    requirements: [
      "LL.B degree from a recognized university",
      "Familiarity with Bombay Public Trust Act, 1950 & Societies Act",
      "Experience drafting trust deeds, change reports, and petitions",
      "Regular appearance / liaison before Charity Commissioner offices"
    ],
    isActive: true,
    postedAt: "2026-10-12"
  },
  {
    id: "job-5",
    title: "Receptionist & Front Desk Executive",
    department: "Office Management",
    type: "Full Time",
    location: "Mumbai",
    experience: "1-2 Years",
    openings: 1,
    desc: "Welcoming visitors, managing executive correspondence, scheduling trustee meetings, and incoming advisory calls.",
    requirements: [
      "Graduate with polite communication and front-desk presentation",
      "Proficient in handling telephone switchboard and calendar scheduling",
      "Organized record keeping of incoming / outgoing couriers and deeds",
      "Fluency in English, Hindi, and Marathi"
    ],
    isActive: true,
    postedAt: "2026-10-15"
  }
];

// Initial Default News & Circulars from sanapassociates.com
const DEFAULT_NEWS = [
  {
    id: "news-1",
    category: "Charity Commissioner",
    date: "Statutory Directive",
    title: "Mandatory Online Filing of Annual Accounts & Budget Estimates",
    summary: "Maharashtra Charity Organisation portal update: All registered Public Trusts must submit their audited balance sheets, income & expenditure statements, and annual budgets through the official e-filing system within the statutory window.",
    details: "Trustees must ensure that audited accounts align with prescribed Schedule IX and IX-C formats under the Bombay Public Trust Act, 1950. Failure to submit within the designated timeframe attracts inquiries under Section 41B.",
    tags: ["BPT Act", "Annual Audit", "Compliance"]
  },
  {
    id: "news-2",
    category: "Direct Tax & 12A/80G",
    date: "CBDT Notification",
    title: "Audit Reports in Form 10B & 10BB for Charitable & Religious Trusts",
    summary: "Clarification on applicability of Form 10B (for trusts with income exceeding Rs. 5 Crores, foreign contributions, or out-of-India application) versus Form 10BB. Ensuring flawless cross-verification with annual ITR-7 filings.",
    details: "Charitable institutions registered under Section 12A/12AB must upload the audit report one month prior to the due date of furnishing the return of income under Section 139(4A).",
    tags: ["Income Tax", "Form 10B", "12A / 80G"]
  },
  {
    id: "news-3",
    category: "FCRA Directives",
    date: "MHA Regulatory Update",
    title: "Foreign Contribution (Regulation) Act Renewal & Annual Returns (FC-4)",
    summary: "Guidelines on operational compliance for associations holding FCRA registration, maintenance of designated FCRA bank accounts with SBI NDMB, quarterly reporting, and strict adherence to administrative expense caps.",
    details: "Associations receiving foreign contributions must ensure that administrative expenses do not exceed 20% of the foreign contribution received during the fiscal year.",
    tags: ["FCRA", "MHA", "Foreign Funds"]
  },
  {
    id: "news-4",
    category: "CSR Governance",
    date: "MCA Advisory",
    title: "Form CSR-1 Mandatory Registration for Implementing Agencies",
    summary: "Corporate Social Responsibility amendments: Non-profits executing CSR projects funded by corporate entities must maintain active CSR-1 registration, audited fund track records, and impact evaluation metrics.",
    details: "Every entity intending to undertake CSR activities must register with the Central Government by filing Form CSR-1 electronically with the Registrar of Companies.",
    tags: ["CSR-1", "MCA", "Corporate Grants"]
  },
  {
    id: "news-5",
    category: "Trust Governance",
    date: "High Court Judgment",
    title: "Expedited Adjudication of Trustee Change Reports (Section 22)",
    summary: "Judicial directives mandating accelerated hearings and disposal of Change Reports involving trustee appointments, resignations, and amendment of trust constitutions before the Assistant Charity Commissioner.",
    details: "Strict evidentiary procedures apply to notices of meetings, quorum verification, and resolutions passed by governing boards.",
    tags: ["Change Report", "Trustee Succession", "Judiciary"]
  }
];

// Initial Default Events from sanapassociates.com
const DEFAULT_EVENTS = [
  {
    id: "event-1",
    title: "Symposium on Public Trust Governance & Statutory Audit",
    location: "Mumbai, Maharashtra",
    type: "Masterclass",
    date: "Trustee Series",
    desc: "Comprehensive workshop led by Mr. Nishant Sanap addressing Bombay Public Trust Act compliance, maintenance of accounts, budgeting, and statutory inspection procedures.",
    highlights: [
      "150+ Trustees and administrators in attendance",
      "Charity Commissioner procedural walkthrough",
      "Interactive Q&A on Section 50A scheme framing"
    ]
  },
  {
    id: "event-2",
    title: "Direct Tax & Form 10B/10BB Intensive for NGOs",
    location: "Pune, Maharashtra",
    type: "Tax Workshop",
    date: "Advisory Seminar",
    desc: "Deliberation on revised audit formats, 12A/80G re-registration compliance, corpus fund handling, and anonymous donations rules under Section 115BBC.",
    highlights: [
      "CA Satish Dhotre & Senior Legal Panel",
      "Real-world scrutiny case studies",
      "Form 10B compliance checklist distribution"
    ]
  },
  {
    id: "event-3",
    title: "Rotary Community Welfare & Medical Outreach Drive",
    location: "Maharashtra",
    type: "Social Impact",
    date: "Community Initiative",
    desc: "Community service initiative in association with Rotary clubs supporting health checkups, educational scholarships, and local welfare infrastructure.",
    highlights: [
      "Healthcare screening for 500+ beneficiaries",
      "Rotarian leadership partnership",
      "Educational grant facilitation"
    ]
  },
  {
    id: "event-4",
    title: "CSR-1 & Corporate NGO Partnership Round Table",
    location: "Mumbai, Maharashtra",
    type: "Corporate Colloquium",
    date: "Executive Forum",
    desc: "Bringing corporate CSR heads and non-profit leaders together to streamline CSR fund utilization, impact audits, and statutory disclosure mandates.",
    highlights: [
      "MCA compliance best practices",
      "Impact assessment framework",
      "Transparency & reporting benchmarks"
    ]
  }
];

// Default Firm Contact & Identity Details
const DEFAULT_FIRM_INFO = {
  name: "Sanap & Associates LLP",
  llpNo: "LLP No. AAG-6746",
  estYear: "December 2010",
  phonePrimary: "022-2828009",
  phoneMobile: "+91 95940 02606",
  emailPrimary: "support@sanapassociates.com",
  officeHours: "9:30 AM – 7:30 PM (Monday to Saturday)",
  address: "Offices at Borivali (East), Mumbai, Maharashtra 400066, India",
  emergencyContact: "+91 95940 02606",
  announcementBanner: "Advising Public Trusts, Societies & Corporate Entities Across India with Complete Statutory Precision."
};

// Initial Seed Inquiries (sample so admin sees real dashboard data immediately)
const DEFAULT_INQUIRIES = [
  {
    id: "inq-101",
    name: "Dr. Ramesh Kulkarni",
    trustName: "Shree Ganesh Educational Trust",
    email: "ramesh.k@example.com",
    phone: "+91 98201 12345",
    service: "Charity Commissioner Change Report & Scheme Framing",
    message: "Need urgent guidance on submitting Section 22 change report following trustee election.",
    type: "Consultation Booking",
    status: "New",
    submittedAt: "2026-10-25 14:30"
  },
  {
    id: "inq-102",
    name: "Sunil Deshmukh",
    trustName: "Arogya Medical Foundation",
    email: "sunil.deshmukh@example.com",
    phone: "+91 98690 98765",
    service: "Form 10B / 10BB Audit & 12A/80G Re-registration",
    message: "Seeking partner advisory on upcoming Form 10B audit report uploading and corpus donation validation.",
    type: "Callback Request",
    status: "Contacted",
    submittedAt: "2026-10-26 11:15"
  }
];

const DEFAULT_APPLICATIONS = [
  {
    id: "app-201",
    name: "Pooja Sharma",
    email: "pooja.sharma@example.com",
    phone: "+91 91672 55443",
    role: "Legal Executive / Research Associate",
    qualification: "B.A. LL.B (Mumbai University), 2 Years Litigation Experience",
    message: "Interested in practicing Bombay Public Trust Act and Charity Commissioner representations under Sanap & Associates.",
    status: "Shortlisted",
    submittedAt: "2026-10-26 16:45"
  }
];

// Storage Keys
const KEYS = {
  CAREERS: 'sanap_careers',
  NEWS: 'sanap_news',
  EVENTS: 'sanap_events',
  FIRM_INFO: 'sanap_firm_info',
  INQUIRIES: 'sanap_inquiries',
  APPLICATIONS: 'sanap_applications',
  AUTH: 'sanap_admin_session'
};

// Helper for localStorage with fallback
const getStored = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
};

const setStored = (key, val) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new CustomEvent('sanap_data_updated', { detail: { key } }));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
};

export const dataService = {
  // Authentication
  login(username, password) {
    const cleanUser = (username || '').trim();
    const cleanPass = (password || '').trim();

    if (cleanUser === 'admin' && cleanPass === 'Admin@123') {
      const session = {
        user: 'admin',
        role: 'Senior Managing Administrator',
        loggedInAt: Date.now()
      };
      setStored(KEYS.AUTH, session);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. Please verify your administrator username and password.' };
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(KEYS.AUTH);
      window.dispatchEvent(new CustomEvent('sanap_data_updated', { detail: { key: KEYS.AUTH } }));
    }
  },

  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    const session = getStored(KEYS.AUTH, null);
    return Boolean(session && session.user === 'admin');
  },

  getSession() {
    return getStored(KEYS.AUTH, null);
  },

  // Careers Management
  getCareers() {
    return getStored(KEYS.CAREERS, DEFAULT_CAREERS);
  },

  saveCareers(list) {
    setStored(KEYS.CAREERS, list);
  },

  addCareer(career) {
    const current = this.getCareers();
    const newItem = {
      ...career,
      id: `job-${Date.now()}`,
      isActive: career.isActive !== undefined ? career.isActive : true,
      postedAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newItem, ...current];
    this.saveCareers(updated);
    return newItem;
  },

  updateCareer(id, updatedFields) {
    const current = this.getCareers();
    const updated = current.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    this.saveCareers(updated);
  },

  deleteCareer(id) {
    const current = this.getCareers();
    const updated = current.filter(item => item.id !== id);
    this.saveCareers(updated);
  },

  toggleCareerStatus(id) {
    const current = this.getCareers();
    const updated = current.map(item => item.id === id ? { ...item, isActive: !item.isActive } : item);
    this.saveCareers(updated);
  },

  // News Management
  getNews() {
    return getStored(KEYS.NEWS, DEFAULT_NEWS);
  },

  saveNews(list) {
    setStored(KEYS.NEWS, list);
  },

  addNews(newsItem) {
    const current = this.getNews();
    const newItem = {
      ...newsItem,
      id: `news-${Date.now()}`
    };
    const updated = [newItem, ...current];
    this.saveNews(updated);
    return newItem;
  },

  updateNews(id, updatedFields) {
    const current = this.getNews();
    const updated = current.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    this.saveNews(updated);
  },

  deleteNews(id) {
    const current = this.getNews();
    const updated = current.filter(item => item.id !== id);
    this.saveNews(updated);
  },

  // Events Management
  getEvents() {
    return getStored(KEYS.EVENTS, DEFAULT_EVENTS);
  },

  saveEvents(list) {
    setStored(KEYS.EVENTS, list);
  },

  addEvent(eventItem) {
    const current = this.getEvents();
    const newItem = {
      ...eventItem,
      id: `event-${Date.now()}`
    };
    const updated = [newItem, ...current];
    this.saveEvents(updated);
    return newItem;
  },

  updateEvent(id, updatedFields) {
    const current = this.getEvents();
    const updated = current.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    this.saveEvents(updated);
  },

  deleteEvent(id) {
    const current = this.getEvents();
    const updated = current.filter(item => item.id !== id);
    this.saveEvents(updated);
  },

  // Firm Info Management
  getFirmInfo() {
    return getStored(KEYS.FIRM_INFO, DEFAULT_FIRM_INFO);
  },

  saveFirmInfo(info) {
    setStored(KEYS.FIRM_INFO, info);
  },

  // Inquiries Management
  getInquiries() {
    return getStored(KEYS.INQUIRIES, DEFAULT_INQUIRIES);
  },

  addInquiry(inquiry) {
    const current = this.getInquiries();
    const newItem = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'New',
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };
    const updated = [newItem, ...current];
    setStored(KEYS.INQUIRIES, updated);
    return newItem;
  },

  updateInquiryStatus(id, status) {
    const current = this.getInquiries();
    const updated = current.map(item => item.id === id ? { ...item, status } : item);
    setStored(KEYS.INQUIRIES, updated);
  },

  deleteInquiry(id) {
    const current = this.getInquiries();
    const updated = current.filter(item => item.id !== id);
    setStored(KEYS.INQUIRIES, updated);
  },

  // Applications Management
  getApplications() {
    return getStored(KEYS.APPLICATIONS, DEFAULT_APPLICATIONS);
  },

  addApplication(application) {
    const current = this.getApplications();
    const newItem = {
      ...application,
      id: `app-${Date.now()}`,
      status: 'New Application',
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };
    const updated = [newItem, ...current];
    setStored(KEYS.APPLICATIONS, updated);
    return newItem;
  },

  updateApplicationStatus(id, status) {
    const current = this.getApplications();
    const updated = current.map(item => item.id === id ? { ...item, status } : item);
    setStored(KEYS.APPLICATIONS, updated);
  },

  deleteApplication(id) {
    const current = this.getApplications();
    const updated = current.filter(item => item.id !== id);
    setStored(KEYS.APPLICATIONS, updated);
  },

  // Factory Reset
  resetAllToDefaults() {
    setStored(KEYS.CAREERS, DEFAULT_CAREERS);
    setStored(KEYS.NEWS, DEFAULT_NEWS);
    setStored(KEYS.EVENTS, DEFAULT_EVENTS);
    setStored(KEYS.FIRM_INFO, DEFAULT_FIRM_INFO);
    setStored(KEYS.INQUIRIES, DEFAULT_INQUIRIES);
    setStored(KEYS.APPLICATIONS, DEFAULT_APPLICATIONS);
    return true;
  }
};

export default dataService;
