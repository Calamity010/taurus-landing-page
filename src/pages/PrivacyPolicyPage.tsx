import { motion } from 'framer-motion';
import { Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      'Personal identification information (name, email address, phone number, etc.)',
      'Company information provided during registration or contact forms.',
      'Usage data including pages visited, time spent, and browser/device information.',
      'Candidate data processed through our AI screening tools on behalf of our clients.',
      'Payment and billing information processed securely through our payment partners.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To provide, operate, and improve our AI recruitment services.',
      'To communicate with you about your account, updates, and support.',
      'To process transactions and send related information including purchase confirmations.',
      'To analyze usage trends and optimize platform performance.',
      'To comply with legal obligations and enforce our Terms of Service.',
    ],
  },
  {
    title: '3. Data Sharing and Disclosure',
    content: [
      'We do not sell, trade, or rent your personal information to third parties.',
      'We may share data with trusted service providers who assist us in operating our platform, subject to strict confidentiality agreements.',
      'We may disclose information when required by law or to protect the rights and safety of Taurus AI and its users.',
      'In the event of a merger or acquisition, user data may be transferred as part of company assets.',
    ],
  },
  {
    title: '4. Data Security',
    content: [
      'We implement bank-grade AES-256 encryption for data at rest and in transit.',
      'Our platform is SOC 2 Type II certified and ISO 27001 compliant.',
      'We conduct regular security audits and penetration testing.',
      'Access to personal data is restricted to authorized personnel on a need-to-know basis.',
    ],
  },
  {
    title: '5. Candidate Data',
    content: [
      'Candidate data processed through Taurus AI is owned by our clients (employers).',
      'We act as a data processor and adhere to client instructions for data handling.',
      'Candidate data is retained only for the duration specified in the client agreement.',
      'Candidates may request access to or deletion of their data through the respective employer.',
    ],
  },
  {
    title: '6. Cookies and Tracking',
    content: [
      'We use cookies to enhance your experience and analyze platform usage.',
      'You can control cookie preferences through your browser settings.',
      'We use analytics tools (e.g., Google Analytics) to understand user behavior in aggregate.',
      'Marketing cookies are only placed with your explicit consent.',
    ],
  },
  {
    title: '7. Your Rights',
    content: [
      'Right to Access: You may request a copy of the personal data we hold about you.',
      'Right to Rectification: You may request correction of inaccurate personal data.',
      'Right to Erasure: You may request deletion of your personal data under certain conditions.',
      'Right to Portability: You may request your data in a machine-readable format.',
      'Right to Object: You may object to certain types of processing, including direct marketing.',
    ],
  },
  {
    title: '8. Contact Us',
    content: [
      'For privacy-related inquiries, please contact us at: sales@thetaurus.ai',
      'Aashvi, 3rd Floor, Channasandra Main Road, Whitefield, Bangalore – 560066, India',
      'Phone: +91 63634 02404',
      'We will respond to all legitimate requests within 30 days.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      {/* Hero */}
      <section className="bg-background border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-bold mb-6 border border-blue-500/20">
            <Shield size={14} />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">Privacy Policy</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Last updated: February 2026. This policy explains how Taurus AI collects, uses, and protects your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card rounded-2xl border border-white/10 p-8 hover:border-blue-500/20 transition-all"
            >
              <h2 className="text-xl font-bold text-white mb-4">{sec.title}</h2>
              <ul className="space-y-3">
                {sec.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-secondary py-12 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-slate-300 mb-4">Have questions about our privacy practices?</p>
          <Link to="/contact-us" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Contact Us <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
