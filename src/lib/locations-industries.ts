export type LocationData = {
  slug: string;
  city: string;
  region: string;
  intro: string;
  highlights: string[];
};

export const LOCATIONS: LocationData[] = [
  {
    slug: "london",
    city: "London",
    region: "Greater London",
    intro: "We help London-based DTC brands scale profitably with performance marketing, CRO, and Shopify growth systems tuned for the UK's most competitive market.",
    highlights: ["Meta & Google Ads for London DTC", "Shopify Plus CRO", "Klaviyo email & SMS", "Local UK creative production"],
  },
  {
    slug: "manchester",
    city: "Manchester",
    region: "North West England",
    intro: "Manchester ecommerce brands trust us to scale ROAS, cut CAC, and build a system that compounds every month — without agency fluff.",
    highlights: ["Paid social growth", "SEO for UK ecommerce", "Landing page CRO", "Retention automations"],
  },
  {
    slug: "birmingham",
    city: "Birmingham",
    region: "West Midlands",
    intro: "Birmingham-based Shopify and WooCommerce brands scaling into 6- and 7-figure monthly revenue with our full growth engine.",
    highlights: ["Performance marketing", "Google Shopping", "Creative testing", "Analytics & attribution"],
  },
  {
    slug: "glasgow",
    city: "Glasgow",
    region: "Scotland",
    intro: "Glasgow ecommerce brands use our system to fix CAC, unlock margin and build predictable monthly revenue growth.",
    highlights: ["Paid ads for Scottish brands", "SEO & content", "Retention marketing", "Analytics stack"],
  },
  {
    slug: "bristol",
    city: "Bristol",
    region: "South West England",
    intro: "Bristol ecommerce founders working with us get UK-first creative, sharp media buying and a Shopify build that actually converts.",
    highlights: ["Shopify build & optimisation", "Google Ads", "Content & SEO", "Weekly growth reviews"],
  },
  {
    slug: "leeds",
    city: "Leeds",
    region: "West Yorkshire",
    intro: "From Leeds startups to established Yorkshire brands, we install the same scaling system used by 120+ UK ecommerce operators.",
    highlights: ["Meta Ads scaling", "TikTok Shop growth", "CRO & UX", "Email revenue lift"],
  },
  {
    slug: "liverpool",
    city: "Liverpool",
    region: "Merseyside",
    intro: "Liverpool DTC brands scaling with a lean, senior team — no juniors, no reporting theatre, just revenue and margin.",
    highlights: ["Media buying", "Landing page CRO", "Klaviyo flows", "Ad creative production"],
  },
  {
    slug: "leicester",
    city: "Leicester",
    region: "East Midlands",
    intro: "Leicester ecommerce and apparel brands scale with our creative-led paid social, CRO and retention system built for UK DTC.",
    highlights: ["Meta & TikTok scaling", "Landing page CRO", "Klaviyo lifecycle", "UK creative production"],
  },
  {
    slug: "nottingham",
    city: "Nottingham",
    region: "East Midlands",
    intro: "Nottingham DTC brands use our full growth engine to lower CAC, lift AOV and build predictable monthly revenue.",
    highlights: ["Performance marketing", "Shopify CRO", "SEO & content", "Retention automations"],
  },
  {
    slug: "edinburgh",
    city: "Edinburgh",
    region: "Scotland",
    intro: "Edinburgh Shopify and premium DTC brands scale profitably with a senior operator team focused on real revenue outcomes.",
    highlights: ["Premium brand paid growth", "CRO for AOV lift", "Email/SMS lifecycle", "UK creative studio"],
  },
  {
    slug: "sheffield",
    city: "Sheffield",
    region: "South Yorkshire",
    intro: "Sheffield ecommerce brands scale with sharp media buying, structured CRO and a retention stack built for compounding revenue.",
    highlights: ["Meta & Google Ads", "PDP & landing CRO", "Klaviyo flows", "Analytics & attribution"],
  },
  {
    slug: "poole",
    city: "Poole",
    region: "Dorset",
    intro: "Poole and South Coast DTC brands scale with a senior team running creative, media and CRO as one growth system.",
    highlights: ["Creative testing", "Paid social scaling", "Shopify CRO", "Lifecycle email"],
  },
  {
    slug: "newcastle-upon-tyne",
    city: "Newcastle upon Tyne",
    region: "Tyne and Wear",
    intro: "Newcastle upon Tyne ecommerce brands trust our team to scale ROAS, protect margin and build a growth engine that compounds.",
    highlights: ["Meta & TikTok ads", "Google Shopping", "CRO & UX", "Retention marketing"],
  },
  {
    slug: "bradford",
    city: "Bradford",
    region: "West Yorkshire",
    intro: "Bradford DTC and Shopify brands install the same scaling system used by 120+ UK operators — creative, media, CRO and retention.",
    highlights: ["Performance marketing", "Landing page CRO", "Email & SMS lifecycle", "UK creative production"],
  },
];

export type IndustryData = {
  slug: string;
  name: string;
  intro: string;
  highlights: string[];
};

export const INDUSTRIES: IndustryData[] = [
  {
    slug: "fashion-apparel",
    name: "Fashion & Apparel",
    intro: "We scale UK fashion and apparel brands with creative-led paid social, TikTok Shop and lifecycle marketing that lifts LTV without discounting.",
    highlights: ["Women's & Men's Fashion", "Streetwear & Sportswear", "Luxury Fashion", "Footwear, Handbags & Accessories"],
  },
  {
    slug: "beauty-personal-care",
    name: "Beauty & Personal Care",
    intro: "Beauty and personal care brands need a full-funnel system — we build one that reduces CAC, protects margin and grows repeat purchase rate.",
    highlights: ["Skincare & Haircare", "Makeup & Cosmetics", "Men's Grooming", "Fragrances & Perfumes"],
  },
  {
    slug: "electronics-technology",
    name: "Electronics & Technology",
    intro: "Electronics and technology brands scale with performance marketing, structured PDP CRO and a review engine that lifts conversion.",
    highlights: ["Consumer Electronics", "Mobile & Computer Accessories", "Gaming & Smart Home", "Audio & Wearables"],
  },
  {
    slug: "home-garden",
    name: "Home & Garden",
    intro: "Home, garden and interiors brands scaling higher AOV baskets with Google Shopping, Pinterest and premium landing page CRO.",
    highlights: ["Homeware & Décor", "Kitchen & Dining", "Garden & Outdoor Living", "DIY & Home Improvement"],
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    intro: "DTC food and drink brands scale subscription revenue with our creative, retention and lifecycle system built for repeat purchase.",
    highlights: ["Organic & Health Food", "Coffee & Tea", "Subscription Meal Kits", "Wine & Spirits"],
  },
  {
    slug: "health-wellness",
    name: "Health & Wellness",
    intro: "UK health and wellness brands use our compliant creative and subscription-first CRO to scale profitably under ASA and MHRA rules.",
    highlights: ["Vitamins & Supplements", "Sports Nutrition", "CBD & Wellness", "LTV modelling & retention"],
  },
  {
    slug: "sports-fitness",
    name: "Sports & Fitness",
    intro: "Sports and fitness brands scale with creative-led paid social, community UGC and retention systems built for repeat purchase.",
    highlights: ["Fitness Equipment & Gym Accessories", "Activewear", "Running & Cycling", "Yoga & Outdoor / Adventure"],
  },
  {
    slug: "furniture-interiors",
    name: "Furniture & Interiors",
    intro: "Furniture and interiors brands scale high-AOV baskets with Google Shopping, Pinterest and premium PDP CRO.",
    highlights: ["Living & Bedroom Furniture", "Office Furniture", "Outdoor Furniture", "Soft Furnishings & Storage"],
  },
  {
    slug: "baby-kids",
    name: "Baby & Kids",
    intro: "Baby and kids brands scale with trust-led creative, community UGC and lifecycle marketing tuned to parent buying cycles.",
    highlights: ["Baby Clothing & Gear", "Kids Fashion", "Toys & Educational Toys", "Maternity"],
  },
  {
    slug: "jewellery-watches",
    name: "Jewellery & Watches",
    intro: "Premium UK jewellery and watch brands trust us for high-consideration paid social, story-driven creative and margin-safe scaling.",
    highlights: ["Fine Jewellery", "Fashion Jewellery", "Watches", "Engagement & Wedding"],
  },
  {
    slug: "pets-supplies",
    name: "Pets & Pet Supplies",
    intro: "UK pet brands scale with subscription CRO, community-led creative and full-funnel media buying built around real retention.",
    highlights: ["Dog Supplies", "Cat Supplies", "Pet Food & Treats", "Pet Healthcare & Grooming"],
  },
  {
    slug: "arts-prints-stationery",
    name: "Arts, Prints & Stationery",
    intro: "Arts, prints and stationery brands scale with creative-led paid social, Pinterest and lifecycle marketing built for gifting cycles.",
    highlights: ["Wall Art & Prints", "Stationery & Planners", "Craft Supplies", "Personalised Gifts"],
  },
];
