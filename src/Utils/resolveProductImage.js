// Scans src/Assets/products/<folder>/*.{jpg,jpeg,png,webp,avif} at build time and
// builds a slug -> image URLs lookup. Add a seed's folder, rebuild, and it is
// picked up automatically — no code changes needed per seed.
const imageModules = import.meta.glob(
  "/src/Assets/products/*/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    import: "default",
  },
);

export function slugify(name = "") {
  return name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const imagesBySlug = {};
Object.keys(imageModules)
  // natural order: img2.jpg comes before img10.jpg
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .forEach((path) => {
    const match = path.match(/\/products\/([^/]+)\//);
    if (!match) return;
    // slugify the folder too, so "Almond" and "almond" folders both work
    (imagesBySlug[slugify(match[1])] ||= []).push(imageModules[path]);
  });

const withoutBrackets = (name) => name.replace(/\([^)]*\)/g, " ");

// Lookup order:
//   1. exact slug of the seed name   "Cashew (W320)" -> cashew-w320/
//   2. slug without the brackets     "Cashew (W320)" -> cashew/
// Returns an array of image URLs, or null when the seed has no folder yet
// (the caller decides the fallback).
export function findProductImages(seedName = "") {
  const images =
    imagesBySlug[slugify(seedName)] ||
    imagesBySlug[slugify(withoutBrackets(seedName))];
  return images && images.length > 0 ? images : null;
}
