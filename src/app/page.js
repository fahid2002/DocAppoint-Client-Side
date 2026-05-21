import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CarouselSection from "@/components/home/CarouselSection";
import SpecialtySection from "@/components/home/SpecialtySection";
import TopDoctors from "@/components/home/TopDoctors";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export const metadata = {
  title: "DocAppoint — Book Top Doctors in Bangladesh",
  description:
    "Browse BMDC-verified specialists, check real-time availability, and schedule your appointment in under 2 minutes.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="page-enter pt-[66px]">
        <HeroSection />
        <CarouselSection />
        <SpecialtySection />
        <TopDoctors />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}