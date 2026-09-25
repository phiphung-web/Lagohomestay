import { describe, expect, it } from "vitest";
import { publicContact, websiteUtmSource, withWebsiteUtm } from "@/shared/lib/public-contact";

const trackedContactLinks = [
  ["zalo", publicContact.zaloHref],
  ["google_maps", publicContact.googleMapsHref],
  ["facebook", publicContact.facebookHref],
  ["messenger", publicContact.messengerHref],
  ["instagram", publicContact.instagramHref],
  ["tiktok", publicContact.tiktokHref],
] as const;

describe("public contact UTM tracking", () => {
  it.each(trackedContactLinks)("marks the %s link as coming from the website", (channel, href) => {
    const url = new URL(href);

    expect(url.searchParams.get("utm_source")).toBe(websiteUtmSource);
    expect(url.searchParams.get("utm_content")).toBe(channel);
    expect([...url.searchParams.keys()]).toEqual(["utm_source", "utm_content"]);
  });

  it("does not alter phone or email protocols", () => {
    expect(withWebsiteUtm(publicContact.phoneHref, "phone")).toBe("tel:0522376688");
    expect(withWebsiteUtm(publicContact.emailHref, "email")).toBe(
      "mailto:lakahomestay.com@gmail.com",
    );
  });

  it("preserves existing parameters and hashes", () => {
    const url = new URL(
      withWebsiteUtm("https://example.com/contact?ref=homepage#booking", "test_link"),
    );

    expect(url.searchParams.get("ref")).toBe("homepage");
    expect(url.searchParams.get("utm_source")).toBe(websiteUtmSource);
    expect(url.searchParams.get("utm_content")).toBe("test_link");
    expect(url.hash).toBe("#booking");
  });
});
