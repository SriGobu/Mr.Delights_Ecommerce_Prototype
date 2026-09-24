import { useMemo } from "react";
import { Link } from "react-router-dom";
import useAppStore from "../Store/useAppStore";
import ProductCard from "../Components/ProductCard";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const wishlist = useAppStore((s) => s.wishlist);
  const products = useAppStore((s) => s.products);
  const items = useMemo(
    () =>
      wishlist.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [wishlist, products],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <span className="text-xs tracking-[0.3em] uppercase text-accent">
          Saved for later
        </span>
        <h1 className="mt-2 text-4xl sm:text-5xl">My Wishlist</h1>
      </div>

      {items.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-20">
          <Heart className="w-12 h-12 mx-auto text-accent" />
          <p className="mt-4 text-muted-foreground">
            Your wishlist is empty. Tap the heart on any product to save it
            here.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground"
          >
            Browse shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {" "}
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
