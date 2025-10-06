
import Hero from "@/components/LandingPage/hero-section";
import BakeryContent from "@/components/LandingPage/BakeryContent";
import Footer from "@/components/LandingPage/footer";
export default function LandingPage() {

  return (
    <div className="bg-[#FAFAFC] py-8">
      {/* Hero Section */}
      <Hero />
      <BakeryContent />
      <Footer />

    </div>
  );
}