const mongoose = require('mongoose');

const helpRequestSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  subject: {
    type: String,
    required: true,
    enum: ['math', 'physics', 'chemistry', 'biology', 'computer', 'english', 'history', 'economics']
  },
  questionText: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000
  },
  attachments: [{
    filename: String,
    originalName: String,
    url: String,
    fileType: String,
    fileSize: Number
  }],
  sessionDuration: {
    type: Number,
    required: true,
    enum: [15, 20, 30],
    default: 15
  },
  urgencyLevel: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledAt: {
    type: Date,
    default: null
  },
  sessionStartTime: {
    type: Date,
    default: null
  },
  sessionEndTime: {
    type: Date,
    default: null
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  feedback: {
    type: String,
    maxlength: 500,
    default: null
  },
  mentorNotes: {
    type: String,
    maxlength: 1000,
    default: null
  },
  sessionNotes: {
    type: String,
    maxlength: 2000,
    default: null
  },
  tags: [{
    type: String,
    maxlength: 50
  }],
  priority: {
    type: Number,
    default: function() {
      const urgencyMap = { low: 1, medium: 2, high: 3 };
      return urgencyMap[this.urgencyLevel] || 2;
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
helpRequestSchema.index({ student: 1, status: 1 });
helpRequestSchema.index({ mentor: 1, status: 1 });
helpRequestSchema.index({ subject: 1, status: 1 });
helpRequestSchema.index({ urgencyLevel: 1, createdAt: -1 });
helpRequestSchema.index({ status: 1, createdAt: -1 });

// Virtual for session duration in a readable format
helpRequestSchema.virtual('sessionDurationText').get(function() {
  return `${this.sessionDuration} minutes`;
});

// Virtual for time since request
helpRequestSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
});

// Static method to find available requests for mentors
helpRequestSchema.statics.findAvailableRequests = function(filters = {}) {
  const query = { status: 'pending', mentor: null };
  
  if (filters.subject) query.subject = filters.subject;
  if (filters.urgency) query.urgencyLevel = filters.urgency;
  if (filters.sessionDuration) query.sessionDuration = filters.sessionDuration;
  
  return this.find(query)
    .populate('student', 'name email profileImage')
    .sort({ priority: -1, createdAt: -1 })
    .limit(20);
};

// Instance method to check if request can be accepted
helpRequestSchema.methods.canBeAccepted = function() {
  return this.status === 'pending' && !this.mentor;
};

// Instance method to calculate estimated response time
helpRequestSchema.methods.getEstimatedResponseTime = function() {
  const urgencyMultiplier = {
    high: 1,
    medium: 2,
    low: 3
  };
  
  const baseTime = 15; // 15 minutes base response time
  const multiplier = urgencyMultiplier[this.urgencyLevel] || 2;
  
  return baseTime * multiplier;
};

// Pre-save middleware to update priority
helpRequestSchema.pre('save', function(next) {
  if (this.isModified('urgencyLevel')) {
    const urgencyMap = { low: 1, medium: 2, high: 3 };
    this.priority = urgencyMap[this.urgencyLevel] || 2;
  }
  next();
});

// Pre-save middleware to set session end time when status changes to completed
helpRequestSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed' && !this.sessionEndTime) {
    this.sessionEndTime = new Date();
  }
  next();
});

module.exports = mongoose.model('HelpRequest', helpRequestSchema);
