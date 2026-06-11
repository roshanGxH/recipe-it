# Recipe-It - Frontend Client

This is the React + Vite frontend client for the **Recipe-It** application, a modern, feature-rich recipe sharing and culinary exploration platform.

## 🚀 Key Features

* **User Authentication:** Dynamic login and registration pages built with custom validation and global React `AuthContext` state management.
* **Explore Recipes:** Search, filter by category, and browse through recipes with visual preparation/cook times and serving details.
* **AI Culinary Agent:** 
  - Dynamic ingredient autocomplete input supporting colloquial Hindi synonyms (e.g., typing "tamatar" matches "Tomato", "baigan" matches "Eggplant").
  - Multi-tabbed cards showing recipe descriptions and timeline checklists for cooking steps.
* **Food Blogs:** Write and read blogs by culinary enthusiasts.
* **Premium Glassmorphic Design:** Smooth transitions, dark mode harmonies, hover micro-animations, and responsive layouts.

## 🛠️ Tech Stack

* **Core:** React 19, JavaScript (ES6+)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS & Vanilla CSS custom tokens
* **Routing:** React Router DOM (v7)
* **Icons:** React Icons (Io5, Lia)

## 💻 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## 📦 Build for Production

To compile the static React application:
```bash
npm run build
```
This generates the optimized production build files in the `dist` folder.
