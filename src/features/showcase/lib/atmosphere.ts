export type AppearanceMode = "day" | "night";

export const DEFAULT_APPEARANCE: AppearanceMode = "day";

export function normalizeAppearance(value: string | null | undefined): AppearanceMode {
  return value === "night" ? "night" : DEFAULT_APPEARANCE;
}

export function toggleAppearance(mode: AppearanceMode): AppearanceMode {
  return mode === "day" ? "night" : "day";
}
