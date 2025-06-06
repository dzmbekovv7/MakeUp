import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles, Stars, Feather, Brush } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollToTopButton from './ScrollToTop';

const navItems = ["Home", "Articles", "Reviews", "Privacy", "Contact", "About", 'FAQ'];
const icons = [Sparkles, Stars, Feather, Brush];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">
      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10 text-center relative z-40">
        {/* Title with animated icons */}
        <div className="relative inline-block mb-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-white tracking-wide neon-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            MakeUpArtists
          </motion.h1>

          {/* Animated decorative icons */}
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute text-pink-400 opacity-80"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          ))}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center space-x-8 text-lg mt-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-gray-300 hover:text-pink-400 transition duration-300 relative group"
            >
              {item}
              <span className="block h-[2px] w-0 group-hover:w-full bg-pink-400 transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="absolute top-6 right-6 md:hidden text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className="fixed top-0 right-0 h-full w-2/3 bg-gray-900 z-50 p-6 shadow-xl flex flex-col gap-6"
      >
        <div className="flex justify-between items-center text-white mb-4">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-pink-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="text-lg text-white hover:text-pink-400 transition"
            onClick={() => setIsOpen(false)}
          >
            {item}
          </Link>
        ))}
      </motion.div>

      <ScrollToTopButton />
    </header>
  );
};

export default Header;
