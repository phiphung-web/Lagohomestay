import type { Stay } from "@/features/stays/data/demo-data";
import type { AvailabilityOption } from "@/features/booking/domain/availability";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const englishStays: Record<string, Partial<Stay>> = {
  "lago-house": {
    name: "LAKA House",
    subtitle: "Lakeside home · for groups",
    description: "An open lakeside home made for joyful reunions, shared cooking and dinners that last a little longer.",
    longDescription: "LAKA House was created for coming together. A generous living room flows into the kitchen, the private BBQ terrace hosts long dinners, and three quiet bedrooms give everyone a place to truly rest.",
    location: "Lakeside",
    badge: "Guest favourite",
    amenities: ["Full kitchen", "Private BBQ terrace", "Large living room", "Lake-view veranda", "Washing machine", "Air conditioning", "High-speed Wi-Fi", "Parking"],
    highlights: ["Lake view", "Private BBQ terrace", "Made for connection"]
  },
  "nha-may": {
    name: "Cloud House",
    subtitle: "A small home above the trees · for two",
    description: "A quiet home where clouds drift past the window and mornings begin with soft light.",
    longDescription: "Cloud House is for two people who want to disappear from the everyday. Full-height windows open to the canopy, the bath sits beside the view, and a private terrace holds just enough room for two cups of tea at sunset.",
    location: "Hillside",
    badge: "Most romantic",
    amenities: ["Forest-view bath", "Private terrace", "Projector", "Air conditioning", "Kitchenette", "Wi-Fi", "Optional breakfast"],
    highlights: ["Private for two", "Forest-view bath", "Sunrise view"]
  },
  "nha-rung": {
    name: "Forest House",
    subtitle: "Beneath the canopy · for families",
    description: "Warm timber interiors embrace a private garden, bringing the whole family close to nature without giving up comfort.",
    longDescription: "Forest House rests under mature trees, with a full family kitchen, an enclosed garden and two warm bedrooms. Children have room to explore while adults can linger on the veranda.",
    location: "Forest garden",
    badge: "Family friendly",
    amenities: ["Private garden", "Family kitchen", "Outdoor dining table", "Children’s essentials", "Air conditioning", "Wi-Fi", "Parking"],
    highlights: ["Private garden", "Family friendly", "Two bedrooms"]
  },
  "nha-doi": {
    name: "Hill House",
    subtitle: "Open valley views · for longer stays",
    description: "A light-filled home with a private studio, a generous terrace and an open view across the valley.",
    longDescription: "Hill House is made for staying longer than a weekend. A valley-facing workspace, airy kitchen and generous terrace let you change your pace while keeping your focus when needed.",
    location: "Hilltop",
    badge: "New",
    amenities: ["Private work studio", "Sunset terrace", "Full kitchen", "Washing machine", "Air conditioning", "High-speed Wi-Fi", "Parking"],
    highlights: ["Valley view", "Workation ready", "Sunset terrace"]
  }
};

export function localizeStay<T extends Stay>(stay: T, locale: ShowcaseLocale): T {
  if (locale === "vi") return stay;
  return { ...stay, ...englishStays[stay.slug] } as T;
}

export function localizeAvailabilityOption(option: AvailabilityOption, locale: ShowcaseLocale): AvailabilityOption {
  if (locale === "vi") return option;
  const translation = englishStays[option.slug];
  if (!translation) return option;
  return {
    ...option,
    name: translation.name ?? option.name,
    subtitle: translation.subtitle ?? option.subtitle,
    description: translation.description ?? option.description,
    location: translation.location ?? option.location,
    badge: translation.badge ?? option.badge,
    highlights: translation.highlights ?? option.highlights
  };
}

export const englishExperienceMoments = [
  { time: "06:30", title: "Wake with the light", text: "Open the door, make tea and let the morning begin at your own pace." },
  { time: "09:00", title: "An unhurried pause", text: "Read a few pages, wander beneath the trees or simply do nothing at all." },
  { time: "18:30", title: "A dinner that lingers", text: "Every home has its own kitchen and dining table for stories that deserve more time." },
  { time: "21:00", title: "A quiet night by the water", text: "Warm light, moving leaves and darkness deep enough for genuine rest." }
];

export const englishFaqs = [
  ["Who is LAKA best suited for?", "The collection includes a home for two, family homes for 4–5 guests and a group home for up to 8 guests."],
  ["Do I need to pay immediately?", "No. Your request is held for two hours while the LAKA team confirms it by phone or Zalo."],
  ["Is each home completely private?", "Yes. Your group has the entire home and does not share living areas with other guests."],
  ["Is the displayed price final?", "The system estimates the price using your dates and guest count. LAKA confirms the final amount when contacting you."]
] as const;
