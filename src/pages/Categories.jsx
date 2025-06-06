import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { supabase } from "../supabase";
import { useNavigate, Link } from "react-router-dom";
import { PawPrint, Dog, Star, Heart, Moon, Sparkles, Rocket, ShieldCheck, CheckCircle, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const Categories = () => {
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
        .from("dogstraining_articles")
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
    <section ref={ref} className="relative py-20 bg-[#f8f1e7]">
      {/* --- Статьи --- */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <h4 className="text-3xl font-semibold text-[#4B2E2E] mb-8 text-center">
          Featured Articles
        </h4>
        {loading ? (
          <p className="text-center text-[#7E6A52]">Loading articles...</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                to="/articles"
                key={article.id}
                className="relative group bg-white border-2 border-[#D6C8B8] rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
              >
                <span className="absolute top-4 right-4 text-[#D6C8B8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse select-none text-3xl">
                  🐾
                </span>

                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-44 object-cover rounded-t-3xl"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-[#3E2C23] mb-3 transition-colors group-hover:text-[#A57C55]">
                    {article.title}
                  </h2>
                  <p className="text-[#7A6A5A] text-base mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="mt-auto text-sm text-[#A57C55] flex justify-between items-center">
                    <span>🕒 {article.reading_time} min</span>
                    <span>
                      📅 {new Date(article.published_date).toLocaleDateString()}
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
            className="px-6 py-3 bg-gradient-to-r from-[#b16b3b] to-[#6a3d12] text-white rounded-full font-semibold hover:from-[#a05c32] hover:to-[#573107] transition duration-300 shadow-lg hover:shadow-xl"
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
            className="cursor-pointer bg-gradient-to-br from-[#4B2E2E] to-[#6A3D12] rounded-3xl p-8 shadow-lg text-white flex flex-col items-center text-center transition-shadow hover:shadow-2xl"
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
  );
};

export default Categories;
