import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  category: 'team' | 'event-upcoming' | 'event-past';
  name?: string;
  role?: string;
  title?: string;
  date?: string;
};

export const placeholderImages: ImagePlaceholder[] = data.placeholderImages;

export const getTeamImages = () => {
    return placeholderImages.filter((img) => img.category === 'team');
}

export const getUpcomingEvents = () => {
    return placeholderImages.filter((img) => img.category === 'event-upcoming');
}

export const getPastEvents = () => {
    return placeholderImages.filter((img) => img.category === 'event-past');
}
