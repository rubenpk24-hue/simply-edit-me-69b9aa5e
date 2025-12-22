interface FooterProps {
  text: string;
}

export function Footer({ text }: FooterProps) {
  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container px-6 md:px-8">
        <p className="text-center text-sm text-muted-foreground">
          {text}
        </p>
      </div>
    </footer>
  );
}
