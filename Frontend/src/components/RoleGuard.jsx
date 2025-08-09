import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleGuard = ({ children, redirectTo = "/role-selection" }) => {
  const navigate = useNavigate();
  const { isLoggedIn, hasRole, loading } = useAuth();

  useEffect(() => {
    // If user is logged in but doesn't have a role, redirect to role selection
    if (!loading && isLoggedIn && !hasRole) {
      navigate(redirectTo);
    }
  }, [loading, isLoggedIn, hasRole, navigate, redirectTo]);

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }

  // If not logged in or has role, render children
  if (!isLoggedIn || hasRole) {
    return children;
  }

  // If logged in but no role, don't render anything (will redirect)
  return null;
};

export default RoleGuard;
