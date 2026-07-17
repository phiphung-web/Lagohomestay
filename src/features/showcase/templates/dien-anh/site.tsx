import { DienAnhHome } from "@/features/showcase/templates/dien-anh/home";
import { CompleteTemplateSite, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import type { TemplateRoute } from "@/features/showcase/site/template-route";

export const dienAnhConfig: CompleteTemplateConfig = {
  slug: "dien-anh",
  name: "Điện ảnh",
  mood: "cinematic",
  basePath: "/mau/dien-anh",
  background: "#07130f",
  ink: "#f7f3e8",
  accent: "#e5c59c",
  surface: "#0d211a",
  muted: "#48645a"
};

export function DienAnhSite({ route }: { route: TemplateRoute }) {
  return <CompleteTemplateSite route={route} config={dienAnhConfig} home={<DienAnhHome config={dienAnhConfig} />} />;
}
