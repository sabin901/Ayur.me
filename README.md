# Ayur.me - Personalized Ayurvedic Wellness Platform

A professional-grade, modern web application that bridges classical Ayurvedic wisdom with data-driven health tracking. 

**Live Frontend Demo:** [ayurme.vercel.app](https://ayurme.vercel.app/)

---

## 🌟 Platform Scope & Features

This platform is designed to be a comprehensive HealthTech ecosystem, operating on three core pillars: **Track, Analyze, Balance**.

### 1. Clinical-Grade Health Dashboard
- **Evident Battery-Inspired Architecture:** A 3-step actionable diagnostic UI.
- **Smart Wellness Tracking:** Users log Yoga, Diet, and Meditation activities.
- **AI-Powered Diagnostics:** The system analyzes 14-day habits and provides immediate, actionable feedback on Dosha imbalances.
- **Dynamic Charting:** Radar, Pie, and Area charts visualize the user's progress and energetic focus (Vata, Pitta, Kapha).

### 2. Deep Knowledge Hub
- **Disease Database:** 500+ conditions mapped to Ayurvedic treatments and herbs. Uses Europe PMC for dynamic clinical research validation.
- **Interactive 3D WebGL Marma Engine:** A state-of-the-art interactive 3D model (built with React Three Fiber) replacing legacy 2D SVG maps for exploring Ayurvedic anatomy.
- **Personalized Yoga & Recipe Libraries:** Content automatically filters based on the user's assessed primary Dosha (requires user authentication).

### 3. Full-Stack Infrastructure
- **Dosha Quiz Engine:** 22-question assessment with weighted scoring.
- **Node/Express API:** Robust backend with rate-limiting, error handling, and MongoDB integration.
- **JWT Authentication:** Secure user registration, login, and saved assessment profiles.

---

## 🚀 Quick Start (Local Development)

The platform is designed to fall back gracefully if no database is connected, utilizing mock data and local storage for demonstration purposes.

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cd backend && npm run setup:secrets   # This creates a .env with your JWT_SECRET
cd ..

# 3. Start the development servers
npm run dev
```

*   **Frontend:** `http://localhost:8080`
*   **Backend API:** `http://localhost:5002`

---

## 📦 Deployment Instructions

### Frontend (Vercel / Netlify)
1. Connect your GitHub repository to Vercel.
2. **Framework Preset:** Vite
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Environment Variables:** Set `VITE_API_URL` to your production backend URL (e.g., `https://api.ayur.me`).

### Backend (Render / Railway)
1. Deploy the `backend/` folder to a Node.js hosting provider.
2. Set the following **Environment Variables**:
   *   `MONGODB_URI` — Required for auth, contact forms, and saved assessments.
   *   `JWT_SECRET` — Required for authentication sessions.
   *   `FRONTEND_URL` — Your deployed Vercel frontend URL (for CORS).
   *   `NODE_ENV` — `production`

---

## 🛠️ Tech Stack
*   **Frontend:** React 18, TypeScript, Vite, TailwindCSS, Framer Motion, Recharts, React Three Fiber (WebGL).
*   **Backend:** Node.js, Express, MongoDB (Mongoose), bcrypt, JSON Web Tokens.
*   **Architecture:** Clean API routing, custom React hooks (`useProgress`), Context API state management (`AuthProvider`).

---

## 🔒 Security Notes
- Never commit `.env` files.
- The `dist/` and `node_modules/` folders are ignored.
- The backend utilizes `helmet` and `express-rate-limit` to prevent basic DDoS and XSS attacks. 

---

## 📄 License
MIT. See [LICENSE](LICENSE).

**Disclaimer:** This tool is for educational purposes only and does not constitute medical advice. Consult a healthcare provider for any health decisions.
