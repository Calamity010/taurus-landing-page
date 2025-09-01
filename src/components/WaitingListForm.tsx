import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Clock, Users, Sparkles } from "lucide-react";

const WaitingListForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [waitingListCount, setWaitingListCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { toast } = useToast();

  // Launch date: September 15th, 2025
  const launchDate = new Date("2025-09-15T00:00:00");

  useEffect(() => {
    // Update countdown every second
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  useEffect(() => {
    // Fetch waiting list count
    const fetchCount = async () => {
      const { count } = await supabase
        .from("waiting_list")
        .select("*", { count: "exact", head: true });
      setWaitingListCount(count || 0);
    };

    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("waiting_list")
        .insert([formData]);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already registered!",
            description: "This email is already on our waiting list.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success! 🎉",
          description: "You're now on the waiting list for early access!",
        });
        setFormData({ name: "", email: "", phone_number: "" });
        setWaitingListCount(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="waiting-list-form" className="py-24 px-6 sm:px-8 bg-gradient-to-br from-background to-card relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 lightning-bg opacity-20" />
      <div className="absolute inset-0 circuit-pattern" />
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/30 rounded-full float-slow neon-border" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/20 rounded-lg rotate-45 float-medium" style={{ boxShadow: 'var(--shadow-pink)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Launch Countdown */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-lg rounded-full neon-border mb-8">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-foreground">Launching September 15th, 2025</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8">
            Get Early
            <br />
            <span className="text-gradient-primary">Access</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join the waiting list and be among the first to experience AI-powered job matching
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <Card key={item.label} className={`glass-effect neon-border hover:scale-105 transition-all duration-300 ${
                index % 2 === 0 ? 'float-slow' : 'float-medium'
              }`}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats Card */}
          <Card className="glass-effect neon-border overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Users className="w-8 h-8" />
                Join the Waiting List
              </CardTitle>
              <p className="text-primary-foreground/80">Be the first to access TaurusAI</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-foreground mb-2">302,200</div>
                <div className="text-muted-foreground">people waiting</div>
                <div className="w-full bg-muted/50 rounded-full h-3 mt-4">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((302200 / 350000) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  47,800 spots left for early access
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg neon-border">
                  <Clock className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Early Access</div>
                    <div className="text-sm text-muted-foreground">Get access 30 days before public launch</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg neon-border">
                  <Sparkles className="w-6 h-6 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">Exclusive Features</div>
                    <div className="text-sm text-muted-foreground">Access to premium AI matching features</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="glass-effect neon-border">
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-bold text-foreground">
                Reserve Your Spot
              </CardTitle>
              <p className="text-muted-foreground">Enter your details to join the waiting list</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="h-12 border-2 border-border focus:border-primary transition-colors bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="h-12 border-2 border-border focus:border-primary transition-colors bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    className="h-12 border-2 border-border focus:border-primary transition-colors bg-background text-foreground"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="hero"
                  className="w-full h-14 font-bold text-lg"
                >
                  {isLoading ? "Joining..." : "Join Waiting List"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By joining, you agree to receive updates about TaurusAI launch
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WaitingListForm;