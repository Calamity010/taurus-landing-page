import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  CheckCircle2, 
  Upload, 
  Loader2, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Star, 
  TrendingUp, 
  Flag, 
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';

// Types for API Response
interface ScreenerResponse {
  status: string;
  data: {
    candidate: {
      name: string;
      email: string;
      phone: string;
      headline: string;
      experienceYears: number;
    };
    scores: {
      atsScore: number;
      skillsScore: number;
      experienceScore: number;
      projectScore: number;
      cultureScore: number;
      totalScore: number;
    };
    skills: {
      matched: string[];
      missing: string[];
      bonus: string[];
    };
    experienceAnalysis: {
      careerGrowth: string;
      jobHoppingRisk: string;
      leadershipSignals: string[];
    };
    redFlags: string[];
    strengths: string[];
    weaknesses: string[];
    recommendation: {
      decision: string;
      confidence: number;
      summary: string;
    };
  };
}

const ResumeScreenerPage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ScreenerResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleScreening = async () => {
    if (!resumeFile || !jobDescription) {
      setError('Please provide both a resume and a job description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const baseUrl = import.meta.env.VITE_API_BACKEND_BASE_URL || 
                      import.meta.env.NEXT_PUBLIC_API_BACKEND_BASE_URL || 
                      'https://equivalent-jade-simpsons-sydney.trycloudflare.com/';
      
      const response = await fetch(`${baseUrl}api/landing-page/resume-screening`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'success') {
        setResults(data);
        // Scroll to results
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setError(data.message || 'Screening failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while connecting to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-12 lg:pt-20 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              AI Resume <span className="text-blue-500">Screener</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Upload a resume and enter a job description to get a detailed ATS analysis, skill mapping, and hiring recommendation in seconds.
            </p>
          </motion.div>

          {/* Interactive Screener Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-[#111] rounded-3xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-xl">
              <div className="p-8 md:p-12 space-y-8">
                
                {/* JD Input */}
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                      <FileText size={20} />
                    </div>
                    <label className="text-lg font-bold text-white">Job Description</label>
                  </div>
                  <Textarea 
                    placeholder="Paste the job requirements, responsibilities, and key skills needed for this role..."
                    className="min-h-[150px] bg-secondary/50 border-white/10 text-white focus:ring-blue-500 focus:border-blue-500 rounded-2xl p-4 resize-none transition-all"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>

                {/* File Upload */}
                <div className="grid md:grid-cols-1 gap-8 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                        <Upload size={20} />
                      </div>
                      <label className="text-lg font-bold text-white">Upload Resume</label>
                    </div>
                    
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
                        resumeFile 
                        ? 'border-green-500/50 bg-green-500/5' 
                        : 'border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5'
                      }`}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                      
                      {resumeFile ? (
                        <motion.div 
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="flex flex-col items-center text-center"
                        >
                          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-4 shadow-lg shadow-green-500/10">
                            <Check size={32} />
                          </div>
                          <p className="text-white font-bold text-lg mb-1">{resumeFile.name}</p>
                          <p className="text-slate-400 text-sm">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Ready for screening</p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setResumeFile(null);
                            }}
                            className="mt-4 text-slate-500 hover:text-red-400 text-sm font-medium transition-colors"
                          >
                            Remove and change
                          </button>
                        </motion.div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                            <Upload size={32} />
                          </div>
                          <p className="text-white font-bold text-lg mb-1">Click to upload or drag & drop</p>
                          <p className="text-slate-400 text-sm">Supports PDF, DOC, DOCX (Max 5MB)</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400"
                    >
                      <AlertCircle size={20} />
                      <p className="text-sm font-medium">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA */}
                <div className="pt-4">
                  <Button 
                    onClick={handleScreening}
                    disabled={isLoading}
                    className={`w-full h-16 rounded-2xl font-black text-xl shadow-2xl transition-all ${
                      isLoading 
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.01] shadow-blue-500/20'
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Analyzing Resume...
                      </span>
                    ) : (
                      'Analyze Now'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {results && (
          <motion.section 
            id="results-section"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-24 bg-background relative overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-black uppercase tracking-widest mb-4 border border-blue-500/20">
                  Screening Results
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white">Detailed Analysis</h2>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Left Column: Candidate & Recommendation */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Candidate Profile */}
                  <div className="bg-[#111] rounded-3xl p-8 border border-white/10 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
                    
                    <div className="flex flex-col items-center text-center mb-8">
                       <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl shadow-blue-500/20">
                          <User size={40} />
                       </div>
                       <h3 className="text-2xl font-bold text-white">{results.data.candidate.name}</h3>
                       <p className="text-blue-400 font-medium">{results.data.candidate.headline}</p>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-white/5 text-slate-300">
                          <Mail size={18} className="text-slate-500" />
                          <span className="text-sm">{results.data.candidate.email}</span>
                       </div>
                       <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-white/5 text-slate-300">
                          <Phone size={18} className="text-slate-500" />
                          <span className="text-sm">{results.data.candidate.phone}</span>
                       </div>
                       <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-white/5 text-slate-300">
                          <TrendingUp size={18} className="text-slate-500" />
                          <span className="text-sm">{results.data.candidate.experienceYears} Years Experience</span>
                       </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl p-8 border border-white/10 shadow-xl border-l-[6px] border-l-blue-500">
                     <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-white">Recommendation</h4>
                        <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase">
                           AI Verified
                        </div>
                     </div>

                     <div className={`text-3xl font-black mb-4 ${
                       results.data.recommendation.decision.toLowerCase().includes('strong') ? 'text-green-500' : 'text-blue-400'
                     }`}>
                        {results.data.recommendation.decision}
                     </div>

                     <div className="space-y-6">
                        <div>
                           <div className="flex justify-between text-sm mb-2">
                              <span className="text-slate-400">AI Confidence</span>
                              <span className="text-white font-bold">{results.data.recommendation.confidence}%</span>
                           </div>
                           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${results.data.recommendation.confidence}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-blue-500"
                              />
                           </div>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed bg-white/5 p-4 rounded-xl italic">
                           "{results.data.recommendation.summary}"
                        </p>

                        <Button 
                          onClick={() => window.location.href = '/contact-us'}
                          className="w-full bg-white text-black font-bold h-12 rounded-xl hover:bg-slate-200"
                        >
                           Schedule Interview
                        </Button>
                     </div>
                  </div>
                </div>

                {/* Right Column: Scores & Skills */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Score Breakdown */}
                  <div className="bg-[#111] rounded-3xl p-8 border border-white/10 shadow-xl">
                    <h4 className="text-xl font-bold text-white mb-8">ATS Score Breakdown</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                       {Object.entries(results.data.scores).map(([key, value], i) => (
                         <div key={key} className="p-6 rounded-2xl bg-secondary/30 border border-white/5 flex flex-col items-center">
                            <div className="relative w-20 h-20 flex items-center justify-center mb-4">
                               <svg className="w-full h-full -rotate-90">
                                 <circle 
                                   cx="40" cy="40" r="36" 
                                   fill="none" 
                                   stroke="currentColor" 
                                   strokeWidth="6" 
                                   className="text-white/5"
                                 />
                                 <motion.circle 
                                   cx="40" cy="40" r="36" 
                                   fill="none" 
                                   stroke="currentColor" 
                                   strokeWidth="6" 
                                   strokeDasharray={226}
                                   initial={{ strokeDashoffset: 226 }}
                                   animate={{ strokeDashoffset: 226 - (226 * value) / 100 }}
                                   transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                                   className={`${key === 'totalScore' ? 'text-blue-500' : 'text-slate-400'}`}
                                 />
                               </svg>
                               <span className={`absolute text-xl font-black ${key === 'totalScore' ? 'text-blue-500' : 'text-white'}`}>
                                 {value}
                               </span>
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                               {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Skills Cloud */}
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="bg-[#111] rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h4 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                           <CheckCircle2 size={20} className="text-green-500" />
                           Matched Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                           {results.data.skills.matched.map(skill => (
                             <span key={skill} className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                                {skill}
                             </span>
                           ))}
                        </div>
                     </div>

                     <div className="bg-[#111] rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h4 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                           <AlertCircle size={20} className="text-red-500" />
                           Missing Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                           {results.data.skills.missing.map(skill => (
                             <span key={skill} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                                {skill}
                             </span>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Deep Analysis */}
                  <div className="grid md:grid-cols-1 gap-8">
                     <div className="bg-[#111] rounded-3xl p-8 border border-white/10 shadow-xl">
                        <h4 className="text-xl font-bold text-white mb-8">Deep Content Analysis</h4>
                        
                        <div className="grid md:grid-cols-2 gap-12">
                           {/* Experience & Signals */}
                           <div className="space-y-8">
                              <div>
                                 <h5 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4 flex items-center gap-2">
                                    <TrendingUp size={14} /> Analysis
                                 </h5>
                                 <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                       <span className="text-slate-400 text-sm">Career Growth</span>
                                       <span className="text-white font-bold text-sm">{results.data.experienceAnalysis.careerGrowth}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                       <span className="text-slate-400 text-sm">Job Hopping Risk</span>
                                       <span className="text-white font-bold text-sm">{results.data.experienceAnalysis.jobHoppingRisk}</span>
                                    </div>
                                 </div>
                              </div>

                              <div>
                                 <h5 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4 flex items-center gap-2">
                                    <Star size={14} /> Leadership Signals
                                 </h5>
                                 <ul className="space-y-2">
                                    {results.data.experienceAnalysis.leadershipSignals.map((sig, i) => (
                                       <li key={i} className="flex gap-3 text-sm text-slate-400">
                                          <Check size={16} className="text-blue-500 shrink-0" />
                                          {sig}
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           </div>

                           {/* Flags & Strengths */}
                           <div className="space-y-8">
                              <div>
                                 <h5 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4 flex items-center gap-2">
                                    <Flag size={14} /> Red Flags
                                 </h5>
                                 <div className="space-y-2">
                                    {results.data.redFlags.length > 0 ? (
                                      results.data.redFlags.map((flag, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 text-red-300 text-sm border border-red-500/10">
                                           <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                           {flag}
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-slate-500 text-sm italic">No red flags detected.</p>
                                    )}
                                 </div>
                              </div>

                              <div className="space-y-4">
                                 <div>
                                    <h5 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-3 text-green-500/70">Top Strengths</h5>
                                    <div className="flex flex-wrap gap-2">
                                       {results.data.strengths.slice(0, 3).map((s, i) => (
                                          <div key={i} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wide">
                                             {s}
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                                 <div>
                                    <h5 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-3 text-red-500/70">Key Weaknesses</h5>
                                    <div className="flex flex-wrap gap-2">
                                       {results.data.weaknesses.slice(0, 3).map((w, i) => (
                                          <div key={i} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wide">
                                             {w}
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Social Bonus Section: If no results, show how it works */}
      {!results && (
        <>
          {/* How it Works */}
          <div className="py-24 bg-background border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-4xl font-bold text-white mb-6">How It Works</h2>
                      <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                          Our AI doesn't just scan for keywords—it understands context, career progression, and technical depth.
                      </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 text-center">
                      {[
                          { step: "01", title: "Upload Job Description", desc: "Paste your requirement. Our AI extracts core skills, experience levels, and company fit markers." },
                          { step: "02", title: "Upload Candidate Resume", desc: "Our parser extracts text from PDF or DOCX, identifying hidden signals and career patterns." },
                          { step: "03", title: "Get Deep Insights", desc: "Receive a comprehensive scorecard with matching skills, missing gaps, and a hiring recommendation." }
                      ].map((item, i) => (
                          <div key={i} className="relative p-6 group">
                               <div className="text-6xl font-black text-white/5 absolute top-0 left-1/2 -translate-x-1/2 -z-10 group-hover:text-blue-500/10 transition-colors">{item.step}</div>
                               <div className="w-16 h-16 bg-blue-900/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                   <FileText size={32} />
                               </div>
                               <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                               <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* Pricing Banner */}
          <div className="py-20 bg-blue-600 text-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Scaling Teams</h2>
                  <p className="text-xl text-blue-100 mb-8">Reduce your screening time by up to 90% with AI-powered candidate ranking.</p>
                  <Button onClick={() => window.location.href = '/contact-us'} className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-6 text-lg rounded-full shadow-xl">
                      Get Early Access
                  </Button>
              </div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
        </>
      )}

    </div>
  );
};

export default ResumeScreenerPage;
