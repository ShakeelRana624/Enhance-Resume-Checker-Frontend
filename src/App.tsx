import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ResumeCheckerPage from "./pages/ResumeChecker";
import ResumeBuilderPage from "./pages/ResumeBuilder";
import CoverLetterBuilderPage from "./pages/CoverLetterBuilder";
import PricingPage from "./pages/Pricing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Analysis from "./pages/Analysis";
import { AuthProvider } from "./contexts/AuthContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white font-sans selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
          <Navbar />
          <Routes>
            <Route path="/" element={<ResumeCheckerPage />} />
            <Route path="/resume-builder" element={<ResumeBuilderPage />} />
            <Route path="/cover-letter-builder" element={<CoverLetterBuilderPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
