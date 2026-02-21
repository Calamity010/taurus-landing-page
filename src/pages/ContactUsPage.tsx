import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, User, Globe, Building2, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactUsPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-[#0A0A0A] text-white overflow-hidden bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Cloud 1 - Massive, Very Slow */}
          <motion.div
            initial={{ x: '5vw' }}
            animate={{ x: '110vw' }}
            transition={{ repeat: Infinity, duration: 85, ease: "linear" }}
            className="absolute top-[5%] left-0 text-blue-100/30"
          >
            <motion.div
              animate={{ y: [0, -30, 10, -15, 0] }}
              transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
            >
              <Cloud size={300} fill="currentColor" className="blur-2xl" />
            </motion.div>
          </motion.div>

          {/* Cloud 2 - Mid-range */}
          <motion.div
            initial={{ x: '-10vw' }}
            animate={{ x: '100vw' }}
            transition={{ repeat: Infinity, duration: 65, ease: "linear", delay: 5 }}
            className="absolute top-[35%] left-0 text-purple-100/20"
          >
             <motion.div
              animate={{ y: [0, 25, -10, 20, 0] }}
              transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            >
              <Cloud size={240} fill="currentColor" className="blur-xl" />
            </motion.div>
          </motion.div>

          {/* Cloud 3 - Fast, Lower */}
          <motion.div
            initial={{ x: '-20vw' }}
            animate={{ x: '110vw' }}
            transition={{ repeat: Infinity, duration: 95, ease: "linear", delay: 12 }}
            className="absolute bottom-[10%] left-0 text-indigo-100/20"
          >
             <motion.div
              animate={{ y: [0, -40, 0] }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
            >
              <Cloud size={280} fill="currentColor" className="blur-2xl" />
            </motion.div>
          </motion.div>
          
           {/* Cloud 4 - Random small */}
           <motion.div
            initial={{ x: '60vw', y: '20%' }}
            animate={{ x: '-20vw' }}
            transition={{ repeat: Infinity, duration: 75, ease: "linear" }}
            className="absolute top-[15%] right-0 text-blue-50/20"
          >
              <Cloud size={180} fill="currentColor" className="blur-md" />
          </motion.div>
        </div>
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs font-medium text-white/90">We're here to help</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Let's start a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                  conversation.
                </span>
              </h1>
              
              <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                Whether you have questions about our AI, pricing, or need a custom solution, our team is ready to assist you.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300">
                    <Mail className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email us at</p>
                    <p className="text-white font-medium">sales@thetaurus.ai</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300">
                    <Phone className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Call us</p>
                    <p className="text-white font-medium">+91 63634 02404</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Visit HQ</p>
                    <p className="text-white font-medium">Aashvi, 3rd Floor, Channasandra Main Road, Whitefield, Bangalore – 560066</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
               <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                 
                 {isSubmitted ? (
                   <div className="h-[460px] flex flex-col items-center justify-center text-center">
                     <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                       <CheckCircle2 className="w-8 h-8 text-green-500" />
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                     <p className="text-slate-400 max-w-xs">
                       Thank you for reaching out. Our team will get back to you within 24 hours.
                     </p>
                     <Button 
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 bg-white/10 hover:bg-white/20 text-white"
                      >
                        Send another message
                      </Button>
                   </div>
                 ) : (
                   <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                     <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                       <div className="relative">
                         <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                         <Input 
                            value={formState.name}
                            onChange={e => setFormState({...formState, name: e.target.value})}
                            placeholder="John Doe" 
                            className="bg-white/5 border-white/10 text-white pl-10 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl"
                            required
                          />
                       </div>
                     </div>
                     
                     <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-300 ml-1">Work Email</label>
                       <div className="relative">
                         <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                         <Input 
                            type="email"
                            value={formState.email}
                            onChange={e => setFormState({...formState, email: e.target.value})}
                            placeholder="john@company.com" 
                            className="bg-white/5 border-white/10 text-white pl-10 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl"
                            required
                          />
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-300 ml-1">Company</label>
                       <div className="relative">
                         <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                         <Input 
                            value={formState.company}
                            onChange={e => setFormState({...formState, company: e.target.value})}
                            placeholder="Acme Inc." 
                            className="bg-white/5 border-white/10 text-white pl-10 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl"
                          />
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                       <Textarea 
                          value={formState.message}
                          onChange={e => setFormState({...formState, message: e.target.value})}
                          placeholder="How can we help you?" 
                          className="bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20 min-h-[120px] rounded-xl resize-none"
                          required
                        />
                     </div>

                     <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-base shadow-glow transition-all"
                      >
                       {isSubmitting ? (
                         <span className="flex items-center gap-2">
                           <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           Sending...
                         </span>
                       ) : (
                         <span className="flex items-center gap-2">
                           Send Message
                           <Send className="w-4 h-4" />
                         </span>
                       )}
                     </Button>
                   </form>
                 )}
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Global Presence</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Visit our offices</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { city: 'Bangalore', address: 'Aashvi, 3rd Floor, Channasandra Main Road, Whitefield', country: 'Karnataka – 560066, India' },
                { city: 'Phone', address: '+91 63634 02404', country: 'Mon–Sat, 9 AM – 7 PM IST' },
                { city: 'Email', address: 'sales@thetaurus.ai', country: 'Replies within 24 hours' }
              ].map((office) => (
                <motion.div 
                  key={office.city}
                  whileHover={{ y: -5 }}
                  className="bg-secondary p-8 rounded-2xl border border-white/10 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-primary-foreground">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{office.city}</h3>
                  <p className="text-slate-400 mb-1">{office.address}</p>
                  <p className="text-slate-400 text-sm">{office.country}</p>
                </motion.div>
              ))}
            </div>
        </div>
      </section>
    </div>
  );
}
