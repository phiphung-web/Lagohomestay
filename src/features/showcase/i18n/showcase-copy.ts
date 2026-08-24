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
    name: "Lakeside Guest House", subtitle: "Guest House 001 · up to 10 guests", location: "Lakeside", badge: "For groups of up to 10",
    description: "A shared lakeside home with five medium beds for families or groups who want to stay together with a full view of the water.",
    longDescription: "Guest House 001 sits beside the large lake, with hills and pine forest in view each morning. Its 35 m² layout and five medium beds accommodate up to ten guests.",
    amenities: ["Five medium beds", "Private bathroom", "Air conditioning, fan and kettle", "Hair dryer", "Wardrobe"], highlights: ["Up to 10 guests", "Facing the large lake", "Five medium beds"],
    idealFor: ["Multigenerational families", "Large groups of friends", "Company retreats"], included: commonIncluded,
    stayNotes: ["Unit 001", "Operating availability is confirmed directly by LAKA"]
  },
  "bungalow-ben-ho": {
    name: "Lakeside Bungalow", subtitle: "Bungalows 002–003 · 5–7 guests each", location: "Lakeside", badge: "Loft bungalow",
    description: "Two light-timber loft bungalows facing the large lake, made for groups of five to seven.",
    longDescription: "Bungalows 002 and 003 are two-level homes with a loft, directly facing the large lake. Each 15 m² bungalow has two large beds and space for a group of five to seven.",
    amenities: ["Two levels with one loft", "Two large beds", "Dressing table", "Clothes rack", "Private bathroom", "Essential equipment"], highlights: ["5–7 guests each", "Loft", "Facing the large lake"],
    idealFor: ["Families", "Groups of 6–7", "Weekend escapes"], included: commonIncluded,
    stayNotes: ["Two units: 002 and 003", "Operating availability is confirmed directly by LAKA"]
  },
  "cabin-an-tru": {
    name: "An Tru Cabin", subtitle: "Lake Suites 004–005 · quiet and private", location: "Facing the lake", badge: "A quiet frame",
    description: "Two cabins that hold the lake in a single picture window, created for quiet and private time.",
    longDescription: "An Tru Cabin includes Lake Suites 004 and 005. Each uses one picture window to frame the landscape, prioritising privacy, calm and a genuine sense of refuge.",
    amenities: ["One large bed", "Outdoor seating", "Dressing table", "Private bathroom"], highlights: ["Two Lake Suites", "One landscape frame", "Quiet and private"],
    idealFor: ["Couples", "Private escapes", "Guests seeking a slower stay"], included: breakfastIncluded,
    stayNotes: ["Two units: 004 and 005", "Capacity is confirmed directly by LAKA"]
  },
  "cabin-khoang-troi": {
    name: "Khoang Troi Cabin", subtitle: "Forest Lake Suites 006–011 · six cabins", location: "In the valley", badge: "A sky of your own",
    description: "A full glass wall opens each cabin to forest, lake and what feels like a private piece of sky.",
    longDescription: "Khoang Troi Cabin includes six Forest Lake Suites, numbered 006 to 011. A full glass wall creates a bright, open feeling and keeps the sky fully in view.",
    amenities: ["Large panoramic glazing", "One large bed", "Outdoor seating", "Private bathroom"], highlights: ["Six Forest Lake Suites", "Full glass wall", "A private piece of sky"],
    idealFor: ["Couples", "Cabin architecture lovers", "View-led escapes"], included: breakfastIncluded,
    stayNotes: ["Six units: 006–011", "Capacity is confirmed directly by LAKA"]
  },
  "cabin-sum-vay": {
    name: "Sum Vay Cabin", subtitle: "Group Cabins 012–013 · 14 guests each", location: "In the valley", badge: "For groups of 14",
    description: "Two bunk-bed cabins for larger groups, with four picture windows keeping the gathering connected to nature.",
    longDescription: "Sum Vay Cabin includes Group Cabins 012 and 013, for 14 guests each. Bunk beds support larger groups while four windows keep the shared space open to the landscape.",
    amenities: ["Seven bunk beds", "Four windows overlooking the pine forest", "Private bathroom", "Shared space for large groups"], highlights: ["14 guests each", "Two group cabins", "Seven bunk beds"],
    idealFor: ["Large groups of friends", "Company retreats", "Team building"], included: commonIncluded,
    stayNotes: ["Two units: 012 and 013", "Operating availability is confirmed directly by LAKA"]
  },
  "cabin-vo-cuc": {
    name: "Vo Cuc Cabin", subtitle: "Forest Lake Bathtub Suites 014–017 · four cabins", location: "Forest and lake", badge: "180-degree view",
    description: "Two full glass walls open a 180-degree view across forest and lake, making the space feel almost infinite.",
    longDescription: "Vo Cuc Cabin includes four Forest Lake Bathtub Suites, numbered 014 to 017. Two full glass walls create a 180-degree view and an open, almost infinite feeling; LAKA's source material also identifies these as bathtub suites.",
    amenities: ["180-degree corner glazing", "Private soaking bathtub", "One large bed", "Outdoor seating", "Private bathroom"], highlights: ["Four bathtub suites", "180-degree view", "Two glass walls"],
    idealFor: ["Couples", "Anniversary stays", "View-first travellers"], included: breakfastIncluded,
    stayNotes: ["Four units: 014–017", "Capacity is confirmed directly by LAKA"]
  },
  "nha-thong-reo": {
    name: "Thong Reo Eco Camp", subtitle: "Eco Camps 018–019 · details being confirmed", location: "Pine forest", badge: "Details being confirmed",
    description: "Two Eco Camps near the pine forest; capacity, specifications and detailed amenities are being confirmed before publication.",
    longDescription: "Thong Reo includes Eco Camps 018 and 019 in LAKA's twenty-unit collection. The owner has not yet approved detailed specifications, so the website does not use this type for capacity or amenity advice.",
    amenities: ["Two Eco Camps: 018 and 019", "Near the pine forest", "Detailed specifications awaiting approval"], highlights: ["Two Eco Camps", "Pine forest area", "Details in progress"],
    idealFor: ["Guests who need direct advice from LAKA"], included: commonIncluded,
    stayNotes: ["Two units: 018 and 019", "Detailed amenities are confirmed directly by LAKA"]
  },
  "nha-tren-doi": {
    name: "Top Hill Villa", subtitle: "Villa 020 · 15–20 guests", location: "Hilltop", badge: "LAKA panorama",
    description: "A secluded hilltop home overlooking the full valley, lake and mountains for a group that wants space of its own.",
    longDescription: "Top Hill Villa 020 is a secluded hilltop home for 15–20 guests. It looks across the entire valley, lake and mountains—a group stay that still feels separate and private.",
    amenities: ["One bedroom and one living room", "Five medium beds", "Private bathroom", "Television and sofa", "Large outdoor yard"], highlights: ["15–20 guests", "Top Hill Villa", "Full valley view"],
    idealFor: ["Company retreats", "Large families", "Large groups of friends"], included: commonIncluded,
    stayNotes: ["One unit: 020", "Capacity and operating availability are confirmed directly by LAKA"]
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
