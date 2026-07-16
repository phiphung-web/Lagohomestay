import { SongDongHome } from "@/features/showcase/templates/song-dong/home";
import { CompleteTemplateSite, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import type { TemplateRoute } from "@/features/showcase/site/template-route";

export const songDongConfig: CompleteTemplateConfig = {
  slug: "song-dong",
  name: "Sống động",
  mood: "organic",
  basePath: "/mau/song-dong",
  background: "#edf3df",
  ink: "#21483d",
  accent: "#e66e4c",
  surface: "#ffffff",
  muted: "#c9d8b4"
};

export function SongDongSite({ route }: { route: TemplateRoute }) {
  return <CompleteTemplateSite route={route} config={songDongConfig} home={<SongDongHome />} />;
}
