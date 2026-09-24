import { Link } from "react-router-dom";
import heroImg from "../Assets/hero.jpg";
import datesImg from "../Assets/dates.jpg";
import nutsImg from "../Assets/nuts.jpg";
import figsImg from "../Assets/figs.jpg";
import seedsImg from "../Assets/seeds.jpg";
import useAppStore from "../Store/useAppStore";
import ProductCard from "../Components/ProductCard";
import AnimatedLogoHero from "../Components/AnimatedLogoHero";
import {
  Leaf,
  Award,
  Sparkles,
  Truck,
  Star,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  WHATSAPP_NUMBER,
  CONTACT_PHONE,
  CONTACT_EMAIL,
} from "../Constants/storeConstants";

const trust = [
  { icon: Leaf, label: "100% Natural" },
  { icon: Award, label: "Premium Quality" },
  { icon: Sparkles, label: "No Preservatives" },
  { icon: Truck, label: "Fast Delivery" },
];

const categories = [
  { name: "Dates", image: datesImg },
  { name: "Nuts", image: nutsImg },
  { name: "Figs", image: figsImg },
  { name: "Seeds", image: seedsImg },
];

const reviews = [
  {
    name: "Aisha R.",
    city: "Kochi",
    text: "The Medjool dates are absolutely divine — soft, fresh, and beautifully packed. Feels like a luxury gift every time.",
    rating: 5,
  },
  {
    name: "Rahul M.",
    city: "Trivandrum",
    text: "Best pistachios I've had in years. MR Delights has become our family's monthly ritual.",
    rating: 5,
  },
  {
    name: "Fathima S.",
    city: "Calicut",
    text: "Premium quality, gorgeous packaging, and lightning fast delivery across Kerala. Highly recommend.",
    rating: 5,
  },
];

export default function Home() {
  const products = useAppStore((s) => s.products);
  const productsError = useAppStore((s) => s.productsError);
  const featured = products.slice(0, 6);

  return (
    <>
      {/* Hero + trust strip fill the first screen exactly: the strip sits on the
          bottom edge of the viewport, everything else is reached by scrolling. */}
      <div className="hero-viewport flex flex-col">
        <AnimatedLogoHero className="flex-1" />

        <section className="shrink-0 border-y border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3 sm:gap-4">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-gold-grad grid place-items-center shadow">
                  <t.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground" />
                </div>
                <span className="text-[13px] sm:text-sm font-medium leading-tight">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-accent">
            Curated Collections
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((c) => (
            <Link
              key={c.name}
              to={`/shop?category=${c.name}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden luxury-card"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                <div className="font-display text-2xl">{c.name}</div>
                <div className="text-xs mt-1 text-accent">Shop now →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-accent">
                Bestsellers
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl">Featured Products</h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline text-sm text-primary hover:text-accent"
            >
              View all →
            </Link>
          </div>
          {featured.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              {productsError ? productsError : "Loading products…"}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <img
          src={heroImg}
          alt="Our story"
          loading="lazy"
          className="rounded-2xl shadow-[var(--shadow-luxury)] aspect-[4/3] object-cover w-full"
        />
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-accent">
            Our Story
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            Crafted for Connoisseurs
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            MR Delights was born in Kerala from a love for the world's finest
            natural foods. We source directly from trusted farms across the
            Middle East, Iran, Turkey, and California — bringing you only the
            top grade, sealed at peak freshness.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Every box is a promise: zero preservatives, zero compromises — only
            pure, luxurious nourishment.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-block px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
          >
            More about us
          </Link>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-accent">
              Loved Across Kerala
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="glass-dark rounded-2xl p-6">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/90">
                  "{r.text}"
                </p>
                <div className="mt-4 font-display text-lg text-accent">
                  {r.name}
                </div>
                <div className="text-xs text-primary-foreground/60">
                  {r.city}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="luxury-card p-8 sm:p-12 grid md:grid-cols-2 gap-10">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-accent">
              Get in touch
            </span>
            <h2 className="mt-3 text-3xl">Order direct or say hello</h2>
            <p className="mt-3 text-muted-foreground">
              Have a question or a bulk order? We'd love to hear from you.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:opacity-90"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent" /> {CONTACT_PHONE}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent" /> {CONTACT_EMAIL}
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-accent" /> Kerala, India
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
