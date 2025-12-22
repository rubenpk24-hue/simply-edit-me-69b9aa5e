import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AboutSectionProps {
  title: string;
  description: string;
}

export function AboutSection({ title, description }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container px-6 md:px-8">
        <div className="max-w-3xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Who We Are
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
