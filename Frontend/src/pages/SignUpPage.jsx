import React, { useState, useEffect, useRef } from 'react';
import { sendOtpService, verifyOtpService, signupService } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';

const SignUpPage = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="relative">
          {/* Back Button */}
          <Link
            to="/"
            className="absolute -top-2 -left-2 flex items-center text-white/70 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span className="ml-1 text-sm">Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center pt-8">
            <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-300">Join our platform today</p>
          </div>

          {/* Main Card */}
          <div 
            className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Message */}
            {message && (
              <div className={`mb-6 p-3 rounded-lg text-sm ${
                messageType === 'error' 
                  ? 'bg-red-500/20 text-red-200 border border-red-500/30' 
                  : 'bg-green-500/20 text-green-200 border border-green-500/30'
              }`}>
                {message}
              </div>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Email Verification Section */}
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setIsEmailVerified(false); setShowOtpSection(false); setOtp(''); setMessage(''); }}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      disabled={isEmailVerified}
                    />
                  </div>
                  {!isEmailVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!email || showOtpSection}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        (!email || showOtpSection)
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700'
                      }`}
                    >
                      Verify
                    </button>
                  )}
                  {isEmailVerified && (
                    <div className="px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <span className="text-green-200 text-sm font-medium">✓ Verified</span>
                    </div>
                  )}
                </div>

                {showOtpSection && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      maxLength="6"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                    <div className="flex justify-between items-center text-sm text-gray-300">
                      <span>Time remaining: {otpTimer}s</span>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={!canResendOtp}
                        className={`font-medium ${canResendOtp ? 'text-purple-400 hover:text-purple-300' : 'text-gray-500 cursor-not-allowed'}`}
                      >
                        Resend OTP
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="w-full py-2 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                type="submit"
                onClick={handleSignUp}
                disabled={!fullName || !username || !email || !password || !confirmPassword || !isEmailVerified}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                  (!fullName || !username || !email || !password || !confirmPassword || !isEmailVerified)
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 transform hover:scale-[1.02] shadow-lg'
                }`}
              >
                Create Account
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
