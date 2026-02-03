import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { useEffect } from 'react';

export default function EnterpriseCTA() {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { count, startAnimation } = useCountUp(100, 1500);

  useEffect(() => {
    if (isVisible) {
      startAnimation();
    }
  }, [isVisible, startAnimation]);

  return (
    <section ref={ref} className="py-20 gradient-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Enterprise-Grade
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Taurus Platform
          </h3>

          <p className="text-slate-400 mb-4">Pricing starts as low as</p>

          <div className="flex items-baseline justify-center gap-1 mb-8">
            <span className="text-6xl md:text-7xl font-bold text-white">$</span>
            <motion.span
              className="text-6xl md:text-7xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
            >
              1.{count.toString().padStart(2, '0')}
            </motion.span>
            <span className="text-xl text-slate-400 ml-2">per interview</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button
              onClick={() => navigate('/contact-us')}
              size="lg"
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
            <Button
              onClick={() => navigate('/contact-us')}
              size="lg"
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800 rounded-full px-8"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat now with sales
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-slate-300">
              Leader of customer satisfaction <span className="text-white font-semibold">Rated 5/5</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
