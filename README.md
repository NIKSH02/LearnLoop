# 🎓 LearnLoop - Advanced Mentorship & Educational Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-black.svg)](https://socket.io/)

**LearnLoop** is a comprehensive full-stack mentorship and educational platform designed to connect students with mentors through an intelligent peer-to-peer system. The platform facilitates knowledge sharing, real-time communication, and democratic learning through innovative features like weekly polling systems, AI assistance, and comprehensive rating mechanisms.

## 🌟 Key Features

### 🤝 **Dual Mentorship System**
- **Student-to-Student Mentoring**: Peer-to-peer knowledge sharing based on academic strengths
- **Professional Mentoring**: Industry experts providing career guidance and specialized skills
- **Smart Mentor Discovery**: Intelligent matching based on subjects, year, and proficiency
- **Special 4th Year Handling**: Exclusive access to professional mentors for graduating students

### 💬 **Real-Time Communication**
- **Personal Messaging**: One-on-one chat between mentors and mentees
- **Group Chat**: Subject-based group discussions and study sessions
- **Live Notifications**: Real-time updates for mentorship requests, ratings, and announcements
- **Socket.IO Integration**: Seamless real-time bidirectional communication

### 🗳️ **Democratic Learning via Weekly Polls**
- **Automated Poll Creation**: Weekly polls for mentor selection per subject/branch/year
- **Community-Driven Sessions**: Students vote for mentors to conduct educational sessions
- **Branch & Year Targeting**: Polls specific to academic streams and levels
- **Session Scheduling**: Poll winners can organize group learning sessions

### ⭐ **Comprehensive Rating System**
- **Multi-Directional Ratings**: Students rate mentors, mentors rate mentees
- **Professional Mentor Ratings**: Dedicated rating system for industry mentors
- **Real-Time Rating Updates**: Instant notifications and live rating analytics
- **Feedback & Analytics**: Detailed feedback with rating trends and performance metrics

### 🤖 **AI-Powered Assistance**
- **AI Learning Assistant**: Intelligent help system for academic queries
- **Smart Recommendations**: AI-driven mentor and subject suggestions
- **Automated Insights**: Performance analytics and learning path recommendations

### 📊 **Advanced Analytics & Insights**
- **Mentorship Analytics**: Track mentoring sessions, ratings, and progress
- **Subject Proficiency Tracking**: Monitor and visualize academic strengths
- **Help Request Management**: Systematic approach to academic assistance
- **Performance Dashboards**: Comprehensive user and system analytics

## 🏗️ Architecture Overview

### **Backend (Node.js + Express)**
```
Backend/
├── 📁 config/          # Database and configuration files
├── 📁 controllers/     # Business logic and API endpoints
├── 📁 middlewares/     # Authentication and authorization
├── 📁 models/          # MongoDB schemas and data models
├── 📁 routes/          # API route definitions
├── 📁 services/        # Core business services
├── 📁 utils/           # Utility functions and helpers
├── 📁 docs/            # API documentation
└── 📄 server.js        # Express server configuration
```

### **Frontend (React + Vite)**
```
Frontend/
├── 📁 src/
│   ├── 📁 components/  # Reusable UI components
│   ├── 📁 pages/       # Application pages and views
│   ├── 📁 context/     # React Context providers
│   ├── 📁 hooks/       # Custom React hooks
│   ├── 📁 api/         # API integration and services
│   ├── 📁 assets/      # Static assets and resources
│   └── 📄 App.jsx      # Main application component
├── 📁 public/          # Public static files
└── 📄 vite.config.js   # Vite configuration
```

## 🚀 Tech Stack

### **Backend Technologies**
- **Runtime**: Node.js (18.x)
- **Framework**: Express.js (5.x)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO (4.8.1)
- **File Upload**: Multer + Cloudinary
- **Email Service**: Nodemailer
- **Task Scheduling**: Node-cron
- **Security**: bcryptjs, CORS middleware

### **Frontend Technologies**
- **Framework**: React (19.x)
- **Build Tool**: Vite (7.x)
- **Styling**: Tailwind CSS (4.x)
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion, GSAP
- **State Management**: React Context API
- **Routing**: React Router DOM (7.x)
- **HTTP Client**: Axios
- **UI Components**: Lucide React Icons

### **Development Tools**
- **Linting**: ESLint
- **Development Server**: Nodemon
- **Package Manager**: npm
- **Version Control**: Git

## ⚡ Quick Start

### Prerequisites
- Node.js (18.x or higher)
- MongoDB (Local or Cloud)
- npm or yarn package manager


```

### 2. Backend Setup
```bash
cd Backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

### 4. Environment Configuration
Create `.env` file in Backend directory:
```env
# Database
MONGODB_URI=your_mongodb_connection_string
DB_NAME=learnloop

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 5. Database Seeding (Optional)
```bash
cd Backend
npm run seed:subjects
```

### 6. Start Development Servers

**Backend** (Terminal 1):
```bash
cd Backend
npm run dev
```

**Frontend** (Terminal 2):
```bash
cd Frontend
npm run dev
```

### 7. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: See `/Backend/docs/` directory

## 📚 API Documentation

### **Core API Endpoints**

#### Authentication & Users
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user profile
- `PUT /api/profile/update` - Update user profile

#### Mentorship System
- `GET /api/student/mentors/subject/:subjectId` - Find mentors for subject
- `POST /api/student/mentoring/request` - Send mentorship request
- `GET /api/student/mentoring/mentors` - Get current mentors
- `GET /api/student/mentoring/mentees` - Get current mentees
- `POST /api/mentor/relationship/end` - End mentorship relationship

#### Official Mentors
- `GET /api/student/official-mentors/available` - Browse professional mentors
- `POST /api/student/official-mentors/request` - Request professional mentor
- `GET /api/student/official-mentors/current` - Get current professional mentors

#### Rating System
- `POST /api/ratings/student-mentor` - Rate a student mentor
- `POST /api/ratings/official-mentor` - Rate a professional mentor
- `GET /api/ratings/given` - Get ratings given by user
- `GET /api/ratings/received` - Get ratings received by user
- `GET /api/ratings/pending` - Get pending ratings

#### Polling System
- `GET /api/polls/active` - Get active polls for user
- `POST /api/polls/vote` - Vote in a poll
- `GET /api/polls/results/:pollId` - Get poll results
- `POST /api/admin/polls/create` - Create new poll (Admin)

#### Real-time Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `DELETE /api/notifications/:id` - Delete notification

#### Chat & Messaging
- `GET /api/chat/conversations` - Get user conversations
- `POST /api/chat/send` - Send private message
- `GET /api/groupchat/messages` - Get group chat messages
- `POST /api/groupchat/send` - Send group message

For detailed API documentation, refer to the `/Backend/docs/` directory.

## 🔧 Development Guidelines

### **Backend Development**
- Follow MVC architecture pattern
- Use async/await for asynchronous operations
- Implement proper error handling with ApiError utility
- Maintain consistent API response format using ApiResponse
- Add authentication middleware for protected routes
- Document new endpoints in respective doc files

### **Frontend Development**
- Use functional components with React hooks
- Implement responsive design with Tailwind CSS
- Follow component-based architecture
- Use React Context for global state management
- Implement proper error boundaries
- Optimize performance with React.memo and useMemo where needed

### **Code Quality**
- Follow ESLint configuration for code consistency
- Use meaningful variable and function names
- Add comments for complex business logic
- Implement proper TypeScript types (where applicable)
- Write unit tests for critical functionality

## 📱 Key Features Deep Dive

### **Smart Mentorship Matching**
The platform uses an intelligent algorithm to match students with appropriate mentors based on:
- Academic year and subject proficiency
- Historical ratings and feedback
- Availability and response time
- Geographic and timezone considerations
- Special handling for 4th-year students (professional mentors only)

### **Real-Time Engagement**
- **Socket.IO Integration**: Instant notifications for mentorship requests, ratings, and system updates
- **Live Chat**: Real-time messaging between mentors and mentees
- **Group Discussions**: Subject-based group chats for collaborative learning
- **Presence Indicators**: Online/offline status for better communication

### **Democratic Learning Process**
- **Weekly Automated Polls**: System automatically creates polls for mentor selection
- **Community Voting**: Students democratically choose session leaders
- **Session Scheduling**: Poll winners organize educational sessions
- **Feedback Loop**: Continuous improvement based on session ratings

### **Comprehensive Analytics**
- **User Performance**: Track mentoring effectiveness and student progress
- **System Metrics**: Monitor platform usage and engagement
- **Rating Analytics**: Detailed insights into mentorship quality
- **Subject Proficiency**: Track academic strengths and improvements

## 🛠️ Advanced Configuration

### **MongoDB Indexing**
For optimal performance, create these indexes:
```javascript
// Users collection
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "role": 1, "isActive": 1 })

// Students collection
db.students.createIndex({ "user_id": 1 }, { unique: true })
db.students.createIndex({ "branch": 1, "currentYear": 1 })
db.students.createIndex({ "subjects.subject_id": 1, "subjects.proficiency": -1 })

// Mentors collection
db.mentors.createIndex({ "user_id": 1 }, { unique: true })
db.mentors.createIndex({ "designation": 1, "experience": -1 })
```

### **Socket.IO Configuration**
```javascript
// Custom socket configuration for scaling
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});
```

### **Cloudinary Optimization**
```javascript
// Image transformation settings
const uploadOptions = {
  folder: "learnloop",
  transformation: [
    { width: 300, height: 300, crop: "fill" },
    { quality: "auto", fetch_format: "auto" }
  ]
};
```

## 📈 Performance Optimization

### **Backend Optimizations**
- Database query optimization with proper indexing
- Pagination for large datasets
- Response compression with gzip
- Rate limiting for API endpoints
- Connection pooling for MongoDB
- Caching frequently accessed data

### **Frontend Optimizations**
- Code splitting with React.lazy
- Image optimization and lazy loading
- Bundle size optimization with Vite
- Component memoization for expensive renders
- Virtual scrolling for large lists
- Service worker for offline functionality

## 🔐 Security Features

### **Authentication & Authorization**
- JWT-based authentication with refresh tokens
- Role-based access control (Student, Mentor, Admin)
- Password hashing with bcryptjs
- Protected routes with authentication middleware
- CORS configuration for cross-origin requests

### **Data Protection**
- Input validation and sanitization
- SQL injection prevention with Mongoose
- XSS protection with content security policies
- Rate limiting to prevent abuse
- Secure file upload with type validation
- Environment variable protection

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:
- Code of conduct
- Development workflow
- Pull request process
- Issue reporting
- Feature requests

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Team for the amazing framework
- MongoDB for the flexible database solution
- Socket.IO for real-time communication capabilities
- Tailwind CSS for the utility-first CSS framework
- Three.js community for 3D graphics capabilities
- All contributors and beta testers

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/NIKSH02/LearnLoop/issues)
- **Discussions**: [GitHub Discussions](https://github.com/NIKSH02/LearnLoop/discussions)
- **Email**: [Support Email](mailto:support@learnloop.dev)
- **Documentation**: Check `/Backend/docs/` for detailed API documentation

---

**Built with ❤️ by the LearnLoop Team**

*Empowering education through intelligent mentorship connections*
