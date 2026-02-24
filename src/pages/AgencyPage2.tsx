import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check, TrendingUp, Clock, Users, Star, ArrowRight, Zap, BarChart3, Shield, Building2,
  CheckCircle, ChevronRight, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  'Unlimited access to structured AI-led candidate screening',
  'Automated role-specific interview evaluations',
  'Ranked shortlist generation ready for final client interviews',
  'AI-powered candidate scoring & behavioral insights',
  'Custom reporting dashboards for clients',
  'Multi-company hiring support under one account',
  'Centralized candidate database',
  'White-label client reports (optional)',
  'Priority onboarding + dedicated support',
];

const whyAgencies = [
  {
    number: '01',
    icon: Zap,
    title: 'Faster Turnaround',
    description: "No more weeks spent screening resumes or scheduling dozens of unqualified calls. Taurus's AI screens, assesses, and shortlists within hours — not days.",
  },
  {
    number: '02',
    icon: Star,
    title: 'Higher Placement Quality',
    description: 'Because Taurus evaluates deeper than resumes — covering communication, role-fit, problem-solving, and behavioral traits — you send clients candidates who perform better in interviews and on the job.',
  },
  {
    number: '03',
    icon: Shield,
    title: 'Standardized Evaluation = Repeatable Success',
    description: 'Every candidate goes through the same structured assessment framework. No more subjective evaluations — just measurable readiness scores and insight-driven comparisons.',
  },
  {
    number: '04',
    icon: BarChart3,
    title: 'Improve Client NPS & Revenue Per Client',
    description: 'Faster fills, better fit candidates, and traceable outcomes = happier clients and more retained business.',
  },
];

const impacts = [
  { value: '50%', label: 'Reduction in screening time', sublabel: 'Compared to traditional methods', icon: Clock },
  { value: '40%', label: 'Faster candidate shortlisting', sublabel: 'AI-powered evaluation pipeline', icon: TrendingUp },
  { value: 'Reduced', label: 'Bad hire incidences', sublabel: 'Data-driven candidate matching', icon: Shield },
  { value: 'Better', label: 'Success rates in final rounds', sublabel: 'Higher client satisfaction scores', icon: Star },
];

const targetAudience = [
  { icon: Building2, title: 'Recruitment & Staffing Firms', description: 'End-to-end AI hiring support for large volume clients.' },
  { icon: Users, title: 'Talent Acquisition Partners', description: 'Deliver structured shortlists with speed and precision.' },
  { icon: BarChart3, title: 'Contingent Hiring Specialists', description: 'Scalable screening for project-based workforce needs.' },
  { icon: Shield, title: 'Outsourced HR Delivery Partners', description: 'Unified platform for multi-client HR delivery.' },
];

function SectionHeader({ badge, title, highlight, subtitle }: { badge: string; title: string; highlight?: string; subtitle?: string }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold uppercase tracking-widest mb-5">
        {badge}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {title}
        {highlight && (
          <span className="gradient-text"> {highlight}</span>
        )}
      </h2>
      {subtitle && <p className="text-slate-400 max-w-2xl mx-auto text-lg">{subtitle}</p>}
    </motion.div>
  );
}

export default function AgencyPage2() {
  const navigate = useNavigate();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="min-h-screen bg-background text-white">

      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative pt-36 pb-24 overflow-hidden">
        {/* Background treatment */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/2 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/2 rounded-full blur-[100px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-4"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-sm font-semibold mb-8"
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            Agency Partner Program — 8.33 Pricing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Transform Hiring{' '}
            <br className="hidden md:block" />
            <span className="gradient-text">for Your Clients</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Plug-in AI-Led Hiring for Recruitment Agencies — Deliver Higher Quality Shortlists Faster, Every Time. One flat pricing model. Unlimited hiring intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate('/contact-us')}
              className="bg-white text-black hover:bg-white/90 rounded-full px-10 font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Mail className="w-5 h-5 mr-2" />
              Become an Agency Partner
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/pricing')}
              className="border-white/20 text-white hover:bg-white/8 rounded-full px-8"
            >
              View Pricing
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
          >
            {['No setup fees', 'Priority support included', 'White-label reports', 'Multi-client dashboard'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── What You Get ─── */}
      <section className="py-20 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="8.33 Pricing — Full Suite"
            title="What You Get with"
            highlight="Taurus Agency Model"
            subtitle="Fixed Monthly Access + Scalable Hiring Capacity. A full suite of hiring intelligence tools designed for volume clients and recruitment partners."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-start gap-3 bg-card border border-white/8 rounded-2xl p-5 hover:border-white/20 hover:bg-secondary/40 transition-all duration-300 group"
              >
                <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Agencies Choose Taurus ─── */}
      <section className="py-20 bg-secondary/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Competitive Advantage"
            title="Why Agencies Choose"
            highlight="Taurus"
            subtitle="Four core pillars that set Taurus apart and elevate your agency's value proposition."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {whyAgencies.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="bg-card border border-white/10 rounded-3xl p-7 hover:border-white/20 hover:bg-secondary/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/15 flex items-center justify-center group-hover:bg-white/12 transition-colors">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-600 mb-1 tracking-widest">{item.number}</div>
                      <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Impact Metrics ─── */}
      <section className="py-20 bg-background border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Measurable Results"
            title="What Agencies Achieve"
            subtitle="These results mean higher revenue per job order, stronger long-term client relationships, and repeat contracts."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {impacts.map((impact, i) => {
              const Icon = impact.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-white/10 rounded-3xl p-7 text-center group hover:border-white/25 hover:bg-secondary/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{impact.value}</div>
                  <p className="text-white text-xs font-semibold mb-1">{impact.label}</p>
                  <p className="text-slate-500 text-xs">{impact.sublabel}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Who Should Subscribe ─── */}
      <section className="py-20 bg-secondary/10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Ideal Fit"
            title="Who Should Subscribe"
            subtitle="Taurus Agency Model is purpose-built for organizations delivering talent at scale."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {targetAudience.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-white/10 rounded-2xl p-6 text-center hover:border-white/25 hover:bg-secondary/50 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Final CTA Banner ─── */}
      <section className="py-20 gradient-dark relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-sm font-medium text-blue-300 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              Ready to Partner?
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
              Become a Taurus Agency Partner Today
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Unlock smarter hiring workflows and elevate your agency value proposition. Faster fills, better fit candidates, and traceable outcomes await.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/contact-us')}
                className="bg-white text-black hover:bg-white/90 rounded-full px-10 font-bold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get Started Today
              </Button>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors duration-200"
              >
                Compare Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
