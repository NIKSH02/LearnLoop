import React, { useState, useEffect } from "react";
import {
  Bell,
  Check,
  X,
  Clock,
  User,
  Users,
  BookOpen,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Trash2,
  Filter,
  Mail,
  RefreshCw,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import NotificationService from "../services/notificationService";
import { useAuth } from "../context/AuthContext";

const Notifications = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, unread, read
  const [notificationType, setNotificationType] = useState("all"); // all, mentorship, system, rating
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load notifications on component mount
  useEffect(() => {
    loadNotifications();
  }, [filter, notificationType]);

  // Socket connection for real-time notifications
  useEffect(() => {
    // Connect to socket for real-time updates
    const connectSocket = async () => {
      try {
        const socket = await NotificationService.connectSocket();

        // Listen for new notifications
        socket.on("new_notification", (newNotification) => {
          setNotifications((prev) => [newNotification, ...prev]);
        });

        // Listen for notification updates
        socket.on("notification_updated", (updatedNotification) => {
          setNotifications((prev) =>
            prev.map((notif) =>
              notif._id === updatedNotification._id
                ? updatedNotification
                : notif
            )
          );
        });

        return () => socket.disconnect();
      } catch (error) {
        console.error("Socket connection failed:", error);
      }
    };

    connectSocket();
  }, []);

  const loadNotifications = async (pageNum = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await NotificationService.getNotifications({
        page: pageNum,
        limit: 20,
        isRead: filter === "all" ? undefined : filter === "read",
        type: notificationType === "all" ? undefined : notificationType,
      });

      if (response.success) {
        if (pageNum === 1 || isRefresh) {
          setNotifications(response.data.notifications);
        } else {
          setNotifications((prev) => [...prev, ...response.data.notifications]);
        }
        setHasMore(response.data.pagination.hasNextPage);
        setPage(pageNum);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await NotificationService.markAsRead(notificationId);
      if (response.success) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAsUnread = async (notificationId) => {
    try {
      const response = await NotificationService.markAsUnread(notificationId);
      if (response.success) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, isRead: false } : notif
          )
        );
      }
    } catch (error) {
      console.error("Error marking notification as unread:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await NotificationService.markAllAsRead();
      if (response.success) {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, isRead: true }))
        );
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const response = await NotificationService.deleteNotification(
        notificationId
      );
      if (response.success) {
        setNotifications((prev) =>
          prev.filter((notif) => notif._id !== notificationId)
        );
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleRefresh = () => {
    loadNotifications(1, true);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      loadNotifications(page + 1);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "mentorship_request_received":
      case "mentorship_request_accepted":
      case "mentorship_request_rejected":
        return <Users size={20} className="text-blue-500" />;
      case "official_mentor_request_received":
      case "official_mentor_request_accepted":
      case "official_mentor_request_rejected":
        return <Star size={20} className="text-purple-500" />;
      case "new_mentor_connection":
      case "new_mentee_connection":
        return <CheckCircle size={20} className="text-green-500" />;
      case "mentorship_ended":
        return <XCircle size={20} className="text-red-500" />;
      case "rating_received":
      case "rating_request":
        return <Star size={20} className="text-yellow-500" />;
      case "system_announcement":
        return <AlertCircle size={20} className="text-orange-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "mentorship_request_received":
      case "mentorship_request_accepted":
      case "mentorship_request_rejected":
        return "border-l-blue-500";
      case "official_mentor_request_received":
      case "official_mentor_request_accepted":
      case "official_mentor_request_rejected":
        return "border-l-purple-500";
      case "new_mentor_connection":
      case "new_mentee_connection":
        return "border-l-green-500";
      case "mentorship_ended":
        return "border-l-red-500";
      case "rating_received":
      case "rating_request":
        return "border-l-yellow-500";
      case "system_announcement":
        return "border-l-orange-500";
      default:
        return "border-l-gray-500";
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return time.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread" && notif.isRead) return false;
    if (filter === "read" && !notif.isRead) return false;
    return true;
  });

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Navbar />

      <div className="pt-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1
                className={`text-3xl font-bold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Notifications
              </h1>
              <p
                className={`text-sm mt-1 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {unreadCount > 0
                  ? `${unreadCount} unread notifications`
                  : "All caught up!"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                } ${isRefreshing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? "animate-spin" : ""}
                />
                Refresh
              </button>

              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-[#7968ed] hover:bg-[#6b5ce0] text-white rounded-lg font-medium transition-all duration-300"
                >
                  <Check size={16} />
                  Mark All Read
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter
                size={16}
                className={isDarkMode ? "text-gray-400" : "text-gray-500"}
              />
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Filter:
              </span>
            </div>

            <div className="flex items-center gap-2">
              {["all", "unread", "read"].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === filterOption
                      ? "bg-[#7968ed] text-white"
                      : isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {["all", "mentorship", "system", "rating"].map((typeOption) => (
                <button
                  key={typeOption}
                  onClick={() => setNotificationType(typeOption)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    notificationType === typeOption
                      ? "bg-[#7968ed] text-white"
                      : isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  {typeOption.charAt(0).toUpperCase() + typeOption.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {loading && notifications.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7968ed]"></div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div
              className={`text-center py-12 rounded-lg border-2 border-dashed transition-colors duration-300 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-300 bg-white"
              }`}
            >
              <Bell
                size={48}
                className={`mx-auto mb-4 ${
                  isDarkMode ? "text-gray-600" : "text-gray-400"
                }`}
              />
              <h3
                className={`text-lg font-medium mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                No notifications found
              </h3>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                {filter === "unread"
                  ? "All notifications have been read"
                  : "You're all caught up! New notifications will appear here."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`rounded-lg border-l-4 transition-all duration-300 hover:shadow-lg ${getNotificationColor(
                  notification.type
                )} ${
                  !notification.isRead
                    ? isDarkMode
                      ? "bg-gray-800 border border-gray-700 shadow-md"
                      : "bg-blue-50 border border-blue-200 shadow-md"
                    : isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className={`font-medium transition-colors duration-300 ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-[#7968ed] rounded-full"></div>
                          )}
                        </div>

                        <p
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {notification.message}
                        </p>

                        <div className="flex items-center gap-4 mt-2">
                          <span
                            className={`text-xs transition-colors duration-300 ${
                              isDarkMode ? "text-gray-500" : "text-gray-500"
                            }`}
                          >
                            <Clock size={12} className="inline mr-1" />
                            {formatTimeAgo(notification.createdAt)}
                          </span>

                          {notification.actionUrl && (
                            <button
                              onClick={() =>
                                (window.location.href = notification.actionUrl)
                              }
                              className="text-xs text-[#7968ed] hover:text-[#6b5ce0] font-medium transition-colors duration-300"
                            >
                              View Details
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {!notification.isRead ? (
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          className={`p-1 rounded transition-colors duration-300 ${
                            isDarkMode
                              ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                              : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                          }`}
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkAsUnread(notification._id)}
                          className={`p-1 rounded transition-colors duration-300 ${
                            isDarkMode
                              ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                              : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                          }`}
                          title="Mark as unread"
                        >
                          <Mail size={16} />
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleDeleteNotification(notification._id)
                        }
                        className={`p-1 rounded transition-colors duration-300 ${
                          isDarkMode
                            ? "hover:bg-red-900/50 text-gray-400 hover:text-red-400"
                            : "hover:bg-red-50 text-gray-500 hover:text-red-600"
                        }`}
                        title="Delete notification"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Load More Button */}
          {hasMore && !loading && filteredNotifications.length > 0 && (
            <div className="text-center py-6">
              <button
                onClick={loadMore}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                }`}
              >
                Load More Notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
