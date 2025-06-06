import React from 'react';
import { motion } from 'framer-motion';
import { Quote, MessageSquare } from 'lucide-react';

const quotes = [
  {
    text: 'A room without books is like a body without a soul.',
    author: 'Marcus Tullius Cicero',
  },
  {
    text: 'Good friends, good books, and a sleepy conscience: this is the ideal life.',
    author: 'Mark Twain',
  },
  {
    text: 'So many books, so little time.',
    author: 'Frank Zappa',
  },
];

const QuoteSection = () => (
  <section className="bg-blue-50 py-20 px-6">
    <h3 className="text-3xl font-bold text-center text-blue-800 mb-12">What Our Readers Say</h3>
    <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-3">
      {quotes.map(({ text, author }, idx) => (
        <motion.div
          key={idx}
          className="bg-white rounded-lg p-8 shadow-lg relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
        >
          <Quote className="absolute -top-4 left-4 text-blue-300 w-8 h-8" />
          <p className="italic text-gray-700 mb-4">&ldquo;{text}&rdquo;</p>
          <div className="flex items-center gap-3 text-sm text-gray-600 font-semibold">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <span>{author}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default QuoteSection;
