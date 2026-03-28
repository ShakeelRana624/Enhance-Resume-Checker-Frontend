import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ResumeCheckerPage from "./pages/ResumeChecker";
import ResumeBuilderPage from "./pages/ResumeBuilder";
import CoverLetterBuilderPage from "./pages/CoverLetterBuilder";
import PricingPage from "./pages/Pricing";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
        <Navbar />
        <Routes>
          <Route path="/" element={<ResumeCheckerPage />} />
          <Route path="/resume-builder" element={<ResumeBuilderPage />} />
          <Route path="/cover-letter-builder" element={<CoverLetterBuilderPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
