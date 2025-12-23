import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ROICalculatorProps {
  title: string;
  subtitle: string;
  missedCallsLabel: string;
  avgSaleLabel: string;
  closeRateLabel: string;
  resultPrefix: string;
  resultSuffix: string;
}

export function ROICalculator({
  title,
  subtitle,
  missedCallsLabel,
  avgSaleLabel,
  closeRateLabel,
  resultPrefix,
  resultSuffix,
}: ROICalculatorProps) {
  const [missedCalls, setMissedCalls] = useState(50);
  const [avgSale, setAvgSale] = useState(500);
  const [closeRate, setCloseRate] = useState(30);

  const yearlyLoss = missedCalls * avgSale * (closeRate / 100) * 12;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="roi-calculator" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Calculator className="h-5 w-5 text-primary" />
            <span className="font-medium">{title}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{subtitle}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-card border border-border p-8 md:p-12 shadow-elevated">
            <div className="space-y-10">
              {/* Missed Calls */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-medium">{missedCallsLabel}</Label>
                  <span className="text-2xl font-bold text-primary">{missedCalls}</span>
                </div>
                <Slider
                  value={[missedCalls]}
                  onValueChange={(value) => setMissedCalls(value[0])}
                  min={0}
                  max={200}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Average Sale */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-medium">{avgSaleLabel}</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <Input
                      type="number"
                      value={avgSale}
                      onChange={(e) => setAvgSale(Number(e.target.value))}
                      className="w-32 text-right text-xl font-bold"
                    />
                  </div>
                </div>
                <Slider
                  value={[avgSale]}
                  onValueChange={(value) => setAvgSale(value[0])}
                  min={100}
                  max={5000}
                  step={50}
                  className="w-full"
                />
              </div>

              {/* Close Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-medium">{closeRateLabel}</Label>
                  <span className="text-2xl font-bold text-primary">{closeRate}%</span>
                </div>
                <Slider
                  value={[closeRate]}
                  onValueChange={(value) => setCloseRate(value[0])}
                  min={5}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>

            {/* Result */}
            <motion.div
              key={yearlyLoss}
              initial={{ scale: 0.95, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-12 p-8 rounded-xl bg-destructive/10 border border-destructive/30 text-center"
            >
              <p className="text-lg text-muted-foreground mb-2">{resultPrefix}</p>
              <p className="text-4xl md:text-5xl font-bold text-destructive">
                {formatCurrency(yearlyLoss)}
              </p>
              <p className="text-lg text-muted-foreground mt-2">{resultSuffix}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
