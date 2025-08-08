import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, UserPlus, LogOut, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const MinimalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme(); // Use our theme context
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        background: isDarkMode
          ? "rgba(15, 15, 15, 0.9)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isDarkMode
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: isDarkMode
          ? "0 4px 20px rgba(0, 0, 0, 0.6)"
          : "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="text-xl font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
            style={{
              color: isDarkMode ? "#fff" : "#111",
              textShadow: isDarkMode
                ? "0 0 10px rgba(255, 255, 255, 0.3)"
                : "0 0 5px rgba(0,0,0,0.1)",
            }}
          >
            STELLAR
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative px-3 py-2 font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    color: isDarkMode ? "#fff" : "#111",
                    textShadow: isDarkMode
                      ? "0 0 8px rgba(255, 255, 255, 0.2)"
                      : "0 0 5px rgba(0,0,0,0.1)",
                  }}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mystry Button */}
              <Link
                to="/text"
                className="flex items-center space-x-2 px-4 py-2 font-medium transition-all duration-300 hover:scale-105 rounded-lg"
                style={{
                  background: isDarkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  border: isDarkMode
                    ? "1px solid rgba(255, 255, 255, 0.2)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                  color: isDarkMode ? "#fff" : "#111",
                }}
              >
                <LogIn size={18} />
                <span>Mystry ✌🏻</span>
              </Link>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 font-medium transition-all duration-300 hover:scale-105 rounded-lg"
                    style={{
                      background: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                      border: isDarkMode
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                      color: isDarkMode ? "#fff" : "#111",
                    }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 px-4 py-2 font-medium transition-all duration-300 hover:scale-105 rounded-lg"
                      style={{
                        background: isDarkMode
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                        border: isDarkMode
                          ? "1px solid rgba(255, 255, 255, 0.2)"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                        color: isDarkMode ? "#fff" : "#111",
                      }}
                    >
                      <LogIn size={18} />
                      <span>Login</span>
                    </Link>

                    <Link
                      to="/signup"
                      className="flex items-center space-x-2 px-4 py-2 font-medium transition-all duration-300 hover:scale-105 rounded-lg"
                      style={{
                        background: isDarkMode
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                        border: isDarkMode
                          ? "1px solid rgba(255, 255, 255, 0.2)"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                        color: isDarkMode ? "#fff" : "#111",
                      }}
                    >
                      <UserPlus size={18} />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: isDarkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  border: isDarkMode
                    ? "1px solid rgba(255, 255, 255, 0.2)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                  color: isDarkMode ? "#fff" : "#111",
                }}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Button in Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
                border: isDarkMode
                  ? "1px solid rgba(255, 255, 255, 0.2)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
                color: isDarkMode ? "#fff" : "#111",
              }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                background: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
                border: isDarkMode
                  ? "1px solid rgba(255, 255, 255, 0.2)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
                color: isDarkMode ? "#fff" : "#111",
              }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MinimalNavbar;
