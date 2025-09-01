import { Button } from "@/components/ui/button";

const CTASection = () => {
  const handleLoginRedirect = () => {
    window.location.href = "https://portal.thetaurus.ai/login";
  };
  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-effect neon-border rounded-3xl p-12 sm:p-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
            Ready to transform your career?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who are already using AI to build
            stronger connections and advance their careers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="hero"
              size="hero"
              className="w-full sm:w-auto"
              onClick={handleLoginRedirect}
            >
              Get started free
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            Free 14-day trial • No credit card required • Setup in 2 minutes
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
