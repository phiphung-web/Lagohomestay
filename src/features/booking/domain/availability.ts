import type { PriceQuote } from "@/features/booking/domain/pricing";

export type AvailabilityOption = {
  id: string;
  unitId: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  maxGuests: number;
  bedrooms: number;
  basePrice: number;
  highlights: string[];
  location: string;
  badge?: string;
  quote: PriceQuote;
};

export type AvailabilityResponse = {
  data: AvailabilityOption[];
  meta: { checkIn: string; checkOut: string; guests: number };
};
