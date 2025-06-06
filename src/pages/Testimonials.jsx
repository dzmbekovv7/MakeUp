import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useInView } from "react-intersection-observer";

const testimonials = [
  { name: "Anna", text: "After training sessions, my dog stopped pulling the leash. Huge relief!" },
  { name: "Dmitry", text: "The trainer taught us simple techniques that truly work. Great experience!" },
  { name: "Elena", text: "My puppy now knows basic commands and behaves much better at home." },
  { name: "Igor", text: "Fantastic course! My dog learned sit, down, and come in just a few sessions." },
  { name: "Maria", text: "Walks are finally peaceful—no more barking or jumping on people." },
  { name: "Alex", text: "Our pug turned into a gentleman! Thank you for the patience and guidance." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Testimonials = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="relative py-20 text-center overflow-hidden bg-white"
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: -20 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-4xl font-bold mb-10 italic font-serif text-gray-800">
          What Dog Owners Are Saying
        </h3>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="flex flex-wrap justify-center gap-10 px-6 z-10 relative"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md max-w-sm transition-all duration-300"
          >
            <Quote className="w-8 h-8 text-pink-400 mx-auto mb-4" />
            <p className="italic text-gray-700 mb-4">"{t.text}"</p>
            <p className="font-bold text-pink-600">— {t.name}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative Quotes */}
      <Quote className="absolute top-10 left-10 text-gray-100 opacity-20 w-20 h-20 rotate-[20deg]" />
      <Quote className="absolute bottom-16 right-16 text-pink-100 opacity-20 w-24 h-24 -rotate-12" />
    </section>
  );
};

export default Testimonials;
