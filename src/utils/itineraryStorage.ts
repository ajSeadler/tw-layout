/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/itineraryStorage.ts
const ITINERARY_KEY = "itinerary";

export function getItinerary() {
  const stored = localStorage.getItem(ITINERARY_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveToItinerary(park: any) {
  const itinerary = getItinerary();
  const exists = itinerary.some((p: any) => p.id === park.id);
  if (!exists) {
    itinerary.push(park);
    localStorage.setItem(ITINERARY_KEY, JSON.stringify(itinerary));
  }
}

export function removeFromItinerary(id: string) {
  const itinerary = getItinerary().filter((p: any) => p.id !== id);
  localStorage.setItem(ITINERARY_KEY, JSON.stringify(itinerary));
}

export function clearItinerary() {
  localStorage.removeItem(ITINERARY_KEY);
}
