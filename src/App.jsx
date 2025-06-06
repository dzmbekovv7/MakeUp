import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import FAQ from './pages/FAQ';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Introduction from './pages/Introduction';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import AshleyArticlesPage from './pages/Articles';
import AshleyArticleDetailPage from './pages/ArticlesDetailPage';
import AnimatedPage from './components/FadeTransition';
import CategoryArticlesPage from './pages/CategoryArticlesPage';
import ReviewsPage from './pages/Reviews';

const loadingMessages = [
  "💄 Preparing your perfect look...",
  "✨ Crafting beauty, one pixel at a time...",
  "💋 Elegance is just a moment away...",
  "👠 Setting the runway for you...",
  "🌙 Night glamour loading..."
];

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    const message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setLoadingText(message);

    const timer = setTimeout(() => setIsLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden px-6 select-none">
        {/* Subtle animated gradient shine */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{ filter: 'blur(60px)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
        />

        {/* Pulsing circle behind the icon */}
        <motion.div
          className="absolute w-40 h-40 bg-pink-600 rounded-full opacity-30"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        />

        {/* Main lipstick icon */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/5087/5087369.png"
          alt="Loading cosmetics"
          className="w-28 h-28 z-10 drop-shadow-[0_0_12px_rgba(219,39,119,0.8)]"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        />

        {/* Loading text */}
        <motion.h2
          className="mt-8 text-2xl sm:text-3xl md:text-4xl text-pink-400 font-extrabold font-sans text-center max-w-lg z-10 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          {loadingText}
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          className="mt-6 w-24 h-1 bg-pink-500 rounded-full opacity-80 z-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
        />

        {/* Bottom animated heart */}
        <motion.div
          className="flex justify-center mt-12 z-10"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <Heart size={36} className="text-pink-500 drop-shadow-md" />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="/introduction" element={<AnimatedPage><Introduction /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="/reviews" element={<AnimatedPage><ReviewsPage /></AnimatedPage>} />
          <Route path='/FAQ' element={<AnimatedPage><FAQ/></AnimatedPage>}></Route>
          <Route path="/articles" element={<AnimatedPage><AshleyArticlesPage /></AnimatedPage>} />
          <Route path="/articles/:slug" element={<AnimatedPage><AshleyArticleDetailPage /></AnimatedPage>} />
          <Route path="/type/:typename" element={<AnimatedPage><CategoryArticlesPage /></AnimatedPage>} />
          <Route path="/privacy" element={<AnimatedPage><Privacy /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
