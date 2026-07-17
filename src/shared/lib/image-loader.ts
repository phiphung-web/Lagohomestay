type LoaderProps = { src: string; width: number; quality?: number };

export default function lagoImageLoader({ src, width, quality }: LoaderProps) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;

  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(Math.min(width, 2400)));
  url.searchParams.set("q", String(quality ?? 78));
  return url.toString();
}
