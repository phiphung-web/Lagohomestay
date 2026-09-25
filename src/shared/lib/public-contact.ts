export const websiteUtmSource = "laka_website";

export function withWebsiteUtm(href: string, content: string) {
  if (!/^https?:\/\//i.test(href)) return href;

  const url = new URL(href);
  url.searchParams.set("utm_source", websiteUtmSource);
  url.searchParams.set("utm_content", content);
  return url.toString();
}

export const publicContact = {
  phoneDisplay: "0522 3766 88",
  phoneHref: "tel:0522376688",
  zaloHref: withWebsiteUtm("https://zalo.me/0522376688", "zalo"),
  email: "lakahomestay.com@gmail.com",
  emailHref: "mailto:lakahomestay.com@gmail.com",
  address: "Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội",
  googleMapsHref: withWebsiteUtm("https://maps.app.goo.gl/8MpEPu5WjE3Y268L6", "google_maps"),
  facebookHref: withWebsiteUtm("https://www.facebook.com/LAKAHomestay/", "facebook"),
  facebookDisplay: "LAKA Homestay",
  messengerHref: withWebsiteUtm("https://m.me/LAKAHomestay", "messenger"),
  messengerDisplay: "m.me/LAKAHomestay",
  instagramHref: withWebsiteUtm("https://www.instagram.com/lakahomestay/", "instagram"),
  instagramDisplay: "@lakahomestay",
  tiktokHref: withWebsiteUtm("https://www.tiktok.com/@laka.homestay", "tiktok"),
  tiktokDisplay: "@laka.homestay",
} as const;
