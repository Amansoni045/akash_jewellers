const CATEGORY_ALIASES = {
  rings: ["rings", "ring"],
  necklaces: ["necklaces", "necklace"],
  earrings: ["earrings", "earring"],
  bangles: ["bangles", "bangle", "banlges"],
};

export function normalizeCategory(input) {
  const value = String(input || "").trim().toLowerCase();
  if (!value) return "";

  for (const [canonical, aliases] of Object.entries(CATEGORY_ALIASES)) {
    if (aliases.includes(value)) {
      return canonical;
    }
  }

  return value;
}

export function getCategoryAliases(input) {
  const canonical = normalizeCategory(input);
  if (!canonical) return [];

  return CATEGORY_ALIASES[canonical] || [canonical];
}
