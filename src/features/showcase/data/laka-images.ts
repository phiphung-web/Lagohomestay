const root = "/images/laka";

export const lakaImages = {
  home: {
    hero: {
      desktop: `${root}/home/hero-desktop.webp`,
      mobile: `${root}/home/hero-mobile.webp`,
    },
    mission: `${root}/home/mission.webp`,
    stays: {
      lakeside: `${root}/home/stay-lakeside.webp`,
      forest: `${root}/stays/bungalow/cover.webp`,
      hilltop: `${root}/stays/villa-top-hill/cover.webp`,
    },
    dining: {
      restaurant: `${root}/home/dining-restaurant.webp`,
      coffee: `${root}/home/dining-coffee.webp`,
    },
    journey: {
      pickleball: `${root}/home/journey-pickleball.webp`,
      kayak: `${root}/home/journey-kayak.webp`,
      pool: `${root}/home/journey-pool.webp`,
      bicycle: `${root}/home/journey-bicycle.webp`,
    },
    gallery: Array.from(
      { length: 9 },
      (_, index) => `${root}/home/gallery-${String(index + 1).padStart(2, "0")}.webp`,
    ),
  },
  stays: {
    forestLakeSuite: {
      cover: `${root}/stays/forest-lake-suite/cover.webp`,
      gallery: [
        `${root}/stays/forest-lake-suite/lake-view.webp`,
        `${root}/stays/forest-lake-suite/room.webp`,
        `${root}/stays/forest-lake-suite/amenities.webp`,
      ],
    },
    bathtubSuite: {
      cover: `${root}/stays/bathtub-suite/cover.webp`,
      gallery: [
        `${root}/stays/bathtub-suite/bathtub-view.webp`,
        `${root}/stays/bathtub-suite/room.webp`,
        `${root}/stays/bathtub-suite/cover.webp`,
      ],
    },
    lakeSuite: {
      cover: `${root}/stays/lake-suite/cover.webp`,
      gallery: [
        `${root}/stays/lake-suite/window-view.webp`,
        `${root}/stays/lake-suite/room.webp`,
        `${root}/stays/lake-suite/bed.webp`,
      ],
    },
    bungalow: {
      cover: `${root}/stays/bungalow/cover.webp`,
      gallery: [
        `${root}/stays/bungalow/bedroom.webp`,
        `${root}/stays/bungalow/window-view.webp`,
        `${root}/stays/bungalow/room.webp`,
        `${root}/stays/bungalow/loft.webp`,
        `${root}/stays/bungalow/bathroom.webp`,
        `${root}/stays/bungalow/brand-detail.webp`,
      ],
    },
    villaTopHill: {
      cover: `${root}/stays/villa-top-hill/cover.webp`,
      gallery: [
        `${root}/stays/villa-top-hill/bedroom.webp`,
        `${root}/stays/villa-top-hill/group-room.webp`,
        `${root}/stays/villa-top-hill/forest-view.webp`,
      ],
    },
  },
  experiences: {
    banner: `${root}/experiences/banner.webp`,
    bannerCard: `${root}/experiences/banner-card.webp`,
    pickleball: `${root}/experiences/pickleball.webp`,
    kayak: `${root}/experiences/kayak.webp`,
    pool: `${root}/experiences/pool.webp`,
    bicycle: `${root}/experiences/bicycle.webp`,
    boardGames: `${root}/experiences/board-games.webp`,
    billiards: `${root}/experiences/billiards.webp`,
  },
  services: {
    banner: `${root}/services/banner.webp`,
    bannerCard: `${root}/services/banner-card.webp`,
    teamBuilding: `${root}/services/team-building.webp`,
    outdoorEvent: `${root}/services/outdoor-event.webp`,
    campfire: `${root}/services/campfire.webp`,
  },
} as const;

export function isConceptImage(source: string) {
  return source.startsWith("https://images.unsplash.com/");
}
