import axiosInstance from '../api/axiosInstance';

export const helpRequestService = {
  // Submit a new help request
  submitHelpRequest: async (requestData) => {
    try {
      const formData = new FormData();
      
      // Add basic request data
      formData.append('subject', requestData.subject);
      formData.append('questionText', requestData.questionText);
      formData.append('sessionDuration', requestData.sessionDuration);
      formData.append('urgencyLevel', requestData.urgencyLevel);
      
      // Add files if any
      if (requestData.files && requestData.files.length > 0) {
        requestData.files.forEach((file) => {
          formData.append('files', file.file);
        });
      }

      const response = await axiosInstance.post('/api/help-requests', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error submitting help request:', error);
      throw error.response?.data || { message: 'Failed to submit help request' };
    }
  },

  // Get all help requests for a student
  getMyHelpRequests: async () => {
    try {
      const response = await axiosInstance.get('/api/help-requests/my-requests');
      return response.data;
    } catch (error) {
      console.error('Error fetching help requests:', error);
      throw error.response?.data || { message: 'Failed to fetch help requests' };
    }
  },

  // Get available help requests for mentors
  getAvailableRequests: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.subject) queryParams.append('subject', filters.subject);
      if (filters.urgency) queryParams.append('urgency', filters.urgency);
      if (filters.sessionDuration) queryParams.append('sessionDuration', filters.sessionDuration);
      
      const response = await axiosInstance.get(`/api/help-requests/available?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching available requests:', error);
      throw error.response?.data || { message: 'Failed to fetch available requests' };
    }
  },

  // Accept a help request (for mentors)
  acceptHelpRequest: async (requestId) => {
    try {
      const response = await axiosInstance.post(`/api/help-requests/${requestId}/accept`);
      return response.data;
    } catch (error) {
      console.error('Error accepting help request:', error);
      throw error.response?.data || { message: 'Failed to accept help request' };
    }
  },

  // Update request status
  updateRequestStatus: async (requestId, status) => {
    try {
      const response = await axiosInstance.patch(`/api/help-requests/${requestId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating request status:', error);
      throw error.response?.data || { message: 'Failed to update request status' };
    }
  },

  // Get request details
  getRequestDetails: async (requestId) => {
    try {
      const response = await axiosInstance.get(`/api/help-requests/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching request details:', error);
      throw error.response?.data || { message: 'Failed to fetch request details' };
    }
  },

  // Submit rating and feedback after session
  submitSessionFeedback: async (requestId, feedbackData) => {
    try {
      const response = await axiosInstance.post(`/api/help-requests/${requestId}/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error.response?.data || { message: 'Failed to submit feedback' };
    }
  },

  // Get session history
  getSessionHistory: async () => {
    try {
      const response = await axiosInstance.get('/api/help-requests/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching session history:', error);
      throw error.response?.data || { message: 'Failed to fetch session history' };
    }
  }
};

export default helpRequestService;
