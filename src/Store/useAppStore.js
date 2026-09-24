import { create } from "zustand";
import { fetchProducts } from "../Api/root";
import { categorize } from "../Utils/categorize";

function readLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore — storage may be unavailable (private browsing, quota, etc.)
  }
}

// v2 keys: cart now holds VARIANT ids, wishlist holds PARENT SEED ids.
const CART_KEY = "mr_cart_v2";
const WISHLIST_KEY = "mr_wishlist_v2";

let toastId = 0;

const useAppStore = create((set, get) => ({
  // ---- products (one entry per parent seed, fetched once and cached) ----
  products: [],
  variantIndex: {}, // variantId -> { product, variant }, used by the cart
  productsLoading: false,
  productsError: null,
  productsLoaded: false,

  loadProducts: async (force = false) => {
    if (get().productsLoaded && !force) return; // already cached — skip the server call
    if (get().productsLoading) return;
    set({ productsLoading: true, productsError: null });
    try {
      const res = await fetchProducts();
      const products = (res.data || []).map(categorize);
      const variantIndex = {};
      products.forEach((product) =>
        product.variants.forEach((variant) => {
          variantIndex[variant.id] = { product, variant };
        }),
      );
      set({
        products,
        variantIndex,
        productsLoading: false,
        productsLoaded: true,
      });
    } catch (err) {
      set({
        productsError: err.message || "Failed to load products",
        productsLoading: false,
      });
    }
  },

  // ---- cart (items are pack-size variants: { variantId, quantity }) ----
  cart: readLocal(CART_KEY, []),
  addToCart: (variantId, qty = 1) => {
    const cart = get().cart;
    const existing = cart.find((c) => c.variantId === variantId);
    const next = existing
      ? cart.map((c) =>
          c.variantId === variantId ? { ...c, quantity: c.quantity + qty } : c,
        )
      : [...cart, { variantId, quantity: qty }];
    writeLocal(CART_KEY, next);
    set({ cart: next });
  },
  removeFromCart: (variantId) => {
    const next = get().cart.filter((c) => c.variantId !== variantId);
    writeLocal(CART_KEY, next);
    set({ cart: next });
  },
  setQty: (variantId, qty) => {
    if (qty <= 0) return get().removeFromCart(variantId);
    const next = get().cart.map((c) =>
      c.variantId === variantId ? { ...c, quantity: qty } : c,
    );
    writeLocal(CART_KEY, next);
    set({ cart: next });
  },
  clearCart: () => {
    writeLocal(CART_KEY, []);
    set({ cart: [] });
  },

  // ---- wishlist (parent seed ids) ----
  wishlist: readLocal(WISHLIST_KEY, []),
  toggleWishlist: (seedId) => {
    const wishlist = get().wishlist;
    const next = wishlist.includes(seedId)
      ? wishlist.filter((x) => x !== seedId)
      : [...wishlist, seedId];
    writeLocal(WISHLIST_KEY, next);
    set({ wishlist: next });
  },

  // ---- toasts ----
  toasts: [],
  pushToast: (message, type = "success") => {
    const id = ++toastId;
    set({ toasts: [...get().toasts, { id, message, type }] });
    setTimeout(() => {
      set({ toasts: get().toasts.filter((t) => t.id !== id) });
    }, 3000);
  },
  dismissToast: (id) =>
    set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));

export default useAppStore;
