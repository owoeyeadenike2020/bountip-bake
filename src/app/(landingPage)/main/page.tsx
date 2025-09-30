// src/app/(landing)/page.tsx
// import Hero from "@/components/landing/hero";
// import ProductGrid from "@/components/landing/product-grid";
// import CategoryTabs from "@/components/landing/category-tabs";
// import ContactForm from "@/components/landing/contact-form";
// import Image from "next/image";
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