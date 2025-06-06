import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#2b0a3d] via-[#1a052d] to-[#2b0a3d] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* О нас */}
        <div>
          <h3 className="text-2xl font-bold text-pink-400 mb-4">MakeupMuses</h3>
          <p className="text-sm text-gray-300">
            Empowering beauty through creativity. We bring out your inner glow
            with every brush stroke.
          </p>
        </div>

        {/* Навигация */}
        <div className="flex flex-col gap-2 text-sm">
          <h4 className="text-lg font-semibold text-white mb-2">Navigation</h4>
          <Link to="/" className="hover:text-pink-400">Home</Link>
          <Link to="/about" className="hover:text-pink-400">About Us</Link>
          <Link to="/reviews" className="hover:text-pink-400">Reviews</Link>
          <Link to="/articles" className="hover:text-pink-400">Articles</Link>
          <Link to="/contact" className="hover:text-pink-400">Contact</Link>
        </div>

        {/* Социальные сети */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            <Link to="/articles" aria-label="Instagram" className="hover:text-pink-400">
              <Instagram size={24} />
            </Link>
            <Link to="/articles" aria-label="Facebook" className="hover:text-pink-400">
              <Facebook size={24} />
            </Link>
            <Link to="/articles" aria-label="Twitter" className="hover:text-pink-400">
              <Twitter size={24} />
            </Link>
            <Link to="/articles" aria-label="Youtube" className="hover:text-pink-400">
              <Youtube size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Нижний блок */}
      <div className="mt-16 text-center text-sm text-gray-400">
        © 2025 <span className="text-pink-400 font-semibold">MakeupMuses</span>. All rights reserved.
        <br />
        Designed with <Sparkles size={16} className="inline ml-1 text-pink-400" /> by BeautyDev Studio.
      </div>
    </footer>
  );
};

export default Footer;
