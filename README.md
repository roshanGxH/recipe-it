# Recipe-It - Modern MERN Stack Culinary Platform

**Recipe-It** is a full-stack recipe discovery, blog sharing, and AI-powered culinary companion application. It features a complete Express + MongoDB backend and a responsive Vite + React frontend.

## 🌟 Key Features

* **AI Culinary Agent:** Input ingredients to get custom-generated recipes.
  - Supports search in Hindi synonyms (e.g. typing "tamatar" matches "Tomato").
  - Primary mode uses Google Gemini API to generate custom recipes.
  - Features a custom constraint fallback algorithm to filter local recipes to ensure at least a 70% star-ingredient match if Gemini is unavailable.
* **Interactive Explore Page:** Dynamic recipe discovery with keyword search and category filtering (breakfast, lunch, dinner, desserts, drinks).
* **Community Blogs:** Culinary blog creation and exploration.
* **Secure Session Auth:** JWT-based user login and registration routes with password hashing.

## 📂 Project Structure

```text
├── backend/            # Express.js Server
│   ├── config/         # MongoDB Mongoose configurations
│   ├── middleware/     # JWT authentication middleware
│   ├── models/         # User, Recipe, and Blog schemas
│   ├── routes/         # API endpoints (Auth, Recipes, Blogs, AI)
│   ├── seeds/          # Initial database seeding scripts
│   └── server.js       # Main server entry point
│
├── frontend/           # Vite + React Client
│   ├── public/         # Static assets (logo, icons)
│   ├── src/
│   │   ├── components/ # Navigation and shared UI layouts
│   │   ├── context/    # Global AuthContext provider
│   │   ├── pages/      # Home, Auth, AI Agent, Recipes, Blogs
│   │   └── App.jsx     # Route handling and application layout
│
└── vercel.json         # Vercel Monorepo deployment configurations
```

## ⚙️ Local Development Setup

### Prerequisite: Database Seeding
To get started with local data:
1. Create a `backend/.env` file with your connection strings (see `backend/.env` configuration).
2. Run the seed script inside the `backend` folder:
   ```bash
   cd backend
   npm install
   npm run seed
   ```

### Running the App
1. **Backend Server:**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```
2. **Frontend Client:**
   ```bash
   cd frontend
   npm run dev
   # Client runs on http://localhost:5173
   ```

## 🌐 Cloud Deployment (Vercel)

The application is configured to deploy directly to Vercel via the `vercel.json` routing configuration:
* All `/api/*` endpoints are routed to the Express serverless function.
* All static assets and pages are built, cached, and served statically.
