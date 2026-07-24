import { SongDongHome } from "@/features/showcase/templates/song-dong/home";
import { CompleteTemplateSite, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import type { TemplateRoute } from "@/features/showcase/site/template-route";

export const songDongConfig: CompleteTemplateConfig = {
  slug: "song-dong",
  name: "Sống động",
  mood: "organic",
  basePath: "/mau/song-dong",
  background: "#eae1d2",
  ink: "#16311c",
  accent: "#c7a882",
  surface: "#fffdf9",
  muted: "#d9dfc9"
};

export function SongDongSite({ route }: { route: TemplateRoute }) {
  return <CompleteTemplateSite route={route} config={songDongConfig} home={<SongDongHome config={songDongConfig} />} />;
}
