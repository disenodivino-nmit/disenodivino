"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [bgStyle, setBgStyle] = useState({});

  useEffect(() => {
    if (hoveredLink && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = hoveredLink.getBoundingClientRect();
      setBgStyle({
        width: `${linkRect.width}px`,
        height: `${linkRect.height}px`,
        transform: `translateX(${linkRect.left - navRect.left}px)`,
        opacity: 1,
      });
    } else {
      setBgStyle({ ...bgStyle, opacity: 0 });
    }
  }, [hoveredLink]);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 lg:px-8">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between p-0">
        <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold">
          <Image src="/Di..png" alt="Diseño Divino logo" width={24} height={24} className="h-6 w-auto" />
        </Link>

        <nav 
          ref={navRef}
          className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2"
          onMouseLeave={() => setHoveredLink(null)}
        >
          <div className="relative flex items-center gap-1 rounded-full bg-secondary/50 p-1 shadow-inner">
            <div 
              className="absolute rounded-full bg-background shadow-lg"
              style={{
                transition: 'transform 0.3s ease-out, width 0.3s ease-out, opacity 0.3s ease-out',
                ...bgStyle
              }}
            />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 z-10"
                onMouseEnter={(e) => setHoveredLink(e.currentTarget)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setSheetOpen(false)}>
                  <Image src="/Di..png" alt="Diseño Divino logo" width={24} height={24} className="h-6 w-auto" />

                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setSheetOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
