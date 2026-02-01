export interface WorkflowItem {
  id: string;
  title: string;
  icon: string;
  content: {
    heading: string;
    description: string;
    steps: { text: string; completed: boolean }[];
  };
}

export interface PricingPlan {
  name: string;
  price: Record<string, number | string>;
  credits: number;
  description: string;
  popular?: boolean;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Company {
  name: string;
  logo: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
