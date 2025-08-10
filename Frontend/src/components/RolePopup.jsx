import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserService from "../services/userService";

const RolePopup = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { refreshUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState(null);

  const handleRoleSelection = async (role) => {
    try {
      setLoading(true);
      setSelectedRole(role);
      setError(null);

      // Update role in backend
      const response = await UserService.updateUserRole(role);

      if (response.success) {
        // Refresh user data in AuthContext to update hasRole
        await refreshUserData();

        // Store the selected role in localStorage
        localStorage.setItem("userRole", role);

        // Show success message briefly
        setTimeout(() => {
          onClose();

          // Navigate based on role selection
          if (role === "mentor") {
            navigate("/MentorProfile");
          } else if (role === "student") {
            navigate("/UserProfile"); // Navigate to user profile page for students
          }
        }, 500);
      }
    } catch (error) {
      console.error("Error updating role:", error);
      setError(error.message || "Failed to update role");
      setSelectedRole(null);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-8 relative w-full max-w-4xl mx-4"
          initial={{ scale: 0.9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 40 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="absolute top-4 right-4 text-purple-500 hover:text-purple-700 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
            onClick={onClose}
          >
            ×
          </button>

          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">
              Choose Your Role
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Select how you'd like to use our platform
            </p>
            {error && (
              <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            {loading && (
              <div className="mt-3 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
                Updating your role...
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            {/* Mentor Card */}
            <motion.div
              className={`flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 border-2 transition-all duration-300 cursor-pointer flex-1 max-w-sm ${
                selectedRole === "mentor"
                  ? "border-green-400 bg-green-50"
                  : loading
                  ? "border-gray-300 opacity-50 cursor-not-allowed"
                  : "border-purple-100 dark:border-purple-700 hover:border-purple-400"
              }`}
              whileHover={
                !loading
                  ? {
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(123, 97, 255, 0.3)",
                    }
                  : {}
              }
              whileTap={!loading ? { scale: 0.98 } : {}}
              onClick={() => !loading && handleRoleSelection("mentor")}
            >
              <div
                className={`w-20 h-20 mb-6 flex items-center justify-center rounded-full shadow-lg ${
                  selectedRole === "mentor"
                    ? "bg-gradient-to-br from-green-500 to-green-600"
                    : "bg-gradient-to-br from-purple-500 to-purple-600"
                } text-white`}
              >
                {selectedRole === "mentor" ? (
                  // Success checkmark
                  <svg viewBox="0 0 24 24" fill="none" width="40" height="40">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : loading && selectedRole === null ? (
                  // Loading spinner
                  <svg
                    className="animate-spin"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="32"
                      strokeDashoffset="32"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        dur="2s"
                        values="0 32;16 16;0 32;0 32"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="stroke-dashoffset"
                        dur="2s"
                        values="0;-16;-32;-32"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                ) : (
                  // Student icon
                  <svg viewBox="0 0 24 24" fill="none" width="40" height="40">
                    <path
                      d="M22 10v6M2 10l10-5 10 5-10 5z"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 12v5a6 3 0 0 0 12 0v-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-3">
                Are you a Mentor?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center leading-relaxed">
                Share your expertise and guide students in their learning
                journey. Help them achieve their academic goals.
              </p>
              <button
                disabled={loading}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-3 shadow-lg ${
                  selectedRole === "mentor"
                    ? "bg-green-500 text-white"
                    : loading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600 text-white hover:shadow-xl"
                }`}
              >
                <span>
                  {selectedRole === "mentor"
                    ? "Role Updated!"
                    : "Continue as Mentor"}
                </span>
                {selectedRole === "mentor" ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M5 12h14m-7-7l7 7-7 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </motion.div>

            {/* Student Card */}
            <motion.div
              className={`flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 border-2 transition-all duration-300 cursor-pointer flex-1 max-w-sm ${
                selectedRole === "student"
                  ? "border-green-400 bg-green-50"
                  : loading
                  ? "border-gray-300 opacity-50 cursor-not-allowed"
                  : "border-purple-100 dark:border-purple-700 hover:border-purple-400"
              }`}
              whileHover={
                !loading
                  ? {
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(123, 97, 255, 0.3)",
                    }
                  : {}
              }
              whileTap={!loading ? { scale: 0.98 } : {}}
              onClick={() => !loading && handleRoleSelection("student")}
            >
              <div
                className={`w-20 h-20 mb-6 flex items-center justify-center rounded-full shadow-lg ${
                  selectedRole === "student"
                    ? "bg-gradient-to-br from-green-500 to-green-600"
                    : "bg-gradient-to-br from-purple-500 to-purple-600"
                } text-white`}
              >
                {selectedRole === "student" ? (
                  // Success checkmark
                  <svg viewBox="0 0 24 24" fill="none" width="40" height="40">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : loading && selectedRole === null ? (
                  // Loading spinner
                  <svg
                    className="animate-spin"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="32"
                      strokeDashoffset="32"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        dur="2s"
                        values="0 32;16 16;0 32;0 32"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="stroke-dashoffset"
                        dur="2s"
                        values="0;-16;-32;-32"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                ) : (
                  // Mentor icon
                  <svg viewBox="0 0 24 24" fill="none" width="40" height="40">
                    <path
                      d="M20 7L9 18L4 13"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="8"
                      r="3"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-3">
                Are you a Student?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center leading-relaxed">
                Connect with experienced mentors and get personalized help in
                your subjects. Learn at your own pace.
              </p>
              <button
                disabled={loading}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-3 shadow-lg ${
                  selectedRole === "student"
                    ? "bg-green-500 text-white"
                    : loading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600 text-white hover:shadow-xl"
                }`}
              >
                <span>
                  {selectedRole === "student"
                    ? "Role Updated!"
                    : "Continue as Student"}
                </span>
                {selectedRole === "student" ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M5 12h14m-7-7l7 7-7 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RolePopup;
