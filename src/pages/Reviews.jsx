import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Quote, Star, Gem } from "lucide-react";

const ReviewsPage = () => {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen text-white font-sans overflow-x-hidden">
      {/* Заголовок */}
      <section className="text-center py-20 relative">
        <motion.h1
          className="text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-500 text-transparent bg-clip-text">
            Client Stories
          </span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Because you deserve more than just makeup — you deserve memories.
        </motion.p>
      </section>

      {/* Секция Услуг */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {services.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            className="bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 text-center shadow-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <Icon className="mx-auto text-pink-400 mb-4" size={36} />
            <h4 className="text-xl font-semibold mb-2 text-white">{title}</h4>
            <p className="text-gray-300">{desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Новые карточки отзывов */}
      <section className="px-6 py-20 bg-black/30">
        <motion.h2
          className="text-4xl text-center font-bold text-white mb-12"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {reviews.map(({ id, name, comment, avatar }) => (
            <motion.div
              key={id}
              className="relative p-6 bg-white/10 text-white rounded-3xl backdrop-blur-md shadow-lg border border-white/10 hover:shadow-pink-500/20 transition"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: id * 0.2 }}
            >
              <Quote className="absolute top-4 right-4 text-pink-400 opacity-40" />
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-pink-500"
              />
              <h5 className="text-lg font-bold text-pink-300 mb-2">{name}</h5>
              <p className="text-gray-200 text-sm">{comment}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Секция достижений */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <motion.h3
          className="text-3xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Awards & Recognition
        </motion.h3>
        <div className="flex flex-wrap justify-center gap-10">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              className="bg-gray-800/70 p-6 rounded-2xl shadow-md w-64 text-center border border-gray-700"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Star className="text-yellow-400 mx-auto mb-3" size={32} />
              <h4 className="font-semibold text-white mb-1">{award.title}</h4>
              <p className="text-gray-400 text-sm">{award.year}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const reviews = [
  {
    id: 1,
    name: "Ariana R.",
    comment:
      "An unforgettable transformation — I never felt so confident. Thank you!",
    avatar: "https://randomuser.me/api/portraits/women/85.jpg",
  },
  {
    id: 2,
    name: "Chloe M.",
    comment:
      "Professional, kind, and unbelievably talented. Can’t wait for my next appointment!",
    avatar: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  {
    id: 3,
    name: "Isabella K.",
    comment:
      "The best makeup experience I’ve ever had. I felt like royalty all night.",
    avatar: "https://randomuser.me/api/portraits/women/49.jpg",
  },
];

const services = [
  {
    icon: Sparkles,
    title: "Bridal Glam",
    desc: "Creating unforgettable looks for your most special day.",
  },
  {
    icon: Gem,
    title: "Photoshoot Makeup",
    desc: "Camera-ready glam to make you shine under any light.",
  },
  {
    icon: Star,
    title: "Everyday Elegance",
    desc: "Subtle, soft makeup for a radiant everyday look.",
  },
];

const awards = [
  { title: "Top Artist of the Year", year: "2023" },
  { title: "Best Bridal Stylist", year: "2022" },
  { title: "Client Choice Winner", year: "2021" },
];

export default ReviewsPage;
