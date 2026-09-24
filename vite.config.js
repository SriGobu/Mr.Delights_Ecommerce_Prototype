import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Social link previews (LinkedIn, WhatsApp, X) need ABSOLUTE og:image / og:url
// addresses. Resolve the site URL at build time:
//   1. VITE_SITE_URL           (set this if you use a custom domain)
//   2. VERCEL_PROJECT_PRODUCTION_URL (provided automatically by Vercel)
//   3. empty                   (local dev — relative URLs are fine there)
function siteUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return ''
}

const siteUrlPlugin = () => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl()),
})

export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
})
