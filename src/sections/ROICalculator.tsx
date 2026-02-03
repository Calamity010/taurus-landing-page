import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, DollarSign, Clock, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ROICalculator() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [applicants, setApplicants] = useState(1000);
  const [salary, setSalary] = useState(60000);
  const [screenTime, setScreenTime] = useState(30); // minutes

  // Simple calculation logic
  const recruiterHourlyRate = salary / 2080; // approx working hours/year
  const manualScreeningCost = applicants * (screenTime / 60) * recruiterHourlyRate;
  const aiCost = applicants * 1.00; // $1 per interview
  const savings = manualScreeningCost - aiCost;
  const timeSavedHours = applicants * (screenTime / 60);

  return (
    <section id="roi-calculator" ref={ref} className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4 border border-primary/20">
                    <Calculator size={14} />
                    ROI Calculator
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Calculate your <span className="text-blue-500">Savings</span>
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    See how much time and money you can save by switching to Taurus AI-driven recruitment.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Inputs */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-card p-8 rounded-2xl shadow-lg border border-white/10 h-full flex flex-col"
                >
                    <h3 className="text-xl font-bold text-white mb-8">Input your metrics</h3>
                    
                    <div className="space-y-8 flex-1 flex flex-col justify-center">
                        <div>
                            <div className="flex justify-between mb-3">
                                <label className="text-sm font-semibold text-slate-300">Number of applications</label>
                                <span className="text-sm font-bold text-blue-400">{applicants}</span>
                            </div>
                            <div className="relative mb-2">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"/>
                                <input 
                                    type="number" 
                                    value={applicants}
                                    onChange={(e) => setApplicants(Number(e.target.value))}
                                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <input 
                                type="range" 
                                min="100" max="10000" step="100"
                                value={applicants}
                                onChange={(e) => setApplicants(Number(e.target.value))}
                                className="w-full accent-blue-600 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Recruiter Annual Salary ($)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"/>
                                <input 
                                    type="number" 
                                    value={salary}
                                    onChange={(e) => setSalary(Number(e.target.value))}
                                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Screening Time per Candidate (Minutes)</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"/>
                                <input 
                                    type="number" 
                                    value={screenTime}
                                    onChange={(e) => setScreenTime(Number(e.target.value))}
                                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Results */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-card text-white p-8 rounded-2xl shadow-xl relative overflow-hidden border border-white/10 h-full flex flex-col justify-between"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
                    
                    <h3 className="text-xl font-bold mb-8 relative z-10">Estimated Savings</h3>

                    <div className="space-y-6 relative z-10 flex-1">
                        <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                            <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-semibold">Total Cost Savings</p>
                            <div className="text-5xl font-bold text-green-400">
                                ${savings > 0 ? savings.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0}
                            </div>
                            <p className="text-xs text-slate-400 mt-2">vs Manual Screening cost of ${manualScreeningCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>

                        <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                            <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-semibold">Time Saved</p>
                            <div className="text-5xl font-bold text-blue-400">
                                {Math.round(timeSavedHours).toLocaleString()} <span className="text-2xl text-slate-500 font-normal">hours</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">That's approximately {Math.round(timeSavedHours / 40)} work weeks saved!</p>
                        </div>
                    </div>

                    <div className="mt-8 relative z-10">
                        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 rounded-xl text-lg shadow-lg shadow-blue-900/20">
                            Start Saving Now <ArrowRight className="ml-2 w-5 h-5"/>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
  );
}
