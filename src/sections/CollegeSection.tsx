import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Check, ArrowRight, GraduationCap, BarChart3, Users, Zap, Award, Globe
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';

const pillars = [
  {
    icon: Zap,
    title: 'AI-Led Mock Drives at Scale',
    description: 'Structured, role-specific interviews for 100–1,000+ students — no additional faculty load.',
  },
  {
    icon: BarChart3,
    title: 'Employability Scorecards',
    description: 'Data-backed Role-Fit Score, Communication Index, and Readiness Classification for every student.',
  },
  {
    icon: Users,
    title: 'Placement Cell Dashboard',
    description: 'Ranked talent pool, skill heatmaps, batch analytics, and recruiter-ready shortlists — all in one view.',
  },
  {
    icon: Globe,
    title: 'Direct Global Recruiter Access',
    description: 'Recruiters filter, compare, and shortlist students directly via the Recruiter Portal.',
  },
];

const features = [
  'Conduct structured mock drives at scale',
  'Evaluate students using recruiter-grade frameworks',
  'Generate data-backed employability scorecards',
  'Present ranked shortlists to companies',
  'Leadership Board review for top performers',
  'NAAC / Accreditation-ready metrics documentation',
];

const stats = [
  { value: '1000+', label: 'Students per drive' },
  { value: '3×', label: 'Better interview conversion' },
  { value: '100%', label: 'Structured evaluation' },
  { value: 'Zero', label: 'Extra faculty load' },
];

export default function CollegeSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-24 bg-secondary/10 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-500/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-white/2 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-sm font-medium">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            College Taurus Portal
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Campus Placements,{' '}
            <span className="gradient-text">Reinvented</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Colleges train students. Recruiters hire based on validated capability. College Taurus bridges that gap — turning your placement cell into a data-driven talent validation center.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-card border border-white/10 rounded-2xl p-5 text-center hover:border-white/20 transition-colors"
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <p className="text-slate-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-14">

          {/* Left — Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-card border border-white/10 rounded-3xl p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 font-medium mb-6">
                  <GraduationCap className="w-3 h-3 text-emerald-400" />
                  AI-Powered Placement Infrastructure
                </div>
                <h3 className="text-xl font-bold text-white mb-6">What College Taurus Enables</h3>
                <div className="space-y-3">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Pillar cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  className="bg-card border border-white/10 rounded-2xl p-5 hover:border-white/25 hover:bg-secondary/50 transition-all duration-300 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center mb-3 group-hover:bg-white/12 transition-colors">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1.5">{pillar.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{pillar.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="relative rounded-3xl overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-secondary/30" />
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />
          </div>
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left copy */}
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">The Strategic Outcome</p>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Colleges that <span className="gradient-text">measure employability</span> outperform colleges that promise it.
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  College Taurus ensures your students are not just trained — they are validated, ranked, and ready to be hired.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Higher Placement Ratios', 'Stronger Recruiter Trust', 'NAAC-Ready Metrics', 'Global Recruiter Access'].map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="flex flex-col items-center">
                <div className="bg-card border border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-soft">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center mb-4 mx-auto">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2 text-center">Partner with College Taurus</h4>
                  <p className="text-slate-400 text-sm mb-5 text-center">
                    Transform your placement cell into a data-backed talent validation powerhouse.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => navigate('/college')}
                      className="w-full bg-white text-black hover:bg-white/90 rounded-full font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      View More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      onClick={() => navigate('/contact-us')}
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 rounded-full font-medium"
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
