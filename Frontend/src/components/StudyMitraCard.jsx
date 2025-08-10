
import React from "react";
import { ArrowUpRight, BookOpen, Brain, Target, Sparkles, GraduationCap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";


export default function StudyMitraCard() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleNavigateToAI = () => {
    navigate('/ai-assistant');
  };
  

 

  return (
    <section
      className={`w-full min-h-screen flex items-center justify-center px-8 py-16 transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-[#7B61FF]/10 to-[#d7d4e0]/5"
          : "bg-gradient-to-r from-[#d7d4e0]/20 via-white to-[#7B61FF]/10"
      }`}
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-transparent">
        
        {/* Left Section - Enhanced 3D Animation */}
        <div
          className={`flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-800 via-[#7B61FF]/10 to-[#d7d4e0]/10"
              : "bg-gradient-to-br from-[#d7d4e0]/20 via-[#7B61FF]/5 to-[#7968ED]/10"
          }`}
        >
          {/* 3D Scene Container */}
          <div className="relative w-[700px] h-[500px] flex items-center justify-center perspective-1000">
            
            {/* Main Central Element - Floating Book */}
            <div className="relative z-30 transform-gpu">
              <div className="animate-float">
                <BookOpen 
                  size={120} 
                  className={`drop-shadow-2xl transition-colors duration-300 ${
                    isDarkMode ? "text-[#7B61FF]" : "text-[#7968ED]"
                  }`}
                />
              </div>
            </div>

            {/* Orbiting Elements */}
            <div className="absolute inset-0 animate-orbit-slow">
              <div className="relative w-full h-full">
                {/* Brain Icon */}
                <div className="absolute top-16 right-20 animate-pulse">
                  <Brain 
                    size={50} 
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-[#7968ED]" : "text-[#7B61FF]"
                    }`}
                  />
                </div>
                
                {/* Target Icon */}
                <div className="absolute bottom-16 left-20 animate-bounce-slow">
                  <Target 
                    size={45} 
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-[#d7d4e0]" : "text-[#7968ED]"
                    }`}
                  />
                </div>

                {/* Graduation Cap */}
                <div className="absolute top-1/3 left-16 animate-sway">
                  <GraduationCap 
                    size={40} 
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-[#7B61FF]" : "text-[#7968ED]"
                    }`}
                  />
                </div>

                {/* Sparkles */}
                <div className="absolute bottom-1/3 right-16 animate-twinkle">
                  <Sparkles 
                    size={35} 
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-[#d7d4e0]" : "text-[#7B61FF]"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Background Geometric Shapes */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Outer Ring */}
              <div 
                className={`w-80 h-80 rounded-full border-2 border-opacity-20 animate-spin-very-slow transition-colors duration-300 ${
                  isDarkMode ? "border-[#7B61FF]" : "border-[#7968ED]"
                }`}
              ></div>
              
              {/* Middle Ring */}
              <div 
                className={`absolute w-60 h-60 rounded-full border border-opacity-30 animate-spin-reverse transition-colors duration-300 ${
                  isDarkMode ? "border-[#7968ED]" : "border-[#7B61FF]"
                }`}
              ></div>
              
              {/* Inner Ring */}
              <div 
                className={`absolute w-40 h-40 rounded-full border border-opacity-40 animate-pulse transition-colors duration-300 ${
                  isDarkMode ? "border-[#d7d4e0]" : "border-[#7968ED]"
                }`}
              ></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full animate-float-particle transition-colors duration-300 ${
                    isDarkMode ? "bg-[#7B61FF]" : "bg-[#7968ED]"
                  }`}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    opacity: 0.6
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Text Content */}
        <div
          className={`relative p-10 flex flex-col justify-between transition-all duration-300 ${
            isDarkMode ? "bg-gradient-to-br from-gray-800 to-[#7B61FF]/10 text-white" : "bg-gradient-to-br from-[#d7d4e0]/10 to-white text-black"
          }`}
        >
          {/* Top-right arrow */}
          <ArrowUpRight
            onClick={handleNavigateToAI}
            className={`absolute top-6 right-6 w-6 h-6 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:text-[#d7d4e0] ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          />

          {/* Text Content */}
          <div>
            <p
              className={`text-sm mb-4 font-medium transition-colors duration-300 ${
                isDarkMode ? "text-[#d7d4e0]" : "text-[#7968ED]"
              }`}
            >
              Introducing Your Personal AI
            </p>

            <h1
              className={`text-4xl font-bold leading-snug mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              I am your <span className="bg-gradient-to-r from-[#d7d4e0] to-[#7968ED] bg-clip-text text-transparent">Study Mitra</span> <br />
              Your AI Learning Companion
            </h1>

            <p
              className={`text-lg mb-8 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Helping you learn smarter, faster, and better every day with <span className={`font-semibold ${isDarkMode ? "text-[#d7d4e0]" : "text-[#7968ED]"}`}>personalized AI assistance</span>.
            </p>
          </div>

          {/* Feature Tags */}
          <div
            className={`flex flex-wrap gap-4 items-center text-sm font-medium transition-colors duration-300 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <span className={`flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? "hover:text-[#d7d4e0]" : "hover:text-[#7968ED]"
            }`}>
              <Brain className={`w-4 h-4 ${isDarkMode ? "text-[#d7d4e0]" : "text-[#7968ED]"}`} />
              Smart Learning
            </span>
            <span className={`flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? "hover:text-[#d7d4e0]" : "hover:text-[#7968ED]"
            }`}>
              <Target className={`w-4 h-4 ${isDarkMode ? "text-[#d7d4e0]" : "text-[#7968ED]"}`} />
              Goal Focused
            </span>
            <span className={`flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? "hover:text-[#d7d4e0]" : "hover:text-[#7968ED]"
            }`}>
              <Sparkles className={`w-4 h-4 ${isDarkMode ? "text-[#d7d4e0]" : "text-[#7968ED]"}`} />
              AI Powered
            </span>
            <span className={`flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? "hover:text-[#d7d4e0]" : "hover:text-[#7968ED]"
            }`}>
              <GraduationCap className={`w-4 h-4 ${isDarkMode ? "text-[#d7d4e0]" : "text-[#7968ED]"}`} />
              Expert Guidance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
