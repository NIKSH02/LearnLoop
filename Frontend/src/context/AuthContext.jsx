import React, { createContext, useContext, useState, useEffect } from "react";
import { logoutService } from "../services/authService";
import UserService from "../services/userService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRole, setHasRole] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();

    // Listen for storage events (when login/logout happens)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      const loginStatus = localStorage.getItem("isLoggedIn");
      const userData = localStorage.getItem("userData");
      console.log("Checking auth status:", { loginStatus, userData });
      console.log("Current user data:", userData ? JSON.parse(userData) : null);
      if (loginStatus === "true") {
        setIsLoggedIn(true);
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);

          // Fetch fresh user data from backend to check role
          try {
            const currentUserResponse = await UserService.getCurrentUser();
            console.log("Current user response:", currentUserResponse);
            if (currentUserResponse.success) {
              const freshUserData = currentUserResponse.data;

              // Update localStorage with fresh data including role
              localStorage.setItem("userData", JSON.stringify(freshUserData));
              setUser(freshUserData);

              // Check if user has a role
              setHasRole(!!freshUserData.role);
            }
          } catch (error) {
            console.error("Error fetching fresh user data:", error);
            // Use cached data if API fails
            setHasRole(!!parsedUserData.role);
          }
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setHasRole(false);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
      setUser(null);
      setHasRole(false);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    localStorage.setItem("isLoggedIn", "true");
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      setHasRole(!!userData.role);
    }
    setIsLoggedIn(true);

    // Trigger storage event for other components
    window.dispatchEvent(new Event("storage"));
  };

  const logout = async () => {
    try {
      // Get user email for backend logout (optional)
      const userData = localStorage.getItem("userData");
      const email = userData ? JSON.parse(userData).email : null;

      // Call backend logout API
      await logoutService({ email });
      console.log("Backend logout successful");
    } catch (error) {
      console.error("Backend logout failed:", error);
      // Continue with frontend logout even if backend fails
    }

    // Clear frontend state regardless of backend response
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUser(null);
    setHasRole(false);

    // Trigger storage event for other components
    window.dispatchEvent(new Event("storage"));
  };

  const refreshUserData = async () => {
    try {
      const response = await UserService.getCurrentUser();
      if (response.success) {
        const freshUserData = response.data;
        localStorage.setItem("userData", JSON.stringify(freshUserData));
        setUser(freshUserData);
        setHasRole(!!freshUserData.role);
        return freshUserData;
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    hasRole,
    login,
    logout,
    checkAuthStatus,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
