import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const CallToAction = () => (
  <section className="bg-gradient-to-r from-pink-50 to-indigo-50 text-white py-20 px-6 text-center">
    <motion.h3
      className="text-4xl font-bold text-gray-700 mb-6"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      Ready to start your adventure?
    </motion.h3>
    <Link to="/articles">
    <motion.button
      className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      Check articles
    </motion.button>
    </Link>
  </section>
);

export default CallToAction;
