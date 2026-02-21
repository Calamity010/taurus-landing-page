import { motion } from 'framer-motion';
import { Globe, Laptop, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    number: '1',
    title: 'Purpose',
    intro: null,
    items: [
      'Ensure productivity across all work arrangements.',
      'Foster effective collaboration among teams, regardless of location.',
      'Maintain robust data security and confidentiality standards.',
      'Promote a healthy work-life balance for all employees.',
    ],
  },
  {
    number: '2',
    title: 'Scope',
    intro: 'This policy applies to all employees of Taurus AI, covering all roles and departments, whether working remotely, in a hybrid model, or exclusively on-site.',
    items: [],
  },
  {
    number: '3',
    title: 'Work Models',
    intro: null,
    items: [
      'Remote Work: Employees work entirely from a location other than a designated Taurus AI office.',
      'Hybrid Work: Employees split their work time between an approved remote location and a Taurus AI office, according to their team\'s guidelines.',
      'On-site Work: Employees primarily perform their duties from a designated Taurus AI office location.',
    ],
  },
  {
    number: '4',
    title: 'Working Hours',
    intro: 'Employees are expected to adhere to their agreed-upon working hours. A core collaboration window of 10:00 AM – 6:00 PM IST is established to facilitate real-time communication and team meetings across all work models.',
    items: [],
  },
  {
    number: '5',
    title: 'Productivity & Deliverables',
    intro: 'All employees, regardless of their work model, are expected to maintain the same high standards of productivity and meet all established deliverables. Regular communication with managers and team members is crucial for accountability and progress tracking.',
    items: [],
  },
  {
    number: '6',
    title: 'Data Security in Remote Work',
    intro: 'Maintaining the security and confidentiality of company data is paramount. All remote and hybrid employees must:',
    items: [
      'Utilize the company-provided VPN for all access to Taurus AI\'s internal systems and sensitive data.',
      'Ensure their home or remote Wi-Fi networks are secure and password-protected. Public Wi-Fi networks are strictly prohibited for work-related activities involving confidential information.',
      'Use only company-issued devices (laptops, phones, etc.) for work tasks. Personal devices are not permitted for accessing company data.',
      'Comply with all company data protection policies and guidelines, including those related to password management, software installation, and physical security of devices.',
    ],
  },
  {
    number: '7',
    title: 'Misuse & Violations',
    intro: 'Any misuse of company resources or violation of this remote work policy, particularly regarding data security, may result in disciplinary action, up to and including termination of employment. All employees are responsible for understanding and adhering to these guidelines.',
    items: [],
  },
];

const RemoteWorkPolicyPage = () => {
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
            <span className="text-white">Remote Work Policy</span>
          </nav>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30">
              <Laptop className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">Remote Work Policy</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            This policy defines the guidelines governing remote, hybrid, and in-office work arrangements at Taurus AI to ensure productivity, collaboration, data security, and work-life balance.
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

export default RemoteWorkPolicyPage;
