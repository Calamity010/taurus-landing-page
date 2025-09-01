import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, Send, User, Mail, Building, MessageSquare } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Demo request sent!",
        description: "We'll get back to you within 24 hours to schedule your personalized demo.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white border-0 shadow-2xl p-0 overflow-hidden">
        <div className="relative">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold mb-2">
                Request Your Demo
              </DialogTitle>
              <DialogDescription className="text-gray-200 text-lg">
                See how Taurus AI can transform your networking experience
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Form content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-2 border-gray-200 focus:border-gray-900 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-2 border-gray-200 focus:border-gray-900 transition-colors"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>

            {/* Company Field */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company (Optional)
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="h-12 border-2 border-gray-200 focus:border-gray-900 transition-colors"
                placeholder="Your company name"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Tell us about your networking goals
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="border-2 border-gray-200 focus:border-gray-900 transition-colors resize-none"
                placeholder="What challenges are you facing with professional networking? What would you like to see in the demo?"
              />
            </div>

            {/* Benefits list */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">What you'll get in your demo:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                  Personalized AI networking recommendations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                  Live demonstration of smart matching algorithms
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                  Q&A session with our networking experts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                  Custom strategy for your career goals
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-gray-900 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending Request...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Schedule My Demo
                </div>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;