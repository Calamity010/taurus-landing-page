
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Zap, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCaseData } from '@/data/useCaseData';
import SavingsSection from '@/components/SavingsSection';

export default function UseCasePage() {
  const { industryId } = useParams();
  const data = useCaseData[industryId || 'education'] || useCaseData['education'];


  return (
    <div className="min-h-screen bg-background font-sans selection:bg-blue-500/30 pt-20">
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-[#0A0A0A] text-white overflow-hidden bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-bold tracking-wide uppercase mb-8">
                 <Star size={14} fill="currentColor" />
                 Rated 5/5 on G2
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                {data.title}
              </h1>
              
              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
                {data.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-400">
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span>Bias-free Hiring</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span>ISO Certified</span>
                  </div>
              </div>
            </motion.div>

            {/* Right Form Card - "See Hyring in action" */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-end"
            >
                <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-t-2xl"></div>
                    
                    <div className="flex items-center gap-2 mb-6 text-white">
                        <span className="text-xl">✨</span>
                        <h3 className="text-2xl font-bold">See Hyring in action</h3>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
                            />
                        </div>
                        <div>
                            <input 
                                type="email" 
                                placeholder="Work Email" 
                                className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
                            />
                        </div>
                        <Button onClick={() => window.location.href = '/contact-us'} className="w-full bg-green-500 hover:bg-green-600 text-[#020b08] font-extrabold h-14 rounded-xl text-lg mt-2 transition-all hover:scale-[1.02]">
                            BOOK A CONSULTATION
                        </Button>
                    </form>
                    <p className="text-center text-xs text-slate-500 mt-4">
                        No credit card required. Free 14-day trial.
                    </p>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-10 border-b border-white/10 bg-background">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Trusted by Global Leaders</p>
              <div className="flex flex-wrap justify-center gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                  {['CNBC', 'Economic Times', 'YourStory', 'Startuppedia', 'Forbes'].map((logo, i) => (
                      <span key={i} className="text-xl md:text-2xl font-serif text-slate-300 font-bold flex items-center">{logo}</span>
                  ))}
              </div>
          </div>
      </section>

      {/* Use Cases - Alternating Feature Blocks */}
      <section className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
              {data.solutions?.map((item: any, i: number) => (
                  <div key={i} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="flex-1 space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
                                <Zap size={24} />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                {item.title}
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                {item.desc}
                            </p>
                            <ul className="space-y-3 pt-4">
                                {['Real-time evaluation', 'Detailed analytic reports', 'Seamless integration'].map((feat, k) => (
                                    <li key={k} className="flex items-center gap-3 text-slate-300 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                      </div>
                      <div className="flex-1 relative">
                          <div className={`absolute top-0 w-full h-full bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-3xl transform ${i % 2 === 0 ? 'rotate-3' : '-rotate-3'} scale-95`}></div>
                          <img 
                            src={data.heroImage} // In a real app, use item specific images
                            alt={item.title} 
                            className="relative rounded-3xl shadow-2xl border border-white/10 w-full object-cover h-[400px]"
                          />
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* Savings Section */}
      <SavingsSection />

      {/* FAQ Section */}
      <section className="py-24 bg-background">
          <div className="max-w-3xl mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                  {data.faqs?.map((faq: any, i: number) => (
                      <div key={i} className="group bg-card hover:bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:shadow-lg transition-all cursor-pointer">
                          <h3 className="text-lg font-bold text-white mb-2 flex justify-between items-center">
                              {faq.question}
                              <ChevronDown className="text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />
                          </h3>
                          <p className="text-slate-400 leading-relaxed hidden group-hover:block transition-all">
                              {faq.answer}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Transform Your {industryId?.replace('-', ' ')} Hiring?</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button onClick={() => window.location.href = '/contact-us'} className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-6 rounded-full font-bold text-lg shadow-xl">
                      Book a Demo
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/contact-us'} className="border-white/30 text-white hover:bg-white/10 px-10 py-6 rounded-full font-bold text-lg">
                      Start Free Trial
                  </Button>
              </div>
          </div>
      </section>

    </div>
  );
}
