import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAppStore from "../Store/useAppStore";
import ProductCard from "../Components/ProductCard";
import { Search } from "lucide-react";

const CATS = ["All", "Dates", "Nuts", "Figs", "Seeds"];
const SORTS = [
  { v: "featured", l: "Featured" },
  { v: "newest", l: "Newest" },
  { v: "price-asc", l: "Price: Low → High" },
  { v: "price-desc", l: "Price: High → Low" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useAppStore((s) => s.products);
  const productsLoading = useAppStore((s) => s.productsLoading);
  const productsError = useAppStore((s) => s.productsError);
  const loadProducts = useAppStore((s) => s.loadProducts);

  // The category lives in the URL (?category=Nuts) so footer / home links
  // work even while the shop page is already open.
  const cat = searchParams.get("category") || "All";
  const setCat = (c) =>
    setSearchParams(c === "All" ? {} : { category: c }, { replace: true });

  const [q, setQ] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState(null); // null = no limit
  const [sort, setSort] = useState("featured");

  // Slider range follows the real prices instead of a hard-coded 2000 cap
  const priceCeiling = useMemo(() => {
    const highest = products.reduce((m, p) => Math.max(m, p.minPrice), 0);
    return Math.max(500, Math.ceil(highest / 50) * 50);
  }, [products]);
  const maxPrice = Math.min(maxPriceInput ?? priceCeiling, priceCeiling);

  const filtered = useMemo(() => {
    let r = products.slice();
    if (cat !== "All") r = r.filter((p) => p.category === cat);
    if (q) r = r.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    r = r.filter((p) => p.minPrice <= maxPrice);
    switch (sort) {
      case "newest":
        r.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "price-asc":
        r.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case "price-desc":
        r.sort((a, b) => b.minPrice - a.minPrice);
        break;
      default:
        break; // featured = order returned by the API
    }
    return r;
  }, [products, cat, q, maxPrice, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-xs tracking-[0.3em] uppercase text-accent">
          The Collection
        </span>
        <h1 className="mt-2 text-3xl sm:text-5xl">Shop Premium</h1>
        <p className="mt-3 text-muted-foreground">
          Pure, fresh, luxurious — curated for you.
        </p>
      </div>

      <div className="luxury-card p-4 sm:p-6 mb-6 grid gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-[1fr_auto_auto] items-center">
        <div className="relative sm:col-span-2 md:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          {/* text-base on phones: iOS Safari zooms into inputs smaller than 16px */}
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-10 pr-4 py-3 rounded-full bg-secondary text-base sm:text-sm outline-none focus:ring-2 ring-accent"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full md:w-auto px-4 py-3 rounded-full bg-secondary text-base sm:text-sm outline-none"
        >
          {SORTS.map((s) => (
            <option key={s.v} value={s.v}>
              {s.l}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-3 text-sm">
          <span className="whitespace-nowrap">Up to ₹{maxPrice}</span>
          <input
            type="range"
            min={50}
            max={priceCeiling}
            step={50}
            value={maxPrice}
            onChange={(e) => setMaxPriceInput(Number(e.target.value))}
            aria-label="Maximum price"
            className="flex-1 min-w-24 accent-[oklch(0.78_0.13_85)]"
          />
        </div>
      </div>

      {/* one scrollable row on phones, wraps on larger screens */}
      <div className="flex gap-2 mb-8 overflow-x-auto sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 whitespace-nowrap min-h-10 px-4 py-2 rounded-full text-sm font-medium transition border ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {productsLoading && products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          Loading products…
        </div>
      ) : productsError && products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">{productsError}</p>
          <button
            onClick={() => loadProducts(true)}
            className="mt-4 px-6 py-3 rounded-full bg-primary text-primary-foreground"
          >
            Try again
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No products match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
