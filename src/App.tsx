import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureGrid from "./components/FeatureGrid";
import ContentSection from "./components/ContentSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <ContentSection />
      </main>
      <Footer />
    </div>
  );
}
