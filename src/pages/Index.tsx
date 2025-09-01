import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SwipeableJobCards from "@/components/SwipeableJobCards";
import LoginSection from "@/components/LoginSection";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <SwipeableJobCards />
        <LoginSection />
        <ContactForm />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
