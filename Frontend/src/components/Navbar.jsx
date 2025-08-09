import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  Sun,
  Moon,
  Sparkles,
  User,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import NotificationBadge from "./NotificationBadge";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  // Helper function to get the correct profile route based on user role
  const getProfileRoute = () => {
    if (!user || !user.role) {
      return "/profile"; // Default fallback
    }

    switch (user.role.toLowerCase()) {
      case "mentor":
        return "/MentorProfile";
      case "student":
        return "/StudentProfile";
      default:
        return "/profile"; // Default fallback
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still navigate even if logout fails
      navigate("/");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{
          background: scrolled
            ? isDarkMode
              ? "rgba(17, 24, 39, 0.95)"
              : "rgba(255, 255, 255, 0.95)"
            : isDarkMode
            ? "rgba(17, 24, 39, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: isDarkMode
            ? "1px solid rgba(147, 51, 234, 0.3)"
            : "1px solid rgba(147, 51, 234, 0.2)",
          boxShadow: scrolled
            ? isDarkMode
              ? "0 8px 32px rgba(147, 51, 234, 0.15)"
              : "0 8px 32px rgba(147, 51, 234, 0.12)"
            : "none",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <motion.div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-2xl font-black tracking-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-purple-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
                >
                  TutorLink
                </span>
                <span
                  className={`text-xs font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } group-hover:text-purple-500 transition-colors duration-300`}
                >
                  Learn • Connect • Grow
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={`relative px-4 py-2 font-semibold text-lg transition-all duration-300 group ${
                      isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50"
                    : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 hover:text-gray-900 border border-gray-200/50"
                } backdrop-blur-sm hover:scale-105`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Auth Section */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {/* Notification Badge */}
                  <NotificationBadge />

                  <motion.button
                    onClick={() => navigate(getProfileRoute())}
                    className={`flex items-center space-x-2 px-4 py-3 font-semibold rounded-xl transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50"
                        : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 hover:text-gray-900 border border-gray-200/50"
                    } backdrop-blur-sm hover:scale-105`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </motion.button>

                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-6 py-3 font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Link
                      to="/login"
                      className={`flex items-center space-x-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                        isDarkMode
                          ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50"
                          : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 hover:text-gray-900 border border-gray-200/50"
                      } backdrop-blur-sm hover:scale-105`}
                    >
                      <LogIn size={18} />
                      <span>Login</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Link
                      to="/signup"
                      className="flex items-center space-x-2 px-6 py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                    >
                      <UserPlus size={18} />
                      <span>Sign Up</span>
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 text-gray-300 border border-gray-700/50"
                    : "bg-gray-100/50 text-gray-600 border border-gray-200/50"
                } backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              <motion.button
                onClick={toggleMenu}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 text-gray-300 border border-gray-700/50"
                    : "bg-gray-100/50 text-gray-600 border border-gray-200/50"
                } backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`lg:hidden fixed inset-0 z-40 ${
              isDarkMode ? "bg-gray-900/95" : "bg-white/95"
            } backdrop-blur-xl`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ marginTop: "80px" }}
          >
            <div className="flex flex-col h-full p-8 space-y-8">
              {/* Mobile Navigation Links */}
              <div className="space-y-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-2xl font-bold py-4 px-6 rounded-2xl transition-all duration-300 ${
                        isDarkMode
                          ? "text-white hover:bg-gray-800/50"
                          : "text-gray-900 hover:bg-gray-100/50"
                      } hover:scale-105 hover:translate-x-2`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div className="space-y-4 pt-8 border-t border-gray-700/20">
                {isLoggedIn ? (
                  <>
                    <motion.button
                      onClick={() => {
                        navigate(getProfileRoute());
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-center space-x-3 px-6 py-4 font-bold text-lg rounded-2xl transition-all duration-300 ${
                        isDarkMode
                          ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
                          : "bg-gray-100/50 text-gray-700 hover:bg-gray-200/50 border border-gray-200/50"
                      } hover:scale-105`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <User size={20} />
                      <span>My Profile</span>
                    </motion.button>

                    <motion.button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-3 px-6 py-4 font-bold text-lg text-white bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className={`w-full flex items-center justify-center space-x-3 px-6 py-4 font-bold text-lg rounded-2xl transition-all duration-300 ${
                          isDarkMode
                            ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
                            : "bg-gray-100/50 text-gray-700 hover:bg-gray-200/50 border border-gray-200/50"
                        } hover:scale-105`}
                      >
                        <LogIn size={20} />
                        <span>Login</span>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <Link
                        to="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full flex items-center justify-center space-x-3 px-6 py-4 font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <UserPlus size={20} />
                        <span>Sign Up</span>
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Mobile Footer */}
              <div className="flex-1 flex items-end">
                <motion.div
                  className={`w-full text-center py-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">TutorLink</span>
                  </div>
                  <p className="text-xs">Learn • Connect • Grow</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
