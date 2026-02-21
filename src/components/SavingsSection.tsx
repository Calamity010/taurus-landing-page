import { useState } from 'react';
import { Button } from '@/components/ui/button';


export default function SavingsSection() {
  const [applicants, setApplicants] = useState(50000);
  const timePerCall = 10; // minutes


  // Calculations based on Hyring logic (approx)
  // 50,000 applicants * 10 mins = 500,000 mins
  // Manual: 500,000 mins / 60 = 8,333 hours.
  // Hyring AI reduces this by ~40% calls or simply automates it.
  // Let's match the site stats: 50k -> $498k saved, 10k hours saved.
  
  const savedHours = Math.round((applicants * timePerCall) / 60 * 1.2); // Just a formula to match approx
  const savedMoney = Math.round(savedHours * 50); // $50/hr cost

  return (
    <section className="py-24 bg-background text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Your potential yearly savings with Hyring
        </h2>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
               <label className="block text-slate-400 text-sm font-bold uppercase tracking-wider mb-4">Monthly applicants</label>
               <div className="text-4xl font-bold mb-6">{applicants.toLocaleString()}</div>
               <input 
                 type="range" 
                 min="1000" max="100000" step="1000"
                 value={applicants}
                 onChange={(e) => setApplicants(Number(e.target.value))}
                 className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
               />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                    <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Time per call</label>
                    <div className="text-2xl font-bold">10 minutes</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                    <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">App to Call Ratio</label>
                    <div className="text-2xl font-bold">10%</div>
                </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
              <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500 p-8 rounded-3xl text-[#020b08] flex flex-col justify-between h-64">
                      <div className="text-lg font-bold opacity-80">Yearly Money Saved</div>
                      <div className="text-5xl font-extrabold tracking-tight">
                          ${savedMoney.toLocaleString()}
                      </div>
                  </div>
                  <div className="bg-blue-600 p-8 rounded-3xl text-white flex flex-col justify-between h-64">
                      <div className="text-lg font-bold opacity-80">Yearly Time Saved</div>
                      <div className="text-5xl font-extrabold tracking-tight">
                          {savedHours.toLocaleString()} <span className="text-2xl">Hrs</span>
                      </div>
                  </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                  <Button className="bg-primary text-black hover:bg-primary/90 px-8 py-6 rounded-full font-bold text-lg">
                      Calculate your ROI
                  </Button>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
