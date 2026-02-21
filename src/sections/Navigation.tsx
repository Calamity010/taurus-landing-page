import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const aiAgents = [
  {
    title: "AI Video Interviewer",
    description: "Conducts, records, proctors, and evaluates in a video interview.",
    href: "/ai-agents/video-interviewer"
  },
  // {
  //   title: "AI Phone Screener",
  //   description: "AI conducts phone interviews, evaluates responses, & provides a score to identify the best fit.",
  //   href: "/ai-phone-screener"
  // },
  {
    title: "AI Resume Screener",
    description: "AI screens and analyzes resumes, ranks candidates, and delivers instant insights to highlight the best fit.",
    href: "/ai-resume-screener"
  },
  {
    title: "AI Coding Interviewer",
    description: "AI conducts live coding interviews and delivers powerful data-driven reports.",
    href: "/ai-coding-interviewer"
  },
  {
    title: "AI MCQs",
    description: "Rapidly screen technical knowledge and aptitude with secure, automated assessments.",
    href: "/ai-mcq-interviewer"
  },
  {
    title: "AI System Design Interview",
    description: "Evaluate architectural decisions, scalability, and system components interactively.",
    href: "/ai-system-design-interview"
  }
];

const resourceItems = [
  { title: "Blog", description: "Expert insights on the modern workplace", href: "/resources/blog" },
  { title: "Compare", description: "See how we lead the market", href: "/resources/compare" },
  { title: "Help centre", description: "Instant answers for every feature", href: "/resources/help-centre" },
  { title: "Credits calculator", description: "Plan and optimize your hiring budget", href: "/resources/credits-calculator" },
  { title: "ROI calculator", description: "Measure your hiring time and savings", href: "/resources/roi-calculator" },
  { title: "Code of Conduct", description: "Professional ethics, behavior, and compliance standards", href: "/resources/code-of-conduct" },
  { title: "Remote Work Policy", description: "Guidelines for remote, hybrid, and on-site work arrangements", href: "/resources/remote-work-policy" },
  { title: "Social Media Policy", description: "Rules for responsible employee social media use", href: "/resources/social-media-policy" },
  { title: "Leave Policy", description: "Entitlements for casual, sick, maternity & paternity leave", href: "/resources/leave-policy" },
  { title: "Travel & Expense Policy", description: "Rules for travel authorization and reimbursement", href: "/resources/travel-expense-policy" },
];

const industries = [
  "Education", "Technology",
  "Retail", "BFSI",
  "Manufacturing", "Semiconductors & Hardwares",
  "Healthcare", "EV & Automotive",
  "Hospitality", "Aerospace & Defence",
  "Recruitment Agency", "Big 4"
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl shadow-soft border-b border-white/10 py-2'
            : 'bg-background/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/logo.png" 
                alt="Taurus Logo" 
                className="h-9 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 ml-8">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* AI Agents Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-[15px] font-medium text-slate-300 hover:text-white hover:bg-transparent bg-transparent focus:bg-transparent focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent">
                      AI Agents
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] bg-popover rounded-xl shadow-xl border border-white/10">
                        {aiAgents.map((agent) => (
                          <ListItem key={agent.title} title={agent.title} href={agent.href}>
                            {agent.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <button
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-[15px] font-medium text-slate-300 hover:text-white hover:bg-transparent bg-transparent focus:bg-transparent focus:text-white data-[active]:bg-transparent cursor-pointer"
                        )}
                        onClick={() => navigate('/pricing')}
                      >
                        Pricing
                      </button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                   {/* Resources Dropdown */}
                   <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-[15px] font-medium text-slate-300 hover:text-white hover:bg-transparent bg-transparent focus:bg-transparent focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent">
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] gap-3 p-6 md:w-[700px] lg:w-[800px] grid-cols-2 bg-popover rounded-xl shadow-xl border border-white/10">
                        {resourceItems.map((item) => (
                          <ListItem key={item.title} title={item.title} href={item.href}>
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Use Cases Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-[15px] font-medium text-slate-300 hover:text-white hover:bg-transparent bg-transparent focus:bg-transparent focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent">
                      Use Cases
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-6 md:w-[600px] lg:w-[700px] bg-popover rounded-xl shadow-xl border border-white/10">
                        <div className="mb-6">
                          <h4 className="text-lg font-bold leading-none mb-2 text-white">Industry Use Cases</h4>
                          <p className="text-sm text-slate-400 leading-snug">
                            Discover real-world examples of how our AI transforms hiring across industries.
                          </p>
                        </div>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                          {industries.map((industry) => (
                             <li key={industry}>
                             <NavigationMenuLink asChild>
                               <Link
                                 to={`/use-cases/${industry.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                                 className="flex items-center justify-between select-none rounded-md py-2 leading-none no-underline outline-none transition-colors hover:text-primary text-[15px] font-medium text-slate-300 group/item"
                                 onClick={() => setIsMobileMenuOpen(false)}
                               >
                                 {industry}
                                 {industry === 'Big 4' && <ChevronRight className="h-4 w-4 text-slate-400 group-hover/item:text-primary transition-colors" />}
                               </Link>
                             </NavigationMenuLink>
                           </li>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-white/5 font-medium"
                onClick={() => window.location.href = 'https://hr.thetaurus.ai/auth/login'}
              >
                <User className="w-4 h-4 mr-2" />
                Login
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button 
                onClick={() => navigate('/contact-us')}
                className="bg-primary text-black hover:bg-zinc-200 rounded-full px-6 py-2.5 font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-[280px] bg-background shadow-2xl overflow-y-auto border-l border-white/10"
            >
              <div className="pt-24 px-6 pb-8">
                <div className="flex flex-col gap-2">
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">AI Agents</h3>
                    <div className="flex flex-col gap-2 pl-2">
                       {aiAgents.map((agent) => (
                         <Link key={agent.title} to={agent.href} onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1 block text-sm">{agent.title}</Link>
                      ))}
                    </div>
                  </div>
                  
                  <button onClick={() => navigate('/pricing')} className="px-4 py-2 text-lg font-medium text-slate-300 hover:text-white block text-left w-full">Pricing</button>

                  <div className="px-4 py-2">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Resources</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      {resourceItems.slice(0, 5).map((item) => (
                         <Link key={item.title} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1 block text-sm">{item.title}</Link>
                      ))}
                      <Link to="/resources/blog" className="text-primary text-sm font-medium">View detailed list...</Link>
                    </div>
                  </div>

                  <div className="px-4 py-2">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Use Cases</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      {industries.slice(0, 6).map((industry) => (
                         <Link key={industry} to={`/use-cases/${industry.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`} onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1 block text-sm">{industry}</Link>
                      ))}
                       <Link to="/use-cases/retail" className="text-primary text-sm font-medium">View all industries...</Link>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => window.location.href = 'https://hr.thetaurus.ai/auth/login'}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button 
                    onClick={() => navigate('/contact-us')}
                    className="w-full bg-primary text-black rounded-full hover:bg-zinc-200"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
    // Determine if it's an internal link (Link) or external/hash (a)
    const isInternal = href && !href.startsWith('#') && !href.startsWith('http');
    
    if (isInternal) {
      return (
        <li>
          <NavigationMenuLink asChild>
            <Link
              to={href!}
              className={cn(
                "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
                className
              )}
            >
              <div className="text-[15px] font-semibold leading-none text-white group-hover:text-white transition-colors">{title}</div>
              <p className="line-clamp-2 text-sm leading-relaxed text-slate-400 mt-1.5 font-normal">
                {children}
              </p>
            </Link>
          </NavigationMenuLink>
        </li>
      )
    }

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className
          )}
          {...props}
        >
          <div className="text-[15px] font-semibold leading-none text-white group-hover:text-white transition-colors">{title}</div>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-400 mt-1.5 font-normal">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
