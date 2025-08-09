import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const slides = [
  { 
    text: "Create a platform that connects students", 
    image: "r6.jpg",
    highlight: "Connect & Learn"
  },
  { 
    text: "who need help in specific subjects with their mentors or seniors who can tutor them", 
    image: "r2.jpg",
    highlight: "Expert Guidance"
  },
  { 
    text: "enabling on-demand, subject-specific help", 
    image: "r4.jpg",
    highlight: "Instant Support"
  },
];

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((p) => (p + 1) % slides.length), 3000);
    return () => clearInterval(interval);
  }, []);

  const pageBg = isDarkMode ? "#0b1220" : "#fbf7f2";

  return (
    <section
      className={`relative flex flex-col md:flex-row items-center justify-center w-full h-screen px-6 transition-colors duration-500 overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black"
      }`}
      style={{ "--page-bg": pageBg }}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left */}
        <div className="absolute top-8 left-8">
          <div className={`w-20 h-20 rounded-2xl ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-100/80'} backdrop-blur-sm border ${isDarkMode ? 'border-purple-400/30' : 'border-purple-300/50'} flex items-center justify-center`}>
            <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-purple-400' : 'bg-purple-600'} animate-pulse`}></div>
          </div>
        </div>
        {/* Top-right */}
        <div className="absolute top-12 right-12">
          <div className={`w-16 h-16 rounded-xl ${isDarkMode ? 'bg-pink-500/10' : 'bg-pink-100/80'} backdrop-blur-sm border ${isDarkMode ? 'border-pink-400/30' : 'border-pink-300/50'} rotate-12 animate-bounce`}></div>
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-16 left-16">
          <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-200/60'} animate-pulse`}></div>
        </div>
        {/* Bottom-right arrow */}
        <div className="absolute bottom-12 right-16">
          <motion.div
            className={`w-14 h-14 rounded-full ${isDarkMode ? 'bg-gradient-to-br from-purple-600 to-pink-500' : 'bg-gradient-to-br from-purple-500 to-pink-400'} flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow border-2 ${isDarkMode ? 'border-white/20' : 'border-white/60'}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M7 17L17 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 7v10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4">
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-pink-400' : 'bg-pink-500'} animate-ping`}></div>
        </div>
        <div className="absolute top-3/4 right-1/4">
          <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-purple-400' : 'bg-purple-500'} animate-bounce delay-700`}></div>
        </div>
      </div>

      {/* Text content */}
      <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center p-6 text-center md:text-left z-10">
        <motion.div
          key={slides[index].highlight}
          className={`mb-4 px-4 py-2 rounded-full text-sm font-medium ${
            isDarkMode 
              ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' 
              : 'bg-purple-100 text-purple-700 border border-purple-300/40'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {slides[index].highlight}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={slides[index].text}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-6"
            style={{ color: isDarkMode ? '#B9A8FF' : '#7B61FF' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            {slides[index].text}
          </motion.h1>
        </AnimatePresence>

        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Primary Get Started Button with Arrow */}
          <button 
            className={`group px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
              isDarkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25'
                : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-purple-500/25'
            } hover:scale-105 transform`}
          >
            <span>Get Started</span>
            <svg 
              viewBox="0 0 24 24" 
              width="18" 
              height="18" 
              fill="none" 
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path 
                d="M5 12h14m-7-7l7 7-7 7" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Secondary Learn More Button */}
          <button 
            className={`px-6 py-4 rounded-full font-medium transition-all duration-300 border-2 ${
              isDarkMode
                ? 'border-gray-500 hover:border-purple-400 text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'
                : 'border-gray-400 hover:border-purple-500 text-gray-700 hover:text-purple-600 hover:bg-purple-50'
            } hover:scale-105 transform`}
          >
            Learn More
          </button>
        </motion.div>

        <div className="flex space-x-2 mt-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? isDarkMode ? 'bg-purple-400' : 'bg-purple-600'
                  : isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Image/Card */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 z-10">
        <motion.div
          className={`relative rounded-[2rem] p-8 flex items-center justify-center  ${
            isDarkMode ? "bg-gray-800/80 backdrop-blur-sm" : "bg-gray-50/80 backdrop-blur-sm"
          } border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}
          style={{ width: 420, height: 420 }}
        >
          {/* Notches */}
          <div
            className={`absolute w-26 h-20 rounded-[14px] ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
            style={{ top: "-16px", left: "-16px", borderBottomRightRadius: "14px" }}
          >
            <div className={`absolute bottom-2 right-2 w-3 h-3 rounded-full ${isDarkMode ? 'bg-purple-400' : 'bg-purple-600'} animate-pulse`}></div>
          </div>
          <div
            className={`absolute w-16 h-16 rounded-[14px] ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
            style={{ bottom: "-16px", right: "-16px", borderTopLeftRadius: "14px" }}
          >
            <div className={`absolute top-2 left-2 w-3 h-3 rounded-full ${isDarkMode ? 'bg-pink-400' : 'bg-pink-600'} animate-bounce`}></div>
          </div>

          {/* Rotating border */}
          <div className="absolute inset-0 rounded-[2rem] pointer-events-none">
            <motion.div
              className={`absolute inset-0 rounded-[2rem] border-2 border-dashed ${isDarkMode ? 'border-purple-500/30' : 'border-purple-500/40'}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full animate-bounce shadow-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Image that changes */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[index].image}
                src={`/images/${slides[index].image}`}
                alt="slide"
                className="object-contain max-w-[260px] max-h-[340px] rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>

            {/* Overlay */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-t ${isDarkMode ? 'from-gray-900/20 to-transparent' : 'from-gray-50/20 to-transparent'} pointer-events-none`}></div>
          </div>

          {/* Floating small elements */}
          <motion.div
            className={`absolute top-4 left-4 w-6 h-6 rounded-full ${isDarkMode ? 'bg-pink-400/80' : 'bg-pink-500/80'}`}
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute bottom-4 right-4 w-4 h-4 rounded-full ${isDarkMode ? 'bg-purple-400/80' : 'bg-purple-500/80'}`}
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
