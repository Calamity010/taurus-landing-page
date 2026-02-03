import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does the AI Interviewer handle large volumes of applicants?',
    answer: 'Our AI Interviewer is built on a scalable cloud infrastructure that can handle thousands of concurrent interviews. The system uses advanced load balancing and auto-scaling to ensure smooth performance regardless of the number of applicants. Each interview runs in an isolated environment, ensuring data privacy and consistent performance.',
  },
  {
    question: 'Which tools can the AI Interviewer integrate with?',
    answer: 'Taurus integrates seamlessly with popular ATS platforms including Greenhouse, Lever, Workday, and BambooHR. We also support integrations with calendar systems like Google Calendar and Outlook, communication tools like Slack and Microsoft Teams, and video conferencing platforms. Our API allows for custom integrations with your existing HR tech stack.',
  },
  {
    question: 'Do you offer a free trial for your AI recruiting software?',
    answer: 'Yes! We offer a 14-day free trial with full access to all features. You can conduct up to 10 interviews during the trial period. No credit card is required to start. Our team will also provide a personalized onboarding session to help you get the most out of the platform.',
  },
  {
    question: 'Is Taurus SOC 2 Type 2 compliant?',
    answer: 'Yes, Taurus is SOC 2 Type 2 certified. We undergo regular third-party audits to ensure we meet the highest standards for security, availability, processing integrity, confidentiality, and privacy. We are also GDPR compliant and follow strict data protection protocols.',
  },
  {
    question: 'How many programming languages are supported?',
    answer: 'Our AI Coding Interviewer supports over 30 programming languages including Python, JavaScript, Java, C++, C#, Go, Ruby, PHP, Swift, Kotlin, Rust, and more. We regularly add support for new languages based on customer demand and industry trends.',
  },
  {
    question: 'What is the difference between a One-way and a Two-way interview?',
    answer: 'One-way interviews are asynchronous where candidates record their responses to pre-set questions at their convenience. Two-way interviews are live, real-time conversations between the AI interviewer and the candidate. One-way interviews are great for initial screening, while two-way interviews provide a more interactive experience for later stages.',
  },
  {
    question: 'How does the AI Resume Screener rank candidates?',
    answer: 'Our AI Resume Screener uses a multi-factor scoring algorithm that evaluates candidates based on skills match, experience relevance, education, project history, and cultural fit indicators. The system assigns a match score (0-100) and provides detailed reasoning for each score, helping recruiters make informed decisions.',
  },
  {
    question: 'What types of coding tasks can I conduct in the coding interviews?',
    answer: 'You can conduct a variety of coding assessments including algorithmic problems, data structure challenges, system design questions, debugging exercises, and language-specific tasks. Our platform supports live coding with real-time execution, automated test cases, and AI-powered code quality analysis.',
  },
];

export default function FAQ() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} id="faq" className="py-20 bg-secondary/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-white/10 px-6 data-[state=open]:shadow-soft transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-white hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
