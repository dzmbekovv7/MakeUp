import React from "react";
import { motion } from "framer-motion";
import { PawPrint, SmilePlus, Brain } from "lucide-react";

const features = [
  {
    icon: <PawPrint className="w-10 h-10 text-pink-500" />,
    title: "Effective Commands",
    desc: "Teach your dog essential commands like sit, stay, and come with ease.",
  },
  {
    icon: <Brain className="w-10 h-10 text-yellow-500" />,
    title: "Behavioral Training",
    desc: "Correct bad habits and improve focus with positive reinforcement.",
  },
  {
    icon: <SmilePlus className="w-10 h-10 text-green-500" />,
    title: "Happy Bonding",
    desc: "Strengthen the connection between you and your dog through training.",
  },
];

const Features = () => (
  <section className="py-20 bg-white px-6 max-w-6xl mx-auto">
    <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
      Why Train Your Dog With Us?
    </h3>
    <div className="grid gap-12 md:grid-cols-3 text-center">
      {features.map(({ icon, title, desc }, idx) => (
        <motion.div
          key={idx}
          className="p-6 border rounded-2xl shadow hover:shadow-xl transition cursor-default bg-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }} // ✅ повторяется каждый раз при входе
          transition={{ duration: 0.6, delay: idx * 0.2 }}
        >
          <div className="mb-4 mx-auto">{icon}</div>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
          <p className="text-gray-600">{desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Features;
