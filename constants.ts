
import { TeamMember, Testimonial, SlideData } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Bindu Mohan",
    role: "CEO & Founder",
    image: "https://picsum.photos/id/338/800/1000", // Professional portrait placeholder
    bio: "Visionary leader driving DTales to new heights with a focus on digital transformation and storytelling excellence."
  },
  {
    name: "Sneha Peri",
    role: "Content Writer",
    image: "https://picsum.photos/id/342/800/1000", // Professional portrait placeholder
    bio: "Crafting compelling narratives that resonate with audiences and define brand voices."
  },
  {
    name: "Yashas",
    role: "Creative Designer",
    image: "https://picsum.photos/id/336/800/1000", // Professional portrait placeholder
    bio: "Turning abstract concepts into stunning visual realities with pixel-perfect precision."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    client: "Sarah Johnson",
    company: "TechFlow Inc.",
    quote: "DTales completely transformed our digital presence. Their storytelling approach is unmatched in the industry."
  },
  {
    id: 2,
    client: "Michael Chen",
    company: "GreenLeaf Ventures",
    quote: "Professional, creative, and incredibly dedicated. The new design increased our engagement by 200%."
  },
  {
    id: 3,
    client: "Priya Patel",
    company: "InnovateX",
    quote: "From the initial concept to the final launch, the team was exceptional. Bindu's leadership really shines through."
  },
  {
    id: 4,
    client: "David Wright",
    company: "Skyline Architecture",
    quote: "A masterclass in design and functionality. Highly recommended for anyone wanting a premium web experience."
  }
];

export const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    title: "From Concept to Clarity.",
    subtitle: "Expert Documentation That Powers Your Product Experience.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop", // Strategy/Planning/Clarity image
    cta: "Learn More"
  },
  {
    id: 2,
    title: "Code Into Conversation.",
    subtitle: "Technical Writing for Modern Products.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1920&auto=format&fit=crop",
    cta: "Our Services"
  },
  {
    id: 3,
    title: "Unlocking Potential.",
    subtitle: "With Precision Content & Knowledge Systems.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
    cta: "View Portfolio"
  },
  {
    id: 4,
    title: "Your Single Partner.",
    subtitle: "For Documentation Strategy, Toolchain & Content Excellence.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1920&auto=format&fit=crop",
    cta: "Contact Us"
  }
];
