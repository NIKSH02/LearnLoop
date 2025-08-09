import React, { useState, useEffect, useRef } from 'react';
import { signinService, sendOtpService, loginWithOtpService } from '../services/authService';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, LogIn, Smartphone, Users, BookOpen, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigateWithLoader } from '../hooks/useNavigateWithLoader.js';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const { navigateWithLoader } = useNavigateWithLoader();
  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const [loginMethod, setLoginMethod] = useState('password');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLoginWithPassword = async () => {
    if (!usernameOrEmail || !password) {
      setMessage('Please enter username/email and password.');
      setMessageType('error');
      return;
    }
    setMessage('Logging in with password...');
    setMessageType('success');
    try {
      const response = await signinService({ usernameOrEmail, password });
      login(response.data);
      setMessage('Login successful! Redirecting...');
      setMessageType('success');
      setTimeout(() => {
        navigateWithLoader('/role-selection', {
          message: 'WELCOME! CHOOSE YOUR ROLE',
          duration: 1500
        });
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed.');
      setMessageType('error');
    }
  };

  const handleSendOtpLogin = async () => {
    if (!email) {
      setMessage('Please enter your email.');
      setMessageType('error');
      return;
    }
    setMessage('Sending OTP to your email...');
    setMessageType('success');
    try {
      await sendOtpService({ email, purpose: 'login' });
      setShowOtpSection(true);
      setOtpTimer(60);
      setCanResendOtp(false);
      setMessage('OTP sent to your email. Please check your inbox.');
      setMessageType('success');
    } catch (err) {
      const backendMsg = err.response?.data?.message || 'Failed to send OTP.';
      console.error('OTP Login Error:', backendMsg, err);
      if (
        backendMsg.includes('not registered') ||
        backendMsg.includes('not verified')
      ) {
        setMessage(
          backendMsg + ' If you are a new user, please sign up first.'
        );
        setMessageType('error');
      } else {
        setMessage(backendMsg);
        setMessageType('error');
      }
    }
  };

  const handleResendOtpLogin = async () => {
    setMessage('Resending OTP...');
    setMessageType('success');
    setOtpTimer(60);
    setCanResendOtp(false);
    try {
      await sendOtpService({ email, purpose: 'login' });
      setMessage('OTP resent. Please check your inbox.');
      setMessageType('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to resend OTP.');
      setMessageType('error');
    }
  };

  const handleOtpSubmitLogin = async () => {
    if (otp.length !== 6) {
      setMessage('Please enter a 6-digit OTP.');
      setMessageType('error');
      return;
    }
    try {
      const response = await loginWithOtpService({ email, otp });
      login(response.data);
      setMessage('Login successful via OTP! Redirecting...');
      setMessageType('success');
      clearTimeout(otpTimerRef.current);
      setOtpTimer(0);
      setTimeout(() => {
        navigateWithLoader('/role-selection', {
          message: 'WELCOME! CHOOSE YOUR ROLE',
          duration: 1500
        });
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP. Please try again.');
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
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Welcome Content */}
            <div className="hidden lg:block">
              <div className="text-center lg:text-left">
                <h1 className={`text-5xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Welcome Back to{' '}
                  <span className="bg-gradient-to-r from-[#9e8eef] to-[#8676ed] bg-clip-text text-transparent">
                    TutorLink
                  </span>
                </h1>
                <p className={`text-xl mb-8 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Continue your learning journey with personalized tutoring and expert guidance
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
                        Expert Tutors
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Connect with qualified tutors in your field
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
                        Personalized Learning
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Tailored lessons based on your goals
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
                        Track Progress
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Monitor your learning achievements
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="max-w-md mx-auto w-full">
              <div className={`rounded-2xl p-8 shadow-xl border ${
                isDarkMode 
                  ? 'bg-gray-800/60 border-gray-700/50 backdrop-blur-sm' 
                  : 'bg-white/70 border-white/50 backdrop-blur-sm'
              }`}>
                
                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDarkMode ? 'bg-[#9e8eef]/20' : 'bg-[#9e8eef]/10'
                  }`}>
                    <LogIn className="text-[#9e8eef]" size={32} />
                  </div>
                  <h2 className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Sign In
                  </h2>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Access your learning dashboard
                  </p>
                </div>

                {/* Message */}
                {message && (
                  <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${
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

                {/* Login Method Toggle */}
                <div className={`flex rounded-xl p-1 mb-6 ${
                  isDarkMode ? 'bg-gray-700/30' : 'bg-[#e7e9ec]/60'
                }`}>
                  <button
                    onClick={() => { setLoginMethod('password'); setMessage(''); setShowOtpSection(false); setOtp(''); setEmail(''); }}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      loginMethod === 'password'
                        ? 'bg-[#9e8eef] text-white shadow-lg'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Lock size={16} />
                    <span>Password</span>
                  </button>
                  <button
                    onClick={() => { setLoginMethod('email'); setMessage(''); setShowOtpSection(false); setOtp(''); setUsernameOrEmail(''); setPassword(''); }}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      loginMethod === 'email'
                        ? 'bg-[#9e8eef] text-white shadow-lg'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Smartphone size={16} />
                    <span>OTP</span>
                  </button>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  {loginMethod === 'password' ? (
                    <>
                      {/* Username/Email */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Username or Email
                        </label>
                        <div className="relative">
                          <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} size={18} />
                          <input
                            type="text"
                            placeholder="Enter your username or email"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9e8eef]/50 focus:border-[#9e8eef] ${
                              isDarkMode 
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Password
                        </label>
                        <div className="relative">
                          <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} size={18} />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9e8eef]/50 focus:border-[#9e8eef] ${
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
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        onClick={handleLoginWithPassword}
                        disabled={!usernameOrEmail || !password}
                        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                          (!usernameOrEmail || !password)
                            ? isDarkMode
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-[#9e8eef] to-[#8676ed] text-white hover:from-[#8676ed] hover:to-[#9e8eef] transform hover:scale-[1.02] shadow-lg'
                        }`}
                      >
                        Sign In
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Email OTP Section */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Email Address
                        </label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} size={18} />
                            <input
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => { setEmail(e.target.value); setShowOtpSection(false); setOtp(''); setMessage(''); }}
                              className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9e8eef]/50 focus:border-[#9e8eef] ${
                                isDarkMode 
                                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                  : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
                              }`}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleSendOtpLogin}
                            disabled={!email || showOtpSection}
                            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                              (!email || showOtpSection)
                                ? isDarkMode
                                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#9e8eef] to-[#8676ed] text-white hover:from-[#8676ed] hover:to-[#9e8eef] shadow-lg'
                            }`}
                          >
                            Send OTP
                          </button>
                        </div>

                        {showOtpSection && (
                          <div className={`mt-4 space-y-4 p-4 rounded-lg border ${
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
                              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9e8eef]/50 focus:border-[#9e8eef] ${
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
                                onClick={handleResendOtpLogin}
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
                              onClick={handleOtpSubmitLogin}
                              className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-[#9e8eef] to-[#8676ed] text-white hover:from-[#8676ed] hover:to-[#9e8eef] transform hover:scale-[1.02] shadow-lg transition-all duration-200"
                            >
                              Verify OTP
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Don't have an account?{' '}
                    <Link 
                      to="/signup" 
                      className="font-medium text-[#9e8eef] hover:text-[#8676ed] transition-colors duration-200"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
