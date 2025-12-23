import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import type { SiteContent } from '@/hooks/useContent';

interface AdminPanelProps {
  content: SiteContent;
  onSave: (content: SiteContent) => void;
  onReset: () => void;
}

export function AdminPanel({ content, onSave, onReset }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedContent, setEditedContent] = useState<SiteContent>(content);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(editedContent);
    toast({
      title: 'Changes saved!',
      description: 'Your site content has been updated successfully.',
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    onReset();
    setEditedContent(content);
    toast({
      title: 'Content reset',
      description: 'All content has been restored to defaults.',
    });
    setIsOpen(false);
  };

  const updateField = (section: keyof SiteContent, field: string, value: any) => {
    setEditedContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value,
      },
    }));
  };

  const updateNavLink = (index: number, field: 'label' | 'href', value: string) => {
    setEditedContent((prev) => ({
      ...prev,
      navigation: {
        ...prev.navigation,
        links: prev.navigation.links.map((l, i) => (i === index ? { ...l, [field]: value } : l)),
      },
    }));
  };

  const updateFeature = (index: number, patch: Partial<SiteContent['features']['items'][number]>) => {
    setEditedContent((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        items: prev.features.items.map((f, i) => (i === index ? { ...f, ...patch } : f)),
      },
    }));
  };

  const updateHowItWorksStep = (
    index: number,
    patch: Partial<SiteContent['howItWorks']['steps'][number]>
  ) => {
    setEditedContent((prev) => ({
      ...prev,
      howItWorks: {
        ...prev.howItWorks,
        steps: prev.howItWorks.steps.map((s, i) => (i === index ? { ...s, ...patch } : s)),
      },
    }));
  };

  const updateFaq = (index: number, patch: Partial<SiteContent['faq']['items'][number]>) => {
    setEditedContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        items: prev.faq.items.map((f, i) => (i === index ? { ...f, ...patch } : f)),
      },
    }));
  };

  return (
    <>
      {/* Floating Edit Button (moved away from bottom-right to match demo widget placement) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-smooth hover:scale-110"
        aria-label="Open admin panel"
      >
        <Settings className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-lg flex-col overflow-hidden border-l border-border bg-background shadow-elevated"
              role="dialog"
              aria-modal="true"
              aria-label="Admin panel"
            >
              <div className="flex items-center justify-between border-b border-border p-6">
                <h2 className="text-xl font-semibold">Edit Content</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <Tabs defaultValue="hero" className="w-full">
                  <TabsList className="flex w-full flex-wrap justify-start gap-2 bg-transparent p-0">
                    <TabsTrigger value="branding">Brand</TabsTrigger>
                    <TabsTrigger value="nav">Nav</TabsTrigger>
                    <TabsTrigger value="hero">Hero</TabsTrigger>
                    <TabsTrigger value="liveDemo">Live demo</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="roi">ROI</TabsTrigger>
                    <TabsTrigger value="how">How it works</TabsTrigger>
                    <TabsTrigger value="booking">Booking</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                    <TabsTrigger value="theme">Theme</TabsTrigger>
                  </TabsList>

                  <TabsContent value="branding" className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="brand-name">Company name</Label>
                      <Input
                        id="brand-name"
                        value={editedContent.branding.companyName}
                        onChange={(e) => updateField('branding', 'companyName', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="brand-logo">Logo URL</Label>
                      <Input
                        id="brand-logo"
                        value={editedContent.branding.logoUrl}
                        onChange={(e) => updateField('branding', 'logoUrl', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="nav" className="mt-6 space-y-6">
                    <div>
                      <Label htmlFor="nav-cta">CTA text</Label>
                      <Input
                        id="nav-cta"
                        value={editedContent.navigation.ctaText}
                        onChange={(e) => updateField('navigation', 'ctaText', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-medium text-muted-foreground">Links</p>
                      {editedContent.navigation.links.map((l, i) => (
                        <div key={l.href + i} className="rounded-lg border border-border bg-card p-4 space-y-3">
                          <div>
                            <Label htmlFor={`nav-${i}-label`}>Label</Label>
                            <Input
                              id={`nav-${i}-label`}
                              value={l.label}
                              onChange={(e) => updateNavLink(i, 'label', e.target.value)}
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`nav-${i}-href`}>Href</Label>
                            <Input
                              id={`nav-${i}-href`}
                              value={l.href}
                              onChange={(e) => updateNavLink(i, 'href', e.target.value)}
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="hero" className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="hero-badge">Badge</Label>
                      <Input
                        id="hero-badge"
                        value={editedContent.hero.badge}
                        onChange={(e) => updateField('hero', 'badge', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="hero-title">Title</Label>
                        <Input
                          id="hero-title"
                          value={editedContent.hero.title}
                          onChange={(e) => updateField('hero', 'title', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hero-highlight">Highlight</Label>
                        <Input
                          id="hero-highlight"
                          value={editedContent.hero.titleHighlight}
                          onChange={(e) => updateField('hero', 'titleHighlight', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle">Subtitle</Label>
                      <Textarea
                        id="hero-subtitle"
                        value={editedContent.hero.subtitle}
                        onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                        className="mt-1.5"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="hero-cta">Primary CTA</Label>
                        <Input
                          id="hero-cta"
                          value={editedContent.hero.ctaText}
                          onChange={(e) => updateField('hero', 'ctaText', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hero-cta-2">Secondary CTA</Label>
                        <Input
                          id="hero-cta-2"
                          value={editedContent.hero.secondaryCtaText}
                          onChange={(e) => updateField('hero', 'secondaryCtaText', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="liveDemo" className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="ld-title">Title</Label>
                      <Input
                        id="ld-title"
                        value={editedContent.liveDemo.title}
                        onChange={(e) => updateField('liveDemo', 'title', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ld-subtitle">Subtitle</Label>
                      <Input
                        id="ld-subtitle"
                        value={editedContent.liveDemo.subtitle}
                        onChange={(e) => updateField('liveDemo', 'subtitle', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="about" className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="about-tagline">Tagline</Label>
                      <Input
                        id="about-tagline"
                        value={editedContent.about.tagline}
                        onChange={(e) => updateField('about', 'tagline', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="about-title">Title</Label>
                      <Input
                        id="about-title"
                        value={editedContent.about.title}
                        onChange={(e) => updateField('about', 'title', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="about-desc">Description</Label>
                      <Textarea
                        id="about-desc"
                        value={editedContent.about.description}
                        onChange={(e) => updateField('about', 'description', e.target.value)}
                        className="mt-1.5"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="about-more">Additional text</Label>
                      <Textarea
                        id="about-more"
                        value={editedContent.about.additionalText}
                        onChange={(e) => updateField('about', 'additionalText', e.target.value)}
                        className="mt-1.5"
                        rows={3}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="mt-6 space-y-6">
                    <div>
                      <Label htmlFor="features-title">Section title</Label>
                      <Input
                        id="features-title"
                        value={editedContent.features.sectionTitle}
                        onChange={(e) => updateField('features', 'sectionTitle', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>

                    {editedContent.features.items.map((f, i) => (
                      <div key={f.id} className="rounded-lg border border-border bg-card p-4 space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Feature {i + 1}</p>
                        <div>
                          <Label htmlFor={`feat-${i}-title`}>Title</Label>
                          <Input
                            id={`feat-${i}-title`}
                            value={f.title}
                            onChange={(e) => updateFeature(i, { title: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`feat-${i}-subtitle`}>Subtitle</Label>
                          <Input
                            id={`feat-${i}-subtitle`}
                            value={f.subtitle}
                            onChange={(e) => updateFeature(i, { subtitle: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`feat-${i}-desc`}>Description</Label>
                          <Textarea
                            id={`feat-${i}-desc`}
                            value={f.description}
                            onChange={(e) => updateFeature(i, { description: e.target.value })}
                            className="mt-1.5"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <Label htmlFor={`feat-${i}-icon`}>Icon key</Label>
                            <Input
                              id={`feat-${i}-icon`}
                              value={f.icon}
                              onChange={(e) => updateFeature(i, { icon: e.target.value })}
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`feat-${i}-img`}>Image URL</Label>
                            <Input
                              id={`feat-${i}-img`}
                              value={f.imageUrl}
                              onChange={(e) => updateFeature(i, { imageUrl: e.target.value })}
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`feat-${i}-bullets`}>Bullet points (one per line)</Label>
                          <Textarea
                            id={`feat-${i}-bullets`}
                            value={f.bulletPoints.join('\n')}
                            onChange={(e) =>
                              updateFeature(i, {
                                bulletPoints: e.target.value
                                  .split(/\r?\n/)
                                  .map((s) => s.trim())
                                  .filter(Boolean),
                              })
                            }
                            className="mt-1.5"
                            rows={5}
                          />
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="roi" className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="roi-title">Title (pill)</Label>
                      <Input
                        id="roi-title"
                        value={editedContent.roiCalculator.title}
                        onChange={(e) => updateField('roiCalculator', 'title', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roi-sub">Subtitle (big)</Label>
                      <Input
                        id="roi-sub"
                        value={editedContent.roiCalculator.subtitle}
                        onChange={(e) => updateField('roiCalculator', 'subtitle', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roi-missed">Missed calls label</Label>
                      <Input
                        id="roi-missed"
                        value={editedContent.roiCalculator.missedCallsLabel}
                        onChange={(e) => updateField('roiCalculator', 'missedCallsLabel', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roi-avg">Avg sale label</Label>
                      <Input
                        id="roi-avg"
                        value={editedContent.roiCalculator.avgSaleLabel}
                        onChange={(e) => updateField('roiCalculator', 'avgSaleLabel', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roi-close">Close rate label</Label>
                      <Input
                        id="roi-close"
                        value={editedContent.roiCalculator.closeRateLabel}
                        onChange={(e) => updateField('roiCalculator', 'closeRateLabel', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roi-prefix">Result prefix</Label>
                      <Input
                        id="roi-prefix"
                        value={editedContent.roiCalculator.resultPrefix}
                        onChange={(e) => updateField('roiCalculator', 'resultPrefix', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roi-suffix">Result suffix</Label>
                      <Input
                        id="roi-suffix"
                        value={editedContent.roiCalculator.resultSuffix}
                        onChange={(e) => updateField('roiCalculator', 'resultSuffix', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="how" className="mt-6 space-y-6">
                    <div>
                      <Label htmlFor="how-title">Section title</Label>
                      <Input
                        id="how-title"
                        value={editedContent.howItWorks.sectionTitle}
                        onChange={(e) => updateField('howItWorks', 'sectionTitle', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>

                    {editedContent.howItWorks.steps.map((s, i) => (
                      <div key={s.id} className="rounded-lg border border-border bg-card p-4 space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Step {s.step}</p>
                        <div>
                          <Label htmlFor={`how-${i}-step`}>Step number</Label>
                          <Input
                            id={`how-${i}-step`}
                            type="number"
                            value={s.step}
                            onChange={(e) => updateHowItWorksStep(i, { step: Number(e.target.value) })}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`how-${i}-title`}>Title</Label>
                          <Input
                            id={`how-${i}-title`}
                            value={s.title}
                            onChange={(e) => updateHowItWorksStep(i, { title: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`how-${i}-desc`}>Description</Label>
                          <Textarea
                            id={`how-${i}-desc`}
                            value={s.description}
                            onChange={(e) => updateHowItWorksStep(i, { description: e.target.value })}
                            className="mt-1.5"
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="booking" className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="book-title">Section title</Label>
                      <Input
                        id="book-title"
                        value={editedContent.booking.sectionTitle}
                        onChange={(e) => updateField('booking', 'sectionTitle', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="book-consult">Consultation title</Label>
                      <Input
                        id="book-consult"
                        value={editedContent.booking.consultationTitle}
                        onChange={(e) => updateField('booking', 'consultationTitle', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="book-dur">Duration</Label>
                      <Input
                        id="book-dur"
                        value={editedContent.booking.duration}
                        onChange={(e) => updateField('booking', 'duration', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="book-desc">Description</Label>
                      <Textarea
                        id="book-desc"
                        value={editedContent.booking.description}
                        onChange={(e) => updateField('booking', 'description', e.target.value)}
                        className="mt-1.5"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="book-type">Meeting type</Label>
                      <Input
                        id="book-type"
                        value={editedContent.booking.meetingType}
                        onChange={(e) => updateField('booking', 'meetingType', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="book-img">Image URL</Label>
                      <Input
                        id="book-img"
                        value={editedContent.booking.imageUrl}
                        onChange={(e) => updateField('booking', 'imageUrl', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="faq" className="mt-6 space-y-6">
                    <div>
                      <Label htmlFor="faq-title">Section title</Label>
                      <Input
                        id="faq-title"
                        value={editedContent.faq.sectionTitle}
                        onChange={(e) => updateField('faq', 'sectionTitle', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>

                    {editedContent.faq.items.map((f, i) => (
                      <div key={f.id} className="rounded-lg border border-border bg-card p-4 space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">FAQ {i + 1}</p>
                        <div>
                          <Label htmlFor={`faq-${i}-q`}>Question</Label>
                          <Input
                            id={`faq-${i}-q`}
                            value={f.question}
                            onChange={(e) => updateFaq(i, { question: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`faq-${i}-a`}>Answer</Label>
                          <Textarea
                            id={`faq-${i}-a`}
                            value={f.answer}
                            onChange={(e) => updateFaq(i, { answer: e.target.value })}
                            className="mt-1.5"
                            rows={4}
                          />
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="theme" className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="theme-hue">Primary hue (0-360)</Label>
                      <Input
                        id="theme-hue"
                        type="number"
                        value={editedContent.colors.primaryHue}
                        onChange={(e) =>
                          setEditedContent((prev) => ({
                            ...prev,
                            colors: { ...prev.colors, primaryHue: Number(e.target.value) },
                          }))
                        }
                        className="mt-1.5"
                      />
                      <p className="mt-2 text-xs text-muted-foreground">
                        This updates your brand accent color (buttons, highlights).
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex items-center gap-3 border-t border-border bg-card p-6">
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
