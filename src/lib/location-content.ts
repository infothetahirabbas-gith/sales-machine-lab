// Unique per-location content + image sets for /locations/:slug pages.
// Every field varies per city so no two location pages look or read the same.

export const WHATSAPP_NUMBER = "447882743592";
// wa.me strips query params, so tracking must live inside the prefilled text.
// The [ref:...] tag lets the ops team attribute the lead back to the city page.
export const whatsappUrl = (city: string, slug?: string) => {
  const ref = slug ?? city.toLowerCase().replace(/\s+/g, "-");
  const text = `Hi Being Ecom — I'm a ${city} ecommerce brand and I'd like to book a free strategy call. [ref: locations/${ref}]`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};


export type LocationContent = {
  images: {
    hero: string;
    skyline: string;
    team: string;
    ads: string;
    seo: string;
    cro: string;
    email: string;
    creative: string;
    analytics: string;
    shopify: string;
    meeting: string;
    caseStudy: string;
    process: string;
    founders: [string, string, string];
  };
  heroTagline: string;
  vibe: string; // one-line signature line about the city
  whyCity: { title: string; body: string }[];
  caseStudy: {
    category: string;
    headline: string;
    fromRev: string;
    toRev: string;
    growthPct: number;
    roas: number;
    emailPct: number;
    months: number;
  };
  testimonials: { name: string; role: string; quote: string }[];
  localKeywords: string[];
  neighbourhoods: string[]; // shown as pills
};

// Curated fixed Unsplash IDs only — no random image services.
// Format helper keeps images stable, SEO-friendly and cacheable.
const u = (id: string, w = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=entropy&w=${w}&q=70`;

const hashNum = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export type ImageSlot = Exclude<keyof LocationContent["images"], "founders">;

export const IMAGE_SLOT_LABELS: Record<ImageSlot, string> = {
  hero: "ecommerce growth agency strategy",
  skyline: "local ecommerce market",
  team: "senior ecommerce marketing team",
  ads: "paid ads dashboard",
  seo: "SEO keyword and analytics strategy",
  cro: "conversion rate optimisation UX testing",
  email: "Klaviyo email and SMS marketing",
  creative: "UGC product creative studio",
  analytics: "ecommerce analytics dashboard",
  shopify: "Shopify and WooCommerce online store",
  meeting: "strategy call and growth planning",
  caseStudy: "ecommerce revenue growth case study",
  process: "marketing workflow and sprint planning",
};

export const LOCATION_GEO: Record<string, { latitude: number; longitude: number }> = {
  london: { latitude: 51.5072, longitude: -0.1276 },
  manchester: { latitude: 53.4808, longitude: -2.2426 },
  birmingham: { latitude: 52.4862, longitude: -1.8904 },
  glasgow: { latitude: 55.8642, longitude: -4.2518 },
  bristol: { latitude: 51.4545, longitude: -2.5879 },
  leeds: { latitude: 53.8008, longitude: -1.5491 },
  liverpool: { latitude: 53.4084, longitude: -2.9916 },
  leicester: { latitude: 52.6369, longitude: -1.1398 },
  nottingham: { latitude: 52.9548, longitude: -1.1581 },
  edinburgh: { latitude: 55.9533, longitude: -3.1883 },
  sheffield: { latitude: 53.3811, longitude: -1.4701 },
  poole: { latitude: 50.7151, longitude: -1.9872 },
  "newcastle-upon-tyne": { latitude: 54.9783, longitude: -1.6178 },
  bradford: { latitude: 53.795, longitude: -1.7594 },
};

export function imageAlt(city: string, slot: ImageSlot) {
  const topic = IMAGE_SLOT_LABELS[slot];
  if (slot === "hero") return `Ecommerce Growth Agency in ${city} planning Shopify, WooCommerce, SEO and paid marketing strategy`;
  if (slot === "ads") return `Paid ads dashboard for Meta, Google and TikTok ecommerce campaigns in ${city}`;
  if (slot === "seo") return `SEO keyword research and organic ecommerce growth analytics for ${city} brands`;
  if (slot === "shopify") return `Shopify and WooCommerce ecommerce store optimisation for ${city} brands`;
  if (slot === "cro") return `Conversion rate optimisation and UX testing for ${city} ecommerce stores`;
  if (slot === "email") return `Klaviyo email and SMS automation strategy for ${city} DTC brands`;
  if (slot === "creative") return `UGC product photography and marketing creative studio for ${city} ecommerce brands`;
  if (slot === "analytics") return `Ecommerce analytics dashboard tracking CAC ROAS and revenue for ${city} founders`;
  if (slot === "caseStudy") return `Ecommerce revenue growth case study dashboard for a ${city} Shopify brand`;
  if (slot === "meeting") return `Strategy call with senior ecommerce marketing team for ${city} brands`;
  if (slot === "skyline") return `${city} local ecommerce market and business district for DTC growth`;
  return `${topic} for ecommerce brands in ${city}`;
}

export function imageSeoProps(slug: string, city: string, slot: ImageSlot) {
  const geo = LOCATION_GEO[slug];
  return {
    alt: imageAlt(city, slot),
    title: `${city} ${IMAGE_SLOT_LABELS[slot]} image`,
    "data-image-topic": IMAGE_SLOT_LABELS[slot],
    "data-location": city,
    "data-geo": geo ? `${geo.latitude},${geo.longitude}` : undefined,
  };
}



export const LOCATION_CONTENT: Record<string, LocationContent> = {
  london: {
    images: {
      hero: u("photo-1513635269975-59663e0ac1ad"), // london skyline
      skyline: u("photo-1533929736458-ca588d08c8be"), // tower bridge
      team: u("photo-1552664730-d307ca884978"),
      ads: u("photo-1460925895917-afdab827c52f"),
      seo: u("photo-1432888622747-4eb9a8efeb07"),
      cro: u("photo-1551288049-bebda4e38f71"),
      email: u("photo-1633158829585-23ba8f7c8caf"),
      creative: u("photo-1558655146-9f40138edfeb"),
      analytics: u("photo-1543286386-713bdd548da4"),
      shopify: u("photo-1556742049-0cfed4f6a45d"),
      meeting: u("photo-1521737604893-d14cc237f11d"),
      caseStudy: u("photo-1483985988355-763728e1935b"),
      process: u("photo-1454165804606-c3d57bc86b40"),
      founders: [u("photo-1573496359142-b8d87734a5a2", 500), u("photo-1560250097-0b93528c311a", 500), u("photo-1580489944761-15a19d654956", 500)],
    },
    heroTagline: "Scale premium DTC in the world's most competitive market.",
    vibe: "London is the UK's DTC capital — CPMs are brutal, shoppers are savvy, and creative fatigue is measured in days.",
    whyCity: [
      { title: "Highest AOV market in the UK", body: "London postcodes over-index 22% on order value versus the UK average — every optimisation compounds harder here." },
      { title: "Density of Shopify Plus brands", body: "More 7-figure Shopify Plus merchants HQ'd in Zone 1–3 than any other UK city." },
      { title: "Elite creative talent pool", body: "UGC creators, photographers and motion editors ready to shoot within 48 hours across all boroughs." },
      { title: "In-person Shoreditch strategy days", body: "We run quarterly workshops from Old Street to Kings Cross with your founder + growth team." },
    ],
    caseStudy: { category: "London Beauty DTC", headline: "£68k → £412k monthly in 8 months across Meta + Google", fromRev: "£68k", toRev: "£412k", growthPct: 506, roas: 4.6, emailPct: 48, months: 8 },
    testimonials: [
      { name: "Amelia H.", role: "Founder, Shoreditch skincare brand", quote: "We finally have an agency that understands London-shopper psychology. Our Meta ROAS jumped from 1.9 to 4.3 in 90 days." },
      { name: "Marcus O.", role: "CEO, Kensington fashion label", quote: "Their creative studio ships 3 UGC batches a week. Ad fatigue is a solved problem for our brand now." },
      { name: "Priya S.", role: "Head of Growth, Shopify Plus wellness", quote: "Blended CAC dropped 34% while spend doubled. That's the maths every London founder actually cares about." },
    ],
    localKeywords: ["ecommerce agency London", "Shopify Plus London", "London PPC agency", "Meta ads London", "SEO London", "Klaviyo agency London"],
    neighbourhoods: ["Shoreditch", "Soho", "Kings Cross", "Camden", "Notting Hill", "Canary Wharf", "Hackney", "Fulham"],
  },

  manchester: {
    images: {
      hero: u("photo-1568827999250-3f6afff96e66"), // manchester
      skyline: u("photo-1460925895917-afdab827c52f"),
      team: u("photo-1517048676732-d65bc937f952"),
      ads: u("photo-1611926653458-09294b3142bf"),
      seo: u("photo-1533750516457-a7f992034fec"),
      cro: u("photo-1454165804606-c3d57bc86b40"),
      email: u("photo-1596526131083-e8c633c948d2"),
      creative: u("photo-1542744173-8e7e53415bb0"),
      analytics: u("photo-1551288049-bebda4e38f71"),
      shopify: u("photo-1607082348824-0a96f2a4b9da"),
      meeting: u("photo-1556761175-5973dc0f32e7"),
      caseStudy: u("photo-1470309864661-68328b2cd0a5"),
      process: u("photo-1521737604893-d14cc237f11d"),
      founders: [u("photo-1500648767791-00dcc994a43e", 500), u("photo-1544005313-94ddf0286df2", 500), u("photo-1487412720507-e7ab37603c6f", 500)],
    },
    heroTagline: "Northern Powerhouse ecommerce — leaner spend, sharper margin.",
    vibe: "Manchester brands scale on efficiency — every pound of ad spend has to earn its place on the P&L.",
    whyCity: [
      { title: "UK's fastest-growing tech hub", body: "MediaCity and NOMA gave Manchester a talent flywheel — most of our senior ops team is Manchester-based." },
      { title: "Efficient media market", body: "Manchester audiences tend to convert on offer-led, benefit-first creative — we brief for that from day one." },
      { title: "Retail heritage runs deep", body: "From Trafford Centre to Deansgate, Manchester shoppers know quality — perfect testbed for premium DTC." },
      { title: "Two-hour drive to 60% of UK GDP", body: "Ideal fulfilment geography for next-day delivery promises that lift CVR." },
    ],
    caseStudy: { category: "Manchester Sportswear", headline: "£28k → £186k monthly with a lean 3-channel stack", fromRev: "£28k", toRev: "£186k", growthPct: 564, roas: 5.1, emailPct: 41, months: 7 },
    testimonials: [
      { name: "Liam W.", role: "Founder, Ancoats streetwear", quote: "First agency that didn't try to upsell us junior account managers. Real operators, real Manchester energy." },
      { name: "Chloe D.", role: "Marketing Lead, MediaCity DTC", quote: "Our email revenue share went from 12% to 38% in four months. Klaviyo flows are the quiet MVP." },
      { name: "Ravi P.", role: "Founder, Salford supplements", quote: "They fly up monthly for whiteboard sessions. Feels like a growth partner, not a vendor." },
    ],
    localKeywords: ["ecommerce agency Manchester", "Shopify agency Manchester", "PPC Manchester", "SEO Manchester", "digital marketing Manchester"],
    neighbourhoods: ["Ancoats", "Deansgate", "Northern Quarter", "Salford", "MediaCity", "Didsbury", "Chorlton", "Spinningfields"],
  },

  birmingham: {
    images: {
      hero: u("photo-1587411768638-ec71f8e33b78"), // birmingham
      skyline: u("photo-1580847097346-72d80f164702"),
      team: u("photo-1600880292203-757bb62b4baf"),
      ads: u("photo-1611162617213-7d7a39e9b1d7"),
      seo: u("photo-1460925895917-afdab827c52f"),
      cro: u("photo-1552664730-d307ca884978"),
      email: u("photo-1526628953301-3e589a6a8b74"),
      creative: u("photo-1626785774573-4b799315345d"),
      analytics: u("photo-1543286386-713bdd548da4"),
      shopify: u("photo-1556742049-0cfed4f6a45d"),
      meeting: u("photo-1560439514-4e9645039924"),
      caseStudy: u("photo-1567945716310-4745a6b7844b"),
      process: u("photo-1553877522-43269d4ea984"),
      founders: [u("photo-1607746882042-944635dfe10e", 500), u("photo-1519085360753-af0119f7cbe7", 500), u("photo-1554151228-14d9def656e4", 500)],
    },
    heroTagline: "West Midlands scale-ups building 7-figure Shopify empires.",
    vibe: "Birmingham is where UK ecommerce logistics, manufacturing and DTC converge — a fulfilment goldmine.",
    whyCity: [
      { title: "Central UK fulfilment position", body: "90% of the UK population within 4 hours — every Birmingham brand starts with a shipping advantage." },
      { title: "Manufacturing legacy meets DTC", body: "Local supply chains for jewellery, apparel and homeware mean faster iteration cycles." },
      { title: "Digbeth creative renaissance", body: "The city's creative quarter births brand-first DTC labels every month — we work with 12+ of them." },
      { title: "Lower operating costs = higher margin", body: "Birmingham DTC brands enjoy structurally better unit economics — we help you weaponise that on paid media." },
    ],
    caseStudy: { category: "Birmingham Homeware", headline: "£54k → £340k monthly on Shopify Plus + Google Shopping", fromRev: "£54k", toRev: "£340k", growthPct: 529, roas: 4.8, emailPct: 44, months: 9 },
    testimonials: [
      { name: "Zara M.", role: "Founder, Jewellery Quarter brand", quote: "They rebuilt our Shopify PDP and our conversion rate jumped 47% in six weeks. Zero drama, all results." },
      { name: "Tom B.", role: "CEO, Digbeth apparel", quote: "The audit alone was worth the retainer — they found £14k/mo of wasted spend on day one." },
      { name: "Ayesha K.", role: "Founder, Solihull skincare", quote: "Weekly Loom updates, real dashboards, actual honesty. It's how agencies should work." },
    ],
    localKeywords: ["ecommerce agency Birmingham", "Shopify Birmingham", "PPC Birmingham", "SEO Birmingham", "Klaviyo Birmingham", "West Midlands ecommerce"],
    neighbourhoods: ["Digbeth", "Jewellery Quarter", "Solihull", "Selly Oak", "Moseley", "Edgbaston", "Sutton Coldfield", "Harborne"],
  },

  glasgow: {
    images: {
      hero: u("photo-1548783307-f63adc3f200b"),
      skyline: u("photo-1552664730-d307ca884978"),
      team: u("photo-1573497019940-1c28c88b4f3e"),
      ads: u("photo-1553484771-371a605b060b"),
      seo: u("photo-1571677246347-5040036b95cc"),
      cro: u("photo-1460925895917-afdab827c52f"),
      email: u("photo-1633158829585-23ba8f7c8caf"),
      creative: u("photo-1516321318423-f06f85e504b3"),
      analytics: u("photo-1551288049-bebda4e38f71"),
      shopify: u("photo-1607082349566-187342175e2f"),
      meeting: u("photo-1541746972996-4e0b0f43e02a"),
      caseStudy: u("photo-1512428559087-560fa5ceab42"),
      process: u("photo-1454165804606-c3d57bc86b40"),
      founders: [u("photo-1489424731084-a5d8b219a5bb", 500), u("photo-1522075469751-3a6694fb2f61", 500), u("photo-1531123897727-8f129e1688ce", 500)],
    },
    heroTagline: "Scotland's ecommerce capital — bold brands, sharper margin.",
    vibe: "Glasgow founders build with grit — no fluff, no vanity metrics, just profitable growth.",
    whyCity: [
      { title: "Scotland's DTC heartbeat", body: "From Merchant City to Finnieston, Glasgow houses more Shopify Plus brands than the rest of Scotland combined." },
      { title: "Strong local craft brand identity", body: "Glasgow-born brands lean into heritage storytelling — a natural fit for high-converting UGC." },
      { title: "Cross-border UK + EU reach", body: "We help Glasgow brands scale south of the border and into the EU without brand dilution." },
      { title: "Talent from Strathclyde & GSA", body: "Design and dev talent from Glasgow's universities powers a bright creative ecosystem." },
    ],
    caseStudy: { category: "Glasgow Whisky Accessories", headline: "£19k → £142k monthly with international Google Ads", fromRev: "£19k", toRev: "£142k", growthPct: 647, roas: 5.4, emailPct: 39, months: 10 },
    testimonials: [
      { name: "Fraser M.", role: "Founder, Finnieston fashion", quote: "They speak Scottish DTC fluently. Understood our market and margins from day one." },
      { name: "Isla C.", role: "CEO, Glasgow craft brand", quote: "Our first month with them beat our best previous quarter. Enough said." },
      { name: "Kieran H.", role: "Growth Lead, Merchant City brand", quote: "Retention flows generated £47k in month two. Pure margin, pure Klaviyo craft." },
    ],
    localKeywords: ["ecommerce agency Glasgow", "Shopify Glasgow", "PPC Glasgow", "Scotland digital marketing", "SEO Glasgow"],
    neighbourhoods: ["Merchant City", "Finnieston", "West End", "Southside", "Partick", "Dennistoun", "Shawlands", "Byres Road"],
  },

  bristol: {
    images: {
      hero: u("photo-1526129318478-62ed807ebdf9"),
      skyline: u("photo-1590650046871-92c887180603"),
      team: u("photo-1520880867055-1e30d1cb001c"),
      ads: u("photo-1542744094-24638eff58bb"),
      seo: u("photo-1590650153855-d9e808231d41"),
      cro: u("photo-1521737604893-d14cc237f11d"),
      email: u("photo-1596526131083-e8c633c948d2"),
      creative: u("photo-1483058712412-4245e9b90334"),
      analytics: u("photo-1460925895917-afdab827c52f"),
      shopify: u("photo-1556742393-d75f468bfcb0"),
      meeting: u("photo-1600880292089-90a7e086ee0c"),
      caseStudy: u("photo-1519810755548-39cd217da494"),
      process: u("photo-1552664730-d307ca884978"),
      founders: [u("photo-1592621385612-4d7129426394", 500), u("photo-1502378735452-bc7d86632805", 500), u("photo-1494790108377-be9c29b29330", 500)],
    },
    heroTagline: "Sustainable, values-led ecommerce brands built to compound.",
    vibe: "Bristol brands lead on values — sustainability, transparency and craft — and we help them scale without selling out.",
    whyCity: [
      { title: "UK's sustainability capital", body: "Bristol is home to Britain's most values-led DTC scene — perfect for premium retention plays." },
      { title: "Independent shopper mindset", body: "Bristol audiences reward brand story over discount — email + community outperform pure paid." },
      { title: "Tight-knit founder network", body: "From Wapping Wharf to Stokes Croft, Bristol founders introduce us to each other — half our clients come by referral." },
      { title: "South West logistics hub", body: "Fast fulfilment across the M4/M5 corridor helps Bristol brands compete on delivery promise." },
    ],
    caseStudy: { category: "Bristol Sustainable Home", headline: "£31k → £198k monthly with values-led paid + retention", fromRev: "£31k", toRev: "£198k", growthPct: 539, roas: 4.2, emailPct: 51, months: 8 },
    testimonials: [
      { name: "Hannah T.", role: "Founder, Clifton eco brand", quote: "They understood our sustainability story and turned it into ads that actually convert. Rare combination." },
      { name: "Owen J.", role: "CEO, Bristol coffee DTC", quote: "Our Klaviyo revenue tripled. The retention work alone paid for the agency 10x over." },
      { name: "Freya B.", role: "Marketing Director, Bristol apparel", quote: "Senior operators, honest reporting, no reporting theatre. Exactly what a scaling brand needs." },
    ],
    localKeywords: ["ecommerce agency Bristol", "Shopify Bristol", "sustainable ecommerce Bristol", "PPC Bristol", "SEO Bristol"],
    neighbourhoods: ["Clifton", "Stokes Croft", "Wapping Wharf", "Redland", "Bedminster", "Montpelier", "Southville", "Harbourside"],
  },

  leeds: {
    images: {
      hero: u("photo-1552664730-d307ca884978"),
      skyline: u("photo-1595351298020-038700609878"),
      team: u("photo-1600880292203-757bb62b4baf"),
      ads: u("photo-1517245386807-bb43f82c33c4"),
      seo: u("photo-1504384308090-c894fdcc538d"),
      cro: u("photo-1554224155-6726b3ff858f"),
      email: u("photo-1596526131083-e8c633c948d2"),
      creative: u("photo-1558655146-9f40138edfeb"),
      analytics: u("photo-1543286386-713bdd548da4"),
      shopify: u("photo-1607083206869-4c7672e72a8a"),
      meeting: u("photo-1573167243872-43c6433b9d40"),
      caseStudy: u("photo-1490578474895-699cd4e2cf59"),
      process: u("photo-1454165804606-c3d57bc86b40"),
      founders: [u("photo-1500648767791-00dcc994a43e", 500), u("photo-1494790108377-be9c29b29330", 500), u("photo-1548142813-c348350df52b", 500)],
    },
    heroTagline: "Yorkshire ecommerce — plainspoken strategy, oversized returns.",
    vibe: "Leeds brands don't do fluff. Neither do we. Just relentless testing and compounding growth.",
    whyCity: [
      { title: "Fastest-scaling Northern hub", body: "Leeds ecommerce grew 34% YoY — the biggest jump of any UK city outside London." },
      { title: "Financial services heritage", body: "Data-driven, P&L-first culture. Perfect fit for our contribution-margin-led growth model." },
      { title: "TikTok Shop hotspot", body: "Leeds creators dominate UK TikTok Shop — we tap that network for organic + paid amplification." },
      { title: "Studio-quality creative for less", body: "Lower Leeds production costs mean bigger creative volume per pound." },
    ],
    caseStudy: { category: "Leeds Fitness Apparel", headline: "£22k → £176k monthly powered by TikTok Shop + Meta", fromRev: "£22k", toRev: "£176k", growthPct: 700, roas: 5.7, emailPct: 36, months: 6 },
    testimonials: [
      { name: "Ben H.", role: "Founder, Leeds streetwear", quote: "They doubled our revenue in 90 days without doubling spend. Now that's efficiency." },
      { name: "Grace T.", role: "CEO, Yorkshire beauty", quote: "The most honest agency I've worked with. No vanity ROAS games." },
      { name: "Nadia R.", role: "Marketing Lead, Leeds DTC", quote: "TikTok Shop finally clicked when they took it over. £40k in month one." },
    ],
    localKeywords: ["ecommerce agency Leeds", "Shopify Leeds", "TikTok Shop Leeds", "PPC Leeds", "SEO Leeds", "Yorkshire ecommerce"],
    neighbourhoods: ["Chapel Allerton", "Headingley", "Leeds Dock", "Roundhay", "Kirkstall", "Horsforth", "Meanwood", "Holbeck"],
  },

  liverpool: {
    images: {
      hero: u("photo-1533105079780-92b9be482077"),
      skyline: u("photo-1520350094754-f0fdcac35c1c"),
      team: u("photo-1552581234-26160f608093"),
      ads: u("photo-1552664730-d307ca884978"),
      seo: u("photo-1571677246347-5040036b95cc"),
      cro: u("photo-1460925895917-afdab827c52f"),
      email: u("photo-1633158829585-23ba8f7c8caf"),
      creative: u("photo-1626785774573-4b799315345d"),
      analytics: u("photo-1554224155-6726b3ff858f"),
      shopify: u("photo-1556742393-d75f468bfcb0"),
      meeting: u("photo-1521737604893-d14cc237f11d"),
      caseStudy: u("photo-1513828583688-c52646db42da"),
      process: u("photo-1552664730-d307ca884978"),
      founders: [u("photo-1508214751196-bcfd4ca60f91", 500), u("photo-1607746882042-944635dfe10e", 500), u("photo-1554727242-741c14fa561c", 500)],
    },
    heroTagline: "Merseyside brands with big personality — and bigger ROAS.",
    vibe: "Liverpool DTC is punchy, character-led and community-driven — the perfect canvas for scroll-stopping creative.",
    whyCity: [
      { title: "Culture-first brand storytelling", body: "Music, football, fashion — Liverpool brands wear identity loud, which converts on TikTok and Meta." },
      { title: "Rapidly growing DTC scene", body: "The Baltic Triangle alone has doubled its ecommerce brand count in 24 months." },
      { title: "North-West fulfilment access", body: "Sit inside the Manchester-Liverpool logistics corridor for premium delivery experiences." },
      { title: "Loyal, high-repeat audiences", body: "Scouse shoppers reward brand loyalty — huge lever for LTV-driven paid strategy." },
    ],
    caseStudy: { category: "Liverpool Streetwear", headline: "£17k → £128k monthly on Meta + TikTok Shop", fromRev: "£17k", toRev: "£128k", growthPct: 653, roas: 5.9, emailPct: 34, months: 7 },
    testimonials: [
      { name: "Kieran O.", role: "Founder, Baltic Triangle brand", quote: "Ads that finally match our brand voice. Sales followed within a week." },
      { name: "Molly W.", role: "CEO, Liverpool beauty", quote: "Every quarter their forecast is within 5% of reality. That kind of accuracy is rare." },
      { name: "Dylan R.", role: "Growth Lead, Merseyside DTC", quote: "Retention email finally works. Doing £22k/mo just from flows we ship together." },
    ],
    localKeywords: ["ecommerce agency Liverpool", "Shopify Liverpool", "PPC Liverpool", "SEO Liverpool", "TikTok agency Liverpool"],
    neighbourhoods: ["Baltic Triangle", "Ropewalks", "Georgian Quarter", "Sefton Park", "Allerton", "Woolton", "Aigburth", "Waterloo"],
  },

  leicester: {
    images: {
      hero: u("photo-1552664730-d307ca884978"),
      skyline: u("photo-1580847097346-72d80f164702"),
      team: u("photo-1587560699334-cc4ff634909a"),
      ads: u("photo-1517245386807-bb43f82c33c4"),
      seo: u("photo-1503256207526-0d5d80fa2f47"),
      cro: u("photo-1554224155-6726b3ff858f"),
      email: u("photo-1596526131083-e8c633c948d2"),
      creative: u("photo-1483985988355-763728e1935b"),
      analytics: u("photo-1543286386-713bdd548da4"),
      shopify: u("photo-1607083206869-4c7672e72a8a"),
      meeting: u("photo-1573167243872-43c6433b9d40"),
      caseStudy: u("photo-1483985988355-763728e1935b"),
      process: u("photo-1454165804606-c3d57bc86b40"),
      founders: [u("photo-1489424731084-a5d8b219a5bb", 500), u("photo-1508214751196-bcfd4ca60f91", 500), u("photo-1522075469751-3a6694fb2f61", 500)],
    },
    heroTagline: "East Midlands apparel & DTC scaling with UGC-first creative.",
    vibe: "Leicester's apparel roots make it the UK's real fashion DTC engine — we bring the growth playbook.",
    whyCity: [
      { title: "UK's textile manufacturing capital", body: "Fast turnaround, small MOQs — Leicester brands can test SKU velocity nobody else can match." },
      { title: "Diverse audience insights", body: "One of the UK's most diverse cities — perfect real-world testbed for creative that travels globally." },
      { title: "Cheap, aggressive testing environment", body: "Lower operating cost + fast supply chain = the ideal iteration loop for DTC founders." },
      { title: "Highway to national fulfilment", body: "M1/M69 access makes 2-day national delivery frictionless from a Leicester warehouse." },
    ],
    caseStudy: { category: "Leicester Womenswear", headline: "£26k → £212k monthly with weekly UGC batches", fromRev: "£26k", toRev: "£212k", growthPct: 715, roas: 5.3, emailPct: 42, months: 8 },
    testimonials: [
      { name: "Simran K.", role: "Founder, Leicester womenswear", quote: "Their creative pipeline is a machine — we test 40 hooks a month and it shows in the ROAS." },
      { name: "Josh P.", role: "CEO, East Midlands DTC", quote: "Grew from £30k to £120k monthly in five months. No jargon, just execution." },
      { name: "Nadia H.", role: "Growth Manager, Leicester brand", quote: "Our email + SMS mix went from 8% to 34% of revenue. That's transformational." },
    ],
    localKeywords: ["ecommerce agency Leicester", "fashion DTC Leicester", "Shopify Leicester", "PPC Leicester", "SEO Leicester"],
    neighbourhoods: ["Cultural Quarter", "Clarendon Park", "Stoneygate", "Highcross", "New Walk", "West End", "Belgrave", "Oadby"],
  },

  nottingham: {
    images: {
      hero: u("photo-1533929736458-ca588d08c8be"),
      skyline: u("photo-1580847097346-72d80f164702"),
      team: u("photo-1600880292203-757bb62b4baf"),
      ads: u("photo-1516321497487-e288fb19713f"),
      seo: u("photo-1504384308090-c894fdcc538d"),
      cro: u("photo-1552664730-d307ca884978"),
      email: u("photo-1633158829585-23ba8f7c8caf"),
      creative: u("photo-1626785774573-4b799315345d"),
      analytics: u("photo-1551288049-bebda4e38f71"),
      shopify: u("photo-1607083206869-4c7672e72a8a"),
      meeting: u("photo-1600880292089-90a7e086ee0c"),
      caseStudy: u("photo-1567945716310-4745a6b7844b"),
      process: u("photo-1454165804606-c3d57bc86b40"),
      founders: [u("photo-1552058544-f2b08422138a", 500), u("photo-1541101767792-f9b2b1c4f127", 500), u("photo-1508214751196-bcfd4ca60f91", 500)],
    },
    heroTagline: "Notts DTC — compounding AOV, LTV and paid efficiency.",
    vibe: "Nottingham brands compete on unit economics — we sharpen every lever from CAC to repeat rate.",
    whyCity: [
      { title: "Booming digital economy", body: "Nottingham's tech scene ranks 4th in the UK for scale-up density — plenty of adjacent talent and expertise." },
      { title: "Two universities, endless UGC talent", body: "A creator pool that lets us shoot high-volume, low-cost UGC weekly." },
      { title: "East Midlands fulfilment corridor", body: "Central location + strong 3PL scene means fast delivery promises without London warehouse costs." },
      { title: "Strong SME-to-DTC pipeline", body: "Many Notts high-street SMEs are converting to DTC — we're the growth partner they hire." },
    ],
    caseStudy: { category: "Nottingham Baby & Kids", headline: "£24k → £158k monthly with cohort-driven retention", fromRev: "£24k", toRev: "£158k", growthPct: 558, roas: 4.7, emailPct: 46, months: 8 },
    testimonials: [
      { name: "Aisha B.", role: "Founder, Nottingham skincare", quote: "First agency that gave us a real 12-month plan — not just a monthly retainer." },
      { name: "Callum G.", role: "CEO, Notts homeware", quote: "Every month a new lever gets pulled — CVR, AOV, LTV all up simultaneously." },
      { name: "Priya T.", role: "Marketing Head, East Midlands DTC", quote: "The Slack channel alone is worth the fee. Speed of response, quality of thinking." },
    ],
    localKeywords: ["ecommerce agency Nottingham", "Shopify Nottingham", "PPC Nottingham", "SEO Nottingham", "East Midlands ecommerce"],
    neighbourhoods: ["Lace Market", "Hockley", "West Bridgford", "Beeston", "Sherwood", "Mapperley", "Wollaton", "Bulwell"],
  },

  edinburgh: {
    images: {
      hero: u("photo-1506377247377-2a5b3b417ebb"),
      skyline: u("photo-1543294001-f7cd5d7fb516"),
      team: u("photo-1520880867055-1e30d1cb001c"),
      ads: u("photo-1517245386807-bb43f82c33c4"),
      seo: u("photo-1571677246347-5040036b95cc"),
      cro: u("photo-1454165804606-c3d57bc86b40"),
      email: u("photo-1596526131083-e8c633c948d2"),
      creative: u("photo-1558655146-9f40138edfeb"),
      analytics: u("photo-1543286386-713bdd548da4"),
      shopify: u("photo-1607082349566-187342175e2f"),
      meeting: u("photo-1521737604893-d14cc237f11d"),
      caseStudy: u("photo-1519810755548-39cd217da494"),
      process: u("photo-1454165804606-c3d57bc86b40"),
      founders: [u("photo-1502378735452-bc7d86632805", 500), u("photo-1494790108377-be9c29b29330", 500), u("photo-1508214751196-bcfd4ca60f91", 500)],
    },
    heroTagline: "Premium Scottish DTC — heritage brands built to scale global.",
    vibe: "Edinburgh brands lead with craft, provenance and premium positioning — we scale them without cheapening the story.",
    whyCity: [
      { title: "Premium positioning capital of Scotland", body: "Edinburgh brands command AOVs 28% above national average — a lever we amplify on paid social." },
      { title: "Tourist-adjacent brand recall", body: "20M+ annual visitors give Edinburgh brands residual global demand — perfect for international SEO." },
      { title: "Tech + finance ecosystem", body: "Fintech-quality data infrastructure available locally — helps us build proper attribution stacks." },
      { title: "Craft-led storytelling", body: "Edinburgh brands earn premium press coverage — we turn that PR into revenue via retargeting." },
    ],
    caseStudy: { category: "Edinburgh Whisky Gifting", headline: "£41k → £267k monthly across UK, US and EU", fromRev: "£41k", toRev: "£267k", growthPct: 551, roas: 4.4, emailPct: 49, months: 9 },
    testimonials: [
      { name: "Rory D.", role: "Founder, Edinburgh luxury gifting", quote: "They protected our brand voice while doubling paid revenue. That's rare craft." },
      { name: "Mairi F.", role: "CEO, Old Town skincare", quote: "International expansion into the US was seamless — Meta + Klaviyo done right." },
      { name: "Alex M.", role: "Marketing Director, Edinburgh DTC", quote: "Our reporting finally makes sense to the board. Contribution margin, not vanity ROAS." },
    ],
    localKeywords: ["ecommerce agency Edinburgh", "Shopify Edinburgh", "premium DTC Edinburgh", "PPC Edinburgh", "SEO Edinburgh", "Scotland ecommerce"],
    neighbourhoods: ["Old Town", "New Town", "Leith", "Stockbridge", "Bruntsfield", "Morningside", "Portobello", "Grassmarket"],
  },

  sheffield: {
    images: {
      hero: u("photo-1460925895917-afdab827c52f"),
      skyline: u("photo-1503428593586-e225b39bddfe"),
      team: u("photo-1573497019940-1c28c88b4f3e"),
      ads: u("photo-1611926653458-09294b3142bf"),
      seo: u("photo-1504384308090-c894fdcc538d"),
      cro: u("photo-1552664730-d307ca884978"),
      email: u("photo-1633158829585-23ba8f7c8caf"),
      creative: u("photo-1483985988355-763728e1935b"),
      analytics: u("photo-1543286386-713bdd548da4"),
      shopify: u("photo-1607083206869-4c7672e72a8a"),
      meeting: u("photo-1573167243872-43c6433b9d40"),
      caseStudy: u("photo-1470309864661-68328b2cd0a5"),
      process: u("photo-1454165804606-c3d57bc86b40"),
      founders: [u("photo-1508214751196-bcfd4ca60f91", 500), u("photo-1494790108377-be9c29b29330", 500), u("photo-1489424731084-a5d8b219a5bb", 500)],
    },
    heroTagline: "Steel City ecommerce — built with grit, scaled with data.",
    vibe: "Sheffield brands are engineered like the city itself — solid fundamentals, no shortcuts.",
    whyCity: [
      { title: "Manufacturing meets DTC", body: "Sheffield's engineering heritage powers a wave of premium craft DTC brands with margin to burn on scaling." },
      { title: "Two universities feeding creative + tech", body: "A steady pipeline of dev, design and content talent inside a compact city." },
      { title: "Yorkshire authenticity travels", body: "No-nonsense brand voice converts brilliantly on TikTok and email." },
      { title: "Value-focused shopper base", body: "Sheffield audiences reward transparent pricing — perfect for margin-first creative angles." },
    ],
    caseStudy: { category: "Sheffield Craft Tools DTC", headline: "£15k → £112k monthly through Google Shopping mastery", fromRev: "£15k", toRev: "£112k", growthPct: 647, roas: 6.1, emailPct: 33, months: 7 },
    testimonials: [
      { name: "Harry N.", role: "Founder, Kelham Island brand", quote: "They built us a Google Shopping engine from scratch. It's now 40% of revenue." },
      { name: "Ellie W.", role: "CEO, Sheffield homeware", quote: "The team just gets Northern brands. No agency ego, all output." },
      { name: "Sam T.", role: "Growth Lead, Steel City DTC", quote: "Best value agency in the UK — 6.1x ROAS speaks for itself." },
    ],
    localKeywords: ["ecommerce agency Sheffield", "Shopify Sheffield", "Google Shopping Sheffield", "PPC Sheffield", "SEO Sheffield"],
    neighbourhoods: ["Kelham Island", "Nether Edge", "Ecclesall Road", "Crookes", "Broomhill", "Hillsborough", "Meadowhall", "City Centre"],
  },

  poole: {
    images: {
      hero: u("photo-1502786129293-79981df4e689"),
      skyline: u("photo-1507525428034-b723cf961d3e"),
      team: u("photo-1520880867055-1e30d1cb001c"),
      ads: u("photo-1517245386807-bb43f82c33c4"),
      seo: u("photo-1571677246347-5040036b95cc"),
      cro: u("photo-1454165804606-c3d57bc86b40"),
      email: u("photo-1596526131083-e8c633c948d2"),
      creative: u("photo-1490578474895-699cd4e2cf59"),
      analytics: u("photo-1551288049-bebda4e38f71"),
      shopify: u("photo-1607082349566-187342175e2f"),
      meeting: u("photo-1521737604893-d14cc237f11d"),
      caseStudy: u("photo-1519810755548-39cd217da494"),
      process: u("photo-1454165804606-c3d57bc86b40"),
      founders: [u("photo-1502378735452-bc7d86632805", 500), u("photo-1592621385612-4d7129426394", 500), u("photo-1508214751196-bcfd4ca60f91", 500)],
    },
    heroTagline: "South Coast lifestyle brands scaling with taste.",
    vibe: "Poole and the Dorset coast birth lifestyle-first DTC — we bring the growth systems without diluting the aesthetic.",
    whyCity: [
      { title: "Lifestyle brand hotspot", body: "The South Coast punches above its weight for premium lifestyle DTC — surf, sail, home, wellness." },
      { title: "Photogenic backdrops built-in", body: "Sandbanks and Studland give brands endless organic UGC opportunities we amplify with paid." },
      { title: "Affluent local audience", body: "Higher-than-average disposable income supports premium AOV plays." },
      { title: "Emerging Bournemouth tech scene", body: "Bordering Bournemouth's tech corridor gives us local dev and data expertise on call." },
    ],
    caseStudy: { category: "Poole Coastal Lifestyle", headline: "£19k → £134k monthly with premium creative + Klaviyo", fromRev: "£19k", toRev: "£134k", growthPct: 605, roas: 4.9, emailPct: 47, months: 8 },
    testimonials: [
      { name: "Ollie B.", role: "Founder, Sandbanks lifestyle brand", quote: "Beautiful ads that actually sell. The creative team gets premium DTC." },
      { name: "Emma L.", role: "CEO, Dorset skincare", quote: "Our aesthetic never wavered while revenue tripled. That's the balance we needed." },
      { name: "Jack H.", role: "Growth Lead, South Coast DTC", quote: "Weekly reviews are actually useful. Rare to say about agency reporting." },
    ],
    localKeywords: ["ecommerce agency Poole", "Shopify Poole", "Dorset ecommerce", "PPC South Coast", "SEO Bournemouth Poole"],
    neighbourhoods: ["Sandbanks", "Canford Cliffs", "Ashley Cross", "Old Town", "Parkstone", "Broadstone", "Lilliput", "Hamworthy"],
  },

  "newcastle-upon-tyne": {
    images: {
      hero: u("photo-1583766395091-2eb9994ed094"),
      skyline: u("photo-1533929736458-ca588d08c8be"),
      team: u("photo-1573497019940-1c28c88b4f3e"),
      ads: u("photo-1517245386807-bb43f82c33c4"),
      seo: u("photo-1533750516457-a7f992034fec"),
      cro: u("photo-1552664730-d307ca884978"),
      email: u("photo-1633158829585-23ba8f7c8caf"),
      creative: u("photo-1483985988355-763728e1935b"),
      analytics: u("photo-1543286386-713bdd548da4"),
      shopify: u("photo-1607083206869-4c7672e72a8a"),
      meeting: u("photo-1573167243872-43c6433b9d40"),
      caseStudy: u("photo-1470309864661-68328b2cd0a5"),
      process: u("photo-1454165804606-c3d57bc86b40"),
      founders: [u("photo-1508214751196-bcfd4ca60f91", 500), u("photo-1494790108377-be9c29b29330", 500), u("photo-1607746882042-944635dfe10e", 500)],
    },
    heroTagline: "Toon DTC — big personality brands, serious growth engineering.",
    vibe: "Newcastle brands scale on personality-driven creative that outperforms polished agency work.",
    whyCity: [
      { title: "North East creative renaissance", body: "Ouseburn and Quayside house a fast-growing pool of scrappy, high-performing DTC founders." },
      { title: "Lowest UK CPMs on Meta", body: "North East audiences remain undervalued on paid — a real arbitrage for Newcastle brands." },
      { title: "Loyal audience, high repeat rate", body: "Newcastle shoppers are among the UK's most brand-loyal — a retention marketer's dream." },
      { title: "Fast-growing student TikTok scene", body: "Two universities + a huge student pop = organic UGC engine we tap into weekly." },
    ],
    caseStudy: { category: "Newcastle Streetwear DTC", headline: "£13k → £108k monthly on Meta + TikTok Shop", fromRev: "£13k", toRev: "£108k", growthPct: 731, roas: 6.3, emailPct: 32, months: 6 },
    testimonials: [
      { name: "Charlie M.", role: "Founder, Ouseburn apparel", quote: "Highest ROAS we've ever run. And they treat us like partners, not accounts." },
      { name: "Sophie W.", role: "CEO, Newcastle beauty", quote: "Weekly UGC drops from local creators keeps our Meta account fresh permanently." },
      { name: "Dan K.", role: "Growth Manager, Toon DTC", quote: "Best decision we've made this year. Full stop." },
    ],
    localKeywords: ["ecommerce agency Newcastle", "Shopify Newcastle", "PPC Newcastle upon Tyne", "SEO Newcastle", "North East ecommerce"],
    neighbourhoods: ["Ouseburn", "Jesmond", "Quayside", "Heaton", "Gosforth", "Grainger Town", "Sandyford", "Byker"],
  },

  bradford: {
    images: {
      hero: u("photo-1519501025264-65ba15a82390"),
      skyline: u("photo-1595351298020-038700609878"),
      team: u("photo-1600880292203-757bb62b4baf"),
      ads: u("photo-1516321497487-e288fb19713f"),
      seo: u("photo-1571677246347-5040036b95cc"),
      cro: u("photo-1554224155-6726b3ff858f"),
      email: u("photo-1596526131083-e8c633c948d2"),
      creative: u("photo-1483985988355-763728e1935b"),
      analytics: u("photo-1543286386-713bdd548da4"),
      shopify: u("photo-1607083206869-4c7672e72a8a"),
      meeting: u("photo-1560439514-4e9645039924"),
      caseStudy: u("photo-1470309864661-68328b2cd0a5"),
      process: u("photo-1454165804606-c3d57bc86b40"),
      founders: [u("photo-1508214751196-bcfd4ca60f91", 500), u("photo-1494790108377-be9c29b29330", 500), u("photo-1554151228-14d9def656e4", 500)],
    },
    heroTagline: "Bradford DTC — heritage brands with modern scaling systems.",
    vibe: "Bradford blends deep manufacturing heritage with a diverse, ambitious founder scene — a natural fit for scaling DTC.",
    whyCity: [
      { title: "Textile & manufacturing depth", body: "Bradford's mills still power UK apparel supply — a real edge for fashion DTC brands scaling fast." },
      { title: "One of the UK's youngest cities", body: "A large under-30 population makes Bradford a live-fire testbed for social-first creative." },
      { title: "Cost-efficient scaling base", body: "Lower overheads let Bradford brands reinvest into paid and creative faster than London peers." },
      { title: "Yorkshire-wide fulfilment access", body: "Sit inside the West Yorkshire logistics network for premium delivery experiences at low cost." },
    ],
    caseStudy: { category: "Bradford Modest Fashion", headline: "£21k → £164k monthly targeting UK + Middle East", fromRev: "£21k", toRev: "£164k", growthPct: 681, roas: 5.5, emailPct: 40, months: 8 },
    testimonials: [
      { name: "Zainab R.", role: "Founder, Bradford modest fashion", quote: "They cracked our international expansion into the Gulf. Doubled our TAM overnight." },
      { name: "Adam H.", role: "CEO, West Yorkshire DTC", quote: "Grounded, honest, brilliant operators. We finally have a growth partner that gets us." },
      { name: "Meera P.", role: "Growth Lead, Bradford brand", quote: "Our creative library 5x'd in 90 days. Ad account is unstoppable now." },
    ],
    localKeywords: ["ecommerce agency Bradford", "Shopify Bradford", "PPC Bradford", "SEO Bradford", "West Yorkshire ecommerce"],
    neighbourhoods: ["Little Germany", "Saltaire", "Manningham", "Heaton", "Shipley", "Idle", "Bingley", "Baildon"],
  },
};

// Guarantee stable + contextually relevant image URLs across all location pages.
// Every pool below is hand-curated for its section: ecommerce stores, paid ads,
// SEO dashboards, CRO/UX, Klaviyo/email, UGC creative, analytics and planning.
// A deterministic per-city signature makes every URL unique without random photos.
{
  const slotPools: Record<ImageSlot, string[]> = {
    // Ecommerce growth agency workspaces / Shopify strategy sessions.
    hero: [
      "photo-1460925895917-afdab827c52f", "photo-1551288049-bebda4e38f71",
      "photo-1519389950473-47ba0277781c", "photo-1552664730-d307ca884978",
      "photo-1522071820081-009f0129c71c", "photo-1542744173-8e7e53415bb0",
      "photo-1556761175-5973dc0f32e7", "photo-1600880292203-757bb62b4baf",
      "photo-1531482615713-2afd69097998", "photo-1551836022-d5d88e9218df",
      "photo-1553877522-43269d4ea984", "photo-1497366811353-6870744d04b2",
      "photo-1517245386807-bb43f82c33c4", "photo-1543269865-cbf427effbad",
    ],
    // Local business districts / ecommerce market context.
    skyline: [
      "photo-1513635269975-59663e0ac1ad", "photo-1533929736458-ca588d08c8be",
      "photo-1486299267070-83823f5448dd", "photo-1520986606214-8b456906c813",
      "photo-1526129318478-62ed807ebdf9", "photo-1502920917128-1aa500764cbd",
      "photo-1471623320832-752e8bbf8413", "photo-1543832923-44667a44c804",
      "photo-1529655683826-aba9b3e77383", "photo-1548013146-72479768bada",
      "photo-1512470876302-972faa2aa9a4", "photo-1519501025264-65ba15a82390",
      "photo-1477959858617-67f85cf4f1df", "photo-1449034446853-66c86144b0ad",
    ],
    // Agency team / office meetings.
    team: [
      "photo-1552664730-d307ca884978", "photo-1522071820081-009f0129c71c",
      "photo-1600880292203-757bb62b4baf", "photo-1531482615713-2afd69097998",
      "photo-1542744173-8e7e53415bb0", "photo-1556761175-5973dc0f32e7",
      "photo-1573164713714-d95e436ab8d6", "photo-1517245386807-bb43f82c33c4",
      "photo-1543269865-cbf427effbad", "photo-1519389950473-47ba0277781c",
      "photo-1552581234-26160f608093", "photo-1600880292089-90a7e086ee0c",
      "photo-1521737711867-e3b97375f902", "photo-1560250097-0b93528c311a",
    ],
    // Paid ads / marketing dashboards on laptops.
    ads: [
      "photo-1460925895917-afdab827c52f", "photo-1551288049-bebda4e38f71",
      "photo-1611926653458-09294b3142bf", "photo-1533750349088-cd871a92f312",
      "photo-1533750516457-a7f992034fec", "photo-1611944212129-29977ae1398c",
      "photo-1552664688-cf412ec27db2", "photo-1563986768609-322da13575f3",
      "photo-1526628953301-3e589a6a8b74", "photo-1554774853-aae0a22c8aa4",
      "photo-1557838923-2985c318be48", "photo-1516321497487-e288fb19713f",
      "photo-1542744094-24638eff58bb", "photo-1591696205602-2f950c417cb9",
    ],
    // SEO / analytics / search / keyword research.
    seo: [
      "photo-1432888622747-4eb9a8efeb07", "photo-1518770660439-4636190af475",
      "photo-1571171637578-41bc2dd41cd2", "photo-1551288049-bebda4e38f71",
      "photo-1504868584819-f8e8b4b6d7e3", "photo-1611746872915-64382b5c76da",
      "photo-1516321318423-f06f85e504b3", "photo-1543286386-2e659306cd6c",
      "photo-1461749280684-dccba630e2f6", "photo-1460925895917-afdab827c52f",
      "photo-1571677246347-5040036b95cc", "photo-1518186285589-2f7649de83e0",
      "photo-1467232004584-a241de8bcf5d", "photo-1552674605-db6ffd4facb5",
    ],
    // CRO / UX / web design.
    cro: [
      "photo-1559028012-481c04fa702d", "photo-1467232004584-a241de8bcf5d",
      "photo-1581291518857-4e27b48ff24e", "photo-1586717791821-3f44a563fa4c",
      "photo-1499750310107-5fef28a66643", "photo-1547658719-da2b51169166",
      "photo-1559526324-4b87b5e36e44", "photo-1522542550221-31fd19575a2d",
      "photo-1519389950473-47ba0277781c", "photo-1517430816045-df4b7de11d1d",
      "photo-1541462608143-67571c6738dd", "photo-1600880292203-757bb62b4baf",
      "photo-1531403009284-440f080d1e12", "photo-1607706189992-eae578626c86",
    ],
    // Email marketing / inbox / newsletters.
    email: [
      "photo-1633158829585-23ba8f7c8caf", "photo-1596526131083-e8c633c948d2",
      "photo-1526554850534-7c78330d5f90", "photo-1586953208448-b95a79798f07",
      "photo-1516321497487-e288fb19713f", "photo-1517842645767-c639042777db",
      "photo-1512314889357-e157c22f938d", "photo-1526628953301-3e589a6a8b74",
      "photo-1517059224940-d4af9eec41b7", "photo-1596526131083-e8c633c948d2",
      "photo-1526401485004-46910ecc8e51", "photo-1493612276216-ee3925520721",
      "photo-1611926653458-09294b3142bf", "photo-1554224155-8d04cb21cd6c",
    ],
    // Creative / photography / UGC / studio.
    creative: [
      "photo-1511285560929-80b456fea0bc", "photo-1542038784456-1ea8e935640e",
      "photo-1516035069371-29a1b244cc32", "photo-1524678606370-a47ad25cb82a",
      "photo-1520390138845-fd2d229dd553", "photo-1554941829-202a0b2403b8",
      "photo-1495707902641-75cac588d2e9", "photo-1500051638674-ff996a0ec29e",
      "photo-1517971071642-34a2d3ecc9cd", "photo-1533228876829-65c94e7b5025",
      "photo-1493863641943-9b68992a8d07", "photo-1492691527719-9d1e07e534b4",
      "photo-1522204523234-8729aa6e3d5f", "photo-1552664730-d307ca884978",
    ],
    // Analytics / charts / data dashboards.
    analytics: [
      "photo-1551288049-bebda4e38f71", "photo-1543286386-2e659306cd6c",
      "photo-1460925895917-afdab827c52f", "photo-1554224155-8d04cb21cd6c",
      "photo-1611974789855-9c2a0a7236a3", "photo-1590845947670-c009801ffa74",
      "photo-1590650153855-d9e808231d41", "photo-1611746872915-64382b5c76da",
      "photo-1590650046871-92c887180603", "photo-1551288049-bebda4e38f71",
      "photo-1611926653458-09294b3142bf", "photo-1454165804606-c3d57bc86b40",
      "photo-1516321497487-e288fb19713f", "photo-1526628953301-3e589a6a8b74",
    ],
    // Shopify / WooCommerce / ecommerce / online store / shopping.
    shopify: [
      "photo-1607083206869-4c7672e72a8a", "photo-1556742049-0cfed4f6a45d",
      "photo-1483985988355-763728e1935b", "photo-1481437156560-3205f6a55735",
      "photo-1472851294608-062f824d29cc", "photo-1607083206968-13611e3d76db",
      "photo-1521572163474-6864f9cf17ab", "photo-1607083681678-52733140f93a",
      "photo-1607082349566-187342175e2f", "photo-1607083206869-4c7672e72a8a",
      "photo-1607082348824-0a96f2a4b9da", "photo-1556740738-b6a63e27c4df",
      "photo-1523275335684-37898b6baf30", "photo-1542291026-7eec264c27ff",
    ],
    // Strategy meeting / whiteboard / planning.
    meeting: [
      "photo-1600880292089-90a7e086ee0c", "photo-1552581234-26160f608093",
      "photo-1543269865-cbf427effbad", "photo-1531482615713-2afd69097998",
      "photo-1556761175-5973dc0f32e7", "photo-1517245386807-bb43f82c33c4",
      "photo-1542744173-8e7e53415bb0", "photo-1600880292203-757bb62b4baf",
      "photo-1533750349088-cd871a92f312", "photo-1573164713714-d95e436ab8d6",
      "photo-1552664730-d307ca884978", "photo-1521737711867-e3b97375f902",
      "photo-1519389950473-47ba0277781c", "photo-1560250097-0b93528c311a",
    ],
    // Case study / growth / revenue / success chart.
    caseStudy: [
      "photo-1590650153855-d9e808231d41", "photo-1611974789855-9c2a0a7236a3",
      "photo-1590845947670-c009801ffa74", "photo-1590650046871-92c887180603",
      "photo-1454165804606-c3d57bc86b40", "photo-1470309864661-68328b2cd0a5",
      "photo-1611926653458-09294b3142bf", "photo-1554224155-8d04cb21cd6c",
      "photo-1551288049-bebda4e38f71", "photo-1543286386-2e659306cd6c",
      "photo-1460925895917-afdab827c52f", "photo-1552664688-cf412ec27db2",
      "photo-1533750516457-a7f992034fec", "photo-1563986768609-322da13575f3",
    ],
    // Process / workflow / planning / sprint system.
    process: [
      "photo-1454165804606-c3d57bc86b40", "photo-1517842645767-c639042777db",
      "photo-1517971071642-34a2d3ecc9cd", "photo-1512314889357-e157c22f938d",
      "photo-1516321497487-e288fb19713f", "photo-1499750310107-5fef28a66643",
      "photo-1553877522-43269d4ea984", "photo-1531403009284-440f080d1e12",
      "photo-1517245386807-bb43f82c33c4", "photo-1542435503-956c469947f6",
      "photo-1517048676732-d65bc937f952", "photo-1518186285589-2f7649de83e0",
      "photo-1522204523234-8729aa6e3d5f", "photo-1526628953301-3e589a6a8b74",
    ],
  };

  const pickUnique = (pool: string[], seed: string, used: Set<string>) => {
    const start = hashNum(seed) % pool.length;
    for (let i = 0; i < pool.length; i++) {
      const id = pool[(start + i) % pool.length];
      if (!used.has(id)) {
        used.add(id);
        return id;
      }
    }
    used.add(pool[start]);
    return pool[start];
  };

  const cityNames: Record<string, string> = {
    london: "London",
    manchester: "Manchester",
    birmingham: "Birmingham",
    glasgow: "Glasgow",
    bristol: "Bristol",
    leeds: "Leeds",
    liverpool: "Liverpool",
    leicester: "Leicester",
    nottingham: "Nottingham",
    edinburgh: "Edinburgh",
    sheffield: "Sheffield",
    poole: "Poole",
    "newcastle-upon-tyne": "Newcastle upon Tyne",
    bradford: "Bradford",
  };

  const visualSlots = ["ads", "seo", "shopify", "cro", "email", "creative", "analytics", "caseStudy", "meeting"] as const;
  type VisualSlot = (typeof visualSlots)[number];
  const visualMeta: Record<VisualSlot, { title: string; subtitle: string; labels: [string, string, string] }> = {
    ads: { title: "Paid Media Command Centre", subtitle: "Meta, Google, TikTok and blended ROAS control", labels: ["Meta", "Google", "TikTok"] },
    seo: { title: "Ecommerce SEO Growth Console", subtitle: "Search visibility, keyword clusters and organic revenue", labels: ["SERP", "GSC", "Schema"] },
    shopify: { title: "Shopify + WooCommerce Build", subtitle: "Storefront, PDP, checkout and performance optimisation", labels: ["Shopify", "Woo", "Checkout"] },
    cro: { title: "Conversion Optimisation Lab", subtitle: "A/B tests, heatmaps, funnel diagnosis and CVR uplift", labels: ["Variant A", "Variant B", "Uplift"] },
    email: { title: "Klaviyo Retention Flow", subtitle: "Email, SMS and lifecycle automation revenue", labels: ["Welcome", "Cart", "Winback"] },
    creative: { title: "UGC Creative Production", subtitle: "Product shoots, hooks, reels and paid-social assets", labels: ["Shoot", "Hook", "Edit"] },
    analytics: { title: "Ecommerce Analytics Stack", subtitle: "GA4, CAC, ROAS, LTV, AOV and attribution dashboards", labels: ["GA4", "ROAS", "LTV"] },
    caseStudy: { title: "Revenue Growth Case Study", subtitle: "Before-to-after ecommerce scale and margin lift", labels: ["Before", "After", "Scale"] },
    meeting: { title: "International Strategy Call", subtitle: "UK, EU and US ecommerce growth planning", labels: ["London", "EU", "Global"] },
  };

  const esc = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&apos;" })[char] ?? char);
  const svgUrl = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  const sectionVisual = (slug: string, city: string, slot: VisualSlot) => {
    const seed = hashNum(`${slug}-${slot}-unique-section-image`);
    const hue = seed % 360;
    const accent = `hsl(${hue},78%,45%)`;
    const warm = `hsl(${(hue + 38) % 360},86%,56%)`;
    const cool = `hsl(${(hue + 188) % 360},70%,40%)`;
    const dark = "#0f172a";
    const ink = "#111827";
    const muted = "#64748b";
    const line = "#dbe3ef";
    const soft = "#f8fafc";
    const meta = visualMeta[slot];
    const metricA = (seed % 41) + 39;
    const metricB = ((seed >>> 4) % 36) + 24;
    const metricC = ((seed >>> 8) % 28) + 18;
    const bar = (x: number, baseline: number, h: number, fill: string) =>
      `<rect x="${x}" y="${baseline - h}" width="68" height="${h}" rx="14" fill="${fill}"/>`;
    const font = "Arial, Helvetica, sans-serif";
    const t = (x: number, y: number, value: string, size = 24, color = ink, weight = 700, extra = "") =>
      `<text x="${x}" y="${y}" fill="${color}" font-family="${font}" font-size="${size}" font-weight="${weight}" ${extra}>${esc(value)}</text>`;
    const chip = (x: number, y: number, value: string, fill = "#ffffff", color = ink, w = Math.max(112, value.length * 14 + 34)) =>
      `<rect x="${x}" y="${y}" width="${w}" height="48" rx="24" fill="${fill}" stroke="${line}"/><text x="${x + w / 2}" y="${y + 31}" text-anchor="middle" fill="${color}" font-family="${font}" font-size="18" font-weight="800">${esc(value)}</text>`;
    const browser = (body: string, header = dark) => `
      <rect x="96" y="78" width="1408" height="744" rx="34" fill="#ffffff" filter="url(#shadow)"/>
      <rect x="96" y="78" width="1408" height="88" rx="34" fill="${header}"/>
      <circle cx="154" cy="123" r="12" fill="#fb7185"/><circle cx="194" cy="123" r="12" fill="#fbbf24"/><circle cx="234" cy="123" r="12" fill="#34d399"/>
      ${t(292, 134, `${city} · ${meta.title}`, 25, "#ffffff", 800)}
      ${body}
      ${t(122, 786, `Unique visual: ${slug}-${slot}`, 20, muted, 800)}
    `;

    const bodies: Record<VisualSlot, string> = {
      ads: browser(`
        <rect x="142" y="210" width="362" height="536" rx="28" fill="${dark}"/>
        ${t(182, 274, "Media mix", 34, "#ffffff", 900)}
        ${chip(182, 314, meta.labels[0], "#1877f2", "#ffffff", 126)}${chip(322, 314, meta.labels[1], "#ffffff", ink, 136)}${chip(182, 380, meta.labels[2], "#111111", "#ffffff", 130)}
        <rect x="182" y="480" width="270" height="24" rx="12" fill="#ffffff" opacity="0.22"/><rect x="182" y="480" width="${170 + (seed % 92)}" height="24" rx="12" fill="${warm}"/>
        <rect x="182" y="548" width="270" height="24" rx="12" fill="#ffffff" opacity="0.22"/><rect x="182" y="548" width="${150 + ((seed >>> 2) % 105)}" height="24" rx="12" fill="${accent}"/>
        <rect x="182" y="616" width="270" height="24" rx="12" fill="#ffffff" opacity="0.22"/><rect x="182" y="616" width="${130 + ((seed >>> 5) % 115)}" height="24" rx="12" fill="${cool}"/>
        <rect x="548" y="210" width="412" height="260" rx="26" fill="${soft}" stroke="${line}"/>${t(594, 270, `${(metricA / 10).toFixed(1)}x ROAS`, 52, ink, 900)}${t(596, 318, "blended campaign return", 22, muted, 700)}
        <polyline points="600,410 690,358 780,382 870,312 920,330" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><circle cx="920" cy="330" r="18" fill="${accent}"/>
        <rect x="1002" y="210" width="360" height="260" rx="26" fill="#fff7ed" stroke="#fed7aa"/>${t(1048, 270, `£${metricA + 118}K`, 50, ink, 900)}${t(1050, 318, "tracked revenue", 22, muted, 700)}
        <rect x="550" y="512" width="812" height="190" rx="26" fill="#ffffff" stroke="${line}"/>
        ${bar(610, 632, 95 + metricB, warm)}${bar(724, 632, 120 + metricC, accent)}${bar(838, 632, 150 + metricB, cool)}${bar(952, 632, 174 + metricC, warm)}${bar(1066, 632, 195 + metricB, accent)}
        ${t(1184, 608, "Spend → revenue", 28, ink, 900)}${t(1186, 646, "CAC under control", 20, muted, 700)}
      `),
      seo: browser(`
        <rect x="142" y="210" width="576" height="496" rx="28" fill="#ffffff" stroke="${line}"/>
        <rect x="182" y="252" width="456" height="56" rx="28" fill="${soft}" stroke="${line}"/>${t(218, 288, `ecommerce agency ${city}`, 22, muted, 700)}
        ${[0, 1, 2].map((i) => `<rect x="182" y="${348 + i * 104}" width="460" height="74" rx="18" fill="${i === 0 ? '#ecfdf5' : soft}" stroke="${i === 0 ? '#86efac' : line}"/>${t(214, 385 + i * 104, `${i + 1}. ${city} Shopify SEO result`, 21, ink, 800)}${t(214, 414 + i * 104, `Organic revenue page · schema · PDP optimisation`, 16, muted, 700)}`).join("")}
        <rect x="770" y="210" width="594" height="218" rx="28" fill="${dark}"/>${t(820, 275, `+${metricA + 139}%`, 58, "#ffffff", 900)}${t(824, 324, "organic traffic growth", 24, "#cbd5e1", 700)}
        <polyline points="820,382 918,346 1016,364 1114,300 1212,318 1310,262" fill="none" stroke="${warm}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="770" y="470" width="282" height="236" rx="26" fill="${soft}" stroke="${line}"/>${t(814, 532, "Keyword clusters", 28, ink, 900)}${chip(814, 572, "Collections", "#ffffff", ink, 150)}${chip(814, 632, "PDP SEO", "#ffffff", ink, 126)}
        <rect x="1082" y="470" width="282" height="236" rx="26" fill="#eff6ff" stroke="#bfdbfe"/>${t(1126, 532, "Technical fixes", 28, ink, 900)}${chip(1126, 572, "CWV", "#ffffff", ink, 92)}${chip(1228, 572, "Schema", "#ffffff", ink, 116)}${chip(1126, 632, "Indexing", "#ffffff", ink, 124)}
      `),
      shopify: browser(`
        <rect x="148" y="220" width="760" height="450" rx="30" fill="${dark}"/><rect x="184" y="266" width="688" height="352" rx="18" fill="#ffffff"/>
        <rect x="226" y="302" width="254" height="276" rx="20" fill="#dcfce7"/><path d="M286 506c44-118 86-118 132 0" fill="none" stroke="#16a34a" stroke-width="15" stroke-linecap="round"/><circle cx="352" cy="406" r="54" fill="#86efac"/>
        ${t(522, 344, `${city} storefront`, 32, ink, 900)}${t(524, 386, "Shopify Plus PDP + WooCommerce checkout", 22, muted, 700)}
        ${chip(524, 438, meta.labels[0], "#95bf47", "#ffffff", 132)}${chip(670, 438, meta.labels[1], "#7f54b3", "#ffffff", 104)}
        <rect x="524" y="522" width="254" height="24" rx="12" fill="${line}"/><rect x="524" y="522" width="${154 + metricB}" height="24" rx="12" fill="${accent}"/>
        <rect x="948" y="274" width="292" height="456" rx="38" fill="#111827"/><rect x="974" y="320" width="240" height="348" rx="24" fill="#ffffff"/>
        <rect x="1002" y="358" width="184" height="112" rx="18" fill="#f1f5f9"/>${t(1018, 514, "Cart", 25, ink, 900)}<rect x="1018" y="544" width="138" height="18" rx="9" fill="${line}"/><rect x="1018" y="590" width="150" height="42" rx="21" fill="${dark}"/>${t(1053, 618, "Pay", 18, "#ffffff", 900)}
        <rect x="1278" y="324" width="120" height="120" rx="26" fill="#ecfdf5" stroke="#bbf7d0"/>${t(1308, 394, `${metricA}%`, 29, "#15803d", 900)}${t(1268, 488, "Speed", 22, muted, 800)}${t(1268, 530, "Checkout", 22, muted, 800)}
      `),
      cro: browser(`
        <rect x="150" y="220" width="360" height="472" rx="28" fill="#ffffff" stroke="${line}"/>${t(190, 280, "Variant A", 32, ink, 900)}<rect x="190" y="326" width="282" height="150" rx="20" fill="#fee2e2"/><rect x="218" y="520" width="204" height="22" rx="11" fill="${line}"/><rect x="218" y="570" width="168" height="48" rx="24" fill="#f97316"/>${t(266, 602, "Buy", 20, "#ffffff", 900)}
        <rect x="552" y="220" width="360" height="472" rx="28" fill="#ecfdf5" stroke="#86efac"/>${t(592, 280, "Variant B", 32, ink, 900)}<rect x="592" y="326" width="282" height="150" rx="20" fill="#bbf7d0"/><rect x="620" y="520" width="220" height="22" rx="11" fill="#86efac"/><rect x="620" y="570" width="210" height="48" rx="24" fill="#16a34a"/>${t(682, 602, "Buy now", 20, "#ffffff", 900)}
        <rect x="954" y="220" width="402" height="472" rx="28" fill="${dark}"/>${t(1002, 284, `+${metricB}% CVR`, 50, "#ffffff", 900)}${t(1004, 330, "statistically valid uplift", 23, "#cbd5e1", 700)}
        <path d="M1030 404h250l-42 72h-166zM1068 510h170l-34 62h-102zM1098 604h110l-24 42h-62z" fill="${warm}" opacity="0.9"/>
        ${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${1064 + (i % 3) * 72}" cy="${404 + Math.floor(i / 3) * 74}" r="${18 + ((seed >>> i) % 12)}" fill="${i % 2 ? accent : '#ffffff'}" opacity="0.8"/>`).join("")}
      `),
      email: browser(`
        <rect x="150" y="236" width="328" height="410" rx="32" fill="#ffffff" stroke="${line}"/>${t(196, 298, "Klaviyo campaign", 30, ink, 900)}<path d="M196 350h236v142H196z" fill="#fef3c7" stroke="#f59e0b"/><path d="M196 350l118 78 118-78" fill="none" stroke="#f59e0b" stroke-width="10" stroke-linejoin="round"/>${chip(196, 544, "Email", "#ffffff", ink, 104)}${chip(312, 544, "SMS", "#ffffff", ink, 92)}
        <circle cx="680" cy="288" r="72" fill="${accent}"/><circle cx="680" cy="452" r="72" fill="${warm}"/><circle cx="680" cy="616" r="72" fill="${cool}"/><path d="M680 360v20M680 524v20" stroke="${dark}" stroke-width="14" stroke-linecap="round"/>${t(624, 296, "1", 34, "#ffffff", 900)}${t(624, 460, "2", 34, "#ffffff", 900)}${t(624, 624, "3", 34, "#ffffff", 900)}
        <rect x="840" y="224" width="512" height="186" rx="28" fill="${soft}" stroke="${line}"/>${t(892, 290, "Welcome flow", 34, ink, 900)}${t(894, 330, `${metricC}% first-order lift`, 22, muted, 700)}
        <rect x="840" y="456" width="512" height="186" rx="28" fill="#eff6ff" stroke="#bfdbfe"/>${t(892, 522, "Abandoned cart", 34, ink, 900)}${t(894, 562, `£${metricA}K recovered revenue`, 22, muted, 700)}
      `),
      creative: browser(`
        <rect x="140" y="210" width="454" height="510" rx="34" fill="${dark}"/>${t(190, 278, "UGC shoot set", 36, "#ffffff", 900)}<circle cx="270" cy="470" r="104" fill="none" stroke="#ffffff" stroke-width="20" opacity="0.9"/><circle cx="270" cy="470" r="36" fill="${warm}"/><rect x="410" y="390" width="90" height="166" rx="18" fill="#ffffff"/><rect x="435" y="342" width="40" height="48" rx="12" fill="#ffffff"/><path d="M408 610h92" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>
        <rect x="650" y="230" width="282" height="452" rx="30" fill="#ffffff" stroke="${line}"/>${t(694, 292, "Hook 01", 30, ink, 900)}<rect x="694" y="326" width="194" height="240" rx="22" fill="#fde68a"/><path d="M734 514c58-146 88-146 118 0" fill="none" stroke="#f59e0b" stroke-width="14" stroke-linecap="round"/>${chip(716, 600, meta.labels[0], "#ffffff", ink, 112)}
        <rect x="984" y="230" width="282" height="452" rx="30" fill="#ffffff" stroke="${line}"/>${t(1028, 292, "Reel edit", 30, ink, 900)}<polygon points="1070,370 1184,446 1070,522" fill="${accent}"/><rect x="1028" y="584" width="184" height="18" rx="9" fill="${line}"/><rect x="1028" y="584" width="${120 + metricB}" height="18" rx="9" fill="${accent}"/>
        <rect x="1304" y="296" width="74" height="312" rx="30" fill="${warm}" opacity="0.88"/>${t(1278, 666, city, 24, muted, 900)}
      `),
      analytics: browser(`
        <rect x="142" y="214" width="352" height="188" rx="28" fill="${dark}"/>${t(190, 286, `${(metricA / 10).toFixed(1)}x`, 56, "#ffffff", 900)}${t(194, 332, "blended ROAS", 22, "#cbd5e1", 700)}
        <rect x="532" y="214" width="352" height="188" rx="28" fill="#ecfdf5" stroke="#bbf7d0"/>${t(580, 286, `£${metricA + 42}`, 56, ink, 900)}${t(584, 332, "average order value", 22, muted, 700)}
        <rect x="922" y="214" width="352" height="188" rx="28" fill="#eff6ff" stroke="#bfdbfe"/>${t(970, 286, `${metricB}%`, 56, ink, 900)}${t(974, 332, "returning revenue", 22, muted, 700)}
        <rect x="142" y="454" width="720" height="244" rx="28" fill="#ffffff" stroke="${line}"/>${t(190, 514, "Attribution path", 30, ink, 900)}<polyline points="204,644 320,588 440,612 560,544 680,566 800,500" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="910" y="454" width="364" height="244" rx="28" fill="${soft}" stroke="${line}"/>${t(958, 514, "Cohort table", 30, ink, 900)}${[0, 1, 2, 3].map((i) => `<rect x="958" y="${552 + i * 34}" width="${110 + i * 44}" height="18" rx="9" fill="${i % 2 ? warm : accent}" opacity="0.86"/>`).join("")}
        <circle cx="1372" cy="576" r="92" fill="none" stroke="${line}" stroke-width="28"/><path d="M1372 484 A92 92 0 1 1 1298 631" fill="none" stroke="${cool}" stroke-width="28" stroke-linecap="round"/>
      `),
      caseStudy: browser(`
        <rect x="150" y="232" width="364" height="448" rx="32" fill="#fff1f2" stroke="#fecdd3"/>${t(204, 304, "Before", 38, ink, 900)}${t(204, 380, `£${metricC}K`, 64, "#be123c", 900)}${t(208, 430, "monthly revenue", 22, muted, 700)}<rect x="204" y="536" width="220" height="26" rx="13" fill="#fecdd3"/>
        <path d="M570 456h156" stroke="${dark}" stroke-width="22" stroke-linecap="round"/><path d="M690 404l66 52-66 52" fill="none" stroke="${dark}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="812" y="232" width="450" height="448" rx="32" fill="#ecfdf5" stroke="#86efac"/>${t(870, 304, "After", 38, ink, 900)}${t(870, 380, `£${metricA + 260}K`, 64, "#15803d", 900)}${t(874, 430, "monthly revenue", 22, muted, 700)}<polyline points="876,594 954,548 1032,566 1110,500 1200,516" fill="none" stroke="#16a34a" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="1310" y="302" width="88" height="280" rx="20" fill="${accent}"/><rect x="1328" y="280" width="52" height="38" rx="12" fill="${accent}"/>${t(1282, 650, `+${metricA + 420}%`, 36, ink, 900)}
      `),
      meeting: browser(`
        <rect x="144" y="220" width="358" height="220" rx="30" fill="#e0f2fe" stroke="#bae6fd"/>${t(198, 286, "UK growth lead", 30, ink, 900)}<circle cx="264" cy="358" r="44" fill="${accent}"/><rect x="330" y="336" width="112" height="18" rx="9" fill="#94a3b8"/><rect x="330" y="374" width="76" height="18" rx="9" fill="#cbd5e1"/>
        <rect x="548" y="220" width="358" height="220" rx="30" fill="#fef3c7" stroke="#fde68a"/>${t(602, 286, "EU market", 30, ink, 900)}<circle cx="668" cy="358" r="44" fill="${warm}"/><rect x="734" y="336" width="112" height="18" rx="9" fill="#94a3b8"/><rect x="734" y="374" width="76" height="18" rx="9" fill="#cbd5e1"/>
        <rect x="952" y="220" width="358" height="220" rx="30" fill="#dcfce7" stroke="#bbf7d0"/>${t(1006, 286, "US scaling", 30, ink, 900)}<circle cx="1072" cy="358" r="44" fill="${cool}"/><rect x="1138" y="336" width="112" height="18" rx="9" fill="#94a3b8"/><rect x="1138" y="374" width="76" height="18" rx="9" fill="#cbd5e1"/>
        <rect x="210" y="516" width="1042" height="174" rx="30" fill="${dark}"/>${t(264, 584, `${city} international ecommerce roadmap`, 38, "#ffffff", 900)}${t(268, 632, "Paid media · SEO · store build · CRO · retention", 24, "#cbd5e1", 700)}
        <path d="M1300 522c54-42 104-42 158 0M1322 566c36-28 72-28 108 0M1350 610c18-14 36-14 54 0" fill="none" stroke="${accent}" stroke-width="16" stroke-linecap="round"/><circle cx="1376" cy="650" r="18" fill="${accent}"/>
      `),
    };

    return svgUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${esc(city)} ${esc(meta.title)}">
        <defs>
          <linearGradient id="page" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7ed"/><stop offset="0.52" stop-color="#f8fafc"/><stop offset="1" stop-color="#ecfeff"/></linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#0f172a" flood-opacity="0.18"/></filter>
        </defs>
        <rect width="1600" height="900" fill="url(#page)"/>
        <path d="M0 720 C230 626 404 738 624 646 C844 552 1002 628 1192 530 C1376 436 1490 488 1600 410 L1600 900 L0 900 Z" fill="${warm}" opacity="0.11"/>
        <circle cx="1392" cy="130" r="118" fill="${accent}" opacity="0.12"/>
        ${bodies[slot]}
      </svg>
    `);
  };

  const founderAvatar = (slug: string, city: string, index: number) => {
    const seed = hashNum(`${slug}-founder-avatar-${index}`);
    const hue = seed % 360;
    const initials = city.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    return svgUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" role="img" aria-label="${esc(city)} ecommerce founder testimonial">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},82%,48%)"/><stop offset="1" stop-color="hsl(${(hue + 55) % 360},88%,58%)"/></linearGradient></defs>
        <rect width="500" height="500" fill="url(#g)"/>
        <circle cx="250" cy="190" r="92" fill="#fff7ed" opacity="0.92"/>
        <path d="M90 430c26-105 96-158 160-158s134 53 160 158" fill="#fff7ed" opacity="0.92"/>
        <text x="250" y="205" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="#0f172a">${esc(initials)}${index + 1}</text>
      </svg>
    `);
  };

  const slots = Object.keys(slotPools) as Array<keyof typeof slotPools>;
  // Per-slot "used" set so each city gets a different base image for that topic.
  const usedPerSlot: Record<string, Set<string>> = {};
  for (const s of slots) usedPerSlot[s] = new Set();
  const usedVisiblePhotos = new Set<string>();

  for (const [slug, c] of Object.entries(LOCATION_CONTENT)) {
    for (const key of slots) {
      const id = pickUnique(slotPools[key], `${slug}-${key}`, key === "hero" || key === "skyline" ? usedVisiblePhotos : usedPerSlot[key]);
      c.images[key] = `${u(id)}&sig=${hashNum(`beingecom-${slug}-${key}`)}`;
    }
    const city = cityNames[slug] ?? slug.replace(/-/g, " ");
    // NOTE: visual sections (ads/seo/shopify/cro/email/creative/analytics/caseStudy/meeting)
    // now use the real, topically-curated Unsplash photos from slotPools above
    // instead of generated SVG mockups — every section shows a photo relevant to
    // its topic (paid ads dashboard, SEO analytics, Shopify storefront, etc.).
    void sectionVisual;
    void city;
    c.images.founders = [
      founderAvatar(slug, city, 0),
      founderAvatar(slug, city, 1),
      founderAvatar(slug, city, 2),
    ];
  }
}


export function contentFor(slug: string, cityFallback: string): LocationContent {
  const c = LOCATION_CONTENT[slug];
  if (c) return c;
  const first = LOCATION_CONTENT.london;
  return {
    ...first,
    heroTagline: `Scale your ${cityFallback} ecommerce brand with a senior UK team.`,
    vibe: `${cityFallback} founders trust us to run their growth engine end-to-end.`,
  };
}

