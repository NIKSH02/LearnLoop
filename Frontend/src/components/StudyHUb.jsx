 import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Atom,
  Book,
  Code,
  Landmark,
  Globe,
  Cog,
  Brain,
  Zap,
  Wrench,
  Microscope,
  Building
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const subjects = [
  { name: "Mathematics", description: "Calculus, Linear Algebra", tutors: "250+ Expert Tutors", icon: <Calculator className="w-8 h-8" />, color: "text-[#7B61FF]", bgColor: "bg-gradient-to-br from-[#d7d4e0]/15 to-[#7B61FF]/10", borderColor: "border-[#7B61FF]/30" },
  { name: "Computer Science", description: "Programming, Algorithms", tutors: "180+ Expert Tutors", icon: <Code className="w-8 h-8" />, color: "text-[#7968ED]", bgColor: "bg-gradient-to-br from-[#7968ED]/10 to-[#d7d4e0]/15", borderColor: "border-[#7968ED]/30" },
  { name: "Physics", description: "Lab Experiments, Theory", tutors: "200+ Expert Tutors", icon: <Atom className="w-8 h-8" />, color: "text-[#7B61FF]", bgColor: "bg-gradient-to-br from-[#d7d4e0]/15 to-[#7968ED]/10", borderColor: "border-[#7B61FF]/30" },
  { name: "Engineering", description: "CAD, Project Development", tutors: "150+ Expert Tutors", icon: <Cog className="w-8 h-8" />, color: "text-[#7968ED]", bgColor: "bg-gradient-to-br from-[#7968ED]/10 to-[#d7d4e0]/15", borderColor: "border-[#7968ED]/30" },
  { name: "Data Science", description: "Analytics, ML", tutors: "120+ Expert Tutors", icon: <Brain className="w-8 h-8" />, color: "text-[#7B61FF]", bgColor: "bg-gradient-to-br from-[#d7d4e0]/15 to-[#7B61FF]/10", borderColor: "border-[#7B61FF]/30" },
  { name: "Electronics", description: "Circuits, Power Systems", tutors: "175+ Expert Tutors", icon: <Zap className="w-8 h-8" />, color: "text-[#7968ED]", bgColor: "bg-gradient-to-br from-[#7968ED]/10 to-[#d7d4e0]/15", borderColor: "border-[#7968ED]/30" }
];


const img1 = "/images/r5.jpg";
const img2 = "/images/r3.jpg";
const img3 = "/images/r7.jpg";
const img4 = "/images/r4.jpg";

const StudyHub = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubjectClick = (subjectName) => {
    console.log('Subject clicked:', subjectName); // Debug log
    // Navigate to mentor page with subject as URL parameter for filtering
    const subjectSlug = subjectName.toLowerCase().replace(/\s+/g, '-');
    console.log('Navigating to:', `/mentors/${subjectSlug}`); // Debug log
    navigate(`/mentors`);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-8 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-[#7B61FF]/10 to-[#d7d4e0]/5' 
        : 'bg-gradient-to-br from-[#d7d4e0]/20 via-white to-[#7B61FF]/10'
    }`}>
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Title + Subject Cards */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h1 className={`text-5xl lg:text-6xl font-bold mb-4 leading-tight transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-white via-[#d7d4e0] to-[#7B61FF] bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-gray-900 via-[#7968ED] to-[#7B61FF] bg-clip-text text-transparent'
            }`}>
              Master Your Studies
            </h1>
            {/* <h2 className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Expert-Led Learning Programs
            </h2> */}
           
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {subjects.map((subject, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubjectClick(subject.name);
                }}
                className={`border-2 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:-translate-y-3 group relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-[#7B61FF]/30 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 hover:border-[#7968ED]/50' 
                    : `${subject.bgColor} ${subject.borderColor}`
                }`}
              >
                {/* Animated background gradient on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-[#7B61FF]/20 via-transparent to-[#7968ED]/20' 
                    : 'bg-gradient-to-br from-white/20 via-transparent to-white/10'
                }`}></div>
                
                {/* Icon with enhanced hover effect */}
                <div className={`mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10 drop-shadow-lg ${
                  isDarkMode ? 'text-[#7B61FF]' : subject.color
                }`}>
                  {subject.icon}
                </div>
                
                {/* Title with better typography */}
                <h3 className={`text-sm font-bold mb-2 transition-colors duration-300 relative z-10 leading-tight ${
                  isDarkMode ? 'text-white group-hover:text-[#d7d4e0]' : 'text-gray-800 group-hover:text-gray-900'
                }`}>
                  {subject.name}
                </h3>
                
                {/* Description text */}
                <p className={`text-xs mb-3 transition-colors duration-300 relative z-10 font-medium ${
                  isDarkMode ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-700'
                }`}>
                  {subject.description}
                </p>
                
                {/* Tutor count with enhanced styling */}
                <div className={`text-xs transition-colors duration-300 relative z-10 font-semibold px-3 py-1 rounded-full mb-2 ${
                  isDarkMode 
                    ? 'text-gray-300 group-hover:text-gray-200 bg-gray-700/50' 
                    : 'text-gray-500 group-hover:text-gray-600 bg-white/50'
                }`}>
                  {subject.tutors}
                </div>
                
                {/* Find Mentors indicator */}
                <div className={`text-xs font-medium transition-all duration-300 relative z-10 opacity-0 group-hover:opacity-100 ${
                  isDarkMode ? 'text-[#d7d4e0]' : 'text-[#7B61FF]'
                }`}>
                  Find Mentors →
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Button */}
        
        </div>

        {/* Right: Images */}
        <div className="grid grid-cols-2 gap-4">
         <div className="lg:w-180 w-full flex justify-center">
          <div className="bg-white/90 rounded-2xl border-4 border-[#7B61FF]/30 shadow-xl p-6 w-[600px] h-[600px] grid grid-cols-3 grid-rows-3 gap-4">
            {/* Large vertical image (L shape) */}
            <img
              src={img1}
              alt="Salon Service"
              className="rounded-xl object-cover w-full h-full row-span-3 col-span-2"
            />
            {/* Top right */}
            <img
              src={img2}
              alt="Massage"
              className="rounded-xl object-cover w-full h-full row-span-1 col-start-3"
            />
            {/* Middle right */}
            <img
              src={img3}
              alt="Technician 1"
              className="rounded-xl object-cover w-full h-full row-span-1 col-start-3 row-start-2"
            />
            {/* Bottom right */}
            <img
              src={img4}
              alt="Technician 2"
              className="rounded-xl object-cover w-full h-full row-span-1 col-start-3 row-start-3"
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default StudyHub;
