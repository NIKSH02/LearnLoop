import React, { useState, useRef } from 'react';
import { User, Phone, Briefcase, Star, Clock, Plus, X, Save, Bell, Calendar, Activity, Users, Award, BookOpen, MessageSquare, Edit3, Camera, Upload } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

// Skills Input Component
const SkillsInput = ({ skills, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const { isDarkMode } = useTheme();
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
      <div className={`flex flex-wrap gap-2 min-h-[40px] p-3 rounded-lg border transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-700 border-gray-600' 
          : 'bg-gray-50 border-gray-200'
      }`}>
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
          className={`flex-1 px-4 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
          }`}
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
  const { isDarkMode } = useTheme();
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
          className={`p-4 rounded-lg border animate-fadeIn transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-4 flex-wrap">
            <select
              value={slot.day}
              onChange={(e) => updateTimeSlot(index, 'day', e.target.value)}
              className={`px-3 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
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
                className={`px-3 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <span className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>to</span>
              <input
                type="time"
                value={slot.end_time}
                onChange={(e) => updateTimeSlot(index, 'end_time', e.target.value)}
                className={`px-3 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
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
        className={`w-full p-3 border-2 border-dashed rounded-lg transition-all flex items-center justify-center gap-2 ${
          isDarkMode 
            ? 'border-gray-600 text-gray-400 hover:border-[#7968ed] hover:text-[#7968ed]' 
            : 'border-gray-300 text-gray-500 hover:border-[#7968ed] hover:text-[#7968ed]'
        }`}
      >
        <Plus size={18} />
        Add Time Slot
      </button>
    </div>
  );
};

// Main Mentor Profile Component
const MentorProfile = () => {
  const { isDarkMode } = useTheme();
  
  // Section-specific states
  const [sectionStates, setSectionStates] = useState({
    profile: { isEditing: true, isSaved: false, isLoading: false },
    professional: { isEditing: true, isSaved: false, isLoading: false },
    schedule: { isEditing: true, isSaved: false, isLoading: false },
    status: { isEditing: true, isSaved: false, isLoading: false }
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  const fileInputRef = useRef(null);
  
  const [mentorData, setMentorData] = useState({
    name: '',
    phone: '',
    designation: '',
    skills: [],
    experience_years: 0,
    bio: '',
    profileImage: null, // Add profile image state
    available_time_slots: [],
    isActive: true,
    mentees: [],
    totalSessions: 0,
    averageRating: 0,
    completionRate: 0
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

  // Section-specific handlers
  const handleSectionSave = async (sectionName) => {
    setSectionStates(prev => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], isLoading: true }
    }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSectionStates(prev => ({
      ...prev,
      [sectionName]: { isEditing: false, isSaved: true, isLoading: false }
    }));

    setShowSuccessMessage(`${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} section saved successfully!`);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage('');
    }, 3000);
    
    console.log(`${sectionName} data saved:`, mentorData);
  };

  const handleSectionEdit = (sectionName) => {
    setSectionStates(prev => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], isEditing: true }
    }));
  };

  const updateMentorData = (field, value) => {
    setMentorData(prev => ({ ...prev, [field]: value }));
  };

  // Utility function for consistent styling
  const getCardClasses = () => `rounded-2xl p-8 shadow-sm transition-colors duration-300 ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200'
  } border`;

  const getHeadingClasses = () => `text-2xl font-semibold flex items-center gap-3 transition-colors duration-300 ${
    isDarkMode ? 'text-white' : 'text-gray-900'
  }`;

  const getLabelClasses = () => `block text-sm font-medium mb-2 transition-colors duration-300 ${
    isDarkMode ? 'text-gray-300' : 'text-gray-700'
  }`;

  const getInputClasses = () => `w-full px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent ${
    isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
  }`;

  const getReadOnlyClasses = () => `w-full px-4 py-3 border rounded-lg transition-colors duration-300 ${
    isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-white' 
      : 'bg-gray-100 border-gray-200 text-gray-900'
  }`;

  const getEmptyStateClasses = () => `p-8 text-center rounded-lg border transition-colors duration-300 ${
    isDarkMode 
      ? 'text-gray-400 bg-gray-700 border-gray-600' 
      : 'text-gray-500 bg-gray-50 border-gray-200'
  }`;

  // Image upload handlers
  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    updateMentorData('profileImage', null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG, GIF, etc.)');
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        updateMentorData('profileImage', e.target.result);
      };
      reader.onerror = () => {
        alert('Error reading the file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-8">
            <div className={`rounded-2xl p-8 shadow-sm transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-semibold flex items-center gap-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <User className="text-[#7968ed]" size={24} />
                  Profile Overview
                </h2>
                <div className="flex items-center gap-3">
                  {sectionStates.profile.isSaved && !sectionStates.profile.isEditing && (
                    <button
                      onClick={() => handleSectionEdit('profile')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                  )}
                  {sectionStates.profile.isEditing && (
                    <button
                      onClick={() => handleSectionSave('profile')}
                      disabled={sectionStates.profile.isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-[#7968ed] hover:bg-[#6b5ce0] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                    >
                      <Save size={16} />
                      {sectionStates.profile.isLoading ? 'Saving...' : (sectionStates.profile.isSaved ? 'Save Changes' : 'Save Profile')}
                      {sectionStates.profile.isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-8 mb-8">
                {/* Profile Photo */}
                  <div className="flex flex-col items-center">
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden border-4 border-[#7968ed]/20 shadow-lg transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {mentorData.profileImage ? (
                      <img 
                        src={mentorData.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : mentorData.name ? (
                      <img 
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={48} className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                    )}
                  </div>                  {/* Image Upload Button */}
                  {sectionStates.profile.isEditing && (
                    <div className="mt-4 flex flex-col gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <button
                        onClick={handleImageUpload}
                        className={`flex items-center gap-2 px-4 py-2 border text-sm rounded-lg transition-all ${
                          mentorData.profileImage 
                            ? isDarkMode
                              ? 'bg-gray-600 hover:bg-gray-500 border-gray-500 text-gray-200'
                              : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700'
                            : 'bg-[#7968ed] hover:bg-[#6b5ce0] border-[#7968ed] text-white'
                        }`}
                      >
                        {mentorData.profileImage ? (
                          <>
                            <Edit3 size={16} />
                            Edit Image
                          </>
                        ) : (
                          <>
                            <Camera size={16} />
                            Upload Photo
                          </>
                        )}
                      </button>
                      
                      {/* Remove Image Button */}
                      {mentorData.profileImage && (
                        <button
                          onClick={handleRemoveImage}
                          className={`flex items-center gap-2 px-4 py-2 border text-sm rounded-lg transition-all ${
                            isDarkMode 
                              ? 'bg-red-900/50 hover:bg-red-900/70 border-red-700 text-red-300'
                              : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600'
                          }`}
                        >
                          <X size={16} />
                          Remove Photo
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* Show upload hint in view mode when no image */}
                  {!sectionStates.profile.isEditing && !mentorData.profileImage && (
                    <div className="mt-4 text-center">
                      <p className={`text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>No photo uploaded</p>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Full Name</label>
                      {sectionStates.profile.isEditing ? (
                        <input
                          type="text"
                          value={mentorData.name}
                          onChange={(e) => updateMentorData('name', e.target.value)}
                          placeholder="Enter your full name"
                          className={`w-full px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      ) : (
                        <div className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-100 border-gray-200 text-gray-900'
                        }`}>
                          {mentorData.name || 'Not provided'}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Designation</label>
                      {sectionStates.profile.isEditing ? (
                        <input
                          type="text"
                          value={mentorData.designation}
                          onChange={(e) => updateMentorData('designation', e.target.value)}
                          placeholder="Enter your designation"
                          className={`w-full px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      ) : (
                        <div className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-100 border-gray-200 text-gray-900'
                        }`}>
                          {mentorData.designation || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Phone Number</label>
                    {sectionStates.profile.isEditing ? (
                      <input
                        type="tel"
                        value={mentorData.phone}
                        onChange={(e) => updateMentorData('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        className={`w-full px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    ) : (
                      <div className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-gray-100 border-gray-200 text-gray-900'
                      }`}>
                        {mentorData.phone || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Bio {sectionStates.profile.isEditing && <span className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>({mentorData.bio.length}/500)</span>}
                </label>
                {sectionStates.profile.isEditing ? (
                  <textarea
                    value={mentorData.bio}
                    onChange={(e) => updateMentorData('bio', e.target.value)}
                    maxLength={500}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent resize-none ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Tell us about yourself, your expertise, and experience..."
                  />
                ) : (
                  <div className={`w-full px-4 py-3 border rounded-lg min-h-[120px] transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-100 border-gray-200 text-gray-900'
                  }`}>
                    {mentorData.bio || 'No bio provided'}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'professional':
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={getHeadingClasses()}>
                  <Briefcase className="text-[#7968ed]" size={24} />
                  Professional Information
                </h2>
                <div className="flex items-center gap-3">
                  {sectionStates.professional.isSaved && !sectionStates.professional.isEditing && (
                    <button
                      onClick={() => handleSectionEdit('professional')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                  )}
                  {sectionStates.professional.isEditing && (
                    <button
                      onClick={() => handleSectionSave('professional')}
                      disabled={sectionStates.professional.isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-[#7968ed] hover:bg-[#6b5ce0] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                    >
                      <Save size={16} />
                      {sectionStates.professional.isLoading ? 'Saving...' : (sectionStates.professional.isSaved ? 'Save Changes' : 'Save Professional Info')}
                      {sectionStates.professional.isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      )}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className={getLabelClasses()}>Experience (Years)</label>
                  {sectionStates.professional.isEditing ? (
                    <input
                      type="number"
                      min="0"
                      value={mentorData.experience_years}
                      onChange={(e) => updateMentorData('experience_years', parseInt(e.target.value) || 0)}
                      placeholder="Enter years of experience"
                      className={getInputClasses()}
                    />
                  ) : (
                    <div className={getReadOnlyClasses()}>
                      {mentorData.experience_years || 0} years
                    </div>
                  )}
                </div>

                <div>
                  <label className={getLabelClasses()}>Skills</label>
                  {sectionStates.professional.isEditing ? (
                    <SkillsInput
                      skills={mentorData.skills}
                      onChange={(skills) => updateMentorData('skills', skills)}
                    />
                  ) : (
                    <div className={`min-h-[40px] p-3 rounded-lg border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-100 border-gray-200'
                    }`}>
                      {mentorData.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {mentorData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 bg-[#7968ed] text-white rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No skills added</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`p-4 rounded-lg text-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="text-2xl font-bold text-[#7968ed]">{mentorData.totalSessions}</div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Total Sessions</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="text-2xl font-bold text-[#7968ed]">{mentorData.averageRating}</div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Average Rating</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="text-2xl font-bold text-[#7968ed]">{mentorData.completionRate}%</div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Completion Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={getHeadingClasses()}>
                  <Clock className="text-[#7968ed]" size={24} />
                  Available Time Slots
                </h2>
                <div className="flex items-center gap-3">
                  {sectionStates.schedule.isSaved && !sectionStates.schedule.isEditing && (
                    <button
                      onClick={() => handleSectionEdit('schedule')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                  )}
                  {sectionStates.schedule.isEditing && (
                    <button
                      onClick={() => handleSectionSave('schedule')}
                      disabled={sectionStates.schedule.isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-[#7968ed] hover:bg-[#6b5ce0] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                    >
                      <Save size={16} />
                      {sectionStates.schedule.isLoading ? 'Saving...' : (sectionStates.schedule.isSaved ? 'Save Changes' : 'Save Schedule')}
                      {sectionStates.schedule.isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      )}
                    </button>
                  )}
                </div>
              </div>
              
              {sectionStates.schedule.isEditing ? (
                <AvailabilityEditor
                  availableTimeSlots={mentorData.available_time_slots}
                  onChange={(slots) => updateMentorData('available_time_slots', slots)}
                />
              ) : (
                <div className="space-y-4">
                  {mentorData.available_time_slots.length > 0 ? (
                    mentorData.available_time_slots.map((slot, index) => (
                      <div key={index} className={`p-4 rounded-lg border transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600' 
                          : 'bg-gray-100 border-gray-200'
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className={`font-medium transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>{slot.day}</div>
                          <div className={`transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {slot.start_time} - {slot.end_time}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={getEmptyStateClasses()}>
                      No time slots added yet
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 'mentees':
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <h2 className={getHeadingClasses()}>
                <Users className="text-[#7968ed]" size={24} />
                Connected Mentees
              </h2>
              
              <div className="space-y-4">
                {mentorData.mentees.length > 0 ? (
                  mentorData.mentees.map((mentee) => (
                    <div key={mentee.id} className={`flex items-center justify-between p-4 rounded-lg border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#7968ed] rounded-full flex items-center justify-center text-white font-semibold">
                          {mentee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className={`font-medium transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>{mentee.name}</h3>
                          <p className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>{mentee.course}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-[#7968ed]">{mentee.progress}%</div>
                        <div className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>Progress</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={getEmptyStateClasses()}>
                    <Users size={48} className={`mx-auto mb-4 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-600' : 'text-gray-300'
                    }`} />
                    <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>No Mentees Yet</h3>
                    <p>Once you complete your profile, students will be able to connect with you for mentorship.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'status':
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={getHeadingClasses()}>
                  <Activity className="text-[#7968ed]" size={24} />
                  Status & Availability
                </h2>
                <div className="flex items-center gap-3">
                  {sectionStates.status.isSaved && !sectionStates.status.isEditing && (
                    <button
                      onClick={() => handleSectionEdit('status')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                  )}
                  {sectionStates.status.isEditing && (
                    <button
                      onClick={() => handleSectionSave('status')}
                      disabled={sectionStates.status.isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-[#7968ed] hover:bg-[#6b5ce0] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                    >
                      <Save size={16} />
                      {sectionStates.status.isLoading ? 'Saving...' : (sectionStates.status.isSaved ? 'Save Changes' : 'Save Status')}
                      {sectionStates.status.isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      )}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div>
                    <h3 className={`text-lg font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Profile Status</h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Make your profile visible to students</p>
                  </div>
                  {sectionStates.status.isEditing ? (
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
                  ) : (
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      mentorData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {mentorData.isActive ? 'Active' : 'Inactive'}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg text-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-2xl font-bold ${mentorData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {mentorData.isActive ? 'Active' : 'Inactive'}
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Current Status</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="text-2xl font-bold text-[#7968ed]">{mentorData.available_time_slots.length}</div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Available Slots</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <h2 className={getHeadingClasses()}>
                <Bell className="text-[#7968ed]" size={24} />
                Activity & Notifications
              </h2>
              
              <div className="space-y-4">
                <div className={getEmptyStateClasses()}>
                  <Bell size={48} className={`mx-auto mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-600' : 'text-gray-300'
                  }`} />
                  <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>No Activity Yet</h3>
                  <p>Your mentoring activities and notifications will appear here once you start connecting with students.</p>
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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar />
      
      <div className="flex pt-16"> {/* Add padding-top for fixed navbar */}
        {/* Sidebar */}
        <div className={`w-64 min-h-screen flex flex-col transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-gray-50 border-gray-200'
        } border-r`}>
          <div className="p-6">
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-[#7968ed]'
            }`}>
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
                      ? isDarkMode
                        ? 'bg-[#7968ed] text-white'
                        : 'bg-[#7968ed] text-white'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
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
          <div className={`p-6 border-t transition-colors duration-300 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#7968ed] flex items-center justify-center overflow-hidden border-2 border-[#7968ed]/20">
                {mentorData.profileImage ? (
                  <img 
                    src={mentorData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : mentorData.name ? (
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={24} className="text-white" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{mentorData.name || 'Your Name'}</p>
                <p className={`text-xs transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>{mentorData.designation || 'Your Designation'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 p-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            {showSuccessMessage && (
              <div className={`mb-6 p-4 rounded-lg animate-fadeIn transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-green-900/50 border-green-700' 
                  : 'bg-green-50 border-green-200'
              } border`}>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-green-300' : 'text-green-800'
                  }`}>{showSuccessMessage}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between mb-8">
              <h1 className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {sidebarItems.find(item => item.id === activeSection)?.label}
              </h1>
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