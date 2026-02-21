
import { Button } from '@/components/ui/button';
import { Languages, Globe, Mic, Volume2, Award, BookOpen, User } from 'lucide-react';
import { motion } from 'framer-motion';

const EnglishProficiencyPage = () => {
  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             {/* Left Content */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
             >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-900/30 text-orange-400 rounded-full text-sm font-bold mb-6 border border-orange-500/20">
                    <Globe size={16} />
                    Global Hiring
                </div>
                <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
                    English Proficiency Test to Hire <span className="text-orange-500">Best Talent</span>
                </h1>
                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                    Screen candidates faster with Hyring’s AI English Proficiency Test. Assess fluency, grammar, pronunciation & CEFR levels to shortlist interview-ready talent.
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => window.location.href = '/contact-us'} className="bg-orange-600 hover:bg-orange-700 text-white h-14 px-8 rounded-xl text-lg font-bold shadow-lg shadow-orange-200 transition-all">
                        Try for Free
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/contact-us'} className="h-14 px-8 rounded-xl text-lg font-medium border-slate-600 text-slate-300 hover:bg-white/10 hover:text-orange-400">
                        View Sample Report
                    </Button>
                </div>
                
                <div className="mt-12 flex items-center gap-8">
                    {[
                        { label: "CEFR Standard", value: "A1-C2" },
                        { label: "Accuracy", value: "98%" },
                        { label: "Languages", value: "50+" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
             </motion.div>

             {/* Right Graphic - Report Card Mockup */}
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="relative"
             >
                 {/* Decorative Blobs */}
                 <div className="absolute -top-10 -right-10 w-72 h-72 bg-orange-200 rounded-full filter blur-3xl opacity-50"></div>
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-200 rounded-full filter blur-3xl opacity-50"></div>

                 <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-100 relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                     <div className="flex items-start justify-between mb-8">
                         <div className="flex items-center gap-4">
                             <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center">
                                 <User className="w-8 h-8 text-slate-400" />
                             </div>
                             <div>
                                 <h3 className="text-xl font-bold text-slate-900">Candidate Report</h3>
                                 <p className="text-sm text-slate-500">English Communication Skills</p>
                             </div>
                         </div>
                         <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold">
                             C1 - Advanced
                         </div>
                     </div>

                     {/* Scores */}
                     <div className="grid grid-cols-2 gap-4 mb-8">
                         {[
                             { skill: "Fluency", score: 92, icon: Mic, color: "bg-blue-100 text-blue-600" },
                             { skill: "Grammar", score: 88, icon: BookOpen, color: "bg-purple-100 text-purple-600" },
                             { skill: "Pronunciation", score: 94, icon: Volume2, color: "bg-pink-100 text-pink-600" },
                             { skill: "Vocabulary", score: 85, icon: Languages, color: "bg-green-100 text-green-600" },
                         ].map((item, i) => (
                             <div key={i} className="bg-slate-50 p-4 rounded-xl">
                                 <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
                                     <item.icon size={16} />
                                 </div>
                                 <div className="text-2xl font-bold text-slate-900 mb-1">{item.score}/100</div>
                                 <div className="text-xs text-slate-500 font-medium">{item.skill}</div>
                             </div>
                         ))}
                     </div>

                     {/* AI Summary */}
                     <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                         <h4 className="font-bold text-orange-800 text-sm mb-2 flex items-center gap-2">
                             <Award size={16} /> AI Evaluation Summary
                         </h4>
                         <p className="text-sm text-orange-900/80 leading-relaxed">
                             The candidate demonstrates <span className="font-bold">strong fluency</span> and natural pacing. Minor grammatical errors were detected in complex sentence structures, but overall communication is clear and effective for a professional setting.
                         </p>
                     </div>
                 </div>
             </motion.div>
          </div>

        </div>
      </section>

      {/* Skills Assessment */}
      <section className="py-24 bg-background">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Key skills assessed in English Proficiency Test</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Our English proficiency assessment test focuses on five core factors that directly impact job performance.
                        </p>
                        
                        <div className="space-y-6">
                            {[
                                { title: "Fluency", desc: "Assesses ability to speak smoothly without unnecessary pauses." },
                                { title: "Vocabulary", desc: "Evaluates range and accuracy of words used in professional context." },
                                { title: "Pronunciation", desc: "Checks clarity of speech and accent neutrality." },
                                { title: "Grammar", desc: "Tests sentence structure and grammatical correctness." },
                            ].map((skill, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-900/20 flex items-center justify-center shrink-0 text-orange-400 font-bold border border-orange-500/20">
                                        {i+1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{skill.title}</h4>
                                        <p className="text-slate-400 text-sm">{skill.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-card rounded-3xl p-8 border border-white/10">
                         <h3 className="text-xl font-bold text-white mb-4 text-center">Measuring English Proficiency (CEFR)</h3>
                         <div className="space-y-2">
                             {[
                                 { level: "C2", title: "Proficient", color: "bg-green-600" },
                                 { level: "C1", title: "Advanced", color: "bg-green-500" },
                                 { level: "B2", title: "Upper Intermediate", color: "bg-green-400" },
                                 { level: "B1", title: "Intermediate", color: "bg-yellow-500" },
                                 { level: "A2", title: "Elementary", color: "bg-orange-400" },
                                 { level: "A1", title: "Beginner", color: "bg-red-500" },
                             ].map((lvl, i) => (
                                 <div key={i} className="flex items-center gap-4 p-3 bg-background rounded-xl shadow-sm border border-white/5">
                                     <div className={`w-12 h-12 rounded-lg ${lvl.color} text-white flex items-center justify-center font-bold text-xl`}>
                                         {lvl.level}
                                     </div>
                                     <span className="font-medium text-slate-300">{lvl.title}</span>
                                 </div>
                             ))}
                         </div>
                    </div>
               </div>
           </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-slate-900 text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                 <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade Interview Automation</h2>
                 <p className="text-xl text-slate-300 mb-8">Pricing starts as low as <span className="text-orange-400 font-bold">$1.00</span> per interview</p>
                 <Button onClick={() => window.location.href = '/contact-us'} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 text-lg rounded-full">
                     Get Started
                 </Button>
            </div>
      </section>

    </div>
  );
};

export default EnglishProficiencyPage;
