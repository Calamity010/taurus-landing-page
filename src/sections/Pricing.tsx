import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Infinity, ChevronDown, Calculator, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const currencies = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83.5 },
  AED: { symbol: 'AED', rate: 3.67 },
  EUR: { symbol: '€', rate: 0.92 },
};

const plans = [
  {
    name: 'Lite',
    price: 99,
    credits: 20,
    description: 'Billed yearly. All credits granted upfront.',
    features: ['One-way Interview', 'Two-way Interview', 'AI Coding Interviewer'],
  },
  {
    name: 'Starter',
    price: 299,
    credits: 70,
    description: 'Billed yearly. All credits granted upfront.',
    popular: true,
    features: ['One-way Interview', 'Two-way Interview', 'AI Coding Interviewer', 'AI Phone Screener'],
  },
  {
    name: 'Growth',
    price: 1999,
    credits: 600,
    description: 'Billed yearly. All credits granted upfront.',
    features: ['Everything in Starter', 'AI Resume Screener', 'English Proficiency Test'],
  },
  {
    name: 'Pro',
    price: 4999,
    credits: 5000,
    description: 'Billed yearly. All credits granted upfront.',
    features: ['Everything in Growth', 'Priority Support', 'Custom Integrations'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    credits: '10k+',
    description: 'Custom pricing for large teams.',
    features: ['Unlimited everything', 'Dedicated account manager', 'SLA guarantee', 'Custom AI training'],
  },
];

const creditCosts = [
  { service: 'English Proficiency Test', cost: 1 },
  { service: 'AI Resume Screener', cost: 0.25 },
  { service: 'AI Phone Screener', cost: 0.5 },
  { service: 'AI Video Interviewer', cost: 1 },
  { service: 'AI Coding Interviewer', cost: 1 },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);
  const [currency, setCurrency] = useState<keyof typeof currencies>('USD');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const convertPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    const converted = Math.round(price * currencies[currency].rate);
    return `${currencies[currency].symbol}${converted.toLocaleString()}`;
  };

  return (
    <section ref={ref} id="pricing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pricing Plans
          </h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className={`text-sm ${!isAnnual ? 'text-white font-medium' : 'text-slate-400'}`}>
              Pay monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`text-sm ${isAnnual ? 'text-white font-medium' : 'text-slate-400'}`}>
              Pay annually & Save 20%
            </span>
            <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
              + all credits upfront
            </span>
          </div>

          {/* Currency Selector */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-slate-300 hover:bg-secondary/80 transition-colors"
            >
              {currency}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showCurrencyDropdown && (
              <div className="absolute top-full mt-2 left-0 bg-popover rounded-lg shadow-lg border border-white/10 py-1 z-10">
                {Object.keys(currencies).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr as keyof typeof currencies);
                      setShowCurrencyDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-secondary/80"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-card rounded-2xl border-2 p-6 ${
                plan.popular
                  ? 'border-primary shadow-glow'
                  : 'border-white/10 hover:border-white/20'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-black text-xs font-semibold rounded-full">
                  POPULAR
                </div>
              )}

              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white">
                  {convertPrice(typeof plan.price === 'number' && !isAnnual ? plan.price * 1.25 : plan.price)}
                </span>
                {typeof plan.price === 'number' && (
                  <span className="text-slate-500 text-sm">/month</span>
                )}
              </div>
              <p className="text-xs text-slate-500 mb-4">{plan.description}</p>

              <div className="flex items-center gap-2 mb-4 p-2 bg-secondary/50 rounded-lg">
                <span className="text-sm font-semibold text-white">
                  {typeof plan.credits === 'number' ? plan.credits.toLocaleString() : plan.credits}
                </span>
                <span className="text-xs text-slate-500">credits/mo.</span>
              </div>

              <Button
                onClick={() => navigate('/contact-us')}
                className={`w-full mb-4 ${
                  plan.popular
                    ? 'gradient-primary text-black hover:opacity-90'
                    : 'bg-secondary text-slate-300 hover:bg-secondary/80'
                }`}
                variant={plan.popular ? 'default' : 'secondary'}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Contact Us'}
              </Button>

              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                    <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-card rounded-2xl p-6 overflow-x-auto"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-semibold text-white">Features</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="text-center py-3 px-4 text-sm font-semibold text-white">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['One-way Interview', 'Two-way Interview', 'AI Coding Interviewer', 'AI Phone Screener', 'AI Resume Screener', 'English Proficiency Test'].map(
                (feature) => (
                  <tr key={feature} className="border-b border-white/10 last:border-0">
                    <td className="py-3 px-4 text-sm text-slate-300">{feature}</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="text-center py-3 px-4">
                        {plan.name === 'Enterprise' ? (
                          <Infinity className="w-5 h-5 text-indigo-500 mx-auto" />
                        ) : plan.features.some(
                            (f) =>
                              f.includes(feature) ||
                              (feature === 'AI Resume Screener' && plan.name !== 'Lite' && plan.name !== 'Starter') ||
                              (feature === 'English Proficiency Test' && plan.name !== 'Lite' && plan.name !== 'Starter')
                          ) ? (
                          <div className="flex justify-center gap-1">
                            {[...Array(plan.name === 'Lite' ? 1 : plan.name === 'Starter' ? 2 : 3)].map((_, i) => (
                              <div key={i} className="w-1 h-4 bg-primary rounded-full" />
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Credit Costs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid md:grid-cols-2 gap-6"
        >
          <div className="bg-secondary/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-white">Credits Calculator</h3>
            </div>
            <div className="space-y-3">
              {creditCosts.map((item) => (
                <div key={item.service} className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">{item.service}</span>
                  <span className="text-sm font-semibold text-primary">
                    {item.cost} credit{item.cost !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-white">ROI Calculator</h3>
            </div>
            <p className="text-slate-400 mb-4">
              Calculate your potential savings with Taurus AI Interviewer compared to traditional hiring methods.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Calculate ROI
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
