import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { LoadingContext } from "./context/LoadingContext";

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import MentorPage from './pages/MentorPage';


import RoleSelectionPage from './pages/RoleSelectionPage';
import MentorProfile from './pages/MentorProfile';
import RequestHelpPage from './pages/RequestHelpPage';
import MeetYourGuide from './pages/MeetYourGuide';


// Components
import GlobalLoader from './components/GlobalLoader';
import RolePopup from './components/RolePopup';
import AIAssistant from './components/AIAssistant';



// Styles
import './App.css';


// Simple Loading Provider implementation
const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [loadingMessage, setLoadingMessage] = useState('Initializing TutorLink...');

  // Hide loader after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const showLoader = (message = "LOADING...") => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const value = {
    isLoading,
    loadingMessage,
    showLoader,
    hideLoader,
    setLoading: setIsLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <GlobalLoader isLoading={isLoading} loadingMessage={loadingMessage} />
    </LoadingContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  // This can be enhanced with actual auth logic
  return children;
};

// Main App Component
function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <LoadingProvider>
            <div className="App min-h-screen">
              <Routes>
                {/* Global Navigation Bar can be added here */}
              
             
                <Route 
                  path='/MentorProfile'
                  element={<MentorProfile />}
                />
                <Route 
                  path='/request-help'
                  element={<RequestHelpPage />}
                />
                <Route 
                  path='/meet-your-guide'
                  element={<MeetYourGuide />}
                />
                {/* Home/Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Authentication Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                {/* Public Pages */}
                <Route path="/about" element={<AboutPage />} />

                {/* Role Selection */}
                <Route path="/role-selection" element={<RoleSelectionPage />} />

                {/* Mentor/Teachers Page */}
                <Route 
                  path="/mentors" 
                  element={<MentorPage />} 
                />
              
                <Route 
                  path="/teachers" 
                  element={<MentorPage />} 
                />
                
                {/* AI Assistant */}
                <Route 
                  path="/ai-assistant" 
                  element={<AIAssistant />} 
                />
              
                
                {/* Contact Route - Can be a section on landing page */}
                <Route
                  path="/contact"
                  element={<Navigate to="/#contact" replace />}
                />

                {/* Services/Study Hub Route */}
                <Route
                  path="/services"
                  element={<Navigate to="/#services" replace />}
                />
                <Route
                  path="/study-hub"
                  element={<Navigate to="/#study-hub" replace />}
                />

                {/* Gallery/Images Route */}
                <Route
                  path="/gallery"
                  element={<Navigate to="/#gallery" replace />}
                />

                {/* Mystry/Special Routes */}
                <Route
                  path="/mystry"
                  element={<Navigate to="/ai-assistant" replace />}
                />
                <Route
                  path="/text"
                  element={<Navigate to="/ai-assistant" replace />}
                />

                {/* Profile Routes - Protected */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <Navigate to="/signup" replace />
                    </ProtectedRoute>
                  }
                />

                {/* Dashboard Routes - Protected */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <Navigate to="/login" replace />
                    </ProtectedRoute>
                  }
                />

                {/* Settings Routes - Protected */}
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <Navigate to="/login" replace />
                    </ProtectedRoute>
                  }
                />

                {/* Notifications Routes - Protected */}
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <Notifications />
                    </ProtectedRoute>
                  }
                />

                {/* Archive Routes - Protected */}
                <Route
                  path="/archive"
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <Navigate to="/login" replace />
                    </ProtectedRoute>
                  }
                />

                {/* Analytics Routes - Protected */}
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <Navigate to="/login" replace />
                    </ProtectedRoute>
                  }
                />

                {/* Legal Pages */}
                <Route
                  path="/privacy"
                  element={<Navigate to="/about" replace />}
                />
                <Route
                  path="/terms"
                  element={<Navigate to="/about" replace />}
                />

                {/* 404 Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

              {/* Global Loader Component */}
            </div>
          </LoadingProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;