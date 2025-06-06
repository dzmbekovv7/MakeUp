import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 100 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.4 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-white text-white p-3 rounded-full shadow-lg z-[19999999999] hover:bg-grey transition"
    >
      <ChevronUp className="w-6 h-6 text-[#4B2E2E]" />
    </motion.button>
  );
};

export default ScrollToTopButton;
