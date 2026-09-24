import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import {
  WHATSAPP_NUMBER,
  CONTACT_PHONE,
  CONTACT_EMAIL,
} from "../Constants/storeConstants";
import logo from "../Assets/mr-delights-logo.png";

export default function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="MR Delights logo"
              width={56}
              height={56}
              className="w-14 h-14 shrink-0 rounded-full object-cover ring-1 ring-accent/40"
            />
            <div className="min-w-0">
              <div className="font-display text-xl truncate">MR Delights</div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-accent">
                Premium Dry Fruits & Seeds
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
            Premium dates, nuts, figs & seeds — sourced with care, delivered
            across Kerala.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-accent mb-4">
            Shop
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/shop?category=Dates" className="hover:text-accent">
                Dates
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Nuts" className="hover:text-accent">
                Nuts
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Figs" className="hover:text-accent">
                Figs
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Seeds" className="hover:text-accent">
                Seeds
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-accent mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-accent">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-sm uppercase tracking-[0.2em] text-accent mb-4">
            Reach Us
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              <span>{CONTACT_PHONE}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              <span>{CONTACT_EMAIL}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Kerala, India</span>
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] text-xs text-primary-foreground/60 flex flex-wrap justify-between gap-2">
          <span>
            © {new Date().getFullYear()} MR Delights. All rights reserved.
          </span>
          <span>Crafted with care in Kerala.</span>
        </div>
      </div>
    </footer>
  );
}
