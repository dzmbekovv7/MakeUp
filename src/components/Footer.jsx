import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#2b0a3d] via-[#1a052d] to-[#2b0a3d] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* О нас */}
        <div className="md:w-1/3">
          <h3 className="text-3xl font-bold text-pink-400 mb-4">MakeupMuses</h3>
          <p className="text-base text-gray-300">
            Empowering beauty through creativity. We bring out your inner glow
            with every brush stroke.
          </p>
        </div>

        {/* Навигация */}
        <div className="md:w-2/3 flex flex-col gap-4">
          <h4 className="text-xl font-semibold text-white">Navigation</h4>
          <div className="flex flex-wrap gap-6 text-lg">
            <Link to="/" className="hover:text-pink-400 transition">Home</Link>
            <Link to="/about" className="hover:text-pink-400 transition">About Us</Link>
            <Link to="/reviews" className="hover:text-pink-400 transition">Reviews</Link>
            <Link to="/articles" className="hover:text-pink-400 transition">Articles</Link>
            <Link to="/contact" className="hover:text-pink-400 transition">Contact</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
