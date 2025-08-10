import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import TeamMember from '../components/TeamMember.jsx';
import { useTheme } from '../context/ThemeContext';
import { BookOpen, Users, Heart, Star, Award, Target, Zap, Shield } from 'lucide-react';

  

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const AboutPage = () => {
  const { isDarkMode } = useTheme();
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const values = [
    {
      icon: <BookOpen size={40} className="text-[#7B61FF]" />,
      title: "Quality Education",
      description: "We connect students with experienced mentors who provide personalized guidance and expert knowledge."
    },
    {
      icon: <Users size={40} className="text-[#7968ED]" />,
      title: "Community Driven",
      description: "Building a supportive learning community where students and mentors grow together."
    },
    {
      icon: <Target size={40} className="text-[#7B61FF]" />,
      title: "Goal Oriented",
      description: "Focused on helping students achieve their academic and career objectives through structured mentorship."
    },
    {
      icon: <Heart size={40} className="text-[#7968ED]" />,
      title: "Passion for Learning",
      description: "We believe in the transformative power of education and the importance of accessible learning."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "5+", label: "Years Experience" },
    { number: "2K+", label: "Expert Mentors" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className={`min-h-screen font-['Inter'] transition-all duration-700 ${
      isDarkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900"
        : "bg-gradient-to-br from-white via-gray-50 to-[#7B61FF]/5"
    }`}>
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="relative py-20 px-4 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 2 === 0 ? 'bg-[#7B61FF]' : 'bg-[#7968ED]'
              }`}
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(80px)',
              }}
            />
          ))}
        </div>

        {/* Floating geometric shapes */}
        <motion.div
          className={`absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-[#7B61FF] to-[#7968ED] rounded-2xl shadow-2xl`}
          animate={{ 
            rotate: [0, 180, 360],
            y: [-10, 10, -10]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute top-32 right-32 w-12 h-12 bg-gradient-to-br from-[#7968ED] to-[#7B61FF] rounded-full shadow-xl`}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [-5, 5, -5]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.h1 
            variants={fadeInUp}
            className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#7B61FF] via-[#7968ED] to-[#7B61FF] bg-clip-text text-transparent`}
          >
            About Learn Loop
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Empowering students through personalized mentorship and expert guidance. Connect with experienced tutors and unlock your academic potential.
          </motion.p>
          <TeamMember />
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        ref={storyRef}
        initial="hidden"
        animate={storyInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] bg-clip-text text-transparent`}>
                Our Story
              </h2>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Founded in 2020, Learn Loop began with a simple mission: to democratize access to quality education through personalized mentorship. What started as a small platform connecting students with tutors has grown into a comprehensive learning ecosystem.
              </p>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Today, we continue to innovate in the education space, leveraging technology to create meaningful connections between learners and mentors. Every interaction on our platform tells a story of growth, achievement, and the transformative power of quality education.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <div className={`relative overflow-hidden rounded-2xl shadow-2xl border ${
                isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30'
              }`}>
                <div className={`w-full h-[400px] flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                  <div className="text-center">
                    <BookOpen size={80} className="text-[#7B61FF] mx-auto mb-4" />
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Education Excellence
                    </h3>
                    <p className={`mt-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Transforming lives through learning
                    </p>
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDarkMode ? 'from-gray-900/50 to-transparent' : 'from-white/50 to-transparent'
                }`}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
       

      {/* Values Section */}
      <motion.section 
        ref={valuesRef}
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className={`py-20 px-4 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-gray-900/50 to-transparent' 
            : 'bg-gradient-to-b from-[#7B61FF]/5 to-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] bg-clip-text text-transparent`}>
              Our Values
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              These core principles guide everything we do and help us deliver exceptional learning experiences to our students.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-8 rounded-2xl text-center transition-all duration-300 border backdrop-blur-sm hover:shadow-2xl hover:scale-105 ${
                  isDarkMode
                    ? 'bg-gray-800/50 border-gray-700/30 hover:border-[#7B61FF]/50'
                    : 'bg-white/50 border-gray-200/30 hover:border-[#7968ED]/50'
                }`}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {value.title}
                </h3>
                <p className={`leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        ref={statsRef}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`text-center p-6 rounded-2xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gray-800/30 hover:bg-gray-800/50'
                    : 'bg-white/30 hover:bg-white/50'
                } backdrop-blur-sm border ${
                  isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30'
                } hover:border-[#7B61FF]/50`}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className={`text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

    
      {/* Call to Action */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] bg-clip-text text-transparent`}>
            Ready to Start Learning?
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of students who have transformed their academic journey through our personalized mentorship platform.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#7B61FF] to-[#7968ED] text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => window.location.href = '/mentors'}
          >
            Find Your Mentor
          </motion.button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AboutPage;
