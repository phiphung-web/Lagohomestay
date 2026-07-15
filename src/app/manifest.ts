import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lago Homestay",
    short_name: "Lago",
    description: "Bộ sưu tập nhà nghỉ dưỡng riêng tư giữa thiên nhiên.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf6",
    theme_color: "#17312b",
    lang: "vi",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}
