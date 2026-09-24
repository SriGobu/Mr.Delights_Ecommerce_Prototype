import { Link } from "react-router-dom";
import { Eye, ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import useAppStore from "../Store/useAppStore";
import { toast } from "../Utils/toast";
import QuickView from "./QuickView";

// One card per PARENT seed. Seeds with several pack sizes open the quick view
// to pick a weight; single-size seeds can be added straight from the card.
export default function ProductCard({ product }) {
  const addToCart = useAppStore((s) => s.addToCart);
  const toggleWishlist = useAppStore((s) => s.toggleWishlist);
  const wished = useAppStore((s) => s.wishlist.includes(product.id));
  const [quick, setQuick] = useState(false);

  const single = product.variants.length === 1;

  const onPrimary = () => {
    if (single) {
      addToCart(product.variants[0].id);
      toast.success("Added to cart");
    } else {
      setQuick(true);
    }
  };

  return (
    <>
      <div className="luxury-card group overflow-hidden flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-beige">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>
          {!product.inStock && (
            <span className="absolute bottom-3 left-3 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full">
              Out of stock
            </span>
          )}
          {/* Always visible on touch devices; fades in on hover only for mouse/trackpad */}
          <button
            onClick={() => setQuick(true)}
            className="absolute bottom-3 right-3 w-11 h-11 rounded-full glass grid place-items-center opacity-100 transition-all fine-hover:opacity-0 fine-hover:translate-y-2 fine-hover:group-hover:opacity-100 fine-hover:group-hover:translate-y-0"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4 text-primary" />
          </button>
          <button
            onClick={() => {
              toggleWishlist(product.id);
              toast.success(
                wished ? "Removed from wishlist" : "Added to wishlist",
              );
            }}
            className={`absolute top-3 right-3 w-11 h-11 rounded-full grid place-items-center transition ${wished ? "bg-accent text-accent-foreground" : "glass text-primary hover:bg-accent hover:text-accent-foreground"}`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-4 h-4 ${wished ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">
            {product.category}
          </div>
          <Link
            to={`/product/${product.id}`}
            className="mt-1 font-display text-base sm:text-lg leading-tight hover:text-accent transition"
          >
            {product.name}
          </Link>
          <div className="text-xs text-muted-foreground mt-1">
            {product.variants.map((v) => v.weight).join(" · ")}
          </div>
          <div className="mt-3 flex items-end gap-1.5">
            {!single && (
              <span className="text-xs text-muted-foreground pb-1">From</span>
            )}
            <span className="text-lg sm:text-xl font-semibold text-primary">
              ₹{product.minPrice}
            </span>
          </div>
          <div className="mt-auto pt-4">
            <button
              onClick={onPrimary}
              disabled={!product.inStock}
              className="w-full min-h-11 inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-full text-[13px] sm:text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4" />
              {single ? "Add to Cart" : "Select Weight"}
            </button>
          </div>
        </div>
      </div>
      {quick && <QuickView product={product} onClose={() => setQuick(false)} />}
    </>
  );
}
