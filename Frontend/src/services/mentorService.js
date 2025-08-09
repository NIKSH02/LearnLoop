import api from "../api/axiosInstance.js";

class MentorService {
  // Register mentor (create initial profile) - supports image upload
  async registerMentor(mentorData, imageFile = null) {
    try {
      const formData = new FormData();

      // Add all mentor data to form data
      Object.keys(mentorData).forEach((key) => {
        if (mentorData[key] !== null && mentorData[key] !== undefined) {
          if (Array.isArray(mentorData[key])) {
            // Handle arrays (like skills)
            mentorData[key].forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          } else if (typeof mentorData[key] === "object") {
            // Handle objects (like time slots)
            formData.append(key, JSON.stringify(mentorData[key]));
          } else {
            formData.append(key, mentorData[key]);
          }
        }
      });

      // Add image if provided
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const response = await api.post("/mentor/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error registering mentor:", error);
      throw this.handleError(error);
    }
  }

  // Create mentor profile with step-by-step data (alias for registerMentor)
  async createProfile(profileData, imageFile = null) {
    return this.registerMentor(profileData, imageFile);
  }

  // Get mentor profile
  async getMentorProfile() {
    try {
      const response = await api.get("/mentor/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching mentor profile:", error);
      throw this.handleError(error);
    }
  }

  // Alias for getMentorProfile to match frontend usage
  async getProfile() {
    return this.getMentorProfile();
  }

  // Update mentor profile
  async updateProfile(profileData) {
    try {
      const response = await api.put("/mentor/profile", profileData);
      return response.data;
    } catch (error) {
      console.error("Error updating mentor profile:", error);
      throw this.handleError(error);
    }
  }

  // Complete mentor profile (mark as complete in user model)
  async completeProfile(profileData) {
    try {
      const response = await api.post("/mentor/profile/complete", profileData);
      return response.data;
    } catch (error) {
      console.error("Error completing mentor profile:", error);
      throw this.handleError(error);
    }
  }

  // Upload profile image (for existing profiles - legacy support)
  async uploadProfileImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      // Try the legacy image upload route first for existing profiles
      try {
        const response = await api.post("/mentor/profile/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return (
          response.data.data.profileImage ||
          response.data.data.cloudinaryResponse?.secure_url
        );
      } catch (legacyError) {
        // If legacy route fails, it means profile doesn't exist yet
        // Use register endpoint instead
        throw new Error(
          "Profile not found. Please create profile first with image included."
        );
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      throw this.handleError(error);
    }
  }

  // Update profile with image support
  async updateProfileWithImage(profileData, imageFile = null) {
    try {
      if (imageFile) {
        // For now, update the profile data first, then upload image separately
        // In future, this could be combined into a single multipart request
        const profileResponse = await this.updateProfile(profileData);

        try {
          const imageUrl = await this.uploadProfileImage(imageFile);
          // Update profile again with image URL
          await this.updateProfile({ profileImage: imageUrl });
          return {
            ...profileResponse,
            data: {
              ...profileResponse.data,
              profileImage: imageUrl,
            },
          };
        } catch (imageError) {
          console.warn("Profile updated but image upload failed:", imageError);
          return profileResponse;
        }
      } else {
        return this.updateProfile(profileData);
      }
    } catch (error) {
      console.error("Error updating profile with image:", error);
      throw this.handleError(error);
    }
  }

  // Delete mentor profile
  async deleteMentorProfile() {
    try {
      const response = await api.delete("/mentor/profile");
      return response.data;
    } catch (error) {
      console.error("Error deleting mentor profile:", error);
      throw this.handleError(error);
    }
  }

  // Get mentor dashboard
  async getMentorDashboard() {
    try {
      const response = await api.get("/mentor/dashboard");
      return response.data;
    } catch (error) {
      console.error("Error fetching mentor dashboard:", error);
      throw this.handleError(error);
    }
  }

  // Get current mentees
  async getCurrentMentees() {
    try {
      const response = await api.get("/mentor/mentees");
      return response.data;
    } catch (error) {
      console.error("Error fetching mentees:", error);
      throw this.handleError(error);
    }
  }

  // Get incoming mentorship requests
  async getIncomingRequests() {
    try {
      const response = await api.get("/mentor/requests/incoming");
      return response.data;
    } catch (error) {
      console.error("Error fetching incoming requests:", error);
      throw this.handleError(error);
    }
  }

  // Respond to mentorship request
  async respondToRequest(requestData) {
    try {
      const response = await api.put("/mentor/requests/respond", requestData);
      return response.data;
    } catch (error) {
      console.error("Error responding to request:", error);
      throw this.handleError(error);
    }
  }

  // End mentorship relationship
  async endMentorship(relationshipData) {
    try {
      const response = await api.put(
        "/mentor/relationship/end",
        relationshipData
      );
      return response.data;
    } catch (error) {
      console.error("Error ending mentorship:", error);
      throw this.handleError(error);
    }
  }

  // Remove mentee
  async removeMentee(menteeData) {
    try {
      const response = await api.delete("/mentor/mentees/remove", {
        data: menteeData,
      });
      return response.data;
    } catch (error) {
      console.error("Error removing mentee:", error);
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

export default new MentorService();
