import { Code, Brush, Users, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const activities = [
  {
    icon: <Brush className="h-8 w-8 text-primary" />,
    title: 'Design Workshops',
    description: 'Hands-on sessions covering UI/UX, graphic design, and 3D modeling.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Creative Coding',
    description: 'Explore the intersection of art and technology with generative art and interactive projects.',
  },
  {
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: 'Industry Talks',
    description: 'Learn from professionals who are leading and shaping the design industry.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Collaborative Projects',
    description: 'Team up to build real-world projects, honing your skills and building your portfolio.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Diseño Divino
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Diseño Divino is a student-led organization dedicated to fostering a vibrant community of designers, artists, and developers. We believe in the power of collaboration and hands-on learning to push the boundaries of digital creativity. Our goal is to provide a platform for students to grow their skills, connect with peers, and prepare for a career in the creative industries.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <h3 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">What We Do?</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {activities.map((activity) => (
                <Card key={activity.title} className="transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-md bg-primary/10 p-3">
                      {activity.icon}
                    </div>
                    <CardTitle className="font-headline">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
