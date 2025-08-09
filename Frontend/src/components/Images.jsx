import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Images = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`w-full min-h-screen flex items-center justify-center px-8 py-16 transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-black via-gray-900 to-black"
          : "bg-gradient-to-r from-gray-100 via-white to-gray-100"
      }`}
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-transparent">
        
        {/* Left Section */}
        <div
          className={`relative p-10 flex flex-col justify-between transition-all duration-300 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-[#f3f6f3] text-black"
          }`}
        >
          {/* Top-right arrow */}
          <ArrowUpRight
            className={`absolute top-6 right-6 w-6 h-6 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:text-blue-500 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          />

          {/* Text Content */}
          <div>
            <p
              className={`text-sm mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Welcome to Our Platform
            </p>

            <h1
              className={`text-4xl font-bold leading-snug transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Place Your Request or Ask Your Question <br />
              and We'll Get Back to You
            </h1>
          </div>

          <div
            className={`flex flex-wrap gap-6 items-center text-lg font-medium transition-colors duration-300 ${
              isDarkMode ? "text-gray-200" : "text-black"
            }`}
          >
            <span>Fast Response</span>
            <span>Expert Help</span>
            <span>Reliable Support</span>
            <span>Available 24/7</span>
          </div>
        </div>

        {/* Right Section */}
        <div
          className={`flex items-center justify-center transition-all duration-300 ${
            isDarkMode
              ? "bg-gradient-to-b from-gray-700 to-gray-900"
              : "bg-gradient-to-b from-[#f8f8f8] to-[#e6e6e6]"
          }`}
        >
          <img
            src="/images/book.jpg"
            alt="Books and Coffee"
            className={`w-[700px] h-[500px] object-cover shadow-xl transition-all duration-300 ${
              isDarkMode ? "opacity-80 contrast-110" : "opacity-100"
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default Images;
