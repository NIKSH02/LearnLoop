import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LoadingContext } from './context/LoadingContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import MentorPage from './pages/MentorPage';

// Components
import AIAssistant from './components/AIAssistant';


// Styles
import './App.css';

// Simple Loading Provider implementation
const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('LOADING...');

  const showLoader = (message = 'LOADING...') => {
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
    setLoading: setIsLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg font-medium">{loadingMessage}</p>
          </div>
        </div>
      )}
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
                {/* Home/Landing Page */}
                <Route 
                  path="/" 
                  element={<LandingPage />} 
                />
                
                {/* Authentication Routes */}
                <Route 
                  path="/login" 
                  element={<LoginPage />} 
                />
                <Route 
                  path="/signup" 
                  element={<SignUpPage />} 
                />
                
                {/* Public Pages */}
                <Route 
                  path="/about" 
                  element={<AboutPage />} 
                />
                
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
                  element={
                    <ProtectedRoute>
                      <AIAssistant />
                    </ProtectedRoute>
                  } 
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
                      <Navigate to="/login" replace />
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
                <Route 
                  path="*" 
                  element={<Navigate to="/" replace />} 
                />
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
