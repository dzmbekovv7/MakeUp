import React from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <div className="bg-gradient-to-br bg-gradient-to-r from-black via-gray-900 to-black min-h-screen text-white px-6 py-20 font-sans">
      {/* Заголовок */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Let’s Connect</h1>
        <p className="text-lg text-gray-200 max-w-xl mx-auto">
          Got a question, feedback, or just want to say hello? We’re here for it.
        </p>
      </motion.div>

      {/* Контактная зона */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-start">
        {/* Левая часть: Форма */}
        <motion.div
          className="md:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-6 ml-12 text-white">Send us a message</h2>
          <ContactForm />
        </motion.div>

        {/* Правая часть: Контактная инфа */}
        <motion.div
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 flex flex-col gap-6 shadow-xl"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-white text-center">Contact Info</h3>

          <div className="flex items-start gap-4">
            <Mail className="text-cyan-300" />
            <div>
              <div className="font-medium">Email</div>
              <a href="mailto:support@dogtraining.com" className="text-cyan-200 hover:underline">
                support@dogtraining.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-cyan-300" />
            <div>
              <div className="font-medium">Phone</div>
              <a href="tel:+15551234567" className="text-cyan-200 hover:underline">
                +1 (555) 123-4567
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-cyan-300" />
            <div>
              <div className="font-medium">Location</div>
              <p className="text-cyan-200">
                456 Puppy Lane, Dogtown, USA
              </p>
            </div>
          </div>

          {/* Decorative icons */}
          <div className="flex justify-center gap-4 mt-6 text-3xl text-cyan-300 animate-pulse">
            🐾 🐶 🐕‍🦺
          </div>
        </motion.div>
      </section>
      {/* Why Choose Us Section */}
<section className="mt-32">
  <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-4xl font-extrabold mb-4 tracking-wide text-white">Why Choose Us?</h2>
    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
      Discover what sets us apart – beauty, passion, and purpose in every detail.
    </p>
  </motion.div>

  <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
    {[
      {
        title: "Celebrity-Grade Makeup",
        image: "https://stylecaster.com/wp-content/uploads/2018/11/cat-eye-looks.jpg?w=600&h=337&crop=1",
        text: "Our makeup artists work with top celebrities to deliver flawless, camera-ready results.",
      },
      {
        title: "Red Carpet Looks",
        image: "https://media.vanityfair.com/photos/65c0344d54488e94caae8569/master/pass/grammys-2024-red-carpet-all-the-looks-03.png",
        text: "Inspired by movie stars and global fashion icons — elegance meets expertise.",
      },
      {
        title: "Luxury & Sustainability",
        image: "https://www.jbs.cam.ac.uk/wp-content/uploads/2020/05/2016-news-sustainableluxury-883x432-1.jpg",
        text: "Eco-friendly products crafted to nourish your skin and the planet.",
      },
    ].map((item, i) => (
      <Link to="/articles">
      <motion.div
        key={i}
        className="bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md hover:scale-105 hover:shadow-pink-500/40 transition-all duration-500"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: i * 0.2 }}
      >
        <img src={item.image} alt={item.title} className="w-full h-60 object-cover" />
        <div className="p-6 text-white">
          <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-300">{item.text}</p>
        </div>
      </motion.div>
      </Link>
    ))}
  </div>
</section>

    </div>
  );
};

export default Contact;
