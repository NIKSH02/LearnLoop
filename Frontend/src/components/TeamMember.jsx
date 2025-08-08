import React, { useState } from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Nikhil Sharma',
    role: 'CEO',
    image: '/images/mob2.jpg',
  },
  {
    name: 'Roshan SIngh',
    role: 'COO',
    image: '/images/fest2.jpg',
  },
  {
    name: 'Sumesh Yadav',
    role: 'Chief Product Officer',
    image: '/images/fest12.jpg',
  },
  {
    name: 'Kshitij Bhare',
    role: 'CFO',
    image: '/images/mob6.jpg',
  },
];

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center py-20 px-4">
      {/* Enhanced Heading with AboutPage Style */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-blue-400 mb-6"
        >
          Meet Our Team
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
        >
          The passionate individuals behind ThakurStore who work tirelessly to bring you the best furniture and exceptional service.
        </motion.p>
      </motion.div>

      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">
        {/* Team List */}
        <motion.div 
          className="flex flex-col divide-y divide-gray-300 w-full max-w-5xl mx-auto"
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
              className={`relative flex items-center justify-between w-full px-16 py-8 text-xl font-medium transition-all duration-300 cursor-pointer
                ${index === activeIndex ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
            >
              <span className="text-sm text-gray-400 w-12">{`0${index + 1}`}</span>
              <span className="flex-1 text-left">{member.name}</span>
              <span className="text-sm opacity-70">{member.role}</span>

              {/* Circular Image Overlayed ON the active tab */}
              {index === activeIndex && (
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 -top-16 z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
