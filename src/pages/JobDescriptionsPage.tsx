import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Briefcase, Users, MapPin, Clock, ChevronRight, Building2, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JD {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  badge: string;
  badgeColor: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  whatWeOffer: string[];
}

const jobDescriptions: JD[] = [
  {
    id: 'senior-react-developer',
    title: 'Senior React Developer',
    department: 'Engineering',
    location: 'Bengaluru, India',
    type: 'Full-Time',
    badge: 'Engineering',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    summary:
      "We are looking for a Senior React Developer with 5+ years of experience to build and maintain high-performance web applications at Taurus AI.",
    responsibilities: [
      'Design, develop, and maintain scalable React.js applications.',
      'Collaborate with product managers, designers, and backend engineers to deliver features.',
      'Write clean, maintainable, and well-documented code.',
      'Conduct code reviews and mentor junior developers.',
      'Optimize applications for maximum speed and scalability.',
      'Integrate RESTful APIs and third-party services.',
      'Participate in agile ceremonies including sprint planning and retrospectives.',
    ],
    requirements: [
      '5+ years of experience in frontend development with React.js.',
      'Strong proficiency in JavaScript (ES6+), HTML5, and CSS3.',
      'Experience with state management tools (Redux, Context API).',
      'Familiarity with TypeScript, Git, and CI/CD pipelines.',
      'Excellent problem-solving and communication skills.',
    ],
    whatWeOffer: [
      'Competitive salary and performance bonuses.',
      'Flexible remote/hybrid work arrangements.',
      'Opportunity to work on cutting-edge AI-powered products.',
    ],
  },
  {
    id: 'customer-support-lead',
    title: 'Customer Support Lead',
    department: 'Support',
    location: 'Bengaluru, India',
    type: 'Full-Time',
    badge: 'Support',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    summary:
      "We are looking for a Customer Support Lead to manage support tickets and lead the support team, ensuring exceptional customer experience for Taurus AI's clients and users.",
    responsibilities: [
      'Oversee day-to-day support operations and manage the support ticket queue.',
      'Lead, mentor, and train a team of customer support specialists.',
      'Resolve escalated customer issues promptly and professionally.',
      'Develop and maintain support documentation, FAQs, and knowledge base articles.',
      'Monitor support metrics (CSAT, response time, resolution rate) and drive improvements.',
      'Collaborate with product and engineering teams to relay customer feedback and bugs.',
      'Implement support tools and workflows to improve team efficiency.',
      'Prepare regular reports on support performance for management.',
    ],
    requirements: [
      '3+ years of experience in customer support, with at least 1 year in a leadership role.',
      'Strong problem-solving and conflict-resolution skills.',
      'Experience with helpdesk tools (Zendesk, Freshdesk, or similar).',
      'Excellent written and verbal communication skills.',
      'Ability to work in a fast-paced environment and manage multiple priorities.',
    ],
    whatWeOffer: [
      'Leadership role with a direct impact on customer satisfaction.',
      'Collaborative and supportive team culture.',
      'Competitive salary and professional development opportunities.',
    ],
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    department: 'Marketing',
    location: 'Bengaluru, India',
    type: 'Full-Time',
    badge: 'Marketing',
    badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    summary:
      'We are looking for a creative and data-driven Digital Marketer to manage SEO, SEM, and social media strategies that drive brand awareness and lead generation for Taurus AI.',
    responsibilities: [
      'Plan and execute digital marketing campaigns across SEO, SEM, social media, and email.',
      'Manage and optimize paid advertising campaigns (Google Ads, LinkedIn, Meta).',
      'Conduct keyword research and implement on-page and off-page SEO strategies.',
      'Create and manage content calendars for social media platforms.',
      'Analyze campaign performance using Google Analytics, Search Console, and other tools.',
      'Collaborate with the design and content teams to produce engaging marketing assets.',
      'Monitor industry trends and competitor activity to identify growth opportunities.',
      'Generate regular performance reports and present insights to stakeholders.',
    ],
    requirements: [
      '3+ years of experience in digital marketing.',
      'Proficiency in SEO, SEM, Google Ads, and social media advertising.',
      'Strong analytical skills with experience in Google Analytics and data-driven decision-making.',
      'Familiarity with marketing automation tools (HubSpot, Mailchimp, or similar).',
      'Excellent written and verbal communication skills.',
    ],
    whatWeOffer: [
      'Creative freedom to experiment and innovate.',
      'Exposure to AI-driven marketing tools and strategies.',
      'Collaborative and growth-oriented work environment.',
    ],
  },
  {
    id: 'hr-manager',
    title: 'HR Manager',
    department: 'Human Resources',
    location: 'Bengaluru, India',
    type: 'Full-Time',
    badge: 'HR',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    summary:
      'We are looking for a generalist HR Manager to oversee all aspects of human resources practices and processes at Taurus AI, supporting team management and organizational growth.',
    responsibilities: [
      'Manage end-to-end recruitment, onboarding, and offboarding processes.',
      'Develop and implement HR policies and procedures in compliance with labor laws.',
      'Handle employee relations, grievances, and disciplinary actions.',
      'Oversee performance management and appraisal cycles.',
      'Administer compensation, benefits, and payroll coordination.',
      'Drive employee engagement, retention, and culture initiatives.',
      'Maintain HR records and ensure data confidentiality.',
      'Partner with leadership on workforce planning and organizational development.',
    ],
    requirements: [
      '5+ years of experience in HR management or a generalist HR role.',
      'Strong knowledge of labor laws and HR best practices.',
      'Experience with HRMS tools and applicant tracking systems.',
      'Excellent interpersonal, communication, and conflict-resolution skills.',
      'MBA in HR or equivalent qualification preferred.',
    ],
    whatWeOffer: [
      'Leadership role with direct impact on company culture.',
      'Competitive compensation and benefits package.',
      'Opportunity to shape HR strategy in a fast-growing AI company.',
    ],
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    department: 'Product',
    location: 'Bengaluru, India',
    type: 'Full-Time',
    badge: 'Product',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    summary:
      "We are seeking an experienced Product Manager to lead strategy and roadmap execution for Taurus AI's core products, working closely with engineering, design, and business teams.",
    responsibilities: [
      'Define and own the product vision, strategy, and roadmap aligned with business goals.',
      'Gather and prioritize product requirements from stakeholders, customers, and market research.',
      'Write detailed product requirement documents (PRDs) and user stories.',
      'Collaborate with engineering and design teams to deliver features on time and within scope.',
      'Track product KPIs and use data to drive continuous improvement.',
      'Conduct competitive analysis and stay updated on industry trends.',
      'Manage the product backlog and facilitate sprint planning sessions.',
      'Communicate product updates and roadmap progress to leadership and stakeholders.',
    ],
    requirements: [
      '4+ years of experience in product management, preferably in a tech or AI company.',
      'Strong analytical and problem-solving skills.',
      'Experience with agile methodologies and tools (Jira, Confluence, or similar).',
      'Excellent communication and stakeholder management skills.',
      'Ability to translate complex technical concepts into clear business requirements.',
    ],
    whatWeOffer: [
      'High-impact role shaping the future of AI-powered recruitment.',
      'Cross-functional leadership opportunities.',
      'Competitive compensation with equity options.',
    ],
  },
  {
    id: 'sales-development-representative',
    title: 'Sales Development Representative',
    department: 'Sales',
    location: 'Bengaluru, India',
    type: 'Full-Time',
    badge: 'Sales',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    summary:
      'We are seeking a motivated Sales Development Rep to drive outbound sales and lead generation efforts, helping Taurus AI expand its client base.',
    responsibilities: [
      'Identify and qualify new business opportunities through outbound prospecting.',
      'Conduct cold calls, emails, and LinkedIn outreach to generate leads.',
      'Schedule discovery calls and product demos for the Account Executive team.',
      'Maintain accurate records of all sales activities in the CRM.',
      'Meet and exceed monthly and quarterly lead generation targets.',
      'Collaborate with the marketing team on campaigns and messaging.',
      'Provide feedback on market trends and customer pain points.',
    ],
    requirements: [
      '1-3 years of experience in sales, business development, or a related field.',
      'Strong verbal and written communication skills.',
      'Experience with CRM tools (Salesforce, HubSpot, or similar).',
      'Self-motivated with a results-driven mindset.',
      'Ability to handle rejection and maintain a positive attitude.',
    ],
    whatWeOffer: [
      'Attractive base salary with uncapped commission structure.',
      'Comprehensive sales training and career growth opportunities.',
      'Dynamic and collaborative team environment.',
    ],
  },
];

const departmentFilters = ['All', 'Engineering', 'Support', 'Marketing', 'Human Resources', 'Product', 'Sales'];

/* ─── Modal ─────────────────────────────────────────────── */
function JDModal({ jd, onClose }: { jd: JD; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className="relative bg-[#0f1117] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header inside modal */}
        <div className="sticky top-0 z-10 bg-[#0f1117] border-b border-white/10 px-6 pt-5 pb-4 flex items-start justify-between gap-4">
          <div>
            <span className={`inline-flex px-2.5 py-0.5 text-xs font-bold rounded-full border mb-2 ${jd.badgeColor}`}>
              {jd.department}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{jd.title}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mt-1.5">
              <span className="flex items-center gap-1"><Building2 size={12} /> {jd.department}</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> {jd.location}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {jd.type}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Job Summary */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">Job Summary</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{jd.summary}</p>
          </div>

          {/* Key Responsibilities */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">Key Responsibilities</h3>
            <ul className="space-y-1.5">
              {jd.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">Requirements</h3>
            <ul className="space-y-1.5">
              {jd.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* What We Offer */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">What We Offer</h3>
            <ul className="space-y-1.5">
              {jd.whatWeOffer.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Apply CTA */}
          <div className="flex gap-3 pt-2 pb-1">
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold"
              onClick={() => { window.location.href = '/contact-us'; }}
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-slate-300 rounded-full hover:text-white hover:border-white/40"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function JobDescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedJD, setSelectedJD] = useState<JD | null>(null);

  const filtered = jobDescriptions.filter((jd) => {
    const matchesSearch =
      jd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jd.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jd.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || jd.department === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background font-sans pt-20">

      {/* Hero */}
      <section className="bg-background border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-bold mb-5 border border-blue-500/20">
            <Briefcase size={14} />
            Careers at Taurus AI
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Job Descriptions
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Explore open roles at Taurus AI. We're building the future of AI-powered hiring — join us.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3.5 border border-white/10 rounded-xl bg-secondary text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Search roles, departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Department Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {departmentFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                    : 'bg-secondary border-white/10 text-slate-400 hover:text-white hover:border-blue-500/40'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* JD Cards */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg">No results found for "{searchTerm}"</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((jd, idx) => (
                <motion.div
                  key={jd.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="bg-card rounded-2xl border border-white/10 p-5 hover:border-blue-500/40 hover:shadow-xl transition-all group cursor-pointer flex flex-col"
                  onClick={() => setSelectedJD(jd)}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${jd.badgeColor}`}>
                      {jd.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{jd.type}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {jd.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Building2 size={11} /> {jd.department}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} /> {jd.location}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {jd.type}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {jd.summary}
                  </p>

                  {/* CTA button — always visible */}
                  <div className="flex items-center gap-1 text-blue-400 text-sm font-semibold mt-auto pt-2 border-t border-white/5 group-hover:border-blue-500/20 transition-colors">
                    View Details <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-10 border-y border-white/10 bg-secondary/40">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <Users size={20} />, label: 'Open Positions', value: '6+' },
            { icon: <Building2 size={20} />, label: 'Departments', value: '6' },
            { icon: <Star size={20} />, label: 'Glassdoor Rating', value: '4.8★' },
            { icon: <Zap size={20} />, label: 'AI-First Company', value: '100%' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5">
              <div className="text-blue-400">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-14 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">Don't see a role that fits?</h2>
          <p className="text-slate-300 mb-7 max-w-2xl mx-auto">
            We're always looking for exceptional talent. Send us your profile and we'll reach out when a suitable role opens.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full"
            onClick={() => { window.location.href = '/contact-us'; }}
          >
            Get in Touch
          </Button>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedJD && (
          <JDModal jd={selectedJD} onClose={() => setSelectedJD(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
