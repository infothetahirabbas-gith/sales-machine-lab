// Single source of truth for every real photograph rendered on the home page.
// Kept small + curated so nothing off-brand slips in, and so the build-time
// image health check can enumerate exactly what to verify.

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=entropy&w=${w}&q=75`;

const face = (id: string, w = 200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=faces&w=${w}&q=75`;

// Hero / above-the-fold visuals — Shopify store + phone commerce.
export const HERO_LAPTOP = u("photo-1607083206869-4c7672e72a8a", 1400);
export const HERO_PHONE = u("photo-1556742049-0cfed4f6a45d", 900);

// "Ecommerce in action" bento strip (immediately below the hero).
export const HOME_BENTO = [
  {
    src: u("photo-1611974789855-9c2a0a7236a3", 1200),
    alt: "Ecommerce analytics dashboard tracking revenue growth for a UK Shopify brand",
    label: "Live revenue dashboard",
  },
  {
    src: u("photo-1481437156560-3205f6a55735", 900),
    alt: "Shopify product page and checkout flow shown on a phone during a UK ecommerce sprint",
    label: "Product page CRO",
  },
  {
    src: u("photo-1483985988355-763728e1935b", 900),
    alt: "In-studio ecommerce product photography for a UK DTC brand",
    label: "In-house creative",
  },
  {
    src: u("photo-1611944212129-29977ae1398c", 900),
    alt: "Meta and TikTok paid ad creative queued for a UK ecommerce brand",
    label: "Paid ad creative",
  },
] as const;

// Hero platform strip — the 5 channels we grow (Shopify, WooCommerce, Meta Ads, SEO, Email).
export const HERO_PLATFORMS = [
  {
    src: u("photo-1556742049-0cfed4f6a45d", 600),
    alt: "Shopify storefront on mobile — UK ecommerce agency",
    label: "Shopify",
  },
  {
    src: u("photo-1607083206869-4c7672e72a8a", 600),
    alt: "WooCommerce store dashboard on laptop — UK WooCommerce agency",
    label: "WooCommerce",
  },
  {
    src: u("photo-1611944212129-29977ae1398c", 600),
    alt: "Facebook and Meta ads creative for a UK ecommerce brand",
    label: "Meta Ads",
  },
  {
    src: u("photo-1460925895917-afdab827c52f", 600),
    alt: "Ecommerce SEO analytics and Google rankings dashboard",
    label: "SEO & AI Search",
  },
  {
    src: u("photo-1611974789855-9c2a0a7236a3", 600),
    alt: "Klaviyo email revenue dashboard for a UK Shopify brand",
    label: "Email · Klaviyo",
  },
] as const;

// Case-study photo — Shopify store on laptop.
export const CASE_STUDY_IMG = u("photo-1607083206869-4c7672e72a8a", 1200);


// Testimonial founder headshots — cycled through the marquee.
export const FOUNDER_PHOTOS = [
  face("photo-1508214751196-bcfd4ca60f91"),
  face("photo-1494790108377-be9c29b29330"),
  face("photo-1500648767791-00dcc994a43e"),
  face("photo-1519085360753-af0119f7cbe7"),
  face("photo-1580489944761-15a19d654956"),
  face("photo-1472099645785-5658abf4ff4e"),
  face("photo-1544005313-94ddf0286df2"),
  face("photo-1487412720507-e7ab37603c6f"),
  face("photo-1607746882042-944635dfe10e"),
  face("photo-1573497019940-1c28c88b4f3e"),
];

// Flat list every URL for the build-time health check to enumerate.
export const HOME_IMAGE_URLS: readonly string[] = [
  HERO_LAPTOP,
  HERO_PHONE,
  ...HOME_BENTO.map((i) => i.src),
  CASE_STUDY_IMG,
  ...FOUNDER_PHOTOS,
];
