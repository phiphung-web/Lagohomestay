import { stayZones, type Stay, type StayZone } from "@/features/stays/data/demo-data";
import type { AvailabilityOption } from "@/features/booking/domain/availability";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const commonIncluded = ["Guidance choosing the right home for your group", "Direct support by phone and Zalo"];

const englishStays: Record<string, Partial<Stay>> = {
  "nha-ben-ho": {
    name: "Lakeside Guest House", subtitle: "Guest House 001 · 15–20 guests", location: "Lakeside", badge: "For groups of 15–20",
    description: "A large lakeside home for families, groups of friends or company retreats that want to stay together with a full view of the water.",
    longDescription: "Guest House 001 is a large home with a full lake view, designed for 15–20 guests. It gives larger groups a generous shared space where everyone can genuinely spend time together.",
    amenities: ["Full lake view", "Shared space for a large group", "Lakeside position"], highlights: ["15–20 guests", "Full lake view", "Made for groups"],
    idealFor: ["Multigenerational families", "Large groups of friends", "Company retreats"], included: commonIncluded,
    stayNotes: ["Unit 001", "Room plan, amenities and price await LAKA's confirmation"]
  },
  "bungalow-ben-ho": {
    name: "Lakeside Bungalow", subtitle: "Bungalows 002–003 · 6–7 guests each", location: "Lakeside", badge: "Loft bungalow",
    description: "Two large bungalows with lofts and two generous glass windows that bring the lake and landscape inside.",
    longDescription: "Bungalows 002 and 003 are large loft bungalows for 6–7 guests each. Two generous glass windows open broad views, making them suitable for families or small groups close to the lake.",
    amenities: ["Loft", "Two large glass windows", "Generous bungalow layout"], highlights: ["6–7 guests each", "Loft", "Two picture windows"],
    idealFor: ["Families", "Groups of 6–7", "Weekend escapes"], included: commonIncluded,
    stayNotes: ["Two units: 002 and 003", "Detailed amenities and price await LAKA's confirmation"]
  },
  "cabin-an-tru": {
    name: "An Tru Cabin", subtitle: "Lake Suites 004–005 · quiet and private", location: "Facing the lake", badge: "A quiet frame",
    description: "Two cabins that hold the lake in a single picture window, created for quiet and private time.",
    longDescription: "An Tru Cabin includes Lake Suites 004 and 005. Each uses one picture window to frame the landscape, prioritising privacy, calm and a genuine sense of refuge.",
    amenities: ["One picture window", "Quiet setting", "Private position"], highlights: ["Two Lake Suites", "One landscape frame", "Quiet and private"],
    idealFor: ["Couples", "Private escapes", "Guests seeking a slower stay"], included: commonIncluded,
    stayNotes: ["Two units: 004 and 005", "Capacity, amenities and price await LAKA's confirmation"]
  },
  "cabin-khoang-troi": {
    name: "Khoang Troi Cabin", subtitle: "Forest Lake Suites 006–011 · six cabins", location: "In the valley", badge: "A sky of your own",
    description: "A full glass wall opens each cabin to forest, lake and what feels like a private piece of sky.",
    longDescription: "Khoang Troi Cabin includes six Forest Lake Suites, numbered 006 to 011. A full glass wall creates a bright, open feeling and keeps the sky fully in view.",
    amenities: ["One full glass wall", "Forest and lake view", "Bright, open atmosphere"], highlights: ["Six Forest Lake Suites", "Full glass wall", "A private piece of sky"],
    idealFor: ["Couples", "Cabin architecture lovers", "View-led escapes"], included: commonIncluded,
    stayNotes: ["Six units: 006–011", "Capacity, amenities and price await LAKA's confirmation"]
  },
  "cabin-sum-vay": {
    name: "Sum Vay Cabin", subtitle: "Group Cabins 012–013 · 14 guests each", location: "In the valley", badge: "For groups of 14",
    description: "Two bunk-bed cabins for larger groups, with four picture windows keeping the gathering connected to nature.",
    longDescription: "Sum Vay Cabin includes Group Cabins 012 and 013, for 14 guests each. Bunk beds support larger groups while four windows keep the shared space open to the landscape.",
    amenities: ["Bunk-bed layout", "Four windows", "Shared space for large groups"], highlights: ["14 guests each", "Two group cabins", "Four picture windows"],
    idealFor: ["Large groups of friends", "Company retreats", "Team building"], included: commonIncluded,
    stayNotes: ["Two units: 012 and 013", "Bed count, amenities and price await LAKA's confirmation"]
  },
  "cabin-vo-cuc": {
    name: "Vo Cuc Cabin", subtitle: "Forest Lake Bathtub Suites 014–017 · four cabins", location: "Forest and lake", badge: "180-degree view",
    description: "Two full glass walls open a 180-degree view across forest and lake, making the space feel almost infinite.",
    longDescription: "Vo Cuc Cabin includes four Forest Lake Bathtub Suites, numbered 014 to 017. Two full glass walls create a 180-degree view and an open, almost infinite feeling; LAKA's source material also identifies these as bathtub suites.",
    amenities: ["Two full glass walls", "180-degree view", "Bathtub-suite category"], highlights: ["Four bathtub suites", "180-degree view", "Two glass walls"],
    idealFor: ["Couples", "Anniversary stays", "View-first travellers"], included: commonIncluded,
    stayNotes: ["Four units: 014–017", "Capacity, bathtub specification and price await LAKA's confirmation"]
  },
  "nha-thong-reo": {
    name: "Thong Reo Eco Camp", subtitle: "Eco Camps 018–019 · 1–2 guests each", location: "Pine forest", badge: "Closest to the pines",
    description: "Two low timber bungalows tucked in front of the pine forest, compact and elemental for one or two guests.",
    longDescription: "Thong Reo includes Eco Camps 018 and 019. These low timber bungalows are made for 1–2 guests and do not use large glass walls; the pine forest rises directly behind them for a more elemental nature stay.",
    amenities: ["Low timber bungalow", "Pine forest directly behind", "No oversized glass walls"], highlights: ["1–2 guests each", "Two Eco Camps", "Beneath the pines"],
    idealFor: ["Solo travellers", "Couples", "Guests who prefer a rustic stay"], included: commonIncluded,
    stayNotes: ["Two units: 018 and 019", "Amenities, bathroom arrangement and price await LAKA's confirmation"]
  },
  "nha-tren-doi": {
    name: "Top Hill Villa", subtitle: "Villa 020 · 15–20 guests", location: "Hilltop", badge: "LAKA panorama",
    description: "A secluded hilltop home overlooking the full valley, lake and mountains for a group that wants space of its own.",
    longDescription: "Top Hill Villa 020 is a secluded hilltop home for 15–20 guests. It looks across the entire valley, lake and mountains—a group stay that still feels separate and private.",
    amenities: ["Secluded hilltop position", "Valley, lake and mountain panorama", "Shared space for a large group"], highlights: ["15–20 guests", "Top Hill Villa", "Full valley view"],
    idealFor: ["Company retreats", "Large families", "Large groups of friends"], included: commonIncluded,
    stayNotes: ["One unit: 020", "Room plan, amenities and price await LAKA's confirmation"]
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
  ["Which homes have confirmed capacity?", "Guest House 001 and Top Hill Villa 020 are for 15–20 guests; Bungalows 002–003 are for 6–7 guests each; Group Cabins 012–013 are for 14 guests each; Eco Camps 018–019 are for 1–2 guests each. Other capacities await final confirmation."],
  ["Are the website images photographs of LAKA?", "The current images are clearly labelled concept references. LAKA's own construction and completed-space photographs will replace them in stages."],
  ["What can guests do at LAKA?", "The source plan includes pedal boats, kayaks, a four-season pool, pickleball, singing, cloud watching and team-building activities. Operating hours and any fees still require confirmation."],
  ["Is food available?", "LAKA's plan includes the Lakeside Restaurant, Tang May Coffee Shop and Hien Gio Bar. Menus, prices and opening hours are still being finalised."],
  ["Can I book online now?", "The website currently records an enquiry. LAKA confirms the suitable unit, availability, price and deposit terms directly by phone or Zalo before a booking is formed."],
  ["Which details still need confirmation?", "Prices, exact room layouts, detailed in-room amenities, check-in and check-out times, pet terms, cancellation rules and selected service fees are not yet published as confirmed facts."]
] as const;
