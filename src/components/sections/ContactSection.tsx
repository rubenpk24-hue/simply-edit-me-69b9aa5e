import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface ContactSectionProps {
  title: string;
  email: string;
  description: string;
}

export function ContactSection({ title, email, description }: ContactSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Get In Touch
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              {description}
            </p>
            
            <Button
              size="lg"
              variant="outline"
              className="group px-8 py-6 text-base font-medium border-2"
              asChild
            >
              <a href={`mailto:${email}`}>
                <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {email}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
