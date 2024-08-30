import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Team from "@/components/Team";
import TravelPlannerTestimonials from "@/components/TestimonialCards";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <WhyChooseUs />
      <TravelPlannerTestimonials />
      <Team />
      <Footer />
    </main>
  );
}
