import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import {
  WHATSAPP_NUMBER,
  CONTACT_PHONE,
  CONTACT_EMAIL,
} from "../Constants/storeConstants";
import { useState } from "react";
import { toast } from "../Utils/toast";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    const msg = `Hello MR Delights,\n\nName: ${f.name}\nEmail: ${f.email}\n\n${f.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    toast.success("Opening WhatsApp…");
    setF({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs tracking-[0.3em] uppercase text-accent">
          Reach Us
        </span>
        <h1 className="mt-3 text-3xl sm:text-5xl">Get in Touch</h1>
        <p className="mt-3 text-muted-foreground">
          We'd love to hear from you. Send a message or chat with us directly on
          WhatsApp.
        </p>
      </div>

      <div className="mt-8 sm:mt-12 grid lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="luxury-card p-5 sm:p-8 space-y-6">
          <h2 className="font-display text-2xl">Contact information</h2>
          <ul className="space-y-4 text-sm">
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
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:opacity-90"
          >
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              title="Kerala"
              className="w-full h-56"
              src="https://www.openstreetmap.org/export/embed.html?bbox=74.7%2C8.2%2C77.4%2C12.8&layer=mapnik"
            />
          </div>
        </div>

        <form onSubmit={submit} className="luxury-card p-5 sm:p-8 space-y-4">
          <h2 className="font-display text-2xl">Send a message</h2>
          <input
            required
            maxLength={100}
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent"
          />
          <input
            required
            type="email"
            maxLength={255}
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
            placeholder="Your email"
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent"
          />
          <textarea
            required
            maxLength={1000}
            rows={5}
            value={f.message}
            onChange={(e) => setF({ ...f, message: e.target.value })}
            placeholder="How can we help?"
            className="w-full px-4 py-3 rounded-xl bg-secondary outline-none focus:ring-2 ring-accent"
          />
          <button className="w-full min-h-12 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90">
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
