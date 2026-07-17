import { TinhLangHome } from "@/features/showcase/templates/tinh-lang/home";
import { CompleteTemplateSite, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import type { TemplateRoute } from "@/features/showcase/site/template-route";

export const tinhLangConfig: CompleteTemplateConfig = {
  slug: "tinh-lang",
  name: "Tĩnh lặng",
  mood: "editorial",
  basePath: "/mau/tinh-lang",
  background: "#f3eee5",
  ink: "#19322c",
  accent: "#a36349",
  surface: "#ebe3d7",
  muted: "#d8cdbf"
};

export function TinhLangSite({ route }: { route: TemplateRoute }) {
  return <CompleteTemplateSite route={route} config={tinhLangConfig} home={<TinhLangHome config={tinhLangConfig} />} />;
}
