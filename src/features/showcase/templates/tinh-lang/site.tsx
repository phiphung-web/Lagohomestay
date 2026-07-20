import { TinhLangHome } from "@/features/showcase/templates/tinh-lang/home";
import { CompleteTemplateSite, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import type { TemplateRoute } from "@/features/showcase/site/template-route";

export const tinhLangConfig: CompleteTemplateConfig = {
  slug: "tinh-lang",
  name: "Tĩnh lặng",
  mood: "editorial",
  basePath: "/mau/tinh-lang",
  background: "#faf3ea",
  ink: "#17321d",
  accent: "#c7a882",
  surface: "#e7ded1",
  muted: "#d4c7b6"
};

export function TinhLangSite({ route }: { route: TemplateRoute }) {
  return <CompleteTemplateSite route={route} config={tinhLangConfig} home={<TinhLangHome config={tinhLangConfig} />} />;
}
