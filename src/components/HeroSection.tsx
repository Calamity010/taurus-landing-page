import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ContactModal from "@/components/ContactModal";
const taurusLogo = "/lovable-uploads/afc7e805-046b-4816-8295-f288a3cf97c0.png";
import robotJobSearch from "@/assets/robot-job-search.jpg";
const HeroSection = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; delay: number; left: number }>
  >([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      left: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  const handleLoginRedirect = () => {
    window.location.href = "https://portal.thetaurus.ai/login";
  };

  return (
    <>
      <section className="relative pt-20 pb-12 px-6 sm:px-8 overflow-hidden min-h-screen flex items-center">
        {/* Animated background particles */}
        <div className="particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Futuristic background effects */}
        <div className="absolute inset-0 lightning-bg opacity-30" />
        <div
          className="absolute inset-0 lightning-bg opacity-20"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 circuit-pattern" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-left">
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-shimmer mb-8 animate-fade-in-up leading-tight">
              AI Job Assistant
              <br />
              <span className="text-4xl sm:text-5xl lg:text-6xl">
                for Everyone
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-12 animate-fade-in-up max-w-2xl"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              Let our AI robot find the perfect job opportunities for you.
              Connect with top employers and advance your career with
              intelligent matching.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              <Button
                variant="hero"
                size="hero"
                className="hover:scale-110 transition-all duration-300"
                onClick={handleLoginRedirect}
              >
                Login to Get Started
              </Button>
            </div>

            {/* Trust indicators */}
            <div
              className="text-sm text-muted-foreground mb-3 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
            >
              Trusted by
            </div>

            {/* Company logos with floating animation */}
            <div
              className="flex flex-wrap gap-6 text-sm opacity-60 animate-fade-in-up"
              style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
            >
              {[
                "Google",
                "Microsoft",
                "Apple",
                "Meta",
                "Amazon",
                "Tesla",
                "Netflix",
              ].map((company, index) => (
                <div
                  key={company}
                  className={`text-muted-foreground font-medium hover:text-primary hover-glow transition-all duration-300 cursor-pointer ${
                    index % 3 === 0
                      ? "float-slow"
                      : index % 2 === 0
                      ? "float-medium"
                      : "float-fast"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Robot Image */}
          <div
            className="relative animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <div className="relative group">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden glass-effect neon-border">
                <img
                  src={robotJobSearch}
                  alt="AI Robot searching for jobs"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>

              {/* Floating UI elements around robot */}
              <div className="absolute -top-6 -right-6 bg-card/90 backdrop-blur-lg rounded-2xl p-4 neon-border float-medium">
                <div className="text-sm font-semibold text-foreground">
                  Jobs Found
                </div>
                <div className="text-2xl font-bold text-primary">2500</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card/90 backdrop-blur-lg rounded-2xl p-4 neon-border float-slow">
                <div className="text-sm font-semibold text-foreground">
                  Match Rate
                </div>
                <div className="text-2xl font-bold text-accent">94%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default HeroSection;
