import React, { useState, useRef } from 'react';
import { User, Phone, Briefcase, Star, Clock, Plus, X, Save, Bell, Calendar, Activity, Users, Award, BookOpen, MessageSquare } from 'lucide-react';

// Skills Input Component
const SkillsInput = ({ skills, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      onChange([...skills, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-gray-50 rounded-lg border border-gray-200">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-[#7968ed] text-white rounded-full text-sm animate-fadeIn"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="hover:text-gray-200 transition-colors ml-1"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill..."
          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent transition-all"
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-[#7968ed] hover:bg-[#6b5ce0] text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </div>
  );
};

// Availability Editor Component
const AvailabilityEditor = ({ availableTimeSlots, onChange }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const addTimeSlot = () => {
    onChange([
      ...availableTimeSlots,
      { day: 'Monday', start_time: '09:00', end_time: '17:00' }
    ]);
  };

  const removeTimeSlot = (index) => {
    onChange(availableTimeSlots.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index, field, value) => {
    const updated = availableTimeSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {availableTimeSlots.map((slot, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <select
              value={slot.day}
              onChange={(e) => updateTimeSlot(index, 'day', e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent transition-all"
            >
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={slot.start_time}
                onChange={(e) => updateTimeSlot(index, 'start_time', e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent transition-all"
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                value={slot.end_time}
                onChange={(e) => updateTimeSlot(index, 'end_time', e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={() => removeTimeSlot(index)}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addTimeSlot}
        className="w-full p-3 border-2 border-dashed border-gray-300 hover:border-[#7968ed] text-gray-500 hover:text-[#7968ed] rounded-lg transition-all flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Time Slot
      </button>
    </div>
  );
};

// Main Mentor Profile Component
const MentorProfile = () => {
  const [isLoading, setSaving] = useState(false);
  const [mentorData, setMentorData] = useState({
    name: 'Dr. Priya Mehta',
    phone: '+91 98765 43210',
    designation: 'Senior Lecturer',
    skills: ['Data Structures', 'Algorithms', 'Machine Learning', 'Python', 'JavaScript'],
    experience_years: 8,
    bio: 'Dr. Priya Mehta is a Senior Lecturer with over 8 years of experience in Computer Science and Engineering. She specializes in Data Structures, Algorithms, and Machine Learning. Her passion for teaching and mentoring students has helped hundreds of students excel in their academic journey.',
    available_time_slots: [
      { day: 'Monday', start_time: '09:00', end_time: '12:00' },
      { day: 'Wednesday', start_time: '14:00', end_time: '17:00' },
      { day: 'Friday', start_time: '10:00', end_time: '13:00' }
    ],
    isActive: true,
    mentees: [
      { id: 1, name: 'John Doe', course: 'Computer Science', progress: 85 },
      { id: 2, name: 'Jane Smith', course: 'Data Science', progress: 92 },
      { id: 3, name: 'Mike Johnson', course: 'Web Development', progress: 78 }
    ],
    totalSessions: 156,
    averageRating: 4.8,
    completionRate: 94
  });

  const [activeSection, setActiveSection] = useState('profile');

  const sidebarItems = [
    { id: 'profile', label: 'Profile Overview', icon: User },
    { id: 'professional', label: 'Professional Info', icon: Briefcase },
    { id: 'schedule', label: 'Time Slots', icon: Clock },
    { id: 'mentees', label: 'Mentees Connected', icon: Users },
    { id: 'activity', label: 'Activity & Notifications', icon: Bell },
    { id: 'status', label: 'Status & Availability', icon: Activity }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    console.log('Mentor data saved:', mentorData);
  };

  const updateMentorData = (field, value) => {
    setMentorData(prev => ({ ...prev, [field]: value }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-start gap-8 mb-8">
                {/* Profile Photo */}
                <div className="w-32 h-32 rounded-full  flex items-center justify-center overflow-hidden border-4 border-[#7968ed]/20 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={mentorData.name}
                        onChange={(e) => updateMentorData('name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                      <input
                        type="text"
                        value={mentorData.designation}
                        onChange={(e) => updateMentorData('designation', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={mentorData.phone}
                      onChange={(e) => updateMentorData('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio <span className="text-xs text-gray-500">({mentorData.bio.length}/500)</span>
                </label>
                <textarea
                  value={mentorData.bio}
                  onChange={(e) => updateMentorData('bio', e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>
        );

      case 'professional':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Briefcase className="text-[#7968ed]" size={24} />
                Professional Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                  <input
                    type="number"
                    min="0"
                    value={mentorData.experience_years}
                    onChange={(e) => updateMentorData('experience_years', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <SkillsInput
                    skills={mentorData.skills}
                    onChange={(skills) => updateMentorData('skills', skills)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#7968ed]">{mentorData.totalSessions}</div>
                    <div className="text-sm text-gray-600">Total Sessions</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#7968ed]">{mentorData.averageRating}</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#7968ed]">{mentorData.completionRate}%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="text-[#7968ed]" size={24} />
                Available Time Slots
              </h2>
              <AvailabilityEditor
                availableTimeSlots={mentorData.available_time_slots}
                onChange={(slots) => updateMentorData('available_time_slots', slots)}
              />
            </div>
          </div>
        );

      case 'mentees':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="text-[#7968ed]" size={24} />
                Connected Mentees
              </h2>
              
              <div className="space-y-4">
                {mentorData.mentees.map((mentee) => (
                  <div key={mentee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#7968ed] rounded-full flex items-center justify-center text-white font-semibold">
                        {mentee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{mentee.name}</h3>
                        <p className="text-sm text-gray-600">{mentee.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-[#7968ed]">{mentee.progress}%</div>
                      <div className="text-sm text-gray-600">Progress</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'status':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Activity className="text-[#7968ed]" size={24} />
                Status & Availability
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Profile Status</h3>
                    <p className="text-sm text-gray-600">Make your profile visible to students</p>
                  </div>
                  <button
                    onClick={() => updateMentorData('isActive', !mentorData.isActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:ring-offset-2 ${
                      mentorData.isActive ? 'bg-[#7968ed]' : 'bg-gray-400'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        mentorData.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className={`text-2xl font-bold ${mentorData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {mentorData.isActive ? 'Active' : 'Inactive'}
                    </div>
                    <div className="text-sm text-gray-600">Current Status</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#7968ed]">{mentorData.available_time_slots.length}</div>
                    <div className="text-sm text-gray-600">Available Slots</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Bell className="text-[#7968ed]" size={24} />
                Activity & Notifications
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="text-blue-600 mt-1" size={18} />
                    <div>
                      <h4 className="font-medium text-blue-900">New session request from John Doe</h4>
                      <p className="text-sm text-blue-700 mt-1">Data Structures help needed - 2 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Award className="text-green-600 mt-1" size={18} />
                    <div>
                      <h4 className="font-medium text-green-900">Session completed with Jane Smith</h4>
                      <p className="text-sm text-green-700 mt-1">Machine Learning basics - 5 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <BookOpen className="text-yellow-600 mt-1" size={18} />
                    <div>
                      <h4 className="font-medium text-yellow-900">Upcoming session reminder</h4>
                      <p className="text-sm text-yellow-700 mt-1">Algorithm review with Mike Johnson - Tomorrow 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#7968ed]">
              TutorLink
            </h2>
          </div>
          
          <nav className="flex-1 px-4 space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-[#7968ed] text-white'
                      : 'text-gray-600 hover:text-[#7968ed] hover:bg-gray-100'
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Profile Photo at Bottom */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#7968ed] flex items-center justify-center overflow-hidden border-2 border-[#7968ed]/20">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{mentorData.name}</p>
                <p className="text-xs text-gray-500">{mentorData.designation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {sidebarItems.find(item => item.id === activeSection)?.label}
              </h1>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-[#7968ed] hover:bg-[#6b5ce0] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
              >
                <Save size={18} />
                {isLoading ? 'Saving...' : 'Save Changes'}
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
              </button>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MentorProfile;