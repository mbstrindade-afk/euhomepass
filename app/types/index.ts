export interface CommunityItem {
  icon: string;
  title: string;
  text: string;
  metric: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  savings?: string;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}
