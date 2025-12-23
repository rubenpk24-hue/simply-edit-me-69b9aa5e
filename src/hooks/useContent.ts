import { useState, useEffect } from 'react';

export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  icon: string;
  imageUrl: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface SiteContent {
  branding: {
    logoUrl: string;
    companyName: string;
  };
  navigation: {
    links: Array<{ label: string; href: string }>;
    ctaText: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaText: string;
    secondaryCtaText: string;
  };
  liveDemo: {
    title: string;
    subtitle: string;
  };
  about: {
    tagline: string;
    title: string;
    description: string;
    additionalText: string;
  };
  features: {
    sectionTitle: string;
    items: Feature[];
  };
  roiCalculator: {
    title: string;
    subtitle: string;
    missedCallsLabel: string;
    avgSaleLabel: string;
    closeRateLabel: string;
    resultPrefix: string;
    resultSuffix: string;
  };
  howItWorks: {
    sectionTitle: string;
    steps: ProcessStep[];
  };
  booking: {
    sectionTitle: string;
    consultationTitle: string;
    duration: string;
    description: string;
    meetingType: string;
    imageUrl: string;
  };
  faq: {
    sectionTitle: string;
    items: FAQ[];
  };
  footer: {
    text: string;
    links: Array<{ label: string; href: string }>;
  };
  colors: {
    primaryHue: number;
  };
}

const defaultContent: SiteContent = {
  branding: {
    logoUrl: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/euWA4yNNSFdmATdtUmlC/media/68db6847cbc8a832996f7e56.png',
    companyName: 'AI Studio',
  },
  navigation: {
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'ROI Calculator', href: '#roi-calculator' },
      { label: 'Book A Discovery Call', href: '#booking' },
    ],
    ctaText: 'Get Started',
  },
  hero: {
    badge: '🔥 AI-Powered Business Solutions',
    title: 'Scale Smarter With',
    titleHighlight: 'AI',
    subtitle: 'INSTANTLY save time & Make more Money!',
    ctaText: 'FREE AI CONSULTATION',
    secondaryCtaText: 'Watch Demo',
  },
  liveDemo: {
    title: '🔥 Try Our Live Demo 🔥',
    subtitle: 'Click the button in the bottom right corner of this site',
  },
  about: {
    tagline: 'Who are we?',
    title: 'Your Partner in Innovation',
    description: 'We help businesses implement the power of AI... So you can save time, boost profits, and stay ahead of the competition.',
    additionalText: 'While other companies fall behind, you\'ll be the one leading with smarter, faster systems powered by AI.',
  },
  features: {
    sectionTitle: '👇 FEATURES 👇',
    items: [
      {
        id: '1',
        title: 'AI Receptionist',
        subtitle: 'Your 24/7 voice assistant',
        description: 'that answers every call and prevents missed opportunities.',
        bulletPoints: [
          'Handles every call, after-hours calls, or calls that would have gone to voicemail (you choose)',
          'Books appointments directly into your calendar or booking system',
          'Bi-lingual (speaks multiple languages)',
          'Sends follow-up texts and logs all information into your CRM',
          'The voice, language, tone, and capabilities are tailored to your liking',
        ],
        icon: 'phone',
        imageUrl: 'https://assets.cdn.filesafe.space/euWA4yNNSFdmATdtUmlC/media/d1f77a71-a2aa-49fe-9480-a599a5e1b7d7.png',
      },
      {
        id: '2',
        title: 'AI Sales Rep',
        subtitle: 'Your personal AI sales rep',
        description: 'that makes outbound calls/texts to new leads, old leads, or unresponsive inquiries.',
        bulletPoints: [
          'Automatically calls or texts new leads within seconds of inquiry',
          'Re-ignites aged or cold leads to generate new revenue 🔥',
          'Uses natural, human-like voice conversations to qualify and book appointments',
        ],
        icon: 'user',
        imageUrl: 'https://assets.cdn.filesafe.space/euWA4yNNSFdmATdtUmlC/media/88b04395-a82e-4790-8771-eecc470937d6.png',
      },
      {
        id: '3',
        title: 'AI Site Widget',
        subtitle: 'An interactive voice or chat agent',
        description: 'designed to instantly engage visitors, answer questions, and book appointments in real time.',
        bulletPoints: [
          'Fully custom-built to match your brand\'s tone, colors, and personality',
          'Greets visitors naturally and keeps them engaged longer',
          'Answers FAQs, explains services, and captures lead info',
          'Books appointments automatically',
          'Works seamlessly as a chat or voice interface',
        ],
        icon: 'messageSquare',
        imageUrl: 'https://assets.cdn.filesafe.space/euWA4yNNSFdmATdtUmlC/media/36d96102-1261-4b11-b681-d43d7a827564.png',
      },
      {
        id: '4',
        title: 'AI Review Agent',
        subtitle: 'Your reputation assistant',
        description: 'that responds to every review. Improving SEO and saving hours every week.',
        bulletPoints: [
          'Responds instantly to every Google review in your brand\'s tone',
          'Boosts Google ranking through consistent engagement',
          'Logs all reviews and responses in your CRM dashboard',
          'Implement a reviews widget into your website with an AI summary included',
        ],
        icon: 'star',
        imageUrl: 'https://assets.cdn.filesafe.space/euWA4yNNSFdmATdtUmlC/media/06599383-11d6-4c14-ac26-03259c2fd0a2.png',
      },
    ],
  },
  roiCalculator: {
    title: 'ROI Calculator',
    subtitle: 'See how much money you\'re leaving on the table',
    missedCallsLabel: 'Missed Calls Per Month',
    avgSaleLabel: 'Average Sale Value ($)',
    closeRateLabel: 'Close Rate (%)',
    resultPrefix: 'You\'re losing approximately',
    resultSuffix: 'per year in missed opportunities',
  },
  howItWorks: {
    sectionTitle: 'How It Works',
    steps: [
      { id: '1', step: 1, title: 'Book a Call', description: 'Schedule a free AI consultation to discuss your business needs.' },
      { id: '2', step: 2, title: 'Strategy Session', description: 'We analyze your current setup and identify AI opportunities.' },
      { id: '3', step: 3, title: 'Custom Build', description: 'Our team builds your personalized AI solutions.' },
      { id: '4', step: 4, title: 'Integration', description: 'Seamless integration with your existing systems and CRM.' },
      { id: '5', step: 5, title: 'Training', description: 'We train you and your team on using the new AI tools.' },
      { id: '6', step: 6, title: 'Launch & Support', description: 'Go live with ongoing support and optimization.' },
    ],
  },
  booking: {
    sectionTitle: 'SCHEDULE YOUR FREE AI CONSULTATION',
    consultationTitle: 'AI Consultation',
    duration: '30 Mins',
    description: 'During the call, we\'ll explore how AI can be integrated into your business operations to help you save time, increase conversions, and streamline communication.',
    meetingType: '💻 Meeting Type: Google Meet',
    imageUrl: 'https://storage.googleapis.com/msgsndr/euWA4yNNSFdmATdtUmlC/media/68f300536752d45ab53def05.png',
  },
  faq: {
    sectionTitle: 'Frequently Asked Questions',
    items: [
      { id: '1', question: 'How human-like is the AI voice?', answer: 'Our AI uses advanced voice synthesis technology that sounds remarkably natural. Most callers can\'t tell they\'re speaking with an AI. We continuously improve our voice models to ensure the most natural conversation experience.' },
      { id: '2', question: 'Does the AI support multiple languages?', answer: 'Yes! Our AI is bi-lingual and supports multiple languages including English, Spanish, French, and more. You can configure the language preferences based on your customer base.' },
      { id: '3', question: 'How does it integrate with my existing CRM?', answer: 'We integrate seamlessly with popular CRM systems including Salesforce, HubSpot, GoHighLevel, and many others. All call data, appointments, and lead information are automatically logged into your existing systems.' },
      { id: '4', question: 'What happens if the AI can\'t handle a request?', answer: 'The AI is trained to recognize when a request is beyond its capabilities. In these cases, it can seamlessly transfer the call to a human representative or schedule a callback at a time when a team member is available.' },
      { id: '5', question: 'How quickly can I get started?', answer: 'Most businesses are up and running within 1-2 weeks. This includes initial consultation, customization, integration, and training. We work on your timeline to ensure a smooth implementation.' },
    ],
  },
  footer: {
    text: '© 2024 AI Studio. All rights reserved.',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Contact', href: '#booking' },
    ],
  },
  colors: {
    primaryHue: 210,
  },
};

const STORAGE_KEY = 'site-content-v2';

export function useContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with defaults to handle any new fields
        setContent({ ...defaultContent, ...parsed });
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

  return { content, updateContent, resetContent, isLoaded, defaultContent };
}
