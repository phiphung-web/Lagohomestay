import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LAKA Homestay",
    short_name: "LAKA",
    description: "Bộ sưu tập nhà nghỉ dưỡng riêng tư giữa thiên nhiên.",
    start_url: "/",
    display: "standalone",
    background_color: "#eae1d2",
    theme_color: "#16311c",
    lang: "vi",
    icons: [{ src: "/brand/laka-icon.png", sizes: "1330x1330", type: "image/png" }]
  };
}
