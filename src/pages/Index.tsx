import { useContent } from '@/hooks/useContent';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { AdminPanel } from '@/components/admin/AdminPanel';

const Index = () => {
  const { content, updateContent, resetContent, isLoaded } = useContent();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          ctaText={content.hero.ctaText}
        />
        
        <AboutSection
          title={content.about.title}
          description={content.about.description}
        />
        
        <ServicesSection
          title={content.services.title}
          items={content.services.items}
        />
        
        <ContactSection
          title={content.contact.title}
          email={content.contact.email}
          description={content.contact.description}
        />
      </main>
      
      <Footer text={content.footer.text} />
      
      <AdminPanel
        content={content}
        onSave={updateContent}
        onReset={resetContent}
      />
    </div>
  );
};

export default Index;
