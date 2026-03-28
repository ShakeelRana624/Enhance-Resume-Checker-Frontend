import Hero from "../components/Hero";
import FeatureGrid from "../components/FeatureGrid";
import ContentSection from "../components/ContentSection";

export default function ResumeCheckerPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
      <main>
        <Hero />
        <FeatureGrid />
        <ContentSection />
      </main>
    </div>
  );
}
