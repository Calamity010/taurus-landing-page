import { Search, HelpCircle, MessageCircle, BookOpen, ChevronRight } from 'lucide-react';

const HelpCentrePage = () => {
    return (
        <div className="min-h-screen bg-slate-950 font-sans pt-24 text-white">
            <section className="relative overflow-hidden py-20">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-green-500/20 rounded-full blur-[120px]" />
                <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">How can we help you?</h1>
                    <p className="text-slate-400 text-lg mb-8">Search our knowledge base or browse categories below.</p>
                    
                    <div className="relative max-w-xl mx-auto group">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/30 transition-colors"></div>
                        <input 
                          type="text" 
                          placeholder="Search for answers..."
                          className="relative w-full pl-12 pr-4 py-4 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all shadow-lg"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                    </div>
                </div>
            </section>

            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid md:grid-cols-3 gap-8">
                     {[
                         { 
                            title: "Getting Started", 
                            icon: BookOpen, 
                            items: ["Account Setup", "Inviting Team Members", "Billing & Credits", "Platform Overview"] 
                         },
                         { 
                            title: "Interviews & Screening", 
                            icon: MessageCircle, 
                            items: ["Creating a Job", "Configuring AI Agent", "Reviewing Reports", "Interview Types"] 
                         },
                         { 
                            title: "Troubleshooting", 
                            icon: HelpCircle, 
                            items: ["Audio/Video Issues", "Candidate FAQs", "Browser Support", "Common Errors"] 
                         }
                     ].map((cat, i) => (
                         <div key={i} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 hover:bg-slate-900 transition-all group">
                             <div className="w-12 h-12 bg-green-900/20 text-green-400 rounded-xl flex items-center justify-center mb-6 border border-green-500/20 group-hover:scale-110 transition-transform duration-300">
                                 <cat.icon size={24} />
                             </div>
                             <h3 className="text-xl font-bold text-white mb-6">{cat.title}</h3>
                             <ul className="space-y-4">
                                 {cat.items.map((item, j) => (
                                     <li key={j} className="flex items-center justify-between text-slate-400 hover:text-green-400 cursor-pointer transition-colors group/item">
                                         <span className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover/item:bg-green-500 transition-colors"></span>
                                            {item}
                                         </span>
                                         <ChevronRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                     </li>
                                 ))}
                             </ul>
                         </div>
                     ))}
                 </div>

                 <div className="mt-20 text-center bg-slate-900/50 rounded-2xl p-10 border border-slate-800">
                     <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
                     <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        Can't find the answer you're looking for? Our support team is here to help you get back on track.
                     </p>
                     <a 
                        href="mailto:support@feature.com" 
                        className="inline-flex items-center justify-center px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                     >
                        Contact Support
                     </a>
                 </div>
            </section>
        </div>
    );
};

export default HelpCentrePage;
