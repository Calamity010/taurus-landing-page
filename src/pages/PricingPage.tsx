import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, 
  Minus, 
  ChevronDown, 
  FileVideo, 
  Languages, 
  Code, 
  Mic, 
  FileText,
  Layout,
  ListChecks
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TrustedCompanies from '@/sections/TrustedCompanies';

const currencies = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83.5 },
  AED: { symbol: 'AED', rate: 3.67 },
  EUR: { symbol: '€', rate: 0.92 },
};

const plans = [
  {
    name: 'Lite',
    monthlyPrice: 124,
    yearlyPrice: 99,
    credits: 20,
    users: 1,
    jobs: 1,
    description: 'Perfect for small teams hiring occasionally.',
    features: ['20 Credits / month', '1 User license', '1 Active job post', 'Email support'],
  },
  {
    name: 'Starter',
    monthlyPrice: 374,
    yearlyPrice: 299,
    credits: 70,
    users: 5,
    jobs: 3,
    description: 'For growing teams with regular hiring needs.',
    features: ['70 Credits / month', '5 User licenses', '3 Active job posts', 'Priority email support'],
    popular: true,
  },
  {
    name: 'Growth',
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    credits: 600,
    users: 20,
    jobs: 20,
    description: 'Scale your hiring with advanced automation.',
    features: ['600 Credits / month', '20 User licenses', '20 Active job posts', 'Dedicated account manager'],
  },
  {
    name: 'Pro',
    monthlyPrice: 6249,
    yearlyPrice: 4999,
    credits: 5000,
    users: 50,
    jobs: 'Unlimited',
    description: 'Maximum power for high-volume recruitment.',
    features: ['5000 Credits / month', '50 User licenses', 'Unlimited job posts', '24/7 Priority support'],
  },
  {
    name: 'Enterprise',
    isCustom: true,
    description: 'Tailored solutions for large organizations.',
    features: ['10,000+ Credits', 'Unlimited users', 'Unlimited job posts', 'Custom AI training', 'SLA & dedicated success mgr'],
  },
];

const features = [
  {
    category: 'General',
    items: [
      { name: 'Users', key: 'users', type: 'text' },
      { name: 'Active Job Posts', key: 'jobs', type: 'text' },
      { name: 'Video Retention', values: ['30 days', '90 days', '180 days', '365 days', 'Unlimited'] },
      { name: 'Interview Duration', values: ['30 mins', '45 mins', '60 mins', '90 mins', 'Unlimited'] },
    ]
  },
  {
    category: 'AI Video Interviewer',
    icon: FileVideo,
    items: [
      { name: 'AI Twin Interviewer', access: ['all'] },
      { name: 'Sentiment Analysis', access: ['all'] },
      { name: 'Communication Score', access: ['all'] },
      { name: 'AI Avatar Customization', access: ['growth', 'pro', 'enterprise'] },
      { name: 'Multilingual Support', access: ['growth', 'pro', 'enterprise'] },
      { name: 'Integrity Checks', access: ['all'] },
      { name: 'Technical Score', access: ['all'] },
    ]
  },
  {
    category: 'AI Phone Screener',
    icon: Mic,
    items: [
      { name: 'AI Voice Interaction', access: ['starter', 'growth', 'pro', 'enterprise'] },
      { name: 'Bulk Candidate Invite', access: ['starter', 'growth', 'pro', 'enterprise'] },
      { name: 'Screening Score', access: ['starter', 'growth', 'pro', 'enterprise'] },
      { name: 'Voice Recording', access: ['starter', 'growth', 'pro', 'enterprise'] },
      { name: 'Detailed Transcripts', access: ['starter', 'growth', 'pro', 'enterprise'] },
    ]
  },
  {
    category: 'AI Resume Screener',
    icon: FileText,
    items: [
      { name: 'AI Summary', access: ['growth', 'pro', 'enterprise'] },
      { name: 'Resume Parsing', access: ['growth', 'pro', 'enterprise'] },
      { name: 'Auto Ranking', access: ['growth', 'pro', 'enterprise'] },
      { name: 'Fit Score', access: ['growth', 'pro', 'enterprise'] },
    ]
  },
  {
    category: 'English Proficiency (Verbal)',
    icon: Languages,
    items: [
      { name: 'Grammar Analysis', access: ['growth', 'pro', 'enterprise'] },
      { name: 'Vocabulary Assessment', access: ['growth', 'pro', 'enterprise'] },
      { name: 'Pronunciation Check', access: ['growth', 'pro', 'enterprise'] },
    ]
  },
  {
    category: 'AI Coding Interviewer',
    icon: Code,
    items: [
      { name: '30+ Coding Languages', access: ['all'] },
      { name: 'Plagiarism Check', access: ['all'] },
      { name: 'Code Playback', access: ['all'] },
      { name: 'Auto-Grading', access: ['all'] },
    ]
  }
];

const creditCosts = [
  { service: 'Resume Screener', cost: 1, icon: FileText },
  { service: 'Verbal Interviewer', cost: 1, icon: Mic },
  { service: 'Technical Interviewer', cost: 0.5, icon: FileVideo },
  { service: 'Coding Interviewer', cost: 0.5, icon: Code },
  { service: 'System Design Interview', cost: 1, icon: Layout },
  { service: 'MCQ', cost: 0.5, icon: ListChecks },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);
  const [currency, setCurrency] = useState<keyof typeof currencies>('USD');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  
  // ROI Calculator State
  const [applicants, setApplicants] = useState([100]);
  const [timePerScreen, setTimePerScreen] = useState([30]);
  const hourlyRate = 50; // Assumed hourly rate for recruiter

  const calculateROI = () => {
    const traditionalTime = applicants[0] * timePerScreen[0]; // minutes
    const aiTime = applicants[0] * 5; // AI takes ~5 mins per candidate review
    const timeSaved = traditionalTime - aiTime;
    const hoursSaved = timeSaved / 60;
    const moneySaved = hoursSaved * hourlyRate;
    return { hoursSaved: Math.round(hoursSaved), moneySaved: Math.round(moneySaved) };
  };

  const roi = calculateROI();

  const convertPrice = (price: number) => {
    const converted = Math.round(price * currencies[currency].rate);
    return `${currencies[currency].symbol}${converted.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 bg-[#0A0A0A] text-white overflow-hidden bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Heavy on the features,<br />
              <span className="text-blue-500">light on your budget.</span>
            </h1>
            
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
              Simple, transparent pricing. No hidden fees. 
              Start for free and scale as you grow.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#222] hover:bg-[#333] border border-white/10 rounded-lg text-sm font-medium text-white transition-all shadow-lg"
                >
                  {currency} ({currencies[currency].symbol})
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                {showCurrencyDropdown && (
                  <div className="absolute top-full mt-2 left-0 bg-[#222] border border-white/10 rounded-xl shadow-xl z-50 min-w-[120px] overflow-hidden">
                    {Object.keys(currencies).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr as keyof typeof currencies);
                          setShowCurrencyDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center gap-4 bg-[#222] px-5 py-2 rounded-full border border-white/10 shadow-lg">
                <span className={`text-sm ${!isAnnual ? 'text-white font-medium' : 'text-slate-400'}`}>
                  Pay monthly
                </span>
                <Switch 
                    checked={isAnnual} 
                    onCheckedChange={setIsAnnual} 
                    className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-600"
                />
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isAnnual ? 'text-white font-medium' : 'text-slate-400'}`}>
                    Pay annually
                  </span>
                  <span className="text-[10px] uppercase bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full tracking-wide border border-green-500/30">
                    Save 20%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative bg-card rounded-2xl p-6 border-2 flex flex-col ${
                plan.popular ? 'border-primary shadow-glow ring-2 ring-primary/20' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.description}</p>
              </div>

              <div className="mb-6">
                {plan.isCustom ? (
                  <span className="text-3xl font-bold text-white">Custom</span>
                ) : (
                  <div>
                    <span className="text-3xl font-bold text-white">
                      {convertPrice(isAnnual ? plan.yearlyPrice! : plan.monthlyPrice!)}
                    </span>
                    <span className="text-sm text-slate-400">/mo</span>
                    {isAnnual && (
                      <div className="text-xs text-slate-400 mt-1">Billed annually</div>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-6 bg-secondary/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400 font-medium">Credits</span>
                  <span className="text-sm font-bold text-white">{typeof plan.credits === 'number' ? plan.credits.toLocaleString() : plan.credits}</span>
                </div>
                {!plan.isCustom && (
                  <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${Math.min((plan.credits as number) / 60, 100)}%` }}
                    />
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <Check className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => navigate('/contact-us')}
                variant={plan.popular ? 'default' : 'outline'}
                className={`w-full ${plan.popular ? 'bg-primary text-black hover:bg-primary/90' : 'text-white border-white/20 hover:bg-white/10 hover:text-white'}`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Contact Us'}
              </Button>
            </div>
          ))}
        </div>

        <TrustedCompanies />

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Compare Features</h2>
          
          <div className="bg-card rounded-2xl shadow-sm border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-secondary/20 border-b border-white/10">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white w-1/4">Features</th>
                    {plans.map(p => (
                      <th key={p.name} className="py-4 px-4 text-sm font-semibold text-white text-center w-[15%]">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {features.map((section) => (
                    <>
                      <tr key={section.category} className="bg-secondary/10">
                        <td colSpan={6} className="py-3 px-6 text-sm font-bold text-white flex items-center gap-2">
                          {section.icon && <section.icon className="w-4 h-4 text-primary" />}
                          {section.category}
                        </td>
                      </tr>
                      {section.items.map((item, iIdx) => (
                        <tr key={iIdx} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 text-sm text-slate-400">
                            {item.name}
                          </td>
                          {plans.map((plan, pIdx) => {
                            // Check explicit values first
                            if ('values' in item && item.values) {
                              return (
                                <td key={plan.name} className="py-4 px-4 text-sm text-white text-center font-medium">
                                  {item.values[pIdx]}
                                </td>
                              );
                            }
                            // Check text type (Users, Jobs)
                            if ('key' in item) {
                                let val = plan[item.key as keyof typeof plan];
                                return (
                                    <td key={plan.name} className="py-4 px-4 text-sm text-white text-center font-medium">
                                        {val}
                                    </td>
                                )
                            }
                            // Check access array
                            const hasAccess = 'access' in item && (item.access.includes('all') || item.access.includes(plan.name.toLowerCase()));
                            return (
                              <td key={plan.name} className="py-4 px-4 text-center">
                                {hasAccess ? (
                                  <div className="flex justify-center">
                                    <Check className="w-5 h-5 text-green-500" />
                                  </div>
                                ) : (
                                  <div className="flex justify-center">
                                    <Minus className="w-5 h-5 text-slate-600" />
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Calculators Section */}
        <div id="calculators" className="max-w-4xl mx-auto">
          <Tabs defaultValue="credits" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-card p-1 rounded-full border border-white/10 shadow-sm">
                <TabsTrigger value="credits" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-black text-slate-400">Credits Calculator</TabsTrigger>
                <TabsTrigger value="roi" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-black text-slate-400">ROI Calculator</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="credits">
              <div className="bg-card rounded-2xl p-8 border border-white/10 shadow-sm">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Credits Consumed per Service</h3>
                  <p className="text-slate-400">Understand how your credits are utilized across different AI services.</p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {creditCosts.map((item) => (
                    <div key={item.service} className="bg-secondary/20 p-6 rounded-xl border border-white/5 hover:border-primary/20 transition-colors">
                      <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-white mb-1">{item.service}</h4>
                      <p className="text-2xl font-bold text-primary">{item.cost} <span className="text-sm font-normal text-slate-400">Credit{item.cost !== 1 && 's'}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="roi">
              <div className="bg-card rounded-2xl p-8 border border-white/10 shadow-sm">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Estimate your Savings</h3>
                    
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-sm font-medium text-slate-300">Monthly Applicants</label>
                          <span className="text-primary font-bold">{applicants[0]}</span>
                        </div>
                        <Slider 
                          value={applicants} 
                          onValueChange={setApplicants} 
                          max={1000} 
                          step={10} 
                          className="w-full"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-sm font-medium text-slate-300">Time per Screen (mins)</label>
                          <span className="text-primary font-bold">{timePerScreen[0]} mins</span>
                        </div>
                        <Slider 
                          value={timePerScreen} 
                          onValueChange={setTimePerScreen} 
                          max={60} 
                          step={5} 
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white rounded-xl p-8 flex flex-col justify-center">
                    <div className="mb-8">
                      <p className="text-slate-400 text-sm mb-1">Time Saved Monthly</p>
                      <p className="text-4xl font-bold text-emerald-400">{roi.hoursSaved} Hours</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Money Saved Monthly</p>
                      <p className="text-4xl font-bold text-emerald-400">${roi.moneySaved.toLocaleString()}</p>
                      <p className="text-slate-500 text-xs mt-2">*Based on estimated $50/hr recruiter cost</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-primary rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Ready to transform your hiring?</h2>
                <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8 text-lg">
                    Join thousands of companies using our AI to hire better talent, faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" className="font-bold bg-white text-black hover:bg-white/90">
                        Start Free Trial
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                        Book Demo
                    </Button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
