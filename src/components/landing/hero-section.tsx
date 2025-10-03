import Link from "next/link";
import { NeonFloor } from "./neon-floor";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      <NeonFloor />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/50 to-transparent">
        <div className="container flex flex-col items-center justify-center text-center pb-8">
          <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Diseño Divino
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground dark:text-white/90 md:text-xl">
            Where creativity meets code. Join our community of designers and developers shaping the future of digital experiences.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="group">
              <Link href="#contact">
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
