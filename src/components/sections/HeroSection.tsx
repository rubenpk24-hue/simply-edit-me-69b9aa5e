import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText: string;
}

export function HeroSection({
  badge,
  title,
  titleHighlight,
  subtitle,
  ctaText,
  secondaryCtaText,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute inset-0 mesh-gradient opacity-25" />

      <div className="container relative z-10 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-muted-foreground"
          >
            {badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="block uppercase">{title}</span>{' '}
            <span className="block uppercase text-primary">{titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" className="w-full sm:w-auto">
              {ctaText}
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              {secondaryCtaText}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
