import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import NotificationService from "../services/notificationService";

const NotificationBadge = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Load initial unread count
    loadUnreadCount();

    // Connect to socket for real-time updates
    connectToSocket();

    return () => {
      NotificationService.disconnectSocket();
    };
  }, []);

  const loadUnreadCount = async () => {
    try {
      const response = await NotificationService.getUnreadCount();
      if (response.success) {
        setUnreadCount(response.data.unreadCount);
      }
    } catch (error) {
      console.error("Error loading unread count:", error);
    }
  };

  const connectToSocket = async () => {
    try {
      const socket = await NotificationService.connectSocket();
      setIsConnected(true);

      // Listen for new notifications
      socket.on("new_notification", (notification) => {
        setUnreadCount((prev) => prev + 1);
      });

      // Listen for read/unread updates
      socket.on("notification_updated", (notification) => {
        if (notification.isRead) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        } else {
          setUnreadCount((prev) => prev + 1);
        }
      });

      // Listen for bulk read operations
      socket.on("notifications_bulk_updated", (data) => {
        if (data.markAllAsRead) {
          setUnreadCount(0);
        }
      });

      socket.on("connect", () => setIsConnected(true));
      socket.on("disconnect", () => setIsConnected(false));
    } catch (error) {
      console.error("Failed to connect to notification socket:", error);
      setIsConnected(false);
    }
  };

  const handleClick = () => {
    navigate("/notifications");
  };

  return (
    <button
      onClick={handleClick}
      className={`relative p-2 rounded-lg transition-all duration-300 ${
        isDarkMode
          ? "hover:bg-gray-700 text-gray-300 hover:text-white"
          : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
      }`}
      title="Notifications"
    >
      <Bell size={20} />

      {/* Unread count badge */}
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      {/* Connection status indicator */}
      <div
        className={`absolute bottom-0 right-0 w-2 h-2 rounded-full transition-colors duration-300 ${
          isConnected ? "bg-green-400" : "bg-red-400"
        }`}
        title={isConnected ? "Connected" : "Disconnected"}
      />
    </button>
  );
};

export default NotificationBadge;
