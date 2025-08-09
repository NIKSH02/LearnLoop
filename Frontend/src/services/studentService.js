import axiosInstance from "../api/axiosInstance";

class StudentService {
  // Create student profile (handles step-by-step creation with image upload)
  static async createProfile(studentData, imageFile = null) {
    try {
      const formData = new FormData();

      // Add all student data to form data
      Object.keys(studentData).forEach((key) => {
        if (key === "academicInfo" || key === "strongSubjects") {
          formData.append(key, JSON.stringify(studentData[key]));
        } else {
          formData.append(key, studentData[key]);
        }
      });

      // Add image file if provided
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const response = await axiosInstance.post("/student/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        return {
          success: true,
          data: response.data.data.student,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error creating student profile:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to create student profile",
      };
    }
  }

  // Get student profile
  static async getProfile() {
    try {
      const response = await axiosInstance.get("/student/profile");

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error fetching student profile:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch student profile",
      };
    }
  }

  // Update student profile (only for existing profiles)
  static async updateProfile(updateData) {
    try {
      const response = await axiosInstance.put("/student/profile", updateData);

      if (response.data) {
        return {
          success: true,
          data: response.data.data.student,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error updating student profile:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update student profile",
      };
    }
  }

  // Update profile image
  static async updateProfileImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      const response = await axiosInstance.put(
        "/student/profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update profile image",
      };
    }
  }

  // Complete student profile
  static async completeProfile(profileData) {
    try {
      const response = await axiosInstance.post(
        "/student/complete-profile",
        profileData
      );

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error completing student profile:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to complete student profile",
      };
    }
  }

  // Delete student profile
  static async deleteProfile() {
    try {
      const response = await axiosInstance.delete("/student/profile");

      if (response.data) {
        return {
          success: true,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error deleting student profile:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to delete student profile",
      };
    }
  }

  // Get subjects by semester (for auto-fetching current subjects)
  static async getSubjectsBySemester(semester, branch) {
    try {
      const response = await axiosInstance.get(
        `/subject/${branch}/${semester}`
      );

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          subjects: response.data.data, // For compatibility
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch subjects",
      };
    }
  }

  // ============= MENTORSHIP REQUEST MANAGEMENT =============

  // Send mentorship request to a mentor
  static async sendMentorshipRequest(mentorId, message = "") {
    try {
      const response = await axiosInstance.post("/student/request-mentor", {
        mentorId,
        message,
      });

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error sending mentorship request:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to send mentorship request",
      };
    }
  }

  // Get outgoing mentorship requests (sent by student)
  static async getOutgoingRequests(status = "pending") {
    try {
      const response = await axiosInstance.get("/student/outgoing-requests", {
        params: { status },
      });

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error fetching outgoing requests:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch outgoing requests",
      };
    }
  }

  // Cancel mentorship request
  static async cancelMentorshipRequest(requestId) {
    try {
      const response = await axiosInstance.delete(
        `/student/cancel-request/${requestId}`
      );

      if (response.data) {
        return {
          success: true,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error canceling mentorship request:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to cancel mentorship request",
      };
    }
  }

  // Get current mentors (accepted mentorship relationships)
  static async getCurrentMentors() {
    try {
      const response = await axiosInstance.get("/student/current-mentors");

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error fetching current mentors:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch current mentors",
      };
    }
  }

  // Get mentorship dashboard
  static async getDashboard() {
    try {
      const response = await axiosInstance.get("/student/dashboard");

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error fetching student dashboard:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch dashboard",
      };
    }
  }

  // ============= MENTEE MANAGEMENT (for 2nd+ year students) =============

  // Get incoming mentorship requests (for students who can mentor)
  static async getIncomingMentorshipRequests(status = "pending") {
    try {
      const response = await axiosInstance.get("/student/incoming-requests", {
        params: { status },
      });

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error fetching incoming requests:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch incoming requests",
      };
    }
  }

  // Respond to mentorship request (accept/reject) - for senior students
  static async respondToMentorshipRequest(requestId, response, message = "") {
    try {
      const apiResponse = await axiosInstance.post(
        "/student/respond-to-request",
        {
          requestId,
          response, // 'accepted' or 'rejected'
          message,
        }
      );

      if (apiResponse.data) {
        return {
          success: true,
          data: apiResponse.data.data,
          message: apiResponse.data.message,
        };
      }
    } catch (error) {
      console.error("Error responding to mentorship request:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to respond to mentorship request",
      };
    }
  }

  // Get current mentees (for senior students)
  static async getCurrentMentees() {
    try {
      const response = await axiosInstance.get("/student/current-mentees");

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error fetching current mentees:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch current mentees",
      };
    }
  }

  // End mentorship relationship (student side)
  static async endMentorshipRelationship(mentorId) {
    try {
      const response = await axiosInstance.post("/student/end-mentorship", {
        mentorId,
      });

      if (response.data) {
        return {
          success: true,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error ending mentorship relationship:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to end mentorship relationship",
      };
    }
  }

  // ============= SEARCH AND DISCOVERY =============

  // Search for mentors
  static async searchMentors(filters = {}) {
    try {
      const { page = 1, limit = 10, skills, experience_min, name } = filters;

      const response = await axiosInstance.get("/student/search-mentors", {
        params: {
          page,
          limit,
          skills,
          experience_min,
          name,
        },
      });

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error searching mentors:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to search mentors",
      };
    }
  }

  // Get mentor details by ID
  static async getMentorById(mentorId) {
    try {
      const response = await axiosInstance.get(`/student/mentor/${mentorId}`);

      if (response.data) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("Error fetching mentor details:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch mentor details",
      };
    }
  }
}

export default StudentService;
