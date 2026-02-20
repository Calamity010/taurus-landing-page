import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const quickLinks = [
  { label: 'Manifesto', href: '/contact-us' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Help Centre', href: '/resources/help-centre' },
  { label: 'Blog', href: '/resources/blog' },
  { label: 'Contact Us', href: '/contact-us' },
];

const aiAgents = [
  { label: 'AI Video Interviewer', href: '/ai-agents/video-interviewer' },
  // { label: 'AI Phone Screener', href: '/ai-phone-screener' },
  { label: 'AI Resume Screener', href: '/ai-resume-screener' },
  { label: 'AI Coding Interviewer', href: '/ai-coding-interviewer' },
  { label: 'AI MCQs', href: '/ai-mcq-interviewer' },
  { label: 'AI System Design Interview', href: '/ai-system-design-interview' },
];

const useCases = [
  { label: 'Education', href: '/use-cases/education' },
  { label: 'Technology', href: '/use-cases/technology' },
  { label: 'Retail', href: '/use-cases/retail' },
  { label: 'BFSI', href: '/use-cases/bfsi' },
  { label: 'Manufacturing', href: '/use-cases/manufacturing' },
  { label: 'Semiconductors & Hardwares', href: '/use-cases/semiconductors-hardwares' },
  { label: 'Healthcare', href: '/use-cases/healthcare' },
  { label: 'EV & Automotive', href: '/use-cases/ev-automotive' },
  { label: 'Hospitality', href: '/use-cases/hospitality' },
  { label: 'Aerospace & Defence', href: '/use-cases/aerospace-defence' },
  { label: 'Recruitment Agency', href: '/use-cases/recruitment-agency' },
  { label: 'Big 4', href: '/use-cases/big-4' },
];

const comparisons = [
  { label: 'Taurus vs Babblebots', href: '/resources/compare/babblebots' },
  { label: 'Taurus vs Micro1', href: '/resources/compare/micro1' },
  { label: 'Taurus vs Mindely', href: '/resources/compare/mindely' },
  { label: 'Taurus vs Apriora', href: '/resources/compare/apriora' },
  { label: 'Taurus vs Sapia', href: '/resources/compare/sapia' },
  { label: 'Taurus vs Upscreen', href: '/resources/compare/upscreen' },
  { label: 'Taurus vs Fairgo', href: '/resources/compare/fairgo' },
  { label: 'Taurus vs Evalgator', href: '/resources/compare/evalgator' },
];

const socialLinks = [
  { 
    name: 'Telegram', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.638z"/>
      </svg>
    ),
    href: '#'
  },
  { 
    name: 'Slack', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.52v-6.315zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.521A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.521v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.522 2.521 2.528 2.528 0 0 1-2.522-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.522 2.522v6.312zM15.166 18.956a2.528 2.528 0 0 1 2.522 2.521A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.522-2.521v-2.52h2.52zM15.166 17.688a2.528 2.528 0 0 1-2.522-2.522 2.528 2.528 0 0 1 2.522-2.522h6.311A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.522h-6.311z"/>
      </svg>
    ),
    href: '#'
  },
  { 
    name: 'Medium', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.82 24 12z"/>
      </svg>
    ),
    href: '#'
  },
  { 
    name: 'Messenger', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
         <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.598 8.654.24.171.394.472.375.773l-.112 2.45c-.035.77.781 1.259 1.42 1.09l2.875-.768a1.59 1.59 0 0 1 .867.054 13.24 13.24 0 0 0 2.057.406c-.033.002.12.002.12.002 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm-1.075 14.583L8.52 10.75a1.2 1.2 0 0 0-1.74 0L3.18 14.583c-.886.886-1.926-.645-.992-1.63L7.33 7.828a1.2 1.2 0 0 1 1.74 0l2.406 3.834 3.75-3.834c.886-.886 1.926.645.991 1.63L10.925 14.583z"/>
      </svg>
    ),
    href: '#'
  },
  { 
    name: 'Trustpilot', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.43 19.34L12 16.03l-5.43 3.31 1.62-6.19L3.5 9.17h6.39L12 2.87l2.11 6.3h6.39l-4.69 3.98 1.62 6.19z" />
      </svg>
    ),
    href: '#'
  },
  { 
    name: 'G2', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.5 7h-7.8c-.8 0-1.4.3-1.8.8l-4.2 4.2c-.3-.4-1-.7-1.7-.7-1.3 0-2.3 1-2.3 2.3 0 1.2 1 2.3 2.3 2.3s2.3-1 2.3-2.3v-.3l4.7-4.7c.3.5.7.9 1.3.9h6.8c1 0 1.9-.9 1.9-1.9V8.9c0-1-.8-1.9-1.8-1.9zm-16.7 8.3c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1c0 .6-.5 1.1-1.1 1.1z M3.8 3h16.4c2.1 0 3.8 1.7 3.8 3.8v10.4c0 2.1-1.7 3.8-3.8 3.8H3.8C1.7 21 0 19.2 0 17.2V6.8C0 4.7 1.7 3 3.8 3z"/>
      </svg>
    ),
    href: '#'
  },
  { 
    name: 'Crunchbase', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 font-bold text-center">
         <path d="M4 4h16v16H4V4zm2 10.5c0 1.38 1.12 2.5 2.5 2.5h1v-1.5H8.5c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1H11V7H8.5C7.12 7 6 8.12 6 9.5v5zm7-2h3V11h-3v1.5zm.5 4.5h2c1.38 0 2.5-1.12 2.5-2.5V9h-1.5v3.5c0 .55-.45 1-1 1h-2v1.5zm0-7.5h2v-1.5h-2V9.5z" />
      </svg>
    ),
    href: '#'
  },
  { 
    name: 'LinkedIn', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: '#'
  },
  { 
    name: 'Instagram', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="white" strokeWidth="2" fill="none" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    href: '#'
  },
  { 
    name: 'X', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
    href: '#'
  },
  { 
    name: 'YouTube', 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    href: '#'
  },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <footer ref={ref} className="bg-background text-white py-16">
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
            <a href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Taurus Logo" 
                className="h-10 w-auto object-contain"
              />
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
                href={social.href}
                className="w-10 h-10 rounded-lg bg-card border border-white/10 flex items-center justify-center text-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-secondary"
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
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
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
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Use Cases
            </h3>
            <ul className="space-y-2">
              {useCases.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
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
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
          <p className="text-sm text-slate-400 text-center md:text-right">
            © Taurus, Inc | Aashvi, 3rd Floor, Channasandra Main Road, Whitefield, Bangalore – 560066
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
