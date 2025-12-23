import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface LiveDemoSectionProps {
  title: string;
  subtitle: string;
}

export function LiveDemoSection({ title, subtitle }: LiveDemoSectionProps) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {title}
          </h2>
          <div className="flex items-center justify-center gap-3 text-muted-foreground text-lg md:text-xl">
            <MessageSquare className="h-6 w-6 text-primary" />
            <p>{subtitle}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
