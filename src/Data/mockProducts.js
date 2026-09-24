// Mock catalogue for the prototype. It has exactly the shape the real
// storefront API returned, so the rest of the app (store, categorizer,
// cards, cart) is unchanged:
//   { id, name, description, variants: [{ id, weight, price, inStock }],
//     minPrice, inStock, createdAt }
//
// Images are NOT listed here. They are matched automatically by seed name from
// src/Assets/products/<slug>/ (see Utils/resolveProductImage.js).
import { slugify } from "../Utils/resolveProductImage";

const seed = (name, description, sizes, createdAt) => {
  const id = slugify(name);
  const variants = sizes.map(([weight, price, inStock = true]) => ({
    id: `${id}-${weight.toLowerCase()}`,
    weight,
    price,
    inStock,
  }));
  return {
    id,
    name,
    description,
    variants,
    minPrice: Math.min(...variants.map((v) => v.price)),
    inStock: variants.some((v) => v.inStock),
    createdAt: Date.parse(createdAt),
  };
};

export const MOCK_PRODUCTS = [
  seed(
    "Almond",
    "Crisp, naturally sweet California almonds. Rich in vitamin E and perfect for snacking, baking or soaking overnight.",
    [["250g", 245], ["500g", 480], ["1kg", 940]],
    "2026-08-20",
  ),
  seed(
    "Medjool Dates",
    "Plump, caramel-soft Medjool dates with a honeyed finish. Nature's luxury dessert, straight from the palm.",
    [["250g", 380], ["500g", 740], ["1kg", 1420]],
    "2026-08-18",
  ),
  seed(
    "Pistachio",
    "Lightly roasted, lightly salted pistachios with a vivid green kernel and a gentle, buttery crunch.",
    [["100g", 175], ["250g", 430], ["500g", 840]],
    "2026-08-16",
  ),
  seed(
    "Cashew (W320)",
    "Whole, creamy W320-grade cashews — large, pale and buttery. Ideal for gifting, curries and desserts.",
    [["250g", 260], ["500g", 505], ["1kg", 990]],
    "2026-08-14",
  ),
  seed(
    "Walnut",
    "Light-amber walnut kernels with a mild, slightly sweet flavour. A brain-food classic for breakfast bowls and baking.",
    [["250g", 290], ["500g", 570], ["1kg", 1120]],
    "2026-08-12",
  ),
  seed(
    "Fig",
    "Sun-dried figs, naturally sweet and tender with a delicate seeded crunch. Delicious on their own or with cheese.",
    [["250g", 320], ["500g", 620]],
    "2026-08-10",
  ),
  seed(
    "Black Raisin",
    "Seedless black raisins with a deep, tangy sweetness. Stir into porridge, biryani or trail mix.",
    [["250g", 130], ["500g", 250], ["1kg", 480]],
    "2026-08-08",
  ),
  seed(
    "Yellow Raisin",
    "Golden, juicy raisins with a light, honeyed flavour. A bright finishing touch for payasam and cakes.",
    [["250g", 140], ["500g", 270], ["1kg", 520]],
    "2026-08-06",
  ),
  seed(
    "Ajwa Dates",
    "Soft, dark Ajwa dates from Madinah — prized for their rich, slightly tart sweetness and cherished as a gift.",
    [["250g", 450], ["500g", 880], ["1kg", 1700, false]],
    "2026-08-04",
  ),
  seed(
    "Safawi Dates",
    "Semi-dry, chewy Safawi dates with a mellow, molasses-like sweetness. A family favourite for every day.",
    [["500g", 420], ["1kg", 810]],
    "2026-08-02",
  ),
  seed(
    "Anjeer Premium",
    "Large, hand-picked premium anjeer (dried fig), soft-textured and naturally sweet. Packed fresh in a luxury box.",
    [["250g", 360], ["500g", 700]],
    "2026-07-30",
  ),
  seed(
    "Hazelnut",
    "Sweet, aromatic hazelnuts with a smooth crunch. Wonderful roasted, or blended into spreads and desserts.",
    [["250g", 330], ["500g", 640]],
    "2026-07-28",
  ),
  seed(
    "Macadamia",
    "Rich, buttery macadamia nuts — the most indulgent nut in the collection. Currently restocking.",
    [["100g", 320, false], ["250g", 760, false]],
    "2026-07-26",
  ),
  seed(
    "Pumpkin Seed",
    "Green, hulled pumpkin seeds packed with magnesium and zinc. Toast them lightly for salads and smoothie bowls.",
    [["100g", 90], ["250g", 210], ["500g", 400]],
    "2026-07-24",
  ),
  seed(
    "Sunflower Seed",
    "Mild, nutty sunflower seeds — a simple everyday superfood for breads, bars and toppings.",
    [["250g", 110], ["500g", 210]],
    "2026-07-22",
  ),
  seed(
    "Chia Seed",
    "Tiny, fibre-rich chia seeds that swell into a silky gel. Perfect for puddings, smoothies and overnight oats.",
    [["250g", 150], ["500g", 290]],
    "2026-07-20",
  ),
  seed(
    "Flax Seed",
    "Golden flax seeds, a plant-based source of omega-3. Grind fresh and sprinkle over anything.",
    [["250g", 70], ["500g", 130]],
    "2026-07-18",
  ),
];
