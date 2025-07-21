# MERN Stack Capstone Project

## 📹 Demo Video

[![Watch the demo](https://img.youtube.com/vi/Dwl7BNTrsZI/0.jpg)](https://youtu.be/Dwl7BNTrsZI)

Or [click here to watch on YouTube](https://youtu.be/Dwl7BNTrsZI)

---

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application developed as a capstone project for the PLP MERN Stack Development course.

## 🚀 Project Overview
This project demonstrates a complete MERN stack application with user authentication, protected routes, and document management. It is designed to showcase skills in backend and frontend development, API integration, and secure user management.

## ✨ Features
- User registration and login (JWT authentication)
- Secure password hashing
- Protected dashboard and routes
- Document CRUD (Create, Read, Update, Delete)
- Responsive React frontend
- MongoDB Atlas or local MongoDB support

## 🗂️ Folder Structure
```
week-8-capstone_-Otigef/
  backend/           # Express.js + MongoDB API
    models/          # Mongoose models (User, Document)
    routes/          # Express routes (auth, documents, users)
    middleware/      # Custom middleware (auth)
    public/          # Static files
    app.js           # Main Express app
    config.env       # Backend environment variables
  frontend/          # React app
    src/             # React source code
      components/    # Reusable components
      pages/         # App pages (Login, Signup, Dashboard, etc.)
      context/       # React context (Auth)
    index.html       # Main HTML file
    package.json     # Frontend dependencies
  .gitignore         # Files/folders to ignore in git
  README.md          # Project documentation
  demo/              # Demo videos and assets
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository
```sh
git clone https://github.com/PLP-MERN-Stack-Development/week-8-capstone_-Otigef.git
cd week-8-capstone_-Otigef
```

### 2. Backend Setup
```sh
cd backend
npm install
# Copy and edit config.env with your MongoDB URI and JWT secret
cp config.env.example config.env
npm start
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```

### 4. Environment Variables
Create a `backend/config.env` file with:
```
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=3000
```

## 🌐 Usage
- Visit the frontend (default: http://localhost:5173 or http://localhost:5174)
- Register a new user
- Login to access the dashboard
- Manage documents

## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License
This project is for educational purposes as part of the PLP MERN Stack Development course.

---

**Happy coding!** 