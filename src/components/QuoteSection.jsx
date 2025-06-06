import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const QuoteSection = () => {
  const floatingItems = Array.from({ length: 6 }, (_, i) => ({
    left: Math.random() * 100,
    rotate: Math.random() * 30 - 15,
    delay: Math.random() * 4,
    size: 20 + Math.random() * 10,
    emoji: Math.random() > 0.5 ? "📜" : "🪶",
  }));

  return (
    <section className="relative py-24  overflow-hidden text-center">
      {/* Плавающие эмоджи */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-400 opacity-30"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: "120vh", opacity: 0.4 }}
          transition={{
            repeat: Infinity,
            duration: 10 + Math.random() * 4,
            delay: item.delay,
            ease: "linear",
          }}
          style={{
            left: `${item.left}%`,
            rotate: `${item.rotate}deg`,
            fontSize: `${item.size}px`,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Quote icon with animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Quote className="w-12 h-12 text-blue-500 mx-auto mb-4" />
      </motion.div>

      {/* Decorative line */}
      <motion.div
        className="w-16 h-1 bg-blue-300 mx-auto mb-6 rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ transformOrigin: "left" }}
      />

      {/* Blockquote */}
      <motion.blockquote
        className="text-2xl font-semibold text-blue-800 max-w-3xl mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        “A reader lives a thousand lives before he dies. The man who never reads lives only one.” — George R.R. Martin
      </motion.blockquote>

      {/* Bottom decorative line */}
      <motion.div
        className="w-16 h-1 bg-blue-300 mx-auto mt-6 rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ transformOrigin: "right" }}
      />
    </section>
  );
};

export default QuoteSection;
