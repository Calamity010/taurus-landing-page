
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Waveform = () => (
  <div className="absolute inset-0 z-0 flex items-center justify-center gap-[6px] opacity-20 pointer-events-none overflow-hidden h-full">
      {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
              key={i}
              className="w-1.5 bg-slate-800 rounded-full"
              animate={{
                  height: [20, Math.random() * 100 + 20, 20],
              }}
              transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: Math.random() * 2
              }}
              style={{ height: '40px' }}
          />
      ))}
  </div>
);

const PhoneScreenerPage = () => {
return (
  <div className="min-h-screen bg-background font-satoshi relative overflow-hidden pt-20">
       
       {/* Hero Section */}
       <div className="relative z-10">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
               <div className="text-center mb-16 relative">
                  <div className="uppercase tracking-widest text-sm font-bold text-slate-400 mb-4">AI PHONE SCREENER</div>
                  <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
                    Screen 1000 candidates<br />before lunch
                  </h1>
                  <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-4">
                    Automate initial candidate screening with AI phone interview software that calls applicants,<br className="hidden md:block"/> asks role-specific questions, scores responses, and shortlists the best fits.
                  </p>
               </div>

               {/* Waveform Background for Device */}
               <div className="absolute top-1/2 left-0 w-full h-[500px] -translate-y-1/2 z-0">
                  <Waveform />
               </div>

               <div className="flex flex-col items-center relative z-10">
                   
                   {/* The Orange Device UI */}
                   <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-full max-w-[420px]"
                   >
                       {/* Floating Tag */}
                       <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: -100, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          className="absolute top-1/2 -left-32 transform -translate-y-1/2 bg-[#dcfce7] border border-green-200 rounded-lg p-4 shadow-lg flex items-start gap-3 w-64 z-20 hidden lg:flex"
                       >
                           <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1 shrink-0">
                               <Check className="w-4 h-4 text-white font-bold" />
                           </div>
                           <p className="text-sm font-bold text-slate-900 leading-tight">
                               Auto-evaluates and scores based on job fit
                           </p>
                       </motion.div>

                       {/* Orange Device Container */}
                       <div className="bg-[#ff4400] p-6 rounded-[2.5rem] w-full shadow-2xl relative">
                            
                            {/* Camera Lens Graphic */}
                            <div className="absolute top-6 right-6 w-16 h-16 bg-[#cc0000] rounded-2xl flex items-center justify-center shadow-inner border-b-4 border-[#990000]">
                                <div className="w-8 h-8 bg-black rounded-full border-4 border-slate-800 relative">
                                    <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-50"></div>
                                </div>
                            </div>
                            
                            {/* Side Button Graphic */}
                            <div className="absolute top-40 -right-3 w-3 h-24 bg-[#ffcccc] rounded-r-md border-l border-black/10"></div>
                            <div className="absolute top-40 right-6 w-12 h-24 bg-gradient-to-b from-[#ff0000] to-[#cc0000] rounded-lg shadow-lg border-2 border-[#990000] flex items-center justify-center">
                                <div className="w-full h-8 bg-white/20 blur-sm transform rotate-45"></div>
                            </div>


                            {/* Screen Area */}
                            <div className="bg-[#0c0c0c] rounded-[2rem] p-6 pt-10 pb-8 relative overflow-hidden text-white shadow-inner min-h-[500px] flex flex-col">
                                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]"></div>
                                 
                                 <div className="flex items-center gap-2 mb-8 relative z-10">
                                     <span className="text-green-400 text-xl">✨</span>
                                     <h2 className="text-xl font-bold tracking-tight">Try AI Phone Screener</h2>
                                 </div>

                                 <form className="space-y-4 relative z-10 flex-1">
                                     <div>
                                         <input 
                                           type="text" 
                                           placeholder="Name" 
                                           className="w-full bg-[#1e1e1e] border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                                         />
                                     </div>
                                     
                                     <div className="relative">
                                         <select className="w-full bg-[#1e1e1e] border border-gray-700/50 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-green-500 appearance-none cursor-pointer">
                                             <option>Select Job Role</option>
                                             <option>Software Engineer</option>
                                             <option>Sales Representative</option>
                                             <option>Customer Support</option>
                                         </select>
                                         <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                     </div>

                                     <div className="flex gap-2">
                                          <div className="w-24 bg-[#1e1e1e] border border-gray-700/50 rounded-lg px-2 py-3 flex items-center justify-center gap-1 text-gray-300 text-sm">
                                              <span>🇮🇳</span>
                                              <span>+91</span>
                                              <ChevronDown className="w-3 h-3" />
                                          </div>
                                          <input 
                                            type="tel" 
                                            placeholder="Mobile Number" 
                                            className="flex-1 bg-[#1e1e1e] border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                                          />
                                     </div>

                                     <div className="pt-4">
                                          <Button className="w-full bg-[#86efac] hover:bg-[#4ade80] text-slate-900 font-black text-lg h-14 rounded-xl uppercase tracking-wide shadow-lg hover:shadow-green-500/20 transition-all transform hover:scale-[1.02]">
                                              RECEIVE PHONE CALL
                                          </Button>
                                     </div>
                                 </form>
                            </div>
                       </div>
                   </motion.div>

               </div>
           </div>
       </div>

       {/* Social Proof */}
        <div className="py-12 bg-background border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
               <div className="flex items-center gap-2 px-4 py-2 bg-card border border-white/10 rounded-full shadow-sm">
                   <div className="w-6 h-6 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center font-bold">P</div>
                   <span className="font-bold text-white text-sm">#3 Product of the Day</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-card border border-white/10 rounded-full shadow-sm">
                   <div className="w-6 h-6 bg-slate-200 rounded-full text-slate-600 text-xs flex items-center justify-center font-bold">2</div>
                   <span className="font-bold text-white text-sm">#2 Product of the Day</span>
               </div>
            </div>
            <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-8">
              TRUSTED BY MORE THAN 5,000 LEADING HR TEAMS OF ALL SIZES
            </p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
               {['Uber', 'IBM', 'Tencent', 'Meesho', 'Reliance', 'S.K. Rathi'].map((brand) => (
                   <span key={brand} className="text-xl font-bold font-serif text-white flex items-center">{brand}</span>
               ))}
            </div>
          </div>
       </div>

       {/* How it works section */}
        <div className="py-24 bg-background relative">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">How AI Phone Screener works</h2>
                    <p className="text-lg text-slate-400">Automate your screening process in 5 simple steps</p>
                </div>

                <div className="space-y-4">
                    {[
                        { step: "01", title: "Set Language and AI Voice", open: true },
                        { step: "02", title: "Upload Job Description", open: false },
                        { step: "03", title: "Share Interview Link or Phone Invite", open: false },
                        { step: "04", title: "AI Agent Screens Candidate", open: false },
                        { step: "05", title: "Get Screening Report", open: false },
                    ].map((item, idx) => (
                        <div key={idx} className={`border rounded-xl transition-all duration-300 ${item.open ? 'border-green-500 bg-green-900/10' : 'border-white/10 hover:border-white/20'}`}>
                            <div className="p-6 flex items-center justify-between cursor-pointer">
                                <div className="flex items-center gap-6">
                                    <span className={`text-sm font-bold tracking-widest ${item.open ? 'text-green-600' : 'text-slate-400'}`}>{item.step}</span>
                                    <h3 className={`text-xl font-bold ${item.open ? 'text-white' : 'text-slate-400'}`}>{item.title}</h3>
                                </div>
                                {item.open ? <Minus className="w-5 h-5 text-green-600" /> : <Plus className="w-5 h-5 text-slate-400" />}
                            </div>
                            {item.open && (
                                <div className="px-6 pb-6 pl-20">
                                    <p className="text-slate-400 leading-relaxed">
                                        Configure specific languages and choose from our library of natural-sounding AI voices to best represent your company brand.
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
       </div>

       {/* Why Choose Section */}
        <div className="py-24 bg-secondary">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                   <h2 className="text-4xl font-bold text-white mb-6">Why Choose Hyring's AI Phone Screener</h2>
                   <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                       Cut hours of manual screening into minutes with AI phone screening. It helps you find the best candidates instantly.
                   </p>
               </div>
               
               <div className="grid md:grid-cols-3 gap-8">
                   {[
                       { title: "Scale Your Hiring", icon: "🚀", desc: "Screen thousands of candidates simultaneously without lifting a finger." },
                       { title: "Reduce Bias", icon: "⚖️", desc: "Standardized questions and objective scoring ensure every candidate gets a fair chance." },
                       { title: "Save Time", icon: "⏱️", desc: "Skip the repetitive phone screens and jump straight to interviewing qualified candidates." }
                   ].map((feature, i) => (
                       <div key={i} className="bg-card p-8 rounded-2xl shadow-sm border border-white/10 hover:shadow-md transition-shadow">
                           <div className="text-4xl mb-6">{feature.icon}</div>
                           <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                           <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                       </div>
                   ))}
               </div>
           </div>
       </div>

       {/* Pricing Banner */}
       <div className="py-20 bg-slate-900 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/30 skew-x-12 transform translate-x-20"></div>
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
               <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade AI Phone Screener</h2>
               <p className="text-xl text-slate-300 mb-8">Pricing starts as low as <span className="text-green-400 font-bold">$0.50</span> per interview</p>
               <Button className="bg-green-500 hover:bg-green-600 text-slate-900 font-bold px-8 py-6 text-lg rounded-full">
                   Get Started Now
               </Button>
           </div>
       </div>
  </div>
);
};

export default PhoneScreenerPage;
