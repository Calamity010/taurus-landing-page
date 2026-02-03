
import { Button } from '@/components/ui/button';
import { Check, X, Zap } from 'lucide-react';

const ComparePage = () => {
  return (
    <div className="min-h-screen bg-background font-sans pt-20">
       
       <section className="bg-background pb-20 pt-16 border-b border-white/10">
           <div className="max-w-7xl mx-auto px-4 text-center">
               <span className="text-blue-500 font-bold tracking-wider text-sm uppercase mb-4 block">Competitive Landscape</span>
               <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                   Hyring vs. The Rest
               </h1>
               <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
                   Discover why Hyring is the smarter choice for modern recruitment. 
                   <span className="text-white font-semibold block mt-2">2X faster screening compared to others.</span>
               </p>
           </div>
       </section>

       <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-card rounded-3xl shadow-xl overflow-hidden border border-white/10">
               {/* Table Header */}
               <div className="grid grid-cols-12 bg-secondary border-b border-white/10 p-6 items-center">
                   <div className="col-span-4 font-bold text-slate-400 uppercase tracking-widest text-sm">Feature</div>
                   <div className="col-span-4 text-center">
                       <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg">
                           <Zap size={18} fill="currentColor" />
                           <span className="font-bold text-lg">Hyring</span>
                       </div>
                   </div>
                   <div className="col-span-4 text-center text-slate-400 font-bold text-lg">
                       Other Platforms
                   </div>
               </div>

               {/* Rows */}
               {[
                   { feature: "AI Model Accuracy", hyring: "89%", others: "70% (Industry Standard)" },
                   { feature: "Live Proctoring Params", hyring: "10+", others: "3-5" },
                   { feature: "Setup Time", hyring: "2 Minutes", others: "1-2 Weeks" },
                   { feature: "Pricing Model", hyring: "Pay Per Interview", others: "Subscription / Seat" },
                   { feature: "Resume Parsing", hyring: true, others: true },
                   { feature: "AI Voice Agents", hyring: true, others: false },
                   { feature: "Customizable Avatar", hyring: true, others: false },
                   { feature: "Cheating Detection", hyring: "Advanced Computer Vision", others: "Basic Browser Lock" },
               ].map((row, i) => (
                   <div key={i} className={`grid grid-cols-12 p-6 items-center ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'} border-b border-white/5 last:border-0 hover:bg-blue-900/20 transition-colors`}>
                       <div className="col-span-4 font-semibold text-slate-300">{row.feature}</div>
                       <div className="col-span-4 text-center flex justify-center">
                           {row.hyring === true ? (
                               <div className="w-8 h-8 bg-green-900/30 rounded-full flex items-center justify-center text-green-400"><Check size={20} strokeWidth={3} /></div>
                           ) : (
                               <span className="font-bold text-white text-lg">{row.hyring}</span>
                           )}
                       </div>
                       <div className="col-span-4 text-center flex justify-center opacity-60">
                            {row.others === false ? (
                                <div className="w-8 h-8 bg-red-900/30 rounded-full flex items-center justify-center text-red-400"><X size={20} strokeWidth={3} /></div>
                            ) : row.others === true ? (
                                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-slate-400"><Check size={20} /></div>
                            ) : (
                                <span className="font-medium text-slate-400">{row.others}</span>
                            )}
                       </div>
                   </div>
               ))}
           </div>
       </section>
       
       {/* Savings Section */}
       <section className="py-20 bg-secondary text-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h2 className="text-3xl font-bold mb-16">Your potential yearly savings with Hyring</h2>
               
               <div className="grid md:grid-cols-3 gap-8">
                   <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                       <h3 className="text-slate-400 font-medium uppercase tracking-widest text-sm mb-4">Monthly Applicants</h3>
                       <div className="text-5xl font-bold mb-2">50,000</div>
                       <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full mt-4"></div>
                   </div>
                   <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                       <h3 className="text-slate-400 font-medium uppercase tracking-widest text-sm mb-4">Time Saved Per Call</h3>
                       <div className="text-5xl font-bold mb-2">~30 mins</div>
                       <div className="h-1 w-20 bg-green-500 mx-auto rounded-full mt-4"></div>
                   </div>
                   <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                       <h3 className="text-slate-400 font-medium uppercase tracking-widest text-sm mb-4">Cost Savings</h3>
                       <div className="text-5xl font-bold mb-2 text-green-400">$250k+</div>
                       <div className="h-1 w-20 bg-green-500 mx-auto rounded-full mt-4"></div>
                   </div>
               </div>

               <div className="mt-16">
                   <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-full text-lg font-bold shadow-glow">
                       Calculate Your ROI
                   </Button>
               </div>
           </div>
       </section>

    </div>
  );
};

export default ComparePage;
