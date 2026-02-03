import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, DollarSign, Clock, Users, ArrowRight } from 'lucide-react';

const ROICalculatorPage = () => {
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
    <div className="min-h-screen bg-background font-sans pt-20">
       
       <section className="bg-background border-b border-white/10 py-16">
           <div className="max-w-4xl mx-auto px-4 text-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm font-bold mb-6 border border-green-500/20">
                    <Calculator size={14} />
                    Free Tool
               </div>
               <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                   ROI Calculator
               </h1>
               <p className="text-xl text-slate-400">
                   Measure your hiring time and savings. See how much you can save by switching to AI-driven recruitment.
               </p>
           </div>
       </section>

       <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                
                {/* Inputs */}
                <div className="bg-card p-8 rounded-2xl shadow-lg border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">Input your hiring metrics</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Number of applications to screen</label>
                            <div className="relative">
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
                                className="w-full mt-3 accent-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Average Recruiter Salary (Yearly)</label>
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
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Minutes spent screening one candidate</label>
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
                </div>

                {/* Results */}
                <div className="bg-card text-white p-8 rounded-2xl shadow-xl relative overflow-hidden border border-white/10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
                    
                    <h3 className="text-xl font-bold mb-8 relative z-10">Projected Savings with Hyring</h3>

                    <div className="space-y-8 relative z-10">
                        <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                            <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Total Cost Savings</p>
                            <div className="text-4xl font-bold text-green-400">
                                ${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                            <p className="text-xs text-slate-400 mt-2">vs Manual Screening cost of ${manualScreeningCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>

                        <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                            <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Time Saved</p>
                            <div className="text-4xl font-bold text-blue-400">
                                {Math.round(timeSavedHours).toLocaleString()} Hours
                            </div>
                            <p className="text-xs text-slate-400 mt-2">That's {Math.round(timeSavedHours / 40)} work weeks!</p>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 rounded-xl text-lg mt-4">
                            Start Saving Now <ArrowRight className="ml-2 w-5 h-5"/>
                        </Button>
                    </div>
                </div>

            </div>
       </section>

    </div>
  );
};

export default ROICalculatorPage;
