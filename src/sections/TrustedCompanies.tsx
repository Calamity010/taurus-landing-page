import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const companies = [
  { name: 'NOBROKER', display: 'NOBROKER' },
  { name: 'IBM', display: 'IBM' },
  { name: 'Uber', display: 'Uber' },
  { name: 'Whatfix', display: 'Whatfix' },
  { name: 'Cuemath', display: 'Cuemath' },
  { name: 'OPENCARE', display: 'OPENCARE' },
  { name: 'WORLDLINE', display: 'WORLDLINE' },
  { name: 'Tencent', display: 'Tencent' },
  { name: 'masai', display: 'masai' },
  { name: 'abbvie', display: 'abbvie' },
  { name: 'klenty', display: 'klenty' },
  { name: 'ParentPay', display: 'ParentPay' },
  { name: 'SOBHA', display: 'SOBHA' },
  { name: 'TCS', display: 'TCS' },
  { name: 'S.K. Rathi', display: 'S.K. Rathi & Co.' },
  { name: 'Reliance', display: 'Reliance' },
  { name: 'SAINT-GOBAIN', display: 'SAINT-GOBAIN' },
  { name: 'Forage AI', display: 'Forage AI' },
  { name: 'meesho', display: 'meesho' },
  { name: 'HINDUJA', display: 'HINDUJA TECH' },
];

export default function TrustedCompanies() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Trusted by more than 5,000 leading HR teams of all sizes
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Teams choose Taurus&apos;s AI interview software to make interviews simple, structured, and deliver a better candidate experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-8 items-center"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="flex items-center justify-center group"
            >
              <span className="text-lg font-semibold text-slate-500 group-hover:text-white transition-colors duration-300 cursor-default">
                {company.display}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
