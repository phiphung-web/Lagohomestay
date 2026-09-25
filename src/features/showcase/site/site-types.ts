export type SiteMood = "editorial" | "cinematic" | "organic";

export type SiteConfig = {
  slug: "main";
  name: string;
  mood: SiteMood;
  basePath: string;
  background: string;
  ink: string;
  accent: string;
  surface: string;
  muted: string;
};
