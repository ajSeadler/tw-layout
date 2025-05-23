// src/types.ts
export type Park = {
  id: string;
  fullName: string;
  parkCode: string;
  description: string;
  directionsInfo: string;
  directionsUrl: string;
  weatherInfo: string;
  designation: string;
  states: string;
  latitude: string;
  longitude: string;
  url: string;
  activities: { id: string; name: string }[];
  topics: { id: string; name: string }[];
  operatingHours: {
    description: string;
    standardHours: Record<string, string>;
  }[];
  entranceFees: { cost: string; description: string; title: string }[];
  contacts: {
    phoneNumbers: { phoneNumber: string; type: string }[];
    emailAddresses: { emailAddress: string }[];
  };
  images: { url: string; altText: string; caption: string }[];
};

export type WeatherData = {
  // Define or import the shape if it's defined elsewhere
  // Example:
  temperature: string;
  condition: string;
  icon: string;
  // Add more fields as needed
};
