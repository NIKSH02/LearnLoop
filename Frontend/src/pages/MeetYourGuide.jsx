import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  BookOpen, 
  GraduationCap,
  Award,
  MessageCircle,
  Phone,
  Mail,
  Search,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';

const MeetYourGuide = () => {
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Sample data - replace with API call
  const guides = [
    // Mentors
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      type: "mentor",
      title: "Mathematics Professor",
      university: "IIT Delhi",
      subjects: ["Mathematics", "Physics", "Statistics"],
      rating: 4.9,
      experience: "8 years",
      studentsHelped: 250,
      location: "Delhi",
      price: "₹500/hour",
      image: "/images/r2.jpg",
      specialties: ["Calculus", "Linear Algebra", "Differential Equations"],
      languages: ["English", "Hindi"],
      availability: "Mon-Fri 6PM-10PM"
    },
    {
      id: 2,
      name: "Prof. Rajesh Kumar",
      type: "mentor",
      title: "Computer Science Expert",
      university: "IIT Mumbai",
      subjects: ["Computer Science", "Programming", "Data Structures"],
      rating: 4.8,
      experience: "10 years",
      studentsHelped: 300,
      location: "Mumbai",
      price: "₹600/hour",
      image: "/images/r3.jpg",
      specialties: ["Python", "Java", "Machine Learning"],
      languages: ["English", "Hindi", "Marathi"],
      availability: "Weekends 10AM-6PM"
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      type: "mentor",
      title: "Chemistry Research Scholar",
      university: "DU",
      subjects: ["Chemistry", "Biochemistry", "Organic Chemistry"],
      rating: 4.7,
      experience: "6 years",
      studentsHelped: 180,
      location: "Delhi",
      price: "₹450/hour",
      image: "/images/r4.jpg",
      specialties: ["Organic Chemistry", "Physical Chemistry", "Lab Techniques"],
      languages: ["English", "Hindi"],
      availability: "Tue-Thu 7PM-9PM"
    },
    // Seniors
    {
      id: 4,
      name: "Aarav Patel",
      type: "senior",
      title: "Engineering Student",
      university: "IIT Bombay",
      subjects: ["Mathematics", "Physics", "Engineering"],
      rating: 4.6,
      experience: "2 years",
      studentsHelped: 85,
      location: "Mumbai",
      price: "₹200/hour",
      image: "/images/r5.jpg",
      specialties: ["JEE Preparation", "Engineering Mechanics", "Thermodynamics"],
      languages: ["English", "Hindi", "Gujarati"],
      availability: "Daily 8PM-11PM"
    },
    {
      id: 5,
      name: "Sneha Gupta",
      type: "senior",
      title: "Medical Student",
      university: "AIIMS Delhi",
      subjects: ["Biology", "Chemistry", "NEET Prep"],
      rating: 4.8,
      experience: "3 years",
      studentsHelped: 120,
      location: "Delhi",
      price: "₹250/hour",
      image: "/images/r6.jpg",
      specialties: ["NEET Biology", "Human Anatomy", "Medical Entrance"],
      languages: ["English", "Hindi"],
      availability: "Mon-Wed-Fri 9PM-11PM"
    },
    {
      id: 6,
      name: "Karan Singh",
      type: "senior",
      title: "CS Engineering Student",
      university: "NIT Trichy",
      subjects: ["Computer Science", "Programming", "Web Development"],
      rating: 4.5,
      experience: "2 years",
      studentsHelped: 95,
      location: "Chennai",
      price: "₹180/hour",
      image: "/images/r7.jpg",
      specialties: ["Web Development", "React", "Node.js"],
      languages: ["English", "Hindi", "Tamil"],
      availability: "Weekends 2PM-8PM"
    }
  ];

  

  const filteredGuides = guides.filter(guide => {
    const matchesFilter = activeFilter === 'all' || guide.type === activeFilter;
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || guide.subjects.includes(selectedSubject);
    
    return matchesFilter && matchesSearch && matchesSubject;
  });

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-[#d7d4e0]/20 via-white to-[#7B61FF]/10'
    }`}>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#7B61FF] via-[#7968ED] to-[#7B61FF] bg-clip-text text-transparent`}>
              Meet Your Guide
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Connect with expert mentors and experienced seniors
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-2xl p-6 ${
            isDarkMode 
              ? 'bg-gray-800 border border-[#7B61FF]/30' 
              : 'bg-white/80 border border-[#7968ED]/30'
          } backdrop-blur-lg shadow-xl`}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Guide Type Filter */}
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Guide Type
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'all', label: 'All Guides', icon: Users },
                  { key: 'mentor', label: 'Mentors', icon: GraduationCap },
                  { key: 'senior', label: 'Seniors', icon: Award }
                ].map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <motion.button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        activeFilter === filter.key
                          ? 'bg-gradient-to-r from-[#7B61FF] to-[#7968ED] text-white shadow-lg'
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-[#d7d4e0]'
                            : 'bg-gray-100 text-gray-700 hover:bg-[#d7d4e0]/30 hover:text-[#7B61FF]'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={16} />
                      {filter.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Search */}
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Search
              </label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} size={20} />
                <input
                  type="text"
                  placeholder="Search by name or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#7B61FF]'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#7968ED]'
                  } focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/20`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Subject Filter */}
            
          </div>
        </motion.div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="mb-6">
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Showing {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''}
            {activeFilter !== 'all' && ` in ${activeFilter}s`}
            {selectedSubject !== 'all' && ` for ${selectedSubject}`}
          </p>
        </div>

        {/* Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700 hover:border-[#7B61FF]'
                    : 'bg-white border border-[#7968ED]/30 hover:border-[#7B61FF]'
                } backdrop-blur-lg shadow-xl hover:shadow-2xl`}
              >
                {/* Card Header */}
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#7B61FF]/30">
                        <img 
                          src={guide.image} 
                          alt={guide.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to initials if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className={`w-full h-full bg-gradient-to-r ${
                          guide.type === 'mentor' 
                            ? 'from-[#7B61FF] to-[#7968ED]' 
                            : 'from-[#7968ED] to-[#7B61FF]'
                        } flex items-center justify-center text-white font-bold text-xl hidden`}>
                          {guide.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {guide.name}
                        </h3>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {guide.title}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      guide.type === 'mentor'
                        ? 'bg-[#7B61FF]/20 text-[#7B61FF] border border-[#7B61FF]/30'
                        : 'bg-[#7968ED]/20 text-[#7968ED] border border-[#7968ED]/30'
                    }`}>
                      {guide.type === 'mentor' ? 'Mentor' : 'Senior'}
                    </div>
                  </div>

                  {/* University & Location */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <GraduationCap size={16} className="text-[#7B61FF]" />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {guide.university}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} className="text-[#7968ED]" />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {guide.location}
                      </span>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {guide.subjects.slice(0, 3).map((subject, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            isDarkMode 
                              ? 'bg-gray-700 text-[#d7d4e0] border border-[#7B61FF]/20'
                              : 'bg-[#7968ED]/10 text-[#7968ED] border border-[#7968ED]/20'
                          }`}
                        >
                          {subject}
                        </span>
                      ))}
                      {guide.subjects.length > 3 && (
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-purple-50 text-purple-700'
                        }`}>
                          +{guide.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className={`font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {guide.rating}
                        </span>
                      </div>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Rating
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users size={16} className="text-[#7B61FF]" />
                        <span className={`font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {guide.studentsHelped}
                        </span>
                      </div>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Students
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock size={16} className="text-[#7968ED]" />
                        <span className={`font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {guide.experience}
                        </span>
                      </div>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Experience
                      </p>
                    </div>
                  </div>

                  {/* Price & Availability */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className={`text-lg font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {guide.price}
                      </p>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {guide.availability}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] text-white py-3 rounded-xl font-medium transition-all duration-300 hover:from-[#7968ED] hover:to-[#7B61FF] hover:shadow-lg hover:shadow-[#7B61FF]/25"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Connect Now
                    </motion.button>
                    <motion.button
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-300 hover:border-[#7B61FF] hover:text-[#7B61FF] hover:bg-[#7B61FF]/10'
                          : 'border-[#7968ED]/30 text-[#7968ED] hover:border-[#7B61FF] hover:text-[#7B61FF] hover:bg-[#7B61FF]/5'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageCircle size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredGuides.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className={`text-6xl mb-4 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-400'
            }`}>
              🔍
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              No guides found
            </h3>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Try adjusting your filters or search terms
            </p>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MeetYourGuide;
