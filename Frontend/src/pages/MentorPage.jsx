import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../hooks/useLoading";
import Footer from "../components/Footer.jsx";
import { 
  Star, 
  Phone, 
  Award,
  BookOpen,
  Users,
  Search,
  ChevronDown,
  MessageCircle,
  Calendar,
  X,
  Info,
  Clock,
  MapPin,
  GraduationCap
} from "lucide-react";
import Navbar from "../components/Navbar";

// Senior data array
const seniors = [
  {
    _id: "s1",
    name: "Amit Sharma",
    phone: "+91 98765 43210",
    designation: "Senior Mathematics Expert",
    skills: ["Calculus", "Linear Algebra", "Statistics", "Olympiad Training"],
    experience_years: 18,
    bio: "Award-winning math senior, guiding students to excel in competitive exams and advanced mathematics.",
    available_time_slots: [
      { day: "Monday", start_time: "10:00", end_time: "16:00" },
      { day: "Thursday", start_time: "12:00", end_time: "18:00" }
    ],
    isActive: true,
    image: "/images/senior1.jpg",
    rating: 4.95,
    students: 320,
    
  },
  {
    _id: "s2",
    name: "Priya Verma",
    phone: "+91 91234 56789",
    designation: "Senior Physics Mentor",
    skills: ["Quantum Mechanics", "Thermodynamics", "Olympiad Prep", "Astrophysics"],
    experience_years: 15,
    bio: "Physics senior with a passion for research and mentoring, helping students crack national and international olympiads.",
    available_time_slots: [
      { day: "Tuesday", start_time: "09:00", end_time: "13:00" },
      { day: "Friday", start_time: "14:00", end_time: "19:00" }
    ],
    isActive: true,
    image: "/images/senior2.jpg",
    rating: 4.92,
    students: 210,
    
  },
  {
    _id: "s3",
    name: "Rahul Singh",
    phone: "+91 99887 77665",
    designation: "Senior Chemistry Guide",
    skills: ["Organic Chemistry", "Inorganic Chemistry", "Olympiad Training", "Lab Techniques"],
    experience_years: 20,
    bio: "Senior chemistry educator with 20 years of experience, specializing in olympiad and entrance exam preparation.",
    available_time_slots: [
      { day: "Wednesday", start_time: "11:00", end_time: "17:00" },
      { day: "Saturday", start_time: "09:00", end_time: "15:00" }
    ],
    isActive: true,
    image: "/images/senior3.jpg",
    rating: 4.97,
    students: 180,
    
  }
];

const mentors = [
  {
    _id: "1",
    name: "Dr. Sarah Johnson",
    phone: "+1 (555) 123-4567",
    designation: "Senior Software Engineer",
    skills: ["React", "Node.js", "Python", "Machine Learning", "Computer Science", "Programming", "Software Development"],
    experience_years: 8,
    bio: "Passionate about teaching modern web development and helping students build real-world projects. Specialized in full-stack development and AI integration.",
    available_time_slots: [
      { day: "Monday", start_time: "09:00", end_time: "17:00" },
      { day: "Wednesday", start_time: "10:00", end_time: "16:00" },
      { day: "Friday", start_time: "14:00", end_time: "18:00" }
    ],
    isActive: true,
    image: "/images/mentor1.jpg",
    rating: 4.9,
    students: 156,
    
  },
  {
    _id: "2",
    name: "Prof. Michael Chen",
    phone: "+1 (555) 234-5678",
    designation: "Data Science Professor",
    skills: ["Python", "Statistics", "Deep Learning", "TensorFlow", "Data Science", "Advanced Mathematics"],
    experience_years: 12,
    bio: "University professor with extensive experience in data science and machine learning. Published researcher with 50+ papers in AI and statistical modeling.",
    available_time_slots: [
      { day: "Tuesday", start_time: "11:00", end_time: "15:00" },
      { day: "Thursday", start_time: "09:00", end_time: "13:00" },
      { day: "Saturday", start_time: "10:00", end_time: "14:00" }
    ],
    isActive: true,
    image: "/images/mentor2.jpg",
    rating: 4.8,
    students: 203,
    
  },
  {
    _id: "3",
    name: "Emily Rodriguez",
    phone: "+1 (555) 345-6789",
    designation: "UX/UI Design Lead",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    experience_years: 6,
    bio: "Creative designer passionate about user experience and visual storytelling. Worked with Fortune 500 companies to create award-winning digital experiences.",
    available_time_slots: [
      { day: "Monday", start_time: "13:00", end_time: "17:00" },
      { day: "Wednesday", start_time: "09:00", end_time: "12:00" },
      { day: "Friday", start_time: "15:00", end_time: "19:00" }
    ],
    isActive: true,
    image: "/images/mentor3.jpg",
    rating: 4.7,
    students: 128,
    
  },
  {
    _id: "4",
    name: "James Wilson",
    phone: "+1 (555) 456-7890",
    designation: "DevOps Engineer",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Engineering Design"],
    experience_years: 10,
    bio: "Cloud infrastructure expert helping students master modern DevOps practices. Specialized in scalable architecture and automated deployment pipelines.",
    available_time_slots: [
      { day: "Tuesday", start_time: "08:00", end_time: "12:00" },
      { day: "Thursday", start_time: "14:00", end_time: "18:00" },
      { day: "Sunday", start_time: "10:00", end_time: "14:00" }
    ],
    isActive: true,
    image: "/images/mentor4.jpg",
    rating: 4.9,
    students: 89,
    
  },
  {
    _id: "5",
    name: "Dr. Lisa Anderson",
    phone: "+1 (555) 567-8901",
    designation: "Mathematics Professor",
    skills: ["Calculus", "Linear Algebra", "Statistics", "Mathematical Modeling", "Advanced Mathematics"],
    experience_years: 15,
    bio: "Dedicated mathematics educator with a passion for making complex concepts accessible. Helping students excel in advanced mathematics and analytical thinking.",
    available_time_slots: [
      { day: "Monday", start_time: "10:00", end_time: "14:00" },
      { day: "Wednesday", start_time: "13:00", end_time: "17:00" },
      { day: "Friday", start_time: "09:00", end_time: "13:00" }
    ],
    isActive: true,
    image: "/images/mentor5.jpg",
    rating: 4.8,
    students: 267,
   
  },
  {
    _id: "6",
    name: "Dr. Robert Wilson",
    phone: "+1 (555) 678-9012",
    designation: "Physics Professor",
    skills: ["Physics", "Quantum Mechanics", "Thermodynamics", "Mechanics", "Electromagnetism"],
    experience_years: 18,
    bio: "Experienced physics professor specializing in theoretical and applied physics. Expert in helping students understand complex physics concepts.",
    available_time_slots: [
      { day: "Tuesday", start_time: "08:00", end_time: "12:00" },
      { day: "Thursday", start_time: "14:00", end_time: "18:00" }
    ],
    isActive: true,
    image: "/images/r2.jpg",
    rating: 4.9,
    students: 189,
  },
  {
    _id: "7",
    name: "Eng. Maria Rodriguez",
    phone: "+1 (555) 789-0123",
    designation: "Mechanical Engineer",
    skills: ["Engineering", "CAD Design", "Mechanical Engineering", "Project Development", "Engineering Mathematics"],
    experience_years: 12,
    bio: "Professional mechanical engineer with extensive industry experience. Specialized in engineering design and practical problem-solving.",
    available_time_slots: [
      { day: "Monday", start_time: "15:00", end_time: "19:00" },
      { day: "Saturday", start_time: "09:00", end_time: "13:00" }
    ],
    isActive: true,
    image: "/images/r3.jpg",
    rating: 4.7,
    students: 145,
  },
  {
    _id: "8",
    name: "Dr. Kevin Zhang",
    phone: "+1 (555) 890-1234",
    designation: "Electronics Engineer",
    skills: ["Electronics", "Circuit Design", "Power Systems", "Signal Processing", "Electrical Engineering"],
    experience_years: 10,
    bio: "Electronics specialist with expertise in circuit design and power systems. Helping students master electronic engineering fundamentals.",
    available_time_slots: [
      { day: "Wednesday", start_time: "10:00", end_time: "14:00" },
      { day: "Friday", start_time: "16:00", end_time: "20:00" }
    ],
    isActive: true,
    image: "/images/r4.jpg",
    rating: 4.8,
    students: 203,
  }
];

const MentorPage = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const { subject } = useParams();
  const { showLoader, hideLoader } = useLoading();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedType, setSelectedType] = useState("Mentor");
  
  // Details popup state
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedMentorDetails, setSelectedMentorDetails] = useState(null);

  useEffect(() => {
    if (subject) {
      setSearchTerm(subject.replace(/-/g, ' '));
    } else if (location.state?.selectedSubject) {
      setSearchTerm(location.state.selectedSubject);
    }
  }, [location.state, subject]);

  // Handle search with loading
  const handleSearch = (value) => {
    showLoader('SEARCHING MENTORS...');
    
    setTimeout(() => {
      setSearchTerm(value);
      hideLoader();
    }, 800);
  };

  // Handle filter change with loading
  const handleFilterChange = (filterType, value) => {
    showLoader('UPDATING FILTERS...');
    
    setTimeout(() => {
      if (filterType === 'skill') setSelectedSkill(value);
      if (filterType === 'sort') setSortBy(value);
      if (filterType === 'type') setSelectedType(value);
      hideLoader();
    }, 500);
  };

  // Handle contact actions
  const handleContact = (mentor, type) => {
    showLoader(`INITIATING ${type.toUpperCase()}...`);
    
    setTimeout(() => {
      if (type === 'call') {
        window.location.href = `tel:${mentor.phone}`;
      } else if (type === 'message') {
        // Handle messaging logic
        alert(`Starting conversation with ${mentor.name}`);
      } else if (type === 'schedule') {
        // Handle scheduling logic
        alert(`Opening schedule for ${mentor.name}`);
      }
      hideLoader();
    }, 1000);
  };

  // Handle details popup
  const handleShowDetails = (mentor) => {
    setSelectedMentorDetails(mentor);
    setShowDetailsPopup(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsPopup(false);
    setSelectedMentorDetails(null);
  };
  // Filter mentors or seniors by type
  const filteredMentors = (selectedType === "Mentor" ? mentors : seniors).filter(person => {
    const searchTerm_lower = searchTerm.toLowerCase();
    
    // Enhanced search matching for subjects
    const matchesSearch = person.name.toLowerCase().includes(searchTerm_lower) ||
                         person.designation.toLowerCase().includes(searchTerm_lower) ||
                         person.skills.some(skill => {
                           const skill_lower = skill.toLowerCase();
                           // Direct match or subject-related matching
                           return skill_lower.includes(searchTerm_lower) ||
                                  (searchTerm_lower.includes('math') && skill_lower.includes('math')) ||
                                  (searchTerm_lower.includes('computer') && (skill_lower.includes('programming') || skill_lower.includes('software') || skill_lower.includes('computer'))) ||
                                  (searchTerm_lower.includes('physics') && (skill_lower.includes('physics') || skill_lower.includes('science'))) ||
                                  (searchTerm_lower.includes('engineering') && (skill_lower.includes('engineering') || skill_lower.includes('cad') || skill_lower.includes('design'))) ||
                                  (searchTerm_lower.includes('data science') && (skill_lower.includes('data') || skill_lower.includes('analytics') || skill_lower.includes('ml') || skill_lower.includes('machine learning'))) ||
                                  (searchTerm_lower.includes('electronics') && (skill_lower.includes('electronics') || skill_lower.includes('circuit') || skill_lower.includes('electrical')));
                         }) ||
                         person.bio.toLowerCase().includes(searchTerm_lower);
    
    const matchesSkill = selectedSkill === "" || person.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  const sortedMentors = [...filteredMentors].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "experience") return b.experience_years - a.experience_years;
    if (sortBy === "students") return b.students - a.students;
  
    return 0;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-[#d7d4e0]/20 via-white to-[#7B61FF]/10'
    }`}>
      {/* Use shared Navbar component */}
      <Navbar />
      {/* Add top margin below Navbar */}
      <div className="mt-8" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          {(subject || location.state?.selectedSubject) && (
            <motion.div 
              className={`mb-6 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                isDarkMode 
                  ? 'bg-[#7B61FF]/20 text-[#d7d4e0] border border-[#7B61FF]/30' 
                  : 'bg-[#7968ED]/10 text-[#7968ED] border border-[#7968ED]/20'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              📚 Showing mentors for: {subject?.replace(/-/g, ' ') || location.state?.selectedSubject}
            </motion.div>
          )}
          
          <motion.h1 
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Meet Our Expert{" "}
            <span className="bg-gradient-to-r from-[#7B61FF] to-[#7968ED] bg-clip-text text-transparent">
              Mentors
            </span>
          </motion.h1>
          <motion.p 
            className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Connect with industry professionals and academic experts who are passionate about sharing their knowledge and helping you succeed.
          </motion.p>
        </div>

        {/* Search and Filter Section */}
        <motion.div 
          className={`rounded-2xl p-6 mb-12 border ${
            isDarkMode 
              ? 'bg-gray-800 border-[#7B61FF]/30' 
              : 'bg-white border-[#7968ED]/20'
          } shadow-lg backdrop-blur-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-[#7B61FF] ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-[#7B61FF]' 
                    : 'bg-gray-50 border-gray-300 text-black focus:border-[#7968ED]'
                }`}
                style={{ color: '#7B61FF' }}
              >
                <option value="Mentor">Mentor</option>
                <option value="Senior">Senior</option>
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } pointer-events-none`} />
            </div>

            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search mentors..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-[#7B61FF] focus:border-[#7B61FF]`}
              />
            </div>

            {/* Skill Filter */}
       
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-[#7B61FF] ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-[#7B61FF]' 
                    : 'bg-gray-50 border-gray-300 text-black focus:border-[#7968ED]'
                }`}
                style={{ color: '#7B61FF' }}
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
             
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } pointer-events-none`} />
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {sortedMentors.length} {selectedType === "Mentor" ? "mentors" : "seniors"} found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Mentor Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {sortedMentors.map((mentor, index) => (
            <motion.div
              key={mentor._id}
              className={`rounded-2xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-2xl group ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-[#7B61FF]' 
                  : 'bg-white border-[#7968ED]/20 hover:shadow-[#7B61FF]/20 hover:border-[#7B61FF]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Mentor/Senior Image */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-[#7B61FF]/30 overflow-hidden">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-r from-[#7B61FF] to-[#7968ED] flex items-center justify-center text-2xl font-bold text-white hidden">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>

              {/* Mentor/Senior Info - Simplified */}
              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mentor.name}
                </h3>
                <p className="text-[#7968ED] font-medium text-sm mb-3">
                  {mentor.designation}
                </p>
                
                {/* Rating Display - Centered */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {mentor.rating}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      ({Math.floor(Math.random() * 50) + 20} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills Display */}
              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Skills & Expertise
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {mentor.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode 
                          ? 'bg-[#7B61FF]/20 text-[#d7d4e0] border border-[#7B61FF]/30' 
                          : 'bg-[#7968ED]/10 text-[#7968ED] border border-[#7968ED]/20'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.skills.length > 4 && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      +{mentor.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Details Button Only */}
              <div className="flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowDetails(mentor);
                  }}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors w-full ${
                    isDarkMode 
                      ? 'bg-[#7B61FF]/20 text-[#d7d4e0] hover:bg-[#7B61FF]/30 border border-[#7B61FF]/30' 
                      : 'bg-[#7968ED]/10 text-[#7968ED] hover:bg-[#7968ED]/20 border border-[#7968ED]/20'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {sortedMentors.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              🔍
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              No {selectedType === "Mentor" ? "mentors" : "seniors"} found
            </h3>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                handleSearch("");
                handleFilterChange('skill', "");
                handleFilterChange('sort', "rating");
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
   
      </div>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {showDetailsPopup && selectedMentorDetails && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDetails}
          >
            <motion.div
              className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-purple-600 p-1 mb-4">
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-purple-600">
                    {selectedMentorDetails.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {selectedMentorDetails.name}
                </h2>
                <p className="text-purple-500 font-medium text-lg mb-4">
                  {selectedMentorDetails.designation}
                </p>
                <div className="flex items-center justify-center space-x-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {selectedMentorDetails.rating}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      ({Math.floor(Math.random() * 100) + 50} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {Math.floor(Math.random() * 50) + 20} students
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedMentorDetails.experience_years} years
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  About
                </h3>
                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedMentorDetails.bio}
                </p>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedMentorDetails.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        isDarkMode 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-8">
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Availability
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedMentorDetails.available_time_slots.map((slot, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700/50 border-gray-600' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                          {slot.day}
                        </span>
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {slot.start_time} - {slot.end_time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-8">
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Contact Information
                </h3>
                <div className="flex items-center space-x-3">
                  <Phone className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedMentorDetails.phone}
                  </span>
                </div>
              </div>

              {/* Rate */}
              <div className="mb-8">
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Rate
                </h3>
                <div className="text-center">
                  <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    ${selectedMentorDetails.hourlyRate}
                  </span>
                  <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    /hour
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    handleContact(selectedMentorDetails, 'call');
                    handleCloseDetails();
                  }}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-[#7B61FF]/20 text-[#d7d4e0] hover:bg-[#7B61FF]/30 border border-[#7B61FF]/30' 
                      : 'bg-[#7968ED]/10 text-[#7968ED] hover:bg-[#7968ED]/20 border border-[#7968ED]/20'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  <span>Send Request</span>
                </button>
                
                <button
                  onClick={() => {
                    handleContact(selectedMentorDetails, 'message');
                    handleCloseDetails();
                  }}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Chat</span>
                </button>
                
                <button
                  onClick={() => {
                    handleContact(selectedMentorDetails, 'schedule');
                    handleCloseDetails();
                  }}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30' 
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Session</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default MentorPage;
