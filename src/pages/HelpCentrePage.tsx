
import { Search, HelpCircle, MessageCircle, BookOpen } from 'lucide-react';

const HelpCentrePage = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans pt-20">
            <section className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl font-bold mb-6">How can we help you?</h1>
                    
                    <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search for answers..."
                          className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-2xl"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
            </section>

            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid md:grid-cols-3 gap-8">
                     {[
                         { title: "Getting Started", icon: BookOpen, items: ["Account Setup", "Inviting Team Members", "Billing & Credits"] },
                         { title: "Interviews & Screening", icon: MessageCircle, items: ["Creating a Job", "Configuring AI Agent", "Reviewing Reports"] },
                         { title: "Troubleshooting", icon: HelpCircle, items: ["Audio/Video Issues", "Candidate FAQs", "Browser Support"] }
                     ].map((cat, i) => (
                         <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                                 <cat.icon size={24} />
                             </div>
                             <h3 className="text-xl font-bold text-slate-900 mb-4">{cat.title}</h3>
                             <ul className="space-y-3">
                                 {cat.items.map((item, j) => (
                                     <li key={j} className="flex items-center text-slate-600 hover:text-blue-600 cursor-pointer transition-colors">
                                         <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-3"></span>
                                         {item}
                                     </li>
                                 ))}
                             </ul>
                         </div>
                     ))}
                 </div>

                 <div className="mt-16 text-center">
                     <p className="text-slate-500 mb-4">Still need help?</p>
                     <a href="mailto:support@hyring.com" className="text-blue-600 font-bold hover:underline">Contact Support</a>
                 </div>
            </section>
        </div>
    );
};

export default HelpCentrePage;
