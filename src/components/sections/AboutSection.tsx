import { motion } from 'framer-motion';

interface AboutSectionProps {
  tagline: string;
  title: string;
  description: string;
  additionalText: string;
}

export function AboutSection({ tagline, title, description, additionalText }: AboutSectionProps) {
  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {tagline}
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">{title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {description}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {additionalText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
