import type { SiteContent } from '@/hooks/useContent';

interface FooterProps {
  text: string;
  links: SiteContent['footer']['links'];
}

export function Footer({ text, links }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">{text}</p>
          <nav aria-label="Footer" className="flex items-center gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
