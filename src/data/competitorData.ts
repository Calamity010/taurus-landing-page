
export interface ComparisonFeature {
  feature: string;
  taurus: string | boolean;
  competitor: string | boolean;
}

export interface CompetitorData {
  name: string;
  description: string;
  features: ComparisonFeature[];
}

export const defaultFeatures: ComparisonFeature[] = [
  { feature: "AI Model Accuracy", taurus: "99%", competitor: "75%" },
  { feature: "Live Proctoring Params", taurus: "10+", competitor: "3-5" },
  { feature: "Setup Time", taurus: "2 Minutes", competitor: "1-2 Weeks" },
  { feature: "Pricing Model", taurus: "Pay Per Interview", competitor: "Subscription / Seat" },
  { feature: "Resume Parsing", taurus: true, competitor: true },
  { feature: "AI Voice Agents", taurus: true, competitor: false },
  { feature: "Customizable Avatar", taurus: true, competitor: false },
  { feature: "Cheating Detection", taurus: "Advanced Computer Vision", competitor: "Basic Browser Lock" },
];

export const competitors: Record<string, CompetitorData> = {
  "babblebots": {
    name: "Babblebots",
    description: "Compare Taurus AI against Babblebots to see why we are the superior choice for recruitment automation.",
    features: [
      { feature: "AI Model Accuracy", taurus: "99%", competitor: "85%" },
      { feature: "Conversational AI", taurus: true, competitor: true },
      { feature: "Setup Time", taurus: "2 Minutes", competitor: "3-5 Days" },
      { feature: "Pricing Model", taurus: "Pay Per Interview", competitor: "Subscription" },
      { feature: "Customizable Avatar", taurus: true, competitor: false },
      { feature: "Cheating Detection", taurus: "Advanced Computer Vision", competitor: "Audio Only" },
      { feature: "Multi-modal Analysis", taurus: true, competitor: false },
      { feature: "Global Dialect Support", taurus: "100+ Languages", competitor: "Limited" },
    ]
  },
  "micro1": {
    name: "Micro1",
    description: "See how Taurus AI outperforms Micro1 in technical vetting and overall hiring efficiency.",
    features: [
      { feature: "AI Model Accuracy", taurus: "99%", competitor: "90%" },
      { feature: "Focus Area", taurus: "All Roles", competitor: "Engineers Only" },
      { feature: "Setup Time", taurus: "2 Minutes", competitor: "24-48 Hours" },
      { feature: "Pricing Model", taurus: "Pay Per Interview", competitor: "High Flat Fee" },
      { feature: "Custom Branding", taurus: true, competitor: false },
      { feature: "ATS Integration", taurus: "Seamless", competitor: "Limited" },
      { feature: "Candidate Experience", taurus: "Interactive Avatar", competitor: "Text/Code Focus" },
      { feature: "Cheating Detection", taurus: "Advanced Computer Vision", competitor: "Standard" },
    ]
  },
  "mindely": {
    name: "Mindely",
    description: "Discover why Taurus AI is the preferred alternative to Mindely for modern HR teams.",
    features: [
       { feature: "AI Model Accuracy", taurus: "99%", competitor: "80%" },
       { feature: "Setup Time", taurus: "2 Minutes", competitor: "1 Week" },
       { feature: "Video Interviews", taurus: true, competitor: true },
       { feature: "Cognitive Assessment", taurus: true, competitor: "Basic" },
       { feature: "Customizable Avatar", taurus: true, competitor: false },
       { feature: "Pricing Flexibility", taurus: "High", competitor: "Low" },
       { feature: "Analytics Depth", taurus: "Deep Insights", competitor: "Standard Reports" },
       { feature: "API Access", taurus: "Full", competitor: "Restricted" },
    ]
  },
  "apriora": {
    name: "Apriora",
    description: "Compare features and pricing: Taurus AI vs Apriora. Make the smarter hiring decision.",
    features: [
      { feature: "AI Model Accuracy", taurus: "99%", competitor: "88%" },
      { feature: "Real-time Feedback", taurus: true, competitor: true },
      { feature: "Setup Time", taurus: "2 Minutes", competitor: "Days" },
      { feature: "Pricing Model", taurus: "Pay Per Interview", competitor: "Contract Based" },
      { feature: "Avatar Realism", taurus: "Photorealistic", competitor: "Animated/Basic" },
      { feature: "Cheating Detection", taurus: "Military Grade", competitor: "Standard" },
      { feature: "Interview Types", taurus: "All Formats", competitor: "Video Focus" },
      { feature: "Support SLA", taurus: "24/7", competitor: "Business Hours" },
    ]
  },
  "sapia": {
    name: "Sapia.ai",
    description: "Taurus AI vs Sapia.ai: Why voice and video AI outperforms chat-based screening.",
    features: [
      { feature: "Interaction Type", taurus: "Voice & Video", competitor: "Text/Chat Focus" },
      { feature: "AI Model Accuracy", taurus: "99%", competitor: "85%" },
      { feature: "Candidate Verification", taurus: "Face ID & Voice", competitor: "Text Analysis" },
      { feature: "Setup Time", taurus: "2 Minutes", competitor: "2 Weeks" },
      { feature: "Cheating Detection", taurus: "Full Proctoring", competitor: "Plagiarism Check" },
      { feature: "Interview Depth", taurus: "Deep Technical", competitor: "Behavioral" },
      { feature: "Customizable Avatar", taurus: true, competitor: false },
      { feature: "Global Reach", taurus: "Any Language", competitor: "Text Only" },
    ]
  },
  "upscreen": {
    name: "Upscreen",
    description: "Why switch from Upscreen to Taurus AI? Better AI, fairer pricing, and faster results.",
    features: [
      { feature: "AI Accuracy", taurus: "99%", competitor: "78%" },
      { feature: "Setup Time", taurus: "2 Minutes", competitor: "Self-Service" },
      { feature: "Question Bank", taurus: "Dynamic Generation", competitor: "Static Library" },
      { feature: "Customizable Avatar", taurus: true, competitor: false },
      { feature: "Pricing", taurus: "Flexible", competitor: "Fixed Tiers" },
      { feature: "Anti-Cheating", taurus: "Advanced", competitor: "Basic" },
      { feature: "Integration", taurus: "One-Click", competitor: "Manual" },
      { feature: "Support", taurus: "Dedicated", competitor: "Email Only" },
    ]
  },
  "fairgo": {
    name: "Fairgo",
    description: "Taurus AI vs Fairgo: Achieve unbiased hiring with superior technology and user experience.",
    features: [
      { feature: "Bias Elimination", taurus: "Native Core", competitor: "Add-on" },
      { feature: "AI Accuracy", taurus: "99%", competitor: "82%" },
      { feature: "Setup Time", taurus: "2 Minutes", competitor: "Consultation Req." },
      { feature: "Interview Formats", taurus: "Coding, Video, Voice", competitor: "Structured Video" },
      { feature: "Customizable Avatar", taurus: true, competitor: false },
      { feature: "Cheating Detection", taurus: "Comprehensive", competitor: "Standard" },
      { feature: "Analytics", taurus: "Predictive", competitor: "Descriptive" },
      { feature: "Pricing", taurus: "Pay Per Use", competitor: "Subscription" },
    ]
  },
  "evalgator": {
    name: "Evalgator",
    description: "Taurus AI provides a more modern, AI-first alternative to Evalgator's assessment platform.",
    features: [
      { feature: "Technology Core", taurus: "Generative AI", competitor: "Traditional Logic" },
      { feature: "Question Adaptability", taurus: "Real-time", competitor: "Pre-set" },
      { feature: "Setup Time", taurus: "2 Minutes", competitor: "Hours" },
      { feature: "Candidate Experience", taurus: "Conversational", competitor: "Form-based" },
      { feature: "Cheating Detection", taurus: "AI Proctoring", competitor: "Window Lock" },
      { feature: "Pricing Model", taurus: "Pay Per Interview", competitor: "Credit Packs" },
      { feature: "Customizable Avatar", taurus: true, competitor: false },
      { feature: "Code Execution", taurus: "Sandboxed Real-time", competitor: "Basic Compiler" },
    ]
  }
};
