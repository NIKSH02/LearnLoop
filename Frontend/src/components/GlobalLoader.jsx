import React, { useEffect, useState } from 'react';
import { BookOpen, Brain, Target, Sparkles, GraduationCap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const GlobalLoader = ({ isLoading, loadingMessage = 'LOADING...' }) => {
  const { isDarkMode } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
      isDarkMode
        ? "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-[#f8f8f8] via-[#e6e6e6] to-[#d4d4d4]"
    }`}>
      
      {/* Full Screen 3D Animation */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        
        {/* 3D Scene Container - Full Screen */}
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          
          {/* Main Central Element - Floating Book */}
          <div className="relative z-30 transform-gpu">
            <div className="animate-float">
              <BookOpen 
                size={80} 
                className={`drop-shadow-2xl transition-colors duration-300 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
            </div>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute inset-0 animate-orbit-slow">
            <div className="relative w-full h-full">
              {/* Brain Icon */}
              <div className="absolute top-1/4 right-1/4 animate-pulse">
                <Brain 
                  size={45} 
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                />
              </div>
              
              {/* Target Icon */}
              <div className="absolute bottom-1/4 left-1/4 animate-bounce-slow">
                <Target 
                  size={40} 
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}
                />
              </div>

              {/* Graduation Cap */}
              <div className="absolute top-1/3 left-1/6 animate-sway">
                <GraduationCap 
                  size={35} 
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-orange-400" : "text-orange-600"
                  }`}
                />
              </div>

              {/* Sparkles */}
              <div className="absolute bottom-1/3 right-1/6 animate-twinkle">
                <Sparkles 
                  size={32} 
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-yellow-400" : "text-yellow-600"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Background Geometric Shapes - Optimized Size */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer Ring */}
            <div 
              className={`w-[400px] h-[400px] rounded-full border-2 border-opacity-15 animate-spin-very-slow transition-colors duration-300 ${
                isDarkMode ? "border-blue-400" : "border-blue-600"
              }`}
            ></div>
            
            {/* Middle Ring */}
            <div 
              className={`absolute w-[280px] h-[280px] rounded-full border border-opacity-20 animate-spin-reverse transition-colors duration-300 ${
                isDarkMode ? "border-purple-400" : "border-purple-600"
              }`}
            ></div>
            
            {/* Inner Ring */}
            <div 
              className={`absolute w-[180px] h-[180px] rounded-full border border-opacity-25 animate-pulse transition-colors duration-300 ${
                isDarkMode ? "border-green-400" : "border-green-600"
              }`}
            ></div>
          </div>

          {/* Floating Particles - Reduced Count */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full animate-float-particle transition-colors duration-300 ${
                  isDarkMode ? "bg-blue-400" : "bg-blue-600"
                }`}
                style={{
                  left: `${15 + (i * 10)}%`,
                  top: `${25 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.4}s`,
                  opacity: 0.5
                }}
              ></div>
            ))}
            {[...Array(6)].map((_, i) => (
              <div
                key={`extra-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full animate-float-particle transition-colors duration-300 ${
                  isDarkMode ? "bg-purple-400" : "bg-purple-600"
                }`}
                style={{
                  right: `${10 + (i * 12)}%`,
                  bottom: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.5 + 1.5}s`,
                  opacity: 0.4
                }}
              ></div>
            ))}
          </div>

          {/* Loading Text and Progress - Compact Design */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center z-40">
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome to <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">TutorLink</span>
            </h2>
            
            <p className={`text-base md:text-lg mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {loadingMessage}
            </p>

            {/* Progress Bar - Compact */}
            <div className={`w-64 md:w-80 h-2 rounded-full overflow-hidden mx-auto ${
              isDarkMode ? 'bg-gray-700/40' : 'bg-gray-300/40'
            } backdrop-blur-sm border ${
              isDarkMode ? 'border-gray-600/30' : 'border-gray-400/30'
            }`}>
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            
            <p className={`mt-3 text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {Math.min(Math.round(progress), 100)}%
            </p>

            {/* Loading Dots Animation - Smaller */}
            <div className="flex justify-center space-x-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-purple-400' : 'bg-purple-600'
                  }`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;