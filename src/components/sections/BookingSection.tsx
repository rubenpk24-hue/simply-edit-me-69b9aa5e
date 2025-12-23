import { motion } from 'framer-motion';
import { Calendar, Clock, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingSectionProps {
  sectionTitle: string;
  consultationTitle: string;
  duration: string;
  description: string;
  meetingType: string;
  imageUrl: string;
}

export function BookingSection({
  sectionTitle,
  consultationTitle,
  duration,
  description,
  meetingType,
  imageUrl,
}: BookingSectionProps) {
  return (
    <section id="booking" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient">{sectionTitle}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Info Card */}
            <div className="rounded-2xl bg-gradient-card border border-border p-8 shadow-elevated">
              <div className="flex items-center gap-4 mb-6">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Consultation"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold">{consultationTitle}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{duration}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {description}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Video className="h-4 w-4 text-primary" />
                <span>{meetingType}</span>
              </div>

              <Button 
                size="lg" 
                className="w-full text-lg shadow-glow animate-glow-pulse"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Free Call
              </Button>
            </div>

            {/* Calendar Placeholder */}
            <div className="rounded-2xl bg-gradient-card border border-border p-8 shadow-soft">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Select Date & Time</h3>
              </div>

              {/* Simulated Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-6">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center text-xs text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2; // Start from previous month
                  const isCurrentMonth = day > 0 && day <= 31;
                  const isAvailable = isCurrentMonth && Math.random() > 0.3;
                  return (
                    <button
                      key={i}
                      disabled={!isAvailable}
                      className={`
                        aspect-square rounded-md text-sm font-medium transition-all
                        ${isCurrentMonth ? '' : 'opacity-30'}
                        ${isAvailable 
                          ? 'hover:bg-primary hover:text-primary-foreground cursor-pointer' 
                          : 'opacity-40 cursor-not-allowed'
                        }
                      `}
                    >
                      {isCurrentMonth ? day : ''}
                    </button>
                  );
                })}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Select a date to see available time slots
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
