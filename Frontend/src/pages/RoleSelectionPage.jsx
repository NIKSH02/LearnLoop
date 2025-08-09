import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RolePopup from "../components/RolePopup";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { isLoggedIn, hasRole, user, loading } = useAuth();

  useEffect(() => {
    // If not logged in, redirect to login
    if (!loading && !isLoggedIn) {
      navigate("/login");
      return;
    }

    // If user already has a role, redirect to home
    if (!loading && isLoggedIn && hasRole) {
      navigate("/");
      return;
    }
  }, [loading, isLoggedIn, hasRole, navigate]);

  const handleClose = () => {
    navigate("/");
  };

  // Show loading while checking auth status
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-gray-900 to-black"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p
            className={`text-lg ${isDarkMode ? "text-white" : "text-gray-800"}`}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Don't show role popup if user is not logged in or already has a role
  if (!isLoggedIn || hasRole) {
    return null;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-gray-900 to-black"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      <RolePopup open={true} onClose={handleClose} />
    </div>
  );
};

export default RoleSelectionPage;
