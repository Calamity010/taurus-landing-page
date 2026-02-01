
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeScreenerPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pt-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
              Qualify Applicants <span className="text-blue-600">Instantly</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Accelerate your hiring process with Hyring’s AI resume screener. It evaluates hundreds of resumes and ranks top candidates quickly.
            </p>
          </motion.div>

          {/* Interactive Mock UI */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
              
              {/* Sidebar / Controls */}
              <div className="col-span-1 lg:col-span-4 bg-slate-50 border-r border-slate-200 p-6 flex flex-col">
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Configuration</h3>
                 
                 <div className="space-y-6">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                             <FileText size={16} />
                           </div>
                           <span className="font-semibold text-slate-700">Job Description</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">Senior Software Engineer</p>
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full w-full bg-blue-500"></div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">Must-Have Skills</label>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Node.js', 'TypeScript', 'AWS'].map(skill => (
                                <span key={skill} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-medium text-slate-600 shadow-sm flex items-center gap-1">
                                    {skill} <CheckCircle2 size={12} className="text-green-500" />
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 mt-auto">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all">
                            Upload Resumes
                        </Button>
                        <p className="text-xs text-center text-slate-400 mt-2">.pdf, .docx supported</p>
                    </div>
                 </div>
              </div>

              {/* Main Content / Results */}
              <div className="col-span-1 lg:col-span-8 bg-white p-6 relative">
                 <div className="flex items-center justify-between mb-8">
                     <h3 className="text-lg font-bold text-slate-800">Top Candidates</h3>
                     <div className="flex gap-2">
                         <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">82 Processed</span>
                         <span className="px-3 py-1 bg-slate-50 text-slate-700 rounded-full text-xs font-bold border border-slate-100">3 Shortlisted</span>
                     </div>
                 </div>

                 <div className="space-y-4">
                     {[
                         { name: "Sarah Jenkins", score: 98, role: "Senior Frontend Dev", match: "High Match" },
                         { name: "Michael Chen", score: 95, role: "Full Stack Engineer", match: "High Match" },
                         { name: "David Ross", score: 88, role: "React Developer", match: "Good Match" },
                     ].map((candidate, i) => (
                         <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group cursor-pointer">
                             <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                {candidate.name[0]}
                             </div>
                             <div className="flex-1">
                                 <h4 className="font-bold text-slate-800">{candidate.name}</h4>
                                 <p className="text-xs text-slate-500">{candidate.role}</p>
                             </div>
                             <div className="text-right">
                                 <div className="text-xl font-bold text-blue-600">{candidate.score}%</div>
                                 <div className="text-xs font-medium text-green-600">{candidate.match}</div>
                             </div>
                             <ChevronRight className="text-slate-300 group-hover:text-blue-500" />
                         </div>
                     ))}
                     
                     <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 text-sm">
                        + 79 more candidates processed
                     </div>
                 </div>
              </div>
            </div>
          </motion.div>

        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50/50 rounded-full filter blur-3xl z-0"></div>
      </section>

      {/* Trusted By Section */}
      <div className="py-10 border-y border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by Recruitment Teams at</p>
              <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                  {['Google', 'Microsoft', 'Amazon', 'Spotify', 'Airbnb'].map(brand => (
                      <span key={brand} className="text-xl font-bold font-serif">{brand}</span>
                  ))}
              </div>
          </div>
      </div>

      {/* How it Works */}
       <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 mb-6">How Our Automated Resume Screener Works</h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                      Streamline your resume screening in three simple steps.
                  </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                  {[
                      { step: "01", title: "Upload Job Description", desc: "Add or select a JD. The AI analyzes requirements and creates screening criteria." },
                      { step: "02", title: "Bulk Upload Resumes", desc: "Upload thousands of resumes in seconds. Supports PDF, DOCX, and more." },
                      { step: "03", title: "Get Ranked Shortlist", desc: "AI ranks candidates by relevance, skill match, and experience scores." }
                  ].map((item, i) => (
                      <div key={i} className="relative p-6">
                           <div className="text-6xl font-black text-slate-100 absolute top-0 left-1/2 -translate-x-1/2 -z-10">{item.step}</div>
                           <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                               <FileText size={32} />
                           </div>
                           <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                           <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
       </div>

       {/* Pricing Banner */}
       <div className="py-20 bg-blue-600 text-white relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
               <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade Resume Screening Software</h2>
               <p className="text-xl text-blue-100 mb-8">Pricing starts as low as <span className="bg-white/20 px-2 py-1 rounded text-white font-bold">$1.00</span> per interview</p>
               <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-6 text-lg rounded-full shadow-xl">
                   Start Screening Now
               </Button>
           </div>
       </div>

    </div>
  );
};

export default ResumeScreenerPage;
