
import { GraduationCap, ShoppingBag, Factory, Stethoscope, Coffee, Cpu, Landmark, Car, Plane, Building2, Users } from 'lucide-react';

export const useCaseData: Record<string, any> = {
  'education': {
    title: "Make every academic hire fair and structured",
    subtitle: "Evaluate educators and students with AI Interviewer.",
    icon: GraduationCap,
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "10,000+", label: "Hours Saved Yearly" },
        { value: "$498k", label: "Yearly Savings" },
        { value: "5/5", label: "G2 Rated Leader" }
    ],
    challenges: [
        { title: "Manual Screening", desc: "Screening thousands of student or faculty applications manually is impossible." },
        { title: "Bias in Hiring", desc: "Human bias often creeps into academic evaluations and scholarship grants." },
        { title: "Skill Gaps", desc: "Identifying the precise teaching or learning gaps in students and faculty." }
    ],
    solutions: [
        { title: "Faculty Hiring", desc: "Remote, structured 2-way AI interviews to evaluate subject clarity, teaching style, communication, and technical knowledge." },
        { title: "Mock Interviews for Students", desc: "Scalable AI-evaluated mock interviews to provide skill-gap reports and feedback for student placements." },
        { title: "Scholarship Interviews", desc: "Uses remote AI proctoring and data-driven evaluation to identify merit and potential for scholarship programs." }
    ],
    faqs: [
        { question: "What kind of reports do I get after an interview?", answer: "You receive detailed reports including Technical and Communication scores, complete transcripts, and behavioral insights." },
        { question: "How does the system prevent cheating?", answer: "We use advanced real-time computer vision for proctoring, including gaze detection, person detection, and browser locking features." },
        { question: "What metrics are rated during the interview?", answer: "The AI evaluates candidates on Fluency, Tone, Body Language, Technical Accuracy, and specific Soft Skills." },
        { question: "Can I customize the branding for my institution?", answer: "Yes, we support full white-labeling, allowing you to use your institution's logo, colors, and themes." },
        { question: "What is an AI Twin?", answer: "An AI Twin is a digital avatar that represents your brand or institution during the interview, providing a consistent and personalized experience." }
    ],
    testimonials: [
        { quote: "The structured evaluation helped us identify the best faculty without any bias.", author: "Dean of Academic Affairs" },
        { quote: "Our placement rates improved significantly after using the mock interview tool.", author: "University Placement Officer" }
    ]
  },
  'technology': {
    title: "Hire Top Tech Talent with AI",
    subtitle: "Streamline your technical hiring pipeline with AI coding interviewers and automated assessments.",
    icon: Cpu,
    heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "60%", label: "Faster Tech Hiring" },
        { value: "90%", label: "Code Quality Accuracy" },
        { value: "24/7", label: "Interview Availability" }
    ],
    challenges: [
        { title: "Technical Assessment", desc: "Evaluating code quality requires expensive engineering time." },
        { title: "Rapidly Changing Tech", desc: "Keeping up with new frameworks and languages is difficult." },
        { title: "Candidate Experience", desc: "Long take-home assignments lead to drop-offs." }
    ],
    solutions: [
        { title: "AI Coding Interviewer", desc: "Real-time pair programming interviews with AI." },
        { title: "Instant Feedback", desc: "Candidates get immediate feedback; recruiters get detailed reports." },
        { title: "Plagiarism Detection", desc: "Ensure code originality with advanced AI checks." }
    ],
    faqs: [
        { question: "What programming languages are supported?", answer: "We support over 40+ languages including Python, Java, JavaScript, C++, Go, and Rust." },
        { question: "How do you prevent cheating?", answer: "Our platform monitors tab switching, copy-pasting, and uses AI to detect non-human coding patterns." },
        { question: "Can it assess system design skills?", answer: "Yes, our advanced AI agents can conduct whitespace architecture discussions and system design interviews." }
    ],
    testimonials: [
        { quote: "Our engineering time spent on interviews dropped by 80%.", author: "Mike Chen, CTO at TechFlow" }
    ]
  },
  'retail': {
    title: "Scale Retail Hiring Instantly",
    subtitle: "Handle seasonal spikes and high turnover with automated high-volume screening.",
    icon: ShoppingBag,
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "70%", label: "Less Admin Time" },
        { value: "5x", label: "Faster Seasonal Hiring" },
        { value: "100%", label: "Shift Coverage" }
    ],
    challenges: [
        { title: "High Turnover", desc: "Constant need to replace staff requires a continuous pipeline." },
        { title: "Seasonal Spikes", desc: "Massive hiring needs during holidays overwhelm HR teams." },
        { title: "Soft Skills", desc: "Customer service aptitude is hard to judge from a resume." }
    ],
    solutions: [
        { title: "24/7 Phone Screening", desc: "AI screens candidates anytime, anywhere via phone." },
        { title: "Role-Play Scenarios", desc: "Test customer service skills with AI role-playing agents." },
        { title: "Instant Scheduling", desc: "Qualified candidates are automatically scheduled for manager implementation." }
    ],
    faqs: [
        { question: "Can it handle thousands of applicants at once?", answer: "Yes, our system is built for volume and can screen unmatched numbers of candidates simultaneously." },
        { question: "Does it work for part-time roles?", answer: "Perfectly. You can filter candidates based on their specific shift availability." }
    ],
    testimonials: [
        { quote: "Holiday hiring used to be a nightmare. Now it's on autopilot.", author: "Lisa Ray, VP of Retail Ops" }
    ]
  },
  'manufacturing': {
    title: "Efficient Hiring for Manufacturing",
    subtitle: "Recruit skilled technicians and operators with precision and speed.",
    icon: Factory,
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "45%", label: "Faster Onboarding" },
        { value: "30%", label: "Reduction in Turnover" },
        { value: "100%", label: "Safety Compliance Check" }
    ],
    challenges: [
        { title: "Skills Gap", desc: "Finding candidates with specific technical machine skills." },
        { title: "Safety Compliance", desc: "Ensuring all hires meet strict safety understanding." },
        { title: "Shift Availability", desc: "Matching candidates to specific rotating shift patterns." }
    ],
    solutions: [
        { title: "Technical Knowledge Check", desc: "AI quizzes candidates on machine operations and safety." },
        { title: "Shift Matching", desc: "Automatically screen for availability and shift preferences." },
        { title: "Bulk Processing", desc: "Handle large recruitment drives for new plant openings." }
    ],
     faqs: [
        { question: "Does it cover safety regulations?", answer: "Yes, we include OSHA and ISO safety protocol modules in our screening." },
        { question: "Can it screen for physical requirements?", answer: "The AI verifies candidate capabilities against the physical demands of the job description." }
    ],
    testimonials: [
        { quote: "Turnover dropped 30% because we are finding better-fit candidates.", author: "Gary Oldman, Plant Manager" }
    ]
  },
  'healthcare': {
    title: "Healthcare Recruitment Refined",
    subtitle: "Find compassionate and qualified medical professionals without the burnout.",
    icon: Stethoscope,
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "50%", label: "Faster Credentialing" },
        { value: "24/7", label: "Candidate Screening" },
        { value: "95%", label: "Placement Success" }
    ],
    challenges: [
        { title: "Credentialing", desc: "Verifying licenses and certifications is critical and slow." },
        { title: "Burnout", desc: "Recruiters are overwhelmed by demand for nurses and doctors." },
        { title: "Soft Skills", desc: "Bedside manner is as important as clinical skill." }
    ],
    solutions: [
        { title: "License Verification", desc: "Automated checks against medical board databases." },
        { title: "Empathy Assessment", desc: "AI interviews designed to evaluate bedside manner and empathy." },
        { title: "24/7 Availability", desc: "Screen candidates around their shifting hospital schedules." }
    ],
    faqs: [
        { question: "Is this HIPAA compliant?", answer: "Yes, all data handling meets strict HIPAA compliance standards." },
        { question: "Can it detect empathy?", answer: "Our advanced sentiment analysis evaluates tone and response quality to gauge bedside manner." }
    ],
    testimonials: [
        { quote: "Finally, a way to screen for soft skills before the interview.", author: "Dr. Emily Blunt, Chief of Staff" }
    ]
  },
  'hospitality': {
    title: "Hospitality Hiring Made Easy",
    subtitle: "Staff your hotels and restaurants with candidates who truly understand service.",
    icon: Coffee,
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "60%", label: "Faster Time-to-Hire" },
        { value: "80%", label: "Better Retention" },
        { value: "2min", label: "Screening Time" }
    ],
    challenges: [
        { title: "Communication Skills", desc: "Essential for guest satisfaction but hard to screen on paper." },
        { title: "High Volume", desc: "Opening a new location requires hiring hundreds instantly." },
        { title: "Language barriers", desc: "Need for multi-lingual staff in international locations." }
    ],
    solutions: [
        { title: "Language Proficiency Test", desc: "AI assesses fluency in multiple languages." },
        { title: "Video Interviewing", desc: "See the candidate's energy and presentation before meeting." },
        { title: "Situational Judgment", desc: "Test how candidates handle difficult guest scenarios." }
    ],
    faqs: [
        { question: "Can it test for multiple languages?", answer: "Yes, the AI can switch between languages to test fluency in real-time." },
        { question: "Is video interview mandatory?", answer: "No, you can choose phone-only or text-based screening if preferred." }
    ],
    testimonials: [
        { quote: "We staffed our new resort in record time.", author: "Marco Pierre, Hotel Group CEO" }
    ]
  },
  'recruitment-agency': {
    title: "Supercharge Your Agency",
    subtitle: "Process more clients and close more roles with an AI-powered recruitment engine.",
    icon: Users,
    heroImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "3x", label: "More Placements" },
        { value: "50%", label: "Lower Cost Per Hire" },
        { value: "100%", label: "Client Satisfaction" }
    ],
    challenges: [
        { title: "Client Demands", desc: "Clients want candidates yesterday." },
        { title: "Sourcing Speed", desc: "Beating competitors to the best talent." },
        { title: "Candidate Experience", desc: "Keeping candidates engaged across multiple clients." }
    ],
    solutions: [
        { title: "White-Label AI", desc: "Present AI tools as your own agency's proprietary tech." },
        { title: "Automated Sourcing", desc: "AI scans and ranks candidates from your database instantly." },
        { title: "Rapid Shortlisting", desc: "Send clients a top 10 list within hours, not days." }
    ],
    faqs: [
        { question: "Can we brand this as our own tool?", answer: "Yes, we offer full white-labeling so it looks like your agency's technology." },
        { question: "How is billing handled?", answer: "Flexible credit-based plans allow you to scale based on your client load." }
    ],
    testimonials: [
        { quote: "Hyring allows us to punch above our weight and compete with big firms.", author: "Sarah Connor, Agency Founder" }
    ]
  },
  'bfsi': {
    title: "Secure Hiring for BFSI",
    subtitle: "Recruit finance professionals with confidence, compliance, and speed.",
    icon: Landmark,
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "99%", label: "Compliance Accuracy" },
        { value: "40%", label: "Faster Processing" },
        { value: "Top 1%", label: "Talent Identification" }
    ],
    challenges: [
        { title: "Regulatory Compliance", desc: "Strict hiring standards and background checks." },
        { title: "Technical Skills", desc: "Assessing complex financial modeling and analysis skills." },
        { title: "Trustworthiness", desc: "Ensuring integrity of staff handling money and data." }
    ],
    solutions: [
        { title: "Automated Compliance", desc: "Ensure every hire meets regulatory standards." },
        { title: "Financial Skill Tests", desc: "AI-generated scenarios to test financial acumen." },
        { title: "Behavioral Profiling", desc: "Assess integrity and risk-awareness through AI interviews." }
    ],
    faqs: [
        { question: "How deep are the financial assessments?", answer: "We cover GAAP, IFRS, financial modeling, and risk analysis." },
        { question: "Is data stored securely?", answer: "We use bank-grade encryption and are SOC2 Type II certified." }
    ],
    testimonials: [
        { quote: "The compliance checks alone saved us hundreds of hours.", author: "James Bolton, CFO" }
    ]
  },
  'semiconductors-hardwares': {
    title: "Precision Hiring for Hardware",
    subtitle: "Identify specialized engineering talent for the semiconductor industry.",
    icon: Cpu,
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "40%", label: "Niche Hire Speed" },
        { value: "90%", label: "Technical Fit" },
        { value: "Global", label: "Talent Reach" }
    ],
    challenges: [
        { title: "Niche Skills", desc: "Very specific knowledge (VLSI, FPGA) required." },
        { title: "Global Competition", desc: "Competing for a small pool of global experts." },
        { title: "Academic Verification", desc: "Validating specialized PhD and Masters research." }
    ],
    solutions: [
        { title: "Technical Deep Dives", desc: "AI interviews tailored to specific hardware domains." },
        { title: "Global Headhunting", desc: "Engage candidates across time zones seamlessly." },
        { title: "Research Analysis", desc: "AI summarizes complex academic publications of candidates." }
    ],
    faqs: [
        { question: "Do you cover Verilog/VHDL?", answer: "Yes, our technical agents are Fluent in HDLs and hardware architecture." },
        { question: "Can it screen for R&D roles?", answer: "Absolutely, it can discuss research papers and theoretical concepts." }
    ],
    testimonials: [
        { quote: "Found a Principal Architect in 3 weeks. Unheard of.", author: "An Anand, Engineering VP" }
    ]
  },
  'ev-automotive': {
    title: "Powering the EV Revolution",
    subtitle: "Recruit the engineers and technicians building the future of transportation.",
    icon: Car,
    heroImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "50%", label: "Faster Engineering Hires" },
        { value: "30%", label: "Retention Rate" },
        { value: "100%", label: "Tech Stack Match" }
    ],
    challenges: [
        { title: "Cross-Disciplinary Skills", desc: "Candidates need both mechanical and software knowledge." },
        { title: "Rapid Innovation", desc: "Skills needed today didn't exist 5 years ago." },
        { title: "Scaling Production", desc: "Need to hire for R&D and manufacturing simultaneously." }
    ],
    solutions: [
        { title: "Multi-Domain Testing", desc: "Assess skills across mechanical, electrical, and software." },
        { title: "Adaptive Screening", desc: "AI updates questions based on latest industry trends." },
        { title: "Talent Mapping", desc: "Identify transferable skills from other industries." }
    ],
    faqs: [
        { question: "Does it cover battery tech?", answer: "Yes, specific modules for Li-ion, BMS, and power electronics." },
        { question: "Can it test for embedded software?", answer: "We have specialized AUTOSAR and embedded C/C++ assessment modules." }
    ],
    testimonials: [
        { quote: "Accelerated our R&D roadmap by 6 months.", author: "Elon... just kidding, a happy CEO" }
    ]
  },
  'aerospace-defence': {
    title: "Mission-Critical Recruitment",
    subtitle: "Secure, reliable, and precise hiring for aerospace and defence sectors.",
    icon: Plane,
    heroImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "100%", label: "Security Protocol" },
        { value: "Zero", label: "Compromise" },
        { value: "Elite", label: "Talent Pool" }
    ],
    challenges: [
        { title: "Security Clearance", desc: "Pre-screening for clearance eligibility is difficult." },
        { title: "Specialized Engineering", desc: "Need for extremely niche propulsion and avionics skills." },
        { title: "Long Cycles", desc: "Hiring process can take months, leading to drop-offs." }
    ],
    solutions: [
        { title: "Pre-Clearance Screening", desc: "AI checks for red flags early in the process." },
        { title: "Technical Rigor", desc: "Deep technical interviews for specialized engineering roles." },
        { title: "Process Automation", desc: "Keep candidates engaged during long background checks." }
    ],
    faqs: [
        { question: "Is this ITAR compliant?", answer: "We have specific on-prem deployment options for ITAR compliance." },
        { question: "Can it screen for clearance?", answer: "It can ask pre-qualification questions to determine eligibility." }
    ],
    testimonials: [
        { quote: "Safety and security are paramount. Hyring understands that.", author: "General Mark S." }
    ]
  },
  'big-4': {
    title: "Elite Hiring for Consulting",
    subtitle: "Identify high-potential consultants and auditors for top-tier firms.",
    icon: Building2,
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
    stats: [
        { value: "Top 1%", label: "Talent Selection" },
        { value: "50%", label: "Admin Savings" },
        { value: "Global", label: "Standardization" }
    ],
    challenges: [
        { title: "Case Studies", desc: "Evaluating case study performance at scale is manual." },
        { title: "Cultural Fit", desc: "Finding candidates who thrive in high-pressure environments." },
        { title: "Campus Recruitment", desc: "Screening thousands of graduates efficiently." }
    ],
    solutions: [
        { title: "AI Case Interviews", desc: "AI conducts and scores standard consulting case interviews." },
        { title: "Campus Drives", desc: "Automated tools to handle university recruitment volume." },
        { title: "Soft Skills Analysis", desc: "Identify future leaders with behavioral AI analysis." }
    ],
    faqs: [
        { question: "Can it run case interviews?", answer: "Yes, it presents market sizing and strategy cases and evaluates logic." },
        { question: "Does it handle high volume?", answer: "Designed specifically for campus recruiting seasons." }
    ],
    testimonials: [
        { quote: "We found our top analyst from a non-target school thanks to Hyring.", author: "Partner, Auditing Firm" }
    ]
  }
};
