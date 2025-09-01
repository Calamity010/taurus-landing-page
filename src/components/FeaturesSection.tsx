import aiJobSwipe from "@/assets/ai-job-swipe.jpg";
import aiHrScreening from "@/assets/ai-hr-screening.jpg";
import aiResumeMatching from "@/assets/ai-resume-matching.jpg";
import aiNetworking from "@/assets/ai-networking.jpg";
import aiAnalytics from "@/assets/ai-analytics.jpg";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  const features = [
    {
      title: "Tinder-Style Job Portal",
      description:
        "Swipe left to reject, right to save, up to apply instantly. AI optimizes your CV for each application, cracking 99% of ATS systems with intelligent matching.",
      image: aiJobSwipe,
      highlight: "Smart Job Discovery",
      cta: "Join Job Portal",
      stats: [
        { value: "99%", label: "ATS Systems Cracked" },
        { value: "10x", label: "Faster Applications" },
        { value: "85%", label: "Job Match Accuracy" },
      ],
    },
    {
      title: "AI-Powered HR Portal",
      description:
        "End-to-end recruitment with AI screening, automated interviews, and instant feedback. Complete transparency from application to offer with enterprise-grade automation.",
      image: aiHrScreening,
      highlight: "Intelligent Hiring",
      cta: "Contact for Pricing",
      stats: [
        { value: "$0.80", label: "per interview" },
        { value: "∞", label: "Concurrent interviews" },
        { value: "88%", label: "Candidate satisfaction" },
      ],
    },
    {
      title: "Intelligent CV Optimization & EdTech",
      description:
        "Real-time job matching with skills gap analysis and personalized upskilling recommendations. Auto-apply to perfect matches with integrated learning paths.",
      image: aiResumeMatching,
      highlight: "Career Enhancement",
      cta: "Get Early Access",
      stats: [
        { value: "24/7", label: "Auto-Apply Active" },
        { value: "100+", label: "Skill Assessments" },
        { value: "95%", label: "Upskilling Success" },
      ],
    },
    {
      title: "Taurus Connectify - Professional Networking",
      description:
        "Follow and interact with professionals from all backgrounds. Connect with candidates who recently applied to your target roles for direct feedback and insights. AI-powered mentorship matching.",
      image: aiNetworking,
      highlight: "Smart Networking",
      cta: "Join Community",
      stats: [
        { value: "50K+", label: "Active Professionals" },
        { value: "95%", label: "Successful Connections" },
        { value: "24/7", label: "AI Recommendations" },
      ],
    },
    {
      title: "Community & Achievement Showcase",
      description:
        "Chat and send messages with your network. Showcase achievements like LinkedIn to attract like-minded professionals. Create communities and get mentorship from HRs, employers, and industry leaders.",
      image: aiAnalytics,
      highlight: "Professional Community",
      cta: "Build Network",
      stats: [
        { value: "1000+", label: "Industry Mentors" },
        { value: "200+", label: "Communities" },
        { value: "90%", label: "Mentor Match Rate" },
      ],
    },
  ];

  const handleLoginRedirect = () => {
    window.location.href = "https://portal.thetaurus.ai/login";
  };

  return (
    <section
      id="features"
      className="py-32 px-6 sm:px-8 bg-background relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 lightning-bg opacity-5" />
      <div className="absolute top-20 left-10 w-32 h-32 border border-gray-200 rounded-full float-slow opacity-20" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gray-100 rounded-lg float-medium opacity-15" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
          <div
            className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            FEATURES
          </div>
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-shimmer mb-8 leading-none">
            The Future of
            <br />
            <span className="text-gray-900">Job Hunting</span>
          </h2>
          <p
            className="text-2xl text-muted-foreground leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Revolutionary AI-powered job portal with Tinder-style matching,
            automated applications, and intelligent hiring
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-fade-in-up ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
              style={{ animationDelay: `${0.6 + index * 0.2}s` }}
            >
              {/* Image */}
              <div
                className={`${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                } relative group`}
              >
                <div className="aspect-video rounded-3xl overflow-hidden shadow-large hover:shadow-xl transition-all duration-500 electric-border">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                {/* Floating elements around image */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-gray-300 rounded-full float-fast opacity-40" />
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gray-200 rounded-lg float-slow opacity-30" />
              </div>

              {/* Content */}
              <div
                className={`${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                } space-y-8`}
              >
                <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 pulse-glow">
                  {feature.highlight}
                </div>

                <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-none">
                  {feature.title}
                </h3>

                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-lg mb-8">
                  {feature.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {feature.stats.map((stat, statIndex) => (
                    <div
                      key={statIndex}
                      className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="electric-border"
                  onClick={handleLoginRedirect}
                >
                  {feature.cta}
                </Button>

                {/* Decorative elements */}
                <div className="flex space-x-4 pt-6">
                  <div className="w-16 h-1 bg-gray-900 rounded-full" />
                  <div className="w-8 h-1 bg-gray-400 rounded-full" />
                  <div className="w-4 h-1 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Section */}
        <div
          className="text-center mt-32 animate-fade-in-up"
          style={{ animationDelay: "1.4s" }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-12 sm:p-16 text-white">
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to revolutionize your hiring?
            </h3>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of companies and professionals already using Taurus
              AI for smarter, faster, and more effective recruitment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="hero"
                size="hero"
                className="w-full sm:w-auto"
                onClick={handleLoginRedirect}
              >
                Start Free Pilot
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-300">
              Free 14-day trial • No credit card required • Setup in 2 minutes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
