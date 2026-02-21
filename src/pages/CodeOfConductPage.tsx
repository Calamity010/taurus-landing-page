import { motion } from 'framer-motion';
import { Shield, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    number: '1',
    title: 'Professional Ethics',
    intro: 'Employees must:',
    items: [
      'Maintain honesty in operations.',
      'Avoid falsifying data.',
      'Respect diversity and inclusion.',
    ],
  },
  {
    number: '2',
    title: 'Workplace Behavior',
    intro: null,
    items: [
      'No discrimination.',
      'No abusive language.',
      'Maintain respectful communication.',
      'Punctuality and attendance are expected.',
      'Dress code must align with company standards.',
    ],
  },
  {
    number: '3',
    title: 'Anti-Bribery',
    intro: 'Employees shall not accept gifts or incentives from colleges or recruiters beyond permissible limits.',
    items: [],
  },
  {
    number: '4',
    title: 'Confidentiality',
    intro: null,
    items: [
      'Candidate data is proprietary.',
      'Sharing AI algorithm logic is strictly prohibited.',
    ],
  },
  {
    number: '5',
    title: 'Social Media Policy',
    intro: null,
    items: [
      'Employees must not share confidential company information on social media platforms.',
      'Any public representation of Taurus AI requires prior approval from the Communications team.',
      'Personal opinions shared online should not be attributed to the company.',
    ],
  },
  {
    number: '6',
    title: 'Conflict of Interest',
    intro: null,
    items: [
      'Employees must disclose any external business interests or employment.',
      'No employee shall engage in activities that compete with Taurus AI\'s business.',
      'Family relationships within the organization must be disclosed to HR.',
    ],
  },
  {
    number: '7',
    title: 'Compliance',
    intro: 'Violation of the Code of Conduct may result in disciplinary action, including warnings, suspension, or termination depending on the severity of the breach.',
    items: ['Violation may result in immediate termination.'],
  },
];

const CodeOfConductPage = () => {
  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      {/* Hero */}
      <section className="bg-background border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-bold mb-6 border border-blue-500/20">
            <Globe size={14} />
            Knowledge Bank
          </div>
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/resources/policies" className="hover:text-white transition-colors">Policies</Link>
            <ChevronRight size={14} />
            <span className="text-white">Code of Conduct</span>
          </nav>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">Code of Conduct</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Professional standards and ethical guidelines that every Taurus AI employee is expected to uphold.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((sec, idx) => (
              <motion.div
                key={sec.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="bg-card rounded-2xl border border-white/10 p-8 hover:border-blue-500/30 transition-all"
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                    {sec.number}
                  </span>
                  {sec.title}
                </h2>
                {sec.intro && (
                  <p className="text-slate-300 mb-4 leading-relaxed">{sec.intro}</p>
                )}
                {sec.items.length > 0 && (
                  <ul className="space-y-2">
                    {sec.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Have Questions About Our Policies?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Reach out to HR for clarifications or to report any violations confidentially.
          </p>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Contact HR <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CodeOfConductPage;
