'use client';

import Image from 'next/image';
import { getUpcomingEvents, getPastEvents, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const EventCard = ({ event }: { event: ImagePlaceholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-2xl group cursor-pointer">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={event.description}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={event.imageHint}
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="font-headline text-xl mb-2">{event.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date TBD'}</span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{event.title}</DialogTitle>
          <DialogDescription className="text-base">
            {event.date && (
              <div className="flex items-center text-muted-foreground mb-4">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            )}
            {event.description_full && (
              <p className="text-foreground mb-6">{event.description_full}</p>
            )}
            
            {event.gallery && event.gallery.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Gallery</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.gallery.map((imageUrl, index) => (
                    <div key={index} className="relative h-48 w-full overflow-hidden rounded-lg">
                      <Image
                        src={imageUrl}
                        alt={`${event.title} gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {event.website && event.category === 'event-upcoming' && (
              <div className="flex justify-center">
                <Button asChild className="gap-2">
                  <a href={event.website} target="_blank" rel="noopener noreferrer">
                    Know More <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export function EventsSection() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <section id="events" className="w-full py-20 md:py-32 bg-secondary/30 dark:bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Badge variant="outline" className="text-primary border-primary/50">Events</Badge>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Join Our Community
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            From workshops to social mixers, there's always something happening at Diseño Divino.
          </p>
        </div>
        <Tabs defaultValue="upcoming" className="mt-12 w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past" className="mt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
