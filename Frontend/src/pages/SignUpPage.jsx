import React, { useState, useEffect, useRef } from 'react';
import { sendOtpService, verifyOtpService, signupService } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Shield, CheckCircle, Users, BookOpen, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const otpTimerRef = useRef(null);

  useEffect(() => {
    if (otpTimer > 0) {
      otpTimerRef.current = setTimeout(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    } else if (otpTimer === 0 && showOtpSection) {
      setCanResendOtp(true);
    }
    return () => clearTimeout(otpTimerRef.current);
  }, [otpTimer, showOtpSection]);

  const validateForm = () => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      setMessage('Please fill in all fields.');
      setMessageType('error');
      return false;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      return false;
    }
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setMessageType('error');
      return false;
    }
    if (!isEmailVerified) {
      setMessage('Please verify your email first.');
      setMessageType('error');
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    if (!email) {
      setMessage('Please enter your email.');
      setMessageType('error');
      return;
    }
    setMessage('Sending OTP to your email...');
    setMessageType('success');
    try {
      await sendOtpService({ email, purpose: 'signup' });
      setShowOtpSection(true);
      setOtpTimer(60);
      setCanResendOtp(false);
      setMessage('OTP sent to your email. Please check your inbox.');
      setMessageType('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP.');
      setMessageType('error');
    }
  };

  const handleResendOtp = async () => {
    setMessage('Resending OTP...');
    setMessageType('success');
    setOtpTimer(60);
    setCanResendOtp(false);
    try {
      await sendOtpService({ email, purpose: 'signup' });
      setMessage('OTP resent. Please check your inbox.');
      setMessageType('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to resend OTP.');
      setMessageType('error');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setMessage('Please enter a 6-digit OTP.');
      setMessageType('error');
      return;
    }
    try {
      await verifyOtpService({ email, otp, purpose: 'signup' });
      setIsEmailVerified(true);
      setShowOtpSection(false);
      setMessage('Email verified successfully!');
      setMessageType('success');
      clearTimeout(otpTimerRef.current);
      setOtpTimer(0);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP. Please try again.');
      setMessageType('error');
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setMessage('Creating your account...');
    setMessageType('success');
    try {
      await signupService({ fullName, username, email, password });
      localStorage.setItem('isLoggedIn', 'true');
      window.dispatchEvent(new Event('storage'));
      setMessage('Account created successfully! Redirecting to login...');
      setMessageType('success');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Sign up failed.');
      setMessageType('error');
    }
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-[#e7e9ec] via-[#d7d4e0] to-[#e7e9ec]'
    }`}>
      <Navbar />
      
      {/* Main Content */}
      <div className="pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">
            
            {/* Left Side - Welcome Content */}
            <div className="hidden lg:block">
              <div className="text-center lg:text-left">
                <h1 className={`text-5xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Join{' '}
                  <span className="bg-gradient-to-r from-[#9e8eef] to-[#8676ed] bg-clip-text text-transparent">
                    TutorLink
                  </span>{' '}
                  Today
                </h1>
                <p className={`text-xl mb-8 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Start your personalized learning journey with expert tutors and mentors
                </p>
                
                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <div className={`flex items-center space-x-4 p-4 rounded-xl ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'
                  }`}>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#9e8eef] to-[#8676ed] rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Connect with Experts
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Access to verified tutors and industry professionals
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-4 p-4 rounded-xl ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'
                  }`}>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#9e8eef] to-[#8676ed] rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Flexible Learning
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Learn at your own pace with personalized schedules
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-4 p-4 rounded-xl ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'
                  }`}>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#9e8eef] to-[#8676ed] rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Achieve Goals
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Track progress and reach your learning objectives
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className={`p-4 rounded-xl ${
                    isDarkMode ? 'bg-gray-800/30' : 'bg-white/40'
                  }`}>
                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      1K+
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Active Tutors
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    isDarkMode ? 'bg-gray-800/30' : 'bg-white/40'
                  }`}>
                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      5K+
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Students
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    isDarkMode ? 'bg-gray-800/30' : 'bg-white/40'
                  }`}>
                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      50+
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Subjects
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="max-w-md mx-auto w-full">
              <div className={`rounded-2xl p-6 shadow-xl border ${
                isDarkMode 
                  ? 'bg-gray-800/60 border-gray-700/50 backdrop-blur-sm' 
                  : 'bg-white/70 border-white/50 backdrop-blur-sm'
              }`}>
                
                {/* Header */}
                <div className="text-center mb-5">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                    isDarkMode ? 'bg-[#9e8eef]/20' : 'bg-[#9e8eef]/10'
                  }`}>
                    <Shield className="text-[#9e8eef]" size={24} />
                  </div>
                  <h2 className={`text-2xl font-bold mb-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Create Account
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Join thousands of learners today
                  </p>
                </div>

                {/* Message */}
                {message && (
                  <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                    messageType === 'error' 
                      ? isDarkMode
                        ? 'bg-red-900/20 text-red-400 border border-red-800/50' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                      : isDarkMode
                        ? 'bg-green-900/20 text-green-400 border border-green-800/50'
                        : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {message}
                  </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {/* Full Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} size={16} />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9e8eef]/50 focus:border-[#9e8eef] ${
                          isDarkMode 
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Username
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} size={16} />
                      <input
                        type="text"
                        placeholder="Choose a unique username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9e8eef]/50 focus:border-[#9e8eef] ${
                          isDarkMode 
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email Verification Section */}
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address
                    </label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} size={16} />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setIsEmailVerified(false); setShowOtpSection(false); setOtp(''); setMessage(''); }}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9e8eef]/50 focus:border-[#9e8eef] ${
                            isDarkMode 
                              ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
                          } ${isEmailVerified ? 'opacity-75' : ''}`}
                          disabled={isEmailVerified}
                        />
                      </div>
                      {!isEmailVerified && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={!email || showOtpSection}
                          className={`px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all duration-200 text-sm ${
                            (!email || showOtpSection)
                              ? isDarkMode
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-[#9e8eef] to-[#8676ed] text-white hover:from-[#8676ed] hover:to-[#9e8eef] shadow-lg'
                          }`}
                        >
                          Verify
                        </button>
                      )}
                      {isEmailVerified && (
                        <div className={`px-4 py-2.5 rounded-lg border flex items-center ${
                          isDarkMode 
                            ? 'bg-green-900/30 border-green-700/50' 
                            : 'bg-green-50 border-green-200'
                        }`}>
                          <CheckCircle className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`} size={18} />
                        </div>
                      )}
                    </div>

                    {showOtpSection && (
                      <div className={`mt-3 space-y-3 p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700/30 border-gray-600' 
                          : 'bg-[#e7e9ec]/30 border-gray-200'
                      }`}>
                        <input
                          type="text"
                          maxLength="6"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className={`w-full px-3 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9e8eef]/50 focus:border-[#9e8eef] ${
                            isDarkMode 
                              ? 'bg-gray-600/50 border-gray-500 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                        <div className={`flex justify-between items-center text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <span>Time remaining: {otpTimer}s</span>
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={!canResendOtp}
                            className={`font-medium ${
                              canResendOtp 
                                ? 'text-[#9e8eef] hover:text-[#8676ed]' 
                                : isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            Resend OTP
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          className="w-full py-2.5 rounded-lg font-medium bg-gradient-to-r from-[#9e8eef] to-[#8676ed] text-white hover:from-[#8676ed] hover:to-[#9e8eef] transition-all duration-200"
                        >
                          Verify OTP
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} size={16} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-10 pr-12 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9e8eef]/50 focus:border-[#9e8eef] ${
                          isDarkMode 
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          isDarkMode 
                            ? 'text-gray-400 hover:text-white' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} size={16} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-10 pr-12 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9e8eef]/50 focus:border-[#9e8eef] ${
                          isDarkMode 
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                          isDarkMode 
                            ? 'text-gray-400 hover:text-white' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={handleSignUp}
                    disabled={!fullName || !username || !email || !password || !confirmPassword || !isEmailVerified}
                    className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200 ${
                      (!fullName || !username || !email || !password || !confirmPassword || !isEmailVerified)
                        ? isDarkMode
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#9e8eef] to-[#8676ed] text-white hover:from-[#8676ed] hover:to-[#9e8eef] transform hover:scale-[1.02] shadow-lg'
                    }`}
                  >
                    Create Account
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="font-medium text-[#9e8eef] hover:text-[#8676ed] transition-colors duration-200"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SignUpPage;
