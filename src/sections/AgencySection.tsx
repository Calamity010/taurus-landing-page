import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Check, TrendingUp, Clock, Users, Star, ArrowRight, Zap, BarChart3, Shield, Building2
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';

const features = [
  'Unlimited AI-led candidate screening',
  'Automated role-specific interview evaluations',
  'Ranked shortlist — ready for final client interviews',
  'AI-powered candidate scoring & behavioral insights',
  'Custom reporting dashboards for clients',
  'Multi-company hiring support under one account',
  'Centralized candidate database',
  'White-label client reports (optional)',
  'Priority onboarding + dedicated support',
];

const benefits = [
  {
    icon: Zap,
    title: 'Faster Turnaround',
    description: 'Taurus screens, assesses, and shortlists within hours — not days. No more weeks spent on unqualified calls.',
    color: 'from-amber-500/20 to-orange-500/10',
    iconColor: 'text-amber-400',
    border: 'border-amber-500/20',
  },
  {
    icon: Star,
    title: 'Higher Placement Quality',
    description: 'Evaluate communication, role-fit, problem-solving & behavioral traits — send clients candidates who perform better.',
    color: 'from-blue-500/20 to-cyan-500/10',
    iconColor: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  {
    icon: Shield,
    title: 'Standardized Evaluation',
    description: 'Every candidate goes through the same structured framework. Measurable readiness scores, no subjectivity.',
    color: 'from-emerald-500/20 to-green-500/10',
    iconColor: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
  {
    icon: BarChart3,
    title: 'Improve Client NPS & Revenue',
    description: 'Faster fills, better fit candidates, and traceable outcomes — happier clients and more retained business.',
    color: 'from-purple-500/20 to-violet-500/10',
    iconColor: 'text-purple-400',
    border: 'border-purple-500/20',
  },
];

const impacts = [
  { value: '50%', label: 'Reduction in screening time', icon: Clock },
  { value: '40%', label: 'Faster candidate shortlisting', icon: TrendingUp },
  { value: 'Fewer', label: 'Bad hire incidences', icon: Shield },
  { value: 'Better', label: 'Success rates in client final rounds', icon: Star },
];

const targetAudience = [
  { icon: Building2, label: 'Recruitment & Staffing Firms' },
  { icon: Users, label: 'Talent Acquisition Partners' },
  { icon: BarChart3, label: 'Contingent Hiring Specialists' },
  { icon: Shield, label: 'Outsourced HR Delivery Partners' },
];

export default function AgencySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Ambient background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/3 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <Building2 className="w-4 h-4" />
            Agency Partner Program
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Transform Hiring for Your Clients with{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-primary bg-clip-text text-transparent">
              Taurus Agency Model
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Plug-in AI-Led Hiring for Recruitment Agencies — Deliver Higher Quality Shortlists Faster, Every Time.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 mt-14">

          {/* Left — Features list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800/50 border border-white/10 rounded-3xl p-8 h-full relative overflow-hidden">
              {/* Inner glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 font-medium mb-6">
                  <Zap className="w-3 h-3 text-primary" />
                  8.33 Pricing Model — Full Suite Access
                </div>

                <h3 className="text-xl font-bold text-white mb-6">What You Get with Taurus Agency Model</h3>

                <div className="space-y-3">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Benefits cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  className={`bg-gradient-to-br ${benefit.color} border ${benefit.border} rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-default`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 border border-white/10">
                    <Icon className={`w-5 h-5 ${benefit.iconColor}`} />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1.5">{benefit.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Impact Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <p className="text-slate-400 text-sm uppercase tracking-widest font-medium">Impact You Can Measure</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">What Agencies Achieve</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impacts.map((impact, i) => {
              const Icon = impact.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/60 border border-white/10 rounded-2xl p-6 text-center overflow-hidden group hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{impact.value}</div>
                    <p className="text-slate-400 text-xs leading-snug">{impact.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Who is it for + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Gradient BG */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-slate-900/80 to-purple-900/60" />
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />
          </div>
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Who should subscribe */}
              <div>
                <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Who Should Subscribe</p>
                <h3 className="text-2xl font-bold text-white mb-6">Built for Agencies That Mean Business</h3>
                <div className="grid grid-cols-2 gap-3">
                  {targetAudience.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.75 + i * 0.1 }}
                        className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5"
                      >
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-slate-300 text-xs font-medium leading-snug">{item.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* CTA block */}
              <div className="flex flex-col items-start md:items-center text-left md:text-center">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl p-6 w-full max-w-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 mx-auto">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2 text-center">Become a Taurus Agency Partner</h4>
                  <p className="text-slate-400 text-sm mb-5 text-center">
                    Unlock smarter hiring workflows and elevate your agency value proposition.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => navigate('/agency')}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      View More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      onClick={() => navigate('/contact-us')}
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 rounded-full font-medium"
                    >
                      Contact Sales
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
