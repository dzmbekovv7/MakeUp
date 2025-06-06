import React from "react";
import { motion } from "framer-motion";
import { Palette, Brush, Camera, Stars, Sparkles, Feather, Users, Heart, Globe, Settings } from "lucide-react";

const AnimatedIcon = ({ Icon }) => (
  <motion.div
    initial={{ rotate: 0 }}
    animate={{ rotate: [0, 10, -10, 0] }}
    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    className="text-pink-600"
  >
    <Icon size={32} />
  </motion.div>
);

const sections = [
  {
    id: "makeup",
    title: "Makeup Magic",
    description: "Creating looks from soft glam to bold artistry—each one reflecting unique beauty.",
    image: "https://i.imgur.com/hRSOnfl.jpeg",
    icon: Palette,
  },
  {
    id: "models",
    title: "Top Models",
    description: "Our models shine on the runway and in front of the camera with charisma and poise.",
    image: "https://www.fashiongonerogue.com/wp-content/uploads/2023/10/Black-Models-Featured.jpg",
    icon: Camera,
  },
  {
    id: "tools",
    title: "Beauty Tools",
    description: "Brushes, palettes, and pro secrets—we use the best tools for flawless results.",
    image: "https://godefroybeauty.com/cdn/shop/collections/Beauty_Tools.jpg?v=1699990857",
    icon: Brush,
  },

  {
    id: "sustainability",
    title: "Sustainability",
    description: "We care about the planet. Our products and practices are eco-conscious and ethical.",
    image: "https://lightsciencetech.com/wp-content/uploads/2021/09/Sustainability-scaled.jpg",
    icon: Globe,
  },
  {
    id: "technology",
    title: "Smart Beauty Tech",
    description: "Combining innovation and beauty with the latest in skincare and cosmetic technology.",
    image: "https://miro.medium.com/v2/resize:fit:1148/1*9IALVfHVgnGkVvbx3tEzaQ.jpeg",
    icon: Settings,
  },
  {
    id: "community",
    title: "Our Community",
    description: "We empower everyone through beauty. Workshops, outreach, and inclusive events.",
    image: "https://revglobalinc.com/wp-content/uploads/2023/06/4d8dd-students-in-community.001.png",
    icon: Heart,
  },
];

const team = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Visionary leader with over 10 years in beauty and management.",
  },
  {
    name: "Brian Lee",
    role: "Lead Makeup Artist",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
    bio: "Master of color theory and creative transformation.",
  },
  {
    name: "Catherine Smith",
    role: "Photo & Model Director",
    photo: "https://randomuser.me/api/portraits/women/52.jpg",
    bio: "Crafts perfect frames and guides our models to shine.",
  },
  {
    name: "David Miller",
    role: "Beauty Consultant",
    photo: "https://randomuser.me/api/portraits/men/36.jpg",
    bio: "Expert in skin, tools, and client satisfaction.",
  },
];
const icons = [Sparkles, Stars, Feather, Brush];

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen text-gray-800">
      {/* Intro Text */}
      <section className="px-4 md:px-20 py-16 flex flex-col md:flex-row items-center gap-10">
      <motion.div
  className="md:w-1/2"
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>
  <motion.h1
    className="text-5xl md:text-6xl font-extrabold text-white tracking-wide neon-text flex flex-wrap gap-2 items-center"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  >
    About us
    {/* ВСТАВЛЕННЫЕ ИКОНКИ ВНУТРИ ЗАГОЛОВКА */}
    {icons.map((Icon, index) => (
      <motion.span
        key={index}
        className="text-pink-400"
        animate={{
          y: [0, -5, 0],
          opacity: [0.8, 1, 0.8],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 3 + index,
          repeat: Infinity,
          delay: index * 0.3,
        }}
      >
        <Icon className="w-6 h-6 inline-block mx-1" />
      </motion.span>
    ))}
  </motion.h1>

  {/* Описание */}
  <p className="text-xl text-white leading-relaxed mt-6">
  We are a passionate team dedicated to redefining beauty and technology. Our journey
  began with a simple idea: to merge aesthetics and functionality in a way that elevates
  everyday experiences. Every product we create and every service we offer reflects our
  unwavering commitment to quality, innovation, and user-centered design.
  <br /><br />
  With a deep commitment to sustainability, we strive to make environmentally conscious
  choices at every stage of development. We believe that great design should not only
  look good but also do good — for people, for communities, and for the planet.
  {/* <br /><br />
  Collaboration is at the heart of everything we do. Our diverse team of creators,
  developers, and visionaries work side-by-side to build solutions that push boundaries
  and make a real impact. We listen, we learn, and we evolve — constantly challenging
  ourselves to deliver better, smarter, and more meaningful results. */}
  </p>
</motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
          alt="Team working together"
          className="md:w-1/2 w-full rounded-2xl shadow-lg object-cover"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </section>


      {/* Section Cards */}
      <section className="py-16 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {sections.map(({ id, title, description, image, icon: Icon }, idx) => (
            <motion.div
              key={id}
              className="rounded-2xl overflow-hidden shadow-lg bg-white text-black"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <img src={image} alt={title} className="w-full h-60 object-cover" />
              <div className="p-6 text-center">
                <AnimatedIcon Icon={Icon} />
                <h2 className="text-2xl font-semibold mt-4 mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section id="team" className="py-16 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Meet Our Team <AnimatedIcon Icon={Users} />
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map(({ name, role, photo, bio }, i) => (
            <motion.div
              key={name}
              className="bg-white rounded-xl p-6 shadow-xl text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <img
                src={photo}
                alt={name}
                className="mx-auto rounded-full w-28 h-28 object-cover shadow-md"
              />
              <h3 className="text-xl font-semibold mt-4">{name}</h3>
              <p className="text-sm italic mb-2 text-pink-600">{role}</p>
              <p className="text-gray-600 text-sm">{bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
