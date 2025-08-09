import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';

import TeamMember from '../components/TeamMember.jsx';

  

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
      icon: "🌱",
      title: "Sustainability",
      description: "We're committed to eco-friendly practices and sustainable materials in all our products."
    },
    {
      icon: "✨",
      title: "Quality",
      description: "Every piece is crafted with attention to detail and built to last for generations."
    },
    {
      icon: "🎨",
      title: "Design Excellence",
      description: "Our designs blend functionality with aesthetic appeal to enhance your living spaces."
    },
    {
      icon: "🤝",
      title: "Customer First",
      description: "Your satisfaction is our priority. We provide exceptional service at every step."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Products Sold" },
    { number: "98%", label: "Customer Satisfaction" }
  ];

  return (
    <div className="bg-[#0d0d0d] text-white font-['Inter'] min-h-screen">
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
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500"
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

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent"
          >
            About ThakurStore
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            We're passionate about creating beautiful, functional spaces that reflect your unique style and enhance your everyday life.
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
              <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6">Our Story</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Founded in 2014, ThakurStore began as a small family business with a simple mission: to bring high-quality, affordable furniture to homes across the country. What started in a small workshop has grown into a trusted brand known for exceptional craftsmanship and customer service.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Today, we continue to honor our commitment to quality while embracing innovation and sustainable practices. Every piece we create tells a story of dedication, skill, and passion for beautiful design.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/images/mob17.jpg" 
                  alt="Our workshop" 
                  className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
        className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6">Our Values</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              These core principles guide everything we do and help us deliver exceptional experiences to our customers.
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
                className=" backdrop-blur-sm rounded-2xl text-center transition-all duration-300 border border-gray-700/30"
              >
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(138, 65, 198, 0.8)">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white-400 mb-4">{value.title}</h3>
                  <p className="text-white-300 leading-relaxed">{value.description}</p>
                </SpotlightCard>
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
                className="text-center"
              >
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(138, 65, 198, 0.8)">
                  <div className="text-4xl md:text-5xl font-bold text-white-400 mb-2">{stat.number}</div>
                  <div className="text-white-300 text-lg">{stat.label}</div>
                </SpotlightCard>
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
          <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6">Ready to Transform Your Space?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Discover our collection of premium furniture and let us help you create the home of your dreams.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Our Collection
          </motion.button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AboutPage;
