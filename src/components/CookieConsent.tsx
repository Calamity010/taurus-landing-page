import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-4 left-4 z-50 max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Taurus Hire uses cookies
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              By using our service you consent to all cookies in accordance with our cookie policy. For more details, refer to our{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <Button
              onClick={handleAccept}
              className="w-full bg-primary text-white hover:bg-primary-800"
            >
              GOT IT
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
