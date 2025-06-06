import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Dog, Cat } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Improves Behavior",
    description:
      "Training helps dogs understand commands, reducing bad habits and making them easier to live with.",
  },
  {
    id: 2,
    title: "Strengthens Bond",
    description:
      "Spending time training deepens the connection between you and your dog through trust and communication.",
  },
  {
    id: 3,
    title: "Enhances Safety",
    description:
      "Well-trained dogs are less likely to get into dangerous situations, keeping them and others safe.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.25, duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const pawVariants = {
  float: {
    y: [0, -15, 0],
    rotate: [0, 12, -12, 0],
    transition: {
      yoyo: Infinity,
      duration: 4,
      ease: "easeInOut",
    },
  },
};

const DogTrainingBenefits = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="relative bg-white  py-20 px-6 flex justify-center overflow-hidden">
      {/* Animated paw prints and animals */}
      <motion.div
        className="absolute top-8 left-8 text-pink-300 opacity-40"
        variants={pawVariants}
        animate="float"
      >
        <PawPrint size={48} />
      </motion.div>
      <motion.div
        className="absolute bottom-14 right-12 text-purple-300 opacity-30"
        variants={pawVariants}
        animate="float"
        style={{ rotate: 20 }}
      >
        <Dog size={56} />
      </motion.div>
      <motion.div
        className="absolute top-44 right-16 text-indigo-200 opacity-25"
        variants={pawVariants}
        animate="float"
        style={{ rotate: -15 }}
      >
        <Cat size={48} />
      </motion.div>

      {/* Main container */}
      <motion.div
        className="relative bg-gradient-to-tr from-pink-50 to-indigo-50 rounded-3xl shadow-lg max-w-5xl w-full p-12"
        onViewportEnter={() => setIsVisible(true)}
        onViewportLeave={() => setIsVisible(false)}
      >
        <motion.h2
          className="text-4xl font-extrabold text-center mb-16 tracking-tight text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Dog Training is Essential
        </motion.h2>

        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              className="grid gap-10 md:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {benefits.map(({ id, title, description }) => (
                <motion.div
                  key={id}
                  className="bg-white rounded-xl p-8 shadow-md cursor-default hover:shadow-xl transition-shadow duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.06 }}
                >
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default DogTrainingBenefits;
