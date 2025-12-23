import { motion } from 'framer-motion';
import { Phone, User, MessageSquare, Star, LucideIcon } from 'lucide-react';
import { Feature } from '@/hooks/useContent';

interface FeaturesSectionProps {
  sectionTitle: string;
  features: Feature[];
}

const iconMap: Record<string, LucideIcon> = {
  phone: Phone,
  user: User,
  messageSquare: MessageSquare,
  star: Star,
};

export function FeaturesSection({ sectionTitle, features }: FeaturesSectionProps) {
  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold">{sectionTitle}</h2>
        </motion.div>

        <div className="space-y-20">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Phone;
            const isReversed = index % 2 !== 0;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`space-y-6 ${isReversed ? 'md:order-2' : ''}`}>
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{feature.title}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {feature.subtitle}{' '}
                    <span className="text-muted-foreground font-normal">
                      {feature.description}
                    </span>
                  </h3>
                  
                  <ul className="space-y-4">
                    {feature.bulletPoints.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className={`relative ${isReversed ? 'md:order-1' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-card p-4 shadow-elevated">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      className="relative w-full h-auto rounded-xl"
                    />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-full opacity-50" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
