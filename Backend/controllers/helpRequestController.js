const HelpRequest = require('../models/helpRequest');
const User = require('../models/user');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { sendNotification } = require('../utils/notificationUtils');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

// Submit a new help request
const submitHelpRequest = asyncHandler(async (req, res) => {
  const { subject, questionText, sessionDuration, urgencyLevel } = req.body;
  const studentId = req.user._id;

  // Validate required fields
  if (!subject || !questionText || !sessionDuration) {
    throw new ApiError(400, 'Subject, question text, and session duration are required');
  }

  // Validate question text length
  if (questionText.length < 10 || questionText.length > 2000) {
    throw new ApiError(400, 'Question text must be between 10 and 2000 characters');
  }

  // Handle file uploads
  let attachments = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      try {
        const uploadResult = await uploadToCloudinary(file.path, 'help-requests');
        attachments.push({
          filename: uploadResult.public_id,
          originalName: file.originalname,
          url: uploadResult.secure_url,
          fileType: file.mimetype,
          fileSize: file.size
        });
      } catch (error) {
        console.error('Error uploading file:', error);
        // Continue with other files if one fails
      }
    }
  }

  // Create help request
  const helpRequest = new HelpRequest({
    student: studentId,
    subject,
    questionText: questionText.trim(),
    sessionDuration: parseInt(sessionDuration),
    urgencyLevel: urgencyLevel || 'medium',
    attachments
  });

  await helpRequest.save();

  // Populate student info for response
  await helpRequest.populate('student', 'name email profileImage');

  // Send notifications to available mentors
  try {
    await notifyAvailableMentors(helpRequest);
  } catch (error) {
    console.error('Error sending mentor notifications:', error);
    // Don't fail the request if notifications fail
  }

  res.status(201).json(
    new ApiResponse(201, helpRequest, 'Help request submitted successfully')
  );
});

// Get help requests for the current student
const getMyHelpRequests = asyncHandler(async (req, res) => {
  const studentId = req.user._id;
  const { status, page = 1, limit = 10 } = req.query;

  const query = { student: studentId };
  if (status) query.status = status;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 },
    populate: {
      path: 'mentor',
      select: 'name email profileImage experience rating'
    }
  };

  const helpRequests = await HelpRequest.paginate(query, options);

  res.json(new ApiResponse(200, helpRequests, 'Help requests retrieved successfully'));
});

// Get available help requests for mentors
const getAvailableRequests = asyncHandler(async (req, res) => {
  const { subject, urgency, sessionDuration, page = 1, limit = 20 } = req.query;
  
  const filters = {};
  if (subject) filters.subject = subject;
  if (urgency) filters.urgency = urgency;
  if (sessionDuration) filters.sessionDuration = parseInt(sessionDuration);

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const helpRequests = await HelpRequest.findAvailableRequests(filters)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await HelpRequest.countDocuments({
    status: 'pending',
    mentor: null,
    ...filters
  });

  const response = {
    requests: helpRequests,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit))
    }
  };

  res.json(new ApiResponse(200, response, 'Available help requests retrieved successfully'));
});

// Accept a help request (for mentors)
const acceptHelpRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const mentorId = req.user._id;

  // Verify user is a mentor
  if (req.user.role !== 'mentor') {
    throw new ApiError(403, 'Only mentors can accept help requests');
  }

  const helpRequest = await HelpRequest.findById(requestId).populate('student', 'name email');

  if (!helpRequest) {
    throw new ApiError(404, 'Help request not found');
  }

  if (!helpRequest.canBeAccepted()) {
    throw new ApiError(400, 'This help request cannot be accepted');
  }

  // Update help request
  helpRequest.mentor = mentorId;
  helpRequest.status = 'accepted';
  helpRequest.scheduledAt = new Date();

  await helpRequest.save();

  // Populate mentor info for response
  await helpRequest.populate('mentor', 'name email profileImage experience rating');

  // Send notification to student
  try {
    await sendNotification({
      userId: helpRequest.student._id,
      type: 'help_request_accepted',
      title: 'Help Request Accepted!',
      message: `Your help request for ${helpRequest.subject} has been accepted by a mentor.`,
      data: {
        requestId: helpRequest._id,
        mentorName: req.user.name
      }
    });
  } catch (error) {
    console.error('Error sending student notification:', error);
  }

  res.json(new ApiResponse(200, helpRequest, 'Help request accepted successfully'));
});

// Update help request status
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;
  const userId = req.user._id;

  const validStatuses = ['in-progress', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }

  const helpRequest = await HelpRequest.findById(requestId);

  if (!helpRequest) {
    throw new ApiError(404, 'Help request not found');
  }

  // Check permissions
  const isStudent = helpRequest.student.toString() === userId.toString();
  const isMentor = helpRequest.mentor && helpRequest.mentor.toString() === userId.toString();

  if (!isStudent && !isMentor) {
    throw new ApiError(403, 'You do not have permission to update this request');
  }

  // Update status with validation
  if (status === 'in-progress' && helpRequest.status !== 'accepted') {
    throw new ApiError(400, 'Can only start session from accepted status');
  }

  if (status === 'in-progress') {
    helpRequest.sessionStartTime = new Date();
  }

  helpRequest.status = status;
  await helpRequest.save();

  // Populate for response
  await helpRequest.populate([
    { path: 'student', select: 'name email profileImage' },
    { path: 'mentor', select: 'name email profileImage experience rating' }
  ]);

  res.json(new ApiResponse(200, helpRequest, 'Request status updated successfully'));
});

// Get help request details
const getRequestDetails = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const userId = req.user._id;

  const helpRequest = await HelpRequest.findById(requestId)
    .populate('student', 'name email profileImage')
    .populate('mentor', 'name email profileImage experience rating');

  if (!helpRequest) {
    throw new ApiError(404, 'Help request not found');
  }

  // Check permissions
  const isStudent = helpRequest.student._id.toString() === userId.toString();
  const isMentor = helpRequest.mentor && helpRequest.mentor._id.toString() === userId.toString();

  if (!isStudent && !isMentor && req.user.role !== 'admin') {
    throw new ApiError(403, 'You do not have permission to view this request');
  }

  res.json(new ApiResponse(200, helpRequest, 'Request details retrieved successfully'));
});

// Submit session feedback and rating
const submitSessionFeedback = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { rating, feedback, sessionNotes } = req.body;
  const userId = req.user._id;

  const helpRequest = await HelpRequest.findById(requestId);

  if (!helpRequest) {
    throw new ApiError(404, 'Help request not found');
  }

  // Check permissions
  const isStudent = helpRequest.student.toString() === userId.toString();
  const isMentor = helpRequest.mentor && helpRequest.mentor.toString() === userId.toString();

  if (!isStudent && !isMentor) {
    throw new ApiError(403, 'You do not have permission to submit feedback for this request');
  }

  // Validate rating
  if (rating && (rating < 1 || rating > 5)) {
    throw new ApiError(400, 'Rating must be between 1 and 5');
  }

  // Update feedback based on user role
  if (isStudent) {
    helpRequest.rating = rating;
    helpRequest.feedback = feedback;
  }

  if (isMentor) {
    helpRequest.mentorNotes = feedback;
    helpRequest.sessionNotes = sessionNotes;
  }

  // Mark as completed if both parties have provided feedback
  if (helpRequest.rating && helpRequest.mentorNotes && helpRequest.status !== 'completed') {
    helpRequest.status = 'completed';
    helpRequest.sessionEndTime = new Date();
  }

  await helpRequest.save();

  // Update mentor's rating if student provided feedback
  if (isStudent && rating && helpRequest.mentor) {
    await updateMentorRating(helpRequest.mentor, rating);
  }

  res.json(new ApiResponse(200, helpRequest, 'Feedback submitted successfully'));
});

// Get session history for user
const getSessionHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10, status } = req.query;

  let query;
  if (req.user.role === 'mentor') {
    query = { mentor: userId };
  } else {
    query = { student: userId };
  }

  if (status) query.status = status;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 },
    populate: req.user.role === 'mentor' 
      ? { path: 'student', select: 'name email profileImage' }
      : { path: 'mentor', select: 'name email profileImage experience rating' }
  };

  const sessions = await HelpRequest.paginate(query, options);

  res.json(new ApiResponse(200, sessions, 'Session history retrieved successfully'));
});

// Helper function to notify available mentors
const notifyAvailableMentors = async (helpRequest) => {
  try {
    // Find mentors who specialize in the requested subject
    const mentors = await User.find({
      role: 'mentor',
      isActive: true,
      'subjects': helpRequest.subject
    }).select('_id name');

    const notifications = mentors.map(mentor => ({
      userId: mentor._id,
      type: 'new_help_request',
      title: 'New Help Request',
      message: `A student needs help with ${helpRequest.subject}`,
      data: {
        requestId: helpRequest._id,
        subject: helpRequest.subject,
        urgency: helpRequest.urgencyLevel
      }
    }));

    // Send notifications in batches
    for (const notification of notifications) {
      await sendNotification(notification);
    }
  } catch (error) {
    console.error('Error notifying mentors:', error);
  }
};

// Helper function to update mentor rating
const updateMentorRating = async (mentorId, newRating) => {
  try {
    // Calculate new average rating
    const completedSessions = await HelpRequest.find({
      mentor: mentorId,
      status: 'completed',
      rating: { $exists: true, $ne: null }
    });

    if (completedSessions.length > 0) {
      const totalRating = completedSessions.reduce((sum, session) => sum + session.rating, 0);
      const averageRating = totalRating / completedSessions.length;

      await User.findByIdAndUpdate(mentorId, {
        rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
        totalSessions: completedSessions.length
      });
    }
  } catch (error) {
    console.error('Error updating mentor rating:', error);
  }
};

module.exports = {
  submitHelpRequest,
  getMyHelpRequests,
  getAvailableRequests,
  acceptHelpRequest,
  updateRequestStatus,
  getRequestDetails,
  submitSessionFeedback,
  getSessionHistory
};
