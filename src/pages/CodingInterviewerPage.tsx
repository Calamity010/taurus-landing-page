
import { Button } from '@/components/ui/button';
import { Code2, Terminal, Play, Cpu, Check, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

const CodingInterviewerPage = () => {
  return (
    <div className="min-h-screen bg-background font-sans pt-20 text-slate-900 selection:bg-blue-500/30">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <Terminal size={14} />
            <span>AI-Powered Technical Assessments</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white"
          >
            Conduct Coding Interviews<br />With <span className="text-blue-500">AI Pilot</span>
          </motion.h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Run live coding interviews with Hyring’s coding interview platform. Automate assessments, get instant scores and hire developers faster.
          </p>

          <div className="flex justify-center gap-4 mb-20">
             <Button onClick={() => window.location.href = '/contact-us'} className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 rounded-full text-lg font-bold shadow-lg shadow-blue-900/50 transition-all transform hover:scale-105">
                Start Free Trial
             </Button>
             <Button variant="outline" onClick={() => window.location.href = '/contact-us'} className="border-slate-600 text-slate-300 hover:bg-slate-800 h-12 px-8 rounded-full text-lg">
                View Demo
             </Button>
          </div>

          {/* IDE Mockup */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0c0c0c] text-white"
          >
             {/* IDE Header */}
             <div className="bg-[#18181b] px-4 py-2 flex items-center justify-between border-b border-black">
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-slate-400">main.py - Hyring IDE</div>
                <div className="w-10"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
                {/* Code Editor */}
                <div className="border-r border-black p-6 font-mono text-sm text-left">
                    <div className="text-slate-500 mb-2">// Task: Implement a function to find the longest substring</div>
                    <div className="text-purple-400">def <span className="text-yellow-300">longest_unique_substring</span>(s):</div>
                    <div className="pl-4 text-slate-300">
                        <span className="text-purple-400">if not</span> s: <span className="text-purple-400">return</span> 0 <br/>
                        seen = {} <br/>
                        start = 0 <br/>
                        max_len = 0 <br/>
                        <br/>
                        <span className="text-purple-400">for</span> i, char <span className="text-purple-400">in</span> enumerate(s): <br/>
                        &nbsp;&nbsp;<span className="text-purple-400">if</span> char <span className="text-purple-400">in</span> seen <span className="text-purple-400">and</span> start &lt;= seen[char]: <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;start = seen[char] + 1 <br/>
                        &nbsp;&nbsp;<span className="text-purple-400">else</span>: <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;max_len = max(max_len, i - start + 1) <br/>
                        &nbsp;&nbsp;seen[char] = i <br/>
                        <br/>
                        <span className="text-purple-400">return</span> max_len
                    </div>
                </div>

                {/* AI Interaction / Output */}
                <div className="bg-[#1a1a1a] flex flex-col">
                    <div className="p-4 border-b border-black bg-[#252526]">
                        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                            <Cpu size={16} className="text-purple-500" /> AI Interviewer
                        </h3>
                    </div>
                    <div className="flex-1 p-4 space-y-4">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center shrink-0 border border-purple-500/30">
                                <Terminal size={14} className="text-purple-300" />
                            </div>
                            <div className="bg-[#2d2d2d] rounded-lg rounded-tl-none p-3 text-sm text-slate-300">
                                Can you explain the time complexity of your solution?
                            </div>
                        </div>
                        <div className="flex gap-3 flex-row-reverse">
                             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold">You</span>
                             </div>
                             <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg rounded-tr-none p-3 text-sm text-slate-300">
                                Yes, it iterates through the string once, so it's O(n).
                             </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center shrink-0 border border-purple-500/30">
                                <Terminal size={14} className="text-purple-300" />
                            </div>
                            <div className="bg-[#2d2d2d] rounded-lg rounded-tl-none p-3 text-sm text-slate-300">
                                Correct! The space complexity is O(min(n, m)) where m is the character set size.
                            </div>
                        </div>
                    </div>
                    
                    {/* Run Controls */}
                    <div className="p-4 border-t border-black bg-[#252526] flex justify-between items-center">
                        <div className="flex gap-2">
                            <span className="text-xs text-green-500 flex items-center gap-1"><Check size={12}/> All Test Cases Passed</span>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                            <Play size={14} /> Run Code
                        </Button>
                    </div>
                </div>
             </div>
          </motion.div>

        </div>
        
        {/* Background Grid - Made subtle/light */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>
      </section>

      {/* Features / How it works */}
      <section className="py-24 bg-background border-t border-white/10 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Choose Coding Interview Platform</h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Transform your technical hiring process with Hyring’s AI coding interviewer. Conduct live coding interviews, evaluate candidates and get detailed reports.
                    </p>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                   <div className="bg-card p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 hover:shadow-lg transition-all">
                       <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                           <Code2 size={24} />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-4">Real-world Coding Environment</h3>
                       <p className="text-slate-400">Support for 30+ languages including Python, Java, C++, and JavaScript with autocomplete and linting.</p>
                   </div>
                   <div className="bg-card p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 hover:shadow-lg transition-all">
                       <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                           <Terminal size={24} />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-4">AI Pair Programming</h3>
                       <p className="text-slate-400">The AI acts as an interviewer, asking follow-up questions about complexity, edge cases, and optimization.</p>
                   </div>
                   <div className="bg-card p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 hover:shadow-lg transition-all">
                       <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                           <ListChecks size={24} />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-4">Automated Grading</h3>
                       <p className="text-slate-400">Get instant scores on correctness, efficiency, code style, and problem-solving approach.</p>
                   </div>
               </div>
          </div>
      </section>
      
      {/* Pricing CTA */}
      <section className="py-20 bg-primary text-center">
            <div className="max-w-4xl mx-auto px-4">
                 <h2 className="text-4xl font-bold text-primary-foreground mb-4">Enterprise-Grade Coding Interview Platform</h2>
                 <p className="text-xl text-primary-foreground/70 mb-8">Pricing starts as low as <strong className="text-white bg-black px-2 py-1 rounded">$1.00</strong> per interview</p>
                 <Button onClick={() => window.location.href = '/contact-us'} className="bg-black text-white hover:bg-black/90 font-bold px-8 py-6 text-lg rounded-full shadow-xl transition-all hover:scale-[1.02]">
                     Transform Your Hiring
                 </Button>
            </div>
      </section>

    </div>
  );
};

export default CodingInterviewerPage;
