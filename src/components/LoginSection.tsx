import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Shield, Zap, Users } from "lucide-react";

const LoginSection = () => {
  const handleLoginRedirect = () => {
    window.location.href = "https://portal.thetaurus.ai/login";
  };
  return (
    <section
      id="login-section"
      className="py-24 px-6 sm:px-8 bg-gradient-to-br from-background via-card to-background relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 lightning-bg opacity-20" />
      <div className="absolute inset-0 circuit-pattern" />
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/30 rounded-full float-slow neon-border" />
      <div
        className="absolute bottom-20 right-10 w-24 h-24 bg-accent/20 rounded-lg rotate-45 float-medium"
        style={{ boxShadow: "var(--shadow-pink)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8">
            Ready to Start?
            <br />
            <span className="text-gradient-primary">Login Now</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Access your personalized AI job assistant and start discovering
            opportunities tailored just for you.
          </p>

          {/* Main Login Button */}
          <div className="mb-16">
            <Button
              variant="hero"
              size="hero"
              onClick={handleLoginRedirect}
              className="hover:scale-110 transition-all duration-500 animate-pulse-glow group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <LogIn className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10 text-xl font-bold">
                Login to TaurusAI
              </span>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-effect neon-border hover:scale-105 transition-all duration-300 group">
            <CardHeader className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">
                Instant Matching
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-muted-foreground text-center">
                AI-powered job matching that finds opportunities based on your
                skills, experience, and career goals.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect neon-border hover:scale-105 transition-all duration-300 group">
            <CardHeader className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">
                Secure Platform
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-muted-foreground text-center">
                Your data is protected with enterprise-grade security.
                Privacy-first approach to professional networking.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect neon-border hover:scale-105 transition-all duration-300 group">
            <CardHeader className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">
                Global Network
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-muted-foreground text-center">
                Connect with top employers worldwide. Access exclusive
                opportunities from leading companies.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Actions */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            New to TaurusAI?{" "}
            <span className="text-primary font-semibold">
              Create an account
            </span>{" "}
            and join thousands of professionals finding their dream jobs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-all duration-300"
            >
              Learn More About Features
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="hover:scale-105 transition-all duration-300"
            >
              Watch Demo Video
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
