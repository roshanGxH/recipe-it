import ReactDOM from 'react-dom/client';
import './index.css';
import React from 'react'
import App from './App.jsx'
import Home from "./pages/home/Home";
import ErrorPage from "./components/ErrorPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RecipeDetail from "./pages/recipes/RecipeDetail";
import AddRecipe from "./pages/recipes/AddRecipe";
import Blogs from "./pages/blogs/Blogs";
import AddBlog from "./pages/blogs/AddBlog";
import AiAgent from "./pages/ai/AiAgent";
import { AuthProvider } from "./context/AuthContext";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/recipes",
        element: <Home />
      },
      {
        path: "/recipes/:id",
        element: <RecipeDetail />
      },
      {
        path: "/recipes/new",
        element: <AddRecipe />
      },
      {
        path: "/resources",
        element: <Blogs />
      },
      {
        path: "/blogs/new",
        element: <AddBlog />
      },
      {
        path: "/ai-agent",
        element: <AiAgent />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);