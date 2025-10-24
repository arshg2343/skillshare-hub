# SkillShare Hub - MERN Stack Application

A full-stack web application built with the MERN stack (MongoDB, Express, React.js, Node.js) that allows users to host and join skill-based workshops.

**Created by:** Arsh Gupta (Roll Number: 10197)

## Project Overview

SkillShare Hub is a community-driven platform designed to connect learners and instructors. Users can create workshops to share their expertise in various domains and join workshops hosted by others to learn new skills. The platform emphasizes accessibility, ease of use, and community engagement.

## Features

### Core Features
- **User Authentication**: Secure signup/login with JWT tokens and bcrypt password hashing
- **Workshop Management**: Create, read, update, and delete workshops
- **Workshop Discovery**: Browse and filter workshops by category and search terms
- **Participant Management**: Join/leave workshops with capacity tracking
- **User Dashboard**: View created and joined workshops in one place
- **Category Filtering**: Workshops organized by categories (coding, design, photography, writing, music, other)
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS

### Advanced Features
- **Real-time Participant Tracking**: See live participant count and capacity status
- **Workshop Status Management**: Track workshop approval status (pending, approved, rejected)
- **User Role Management**: Support for different user roles (user, admin)
- **Protected Routes**: Secure API endpoints with authentication middleware
- **Input Validation**: Comprehensive validation on both frontend and backend
- **Error Handling**: Graceful error handling with meaningful error messages

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Minimalist web framework for building REST APIs
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling and validation
- **JWT (JSON Web Tokens)** - Stateless authentication mechanism
- **bcryptjs** - Password hashing and encryption
- **CORS** - Cross-origin resource sharing for frontend-backend communication
- **dotenv** - Environment variable management

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **React Router** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Context API** - React's built-in state management solution
- **Fetch API** - Modern HTTP client for API requests
- **JavaScript (ES6+)** - Modern JavaScript features and syntax

### Development & Deployment
- **npm** - Package manager for dependencies
- **Render** - Cloud platform for deploying both frontend and backend
- **MongoDB Atlas** - Cloud-hosted MongoDB database
- **GitHub** - Version control and repository hosting

## Project Structure

\`\`\`
skillshare-hub/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── Navbar.js
│   │   │   └── WorkshopCard.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   ├── CreateWorkshop.js
│   │   │   ├── EditWorkshop.js
│   │   │   └── WorkshopDetail.js
│   │   ├── context/        # React Context for state management
│   │   │   └── AuthContext.js
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── useAuth.js
│   │   ├── App.js          # Main application component
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   ├── public/             # Static files and assets
│   ├── package.json        # Frontend dependencies
│   └── .env.example        # Environment variables template
│
└── server/                 # Express backend application
    ├── models/             # MongoDB Mongoose schemas
    │   ├── User.js
    │   └── Workshop.js
    ├── routes/             # API route definitions
    │   ├── auth.js
    │   └── workshops.js
    ├── controllers/        # Route handler logic
    │   ├── authController.js
    │   └── workshopController.js
    ├── middleware/         # Custom middleware functions
    │   └── auth.js
    ├── config/             # Configuration files
    │   └── db.js
    ├── server.js           # Express server entry point
    ├── package.json        # Backend dependencies
    └── .env.example        # Environment variables template
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
\`\`\`bash
cd server
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file based on \`.env.example\`:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update \`.env\` with your MongoDB URI and JWT secret:
\`\`\`
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillshare-hub
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
PORT=5000
\`\`\`

5. Start the server:
\`\`\`bash
npm start
# or for development with auto-reload
npm run dev
\`\`\`

The backend will run on \`http://localhost:5000\`

### Frontend Setup

1. Navigate to the client directory:
\`\`\`bash
cd client
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file based on \`.env.example\`:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update \`.env\` with your API URL:
\`\`\`
REACT_APP_API_URL=http://localhost:5000
\`\`\`

5. Start the development server:
\`\`\`bash
npm start
\`\`\`

The frontend will run on \`http://localhost:3000\`

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register a new user
- \`POST /api/auth/login\` - Login user
- \`GET /api/auth/me\` - Get current user (protected)

### Workshops
- \`GET /api/workshops\` - Get all approved workshops (with optional filters)
- \`GET /api/workshops/:id\` - Get workshop details
- \`POST /api/workshops\` - Create new workshop (protected)
- \`PUT /api/workshops/:id\` - Update workshop (protected, creator only)
- \`DELETE /api/workshops/:id\` - Delete workshop (protected, creator only)
- \`POST /api/workshops/:id/join\` - Join a workshop (protected)
- \`POST /api/workshops/:id/leave\` - Leave a workshop (protected)

## Database Schema

### User Model
\`\`\`javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (default: "user"),
  createdWorkshops: [ObjectId],
  joinedWorkshops: [ObjectId],
  timestamps: true
}
\`\`\`

### Workshop Model
\`\`\`javascript
{
  title: String,
  description: String,
  category: String (enum: coding, design, photography, writing, music, other),
  date: Date,
  capacity: Number,
  imageURL: String,
  creator: ObjectId (ref: User),
  participants: [ObjectId] (ref: User),
  status: String (enum: pending, approved, rejected),
  timestamps: true
}
\`\`\`

## Deployment

### Deploy Backend to Render

1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set environment variables:
   - \`MONGO_URI\` - Your MongoDB Atlas connection string
   - \`JWT_SECRET\` - Your JWT secret key
   - \`NODE_ENV\` - Set to "production"
6. Deploy

### Deploy Frontend to Render

1. Go to [Render.com](https://render.com)
2. Create a new Static Site
3. Connect your GitHub repository
4. Set build command: \`npm run build\`
5. Set publish directory: \`build\`
6. Add environment variable:
   - \`REACT_APP_API_URL\` - Your deployed backend URL
7. Deploy

### Alternative: Deploy to Vercel

**Frontend:**
1. Push code to GitHub
2. Import project in Vercel
3. Set \`REACT_APP_API_URL\` environment variable
4. Deploy

**Backend:**
- Render is recommended for Node.js backend
- Alternatively, use Railway or Heroku

## Usage

1. **Sign Up**: Create a new account with name, email, and password
2. **Browse Workshops**: View all available workshops on the home page
3. **Filter Workshops**: Use category filters and search to find workshops
4. **View Details**: Click on a workshop to see full details and participant list
5. **Join Workshop**: Click "Join Workshop" to become a participant
6. **Create Workshop**: Go to dashboard and click "Create New Workshop"
7. **Manage Workshops**: Edit or delete your created workshops from the dashboard
8. **View Dashboard**: See all your created and joined workshops in one place

## Security Features

- JWT-based authentication with token expiration
- Password hashing with bcryptjs for secure storage
- Protected API routes with authentication middleware
- CORS configuration for secure cross-origin requests
- Input validation on both frontend and backend
- Authorization checks for workshop management (creator-only operations)
- Secure session management with HTTP-only cookies

## Future Enhancements

- Email verification for signup
- Workshop ratings and reviews
- Real-time notifications
- Payment integration for premium workshops
- Admin panel for workshop approval
- Workshop scheduling and reminders
- User profiles with bio and expertise
- Workshop certificates upon completion
- Video integration for live workshops
- Workshop attendance tracking

## Contributing

Feel free to fork this project and submit pull requests for any improvements. Contributions are welcome!

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Project Created By:** Arsh Gupta  
**Roll Number:** 10197  
**Last Updated:** October 2025
