import { Button } from "@/components/ui/button";
import { useState } from "react";
const taurusLogo = "/lovable-uploads/afc7e805-046b-4816-8295-f288a3cf97c0.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginRedirect = () => {
    window.location.href = "https://portal.thetaurus.ai/login";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent p-0.5 neon-border">
              <img
                src={taurusLogo}
                alt="Taurus AI"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <div className="text-2xl font-bold text-foreground">
              Taurus<span className="text-primary">AI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-primary hover-glow transition-colors"
            >
              Features
            </a>
            <Button variant="hero" size="sm" onClick={handleLoginRedirect}>
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-muted-foreground hover:text-primary hover-glow transition-colors"
              >
                Features
              </a>
              <div className="flex flex-col space-y-3 pt-4">
                <Button variant="hero" size="sm" onClick={handleLoginRedirect}>
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
