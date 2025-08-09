import api from "../api/axiosInstance.js";

class UserService {
  // Get current user profile
  async getCurrentUser() {
    try {
      const response = await api.get("/user/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw this.handleError(error);
    }
  }

  // Update user role
  async updateUserRole(role) {
    try {
      const response = await api.patch("/user/role", { role });
      return response.data;
    } catch (error) {
      console.error("Error updating user role:", error);
      throw this.handleError(error);
    }
  }

  // Update user basic info
  async updateUserInfo(userInfo) {
    try {
      const response = await api.patch("/user/info", userInfo);
      return response.data;
    } catch (error) {
      console.error("Error updating user info:", error);
      throw this.handleError(error);
    }
  }

  // Delete user account
  async deleteUser() {
    try {
      const response = await api.delete("/user/profile");
      return response.data;
    } catch (error) {
      console.error("Error deleting user account:", error);
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || "An error occurred";
      const status = error.response.status;
      return new Error(`${status}: ${message}`);
    } else if (error.request) {
      // Request made but no response received
      return new Error("Network error - please check your connection");
    } else {
      // Something else happened
      return new Error(error.message || "An unexpected error occurred");
    }
  }
}

export default new UserService();
