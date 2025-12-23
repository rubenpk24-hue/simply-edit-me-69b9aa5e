import { useContent } from '@/hooks/useContent';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { LiveDemoSection } from '@/components/sections/LiveDemoSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ROICalculator } from '@/components/sections/ROICalculator';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { BookingSection } from '@/components/sections/BookingSection';
import { FAQSection } from '@/components/sections/FAQSection';
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
    <div id="top" className="min-h-screen bg-background">
      <Header branding={content.branding} navigation={content.navigation} />

      <main>
        <HeroSection
          badge={content.hero.badge}
          title={content.hero.title}
          titleHighlight={content.hero.titleHighlight}
          subtitle={content.hero.subtitle}
          ctaText={content.hero.ctaText}
          secondaryCtaText={content.hero.secondaryCtaText}
        />

        <LiveDemoSection title={content.liveDemo.title} subtitle={content.liveDemo.subtitle} />

        <AboutSection
          tagline={content.about.tagline}
          title={content.about.title}
          description={content.about.description}
          additionalText={content.about.additionalText}
        />

        <FeaturesSection sectionTitle={content.features.sectionTitle} features={content.features.items} />

        <ROICalculator
          title={content.roiCalculator.title}
          subtitle={content.roiCalculator.subtitle}
          missedCallsLabel={content.roiCalculator.missedCallsLabel}
          avgSaleLabel={content.roiCalculator.avgSaleLabel}
          closeRateLabel={content.roiCalculator.closeRateLabel}
          resultPrefix={content.roiCalculator.resultPrefix}
          resultSuffix={content.roiCalculator.resultSuffix}
        />

        <HowItWorksSection
          sectionTitle={content.howItWorks.sectionTitle}
          steps={content.howItWorks.steps}
        />

        <BookingSection
          sectionTitle={content.booking.sectionTitle}
          consultationTitle={content.booking.consultationTitle}
          duration={content.booking.duration}
          description={content.booking.description}
          meetingType={content.booking.meetingType}
          imageUrl={content.booking.imageUrl}
        />

        <FAQSection sectionTitle={content.faq.sectionTitle} faqs={content.faq.items} />
      </main>

      <Footer text={content.footer.text} links={content.footer.links} />

      <AdminPanel content={content} onSave={updateContent} onReset={resetContent} />
    </div>
  );
};

export default Index;
