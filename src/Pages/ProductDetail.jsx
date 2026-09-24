import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAppStore from "../Store/useAppStore";
import {
  ShoppingBag,
  Minus,
  Plus,
  Check,
  Truck,
  Award,
  Leaf,
} from "lucide-react";
import { toast } from "../Utils/toast";
import WeightSelector from "../Components/WeightSelector";

// :id is the PARENT seed id. Loading / error / not-found are handled here,
// the actual page lives in ProductDetailView (re-mounted per product via key).
export default function ProductDetail() {
  const { id } = useParams();
  const products = useAppStore((s) => s.products);
  const productsLoaded = useAppStore((s) => s.productsLoaded);
  const productsError = useAppStore((s) => s.productsError);
  const loadProducts = useAppStore((s) => s.loadProducts);
  const product = products.find((p) => p.id === id);

  if (!product) {
    if (!productsLoaded && !productsError) {
      return (
        <div className="max-w-3xl mx-auto px-6 py-24 text-center text-muted-foreground">
          Loading product…
        </div>
      );
    }
    if (!productsLoaded && productsError) {
      return (
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-3xl">Couldn&apos;t load product</h1>
          <p className="mt-2 text-muted-foreground">{productsError}</p>
          <button
            onClick={() => loadProducts(true)}
            className="mt-6 inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground"
          >
            Try again
          </button>
        </div>
      );
    }
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl">Product not found</h1>
        <Link
          to="/shop"
          className="mt-6 inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return <ProductDetailView key={product.id} product={product} />;
}

function ProductDetailView({ product }) {
  const addToCart = useAppStore((s) => s.addToCart);
  const [variantId, setVariantId] = useState(product.defaultVariantId);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");
  const [activeImage, setActiveImage] = useState(0);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const gallery = product.images;
  const description =
    product.description || "Hand-selected premium grade, packed fresh for you.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <Link
        to="/shop"
        className="inline-block py-2 text-sm text-muted-foreground hover:text-accent"
      >
        ← Back to shop
      </Link>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 mt-4 sm:mt-6">
        <div className="space-y-4 min-w-0">
          <div className="aspect-square rounded-2xl overflow-hidden bg-beige luxury-card">
            <img
              src={gallery[activeImage] ?? gallery[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`shrink-0 w-16 sm:w-20 aspect-square rounded-xl overflow-hidden bg-beige border-2 ${activeImage === i ? "border-accent" : "border-border"}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover opacity-90"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="text-xs tracking-[0.3em] uppercase text-accent">
            {product.category}
          </div>
          <h1 className="mt-2 text-3xl sm:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-end gap-3">
            <span className="text-3xl font-semibold text-primary">
              ₹{variant.price}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            {variant.inStock ? (
              <span className="inline-flex items-center gap-1 text-green-700">
                <Check className="w-4 h-4" /> In Stock
              </span>
            ) : (
              <span className="text-destructive">Out of stock</span>
            )}
          </div>

          <p className="mt-5 text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Weight
            </div>
            <WeightSelector
              variants={product.variants}
              value={variant.id}
              onChange={setVariantId}
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center border border-border rounded-full">
              <button
                className="w-11 h-11 grid place-items-center"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center">{qty}</span>
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
              }}
              disabled={!variant.inStock}
              className="flex-1 min-h-12 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-full font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
            <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary text-center">
              <Leaf className="w-5 h-5 text-accent" />
              100% Natural
            </div>
            <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary text-center">
              <Award className="w-5 h-5 text-accent" />
              Premium Grade
            </div>
            <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary text-center">
              <Truck className="w-5 h-5 text-accent" />
              Fast Delivery
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <div className="flex gap-6 text-sm font-medium">
              <button
                onClick={() => setTab("desc")}
                className={`py-2 ${
                  tab === "desc"
                    ? "text-accent border-b-2 border-accent"
                    : "text-muted-foreground"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setTab("ship")}
                className={`py-2 ${
                  tab === "ship"
                    ? "text-accent border-b-2 border-accent"
                    : "text-muted-foreground"
                }`}
              >
                Shipping
              </button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {tab === "desc"
                ? `${description} Sealed for freshness, packed in a premium luxury box. Refrigerate after opening for best results.`
                : "Delivered across Kerala in 1–3 days. Free delivery on orders above ₹999. Cash on delivery & WhatsApp ordering supported."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
