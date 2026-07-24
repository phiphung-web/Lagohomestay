import { stayZones, type Stay, type StayZone } from "@/features/stays/data/demo-data";
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
    highlights: ["Lake view", "Private BBQ terrace", "Made for connection"],
    idealFor: ["Groups of 6–8", "Multigenerational families", "Small birthdays and reunions"],
    included: ["Welcome drinks", "Kitchen and basic cookware", "Towels and basic toiletries", "Phone and Zalo support"],
    stayNotes: ["Three bedrooms and four beds", "Reserve the barbecue area ahead", "Quiet hours after 10 pm"]
  },
  "nha-may": {
    name: "Cloud House",
    subtitle: "A small home above the trees · for two",
    description: "A quiet home where clouds drift past the window and mornings begin with soft light.",
    longDescription: "Cloud House is for two people who want to disappear from the everyday. Full-height windows open to the canopy, the bath sits beside the view, and a private terrace holds just enough room for two cups of tea at sunset.",
    location: "Hillside",
    badge: "Most romantic",
    amenities: ["Forest-view bath", "Private terrace", "Projector", "Air conditioning", "Kitchenette", "Wi-Fi", "Optional breakfast"],
    highlights: ["Private for two", "Forest-view bath", "Sunrise view"],
    idealFor: ["Couples", "Private anniversaries", "Solo retreats"],
    included: ["Welcome drinks", "Kitchenette essentials", "Towels and basic toiletries", "Phone and Zalo support"],
    stayNotes: ["One bedroom and one bed", "Not suitable for larger groups", "Breakfast is optional"]
  },
  "nha-rung": {
    name: "Forest House",
    subtitle: "Beneath the canopy · for families",
    description: "Warm timber interiors embrace a private garden, bringing the whole family close to nature without giving up comfort.",
    longDescription: "Forest House rests under mature trees, with a full family kitchen, an enclosed garden and two warm bedrooms. Children have room to explore while adults can linger on the veranda.",
    location: "Forest garden",
    badge: "Family friendly",
    amenities: ["Private garden", "Family kitchen", "Outdoor dining table", "Children’s essentials", "Air conditioning", "Wi-Fi", "Parking"],
    highlights: ["Private garden", "Family friendly", "Two bedrooms"],
    idealFor: ["Families with children", "Groups of 4–5", "Multigenerational stays"],
    included: ["Welcome drinks", "Family kitchen essentials", "Children’s kit by request", "Phone and Zalo support"],
    stayNotes: ["Two bedrooms and three beds", "Private enclosed garden", "Request children’s items ahead"]
  },
  "nha-doi": {
    name: "Hill House",
    subtitle: "Open valley views · for longer stays",
    description: "A light-filled home with a private studio, a generous terrace and an open view across the valley.",
    longDescription: "Hill House is made for staying longer than a weekend. A valley-facing workspace, airy kitchen and generous terrace let you change your pace while keeping your focus when needed.",
    location: "Hilltop",
    badge: "New",
    amenities: ["Private work studio", "Sunset terrace", "Full kitchen", "Washing machine", "Air conditioning", "High-speed Wi-Fi", "Parking"],
    highlights: ["Valley view", "Workation ready", "Sunset terrace"],
    idealFor: ["Stays of 3–7 nights", "Workations", "Small groups needing quiet zones"],
    included: ["Welcome drinks", "Kitchen and basic cookware", "Workspace and Wi-Fi", "Phone and Zalo support"],
    stayNotes: ["Two bedrooms and three beds", "Separate work area", "Designed for longer stays"]
  },
  "nha-ben": {
    name: "Wharf House",
    subtitle: "At the water's edge · for small families",
    description: "A low lakeside home with its own timber jetty and an open living room facing the water.",
    longDescription: "Wharf House occupies one of LAKA's calmest stretches of water. Two bedrooms open towards a shared veranda, while the connected kitchen, dining area and small timber jetty keep the family close to the lake.",
    location: "Lake wharf",
    badge: "Closest to the water",
    amenities: ["Private timber jetty", "Waterside veranda", "Family kitchen", "Dining table for six", "Air conditioning", "Wi-Fi", "Parking", "Life jackets by request"],
    highlights: ["Private lake jetty", "Two bedrooms", "Breakfast on the veranda"],
    idealFor: ["Families of 3–5", "Small groups of friends", "Stays with older children"],
    included: ["Welcome drinks", "Kitchen and basic cookware", "Towels and basic toiletries", "Phone and Zalo support"],
    stayNotes: ["Two bedrooms and three beds", "Children require supervision near the lake", "No amplified outdoor activities"]
  },
  "nha-say": {
    name: "Reed House",
    subtitle: "A veranda beyond the reeds · for two",
    description: "A private studio behind the reeds, with wide glazing, an indoor bath and a reading corner facing the lake.",
    longDescription: "Reed House is for two people who want to hear water and wind more than conversation. A compact studio, a bath beside the view and a secluded veranda allow the day to unfold slowly.",
    location: "Reed bank",
    badge: "Made for two",
    amenities: ["Indoor bath", "Private reed-side veranda", "Reading corner", "Kitchenette", "Air conditioning", "Wi-Fi", "Mini fridge"],
    highlights: ["Private for two", "Lake-view bath", "Open studio"],
    idealFor: ["Couples", "Private anniversaries", "Solo retreats"],
    included: ["Welcome drinks", "Tea and coffee", "Towels and basic toiletries", "Phone and Zalo support"],
    stayNotes: ["One double bed", "No additional bed", "The reed-garden path is softly lit"]
  },
  "cabin-thong": {
    name: "Pine Cabin",
    subtitle: "A timber cabin in the forest · for two",
    description: "A compact cabin with a bed beside the glass, a suspended forest veranda and a private outdoor soaking pool.",
    longDescription: "Pine Cabin keeps everything beautifully simple: one forest-facing bed, an ensuite bathroom, a timber veranda and a private soaking pool. Three cabins share the same design while remaining carefully spaced apart.",
    location: "Forest slope",
    badge: "Private soaking pool",
    amenities: ["Outdoor soaking pool", "Private timber veranda", "Forest-facing bed", "Ensuite bathroom", "Air conditioning", "Mini fridge", "Wi-Fi"],
    highlights: ["Private soaking pool", "Bed beside the glass", "Three secluded cabins"],
    idealFor: ["Couples", "Short escapes", "Cabin lovers"],
    included: ["Welcome drinks", "Tea and coffee", "Towels and robes", "Phone and Zalo support"],
    stayNotes: ["Three equivalent cabins in different positions", "A short sloped forest path", "Soaking pool use depends on weather"]
  },
  "nha-to": {
    name: "Nest House",
    subtitle: "Two storeys beneath the trees · for small groups",
    description: "A two-storey home with a shared lounge, boardgame corner and a private garden for friends or families.",
    longDescription: "Nest House gives the ground floor to meals, boardgames and long conversations; two quieter bedrooms sit above the canopy line. Its private garden brings everyone close to the forest without losing the comforts of a complete home.",
    location: "Forest heart",
    badge: "For small groups",
    amenities: ["Shared living room", "Boardgames", "Full kitchen", "Private garden", "Outdoor dining", "Air conditioning", "Wi-Fi", "Parking"],
    highlights: ["Two-storey home", "Boardgame corner", "Private forest garden"],
    idealFor: ["Groups of 4–6", "Families with older children", "Two small families"],
    included: ["Welcome drinks", "Kitchen and basic cookware", "Curated boardgames", "Phone and Zalo support"],
    stayNotes: ["Two bedrooms and four beds", "Internal staircase", "Quiet garden hours after 10 pm"]
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
  return {
    ...zone,
    name: zone.nameEn,
    eyebrow: zone.eyebrowEn,
    description: zone.descriptionEn,
    experience: zone.experienceEn
  };
}

export const englishExperienceMoments = [
  { time: "06:30", title: "Wake with the light", text: "Open the door, make tea and let the morning begin at your own pace." },
  { time: "09:00", title: "An unhurried pause", text: "Read a few pages, wander beneath the trees or simply do nothing at all." },
  { time: "18:30", title: "A dinner that lingers", text: "Every home has its own kitchen and dining table for stories that deserve more time." },
  { time: "21:00", title: "A quiet night by the water", text: "Warm light, moving leaves and darkness deep enough for genuine rest." }
];

export const englishFaqs = [
  ["How is LAKA organised?", "The concept includes Lake, Forest and Hill collections, containing eight home types and fifteen physical homes for couples, families and groups of up to eight."],
  ["Do I need to pay immediately?", "No. Your request is held for two hours while the LAKA team confirms it by phone or Zalo."],
  ["Is each home completely private?", "Yes. Your group has the entire home and does not share living areas with other guests."],
  ["Is the displayed price final?", "The system estimates the price using your dates and guest count. LAKA confirms the final amount when contacting you."],
  ["What are the arrival and departure times?", "Concept hours are check-in from 2 pm and check-out by 11 am. Final times and directions are shared before arrival."],
  ["Are breakfast and dining available?", "The concept proposes breakfast hampers, seasonal menus and in-home barbecues. Actual services, menus and prices require operating approval."],
  ["Can children stay at LAKA?", "Yes. Forest House and LAKA House are positioned for families. Child pricing and equipment will be confirmed when booking."],
  ["May I bring a pet?", "Pet terms depend on the selected home and current operating conditions. Please let LAKA know in advance."],
  ["Is parking or a transfer available?", "The concept includes parking guidance for each home. Transfers remain a proposed service and are not yet a confirmed commitment."],
  ["Can LAKA arrange a birthday or anniversary?", "You may request a small set-up, private dinner, cake or flowers. LAKA confirms availability, price and quiet-hour limits."],
  ["What if I arrive late?", "Please notify LAKA by phone or Zalo. The team will suggest an arrival arrangement based on actual operating conditions."],
  ["Which details are still illustrative?", "Images, prices, address, menus, arrival times and selected services currently support the concept presentation and require approval before launch."]
] as const;
