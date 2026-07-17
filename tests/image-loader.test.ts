import { describe, expect, it } from "vitest";
import lagoImageLoader from "@/shared/lib/image-loader";

describe("responsive image loader", () => {
  it("requests the exact responsive width from Unsplash", () => {
    const result = lagoImageLoader({
      src: "https://images.unsplash.com/photo-example?auto=format&fit=crop&w=1800&q=88",
      width: 640,
      quality: 76
    });
    const url = new URL(result);
    expect(url.searchParams.get("w")).toBe("640");
    expect(url.searchParams.get("q")).toBe("76");
    expect(url.searchParams.get("auto")).toBe("format");
  });

  it("caps oversized desktop requests and preserves local assets", () => {
    expect(lagoImageLoader({ src: "https://images.unsplash.com/photo-example", width: 3840 })).toContain("w=2400");
    expect(lagoImageLoader({ src: "/icon.svg", width: 64 })).toBe("/icon.svg");
  });
});
