import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ShieldCheck, BarChart3, MessageSquare, Plus, Minus, ChevronDown, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data to simulate the different agent pages content
const agentData: Record<string, any> = {
  'video-interviewer': {
    title: 'AI Video Interviewer',
    headline: 'AI Video Interviewer',
    subheadline: "Hyring's video interview software helps recruiters hire top talent faster and fairer.",
    description: "Records 🎥, Evaluates 📊, Detects cheating candidates 🕵️‍♀️ with detailed conversational intelligence 💭",
    heroImage: '/dashboard-mockup.png', // Using the generated mock
    features: [
      { title: 'Auto-proctoring', icon: ShieldCheck },
      { title: 'Sentiment Analysis', icon: MessageSquare },
      { title: 'Instant Scoring', icon: BarChart3 }
    ],
    theme: 'light'
  },
  'phone-screener': {
    title: 'AI Phone Screener',
    headline: 'Screen candidates before lunch',
    subheadline: "Automated phone interview software that calls applicants, asks relevant questions, and shortlists the best fits instantly.",
    description: "Conduct thousands of phone screens simultaneously with our natural voice AI.",
    heroImage: null,
    features: [],
    theme: 'light'
  },
  // Default fallback
  'default': {
    title: 'AI Agent',
    headline: 'Automate your hiring',
    subheadline: 'Advanced AI solutions for modern recruitment teams.',
    description: '',
    theme: 'light'
  }
};

const TrustedBy = () => (
  <div className="py-12 bg-white border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-mt-20">
      <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-8">
        TRUSTED BY MORE THAN 5,000 LEADING HR TEAMS OF ALL SIZES
      </p>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
         {/* Placeholder Logos matching the screenshot style */}
         {['Uber', 'IBM', 'Tencent', 'Meesho', 'Reliance', 'S.K. Rathi'].map((brand) => (
             <span key={brand} className="text-xl font-bold font-serif text-slate-800 flex items-center">{brand}</span>
         ))}
      </div>
    </div>
  </div>
);

// --- New Phone Screener Specific Components ---

const Waveform = () => (
    <div className="absolute inset-0 z-0 flex items-center justify-center gap-[6px] opacity-20 pointer-events-none overflow-hidden">
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

const PhoneScreenerHero = () => {
    return (
        <div className="min-h-screen bg-[#f2fcf5] font-satoshi relative overflow-hidden">
             
             {/* Navbar Spacer */}
             <div className="h-20"></div>

             {/* Waveform Background */}
             <Waveform />

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                 <div className="flex flex-col items-center">
                     
                     {/* The Orange Device UI */}
                     <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative"
                     >
                         {/* Floating Tag */}
                         <motion.div 
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: -100, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-1/2 -left-20 transform -translate-y-1/2 bg-[#dcfce7] border border-green-200 rounded-lg p-4 shadow-lg flex items-start gap-3 w-64 z-20 hidden lg:flex"
                         >
                             <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1 shrink-0">
                                 <Check className="w-4 h-4 text-white font-bold" />
                             </div>
                             <p className="text-sm font-bold text-slate-900 leading-tight">
                                 Auto-evaluates and scores based on job fit
                             </p>
                         </motion.div>

                         {/* Orange Device Container */}
                         <div className="bg-[#ff4400] p-6 rounded-[2.5rem] w-full max-w-[420px] mx-auto shadow-2xl relative">
                              
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

             <TrustedBy />

             {/* How it works section */}
             <div className="py-24 bg-white relative">
                  <div className="max-w-4xl mx-auto px-4">
                      <div className="text-center mb-16">
                          <h2 className="text-4xl font-bold text-slate-900 mb-4">How AI Phone Screener works</h2>
                          <p className="text-lg text-slate-500">Automate your screening process in 5 simple steps</p>
                      </div>

                      <div className="space-y-4">
                          {[
                              { step: "01", title: "Set Language and AI Voice", open: true },
                              { step: "02", title: "Upload Job Description", open: false },
                              { step: "03", title: "Share Interview Link or Phone Invite", open: false },
                              { step: "04", title: "AI Agent Screens Candidate", open: false },
                              { step: "05", title: "Get Screening Report", open: false },
                          ].map((item, idx) => (
                              <div key={idx} className={`border rounded-xl transition-all duration-300 ${item.open ? 'border-green-500 bg-green-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                  <div className="p-6 flex items-center justify-between cursor-pointer">
                                      <div className="flex items-center gap-6">
                                          <span className={`text-sm font-bold tracking-widest ${item.open ? 'text-green-600' : 'text-slate-400'}`}>{item.step}</span>
                                          <h3 className={`text-xl font-bold ${item.open ? 'text-slate-900' : 'text-slate-500'}`}>{item.title}</h3>
                                      </div>
                                      {item.open ? <Minus className="w-5 h-5 text-green-600" /> : <Plus className="w-5 h-5 text-slate-400" />}
                                  </div>
                                  {item.open && (
                                      <div className="px-6 pb-6 pl-20">
                                          <p className="text-slate-600 leading-relaxed">
                                              Configure specific languages and choose from our library of natural-sounding AI voices to best represent your company brand.
                                          </p>
                                      </div>
                                  )}
                              </div>
                          ))}
                      </div>
                  </div>
             </div>
        </div>
    );
};


export default function AgentPage() {
  const { agentId } = useParams();
  
  // Custom Render for Phone Screener
  if (agentId === 'phone-screener') {
      return <PhoneScreenerHero />;
  }

  const data = agentData[agentId as string] || agentData['default'];
  const [typedText, setTypedText] = useState('');
  
  // Simple typing effect for the input placeholder
  useEffect(() => {
    if (agentId !== 'video-interviewer') return;
    const text = "Software Engineer...";
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(text.substring(0, i));
      i++;
      if (i > text.length) i = 0; 
    }, 200);
    return () => clearInterval(interval);
  }, [agentId]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 font-satoshi">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
           {/* G2 Badge Strip - mimicking the top banner */}
           <motion.div 
             initial={{ y: -20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-1.5 mb-8"
           >
             <div className="w-5 h-5 bg-red-500 rounded text-xs text-white flex items-center justify-center font-bold">G2</div>
             <span className="text-sm font-medium text-green-800">Named G2 Grid Leader, wins 13 Badges for Summer'25</span>
           </motion.div>

           <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6">
             {data.headline}
           </h1>

           <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4 leading-relaxed">
             {data.subheadline}
           </p>
           
           <div className="flex items-center justify-center gap-4 text-slate-600 mb-12 text-lg">
             {/* Replicating the "Records, Evaluates..." line with icons */}
             <span>Records 🎥</span>
             <span>,</span>
             <span>Evaluates 📊</span>
             <span>,</span>
             <span>Detects cheating 🕵️‍♀️</span>
           </div>

           {/* The Interactive Input Box */}
           <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2 mb-16 transition-transform hover:scale-[1.01] duration-300">
             <div className="pl-4 text-green-500 text-xl">✨</div>
             <div className="text-lg font-mono text-slate-400">I want to hire</div>
             <input 
               type="text" 
               className="flex-1 bg-transparent border-none focus:ring-0 text-lg font-medium text-slate-900 placeholder:text-slate-300"
               placeholder={typedText}
             />
             <Button size="lg" className="rounded-xl px-8 py-6 text-lg bg-[#86efac] hover:bg-[#4ade80] text-slate-900 font-bold shadow-sm transition-all">
               Prepare Simulation
             </Button>
           </div>
        </div>
      </div>

      <TrustedBy />

      {/* Feature Banner Section */}
      <div className="bg-gradient-to-r from-green-400 to-green-300 py-16 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white/20">AICPA</div>
            <div className="flex gap-1 text-orange-500">
               {[1,2,3,4,5].map(i => <Star key={i} className="fill-current w-6 h-6" />)}
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Enterprise-Grade Video Interview Software
          </h2>
          <p className="text-xl text-slate-800/80 font-medium">
            Pricing starts as low as $1.00 per interview
          </p>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] [background-size:24px_24px] opacity-20"></div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">How AI Video Interview Software Works</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Hyring's video interviewing platform conducts human-like interviews that are simple, reliable, and scalable.
            </p>
          </div>

          <motion.div 
             initial={{ y: 40, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white"
          >
             {/* Browser Frame */}
             <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
               <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               <div className="ml-4 bg-white rounded-md px-3 py-1 text-xs text-slate-400 flex-1 max-w-md text-center">
                 app.hyring.com/interviewer
               </div>
             </div>
             
             {/* Dashboard Image */}
             <div className="p-1 bg-slate-50">
                <img 
                  src="/dashboard-mockup.png" 
                  alt="AI Interview Dashboard" 
                  className="w-full h-auto rounded-b-xl"
                />
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
