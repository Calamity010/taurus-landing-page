import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const CreditsCalculatorPage = () => {
    const [interviews, setInterviews] = useState(500);
    const costPerCredit = 1; // $1
    const totalCost = interviews * costPerCredit;
    
    // Tier logic for discounts (mock)
    const getDiscount = (count: number) => {
        if (count >= 5000) return 0.20;
        if (count >= 1000) return 0.10;
        return 0;
    };

    const discount = getDiscount(interviews);
    const finalCost = totalCost * (1 - discount);
    const savedAmount = totalCost - finalCost;

  return (
    <div className="min-h-screen bg-background font-sans pt-20">
       <section className="bg-background border-b border-white/10 py-16">
           <div className="max-w-4xl mx-auto px-4 text-center">
               <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                   Credits Calculator
               </h1>
               <p className="text-xl text-slate-400 mb-6">
                   Plan and optimize your hiring budget. No hidden fees, pay only for what you use.
               </p>
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold">
                   🎉 Resume Screening is always <span className="font-bold underline">Free</span> — Credits are for AI Interview services only.
               </div>
           </div>
       </section>
        
        <section className="py-20 max-w-4xl mx-auto px-4">
            <div className="bg-card rounded-3xl shadow-xl border border-white/10 p-8 md:p-12">
                <div className="flex flex-col items-center mb-12">
                    <label className="text-lg font-semibold text-slate-300 mb-6">How many interviews do you plan to conduct?</label>
                    
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setInterviews(Math.max(10, interviews - 50))}
                            className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <Minus size={20} />
                        </button>
                        
                        <div className="relative">
                            <input 
                                type="number" 
                                value={interviews}
                                onChange={(e) => setInterviews(Math.max(0, Number(e.target.value)))}
                                className="text-4xl font-bold text-center w-48 border-b-2 border-blue-500 focus:outline-none pb-2 text-white bg-transparent"
                            />
                            <span className="block text-center text-sm text-slate-400 mt-2">Interviews</span>
                        </div>

                        <button 
                            onClick={() => setInterviews(interviews + 50)}
                            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                <div className="bg-secondary/30 rounded-2xl p-8 border border-white/10">
                    <div className="flex justify-between items-center mb-4 text-slate-400">
                         <span>Subtotal ({interviews} credits)</span>
                         <span>${totalCost.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between items-center mb-4 text-green-400 font-medium">
                            <span>Bulk Discount ({(discount * 100).toFixed(0)}%)</span>
                            <span>-${savedAmount.toLocaleString()}</span>
                        </div>
                    )}
                    <div className="h-px bg-white/10 my-4"></div>
                    <div className="flex justify-between items-end">
                        <div>
                             <span className="block text-slate-400 text-sm mb-1">Estimated Cost</span>
                             <span className="text-4xl font-bold text-white">${finalCost.toLocaleString()}</span>
                        </div>
                        <div className="text-right">
                             <span className="block text-slate-400 text-sm mb-1">Cost per interview</span>
                             <span className="text-xl font-bold text-slate-300">${(finalCost/interviews).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <Button className="w-full md:w-auto px-12 py-6 bg-white text-black text-lg rounded-full font-bold hover:bg-slate-200">
                        Buy Credits
                    </Button>
                </div>
            </div>
        </section>

    </div>
  );
};

export default CreditsCalculatorPage;
