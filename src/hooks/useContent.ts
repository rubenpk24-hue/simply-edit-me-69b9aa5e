import { useState, useEffect } from 'react';

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  about: {
    title: string;
    description: string;
  };
  services: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  contact: {
    title: string;
    email: string;
    description: string;
  };
  footer: {
    text: string;
  };
}

const defaultContent: SiteContent = {
  hero: {
    title: "Crafting Digital Experiences",
    subtitle: "We design and build beautiful websites that help your business grow. Simple, elegant, effective.",
    ctaText: "Get Started",
  },
  about: {
    title: "About Us",
    description: "We're a passionate team dedicated to creating exceptional digital experiences. With years of expertise in design and development, we transform ideas into stunning realities. Our approach combines creativity with strategic thinking to deliver results that matter.",
  },
  services: {
    title: "What We Do",
    items: [
      {
        title: "Web Design",
        description: "Beautiful, responsive designs that capture your brand's essence and engage your audience.",
        icon: "palette",
      },
      {
        title: "Development",
        description: "Clean, efficient code that brings designs to life with smooth interactions and fast performance.",
        icon: "code",
      },
      {
        title: "Strategy",
        description: "Thoughtful planning and research to ensure your digital presence achieves your goals.",
        icon: "lightbulb",
      },
    ],
  },
  contact: {
    title: "Let's Work Together",
    email: "hello@example.com",
    description: "Have a project in mind? We'd love to hear from you. Reach out and let's create something amazing together.",
  },
  footer: {
    text: "© 2024 Your Company. All rights reserved.",
  },
};

const STORAGE_KEY = 'site-content';

export function useContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setContent(JSON.parse(stored));
      } catch {
        setContent(defaultContent);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { content, updateContent, resetContent, isLoaded };
}
