# Kudan Travel & Tours — Remade Website

This is a complete visual rebuild based on the travel-agency brief supplied in the chat. It replaces the old construction-company pages with:
- Home
- Outbound Tours
- Inbound Nepal
- Vehicles & Transport
- Gallery
- Achievements
- About Us
- Contact & inquiry form
- Responsive mobile navigation
- Tailwind CSS + Framer Motion-ready stack
- Lucide icons
- React Hook Form + Zod validation

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Replace the old project

If this is being used in the existing VS Code project, replace the old `app`, `components`, config files and `package.json` with the files in this folder.

## Important customization points

1. Replace Unsplash image URLs in `app/globals.css` and `app/gallery/page.tsx` with Kudan's own photos.
2. Replace the text placeholders in About/Achievements with real staff, certificates and registration details.
3. Add the exact Google Maps iframe in `app/contact-us/page.tsx`.
4. Connect `InquiryForm.tsx` to your preferred email/CRM/database API instead of the temporary `alert()`.
5. Add the real Fonepay/eSewa/card payment details only after the relevant merchant/API accounts are active.
6. Add the actual Kudan logo if available.

The design intentionally uses a clean white/ice-blue layout, deep Himalayan blue, emerald green and sunrise orange rather than the dark construction-company look from the uploaded starter project.
