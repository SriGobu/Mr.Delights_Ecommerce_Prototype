import { findProductImages } from "./resolveProductImage";
import datesImg from "../Assets/dates.jpg";
import nutsImg from "../Assets/nuts.jpg";
import figsImg from "../Assets/figs.jpg";
import seedsImg from "../Assets/seeds.jpg";

const CATEGORY_KEYWORDS = {
  Dates: [
    "date",
    "ajwa",
    "khajur",
    "medjool",
    "mabroom",
    "safawi",
    "raisin",
  ],
  Nuts: [
    "almond",
    "cashew",
    "pista",
    "walnut",
    "hazelnut",
    "macadamia",
    "peanut",
    "nut",
  ],
  Figs: ["fig", "anjeer"],
  Seeds: ["seed", "pumpkin", "sunflower", "chia", "flax", "sesame", "melon"],
};

// Used when a seed has no photo folder yet: show its category image instead of
// an empty placeholder, so the shop never looks broken.
const CATEGORY_IMAGE = {
  Dates: datesImg,
  Nuts: nutsImg,
  Figs: figsImg,
  Seeds: seedsImg,
};

export function categorizeName(name) {
  const lower = name.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) return category;
  }
  return "Seeds";
}

// Takes one parent-seed product from the API:
//   { id, name, description, variants[], minPrice, inStock, createdAt }
// and adds the category + images (images are resolved per parent seed).
export function categorize(seed) {
  const category = categorizeName(seed.name);
  const images = findProductImages(seed.name) || [CATEGORY_IMAGE[category]];
  const defaultVariant =
    seed.variants.find((v) => v.inStock) || seed.variants[0];
  return {
    ...seed,
    category,
    image: images[0],
    images,
    defaultVariantId: defaultVariant.id,
  };
}
