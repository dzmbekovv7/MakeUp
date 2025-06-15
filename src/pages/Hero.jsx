import {
  Star,
  Heart,
  Brush,
  Eye,
  Smile,
  CheckCircle,
  Trophy,
  ThumbsUp,
  Users,
  Camera,
  MagnetIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { supabase } from "../supabase";
import { useNavigate, Link } from "react-router-dom";
import { PawPrint, Dog, Moon, Sparkles, Rocket, ShieldCheck, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const sparkleCount = 8;

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1 } },
  pulse: {
    scale: [1, 1.1, 1],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
  float: {
    y: [0, -12, 0],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  },
  spin: {
    rotate: [0, 360],
    transition: { repeat: Infinity, duration: 10, ease: "linear" },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const categories = [
  {
    name: "Basic Training",
    icon: <Dog className="w-10 h-10 text-yellow-400" />,
    description: "Basic obedience and commands for your dog.",
  },
  {
    name: "Behavior Problems",
    icon: <ShieldCheck className="w-10 h-10 text-yellow-400" />,
    description: "Solving issues with aggression, barking, and fears.",
  },
  {
    name: "Agility",
    icon: <Activity className="w-10 h-10 text-yellow-400" />,
    description: "Competition preparation and agility exercises.",
  },
  {
    name: "Nutrition & Health",
    icon: <Star className="w-10 h-10 text-yellow-400" />,
    description: "Nutrition, vitamins, and maintaining your pet's health.",
  },
  {
    name: "Puppy Care",
    icon: <Heart className="w-10 h-10 text-yellow-400" />,
    description: "Caring for and raising puppies from day one.",
  },
  {
    name: "Advanced Tricks",
    icon: <Sparkles className="w-10 h-10 text-yellow-400" />,
    description: "Learning advanced tricks and commands.",
  },
];


const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
const Hero = () => {
  const sparkles = Array.from({ length: sparkleCount }).map((_, i) => {
    const size = 12 + Math.random() * 14;
    const left = Math.random() * 100;
    const top = Math.random() * 80 + 10;
    const duration = 3 + Math.random() * 3;
    const delay = Math.random() * 4;

    return (
      <motion.div
        key={i}
        className="absolute text-yellow-400"
        style={{ left: `${left}%`, top: `${top}%`, fontSize: size }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          duration: duration,
          delay: delay,
        }}
      >
        <Star />
      </motion.div>
    );
  });
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  useEffect(() => {
    if (inView) setShowCategories(true);
    else setShowCategories(false);
  }, [inView]);
  
  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from("makeup_articles")
        .select("*")
        .order("published_date", { ascending: false })
        .limit(6);
      if (data) setArticles(data);
      setLoading(false);
    }
    fetchArticles();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/articles?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <>
      {/* === HERO SECTION === */}
      <section
        aria-label="Hero section"
        className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black min-h-[600px] flex items-center"
      >
        {sparkles}

        <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center lg:text-left max-w-lg relative"
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold text-yellow-400 mb-6 leading-tight drop-shadow-lg">
              Unleash Your Beauty
              <br />
              in the World of Models & Makeup
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Discover inspiring stories, latest makeup trends, and beauty secrets from the pros.
            </p>

            <Link to="/articles">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300">
                Read More
              </button>
            </Link>

            {/* Pulsing Brush Icon */}
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="pulse"
              className="absolute -top-10 right-0 text-yellow-400 opacity-80"
              style={{ fontSize: 50 }}
            >
              <Brush />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="w-full max-w-md rounded-xl overflow-hidden shadow-2xl relative"
          >
            <img
              src="https://www.shutterstock.com/image-photo/beautiful-model-girl-french-manicure-600nw-1922411420.jpg"
              alt="Model with makeup"
              className="w-full h-auto object-cover"
            />
            {/* Floating Eye Icon */}
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="float"
              className="absolute bottom-4 left-4 text-yellow-400 opacity-90"
              style={{ fontSize: 40 }}
            >
              <Eye />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === ACHIEVEMENTS SECTION === */}
      <section className="bg-white min-h-[450px] py-20 px-6 lg:px-20 flex flex-col items-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 mb-12"
        >
          Our Achievements
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          {[
            {
              icon: <Trophy className="text-yellow-400 mx-auto" size={48} />,
              title: "10+ Years Experience",
              desc: "Trusted by clients worldwide for a decade of excellence.",
            },
            {
              icon: <Users className="text-yellow-400 mx-auto" size={48} />,
              title: "5000+ Happy Clients",
              desc: "Empowering thousands to shine confidently every day.",
            },
            {
              icon: <Star className="text-yellow-400 mx-auto" size={48} />,
              title: "Award-Winning Service",
              desc: "Recognized for innovation and outstanding quality.",
            },
          ].map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex flex-col items-center px-6"
            >
              {icon}
              <h3 className="text-xl font-semibold mt-6 mb-2">{title}</h3>
              <p className="text-gray-600 max-w-sm">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* === ADVANTAGES & COMPARISON SECTION === */}
      <section
        className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 min-h-[500px] py-20 px-6 lg:px-20 text-black"
        aria-label="Advantages section"
      >
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Why Choose Us Over Others?
        </motion.h2>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-lg"
        >
          {[
            {
              icon: <CheckCircle size={32} className="inline mr-3 align-middle" />,
              text: "Exclusive insider access to top model makeup tips.",
            },
            {
              icon: <ThumbsUp size={32} className="inline mr-3 align-middle" />,
              text: "Personalized beauty plans tailored to your unique style.",
            },
            {
              icon: <Heart size={32} className="inline mr-3 align-middle" />,
              text: "Passionate experts dedicated to bringing out your best.",
            },
            {
              icon: <MagnetIcon size={32} className="inline mr-3 align-middle" />,
              text: "Innovative beauty tech combined with artistic mastery.",
            },
          ].map(({ icon, text }, i) => (
            <motion.li
              key={i}
              variants={fadeInUp}
              className="flex items-center bg-white bg-opacity-70 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow cursor-default"
            >
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="pulse"
                className="text-yellow-600"
              >
                {icon}
              </motion.div>
              <span>{text}</span>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* === TRUST SECTION === */}
      <section className="bg-white min-h-[400px] py-20 px-6 lg:px-20 flex flex-col items-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 mb-10"
        >
          Why People Trust Us
        </motion.h2>

        <motion.div
          className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          {[
            {
              icon: <Smile size={48} className="mx-auto text-yellow-400" />,
              title: "Customer Satisfaction",
              desc: "We prioritize your happiness above all else.",
            },
            {
              icon: <Camera size={48} className="mx-auto text-yellow-400" />,
              title: "Proven Expertise",
              desc: "Years of experience photographing and styling top models.",
            },
            {
              icon: <Star size={48} className="mx-auto text-yellow-400" />,
              title: "Consistent Quality",
              desc: "Our work speaks for itself — flawless every time.",
            },
          ].map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="px-4"
            >
              {icon}
              <h3 className="mt-6 mb-2 text-xl font-semibold">{title}</h3>
              <p className="text-gray-600 max-w-sm mx-auto">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* === NEW SECTION 2: JOIN OUR COMMUNITY === */}
      {/* <section
        className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 min-h-[450px] py-20 px-6 lg:px-20 flex flex-col items-center text-black"
        aria-label="Join community section"
      >
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Join Our Beauty Community
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl text-center mb-12 text-lg"
        >
          Connect with like-minded beauty enthusiasts, share your style, and learn the
          latest trends. Whether you’re a pro or just starting out, everyone is welcome!
        </motion.p>

        <motion.div
          className="flex gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div
            variants={iconVariants}
            animate="float"
            className="text-yellow-700 cursor-pointer"
            title="Follow us on Instagram"
          >
            <Users size={48} />
          </motion.div>

          <motion.div
            variants={iconVariants}
            animate="pulse"
            className="text-yellow-700 cursor-pointer"
            title="Subscribe to newsletter"
          >
            <Heart size={48} />
          </motion.div>

          <motion.div
            variants={iconVariants}
            animate="float"
            className="text-yellow-700 cursor-pointer"
            title="Join our forum"
          >
            <Camera size={48} />
          </motion.div>
        </motion.div>
      </section> */}
 
      {/* === NEW SECTION 1: THE ART OF MAKEUP === */}
      <section
        className=" bg-gradient-to-r from-[#2b0a3d] via-[#1a052d] to-[#2b0a3d] text-whitemin-h-[500px] py-20 px-6 lg:px-20 flex flex-col items-center"
        aria-label="Art of makeup section"
      >
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold mb-10 text-center"
        >
          The Art of Makeup
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl text-center text-lg"
        >
          Makeup is more than just colors and brushes — it’s a form of self-expression,
          confidence, and creativity. We celebrate the artistry that transforms and empowers,
          bringing beauty to life in every stroke.
        </motion.p>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-12 text-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          {[Brush, MagnetIcon, Eye, Star, Heart, Smile].map((IconComp, i) => (
            <motion.div
              key={i}
              variants={iconVariants}
              animate="pulse"
              className="text-white drop-shadow-lg"
            >
              <IconComp />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section ref={ref} className="relative py-20 bg-white">
      {/* --- Статьи --- */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <h4 className="text-3xl font-semibold text-[#4B2E2E] mb-8 text-center">
          Featured Articles
        </h4>
        {loading ? (
          <p className="text-center text-[#7E6A52]">Loading articles...</p>
        ) : (
          <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto p-6">
          {articles.map(article => (
            <Link
              to="/articles"
              key={article.id}
              className="flex bg-[#0a122a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 group cursor-pointer"
            >
              {/* Левая часть — наклонённая картинка */}
              <div className="relative w-1/2 overflow-hidden -skew-x-6 group-hover:scale-105 transform transition-transform duration-500">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover skew-x-6"
                />
              </div>
        
              {/* Правая часть — текст */}
              <div className="w-1/2 bg-gradient-to-tr from-[#112240] to-[#1a2e55] p-8 flex flex-col justify-between rounded-r-2xl">
                <h2 className="text-3xl font-extrabold text-[#b6c7f7] mb-4 group-hover:text-[#e0e6ff] transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-300 mb-6 line-clamp-4">
                  {article.summary}
                </p>
                <div className="flex justify-between items-center text-sm text-[#a8b1d6]">
                  <span className="flex items-center gap-2 bg-[#18294d] px-3 py-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8fa1ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    {article.reading_time} min read
                  </span>
                  <span className="flex items-center gap-2 bg-[#18294d] px-3 py-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8fa1ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" />
                    </svg>
                    {new Date(article.published_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/articles")}
            className="px-9 py-6 bg-gradient-to-tr from-[#112240] to-[#1a2e55] text-white rounded-full font-semibold  transition duration-300 shadow-lg hover:shadow-xl"
          >
            Show more
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
  {showCategories && (
    <motion.div
      key="categories"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={containerVariants}
      className="max-w-6xl mx-auto px-6"
    >
      <h3 className="text-4xl font-serif italic text-[#4B2E2E] mb-12 text-center">
        Dog Training Categories
      </h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-gradient-to-tr from-[#112240] to-[#1a2e55] rounded-3xl p-8 shadow-lg text-white flex flex-col items-center text-center transition-shadow hover:shadow-2xl"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div className="mb-5">{cat.icon}</div>
            <h4 className="text-2xl font-semibold">{cat.name}</h4>
            <p className="mt-3 text-sm">{cat.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
    </>
  );
};

export default Hero;
