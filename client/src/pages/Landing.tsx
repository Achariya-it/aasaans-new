import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedCourses from "@/components/FeaturedCourses";
import SkillPointsExplainer from "@/components/SkillPointsExplainer";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <FeaturedCourses />
        <SkillPointsExplainer />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
