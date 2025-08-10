import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Github,
  ExternalLink,
  Heart,
  Star,
  Zap,
  Shield
} from 'lucide-react';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'About Us', path: '/about', icon: <Users size={16} /> },
    { name: 'Find Mentors', path: '/mentors', icon: <BookOpen size={16} /> },
    { name: 'AI Assistant', path: '/ai-assistant', icon: <Zap size={16} /> },
    { name: 'Contact', path: '/contact', icon: <MessageCircle size={16} /> },
  ];

  const services = [
    { name: 'One-on-One Tutoring', icon: <Users size={16} /> },
    { name: 'Group Study Sessions', icon: <Users size={16} /> },
    { name: 'Subject Expertise', icon: <BookOpen size={16} /> },
    { name: 'Career Guidance', icon: <Star size={16} /> },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={20} />, url: '#' },
    { name: 'Twitter', icon: <Twitter size={20} />, url: '#' },
    { name: 'Instagram', icon: <Instagram size={20} />, url: '#' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: '#' },
    { name: 'GitHub', icon: <Github size={20} />, url: '#' },
  ];

  return (
    <footer className={`relative mt-20 ${
      isDarkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900"
        : "bg-gradient-to-br from-white via-gray-50 to-[#7B61FF]/5"
    } transition-all duration-700`}>
      
      {/* Rounded upper corners */}
      <div className={`absolute top-0 left-0 w-16 h-16 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } rounded-br-[50px]`} 
      style={{
        clipPath: 'polygon(0 0, 100% 0, 0 100%)'
      }}
      />
      <div className={`absolute top-0 right-0 w-16 h-16 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } rounded-bl-[50px]`}
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
      }}
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute w-96 h-96 rounded-full opacity-5 ${
            isDarkMode ? 'bg-[#7B61FF]' : 'bg-[#7B61FF]/20'
          } blur-3xl`}
          style={{ top: '10%', right: '-10%' }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute w-80 h-80 rounded-full opacity-5 ${
            isDarkMode ? 'bg-[#7968ED]' : 'bg-[#7968ED]/20'
          } blur-3xl`}
          style={{ bottom: '10%', left: '-10%' }}
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.05, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 px-6 lg:px-12 pt-20 pb-8">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className={`p-3 rounded-2xl bg-gradient-to-br from-[#7B61FF] to-[#7968ED] shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <BookOpen size={32} className="text-white" />
                </motion.div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Learn Loop
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-[#7B61FF]' : 'text-[#7968ED]'
                  } font-medium`}>
                    Connect & Excel
                  </p>
                </div>
              </div>
              
              <p className={`text-base leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Empowering students through personalized mentorship and expert guidance. Connect with experienced tutors and unlock your academic potential.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className={`flex items-center space-x-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Mail size={16} className="text-[#7B61FF]" />
                  <span className="text-sm">support@learnloop.com</span>
                </div>
                <div className={`flex items-center space-x-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Phone size={16} className="text-[#7968ED]" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className={`flex items-center space-x-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <MapPin size={16} className="text-[#7B61FF]" />
                  <span className="text-sm">New York, NY 10001</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => navigate(link.path)}
                      className={`flex items-center space-x-3 group transition-colors duration-300 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-[#7B61FF]' 
                          : 'text-gray-600 hover:text-[#7968ED]'
                      }`}
                    >
                      <span className="group-hover:scale-110 transition-transform duration-300">
                        {link.icon}
                      </span>
                      <span className="text-sm font-medium">{link.name}</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`flex items-center space-x-3 group ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <span className="group-hover:scale-110 transition-transform duration-300 text-[#7B61FF]">
                        {service.icon}
                      </span>
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
              
              {/* Trust Badge */}
              <motion.div
                className={`p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-[#7B61FF]/10 border-[#7B61FF]/20' 
                    : 'bg-[#7B61FF]/5 border-[#7B61FF]/20'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Shield size={16} className="text-[#7B61FF]" />
                  <span className={`text-sm font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Trusted by 10K+ Students
                  </span>
                </div>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Secure, reliable, and effective learning platform
                </p>
              </motion.div>
            </motion.div>

            {/* Social Links & Newsletter */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Stay Connected
              </h4>
              
              {/* Social Icons */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gray-800 hover:bg-[#7B61FF] text-gray-300 hover:text-white'
                        : 'bg-gray-100 hover:bg-[#7968ED] text-gray-600 hover:text-white'
                    } hover:shadow-lg`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Subscribe to our newsletter for updates and learning tips
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`flex-1 px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#7B61FF] transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className={`pt-8 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className={`flex items-center space-x-2 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span>© 2025 Learn Loop. Made with</span>
                <Heart size={16} className="text-red-500 animate-pulse" />
                <span>for education</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <button className={`text-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-[#7B61FF]' 
                    : 'text-gray-500 hover:text-[#7968ED]'
                }`}>
                  Privacy Policy
                </button>
                <button className={`text-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-[#7B61FF]' 
                    : 'text-gray-500 hover:text-[#7968ED]'
                }`}>
                  Terms of Service
                </button>
                <button className={`text-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-[#7B61FF]' 
                    : 'text-gray-500 hover:text-[#7968ED]'
                }`}>
                  Cookie Policy
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
