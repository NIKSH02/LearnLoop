const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  submitHelpRequest,
  getMyHelpRequests,
  getAvailableRequests,
  acceptHelpRequest,
  updateRequestStatus,
  getRequestDetails,
  submitSessionFeedback,
  getSessionHistory
} = require('../controllers/helpRequestController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/help-requests');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allow images, PDFs, and documents
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 5 // Maximum 5 files per request
  }
});

// All routes require authentication
router.use(authenticate);

// Submit a new help request
router.post('/', upload.array('files', 5), submitHelpRequest);

// Get help requests for current user
router.get('/my-requests', getMyHelpRequests);

// Get available help requests (for mentors)
router.get('/available', getAvailableRequests);

// Get session history
router.get('/history', getSessionHistory);

// Get specific help request details
router.get('/:requestId', getRequestDetails);

// Accept a help request (for mentors)
router.post('/:requestId/accept', acceptHelpRequest);

// Update help request status
router.patch('/:requestId/status', updateRequestStatus);

// Submit session feedback and rating
router.post('/:requestId/feedback', submitSessionFeedback);

module.exports = router;
