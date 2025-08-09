import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { 
  Star, 
  Phone, 
  Award,
  BookOpen,
  Users,
  Search,
  ChevronDown
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
    hourlyRate: 120
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
    hourlyRate: 110
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
    hourlyRate: 115
  }
];

const mentors = [
  {
    _id: "1",
    name: "Dr. Sarah Johnson",
    phone: "+1 (555) 123-4567",
    designation: "Senior Software Engineer",
    skills: ["React", "Node.js", "Python", "Machine Learning", "Computer Science"],
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
    hourlyRate: 75
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
    hourlyRate: 90
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
    hourlyRate: 65
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
    hourlyRate: 80
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
    hourlyRate: 70
  }
];

const MentorPage = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const { subject } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedType, setSelectedType] = useState("Mentor");

  useEffect(() => {
    if (subject) {
      setSearchTerm(subject.replace(/-/g, ' '));
    } else if (location.state?.selectedSubject) {
      setSearchTerm(location.state.selectedSubject);
    }
  }, [location.state, subject]);

  const allSkills = [...new Set(mentors.flatMap(mentor => mentor.skills))];

  // Filter mentors or seniors by type
  const filteredMentors = (selectedType === "Mentor" ? mentors : seniors).filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         person.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === "" || person.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  const sortedMentors = [...filteredMentors].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "experience") return b.experience_years - a.experience_years;
    if (sortBy === "students") return b.students - a.students;
    if (sortBy === "price") return a.hourlyRate - b.hourlyRate;
    return 0;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-white via-gray-50 to-purple-50'
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
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                  : 'bg-purple-100 text-purple-700 border border-purple-200'
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
            <span className="bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
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
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white border-gray-200'
          } shadow-lg backdrop-blur-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-300 text-black focus:border-purple-500'
                }`}
                style={{ color: '#8b5cf6' }} // Tailwind purple-500
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Skill Filter */}
            <div className="relative">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-300 text-black focus:border-purple-500'
                }`}
                style={{ color: '#8b5cf6' }} // Tailwind purple-500
              >
                <option value="">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } pointer-events-none`} />
            </div>

            {/* Type Filter (Mentor/Senior) */}
         
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-300 text-black focus:border-purple-500'
                }`}
                style={{ color: '#8b5cf6' }} // Tailwind purple-500
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="students">Most Students</option>
                <option value="price">Lowest Price</option>
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
              className={`rounded-2xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' 
                  : 'bg-white border-gray-200 hover:shadow-purple-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Mentor/Senior Image */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-purple-600">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                  mentor.isActive ? 'bg-green-500' : 'bg-gray-500'
                }`}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Mentor/Senior Info */}
              <div className="text-center mb-4">
                <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {mentor.name}
                </h3>
                <p className="text-purple-500 font-medium text-sm mb-2">
                  {mentor.designation}
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {mentor.rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {mentor.students} students
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {mentor.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.skills.length > 3 && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      +{mentor.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bio */}
              <p className={`text-sm mb-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {mentor.bio.length > 100 ? `${mentor.bio.substring(0, 100)}...` : mentor.bio}
              </p>

              {/* About + Badge */}
              <div className="flex items-center justify-center mb-3">
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  About
                </span>
                <span className="ml-2 px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                  {selectedType === "Mentor" ? "PRO" : "SENIOR"}
                </span>
              </div>

              {/* Hardcoded Interests */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  Hiking
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-medium">
                  Singing
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                  Sci-fi
                </span>
              </div>

              {/* Experience and Rate */}
              <div className="flex items-center justify-between mb-4 text-sm">
              </div>

              {/* Available Times */}
              {/* Action Buttons */}
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
   
      </div>
    </div>
  );
};

export default MentorPage;
