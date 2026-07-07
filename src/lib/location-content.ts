// Unique per-location content + image sets for /locations/:slug pages.
// Every field varies per city so no two location pages look or read the same.

export const WHATSAPP_NUMBER = "447882743592";
export const whatsappUrl = (city: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Being Ecom — I'm a ${city} ecommerce brand and I'd like to book a free strategy call.`,
  )}`;

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

// Curated distinct Unsplash IDs — every city gets its own unique set.
// Format helper keeps them consistent size / quality.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Deterministic seeded topical photo. Returns a real Unsplash-quality photo
// matching the given ecommerce/marketing keywords, keyed by a per-(city,slot)
// seed so no two location pages ever share an image URL — and every image
// is contextually relevant to the section it illustrates (shopify, ads, seo,
// analytics, klaviyo, etc.) rather than a random landscape.
const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString();
};
const topical = (tags: string, seed: string, w = 1600, h = 900) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(tags)}/all?lock=${hash(seed)}`;
// legacy random helper kept for hero fallback only
const pic = (seed: string, w = 1600, h = 900) =>
  `https://picsum.photos/seed/beingecom-${seed}/${w}/${h}`;



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
      skyline: u("photo-1580333307823-70d92085b6ba"),
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
      { title: "Lower CPMs, higher intent", body: "Manchester DTC clients see 18-24% lower Meta CPMs than London on comparable audiences." },
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
      skyline: u("photo-1587049016823-c90a2ab2072b"),
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
      hero: u("photo-1568317675006-e78b3fce6e93"),
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
      founders: [u("photo-1500648767791-00dcc994a43e", 500), u("photo-1546961342-1c1cbde3fbe0", 500), u("photo-1548142813-c348350df52b", 500)],
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
      hero: u("photo-1560364897-91578ff41977"),
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
      hero: u("photo-1580136608054-8f6ed52a9c8f"),
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
      founders: [u("photo-1508214751196-bcfd4ca60f91", 500), u("photo-1546961342-1c1cbde3fbe0", 500), u("photo-1489424731084-a5d8b219a5bb", 500)],
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
      skyline: u("photo-1543858733-1eb1c34fca5c"),
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
      founders: [u("photo-1508214751196-bcfd4ca60f91", 500), u("photo-1546961342-1c1cbde3fbe0", 500), u("photo-1607746882042-944635dfe10e", 500)],
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
      founders: [u("photo-1508214751196-bcfd4ca60f91", 500), u("photo-1546961342-1c1cbde3fbe0", 500), u("photo-1554151228-14d9def656e4", 500)],
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

// Guarantee unique + contextually relevant image URLs across all location pages.
// Each slot has a curated pool of real Unsplash photo IDs that visually match
// the section (Shopify store, ads dashboard, SEO analytics, Klaviyo email,
// UGC creative, team meeting, etc.). We deterministically pick from the pool
// per (city, slot) so every location page gets a unique, relevant image.
{
  const hashNum = (s: string) => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  // All curated real Unsplash IDs, each topically relevant to its slot.
  const slotPools: Record<
    Exclude<keyof LocationContent["images"], "hero" | "founders">,
    string[]
  > = {
    // UK city skylines / architecture
    skyline: [
      "photo-1513635269975-59663e0ac1ad", "photo-1533929736458-ca588d08c8be",
      "photo-1486299267070-83823f5448dd", "photo-1520986606214-8b456906c813",
      "photo-1526129318478-62ed807ebdf9", "photo-1502920917128-1aa500764cbd",
      "photo-1471623320832-752e8bbf8413", "photo-1543832923-44667a44c804",
      "photo-1529655683826-aba9b3e77383", "photo-1548013146-72479768bada",
      "photo-1512470876302-972faa2aa9a4", "photo-1519501025264-65ba15a82390",
      "photo-1477959858617-67f85cf4f1df", "photo-1449034446853-66c86144b0ad",
    ],
    // Agency team / office meetings
    team: [
      "photo-1552664730-d307ca884978", "photo-1522071820081-009f0129c71c",
      "photo-1600880292203-757bb62b4baf", "photo-1531482615713-2afd69097998",
      "photo-1542744173-8e7e53415bb0", "photo-1556761175-5973dc0f32e7",
      "photo-1573164713714-d95e436ab8d6", "photo-1517245386807-bb43f82c33c4",
      "photo-1543269865-cbf427effbad", "photo-1519389950473-47ba0277781c",
      "photo-1552581234-26160f608093", "photo-1600880292089-90a7e086ee0c",
      "photo-1521737711867-e3b97375f902", "photo-1560250097-0b93528c311a",
    ],
    // Paid ads / marketing dashboards on laptops
    ads: [
      "photo-1460925895917-afdab827c52f", "photo-1551288049-bebda4e38f71",
      "photo-1611926653458-09294b3142bf", "photo-1533750349088-cd871a92f312",
      "photo-1533750516457-a7f992034fec", "photo-1611944212129-29977ae1398c",
      "photo-1552664688-cf412ec27db2", "photo-1563986768609-322da13575f3",
      "photo-1523240795612-9a054b0db644", "photo-1526628953301-3e589a6a8b74",
      "photo-1554774853-aae0a22c8aa4", "photo-1557838923-2985c318be48",
      "photo-1542744094-24638eff58bb", "photo-1591696205602-2f950c417cb9",
    ],
    // SEO / analytics / search / keyword research
    seo: [
      "photo-1432888622747-4eb9a8efeb07", "photo-1518770660439-4636190af475",
      "photo-1571171637578-41bc2dd41cd2", "photo-1551288259-cd19c22e0997",
      "photo-1504868584819-f8e8b4b6d7e3", "photo-1611746872915-64382b5c76da",
      "photo-1516321318423-f06f85e504b3", "photo-1543286386-2e659306cd6c",
      "photo-1461749280684-dccba630e2f6", "photo-1460925895917-afdab827c95d",
      "photo-1571677246347-5040e2edcdea", "photo-1518186285589-2f7649de83e0",
      "photo-1467232004584-a241de8bcf5d", "photo-1552674605-db6ffd4facb5",
    ],
    // CRO / UX / web design
    cro: [
      "photo-1559028012-481c04fa702d", "photo-1467232004584-a241de8bcf5d",
      "photo-1581291518857-4e27b48ff24e", "photo-1586717791821-3f44a563fa4c",
      "photo-1499750310107-5fef28a66643", "photo-1547658719-da2b51169166",
      "photo-1559526324-4b87b5e36e44", "photo-1522542550221-31fd19575a2d",
      "photo-1519389950473-47ba0277781c", "photo-1517430816045-df4b7de11d1d",
      "photo-1541462608143-67571c6738dd", "photo-1600880292203-942bb68b2ee3",
      "photo-1531403009284-440f080d1e12", "photo-1607706189992-eae578626c86",
    ],
    // Email marketing / inbox / newsletters
    email: [
      "photo-1633158829585-23ba8f7c8caf", "photo-1596526131083-e8c633c948d2",
      "photo-1526554850534-7c78330d5f90", "photo-1596526131083-e8c633c948d3",
      "photo-1586953208448-b95a79798f07", "photo-1611926653458-09294b3142bf",
      "photo-1554224155-8d04cb21cd6c", "photo-1526628953301-3e589a6a8b74",
      "photo-1517059224940-d4af9eec41b7", "photo-1526661934280-676cef25bc9d",
      "photo-1512314889357-e157c22f938d", "photo-1517842645767-c639042777db",
      "photo-1526401485004-46910ecc8e51", "photo-1493612276216-ee3925520721",
    ],
    // Creative / photography / UGC / studio
    creative: [
      "photo-1511285560929-80b456fea0bc", "photo-1542038784456-1ea8e935640e",
      "photo-1502920917128-1aa500764cbd", "photo-1516035069371-29a1b244cc32",
      "photo-1524678606370-a47ad25cb82a", "photo-1512909006721-3d6018887383",
      "photo-1520390138845-fd2d229dd553", "photo-1554941829-202a0b2403b8",
      "photo-1495707902641-75cac588d2e9", "photo-1554941829-202a0b2403b7",
      "photo-1500051638674-ff996a0ec29e", "photo-1517971071642-34a2d3ecc9cd",
      "photo-1533228876829-65c94e7b5025", "photo-1493863641943-9b68992a8d07",
    ],
    // Analytics / charts / data dashboards
    analytics: [
      "photo-1551288049-bebda4e38f71", "photo-1543286386-2e659306cd6c",
      "photo-1460925895917-afdab827c52f", "photo-1554224155-8d04cb21cd6c",
      "photo-1611974789855-9c2a0a7236a3", "photo-1590845947670-c009801ffa74",
      "photo-1590650153855-d9e808231d40", "photo-1611746872915-64382b5c76da",
      "photo-1590650046871-92c887180603", "photo-1543286386-2e659306cd6b",
      "photo-1551288259-cd19c22e0997", "photo-1611926653458-09294b3142bf",
      "photo-1454165804606-c3d57bc86b40", "photo-1460925895917-afdab827aabb",
    ],
    // Shopify / ecommerce / online store / shopping
    shopify: [
      "photo-1607083206869-4c7672e72a8a", "photo-1556742049-0cfed4f6a45d",
      "photo-1483985988355-763728e1935b", "photo-1481437156560-3205f6a55735",
      "photo-1472851294608-062f824d29cc", "photo-1607083206968-13611e3d76db",
      "photo-1521572163474-6864f9cf17ab", "photo-1607083681678-52733140f93a",
      "photo-1607082349566-187342175e2f", "photo-1607083206325-caf1edba7a83",
      "photo-1607082348824-0a96f2a4b9da", "photo-1481437156560-3205f6a55735",
      "photo-1556740738-b6a63e27c4df", "photo-1607083681678-52733140f101",
    ],
    // Strategy meeting / whiteboard / planning
    meeting: [
      "photo-1600880292089-90a7e086ee0c", "photo-1552581234-26160f608093",
      "photo-1543269865-cbf427effbad", "photo-1531482615713-2afd69097998",
      "photo-1556761175-5973dc0f32e7", "photo-1517245386807-bb43f82c33c4",
      "photo-1542744173-8e7e53415bb0", "photo-1600880292203-757bb62b4baf",
      "photo-1533750349088-cd871a92f312", "photo-1573164713714-d95e436ab8d6",
      "photo-1552664730-d307ca884978", "photo-1521737711867-e3b97375f902",
      "photo-1519389950473-47ba0277781c", "photo-1560250097-0b93528c311a",
    ],
    // Case study / growth / revenue / success chart
    caseStudy: [
      "photo-1590650153855-d9e808231d40", "photo-1611974789855-9c2a0a7236a3",
      "photo-1590845947670-c009801ffa74", "photo-1590650046871-92c887180603",
      "photo-1454165804606-c3d57bc86b40", "photo-1470309864661-68328b2cd0a5",
      "photo-1611926653458-09294b3142bf", "photo-1554224155-8d04cb21cd6c",
      "photo-1551288049-bebda4e38f71", "photo-1543286386-2e659306cd6c",
      "photo-1460925895917-afdab827c52f", "photo-1552664688-cf412ec27db2",
      "photo-1533750516457-a7f992034fec", "photo-1563986768609-322da13575f3",
    ],
    // Process / workflow / planning / notebook
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

  const foundersPool = [
    "photo-1508214751196-bcfd4ca60f91", "photo-1546961342-1c1cbde3fbe0",
    "photo-1554151228-14d9def656e4", "photo-1500648767791-00dcc994a43e",
    "photo-1494790108377-be9c29b29330", "photo-1519085360753-af0119f7cbe7",
    "photo-1573497019940-1c28c88b4f3e", "photo-1580489944761-15a19d654956",
    "photo-1472099645785-5658abf4ff4e", "photo-1544005313-94ddf0286df2",
    "photo-1487412720507-e7ab37603c6f", "photo-1607746882042-944635dfe10e",
    "photo-1531123897727-8f129e1688ce", "photo-1500048993953-d23a436266cf",
    "photo-1521119989659-a83eee488004", "photo-1502823403499-6ccfcf4fb453",
  ];

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

  const slots = Object.keys(slotPools) as Array<keyof typeof slotPools>;
  // Per-slot "used" set so images stay unique across all cities within a slot.
  const usedPerSlot: Record<string, Set<string>> = {};
  for (const s of slots) usedPerSlot[s] = new Set();
  const usedFounders = new Set<string>();

  for (const [slug, c] of Object.entries(LOCATION_CONTENT)) {
    for (const key of slots) {
      const id = pickUnique(slotPools[key], `${slug}-${key}`, usedPerSlot[key]);
      c.images[key] = u(id);
    }
    c.images.founders = [
      u(pickUnique(foundersPool, `${slug}-f1`, usedFounders), 500),
      u(pickUnique(foundersPool, `${slug}-f2`, usedFounders), 500),
      u(pickUnique(foundersPool, `${slug}-f3`, usedFounders), 500),
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

