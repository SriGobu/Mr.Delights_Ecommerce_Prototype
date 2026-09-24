// Contact details can be overridden per deployment (Vercel > Settings >
// Environment Variables) without touching the code. The digits-only form is
// used for wa.me links; the display form is what visitors see.
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "123456789";
export const CONTACT_PHONE =
  import.meta.env.VITE_CONTACT_PHONE || "+91 123456 79880";
export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "john.doe@example.com";

export const DELIVERY_CHARGE = 60;
export const FREE_DELIVERY_ABOVE = 999;
