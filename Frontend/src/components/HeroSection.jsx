import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const slides = [
  { 
    text: "Connect Students with Expert Mentors", 
    subtext: "Find the perfect tutor for any subject and unlock your potential",
    image: "r6.jpg",
    highlight: "Connect & Learn",
    color: "from-[#7B61FF] to-[#7968ED]"
  },
  { 
    text: "Get Personalized Academic Support", 
    subtext: "One-on-one guidance from experienced seniors and professionals",
    image: "r2.jpg",
    highlight: "Expert Guidance",
    color: "from-[#7968ED] to-[#7B61FF]"
  },
  { 
    text: "Access On-Demand Learning", 
    subtext: "Instant help whenever you need it, in any subject you choose",
    image: "r4.jpg",
    highlight: "Instant Support",
    color: "from-[#7B61FF] to-[#7968ED]"
  },
];

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`relative flex flex-col lg:flex-row items-center justify-between w-full min-h-screen px-6 lg:px-12 py-20 transition-all duration-700 overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900"
          : "bg-gradient-to-br from-white via-gray-50 to-[#7B61FF]/5"
      }`}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div 
          className={`absolute w-96 h-96 rounded-full opacity-20 ${isDarkMode ? 'bg-[#7B61FF]' : 'bg-[#7B61FF]/30'} blur-3xl`}
          style={{ top: '-10%', right: '-10%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute w-80 h-80 rounded-full opacity-20 ${isDarkMode ? 'bg-[#7968ED]' : 'bg-[#7968ED]/30'} blur-3xl`}
          style={{ bottom: '-10%', left: '-10%' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid pattern */}
        <div className={`absolute inset-0 opacity-5 ${isDarkMode ? 'opacity-5' : 'opacity-10'}`}>
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `linear-gradient(${isDarkMode ? '#7B61FF' : '#7968ED'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#7B61FF' : '#7968ED'} 1px, transparent 1px)`,
                 backgroundSize: '50px 50px'
               }}
          />
        </div>

        {/* Floating geometric shapes */}
        <motion.div
          className={`absolute top-20 left-20 w-16 h-16 ${isDarkMode ? 'bg-gradient-to-br from-[#7B61FF] to-[#7968ED]' : 'bg-gradient-to-br from-[#7B61FF] to-[#7968ED]'} rounded-2xl shadow-2xl`}
          animate={{ 
            rotate: [0, 180, 360],
            y: [-10, 10, -10]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute top-32 right-32 w-12 h-12 ${isDarkMode ? 'bg-gradient-to-br from-[#7968ED] to-[#7B61FF]' : 'bg-gradient-to-br from-[#7968ED] to-[#7B61FF]'} rounded-full shadow-xl`}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [-5, 5, -5]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-32 left-40 w-8 h-8 ${isDarkMode ? 'bg-[#7B61FF]' : 'bg-[#7968ED]'} rounded-lg shadow-lg`}
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Enhanced Text Content */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-start justify-center p-6 text-left z-10 space-y-8">
        {/* Badge */}
        <motion.div
          key={slides[index].highlight}
          className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-bold tracking-wide uppercase ${
            isDarkMode 
              ? 'bg-gradient-to-r from-[#7B61FF]/20 to-[#7968ED]/20 text-[#7B61FF] border border-[#7B61FF]/30 backdrop-blur-sm' 
              : 'bg-gradient-to-r from-[#7B61FF]/10 to-[#7968ED]/10 text-[#7968ED] border border-[#7B61FF]/30 shadow-lg'
          }`}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`w-2 h-2 rounded-full mr-3 ${isDarkMode ? 'bg-[#7B61FF]' : 'bg-[#7968ED]'} animate-pulse`} />
          {slides[index].highlight}
        </motion.div>

        {/* Main Heading */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={slides[index].text}
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {slides[index].text.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className={i === slides[index].text.split(' ').length - 1 || i === slides[index].text.split(' ').length - 2 
                  ? `bg-gradient-to-r ${slides[index].color} bg-clip-text text-transparent` 
                  : ''
                }
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </motion.h1>
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={slides[index].subtext}
            className={`text-lg md:text-xl font-medium leading-relaxed max-w-2xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {slides[index].subtext}
          </motion.p>
        </AnimatePresence>

        {/* Enhanced Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button 
            onClick={() => navigate('/meet-your-guide')}
            className={`group relative px-8 py-4 bg-gradient-to-r ${slides[index].color} text-white font-bold rounded-2xl shadow-2xl hover:shadow-[#7B61FF]/25 transition-all duration-300 overflow-hidden`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center space-x-3">
              <span className="text-lg">Meet Your Guide</span>
              <motion.svg 
                viewBox="0 0 24 24" 
                width="20" 
                height="20" 
                fill="none"
                className="group-hover:translate-x-1 transition-transform duration-300"
                whileHover={{ x: 3 }}
              >
                <path 
                  d="M5 12h14m-7-7l7 7-7 7" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
          </motion.button>

          <motion.button 
            className={`group px-8 py-4 font-bold rounded-2xl border-2 transition-all duration-300 ${
              isDarkMode
                ? 'border-gray-600 text-gray-300 hover:border-[#7B61FF] hover:text-[#7B61FF] hover:bg-[#7B61FF]/10'
                : 'border-gray-300 text-gray-700 hover:border-[#7968ED] hover:text-[#7968ED] hover:bg-[#7B61FF]/5 hover:shadow-lg'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">Watch Demo</span>
          </motion.button>
        </motion.div>

        {/* Enhanced Slide Indicators */}
        <div className="flex items-center space-x-3 pt-6">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-12 h-3' 
                  : 'w-3 h-3'
              }`}
              onClick={() => setIndex(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`absolute inset-0 rounded-full ${
                i === index
                  ? `bg-gradient-to-r ${slides[index].color}`
                  : isDarkMode 
                    ? 'bg-gray-600 hover:bg-gray-500' 
                    : 'bg-gray-400 hover:bg-gray-500'
              }`} />
              {i === index && (
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Enhanced Image/Card Section */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-6 z-10">
        <motion.div
          className={`relative rounded-3xl overflow-hidden ${
            isDarkMode 
              ? "bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50" 
              : "bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl border border-gray-200/50"
          } shadow-2xl`}
          style={{ width: 480, height: 480 }}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Premium glass effect border */}
          <div className="absolute inset-0 rounded-3xl">
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${
              isDarkMode 
                ? 'from-white/10 via-transparent to-transparent' 
                : 'from-white/40 via-transparent to-transparent'
            }`} />
          </div>

          {/* Corner decorative elements */}
          <motion.div
            className={`absolute -top-4 -right-4 w-16 h-16 ${isDarkMode ? 'bg-gradient-to-br from-[#7B61FF] to-[#7968ED]' : 'bg-gradient-to-br from-[#7B61FF] to-[#7968ED]'} rounded-2xl shadow-xl flex items-center justify-center z-10`}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
            </svg>
          </motion.div>

          <motion.div
            className={`absolute -bottom-4 -left-4 w-14 h-14 ${isDarkMode ? 'bg-gradient-to-br from-[#7B61FF] to-[#7968ED]' : 'bg-gradient-to-br from-[#7B61FF] to-[#7968ED]'} rounded-2xl shadow-xl flex items-center justify-center z-10`}
            animate={{ 
              rotate: [360, 0],
              y: [-5, 5, -5]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          {/* Enhanced rotating border */}
          <div className="absolute inset-4 rounded-3xl pointer-events-none">
            <motion.div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${slides[index].color} p-[2px]`}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className={`w-full h-full rounded-3xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} opacity-90`} />
            </motion.div>
          </div>

          {/* Main image container */}
          <div className="relative p-8 h-full flex items-center justify-center">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slides[index].image}
                  src={`/images/${slides[index].image}`}
                  alt="slide"
                  className="object-contain max-w-[320px] max-h-[400px] rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: 90 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </AnimatePresence>

              {/* Premium image overlay */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-t ${
                isDarkMode 
                  ? 'from-gray-900/30 via-transparent to-white/10' 
                  : 'from-gray-100/30 via-transparent to-white/20'
              } pointer-events-none`} />

              {/* Floating stats cards */}
              <motion.div
                className={`absolute -top-6 -left-6 px-4 py-2 rounded-xl ${
                  isDarkMode 
                    ? 'bg-gray-800/90 border border-gray-700' 
                    : 'bg-white/90 border border-gray-200'
                } backdrop-blur-sm shadow-xl`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-[#7B61FF]' : 'text-[#7968ED]'}`}>
                  1000+
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active Mentors
                </div>
              </motion.div>

              <motion.div
                className={`absolute -bottom-6 -right-6 px-4 py-2 rounded-xl ${
                  isDarkMode 
                    ? 'bg-gray-800/90 border border-gray-700' 
                    : 'bg-white/90 border border-gray-200'
                } backdrop-blur-sm shadow-xl`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-[#7B61FF]' : 'text-[#7968ED]'}`}>
                  5000+
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Students Helped
                </div>
              </motion.div>
            </div>

            {/* Animated particles */}
            <motion.div
              className={`absolute top-8 left-8 w-3 h-3 rounded-full ${isDarkMode ? 'bg-[#7B61FF]' : 'bg-[#7968ED]'}`}
              animate={{ 
                y: [-10, 10, -10],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className={`absolute bottom-8 right-8 w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#7B61FF]' : 'bg-[#7968ED]'}`}
              animate={{ 
                x: [-8, 8, -8],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className={`absolute top-1/2 left-4 w-1 h-1 rounded-full ${isDarkMode ? 'bg-[#7B61FF]' : 'bg-[#7968ED]'}`}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>
        </motion.div>

        {/* Additional floating elements around the card */}
        <motion.div
          className={`absolute top-20 -left-8 w-20 h-20 ${isDarkMode ? 'bg-[#7B61FF]/20' : 'bg-[#7B61FF]/10'} rounded-2xl backdrop-blur-sm border ${isDarkMode ? 'border-[#7B61FF]/30' : 'border-[#7968ED]/30'}`}
          animate={{ 
            rotate: [0, 180, 360],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className={`absolute bottom-16 -right-8 w-16 h-16 ${isDarkMode ? 'bg-[#7968ED]/20' : 'bg-[#7968ED]/10'} rounded-full backdrop-blur-sm border ${isDarkMode ? 'border-[#7968ED]/30' : 'border-[#7B61FF]/30'}`}
          animate={{ 
            y: [-15, 15, -15],
            x: [-5, 5, -5]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
