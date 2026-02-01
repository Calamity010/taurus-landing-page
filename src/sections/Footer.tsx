import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Briefcase } from 'lucide-react';

const quickLinks = [
  { label: 'Manifesto', href: '#' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Live Chat', href: '#' },
  { label: 'Help Desk', href: '#' },
  { label: 'Blog', href: '#' },
];

const aiAgents = [
  { label: 'AI Video Interviewer', href: '#' },
  { label: 'AI Phone Screener', href: '#' },
  { label: 'AI Resume Screener', href: '#' },
  { label: 'AI Coding Interviewer', href: '#' },
  { label: 'English Proficiency Test', href: '#' },
];

const useCases = [
  { label: 'Education', href: '#' },
  { label: 'Technology', href: '#' },
  { label: 'Retail', href: '#' },
  { label: 'BFSI', href: '#' },
  { label: 'Manufacturing', href: '#' },
  { label: 'Semiconductors & Hardwares', href: '#' },
  { label: 'Healthcare', href: '#' },
  { label: 'PwC', href: '#' },
  { label: 'EV & Automotive', href: '#' },
  { label: 'Deloitte', href: '#' },
  { label: 'Hospitality', href: '#' },
  { label: 'EY', href: '#' },
  { label: 'Aerospace & Defence', href: '#' },
  { label: 'KPMG', href: '#' },
  { label: 'Recruitment Agency', href: '#' },
];

const comparisons = [
  { label: 'Taurus Hire vs Babblebots', href: '#' },
  { label: 'Taurus Hire vs Micro1', href: '#' },
  { label: 'Taurus Hire vs Mindely', href: '#' },
  { label: 'Taurus Hire vs Apriora', href: '#' },
  { label: 'Taurus Hire vs Sapia', href: '#' },
  { label: 'Taurus Hire vs Upscreen', href: '#' },
  { label: 'Taurus Hire vs Fairgo', href: '#' },
  { label: 'Taurus Hire vs Evalgator', href: '#' },
  { label: 'Taurus Hire vs Incruiter', href: '#' },
  { label: 'Taurus Hire vs Interviewer.ai', href: '#' },
  { label: 'Taurus Hire vs Talently', href: '#' },
];

const socialLinks = [
  { name: 'Telegram', icon: 'M' },
  { name: 'Slack', icon: 'S' },
  { name: 'Podcast', icon: 'P' },
  { name: 'Messenger', icon: 'M' },
  { name: 'Product Hunt', icon: 'P' },
  { name: 'GitHub', icon: 'G' },
  { name: 'Crunchbase', icon: 'C' },
  { name: 'LinkedIn', icon: 'in' },
  { name: 'Instagram', icon: 'IG' },
  { name: 'X', icon: 'X' },
  { name: 'YouTube', icon: 'YT' },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <footer ref={ref} className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 pb-12 border-b border-slate-800"
        >
          {/* Logo & Certifications */}
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Taurus Hire</span>
            </a>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400 border border-blue-500/30">
                SOC 2
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400 border border-green-500/30">
                ISO
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-primary flex items-center justify-center text-xs font-semibold transition-colors"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Agents */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              AI Agents
            </h3>
            <ul className="space-y-2">
              {aiAgents.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Use Cases
            </h3>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {useCases.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Compare
            </h3>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {comparisons.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
          </div>
          <p className="text-sm text-slate-400 text-center md:text-right">
            © Taurus Hire, Inc | 2261 Market Street STE 10764, San Francisco, CA 94114
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
