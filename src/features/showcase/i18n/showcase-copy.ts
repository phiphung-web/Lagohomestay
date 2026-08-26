import { stayZones, type Stay, type StayZone } from "@/features/stays/data/demo-data";
import type { AvailabilityOption } from "@/features/booking/domain/availability";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const commonIncluded = [
  "Four-season pool with natural water technology",
  "In-room tea, coffee and bottled water",
  "Wi-Fi and cable television",
  "Complimentary bicycles, billiards, table tennis, table football and board games",
  "100 m² team-building ground and 100 m² outdoor stage"
];

const breakfastIncluded = [...commonIncluded, "One breakfast"];

const englishStays: Record<string, Partial<Stay>> = {
  "nha-ben-ho": {
    name: "Guest House",
    subtitle: "Guest House 001 · up to 10 guests",
    location: "Lakeside",
    badge: "1 Unit · Up to 10 guests",
    description: "A lakeside group house with five medium beds, facing the large lake with pine forest views each morning.",
    longDescription: "Guest House 001 sits directly beside the lake, designed for friends or multigenerational families to gather and unwind.",
    amenities: ["Area: 35 m²", "Five medium beds", "Wardrobe", "En-suite bathroom", "Air conditioning, fan, kettle, hair dryer"],
    highlights: ["35 m² area", "Five medium beds", "Up to 10 guests", "Facing the large lake"],
    idealFor: ["Large groups of friends", "Multigenerational families", "Company retreats"],
    included: commonIncluded,
    stayNotes: ["Unit: Guest House 001", "Max capacity 10 guests"]
  },
  "forest-lake-suite": {
    name: "Forest Lake Suite",
    subtitle: "Forest Lake Suite 006–011 · 6 units",
    location: "Lakeside",
    badge: "6 Units · Breakfast included",
    description: "A full panoramic glass wall opening directly to forest and lake, like a private frame for the boundless sky.",
    longDescription: "Six Forest Lake Suites with floor-to-ceiling glass walls, making the room a vast private haven to breathe and rest.",
    amenities: ["Area: 25 m²", "King-size bed, vanity desk, wardrobe", "En-suite bathroom", "Air conditioning, fan, kettle, hair dryer", "Outdoor seating"],
    highlights: ["6 Forest Lake Suites", "Panoramic glass view", "Complimentary breakfast"],
    idealFor: ["Couples", "Peaceful retreats", "Nature lovers"],
    included: breakfastIncluded,
    stayNotes: ["Six units: 006 to 011", "Complimentary breakfast included"]
  },
  "forest-lake-bathtub-suite": {
    name: "Forest Lake Bathtub Suite",
    subtitle: "Infinity Cabin 014–017 · 4 units",
    location: "Lakeside",
    badge: "4 Units · Soaking bathtub",
    description: "An infinity cabin with two full glass walls opening a 180° view across the lake, mountains and skies.",
    longDescription: "Four Bathtub Suites with 180-degree panoramic glass and a private soaking bathtub with scenic views.",
    amenities: ["Area: 25 m²", "King bed, vanity desk, wardrobe", "Private soaking bathtub", "En-suite bathroom", "Air conditioning, fan, kettle, hair dryer", "Outdoor seating"],
    highlights: ["Private soaking bathtub", "180° corner view", "Complimentary breakfast"],
    idealFor: ["Couples", "Anniversary escapes", "Scenic retreats"],
    included: breakfastIncluded,
    stayNotes: ["Four units: 014 to 017", "Includes private soaking bathtub and breakfast"]
  },
  "lake-suite": {
    name: "Lake Suite",
    subtitle: "An Tru Cabin 004–005 · 2 units",
    location: "Lakeside",
    badge: "2 Units · Breakfast included",
    description: "A tranquil cabin framing the lush green nature through a picture window, designed for quiet pauses.",
    longDescription: "Two Lake Suites designed for silence and deep relaxation, bringing the outdoors into your personal sanctuary.",
    amenities: ["Area: 25 m²", "King bed, vanity desk, wardrobe", "En-suite bathroom", "Air conditioning, fan, kettle, hair dryer", "Outdoor seating"],
    highlights: ["2 Lake Suites", "Landscape picture window", "Complimentary breakfast"],
    idealFor: ["Couples", "Private getaways", "Slow living lovers"],
    included: breakfastIncluded,
    stayNotes: ["Two units: 004 and 005", "Complimentary breakfast included"]
  },
  "bungalow": {
    name: "Bungalow",
    subtitle: "Loft Bungalow 002–003 · 2 units (5–7 guests)",
    location: "Forest",
    badge: "2 Units · 2 floors with loft",
    description: "A warm light-wood bungalow with two floors and a cozy loft, suitable for groups of 5–7 guests.",
    longDescription: "Two loft bungalows facing the lake and surrounded by trees, offering space to bond and rest.",
    amenities: ["2 floors with 1 cozy loft", "Area: 15 m²", "Two queen beds, vanity desk, clothes rack", "En-suite bathroom", "Air conditioning, fan, kettle, hair dryer"],
    highlights: ["2 floors with loft", "Two large beds", "For groups of 5–7"],
    idealFor: ["Families", "Groups of 5–7 friends", "Weekend holidays"],
    included: commonIncluded,
    stayNotes: ["Two units: 002 and 003", "Two levels with wooden loft"]
  },
  "cabin-group": {
    name: "Cabin Group",
    subtitle: "Group Cabin 012–013 · 2 units (up to 14 guests)",
    location: "Forest",
    badge: "2 Units · Up to 14 guests",
    description: "A communal cabin with 7 bunk beds accommodating up to 14 guests, nestled in the heart of pine trees.",
    longDescription: "Two spacious group cabins with four large windows keeping you connected to pine forest scenery.",
    amenities: ["Area: 30 m²", "Seven bunk beds, wardrobe", "En-suite bathroom", "Air conditioning, fan, kettle, hair dryer"],
    highlights: ["Seven bunk beds", "4 picture windows", "For groups up to 14"],
    idealFor: ["Big groups of friends", "Company retreats", "Team building"],
    included: commonIncluded,
    stayNotes: ["Two units: 012 and 013", "Max capacity 14 guests per cabin"]
  },
  "lake-suite-giua-rung": {
    name: "Lake Suite Forest",
    subtitle: "Pine Forest Cabin 018–019 · 2 units",
    location: "Forest",
    badge: "2 Units · Breakfast included",
    description: "A private retreat framed by tall pine trees, giving you peace, stillness and restorative energy.",
    longDescription: "Two Lake Suites nestled in the pine forest, designed for restful pauses with nature.",
    amenities: ["Area: 25 m²", "King bed, vanity desk, wardrobe", "En-suite bathroom", "Air conditioning, fan, kettle, hair dryer", "Outdoor seating"],
    highlights: ["2 Forest Suites", "Pine forest view", "Complimentary breakfast"],
    idealFor: ["Couples", "Solo retreats", "Restful getaways"],
    included: breakfastIncluded,
    stayNotes: ["Two units: 018 and 019", "Complimentary breakfast included"]
  },
  "villa-top-hill": {
    name: "Villa Top Hill",
    subtitle: "Villa Top Hill 020 · 15–20 guests",
    location: "Hilltop",
    badge: "1 Unit · 15–20 guests",
    description: "A secluded hilltop villa with 1 bedroom and 1 living room, overlooking the entire valley for 15–20 guests.",
    longDescription: "Villa 020 is our exclusive hilltop estate with wide panoramic views, spacious outdoor terrace and ample gathering room.",
    amenities: ["1 bedroom & 1 living room", "Area: 35 m²", "Five medium beds, wardrobe, TV, sofa", "En-suite bathroom", "Air conditioning, fan, kettle, hair dryer", "Large outdoor yard"],
    highlights: ["15–20 guests capacity", "1 bedroom + 1 living room", "Panoramic valley view"],
    idealFor: ["Company teams", "Big family reunions", "Groups of 15–20"],
    included: commonIncluded,
    stayNotes: ["One exclusive unit: Villa 020", "Private hilltop position with full view"]
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
  const zone = stayZones.find((item) => item.slug === option.zoneSlug);
  return {
    ...option,
    name: translation.name ?? option.name,
    subtitle: translation.subtitle ?? option.subtitle,
    description: translation.description ?? option.description,
    location: translation.location ?? option.location,
    zoneName: zone?.nameEn ?? option.zoneName,
    badge: translation.badge ?? option.badge,
    highlights: translation.highlights ?? option.highlights
  };
}

export function localizeStayZone<T extends StayZone>(zone: T, locale: ShowcaseLocale): T {
  if (locale === "vi") return zone;
  return { ...zone, name: zone.nameEn, eyebrow: zone.eyebrowEn, description: zone.descriptionEn, experience: zone.experienceEn };
}

export const englishExperienceMoments = [
  { time: "06:30", title: "Wake with the lake", text: "Open the door, make tea and let the first light arrive across the water." },
  { time: "09:00", title: "Choose your own rhythm", text: "Paddle a kayak, walk beneath the pines or simply stay beside the view." },
  { time: "17:30", title: "Meet again outdoors", text: "Share a pickleball game, a swim or a slow coffee as the valley changes colour." },
  { time: "19:00", title: "A table for connection", text: "Dinner, laughter and the kind of conversation that needs no schedule." }
];

export const englishFaqs = [
  ["How is LAKA organised?", "LAKA has eight accommodation types and twenty physical units: lakeside guest houses and bungalows, four named cabin collections, two pine eco camps and one secluded hilltop villa."],
  ["Where is LAKA?", "LAKA is at Doc Day Dieu, Hamlet 1, Thanh Ha, Trung Gia, Hanoi. Contact the team before departure for the most suitable route."],
  ["Which homes have confirmed capacity?", "Guest House 001 accommodates up to 10 guests; Bungalows 002–003 accommodate 5–7 guests each; Group Cabins 012–013 accommodate up to 14 guests each; Top Hill Villa 020 accommodates 15–20 guests. Suite capacities and detailed Eco Camp specifications await final confirmation."],
  ["Are the website images photographs of LAKA?", "The current images are clearly labelled concept references. LAKA's own construction and completed-space photographs will replace them in stages."],
  ["What can guests do at LAKA?", "The source plan includes pedal boats, kayaks, a four-season pool, pickleball, singing, cloud watching and team-building activities. Operating hours and any fees still require confirmation."],
  ["Is food available?", "LAKA includes the Lakeside Restaurant and Tang May Coffee Shop. The website previews planned menu categories; availability and final details are confirmed directly."],
  ["Can I book online now?", "The website currently directs every enquiry to the Contact page. LAKA confirms the suitable unit, availability, price and deposit terms directly before a booking is formed."],
  ["Which details still need confirmation?", "Exact room layouts, selected in-room amenities, check-in and check-out times, pet terms, cancellation rules and operating availability are confirmed directly before the stay."]
] as const;
