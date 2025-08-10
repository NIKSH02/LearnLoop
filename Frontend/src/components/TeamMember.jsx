import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const teamMembers = [
  {
    name: 'Nikhil Sharma',
    role: 'CEO & Founder',
    image: '/images/mob2.jpg',
    description: 'Visionary leader driving educational innovation'
  },
  {
    name: 'Roshan Singh',
    role: 'COO & Co-Founder',
    image: '/images/fest2.jpg',
    description: 'Operations expert ensuring seamless learning experiences'
  },
  {
    name: 'Sumesh Yadav',
    role: 'Chief Product Officer',
    image: '/images/fest12.jpg',
    description: 'Product strategist crafting intuitive learning platforms'
  },
  {
    name: 'Kshitij Bhare',
    role: 'CFO & Strategy Head',
    image: '/images/mob6.jpg',
    description: 'Financial architect building sustainable growth'
  },
];

const TeamSection = () => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={`relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 transition-all duration-700 ${
      isDarkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900"
        : "bg-gradient-to-br from-white via-gray-50 to-[#7B61FF]/5"
    }`}>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute w-96 h-96 rounded-full opacity-10 ${
            isDarkMode ? 'bg-[#7B61FF]' : 'bg-[#7B61FF]/20'
          } blur-3xl`}
          style={{ top: '10%', right: '-10%' }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute w-80 h-80 rounded-full opacity-10 ${
            isDarkMode ? 'bg-[#7968ED]' : 'bg-[#7968ED]/20'
          } blur-3xl`}
          style={{ bottom: '10%', left: '-10%' }}
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {/* Enhanced Heading with lavender theme */}
      <motion.div 
        className="relative text-center mb-16 z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Meet Our{' '}
          <span className="bg-gradient-to-r from-[#7B61FF] to-[#7968ED] bg-clip-text text-transparent">
            Team
          </span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          The passionate individuals behind Learn Loop who work tirelessly to revolutionize education and create exceptional learning experiences for students worldwide.
        </motion.p>
      </motion.div>

      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center z-10">
        {/* Team List with Enhanced Design */}
        <motion.div 
          className={`flex flex-col w-full max-w-5xl mx-auto rounded-3xl overflow-hidden ${
            isDarkMode 
              ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50" 
              : "bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-xl border border-gray-200/50"
          } shadow-2xl`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              onMouseEnter={() => setActiveIndex(index)}
              className={`relative flex items-center justify-between w-full px-8 md:px-16 py-6 md:py-8 text-xl font-medium transition-all duration-500 cursor-pointer group ${
                index === activeIndex 
                  ? `bg-gradient-to-r from-[#7B61FF] to-[#7968ED] text-white shadow-xl ${
                      isDarkMode ? 'shadow-[#7B61FF]/25' : 'shadow-[#7B61FF]/30'
                    }` 
                  : isDarkMode 
                    ? 'hover:bg-gray-700/50 text-gray-300' 
                    : 'hover:bg-gray-100/50 text-gray-700'
              } ${index < teamMembers.length - 1 ? (isDarkMode ? 'border-b border-gray-700/50' : 'border-b border-gray-200/50') : ''}`}
            >
              {/* Index number */}
              <span className={`text-sm font-bold w-12 ${
                index === activeIndex 
                  ? 'text-white/80' 
                  : isDarkMode 
                    ? 'text-[#7B61FF]' 
                    : 'text-[#7968ED]'
              }`}>
                {`0${index + 1}`}
              </span>
              
              {/* Name and description */}
              <div className="flex-1 text-left ml-4">
                <div className={`text-lg md:text-xl font-bold ${
                  index === activeIndex ? 'text-white' : ''
                }`}>
                  {member.name}
                </div>
                <div className={`text-sm mt-1 ${
                  index === activeIndex 
                    ? 'text-white/70' 
                    : isDarkMode 
                      ? 'text-gray-500' 
                      : 'text-gray-500'
                }`}>
                  {member.description}
                </div>
              </div>
              
              {/* Role */}
              <div className="text-right">
                <span className={`text-sm md:text-base font-semibold ${
                  index === activeIndex 
                    ? 'text-white/90' 
                    : isDarkMode 
                      ? 'text-[#7B61FF]' 
                      : 'text-[#7968ED]'
                }`}>
                  {member.role}
                </span>
              </div>

              {/* Enhanced Circular Image with better positioning */}
              {index === activeIndex && (
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 -top-20 md:-top-24 z-20"
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 ${
                    isDarkMode ? 'border-white' : 'border-white'
                  } shadow-2xl bg-gradient-to-br from-[#7B61FF] to-[#7968ED] p-1`}>
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Floating badge */}
                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    Lead
                  </motion.div>
                </motion.div>
              )}

              {/* Hover glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                  index === activeIndex ? 'hidden' : 'bg-gradient-to-r from-[#7B61FF] to-[#7968ED]'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
