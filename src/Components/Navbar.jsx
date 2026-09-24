import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import useAppStore from "../Store/useAppStore";
import logo from "../Assets/mr-delights-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const cart = useAppStore((s) => s.cart);
  const wishlist = useAppStore((s) => s.wishlist);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all ${scrolled ? "glass shadow-[0_4px_30px_-12px_oklch(0.295_0.06_158/0.2)]" : "bg-background/60 backdrop-blur"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 group">
          <img
            src={logo}
            alt="MR Delights logo"
            width={44}
            height={44}
            className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full object-cover ring-1 ring-accent/40 shadow-[var(--shadow-gold)] transition-transform duration-500 group-hover:rotate-3"
          />
          <div className="leading-tight min-w-0">
            <div className="font-display text-lg sm:text-xl text-primary truncate">
              MR Delights
            </div>
            <div className="text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-muted-foreground truncate">
              Premium Dry Fruits & Seeds
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:transition-all ${
                  isActive
                    ? "text-primary after:w-full"
                    : "text-foreground/80 hover:text-primary after:w-0 hover:after:w-full"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-3">
          <Link
            to="/wishlist"
            className="relative p-3 rounded-full hover:bg-secondary transition"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 text-primary" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 grid place-items-center rounded-full shadow">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative p-3 rounded-full hover:bg-secondary transition"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 grid place-items-center rounded-full shadow">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-3 rounded-full hover:bg-secondary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-up">
          <nav className="flex flex-col px-4 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `py-3 text-base font-medium ${isActive ? "text-accent" : "text-foreground/90"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
