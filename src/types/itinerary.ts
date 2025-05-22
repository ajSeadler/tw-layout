export type ItineraryItem = {
  id: string;
  fullName: string;
  parkCode: string;
  description: string;
  images: { url: string }[];
  latitude: number;
  longitude: number;
  arrival: Date | null;
  departure: Date | null;
  weather?: {
    icon: string;
    minTemp: number;
    maxTemp: number;
    description: string;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDeg: number;
    pressure: number;
  } | null;

  distanceToNext?: { miles: number; duration: string };
  activities?: Array<{ name: string; type: string; duration: string }>;
};
