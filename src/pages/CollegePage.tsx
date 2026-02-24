import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check, GraduationCap, BarChart3, Users, Zap, Award, Globe,
  ChevronRight, Mail, CheckCircle, ArrowRight, Trophy, Target,
  BookOpen, TrendingUp, Shield, Star, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ─── Data ────────────────────────────────────────────────────────────────
const whatItEnables = [
  'Conduct structured mock drives at scale',
  'Evaluate students using recruiter-grade frameworks',
  'Generate data-backed employability scorecards',
  'Present ranked shortlists to companies',
  'Improve measurable placement outcomes',
];

const differentiators = [
  {
    number: '01',
    icon: Zap,
    title: 'Structured AI-Led Mock Drives',
    subtitle: 'Not Just Practice Interviews',
    points: [
      'Role-specific AI interviews',
      'Competency-based questioning',
      'Communication & articulation analysis',
      'Problem-solving & behavioral evaluation',
    ],
    footer: 'Every answer evaluated against structured rubrics. No bias. No guesswork. No inconsistent panel standards.',
  },
  {
    number: '02',
    icon: BarChart3,
    title: 'Recruiter-Ready Employability Scorecards',
    subtitle: 'Validated Hiring Intelligence',
    points: [
      'Role-Fit Score',
      'Communication Index',
      'Analytical Strength',
      'Readiness Classification (Job-Ready / Trainable / Needs Improvement)',
    ],
    footer: 'Shifts perception: "We have students." → "We have ranked, evaluated, interview-ready candidates."',
  },
  {
    number: '03',
    icon: Layers,
    title: 'Placement Cell Dashboard',
    subtitle: 'Manage Talent Strategically',
    points: [
      'Ranked talent pool',
      'Skill heatmaps across departments',
      'Batch performance analytics',
      'Drive-wise performance reports',
    ],
    footer: "You don't just conduct placements. You manage talent performance strategically.",
  },
  {
    number: '04',
    icon: Globe,
    title: 'Direct Global Recruiter Access',
    subtitle: 'Beyond Regional Hiring Cycles',
    points: [
      'Filter candidates by role-fit score',
      'Compare performance dashboards',
      'View AI + Leadership scores',
      'Shortlist and initiate interviews directly',
    ],
    footer: 'Your students gain structured access to global opportunities — not just regional cycles.',
  },
];

const howItWorks = [
  {
    step: '01',
    icon: Target,
    title: 'College Configures Role Framework',
    items: ['Select job roles', 'Define evaluation parameters', 'Assign competency weightages'],
  },
  {
    step: '02',
    icon: BookOpen,
    title: 'Students Appear for Structured Assessments',
    items: ['AI-led interviews', 'Role-based evaluation flows', 'Automated scoring'],
  },
  {
    step: '03',
    icon: BarChart3,
    title: 'Taurus Generates Talent Intelligence',
    items: ['Ranked list', 'Scorecards', 'Department analytics & recruiter-ready exports'],
  },
  {
    step: '04',
    icon: CheckCircle,
    title: 'Recruiters Conduct Final Interviews',
    items: ['Only shortlisted candidates move forward', 'Higher conversion probability', 'Faster campus hiring cycles'],
  },
];

const institutionalBenefits = [
  {
    icon: TrendingUp,
    title: 'Higher Placement Ratios',
    description: 'Structured preparation improves interview conversion rates significantly across the full batch, not just top performers.',
  },
  {
    icon: Shield,
    title: 'Stronger Recruiter Trust',
    description: 'Companies prefer campuses that provide evaluated, interview-ready candidates over raw resume submissions.',
  },
  {
    icon: BarChart3,
    title: 'Measurable Employability Index',
    description: '% Job-ready students, department-wise readiness, and semester-over-semester improvement — powerful for NAAC and accreditation.',
  },
  {
    icon: Zap,
    title: 'Scalable Mock Drive Infrastructure',
    description: 'Run 100, 500, or 1,000+ student assessments simultaneously without increasing faculty load.',
  },
];

const pricingPlans = [
  {
    tier: 'Starter',
    medal: '🥉',
    subtitle: 'For Emerging Colleges / Single Department',
    idealFor: '200–500 students annually',
    price: '₹2.5 – ₹4 Lakhs',
    period: 'Annual Investment',
    features: [
      'AI-led mock interviews (limited drives)',
      'Employability scorecards for all students',
      'Basic placement dashboard access',
      'Recruiter-ready shortlists',
      'Email support',
    ],
    highlight: false,
  },
  {
    tier: 'Growth',
    medal: '🥈',
    subtitle: 'For Multi-Department Colleges Scaling Placements',
    idealFor: '500–1,500 students annually',
    price: '₹5 – ₹9 Lakhs',
    period: 'Annual Investment',
    features: [
      'Everything in Starter',
      'Unlimited mock drives',
      'Department-wise analytics dashboard',
      'Recruiter export reports',
      'Talent heatmaps',
      'Custom role configuration',
      'Dedicated onboarding support',
    ],
    highlight: true,
  },
  {
    tier: 'Enterprise',
    medal: '🥇',
    subtitle: 'For Universities / Large Institutions',
    idealFor: '1,500+ students annually',
    price: '₹10 – ₹18 Lakhs',
    period: 'Annual Investment',
    features: [
      'Everything in Growth',
      'University-wide analytics',
      'White-labeled employability reports',
      'Dedicated account manager',
      'Recruiter access portal',
      'Advanced benchmarking insights',
      'Custom employability index framework',
    ],
    highlight: false,
  },
];

const comparisonRows = [
  { area: 'Mock Interviews', traditional: 'Panel-based, inconsistent', taurus: 'AI-led structured, standardized' },
  { area: 'Evaluation', traditional: 'Subjective feedback', taurus: 'Data-backed scoring framework' },
  { area: 'Skill Visibility', traditional: 'Resume-driven', taurus: 'Competency & role-fit driven' },
  { area: 'Recruiter Confidence', traditional: 'Variable', taurus: 'Evidence-based candidate validation' },
  { area: 'Placement Strategy', traditional: 'Reactive', taurus: 'Data-driven & predictive' },
  { area: 'Student Feedback', traditional: 'Generic', taurus: 'Detailed performance analytics' },
  { area: 'Scalability', traditional: 'Limited by faculty', taurus: 'Scalable to 1000+ students instantly' },
  { area: 'Shortlisting', traditional: 'Manual', taurus: 'Automated ranked shortlists' },
  { area: 'Accreditation Support', traditional: 'Limited measurable data', taurus: 'Employability metrics documentation' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────
function SectionBadge({ children, icon: Icon, color = 'white' }: { children: React.ReactNode; icon: React.ElementType; color?: string }) {
  const isEmerald = color === 'emerald';
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5 ${isEmerald ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-300' : 'bg-white/5 border border-white/10 text-slate-400'}`}>
      <Icon className={`w-3.5 h-3.5 ${isEmerald ? 'text-emerald-400' : 'text-primary'}`} />
      {children}
    </div>
  );
}

function SectionHeader({ badge, badgeIcon, title, highlight, subtitle, badgeColor }: {
  badge: string; badgeIcon: React.ElementType; title: string; highlight?: string; subtitle?: string; badgeColor?: string;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <SectionBadge icon={badgeIcon} color={badgeColor}>{badge}</SectionBadge>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {title}
        {highlight && <span className="gradient-text"> {highlight}</span>}
      </h2>
      {subtitle && <p className="text-slate-400 max-w-2xl mx-auto text-lg">{subtitle}</p>}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function CollegePage() {
  const navigate = useNavigate();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="min-h-screen bg-background text-white">

      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/4 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/2 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-4"
            style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '48px 48px' }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-sm font-semibold mb-8"
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            College Taurus Portal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Transforming Campus{' '}
            <br className="hidden md:block" />
            <span className="gradient-text">Placements</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            From Training Students → To Proving Employability with Data
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Today, recruiters don't just want resumes — they want validated skill signals, structured evaluations, and interview-ready candidates. College Taurus bridges that gap.
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
              Partner with Us
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
          >
            {['Structured AI Mock Drives', 'Employability Scorecards', 'Recruiter Portal Access', 'NAAC-Ready Metrics'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Problem + What is it ─── */}
      <section className="py-20 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-4">The Problem Colleges Face</p>
              <h3 className="text-2xl font-bold text-white mb-6">There's a Gap Between<br />Training & Hiring Readiness</h3>
              <div className="space-y-3">
                {[
                  'High student volume, limited evaluation depth',
                  'Mock interviews that lack structure and consistency',
                  'Recruiters questioning real-world readiness',
                  'Placement ratios dependent on a few top performers',
                  'No standardized employability scoring framework',
                ].map((prob, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-white/20 bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 block" />
                    </div>
                    <span className="text-slate-400 text-sm">{prob}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-slate-300 text-sm italic border-l-2 border-white/20 pl-4">
                "Colleges train students. But recruiters hire based on validated capability."
              </p>
            </motion.div>

            {/* What is College Taurus */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="bg-card border border-white/10 rounded-3xl p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/4 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-medium mb-5">
                    <GraduationCap className="w-3 h-3" />
                    What is College Taurus?
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    College Taurus is an <span className="text-white font-semibold">AI-powered Placement & Employability Infrastructure</span> that enables institutions to turn their placement cell into a data-driven talent validation center.
                  </p>
                  <div className="space-y-3">
                    {whatItEnables.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-slate-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── What Makes It Different (4 pillars) ─── */}
      <section className="py-20 bg-secondary/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="What Makes It Different"
            badgeIcon={Star}
            title="Four Pillars That Set"
            highlight="College Taurus Apart"
            subtitle="Not just mock interviews. A complete placement intelligence ecosystem."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-card border border-white/10 rounded-3xl p-7 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/15 flex items-center justify-center group-hover:bg-white/12 transition-colors">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-600 mb-0.5 tracking-widest">{item.number}</div>
                      <h3 className="text-base font-bold text-white mb-0.5">{item.title}</h3>
                      <p className="text-emerald-400 text-xs font-medium mb-3">{item.subtitle}</p>
                      <div className="space-y-1.5 mb-4">
                        {item.points.map((pt, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                            <span className="text-slate-400 text-xs">{pt}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-slate-500 text-xs italic border-l-2 border-white/10 pl-3">{item.footer}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Leadership Board ─── */}
      <section className="py-20 bg-background border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-secondary/40" />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/3 rounded-full blur-3xl" />

            <div className="relative z-10 p-8 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold uppercase tracking-widest mb-6">
                <Trophy className="w-3.5 h-3.5 text-primary" />
                Premium Differentiator
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                The Taurus <span className="gradient-text">Leadership Board</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
                Beyond AI scoring, top-performing candidates are reviewed by a curated panel of Industry Leaders, Senior Hiring Managers, and Corporate Domain Experts who evaluate Leadership Potential, Ownership Mindset, Decision Quality, and Strategic Thinking.
              </p>
              <div className="inline-flex items-center gap-3 bg-card border border-white/10 rounded-2xl px-6 py-4">
                <Award className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Final Hiring Validation =</p>
                  <p className="text-slate-400 text-xs">AI Performance Score + Leadership Score Index (LSI)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 bg-secondary/10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="How It Works"
            badgeIcon={Zap}
            title="Four Simple Steps to"
            highlight="Hiring Intelligence"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative"
                >
                  {i < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-[calc(100%+0.5rem)] w-4 h-px bg-white/15 z-10" />
                  )}
                  <div className="bg-card border border-white/10 rounded-2xl p-5 h-full hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-3xl font-black text-white/10">{step.step}</span>
                    </div>
                    <h4 className="text-white font-bold text-sm mb-3">{step.title}</h4>
                    <div className="space-y-1.5">
                      {step.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-slate-500 flex-shrink-0 mt-1.5" />
                          <span className="text-slate-400 text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Institutional Benefits ─── */}
      <section className="py-20 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Board-Level Impact"
            badgeIcon={BarChart3}
            title="Institutional"
            highlight="Benefits"
            subtitle="From higher placement ratios to accreditation-ready analytics — College Taurus delivers measurable institutional value."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {institutionalBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-white/10 rounded-2xl p-5 hover:border-white/20 hover:bg-secondary/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/12 transition-colors">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">{benefit.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Students + Recruiters row */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[
              {
                icon: Users,
                title: 'Benefits for Students',
                color: 'text-white',
                items: ['Real hiring-style experience', 'Structured, unbiased evaluation', 'Detailed feedback for improvement', 'Increased confidence in real interviews', 'Clear skill gap visibility'],
                note: 'Students stop preparing blindly — they prepare strategically.',
              },
              {
                icon: Trophy,
                title: 'Benefits for Recruiters',
                color: 'text-white',
                items: ['Standardized candidate assessment', 'Ranked shortlists before final interview', 'Reduced screening overhead', 'Clear role-fit visibility', 'Faster campus hiring cycles'],
                note: 'Recruiters spend less time filtering. More time selecting.',
              },
            ].map((group, gi) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={gi}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: gi * 0.1 }}
                  className="bg-card border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className={`font-bold text-base ${group.color}`}>{group.title}</h4>
                  </div>
                  <div className="space-y-2 mb-4">
                    {group.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-slate-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-xs italic border-l-2 border-white/10 pl-3">{group.note}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="py-20 bg-secondary/10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Flexible Pricing"
            badgeIcon={Trophy}
            title="Annual Institutional"
            highlight="Licensing"
            subtitle="Designed based on student volume and placement objectives."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative rounded-3xl p-7 flex flex-col ${plan.highlight ? 'bg-white text-black border-2 border-white' : 'bg-card border border-white/10 hover:border-white/20 transition-colors'}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-black text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <div className="mb-5">
                  <div className="text-2xl mb-2">{plan.medal}</div>
                  <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.tier} Campus</h3>
                  <p className={`text-sm mb-3 ${plan.highlight ? 'text-zinc-600' : 'text-slate-400'}`}>{plan.subtitle}</p>
                  <div className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${plan.highlight ? 'border-black/15 bg-black/5 text-zinc-600' : 'border-white/10 bg-white/5 text-slate-400'}`}>
                    Ideal for {plan.idealFor}
                  </div>
                </div>

                <div className="mb-6">
                  <div className={`text-2xl font-black mb-0.5 ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.price}</div>
                  <p className={`text-xs ${plan.highlight ? 'text-zinc-500' : 'text-slate-500'}`}>{plan.period}</p>
                </div>

                <div className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-black' : 'bg-green-500'}`}>
                        <Check className={`w-2.5 h-2.5 ${plan.highlight ? 'text-white' : 'text-white'}`} />
                      </div>
                      <span className={`text-xs leading-relaxed ${plan.highlight ? 'text-zinc-700' : 'text-slate-300'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => navigate('/contact-us')}
                  className={`w-full rounded-full font-semibold ${plan.highlight ? 'bg-black text-white hover:bg-black/85' : 'bg-white text-black hover:bg-white/90'}`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comparison Table ─── */}
      <section className="py-20 bg-background border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Head to Head"
            badgeIcon={BarChart3}
            title="Traditional vs"
            highlight="College Taurus Model"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-white/10"
          >
            {/* Header */}
            <div className="grid grid-cols-3 bg-secondary/60 border-b border-white/10 text-xs font-bold uppercase tracking-wider">
              <div className="px-5 py-4 text-slate-400">Area</div>
              <div className="px-5 py-4 text-slate-400 border-l border-white/10">Traditional Model</div>
              <div className="px-5 py-4 text-emerald-400 border-l border-white/10">College Taurus</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-b border-white/5 last:border-0 text-sm ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/20'}`}>
                <div className="px-5 py-4 text-slate-300 font-medium text-xs">{row.area}</div>
                <div className="px-5 py-4 text-slate-500 text-xs border-l border-white/5">{row.traditional}</div>
                <div className="px-5 py-4 border-l border-white/5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-300 text-xs">{row.taurus}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 gradient-dark relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/4 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-sm font-medium text-emerald-300 mb-8">
              <GraduationCap className="w-4 h-4" />
              The Strategic Outcome
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
              Colleges that <span className="gradient-text">measure employability</span><br className="hidden md:block" /> outperform colleges that promise it.
            </h2>
            <p className="text-xl text-slate-400 mb-4 max-w-2xl mx-auto leading-relaxed">
              College Taurus ensures your students are not just trained —<br className="hidden md:block" /> they are <strong className="text-white">validated, ranked, and ready to be hired.</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['Higher Placement Performance', 'Stronger Recruiter Partnerships', 'Measurable Employability Index', 'Institution-wide Skill Visibility', 'Competitive Edge in Admissions'].map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  ✔ {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/contact-us')}
                className="bg-white text-black hover:bg-white/90 rounded-full px-10 font-bold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <Mail className="w-5 h-5 mr-2" />
                Partner with College Taurus
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
