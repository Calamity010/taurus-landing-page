import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await (supabase as any)
        .from("contact_submissions")
        .insert([formData]);

      if (error) {
        throw error;
      } else {
        toast({
          title: "Message sent! 🎉",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", message: "" });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact-form" className="py-24 px-6 sm:px-8 bg-gradient-to-br from-background to-card relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 lightning-bg opacity-20" />
      <div className="absolute inset-0 circuit-pattern" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8">
            Get in
            <br />
            <span className="text-gradient-primary">Touch</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Have questions about TaurusAI? Want to learn more about our AI-powered job matching? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info Card */}
          <Card className="glass-effect neon-border overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <MessageSquare className="w-8 h-8" />
                Let's Connect
              </CardTitle>
              <p className="text-primary-foreground/80">Ready to revolutionize your job search?</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg neon-border">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Email Us</div>
                    <div className="text-sm text-muted-foreground">hello@thetaurus.ai</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg neon-border">
                  <Send className="w-6 h-6 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">Quick Response</div>
                    <div className="text-sm text-muted-foreground">We typically respond within 24 hours</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="glass-effect neon-border">
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-bold text-foreground">
                Send us a Message
              </CardTitle>
              <p className="text-muted-foreground">Fill out the form below and we'll get back to you soon</p>
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
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your inquiry..."
                    required
                    rows={5}
                    className="border-2 border-border focus:border-primary transition-colors bg-background text-foreground resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="hero"
                  className="w-full h-14 font-bold text-lg"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to our privacy policy and terms of service
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;