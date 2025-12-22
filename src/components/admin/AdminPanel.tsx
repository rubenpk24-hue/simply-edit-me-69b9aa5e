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
      title: "Changes saved!",
      description: "Your content has been updated successfully.",
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    onReset();
    setEditedContent(content);
    toast({
      title: "Content reset",
      description: "All content has been restored to defaults.",
    });
    setIsOpen(false);
  };

  const updateField = (section: keyof SiteContent, field: string, value: string) => {
    setEditedContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateServiceItem = (index: number, field: string, value: string) => {
    setEditedContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  return (
    <>
      {/* Floating Edit Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-smooth"
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Admin Panel Overlay */}
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
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-background border-l border-border shadow-elevated overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-serif text-xl font-semibold">Edit Content</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <Tabs defaultValue="hero" className="w-full">
                  <TabsList className="w-full grid grid-cols-4 mb-6">
                    <TabsTrigger value="hero">Hero</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>

                  <TabsContent value="hero" className="space-y-4">
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
                      <Label htmlFor="hero-subtitle">Subtitle</Label>
                      <Textarea
                        id="hero-subtitle"
                        value={editedContent.hero.subtitle}
                        onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                        className="mt-1.5"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-cta">Button Text</Label>
                      <Input
                        id="hero-cta"
                        value={editedContent.hero.ctaText}
                        onChange={(e) => updateField('hero', 'ctaText', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="about" className="space-y-4">
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
                      <Label htmlFor="about-description">Description</Label>
                      <Textarea
                        id="about-description"
                        value={editedContent.about.description}
                        onChange={(e) => updateField('about', 'description', e.target.value)}
                        className="mt-1.5"
                        rows={5}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="services" className="space-y-6">
                    <div>
                      <Label htmlFor="services-title">Section Title</Label>
                      <Input
                        id="services-title"
                        value={editedContent.services.title}
                        onChange={(e) => updateField('services', 'title', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    {editedContent.services.items.map((item, index) => (
                      <div key={index} className="p-4 bg-card rounded-lg space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Service {index + 1}</p>
                        <div>
                          <Label htmlFor={`service-${index}-title`}>Title</Label>
                          <Input
                            id={`service-${index}-title`}
                            value={item.title}
                            onChange={(e) => updateServiceItem(index, 'title', e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`service-${index}-desc`}>Description</Label>
                          <Textarea
                            id={`service-${index}-desc`}
                            value={item.description}
                            onChange={(e) => updateServiceItem(index, 'description', e.target.value)}
                            className="mt-1.5"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-4">
                    <div>
                      <Label htmlFor="contact-title">Title</Label>
                      <Input
                        id="contact-title"
                        value={editedContent.contact.title}
                        onChange={(e) => updateField('contact', 'title', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={editedContent.contact.email}
                        onChange={(e) => updateField('contact', 'email', e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-description">Description</Label>
                      <Textarea
                        id="contact-description"
                        value={editedContent.contact.description}
                        onChange={(e) => updateField('contact', 'description', e.target.value)}
                        className="mt-1.5"
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 p-6 border-t border-border bg-card">
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
