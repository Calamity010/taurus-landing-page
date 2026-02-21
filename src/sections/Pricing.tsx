import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Calculator, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const currencies = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83.5 },
  AED: { symbol: 'AED', rate: 3.67 },
  EUR: { symbol: '€', rate: 0.92 },
};

const creditCosts = [
    { service: 'Resume Screener', cost: 1 },
    { service: 'Verbal Interviewer', cost: 1 },
    { service: 'Technical Interviewer', cost: 0.5 },
    { service: 'Coding Interviewer', cost: 0.5 },
    { service: 'System Design Interview', cost: 1 },
    { service: 'MCQ', cost: 0.5 },
];

const plans = [
  {
    name: 'Lite',
    price: 99,
    credits: 20,
    description: 'Billed yearly. All credits granted upfront.',
    features: ['One-way Interview', 'Two-way Interview'],
  },
  {
    name: 'Starter',
    price: 299,
    credits: 70,
    description: 'Billed yearly. All credits granted upfront.',
    popular: true,
    features: ['One-way Interview', 'Two-way Interview', 'AI Coding Interviewer', 'AI MCQs'],
  },
  {
    name: 'Growth',
    price: 1999,
    credits: 600,
    description: 'Billed yearly. All credits granted upfront.',
    features: ['Everything in Starter', 'AI Resume Screener'],
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

export default function Pricing() {
  const [currency] = useState('USD');
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="pricing" className="bg-black py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
                Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Choose the plan that best fits your hiring needs. All plans include access to our AI interview platform.
            </p>
        </motion.div>

        {/* Pricing Table */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isVisible ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="overflow-x-auto"
        >
          <table className="w-full text-left border-collapse">
            <thead>
                <tr>
                    <th className="py-4 px-4 text-lg font-semibold text-white bg-black/80 backdrop-blur sticky left-0 z-20 min-w-[200px]">Features</th>
                    {plans.map((plan) => (
                        <th key={plan.name} className="py-4 px-4 text-center min-w-[200px] align-top">
                            <div className="text-lg font-bold text-white">{plan.name}</div>
                            <div className="text-sm text-gray-400 mt-1">{plan.credits} Credits</div>
                            <div className="text-2xl font-bold text-white mt-2">
                                {typeof plan.price === 'number' 
                                    ? <>{currencies[currency as keyof typeof currencies].symbol}{Math.round(plan.price * currencies[currency as keyof typeof currencies].rate)}</>
                                    : plan.price
                                }
                            </div>
                            {plan.popular && (
                                <span className="inline-block px-2 py-1 text-xs font-semibold text-black bg-white rounded-full mt-2">
                                    Most Popular
                                </span>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
              {['One-way Interview', 'Two-way Interview', 'AI Coding Interviewer', 'AI MCQs', 'AI Phone Screener', 'AI Resume Screener', 'AI System Design Interview'].map(
                (feature) => (
                  <tr key={feature} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-300 bg-black/80 backdrop-blur sticky left-0 z-10 border-r border-white/10 md:border-none drop-shadow-md">{feature}</td>
                    {plans.map((plan) => {
                      const isLite = plan.name === 'Lite';
                      const isGrowth = plan.name === 'Growth';
                      const isPro = plan.name === 'Pro';
                      
                      let hasFeature = false;
                      
                      if (plan.name === 'Enterprise') {
                        hasFeature = true;
                      } else {
                        // Base Features (All Plans)
                        if (feature === 'One-way Interview' || feature === 'Two-way Interview') {
                          hasFeature = true;
                        }
                        // Starter+ Features
                        else if (feature === 'AI Coding Interviewer' || feature === 'AI MCQs') {
                          hasFeature = !isLite;
                        }
                        // Growth+ Features (Resume Screener Only)
                        else if (feature === 'AI Resume Screener') {
                          hasFeature = isGrowth || isPro;
                        }
                        // Pro+ Features (Phone Screener Only)
                        else if (feature === 'AI Phone Screener') {
                          hasFeature = isPro;
                        }
                        // Enterprise Only (System Design)
                        else if (feature === 'AI System Design Interview') {
                          hasFeature = false;
                        }
                      }

                      return (
                        <td key={plan.name} className="text-center py-3 px-4 transition-colors">
                          {hasFeature ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Credit Costs & ROI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Credits Calculator</h3>
            </div>
            <div className="space-y-4">
              {creditCosts.map((item) => (
                <div key={item.service} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-300">{item.service}</span>
                  <span className="font-semibold text-white">
                    {item.cost} credit{item.cost !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">ROI Calculator</h3>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Calculate your potential savings with Taurus AI Interviewer compared to traditional hiring methods. See exactly how much you can save on screening and interviewing time.
            </p>
            <Button 
              className="w-full bg-white text-black hover:bg-gray-200 font-semibold"
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
