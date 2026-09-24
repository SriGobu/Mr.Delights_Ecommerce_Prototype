import { X, ShoppingBag, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAppStore from "../Store/useAppStore";
import { toast } from "../Utils/toast";
import WeightSelector from "./WeightSelector";

export default function QuickView({ product, onClose }) {
  const addToCart = useAppStore((s) => s.addToCart);
  const [variantId, setVariantId] = useState(product.defaultVariantId);
  const [qty, setQty] = useState(1);
  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  // Close on Escape and lock the page scroll behind the modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-primary/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      {/* Bottom sheet on phones, centred dialog from sm up. Scrolls if it is taller than the screen. */}
      <div
        className="bg-card w-full max-w-3xl max-h-[92svh] overflow-y-auto rounded-t-3xl sm:rounded-2xl grid md:grid-cols-2 shadow-[var(--shadow-luxury)] animate-fade-up pb-[env(safe-area-inset-bottom,0px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] md:aspect-square bg-beige">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="md:hidden absolute top-3 right-3 w-11 h-11 rounded-full glass grid place-items-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 sm:p-8 relative flex flex-col">
          <button
            onClick={onClose}
            className="hidden md:grid absolute top-3 right-3 w-11 h-11 rounded-full hover:bg-secondary place-items-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-[10px] uppercase tracking-[0.2em] text-accent">
            {product.category}
          </div>
          <h3 className="font-display text-2xl mt-1 pr-10">{product.name}</h3>

          <div className="mt-4">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Weight
            </div>
            <WeightSelector
              variants={product.variants}
              value={variant.id}
              onChange={setVariantId}
            />
          </div>

          {product.description && (
            <p className="mt-4 text-sm leading-relaxed">
              {product.description}
            </p>
          )}
          <div className="mt-4 flex items-end gap-2">
            <span className="text-2xl font-semibold text-primary">
              ₹{variant.price}
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <div className="inline-flex items-center border border-border rounded-full">
              <button
                className="w-11 h-11 grid place-items-center"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button
                className="w-11 h-11 grid place-items-center"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => {
                addToCart(variant.id, qty);
                toast.success("Added to cart");
                onClose();
              }}
              disabled={!variant.inStock}
              className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-full font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          </div>
          <Link
            to={`/product/${product.id}`}
            onClick={onClose}
            className="mt-3 py-2 text-sm text-accent hover:underline text-center"
          >
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
}
