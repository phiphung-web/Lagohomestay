import { DienAnhHome } from "@/features/showcase/templates/dien-anh/home";
import { CompleteTemplateSite, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import type { TemplateRoute } from "@/features/showcase/site/template-route";

export const dienAnhConfig: CompleteTemplateConfig = {
  slug: "dien-anh",
  name: "Điện ảnh",
  mood: "cinematic",
  basePath: "/mau/dien-anh",
  background: "#0b190f",
  ink: "#eae1d2",
  accent: "#c7a882",
  surface: "#16311c",
  muted: "#52634f"
};

export function DienAnhSite({ route }: { route: TemplateRoute }) {
  return <CompleteTemplateSite route={route} config={dienAnhConfig} home={<DienAnhHome config={dienAnhConfig} />} />;
}
