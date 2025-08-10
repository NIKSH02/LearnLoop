import axiosInstance from "../api/axiosInstance";
import io from "socket.io-client";

class NotificationService {
  constructor() {
    this.socket = null;
    this.baseURL = "/api/notifications";
  }

  // Connect to socket for real-time notifications
  async connectSocket() {
    try {
      const token = localStorage.getItem("token");
      this.socket = io(
        import.meta.env.VITE_API_URL || "http://localhost:5001",
        {
          auth: { token },
          transports: ["websocket", "polling"],
        }
      );

      this.socket.on("connect", () => {
        console.log("Connected to notification socket");
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from notification socket");
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      return this.socket;
    } catch (error) {
      console.error("Failed to connect to socket:", error);
      throw error;
    }
  }

  // Disconnect socket
  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Get notifications with filters and pagination
  async getNotifications(params = {}) {
    try {
      const response = await axiosInstance.get(this.baseURL, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  // Get unread notification count
  async getUnreadCount() {
    try {
      const response = await axiosInstance.get(`${this.baseURL}/unread-count`);
      return response.data;
    } catch (error) {
      console.error("Error fetching unread count:", error);
      throw error;
    }
  }

  // Mark single notification as read
  async markAsRead(notificationId) {
    try {
      const response = await axiosInstance.put(
        `${this.baseURL}/${notificationId}/mark-read`
      );
      return response.data;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  }

  // Mark single notification as unread
  async markAsUnread(notificationId) {
    try {
      const response = await axiosInstance.put(
        `${this.baseURL}/${notificationId}/mark-unread`
      );
      return response.data;
    } catch (error) {
      console.error("Error marking notification as unread:", error);
      throw error;
    }
  }

  // Mark all notifications as read
  async markAllAsRead() {
    try {
      const response = await axiosInstance.put(`${this.baseURL}/mark-all-read`);
      return response.data;
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      throw error;
    }
  }

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      const response = await axiosInstance.delete(
        `${this.baseURL}/${notificationId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  }

  // Delete all read notifications
  async deleteAllRead() {
    try {
      const response = await axiosInstance.delete(
        `${this.baseURL}/delete-all-read`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting all read notifications:", error);
      throw error;
    }
  }

  // Get notification preferences
  async getPreferences() {
    try {
      const response = await axiosInstance.get(`${this.baseURL}/preferences`);
      return response.data;
    } catch (error) {
      console.error("Error fetching notification preferences:", error);
      throw error;
    }
  }

  // Update notification preferences
  async updatePreferences(preferences) {
    try {
      const response = await axiosInstance.put(
        `${this.baseURL}/preferences`,
        preferences
      );
      return response.data;
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      throw error;
    }
  }

  // Send test notification (admin only)
  async sendTestNotification(notificationData) {
    try {
      const response = await axiosInstance.post(
        `${this.baseURL}/send-test`,
        notificationData
      );
      return response.data;
    } catch (error) {
      console.error("Error sending test notification:", error);
      throw error;
    }
  }

  // Get notification statistics (admin only)
  async getStatistics(params = {}) {
    try {
      const response = await axiosInstance.get(`${this.baseURL}/statistics`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching notification statistics:", error);
      throw error;
    }
  }

  // Real-time notification handlers
  onNewNotification(callback) {
    if (this.socket) {
      this.socket.on("new_notification", callback);
    }
  }

  onNotificationUpdate(callback) {
    if (this.socket) {
      this.socket.on("notification_updated", callback);
    }
  }

  onMentorshipUpdate(callback) {
    if (this.socket) {
      this.socket.on("mentorship_update", callback);
    }
  }

  onSystemAnnouncement(callback) {
    if (this.socket) {
      this.socket.on("system_announcement", callback);
    }
  }

  // Remove event listeners
  offNewNotification(callback) {
    if (this.socket) {
      this.socket.off("new_notification", callback);
    }
  }

  offNotificationUpdate(callback) {
    if (this.socket) {
      this.socket.off("notification_updated", callback);
    }
  }

  offMentorshipUpdate(callback) {
    if (this.socket) {
      this.socket.off("mentorship_update", callback);
    }
  }

  offSystemAnnouncement(callback) {
    if (this.socket) {
      this.socket.off("system_announcement", callback);
    }
  }
}

export default new NotificationService();
