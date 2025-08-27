# Kenya Civic Hub - MERN Stack Application

A comprehensive civic engagement platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and Tailwind CSS.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Real-time Updates**: Live data updates and notifications
- **Document Management**: Upload, manage, and share documents
- **Multi-language Support**: Built-in internationalization
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kenya-civic-hub
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp backend/config/env.example backend/.env
   
   # Edit the .env file with your configuration
   # MONGO_URI=your-mongodb-connection-string
   # JWT_SECRET=your-secret-key
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
kenya-civic-hub/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── env.example
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Document.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── documents.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
└── package.json
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/kenya-civic-hub
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

### MongoDB Setup

1. **Local MongoDB**
   ```bash
   # Install MongoDB locally
   # Start MongoDB service
   mongod
   ```

2. **MongoDB Atlas**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Update your `.env` file

## 🚀 Deployment

### Backend Deployment (Heroku)

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Add environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=your-mongodb-atlas-uri
   heroku config:set JWT_SECRET=your-secret-key
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables in Vercel dashboard**
   - `VITE_API_URL` - Your backend URL

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password

### Documents
- `GET /api/documents` - Get all documents
- `POST /api/documents` - Create document
- `GET /api/documents/:id` - Get document by ID
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

**Made with ❤️ by the Kenya Civic Hub Team** 
