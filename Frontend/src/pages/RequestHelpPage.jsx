import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Clock, 
  Users, 
  Send, 
  X, 
  CheckCircle,
  Video,
  MessageSquare,
  Star,
  Filter,
  Search,
  Loader2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';

const RequestHelpPage = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('submit');
  const [sessionDuration, setSessionDuration] = useState('15');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [communityRequests, setCommunityRequests] = useState([]);
  const fileInputRef = useRef(null);

  const availableSeniors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      rating: 4.9,
      experience: '5+ years',
      sessions: 150,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      availability: 'Available now',
      specialties: ['Calculus', 'Algebra', 'Statistics']
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      subject: 'Physics',
      rating: 4.8,
      experience: '8+ years',
      sessions: 220,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      availability: 'Available in 30 min',
      specialties: ['Quantum Physics', 'Mechanics', 'Thermodynamics']
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      subject: 'Chemistry',
      rating: 4.9,
      experience: '6+ years',
      sessions: 180,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      availability: 'Available now',
      specialties: ['Organic Chemistry', 'Biochemistry', 'Physical Chemistry']
    }
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleSubmitRequest = async () => {
    if (!questionText.trim()) {
      setError('Please provide a question description.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Add to community requests locally for demo
      const newRequest = {
        id: Date.now(),
        questionText: questionText.trim(),
        sessionDuration,
        timestamp: new Date(),
        status: 'pending',
        student: { name: 'You', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }
      };
      
      setCommunityRequests(prev => [newRequest, ...prev]);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setQuestionText('');
        setUploadedFiles([]);
        setSessionDuration('15');
      }, 3000);
    } catch (error) {
      console.error('Error submitting help request:', error);
      setError(error.message || 'Failed to submit help request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <motion.button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg`
          : isDarkMode
            ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
            : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
      }`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon size={18} />
      <span>{label}</span>
    </motion.button>
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900' 
        : 'bg-gradient-to-br from-white via-gray-50 to-purple-50'
    }`}>
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-xl`}>
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className={`text-4xl md:text-5xl font-black leading-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Get <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Expert Help</span>
            </h1>
            <p className={`text-xl font-medium max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Connect with experienced seniors for personalized, on-demand academic support
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`flex space-x-2 p-2 rounded-2xl ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-sm border ${
              isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
            }`}>
              <TabButton
                id="submit"
                label="Submit Request"
                icon={Send}
                isActive={activeTab === 'submit'}
                onClick={setActiveTab}
              />
              <TabButton
                id="browse"
                label="Browse Seniors"
                icon={Users}
                isActive={activeTab === 'browse'}
                onClick={setActiveTab}
              />
              <TabButton
                id="community"
                label="Community"
                icon={MessageSquare}
                isActive={activeTab === 'community'}
                onClick={setActiveTab}
              />
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'submit' && (
              <motion.div
                key="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className={`rounded-3xl p-8 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700/50' 
                    : 'bg-white/50 border-gray-200/50'
                } backdrop-blur-xl border shadow-2xl`}>
                  
                  {/* Question Input */}
                  <div className="mb-8">
                    <h3 className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Describe Your Question
                    </h3>
                    <textarea
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Please provide a detailed description of your question or the concept you need help with..."
                      rows={6}
                      className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                        isDarkMode
                          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>

                  {/* File Upload */}
                  <div className="mb-8">
                    <h3 className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Upload Files (Optional)
                    </h3>
                    
                    <div
                      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                        isDarkMode
                          ? 'border-gray-600 hover:border-purple-500 bg-gray-700/30'
                          : 'border-gray-300 hover:border-purple-500 bg-gray-50/30'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className={`w-12 h-12 mx-auto mb-4 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <p className={`font-semibold mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Click to upload or drag and drop
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Images, PDFs, Documents (Max 10MB each)
                      </p>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {/* Uploaded Files */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className={`flex items-center justify-between p-3 rounded-xl ${
                              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className={`w-5 h-5 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`} />
                              <div>
                                <p className={`font-medium ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {file.name}
                                </p>
                                <p className={`text-xs ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className={`p-1 rounded-full hover:bg-red-500/20 transition-colors ${
                                isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                              }`}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Session Preferences */}
                  <div className="mb-8">
                    <div>
                      <h4 className={`text-lg font-bold mb-3 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Session Duration
                      </h4>
                      <div className="space-y-2">
                        {['15', '20', '30'].map((duration) => (
                          <label
                            key={duration}
                            className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                              sessionDuration === duration
                                ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white'
                                : isDarkMode
                                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                                  : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="duration"
                              value={duration}
                              checked={sessionDuration === duration}
                              onChange={(e) => setSessionDuration(e.target.value)}
                              className="hidden"
                            />
                            <Clock size={18} />
                            <span className="font-medium">{duration} minutes</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border-l-4 border-red-500 ${
                        isDarkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-700'
                      }`}
                    >
                      <p className="font-medium">{error}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleSubmitRequest}
                    disabled={!questionText.trim() || isSubmitting}
                    className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      !questionText.trim() || isSubmitting
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-xl'
                    }`}
                    whileHover={questionText.trim() && !isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={questionText.trim() && !isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Submit Help Request</span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === 'browse' && (
              <motion.div
                key="browse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Search and Filter */}
                <div className={`rounded-2xl p-6 mb-8 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700/50' 
                    : 'bg-white/50 border-gray-200/50'
                } backdrop-blur-xl border`}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        placeholder="Search mentors by name or expertise..."
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          isDarkMode
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                    <button className={`flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'
                        : 'bg-white/50 border-gray-200 text-gray-700 hover:bg-gray-100/50'
                    }`}>
                      <Filter size={18} />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                {/* Seniors Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableSeniors.map((senior) => (
                    <motion.div
                      key={senior.id}
                      className={`rounded-2xl p-6 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 border-gray-700/50' 
                          : 'bg-white/50 border-gray-200/50'
                      } backdrop-blur-xl border shadow-lg hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.02, y: -4 }}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={senior.avatar}
                          alt={senior.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/20"
                        />
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {senior.name}
                          </h3>
                          <p className={`font-medium ${
                            isDarkMode ? 'text-purple-400' : 'text-purple-600'
                          }`}>
                            {senior.subject}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className={`font-semibold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {senior.rating}
                            </span>
                          </div>
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {senior.sessions} sessions
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className={`text-sm font-medium ${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          }`}>
                            {senior.availability}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {senior.specialties.slice(0, 2).map((specialty, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs rounded-full ${
                                isDarkMode 
                                  ? 'bg-purple-500/20 text-purple-300' 
                                  : 'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {specialty}
                            </span>
                          ))}
                          {senior.specialties.length > 2 && (
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              isDarkMode 
                                ? 'bg-gray-600 text-gray-300' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              +{senior.specialties.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button className={`py-2 px-4 rounded-xl font-semibold transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600'
                            : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50 border border-gray-200'
                        }`}>
                          <MessageSquare size={16} className="inline mr-2" />
                          Chat
                        </button>
                        <button className="py-2 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300">
                          <Video size={16} className="inline mr-2" />
                          Session
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'community' && (
              <motion.div
                key="community"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className={`rounded-2xl p-6 mb-8 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700/50' 
                    : 'bg-white/50 border-gray-200/50'
                } backdrop-blur-xl border`}>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Recent Help Requests
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    See what fellow students are asking for help with. Join the conversation and help each other learn!
                  </p>
                </div>

                {communityRequests.length > 0 ? (
                  <div className="space-y-4">
                    {communityRequests.map((request) => (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-2xl p-6 ${
                          isDarkMode 
                            ? 'bg-gray-800/50 border-gray-700/50' 
                            : 'bg-white/50 border-gray-200/50'
                        } backdrop-blur-xl border shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={request.student.avatar}
                            alt={request.student.name}
                            className="w-12 h-12 rounded-xl object-cover border-2 border-purple-500/20"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`font-semibold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {request.student.name}
                              </h4>
                              <span className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                {request.sessionDuration} min session
                              </span>
                            </div>
                            <p className={`mb-3 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {request.questionText}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                Just posted
                              </span>
                              <button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300">
                                Offer Help
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mx-auto mb-6`}>
                      <MessageSquare className="w-12 h-12 text-white" />
                    </div>
                    <h3 className={`text-3xl font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      No Requests Yet
                    </h3>
                    <p className={`text-lg max-w-2xl mx-auto ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Be the first to submit a help request! Your questions will appear here for seniors to help answer.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`max-w-md w-full rounded-3xl p-8 text-center ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border shadow-2xl`}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Request Submitted!
              </h3>
              <p className={`mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Your help request has been sent to available mentors. You'll receive a notification when someone accepts your request.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                  Estimated response time: 5-15 minutes
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RequestHelpPage;
