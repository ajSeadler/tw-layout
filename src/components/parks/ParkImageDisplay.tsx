import { ScrollIndicator } from "../ScrollIndicator";

type ParkImage = { url: string; altText: string; caption?: string };

export function ParkImageDisplay({ images }: { images: ParkImage }) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <img
        src={images.url}
        alt={images.altText}
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
      />
      <ScrollIndicator />
    </div>
  );
}
