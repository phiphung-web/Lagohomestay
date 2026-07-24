export const LAKA_TIME_ZONE = "Asia/Ho_Chi_Minh";

export type AtmosphereMode = "auto" | "dawn" | "day" | "sunset" | "night";
export type ActiveAtmosphere = Exclude<AtmosphereMode, "auto">;

export function getHourInTimeZone(date = new Date(), timeZone = LAKA_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);
  return Number(parts.find((part) => part.type === "hour")?.value ?? 12);
}

export function getAutomaticAtmosphere(hour: number): ActiveAtmosphere {
  const normalizedHour = ((Math.trunc(hour) % 24) + 24) % 24;
  if (normalizedHour >= 5 && normalizedHour < 8) return "dawn";
  if (normalizedHour >= 8 && normalizedHour < 17) return "day";
  if (normalizedHour >= 17 && normalizedHour < 19) return "sunset";
  return "night";
}

export function resolveAtmosphere(mode: AtmosphereMode, hour: number): ActiveAtmosphere {
  return mode === "auto" ? getAutomaticAtmosphere(hour) : mode;
}

export function atmosphereToDayPeriod(atmosphere: ActiveAtmosphere) {
  if (atmosphere === "dawn") return "morning" as const;
  if (atmosphere === "day") return "day" as const;
  if (atmosphere === "sunset") return "evening" as const;
  return "night" as const;
}
