import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, FileText, ChevronRight, Download, Book, Calendar, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Mock Data for different resource types
const resourceData: Record<string, any> = {
  'hr-policies': {
    title: 'HR Policies',
    description: 'Ready-to-use compliance and culture frameworks for your organization.',
    icon: FileText,
    items: [
      { ti: 'Remote Work Policy', desc: 'Guidelines for work-from-home arrangements.', cat: 'Workplace' },
      { ti: 'Leave Policy', desc: 'Comprehensive rules for paid, sick, and casual leaves.', cat: 'Compliance' },
      { ti: 'Sexual Harassment (POSH) Policy', desc: 'Mandatory guidelines for workplace safety.', cat: 'Legal' },
      { ti: 'Code of Conduct', desc: 'Ethical standards and behavior expectations.', cat: 'Culture' },
      { ti: 'Travel & Expense Policy', desc: 'Rules for reimbursement of business expenses.', cat: 'Finance' },
      { ti: 'Social Media Policy', desc: 'Guidelines for employee online presence.', cat: 'Legal' },
    ]
  },
  'hr-letters': {
    title: 'HR Letters',
    description: 'Professional templates for every occasion in the employee lifecycle.',
    icon: FileText,
    items: [
      { ti: 'Offer Letter', desc: 'Standard employment offer template.', cat: 'Hiring' },
      { ti: 'Appointment Letter', desc: 'Formal confirmation of employment.', cat: 'Hiring' },
      { ti: 'Relieving Letter', desc: 'Formal document for employee exit.', cat: 'Exit' },
      { ti: 'Experience Certificate', desc: 'Proof of employment duration and role.', cat: 'Exit' },
      { ti: 'Internship Agreement', desc: 'Contract for temporary interns.', cat: 'Hiring' },
      { ti: 'Promotion Letter', desc: 'Official communication of role elevation.', cat: 'Growth' },
    ]
  },
  'hr-glossary': {
    title: 'HR Glossary',
    description: 'Quickly decode essential industry terms and acronyms.',
    icon: Book,
    items: [
      { ti: 'ATS (Applicant Tracking System)', desc: 'Software to manage the recruiting process.', cat: 'Tech' },
      { ti: 'Boolean Search', desc: 'Logic-based search operators for sourcing.', cat: 'Sourcing' },
      { ti: 'Employer Branding', desc: 'Reputation of a company as a place to work.', cat: 'Marketing' },
      { ti: 'Onboarding', desc: 'Process of integrating new hires.', cat: 'Process' },
      { ti: 'Time-to-Hire', desc: 'Metric measuring speed of recruitment.', cat: 'Metrics' },
      { ti: 'Diversity & Inclusion', desc: 'Policies ensuring varied representation.', cat: 'Culture' },
    ]
  },
  'job-descriptions': {
    title: 'Job Descriptions',
    description: 'Attract talent with high-impact JD templates.',
    icon: FileText,
    items: [
      { ti: 'Senior React Developer', desc: 'Frontend role with 5+ years experience.', cat: 'Engineering' },
      { ti: 'Sales Development Rep', desc: 'Outbound sales and lead generation.', cat: 'Sales' },
      { ti: 'HR Manager', desc: 'Generalist role for team management.', cat: 'HR' },
      { ti: 'Digital Marketer', desc: 'SEO, SEM, and social media management.', cat: 'Marketing' },
      { ti: 'Product Manager', desc: 'Strategy and roadmap execution.', cat: 'Product' },
      { ti: 'Customer Support Lead', desc: 'Managing support tickets and team.', cat: 'Support' },
    ]
  },
  'minimum-wages': {
    title: 'Minimum Wages',
    description: 'Stay updated on regional pay laws and compliance.',
    icon: MapPin,
    items: [
      { ti: 'California, USA', desc: '$15.50 / hour', cat: 'USA' },
      { ti: 'New York, USA', desc: '$14.20 / hour', cat: 'USA' },
      { ti: 'Maharashtra, India', desc: 'Zone 1: ₹12,000 / month', cat: 'India' },
      { ti: 'Karnataka, India', desc: 'Zone 1: ₹14,000 / month', cat: 'India' },
      { ti: 'London, UK', desc: '£10.42 / hour', cat: 'UK' },
      { ti: 'Berlin, Germany', desc: '€12.00 / hour', cat: 'Germany' },
    ]
  },
  'holiday-lists': {
    title: 'Holiday Lists',
    description: 'Track regional and national public holidays for 2025.',
    icon: Calendar,
    items: [
      { ti: 'USA Public Holidays 2025', desc: 'Federal holidays including July 4th, Thanksgiving.', cat: 'USA' },
      { ti: 'India Public Holidays 2025', desc: 'Gazetted holidays including Diwali, Independence Day.', cat: 'India' },
      { ti: 'UK Bank Holidays 2025', desc: 'Common law holidays.', cat: 'UK' },
      { ti: 'Australia Public Holidays 2025', desc: 'National and state holidays.', cat: 'Australia' },
      { ti: 'Canada Statutory Holidays', desc: 'National holidays.', cat: 'Canada' },
      { ti: 'Singapore Public Holidays', desc: 'MOM gazetted holidays.', cat: 'Singapore' },
    ]
  }
};

const ResourcesListPage = () => {
  const { resourceId } = useParams();
  const data = resourceData[resourceId || 'hr-policies'] || resourceData['hr-policies'];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = data.items.filter((item: any) => 
    item.ti.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      
      {/* Hero Section */}
      <section className="bg-background border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-bold mb-6 border border-blue-500/20">
                <Globe size={14} />
                Knowledge Bank
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                {data.title}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                {data.description}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-4 border border-white/10 rounded-xl bg-secondary text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                    placeholder={`Search in ${data.title}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item: any, idx: number) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-card p-6 rounded-2xl border border-white/10 hover:shadow-lg hover:border-blue-500/30 transition-all group cursor-pointer"
                      >
                          <div className="flex items-start justify-between mb-4">
                              <span className="px-2 py-1 bg-secondary text-slate-300 text-xs font-bold rounded uppercase tracking-wider">
                                  {item.cat}
                              </span>
                              <Download className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                              {item.ti}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-6">
                              {item.desc}
                          </p>
                          <div className="flex items-center text-blue-400 text-sm font-bold mt-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                              View Details <ChevronRight size={16} className="ml-1" />
                          </div>
                      </motion.div>
                  ))}
              </div>

              {filteredItems.length === 0 && (
                  <div className="text-center py-20 text-slate-400">
                      <p className="text-lg">No results found matching "{searchTerm}"</p>
                  </div>
              )}
              
          </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6">Need more specialized HR resources?</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                  Sign up for our newsletter to get the latest templates, policies, and hiring guides delivered to your inbox.
              </p>
              <div className="flex justify-center gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full">Subscribe Now</Button>
              </div>
          </div>
      </section>

    </div>
  );
};

export default ResourcesListPage;
