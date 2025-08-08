import React, { useState } from 'react';
import { User, GraduationCap, Star, BookOpen, Users, Bell, Phone, Calendar, Check, MessageCircle, AlertTriangle } from 'lucide-react';

// Mock data
const mockData = {
  user: {
    name: "Arjun Sharma",
    phone: "+91 98765 43210",
    branch: "Computer Engineering",
    year: "2025",
    semester: "6",
    profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  academicInfo: {
    cgpa: 8.5,
    completedSemesters: [
      { semester: 1, gpa: 8.2, completedAt: "2022-12-15" },
      { semester: 2, gpa: 8.4, completedAt: "2023-05-20" },
      { semester: 3, gpa: 8.1, completedAt: "2023-12-18" },
      { semester: 4, gpa: 8.7, completedAt: "2024-05-22" },
      { semester: 5, gpa: 8.9, completedAt: "2024-12-20" }
    ]
  },
  subjects: {
    6: ["Advanced Algorithms", "Machine Learning", "Software Engineering", "Database Systems", "Computer Networks", "Web Technologies"],
    5: ["Data Structures", "Operating Systems", "Computer Graphics", "Compiler Design", "Artificial Intelligence", "Human Computer Interaction"],
    4: ["Object Oriented Programming", "Digital Signal Processing", "Microprocessors", "Computer Architecture", "Theory of Computation", "Software Testing"]
  },
  mentors: [
    { id: 1, name: "Dr. Sarah Johnson", subject: "Machine Learning", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" },
    { id: 2, name: "Prof. Michael Chen", subject: "Software Engineering", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
    { id: 3, name: "Dr. Emily Davis", subject: "Database Systems", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" }
  ],
  mentees: 12,
  notifications: [
    { id: 1, title: "New Assignment Posted", message: "Machine Learning Assignment 3 has been posted", time: "2 hours ago", type: "assignment" },
    { id: 2, title: "Semester Results", message: "Semester 5 results are now available", time: "1 day ago", type: "result" },
    { id: 3, title: "Workshop Registration", message: "AI Workshop registration is now open", time: "3 days ago", type: "event" }
  ],
  lastActivity: "2024-08-08T10:30:00Z"
};

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection, userInfo }) => {
  const menuItems = [
    { id: 'profile', label: 'Profile Overview', icon: User },
    { id: 'academic', label: 'Academic Info', icon: GraduationCap },
    { id: 'strong', label: 'Strong Subjects', icon: Star },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'mentors', label: 'Mentors', icon: Users },
    { id: 'activity', label: 'Activity & Notifications', icon: Bell }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">TutorLink</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'bg-[#7968ed] text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Profile at bottom */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={userInfo.profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
          />
          <div>
            <p className="text-gray-800 font-medium text-sm">{userInfo.name}</p>
            <p className="text-gray-500 text-xs">{userInfo.branch}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Overview Component
const ProfileOverview = ({ userInfo, setUserInfo }) => {
  const [formData, setFormData] = useState(userInfo);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setUserInfo(formData);
    setIsEditing(false);
  };

  const branches = ["Computer Engineering", "Electronics Engineering", "Mechanical Engineering", "Civil Engineering"];
  const years = ["2022", "2023", "2024", "2025", "2026"];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <User className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
      </div>

      <div className="bg-white border border-gray-200 shadow-lg p-6 rounded-lg">
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative group">
            <img
              src={formData.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-600"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <User className="text-white" size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{formData.name}</h3>
            <p className="text-gray-600">{formData.branch}</p>
            <p className="text-purple-600">{formData.year} - Semester {formData.semester}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Branch</label>
            <select
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:border-purple-500 focus:outline-none"
            >
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Year</label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:border-purple-500 focus:outline-none"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Semester</label>
            <select
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:border-purple-500 focus:outline-none"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-[#7968ed] hover:bg-[#5c48db] text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>Save Changes</span>
          </button>
          <button
            onClick={() => setFormData(userInfo)}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Academic Info Component
const AcademicInfo = ({ academicData }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <GraduationCap className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold text-black">Academic Information</h2>
      </div>

      <div className="bg-white-800 p-6 rounded-lg">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-black">Overall Performance</h3>
            <div className="bg-[#7968ed] text-white px-4 py-2 rounded-lg">
              CGPA: {academicData.cgpa}
            </div>
          </div>
        </div>

        <div className="space-y-4 border border-gray-600 p-4 rounded-lg">
          <h4 className="text-lg  font-semibold text-black mb-4">Semester Wise Performance</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {academicData.completedSemesters.map((sem) => (
              <div key={sem.semester} className="bg-white-700 border border-gray-400 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-600 font-semibold">Semester {sem.semester}</span>
                  <span className="text-black font-bold">{sem.gpa} GPA</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Completed: {new Date(sem.completedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Strong Subjects Component
const StrongSubjects = ({ subjects, semester }) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [rating, setRating] = useState(0);

  const prevSemester = Math.max(1, parseInt(semester) - 1).toString();
  const availableSubjects = subjects[prevSemester] || subjects["5"];

  const toggleSubject = (subject) => {
    const existing = selectedSubjects.find(s => s.subject === subject);
    if (existing) {
      setSelectedSubjects(selectedSubjects.filter(s => s.subject !== subject));
    } else if (selectedSubjects.length < 6) {
      setCurrentSubject(subject);
      setShowRatingModal(true);
    }
  };

  const confirmRating = () => {
    if (rating > 0) {
      setSelectedSubjects([...selectedSubjects, { subject: currentSubject, rating }]);
      setShowRatingModal(false);
      setCurrentSubject(null);
      setRating(0);
    }
  };

  // Component for partial star fill
  const PartialStar = ({ rating }) => {
    const fillPercentage = (rating / 5) * 100;
    
    return (
      <div className="relative w-4 h-4">
        <Star className="absolute inset-0 text-gray-300" size={16} />
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <Star className="text-purple-600" size={16} fill="currentColor" />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Star className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Strong Subjects</h2>
      </div>

      <div className="bg-white border border-gray-200 shadow-lg p-6 rounded-lg">
        <p className="text-gray-700 mb-6">Select up to 6 subjects you feel confident in (from Semester {prevSemester})</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {availableSubjects.map((subject, index) => {
            const selectedSubject = selectedSubjects.find(s => s.subject === subject);
            const isSelected = !!selectedSubject;
            return (
              <button
                key={index}
                onClick={() => toggleSubject(subject)}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'bg-[#6754e0]-50 border-purple-600 text-purple-800'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-purple-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 flex items-center space-x-1">
                    <Check className="text-purple-600" size={12} />
                    <PartialStar rating={selectedSubject.rating} />
                  </div>
                )}
                <span className="text-sm font-medium pr-6">{subject}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-gray-600 text-sm">
          Selected: {selectedSubjects.length}/6
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 border border-gray-200 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rate Your Confidence</h3>
            <p className="text-gray-700 mb-4">{currentSubject}</p>
            
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 ${star <= rating ? 'text-purple-600' : 'text-gray-300'}`}
                >
                  <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={confirmRating}
                disabled={rating === 0}
                className="flex-1 bg-[#7968ed] hover:bg-[#5c48db] disabled:bg-gray-400 text-white py-2 rounded-lg transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Subjects Component
const Subjects = ({ subjects, semester }) => {
  const currentSubjects = subjects[semester] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <BookOpen className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Current Subjects</h2>
      </div>

      <div className="bg-white-800 border border-gray-600 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Semester {semester} Subjects</h3>
          <button className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors">
            <AlertTriangle size={16} />
            <span>Report Issue</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSubjects.map((subject, index) => (
            <div key={index} className="bg-white-700 p-4 rounded-lg border border-gray-400">
              <h4 className="text-black font-medium">{subject}</h4>
              <p className="text-black-400 text-sm mt-1">Current Semester</p>
            </div>
          ))}
        </div>

        {currentSubjects.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No subjects found for this semester
          </div>
        )}
      </div>
    </div>
  );
};

// Mentors Component
const Mentors = ({ mentors, menteeCount }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Users className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Mentors & Mentoring</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Mentoring Stats</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{menteeCount}</div>
            <p className="text-gray-300">Active Mentees</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Your Mentors</h3>
          <div className="space-y-3">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-medium text-sm">{mentor.name}</p>
                    <p className="text-gray-400 text-xs">{mentor.subject}</p>
                  </div>
                </div>
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                  <MessageCircle size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Activity & Notifications Component
const ActivityNotifications = ({ notifications, lastActivity }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <BookOpen size={16} className="text-blue-400" />;
      case 'result':
        return <GraduationCap size={16} className="text-green-400" />;
      case 'event':
        return <Calendar size={16} className="text-purple-400" />;
      default:
        return <Bell size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Bell className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Activity & Notifications</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Last Activity</h3>
          <div className="text-center">
            <p className="text-purple-400 font-medium">
              {new Date(lastActivity).toLocaleDateString()}
            </p>
            <p className="text-gray-400 text-sm">
              {new Date(lastActivity).toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Notifications</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 bg-gray-700 p-3 rounded-lg">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                  <p className="text-gray-300 text-sm">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userInfo, setUserInfo] = useState(mockData.user);

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileOverview userInfo={userInfo} setUserInfo={setUserInfo} />;
      case 'academic':
        return <AcademicInfo academicData={mockData.academicInfo} />;
      case 'strong':
        return <StrongSubjects subjects={mockData.subjects} semester={userInfo.semester} />;
      case 'subjects':
        return <Subjects subjects={mockData.subjects} semester={userInfo.semester} />;
      case 'mentors':
        return <Mentors mentors={mockData.mentors} menteeCount={mockData.mentees} />;
      case 'activity':
        return <ActivityNotifications notifications={mockData.notifications} lastActivity={mockData.lastActivity} />;
      default:
        return <ProfileOverview userInfo={userInfo} setUserInfo={setUserInfo} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        userInfo={userInfo}
      />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;