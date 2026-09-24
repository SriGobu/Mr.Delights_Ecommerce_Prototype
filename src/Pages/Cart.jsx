import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useAppStore from "../Store/useAppStore";
import {
  WHATSAPP_NUMBER,
  DELIVERY_CHARGE,
  FREE_DELIVERY_ABOVE,
} from "../Constants/storeConstants";
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { toast } from "../Utils/toast";

export default function Cart() {
  const cart = useAppStore((s) => s.cart);
  const variantIndex = useAppStore((s) => s.variantIndex);
  const productsLoaded = useAppStore((s) => s.productsLoaded);
  const setQty = useAppStore((s) => s.setQty);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const clearCart = useAppStore((s) => s.clearCart);

  // cart holds variant ids -> resolve to { product (parent seed), variant (pack size) }
  const items = useMemo(
    () =>
      cart
        .map((c) => {
          const hit = variantIndex[c.variantId];
          return hit
            ? {
                product: hit.product,
                variant: hit.variant,
                quantity: c.quantity,
              }
            : null;
        })
        .filter(Boolean),
    [cart, variantIndex],
  );

  const subtotal = items.reduce((s, i) => s + i.variant.price * i.quantity, 0);
  const delivery =
    subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
  const total = subtotal + delivery;

  const [f, setF] = useState({ name: "", phone: "", address: "", notes: "" });

  const place = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    const lines = items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.product.name} (${i.variant.weight}) × ${i.quantity} — ₹${i.variant.price * i.quantity}`,
      )
      .join("\n");
    const msg =
      `*New Order — MR Delights*\n\n` +
      `*Customer:* ${f.name}\n` +
      `*Phone:* ${f.phone}\n` +
      `*Address:* ${f.address}\n` +
      (f.notes ? `*Notes:* ${f.notes}\n` : "") +
      `\n*Items:*\n${lines}\n\n` +
      `Subtotal: ₹${subtotal}\nDelivery: ₹${delivery}\n*Total: ₹${total}*`;

    // encodeURIComponent keeps characters like # & % in the address/notes intact
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    toast.success("Order placed! Opening WhatsApp…");
    clearCart();
    setF({ name: "", phone: "", address: "", notes: "" });
  };

  // Cart ids are resolved against the loaded products — wait for them first
  if (!productsLoaded && cart.length > 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center text-muted-foreground">
        Loading your cart…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-accent" />
        <h1 className="mt-4 font-display text-3xl">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Discover our premium collection.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-[1fr_400px] gap-8">
      <div className="min-w-0">
        <h1 className="font-display text-3xl sm:text-4xl mb-6">Your Cart</h1>
        <ul className="space-y-3">
          {items.map((i) => (
            <li
              key={i.variant.id}
              className="luxury-card p-3 sm:p-4 flex gap-3 sm:gap-4"
            >
              <Link to={`/product/${i.product.id}`} className="shrink-0">
                <img
                  src={i.product.image}
                  alt={i.product.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      to={`/product/${i.product.id}`}
                      className="font-display text-base sm:text-lg hover:text-accent block truncate"
                    >
                      {i.product.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      {i.variant.weight}
                    </div>
                    {!i.variant.inStock && (
                      <div className="text-xs text-destructive">
                        Currently out of stock
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(i.variant.id)}
                    className="-mr-2 -mt-2 w-11 h-11 grid place-items-center text-muted-foreground hover:text-destructive"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center border border-border rounded-full">
                    <button
                      className="w-10 h-10 grid place-items-center"
                      onClick={() => setQty(i.variant.id, i.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">
                      {i.quantity}
                    </span>
                    <button
                      className="w-10 h-10 grid place-items-center"
                      onClick={() => setQty(i.variant.id, i.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="font-semibold text-primary">
                    ₹{i.variant.price * i.quantity}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={place}
        className="luxury-card p-5 sm:p-6 h-fit lg:sticky lg:top-24 space-y-4"
      >
        <h2 className="font-display text-2xl">Order Summary</h2>
        <div className="text-sm space-y-2 border-y border-border py-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
          </div>
          {subtotal < FREE_DELIVERY_ABOVE && (
            <div className="text-xs text-accent">
              Add ₹{FREE_DELIVERY_ABOVE - subtotal} more for free delivery.
            </div>
          )}
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <div className="space-y-3 pt-2 border-t border-border">
          <input
            required
            autoComplete="name"
            placeholder="Full name"
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary text-base outline-none focus:ring-2 ring-accent"
          />
          <input
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Phone number"
            value={f.phone}
            onChange={(e) => setF({ ...f, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary text-base outline-none focus:ring-2 ring-accent"
          />
          <textarea
            required
            rows={3}
            autoComplete="street-address"
            placeholder="Delivery address"
            value={f.address}
            onChange={(e) => setF({ ...f, address: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary text-base outline-none focus:ring-2 ring-accent"
          />
          <textarea
            rows={2}
            placeholder="Order notes (optional)"
            value={f.notes}
            onChange={(e) => setF({ ...f, notes: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary text-base outline-none focus:ring-2 ring-accent"
          />
        </div>

        <button className="w-full min-h-12 inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] text-white font-medium hover:opacity-90">
          <MessageCircle className="w-4 h-4" /> Place Order on WhatsApp
        </button>
        <p className="text-xs text-muted-foreground text-center">
          No online payment — confirm via WhatsApp.
        </p>
      </form>
    </div>
  );
}
