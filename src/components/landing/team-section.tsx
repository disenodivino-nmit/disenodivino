import Image from 'next/image';
import { getTeamImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function TeamSection() {
  const teamMembers = getTeamImages();

  return (
    <section id="team" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Meet the Team
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            The creative minds behind Diseño Divino, dedicated to building an inspiring community.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center group overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-square w-full">
                  <Image
                    src={member.imageUrl}
                    alt={member.description}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={member.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="font-headline text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                 <p className="text-sm text-muted-foreground mt-2">A brief bio about the team member, their passions, and their contributions to the club.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
