import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Users, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  { id: 'resume', name: 'Resume Screener', credit: 0, manualTime: 15, label: 'Resume Screening', free: true },
  { id: 'mcq', name: 'MCQ Assessment', credit: 0.5, manualTime: 20, label: 'MCQ Round', free: false },
  { id: 'verbal', name: 'Verbal Interviewer', credit: 1, manualTime: 30, label: 'Phone Screening', free: false },
  { id: 'coding', name: 'Coding Interviewer', credit: 0.5, manualTime: 60, label: 'Coding Round', free: false },
  { id: 'technical', name: 'Technical Interviewer', credit: 0.5, manualTime: 60, label: 'Technical Round', free: false },
  { id: 'system', name: 'System Design', credit: 1, manualTime: 60, label: 'System Design', free: false },
];

const plans = [
    { name: 'Lite', price: 124, credits: 150 },
    { name: 'Starter', price: 374, credits: 450 },
    { name: 'Growth', price: 2499, credits: 2500 },
    { name: 'Pro', price: 6249, credits: 6000 },
];

export default function ROICalculator() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  
  // State
  const [candidates, setCandidates] = useState<string>('100');
  const [salary, setSalary] = useState<string>('60000');
  const [selectedServices, setSelectedServices] = useState<string[]>(['resume', 'verbal']);

  // Calculations
  const numCandidates = parseInt(candidates) || 0;
  const numSalary = parseInt(salary) || 0;

  const recruiterHourlyRate = numSalary / 2080; // 52 weeks * 40 hours

  // 1. Calculate Manual Cost & Time
  const totalManualMinutes = selectedServices.reduce((acc, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return acc + (service?.manualTime || 0);
  }, 0);

  const totalManualHours = (totalManualMinutes * numCandidates) / 60;
  const manualCost = totalManualHours * recruiterHourlyRate;

  // 2. Calculate AI Cost (Credits)
  const creditsPerCandidate = selectedServices.reduce((acc, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return acc + (service?.credit || 0);
  }, 0);

  const totalCreditsNeeded = creditsPerCandidate * numCandidates;

  // Find best plan
  let recommendedPlan = plans.find(p => p.credits >= totalCreditsNeeded);
  if (!recommendedPlan && totalCreditsNeeded > 0) {
      // If exceeds largest plan, assume multiples of Pro or Enterprise pricing scale
      recommendedPlan = plans[plans.length - 1]; 
  }
  
  // Calculate estimated monthly AI cost based on the recommended plan or scaling
  let aiCost = 0;
  if(recommendedPlan) {
      // If we need more credits than the pro plan, we scale the cost
      if (totalCreditsNeeded > recommendedPlan.credits) {
         const ratio = totalCreditsNeeded / recommendedPlan.credits;
         aiCost = recommendedPlan.price * ratio; 
      } else {
         aiCost = recommendedPlan.price;
      }
  }

  const savings = manualCost - aiCost;
  const savingsPct = manualCost > 0 ? Math.round((savings / manualCost) * 100) : 0;

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };
    
  const handleCandidatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === '' || /^\d+$/.test(val)) {
          setCandidates(val);
      }
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === '' || /^\d+$/.test(val)) {
          setSalary(val);
      }
  };

  return (
    <section id="roi-calculator" ref={ref} className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/5 via-background to-background"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4 border border-primary/20">
                    <Calculator size={14} />
                    Intelligent ROI Calculator
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    See how much you <span className="text-blue-500">save</span>
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Select your hiring stages and see the difference AI makes to your bottom line.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Inputs */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-7 space-y-8"
                >
                    {/* Metrics */}
                    <div className="bg-card p-8 rounded-2xl shadow-lg border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <UsersComponent className="w-5 h-5 text-blue-500"/> 
                            Hiring Volume
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8">
                             <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-3">Candidates per Month</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={candidates}
                                        onChange={handleCandidatesChange}
                                        className="w-full pl-4 pr-4 py-3 bg-secondary border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <input 
                                    type="range" 
                                    min="10" max="5000" step="10"
                                    value={numCandidates} // Use parsed number
                                    onChange={(e) => setCandidates(e.target.value)}
                                    className="w-full mt-3 accent-blue-600 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-3">Recruiter Salary ($/yr)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input 
                                        type="text" 
                                        value={salary}
                                        onChange={handleSalaryChange}
                                        className="w-full pl-8 pr-4 py-3 bg-secondary border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Services Selection */}
                    <div className="bg-card p-8 rounded-2xl shadow-lg border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-green-500"/>
                            Hiring Stages
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {services.map(service => (
                                <div 
                                    key={service.id}
                                    onClick={() => toggleService(service.id)}
                                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                                        selectedServices.includes(service.id) 
                                        ? 'bg-blue-600/10 border-blue-500/50' 
                                        : 'bg-secondary/30 border-white/5 hover:border-white/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                            selectedServices.includes(service.id)
                                            ? 'bg-blue-500 border-blue-500'
                                            : 'border-slate-600 group-hover:border-slate-500'
                                        }`}>
                                            {selectedServices.includes(service.id) && <Check size={12} className="text-white" />}
                                        </div>
                                        <div>
                                            <div className={`font-semibold ${selectedServices.includes(service.id) ? 'text-blue-400' : 'text-slate-300'}`}>
                                                {service.name}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {service.free
                                                  ? <span className="text-green-400 font-bold">Free</span>
                                                  : <>{service.credit} Credit{service.credit !== 1 ? 's' : ''}</>
                                                } • ~{service.manualTime}m manual
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Results */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl shadow-xl border border-white/10 flex flex-col h-full relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -translate-y-40 translate-x-20"></div>
                    
                    <h3 className="text-2xl font-bold text-white mb-8 relative z-10">projected Monthly Savings</h3>

                    <div className="relative z-10 space-y-6 flex-grow">
                        {/* Money Saved */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <div className="flex items-baseline justify-between mb-2">
                                <span className="text-slate-400 font-medium">Net Cost Savings</span>
                                <span className="text-green-400 text-sm font-bold bg-green-400/10 px-2 py-1 rounded-full">
                                    {savingsPct}% Saved
                                </span>
                            </div>
                            <div className="text-5xl font-bold text-white mb-2">
                                ${savings > 0 ? savings.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0}
                            </div>
                            <div className="text-sm text-slate-500 flex justify-between">
                                <span>Manual Cost: ${manualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                <span>AI Cost: ~${Math.round(aiCost).toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Time Saved */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <span className="text-slate-400 font-medium block mb-2">Time Hours Saved</span>
                            <div className="text-4xl font-bold text-blue-400 mb-2">
                                {Math.round(totalManualHours).toLocaleString()} <span className="text-xl text-slate-500 font-normal">hours/mo</span>
                            </div>
                            <p className="text-sm text-slate-500">
                                Equivalent to <span className="text-slate-300 font-semibold">{Math.round(totalManualHours / 160)} full-time recruiters</span>
                            </p>
                        </div>
                        
                        {/* Credits Info */}
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                            <div>
                                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider">Credits Required</div>
                                <div className="text-xl font-bold text-white">{totalCreditsNeeded.toLocaleString()} <span className="text-sm font-normal text-slate-500">/ mo</span></div>
                            </div>
                            <div className="text-right">
                                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider">Recommended Plan</div>
                                <div className="text-xl font-bold text-blue-400">{recommendedPlan ? recommendedPlan.name : 'Enterprise'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 relative z-10">
                         <div className="flex gap-4">
                            <Button 
                                onClick={() => window.location.href = 'https://hr.thetaurus.ai/auth/login'}
                                className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-6 rounded-xl text-lg shadow-lg shadow-green-900/20"
                            >
                                Start Free Trial
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={() => window.location.href = 'https://hr.thetaurus.ai/auth/login'}
                                className="flex-1 border-white/10 hover:bg-white/5 text-white py-6 rounded-xl font-semibold"
                            >
                                Book Demo
                            </Button>
                         </div>
                         <p className="text-center text-xs text-slate-500 mt-4">
                             *Estimates based on industry averages. Actual savings may vary.
                         </p>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
  );
}

// Icon helper
function UsersComponent({ className }: { className?: string }) {
    return <Users className={className} />;
}
