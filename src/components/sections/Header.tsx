import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SiteContent } from '@/hooks/useContent';

interface HeaderProps {
  branding: SiteContent['branding'];
  navigation: SiteContent['navigation'];
}

export function Header({ branding, navigation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container px-4">
        <nav className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            {branding.logoUrl ? (
              <img
                src={branding.logoUrl}
                alt={`${branding.companyName} logo`}
                className="h-8 w-auto"
                loading="lazy"
              />
            ) : null}
            <span className="text-base font-semibold tracking-tight text-foreground">
              {branding.companyName}
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {navigation.links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild>
              <a href="#booking">{navigation.ctaText}</a>
            </Button>
          </div>

          {/* Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>

        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border py-4"
          >
            <ul className="flex flex-col gap-3">
              {navigation.links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild className="w-full">
                  <a href="#booking" onClick={() => setIsMobileMenuOpen(false)}>
                    {navigation.ctaText}
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </div>
    </motion.header>
  );
}
