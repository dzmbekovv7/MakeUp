import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  { question: "What's the best foundation for photoshoots?", answer: "Choose HD foundation with a matte finish for flash photography." },
  { question: "How do models keep their skin glowing?", answer: "Hydration, sleep, and light-reflecting primers are key." },
  { question: "Which lipstick shades suit runway looks?", answer: "Bold reds, nude glosses, or seasonal tones like plum or coral." },
  { question: "What makeup trends are hot in 2025?", answer: "Glass skin, chrome eyeshadow, and minimalistic lashes." },
  { question: "How do actresses prep before red carpet?", answer: "Hydrating masks, pro-makeup artists, and camera-friendly products." },
  { question: "What’s the secret to long-lasting makeup?", answer: "Layering cream + powder + setting spray locks everything in place." },
  { question: "What kind of mascara do celebs use?", answer: "Tubing mascaras or lash extensions for smudge-free drama." },
  { question: "Is contouring still relevant?", answer: "Yes, but now it's softer and more blended – less harsh lines." },
  { question: "What’s trending in eyebrow styling?", answer: "Feathery laminated brows or softly defined arches." },
  { question: "How do models handle makeup on long shoots?", answer: "Touch-up kits and blotting papers are essentials on set." },
  { question: "What’s the go-to setting spray for models?", answer: "Fix+ by MAC and All Nighter by Urban Decay are favorites." },
  { question: "How to achieve the no-makeup makeup look?", answer: "Tinted moisturizer, cream blush, clear brow gel, and lip balm." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen px-6 py-24 bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h2
          className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Beauty & Fashion FAQs
        </motion.h2>
        <p className="text-gray-400 mt-4">
          Everything you ever wanted to ask about makeup, models & glamour.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => toggle(index)}
            className={`backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300 
              border border-pink-400/30 rounded-3xl p-6 shadow-lg cursor-pointer
              hover:shadow-[0_0_60px_#f472b640]
              ${index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-pink-300">{item.question}</h3>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="text-pink-300" />
              </motion.div>
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  className="text-pink-100 mt-3 text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Bottom text */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h4 className="text-xl text-pink-200 mb-4 font-light italic">
          Haven’t found what you're looking for?
        </h4>
        <Link
          to="/contact"
          className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 shadow-md"
        >
          Text us
        </Link>
      </motion.div>
    </section>
  );
};

export default FAQ;
