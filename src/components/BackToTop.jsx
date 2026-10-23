// src/components/BackToTop.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-[24px] right-[24px] z-40 w-[44px] h-[44px] rounded-full bg-[#fbf8f2]/90 dark:bg-[#25221e]/90 text-[#302e2a] dark:text-[#f0ebe1] border border-[#302e2a22] dark:border-[#ffffff20] shadow-[0_8px_24px_rgba(48,46,42,0.14)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-[8px] flex items-center justify-center cursor-pointer transition-colors hover:border-[#626b50] dark:hover:border-[#9da991]"
          aria-label="Scroll back to top"
          title="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
