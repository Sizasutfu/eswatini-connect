export interface Business {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string;
  shortDesc: string;
  description: string;
  image: string;
  gallery?: string[];        // ← new — optional array of photo URLs
  featured: boolean;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  services: string;
  isLocal?: boolean;
}

export interface Category {
  name: string;
  desc: string;
  icon: React.ReactNode;
}

export interface SubmissionDraft {
  name: string;
  category: string;
  location: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}