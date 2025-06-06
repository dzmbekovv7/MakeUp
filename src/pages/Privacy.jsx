import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center p-6">
      <motion.div
        className="max-w-4xl bg-white rounded-3xl shadow-2xl p-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl font-extrabold mb-10 text-gray-900 flex items-center gap-4 tracking-wide"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles size={42} className="text-pink-500 animate-pulse" />
          Privacy & Beauty Policy
        </motion.h1>
        <motion.p
          className="text-sm text-gray-600 mb-14 font-semibold italic tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Last Updated: June 2025 — Your privacy and beauty, our top priority.
        </motion.p>

        {/* Sections */}
        {[
          {
            number: "1",
            title: "Your Glamorous Privacy",
            content:
              "We respect your privacy as much as your unique beauty. All your personal and cosmetic preferences are treated with the utmost confidentiality and care.",
          },
          {
            number: "2",
            title: "Data We Collect",
            content:
              "To enhance your experience, we collect info like your name, contact details, beauty preferences, and interaction data on our platform—always with your consent.",
          },
          {
            number: "3",
            title: "How We Use Your Data",
            content:
              "Your data helps us tailor personalized beauty tips, exclusive model features, and premium cosmetics offers that truly suit your style.",
          },
          {
            number: "4",
            title: "Sharing & Confidentiality",
            content:
              "We share your info only with trusted beauty partners and services that elevate your experience. We never sell your personal data to third parties.",
          },
          {
            number: "5",
            title: "Security Measures",
            content:
              "Cutting-edge encryption and strict access controls keep your beauty secrets safe. We regularly update our protections to stay ahead.",
          },
          {
            number: "6",
            title: "Data Retention",
            content:
              "We keep your data only as long as you enjoy our site and for compliance, then securely erase it—just like refreshing your beauty routine.",
          },
          {
            number: "7",
            title: "Your Rights & Choices",
            content:
              "You can access, update, or delete your data anytime. Opt-out options are always available because your control is key to your confidence.",
          },
          {
            number: "8",
            title: "Global Glamour",
            content:
              "If your data moves internationally, it’s always protected under strong privacy standards—because beauty is universal.",
          },
          {
            number: "9",
            title: "Policy Updates",
            content:
              "We evolve with the trends and technology. Any changes here will be clearly communicated, so you stay informed and empowered.",
          },
          {
            number: "10",
            title: "Contact Us",
            content:
              "💌 Reach out anytime: beauty@yourbrand.com | +1 (555) 123-4567",
          },
        ].map(({ number, title, content }, idx) => (
          <motion.section
            key={number}
            className="mb-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 + idx * 0.15 }}
          >
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 text-pink-600 tracking-wide">
              <span className="text-pink-400 font-extrabold">{number}.</span>
              {title}
              <Sparkles size={28} className="text-pink-400 opacity-90" />
            </h2>
            <p className="text-gray-800 leading-relaxed font-medium text-lg tracking-wide">
              {content}
            </p>
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
