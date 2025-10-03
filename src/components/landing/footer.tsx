import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-background border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold">
            <Image src="/Di..png" alt="Diseño Divino logo" width={24} height={24} className="h-6 w-auto" />
            <p className="font-bold">Diseño Divino</p>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Diseño Divino. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://x.com/diseno_nmit" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
            <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://www.instagram.com/diseno.divino.nmit/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://www.linkedin.com/company/dise%C3%B1o-divino" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
