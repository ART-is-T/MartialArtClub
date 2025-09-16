import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Страницы
import LandingPage from "./components/LandingPage";
import TrainerPage from "./components/TrainerPage";
import MartialArtPage from "./components/MartialArtPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SchedulePage from "./components/SchedulePage";
import ProfilePage from "./components/ProfilePage";
import AdminTrainersPage from "./components/admin/AdminTrainersPage";
import AdminMartialArtsPage from "./components/admin/AdminMartialArtsPage";

// Общие элементы
import NavBar from "./components/sections/NavBar";
import Footer from "./components/sections/Footer";
import PageWrapper from "./components/PageWrapper";
import ProtectedRoute from "./components/ProtectedRoute";

function AnimatedRoutes({ isAuth, setIsAuth, logout }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<PageWrapper><LandingPage /></PageWrapper>}
        />
        <Route
          path="/trainer/:slug"
          element={<PageWrapper><TrainerPage /></PageWrapper>}
        />
        <Route
          path="/martial-art/:slug"
          element={<PageWrapper><MartialArtPage /></PageWrapper>}
        />
        <Route
          path="/login"
          element={<PageWrapper><LoginForm onLogin={() => setIsAuth(true)} /></PageWrapper>}
        />
        <Route
          path="/register"
          element={<PageWrapper><RegisterForm /></PageWrapper>}
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <PageWrapper><SchedulePage /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <PageWrapper><ProfilePage /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trainers"
          element={
            <ProtectedRoute>
              <PageWrapper><AdminTrainersPage /></PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/martial-arts"
          element={
            <ProtectedRoute>
              <PageWrapper><AdminMartialArtsPage /></PageWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="app-wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <NavBar logout={logout} isAuth={isAuth} />

        {/* Контент */}
        <div
          className="app-content"
          style={{
            flex: "1 0 auto",
            paddingTop: "60px"   // 👈 добавляем отступ под AppBar
          }}
        >
          <AnimatedRoutes isAuth={isAuth} setIsAuth={setIsAuth} logout={logout} />
        </div>

        {/* Футер */}
        <div style={{ flexShrink: 0 }}>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;