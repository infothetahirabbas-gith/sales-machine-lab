// Hyper-local search guide for /locations/:slug pages (GSC content work, 2026-10-15).
//
// Why this exists: the 2026-10-14 Search Console export (last 3 months, UK-heavy)
// showed every location page earning thousands of impressions at positions 23-90
// for a *cluster* of city queries - not just "ecommerce agency {city}". Example:
// Nottingham ranks for "shopify seo agency nottingham", "woocommerce agency
// nottingham" and "ecommerce seo services nottingham" but the page never answers
// those queries directly. Each `queryAnswers` entry below targets one real query
// cluster from that export (impressions noted in the comment) with a direct,
// self-contained answer + an internal link to the service that fulfils it.
//
// Content rules (same honesty bar as PR #4):
// - Places, institutions and businesses named here are real, public entities.
//   They describe the local market; they are never claimed as clients.
// - No invented statistics. Third-party figures are attributed in PAIN_SOURCES.
// - "Serving brands in X" framing only - no physical-office claims.

import { PRICING_TIERS } from "./pricing";

export type GuideLink =
  | "/services/seo"
  | "/services/seo/local"
  | "/services/seo/aeo"
  | "/services/seo/technical"
  | "/services/seo/off-page"
  | "/shopify-seo-agency-uk"
  | "/woocommerce-seo-agency-uk"
  | "/services/store-development/shopify"
  | "/services/store-development/woocommerce"
  | "/ecommerce-migration-seo"
  | "/services/cro"
  | "/services/email-sms"
  | "/services/creative"
  | "/services/analytics"
  | "/services/ai-automation"
  | "/services/performance-marketing"
  | "/services/performance-marketing/google-ads"
  | "/services/performance-marketing/facebook-ads"
  | "/services/performance-marketing/tiktok-ads"
  | "/services/performance-marketing/media-buying"
  | "/ecommerce-seo-consultant"
  | "/pricing";

export type QueryAnswer = {
  /** The real search query (cluster head) this block answers. */
  query: string;
  heading: string;
  body: string;
  to: GuideLink;
  linkLabel: string;
};

export type LocalEntity = { name: string; kind: string; note: string };

export type LocalGuide = {
  /** One hyper-local paragraph on how this city's online shoppers and sellers behave. */
  market: string;
  /** The one pain point we hear most from founders in this specific market. */
  localPain: { title: string; body: string };
  entities: LocalEntity[];
  postcodes: string[];
  towns: string[];
  queryAnswers: QueryAnswer[];
  paa: { q: string; a: string }[];
};

// ---------------------------------------------------------------------------
// Shared: UK ecommerce owner pain points.
// Themes collected 2026-10-15 from founder discussions (Reddit r/shopify &
// r/ecommerce, Shopify Community, UK Business Forums, LinkedIn and Medium
// founder posts) and checked against the published research cited below.
// ---------------------------------------------------------------------------

export const PAIN_SOURCES = [
  { label: "Baymard Institute - cart abandonment research (50 studies)", href: "https://baymard.com/lists/cart-abandonment-rate" },
  { label: "ChannelX - shipping cost pressures for UK sellers (Apr 2026)", href: "https://channelx.world/2026/04/shipping-cost-pressures-intensify-for-uk-ecommerce-sellers/" },
  { label: "UK Business Forums - seller courier experiences thread", href: "https://www.ukbusinessforums.co.uk/threads/are-evri-really-that-bad.423133/" },
] as const;

export type PainPoint = { pain: string; owners: string; fix: string; to: GuideLink };

export const UK_ECOM_PAIN_POINTS: PainPoint[] = [
  {
    pain: "Meta and Google costs keep rising, ROAS keeps falling",
    owners: "The most common founder complaint we see: the same budget that worked two years ago now buys fewer sales, and Advantage+ or Performance Max feels like a black box.",
    fix: "We set targets on contribution margin and MER rather than platform ROAS, feed the algorithms more creative angles each month, and cut spend that only claims credit for sales you would have had anyway.",
    to: "/services/performance-marketing",
  },
  {
    pain: "Shopify, GA4 and Meta all report different sales",
    owners: "Owners regularly post screenshots of three dashboards showing three revenue numbers, and no idea which one to trust when deciding budgets.",
    fix: "Server-side tracking, Meta Conversions API, a consent-mode-aware GA4 build and one blended dashboard reconciled to Shopify or WooCommerce orders - so budget decisions rest on real revenue.",
    to: "/services/analytics",
  },
  {
    pain: "Shoppers abandon at checkout",
    owners: "Baymard's research puts average documented cart abandonment at about 70%. Among shoppers who left for reasons other than browsing, 40% blamed extra costs, 20% slow delivery and 19% not trusting the site with card details.",
    fix: "We show the full delivered price early, add guest checkout and the wallets UK shoppers use (Apple Pay, Google Pay, Klarna, PayPal), and test delivery thresholds against margin.",
    to: "/services/cro",
  },
  {
    pain: "Delivery costs and courier failures eat the margin",
    owners: "UK sellers report rising last-mile costs and frustration with missed or late parcels. ChannelX (April 2026) reported that 84% of UK and European ecommerce businesses had seen last-mile costs rise.",
    fix: "We treat shipping as a conversion lever: clear cut-off times, delivery-promise messaging on product pages, and free-delivery thresholds set from your real per-order cost, not a guess.",
    to: "/services/cro",
  },
  {
    pain: "Organic clicks are drying up",
    owners: "Founders see impressions holding steady in Search Console while clicks fall, as AI Overviews and Shopping units push blue links further down the page.",
    fix: "Collection and product pages written to answer real buyer questions, product schema that qualifies for rich results, and answer-engine optimisation so your brand gets cited in AI answers, not just ranked.",
    to: "/services/seo/aeo",
  },
  {
    pain: "Burned by a previous agency",
    owners: "Long lock-in contracts, junior account managers, monthly PDF reports full of impressions - and the agency sometimes owning the ad accounts.",
    fix: "You own every ad account, pixel and dashboard. After a 90-day initial engagement our retainers are month-to-month with 30 days' notice, and a named senior operator runs your account.",
    to: "/pricing",
  },
  {
    pain: "A slow, app-heavy store",
    owners: "Shopify stores pick up a new app for every problem; each one adds scripts, and mobile speed and conversion quietly drop.",
    fix: "An app and script audit, theme performance fixes for Core Web Vitals, and replacing overlapping apps with native Shopify features or one well-built tool.",
    to: "/services/seo/technical",
  },
  {
    pain: "Too dependent on one channel or marketplace",
    owners: "Owners whose sales sit mostly on Amazon, or on a single Meta campaign, worry about fee rises, account bans and stock tied up in one channel.",
    fix: "We build owned demand - email and SMS lists, organic search and repeat customers - so a single platform change cannot sink the month.",
    to: "/services/email-sms",
  },
];

/** UK-wide People-Also-Ask questions appended to every location FAQ. */
export const UK_SHARED_PAA = (): { q: string; a: string }[] => {
  const prices = PRICING_TIERS.map((t) => `${t.name} ${t.price}/mo`).join(", ");
  return [
    {
      q: "Shopify or WooCommerce: which is better for a UK online shop?",
      a: "Shopify suits most UK brands that want speed to market, reliable hosting and native Shop Pay, Apple Pay and Klarna. WooCommerce suits businesses that already run on WordPress, need unusual product logic, or want full control of hosting and data. We build, migrate and grow on both, and recommend based on your catalogue, team and budget rather than our preference.",
    },
    {
      q: "Why are my Facebook and Instagram ads not working any more?",
      a: "Usually because the creative is fatigued, the offer is not strong enough, or the account is optimising against inaccurate tracking. Since Apple's privacy changes, Meta needs a server-side signal (Conversions API) and a steady supply of new creative angles. Fixing tracking and testing more creative typically matters more than audience tweaks.",
    },
    {
      q: "Why don't Shopify, GA4 and Meta show the same sales figures?",
      a: "Each tool counts differently: Shopify counts orders, GA4 depends on consent and session attribution, and Meta claims view-through and click-through conversions within its own window. Server-side tracking and a blended view of revenue against total marketing spend (MER) gives a figure you can make decisions on.",
    },
    {
      q: "How much does Being Ecom cost?",
      a: `Our published monthly retainers are ${prices}. Every plan starts with a 90-day initial engagement, then runs month-to-month with 30 days' notice. Ad spend is paid directly to the platforms and is not included.`,
    },
  ];
};

// ---------------------------------------------------------------------------
// Per-city guides. Comments show the GSC query cluster + impressions (3 months
// to 2026-10-14) each block was written for.
// ---------------------------------------------------------------------------

export const LOCAL_GUIDE: Record<string, LocalGuide> = {
  nottingham: {
    market:
      "Nottingham's online sellers trade from a city with two big universities (University of Nottingham and Nottingham Trent), a creative quarter around Hockley, the Lace Market and Sneinton Market, and household-name retail heritage - Boots is headquartered in Beeston. Shoppers here are price-aware but loyal, and a large student population makes Nottingham a strong testing ground for social-first brands. For sellers, the M1 junctions 24-27 and East Midlands Airport put most of England within next-day reach.",
    localPain: {
      title: "Ranking locally against national marketplaces",
      body: "Nottingham independents tell us the same story: they rank for their brand name but lose every product search to Amazon, Argos and national chains. The fix is collection pages built around what Nottingham shoppers actually search, product schema, and links from Nottinghamshire press and organisations.",
    },
    entities: [
      { name: "Hockley & the Lace Market", kind: "Creative quarter", note: "Independent fashion, beauty and lifestyle brands with strong visual identities." },
      { name: "Sneinton Market", kind: "Creative business hub", note: "Makers and small product businesses moving from market stall to online store." },
      { name: "Victoria Centre & Old Market Square", kind: "City-centre retail", note: "Where Nottingham's high-street footfall meets click-and-collect demand." },
      { name: "University of Nottingham & NTU", kind: "Universities", note: "A large student audience for social and TikTok-led campaigns, and a deep creator pool." },
      { name: "BioCity Nottingham", kind: "Life-science hub", note: "Health, wellness and supplement start-ups that need compliant ad copy." },
      { name: "Beeston & West Bridgford", kind: "Suburbs", note: "Higher-income households that respond to premium, benefit-led creative." },
    ],
    postcodes: ["NG1", "NG2", "NG3", "NG5", "NG7", "NG9", "NG11"],
    towns: ["West Bridgford", "Beeston", "Arnold", "Carlton", "Hucknall", "Long Eaton", "Mansfield", "Newark-on-Trent"],
    queryAnswers: [
      // "ecommerce seo agency nottingham" 838, "ecommerce seo nottingham" 423, "ecommerce seo services nottingham" 382
      { query: "ecommerce SEO agency Nottingham", heading: "Ecommerce SEO services for Nottingham online shops", body: "Ecommerce SEO is different from SEO for a local trade business: the pages that earn money are collection and product pages, not a homepage. For Nottingham stores we fix crawl and indexation issues, rewrite collection pages around real buyer searches, add Product and Review schema, and build links from Nottinghamshire press and organisations. Progress is reported in organic revenue, not rankings alone.", to: "/services/seo", linkLabel: "Ecommerce SEO services" },
      // "shopify seo agency nottingham" 575, "shopify nottingham" 392, "shopify agency nottingham" 276
      { query: "Shopify SEO agency Nottingham", heading: "Shopify SEO for Nottingham brands", body: "Shopify creates duplicate URLs for products inside collections, limits URL structure and loads apps that slow pages down. Our Shopify SEO work for Nottingham stores covers canonical and internal-link fixes, theme speed, structured data, collection filtering that doesn't create thin pages, and content that answers what shoppers ask before buying.", to: "/shopify-seo-agency-uk", linkLabel: "Shopify SEO agency" },
      // "woocommerce agency nottingham" 315
      { query: "WooCommerce agency Nottingham", heading: "WooCommerce development and growth in Nottingham", body: "Many Nottingham businesses started on WordPress and added WooCommerce later. That usually means plugin conflicts, slow hosting and checkout friction. We audit plugins, move stores to faster hosting, fix checkout and payment options, and run SEO and paid campaigns on top - or plan a clean migration to Shopify when that is the better commercial choice.", to: "/services/store-development/woocommerce", linkLabel: "WooCommerce services" },
      // "content marketing nottingham" 363
      { query: "content marketing Nottingham", heading: "Content marketing that sells products, not just traffic", body: "For an online shop, content should answer the questions buyers ask before they purchase: sizing, comparisons, care guides, gift ideas. We plan content around search demand and link every article to the collection it supports, so Nottingham brands earn sales from content rather than page views.", to: "/services/seo", linkLabel: "SEO content strategy" },
    ],
    paa: [
      { q: "Do you work with small Nottingham online shops?", a: "Yes. Our Starter retainer is built for smaller stores that need technical SEO, product page optimisation and tracking fixed before scaling ad spend. We work with independents across Nottingham and Nottinghamshire as well as established brands." },
      { q: "Can you help my Nottingham shop rank above Amazon?", a: "On some product searches, yes - especially specific or long-tail searches where a specialist store is more relevant than a marketplace. We focus on collection pages, product schema, reviews and local authority links, and we're honest about the head terms where marketplaces will keep winning." },
      { q: "Do you meet Nottingham clients in person?", a: "Our work is delivered remotely by a UK team, and strategy sessions in person can be arranged for Nottingham engagements. Most weekly work happens over video calls and a shared dashboard." },
    ],
  },

  leeds: {
    market:
      "Leeds is the commercial centre of West Yorkshire, with a big financial and legal sector, two major universities (University of Leeds and Leeds Beckett), and retail destinations from Trinity Leeds and the Victoria Quarter to Kirkgate Market. Asda is headquartered in the city, and the Leeds Digital Festival has helped grow a strong tech community. For online brands, Leeds sits on the M1, M62 and A1(M), so warehouses around the city reach most of the North and Midlands quickly.",
    localPain: {
      title: "Stuck on an ageing Magento build",
      body: "Leeds has a long history of Magento development, and we hear from many Yorkshire retailers still on Magento 1 or an expensive Magento 2 setup. They want lower running costs without losing years of organic rankings - which is a migration and SEO problem, not just a rebuild.",
    },
    entities: [
      { name: "Leeds Dock & South Bank", kind: "Business district", note: "Digital and media businesses, including growing DTC teams." },
      { name: "Trinity Leeds & Victoria Quarter", kind: "City-centre retail", note: "Premium high-street footfall that shapes local shopper expectations." },
      { name: "Kirkgate Market", kind: "Historic market", note: "One of Europe's largest covered markets - and a source of traders moving online." },
      { name: "University of Leeds & Leeds Beckett", kind: "Universities", note: "A young, social-first audience and a strong UGC creator pool." },
      { name: "Headingley & Chapel Allerton", kind: "Suburbs", note: "Higher-income audiences for premium food, homeware and fitness brands." },
      { name: "M62 / M1 distribution corridor", kind: "Logistics", note: "Next-day delivery reach across the North for Leeds-based stock." },
    ],
    postcodes: ["LS1", "LS2", "LS6", "LS7", "LS10", "LS11", "LS17"],
    towns: ["Headingley", "Horsforth", "Roundhay", "Morley", "Pudsey", "Wetherby", "Wakefield", "Harrogate"],
    queryAnswers: [
      // "ecommerce agency leeds" 995, "e-commerce agency leeds" 220
      { query: "ecommerce agency Leeds", heading: "An ecommerce agency for Leeds online brands", body: "We work with Leeds and Yorkshire brands on the full growth stack: search, paid social, Google Shopping, email and conversion work, measured against profit rather than clicks. One senior team covers every channel, so your SEO, ads and email are planned together instead of by three different suppliers.", to: "/services/performance-marketing", linkLabel: "Our growth services" },
      // "shopify agency leeds" 754, "shopify leeds" 365
      { query: "Shopify agency Leeds", heading: "Shopify builds, fixes and growth for Leeds stores", body: "From Shopify theme fixes and app clean-ups to full Shopify Plus builds, we help Leeds merchants get a fast, conversion-focused store - then grow it. Most Shopify problems we inherit are speed, app bloat and checkout friction rather than design.", to: "/services/store-development/shopify", linkLabel: "Shopify development" },
      // "cro agency leeds" 631
      { query: "CRO agency Leeds", heading: "Conversion rate optimisation for Leeds ecommerce", body: "We start with analytics and session recordings to find where buyers drop out, then test changes to product pages, delivery messaging, navigation and checkout. For smaller Leeds stores without enough traffic for formal A/B tests, we prioritise proven fixes first and test once volume allows.", to: "/services/cro", linkLabel: "CRO services" },
      // "magento agency leeds" 607, "magento 2 agency leeds" 573, "magento development leeds" 297
      { query: "Magento agency Leeds", heading: "Moving off Magento without losing your rankings", body: "We are not a Magento development agency. What we do is help Leeds retailers leave Magento for Shopify or WooCommerce safely: URL mapping, 301 redirects, preserving product and review data, and monitoring rankings through the switch. If you're paying heavily to maintain Magento, a migration plan is often the best ROI decision you can make.", to: "/ecommerce-migration-seo", linkLabel: "Migration SEO" },
    ],
    paa: [
      { q: "Do you build Magento stores in Leeds?", a: "No - we specialise in Shopify and WooCommerce. We regularly migrate Yorkshire retailers away from Magento and protect their organic rankings during the move." },
      { q: "Can you run ads and SEO together for a Leeds brand?", a: "Yes, and we recommend it. Paid search data shows which products and terms convert, which tells us where SEO effort will pay back fastest." },
      { q: "Which Leeds industries do you work with?", a: "Fashion and activewear, food and drink, home and furniture, health and wellness, and specialist retailers moving from a physical shop or market stall to online sales." },
    ],
  },

  leicester: {
    market:
      "Leicester has one of the strongest manufacturing and textile traditions in the UK, a large independent business community along Belgrave Road's Golden Mile, and two universities (University of Leicester and De Montfort University). Next plc is headquartered just outside the city at Enderby, and Space Park Leicester anchors a growing tech sector. For online sellers, Leicester's central position on the M1 and M69 is one of the best in the country for national delivery.",
    localPain: {
      title: "Lots of marketing agencies, very few that understand online retail",
      body: "Leicester business owners searching for a 'marketing agency' find plenty of firms that build brochure websites and run social posts. Product businesses need something else: feeds, Shopping campaigns, product-page SEO and email flows that turn one order into a second. That gap is why we specialise in ecommerce only.",
    },
    entities: [
      { name: "St George's Cultural Quarter", kind: "Creative district", note: "Creative businesses, studios and independent brands near the LCB Depot." },
      { name: "Highcross & Leicester Market", kind: "City-centre retail", note: "Leicester's main shopping footfall and its historic outdoor market." },
      { name: "Belgrave Road (Golden Mile)", kind: "Independent retail", note: "Jewellery, clothing and food retailers with strong UK and international demand online." },
      { name: "University of Leicester & DMU", kind: "Universities", note: "Student audiences and a supply of design and fashion talent from De Montfort." },
      { name: "Space Park Leicester", kind: "Innovation hub", note: "Space and tech businesses alongside the city's growing B2B base." },
      { name: "Fosse Park", kind: "Retail park", note: "Big-brand retail competition that shapes local shopper expectations." },
    ],
    postcodes: ["LE1", "LE2", "LE3", "LE4", "LE5", "LE18", "LE19"],
    towns: ["Oadby", "Wigston", "Loughborough", "Hinckley", "Market Harborough", "Melton Mowbray", "Coalville", "Enderby"],
    queryAnswers: [
      // "marketing agency leicester" 806, "marketing companies leicester" 558, "digital marketing agency leicester" 859
      { query: "marketing agency Leicester", heading: "A specialist ecommerce marketing agency for Leicester", body: "If you sell products online, you need marketing measured in orders and profit. We run Google Shopping and Search, Meta and TikTok ads, SEO, and Klaviyo email for Leicester and Leicestershire product businesses. We don't build brochure sites or manage general social posting - our team only works on ecommerce growth.", to: "/services/performance-marketing", linkLabel: "Ecommerce marketing services" },
      // "aeo company leicester" 326, "aeo leicester" 222
      { query: "AEO company Leicester", heading: "Answer engine optimisation (AEO) for Leicester brands", body: "AEO means making your store the source that Google's AI Overviews, ChatGPT and Perplexity quote when shoppers ask questions. In practice that's clear question-and-answer content on product and category pages, accurate structured data, consistent brand information across the web and mentions from trusted sources. We build AEO into ecommerce SEO rather than selling it separately.", to: "/services/seo/aeo", linkLabel: "AEO services" },
      // "digital marketing leicester" 641, "digital agency leicester" 621
      { query: "digital marketing Leicester for online shops", heading: "Digital marketing for Leicester ecommerce, channel by channel", body: "For Leicester's fashion, jewellery and food sellers we usually start with Google Shopping (buyers already searching for the product), then Meta and TikTok for discovery, and Klaviyo flows for repeat orders. Every channel reports into one dashboard reconciled to your actual store revenue.", to: "/services/performance-marketing/google-ads", linkLabel: "Google Ads & Shopping" },
    ],
    paa: [
      { q: "Are you a general digital marketing agency in Leicester?", a: "No. We focus on ecommerce: Shopify and WooCommerce stores selling products online. If you need a brochure website or general social media management, a local generalist will suit you better." },
      { q: "Do you work with Leicester jewellery and clothing businesses?", a: "Yes. Jewellery and fashion are two of our core categories, and both rely on strong product photography, Shopping feeds and trust signals at checkout." },
      { q: "What is AEO and does my Leicester shop need it?", a: "AEO (answer engine optimisation) helps your products and brand get cited in AI-generated answers. If shoppers ask questions about your category, it's worth building in - and it uses the same foundations as good SEO." },
    ],
  },

  poole: {
    market:
      "Poole sits on one of the world's largest natural harbours, with Poole Quay, Sandbanks and the Dolphin Centre at the heart of the local economy and Sunseeker yachts as its best-known manufacturer. Together with Bournemouth and Christchurch it forms the BCP conurbation, served by Bournemouth University's Talbot Campus and Arts University Bournemouth. Online sellers here range from marine, surf and outdoor brands to lifestyle and gift businesses that see big seasonal swings with the tourist calendar.",
    localPain: {
      title: "Seasonal sales and a quiet winter",
      body: "Dorset coastal brands tell us summer is busy and winter is a struggle. Building an email list during peak season and planning Christmas and January campaigns early is what evens out cash flow.",
    },
    entities: [
      { name: "Poole Quay & Harbour", kind: "Waterfront", note: "Marine, leisure and tourism businesses with strong seasonal demand." },
      { name: "Sandbanks", kind: "Affluent peninsula", note: "One of the UK's most expensive residential areas - a premium audience for lifestyle brands." },
      { name: "Dolphin Centre & Poole High Street", kind: "Town-centre retail", note: "Local footfall that feeds click-and-collect and local search demand." },
      { name: "Bournemouth University (Talbot Campus)", kind: "University", note: "Marketing, media and creative graduates in the BCP area." },
      { name: "Port of Poole", kind: "Ferry port", note: "Channel Islands and France routes, relevant for sellers shipping beyond mainland UK." },
      { name: "Holes Bay & Nuffield industrial estates", kind: "Business parks", note: "Warehousing and light manufacturing for Dorset product brands." },
    ],
    postcodes: ["BH12", "BH13", "BH14", "BH15", "BH16", "BH17"],
    towns: ["Bournemouth", "Christchurch", "Wimborne Minster", "Wareham", "Ferndown", "Swanage", "Hamworthy", "Broadstone"],
    queryAnswers: [
      // "seo poole" 601, "seo agency poole" 296, "seo agency in poole" 296, "seo in poole" 260
      { query: "SEO agency Poole", heading: "SEO in Poole for businesses that sell online", body: "Most Poole SEO agencies focus on local service businesses. If you run an online shop, the priority is different: product and collection pages that rank nationally, technical health of your Shopify or WooCommerce store, and structured data for rich results. We also cover local SEO and Google Business Profile for Dorset shops with a physical store.", to: "/services/seo", linkLabel: "Ecommerce SEO" },
      // "social media marketing poole" 290, "social media agency poole" 234, "social media poole" 257
      { query: "social media marketing Poole", heading: "Social media that sells: paid social for Poole brands", body: "We don't run organic posting calendars. We run paid social on Meta, Instagram and TikTok designed to sell products - creator-led video, product demos and offers tested weekly and measured against orders. For Dorset brands with summer peaks, we build audiences early so winter campaigns aren't starting from zero.", to: "/services/performance-marketing/facebook-ads", linkLabel: "Meta & Instagram ads" },
      // "ecommerce dorset" 99, "ecommerce website dorset" 98, "marketing agency poole" 219
      { query: "ecommerce Dorset", heading: "Ecommerce websites and growth across Dorset", body: "From Poole and Bournemouth to Wimborne and Swanage, we help Dorset businesses build or fix Shopify and WooCommerce stores, then grow them with search, ads and email. If your site was built by a generalist and doesn't convert, we usually start with a conversion and speed audit.", to: "/services/store-development/shopify", linkLabel: "Store development" },
    ],
    paa: [
      { q: "Do you do SEO for local Poole service businesses?", a: "Our specialism is ecommerce - businesses that sell products online. If you're a local trade or service business, a local SEO specialist will usually be a better fit." },
      { q: "How do Poole and Dorset brands handle seasonal sales?", a: "By capturing email and SMS subscribers in peak season, then using planned campaigns for Black Friday, Christmas and January sales to keep revenue coming through quieter months." },
      { q: "Do you work across Bournemouth and Christchurch too?", a: "Yes - we work with brands across the whole BCP area and wider Dorset." },
    ],
  },

  london: {
    market:
      "London is the most competitive ecommerce market in the UK: the most brands, the highest ad costs and the most demanding shoppers. DTC clusters around Shoreditch, Old Street, Hackney and King's Cross sit alongside flagship retail on Oxford Street, Regent Street and at Westfield London and Westfield Stratford. Because so many national brands also target London audiences, the brands that grow here usually win on creative, a clear offer and strong retention rather than bigger budgets.",
    localPain: {
      title: "Highest customer acquisition costs in the UK",
      body: "London founders feel CAC rises first. When acquisition is this expensive, the biggest lever is often what happens after the first order - email, SMS and repeat-purchase offers that raise customer lifetime value.",
    },
    entities: [
      { name: "Shoreditch & Old Street", kind: "Tech and DTC hub", note: "Dense cluster of start-ups, agencies and venture-backed DTC brands." },
      { name: "King's Cross", kind: "Business district", note: "Major tech employers and a growing creative-brand community." },
      { name: "Oxford Street & Regent Street", kind: "Flagship retail", note: "The UK's busiest shopping streets, setting expectations for brand experience." },
      { name: "Westfield London & Westfield Stratford", kind: "Shopping centres", note: "Omnichannel benchmarks for click-and-collect and returns." },
      { name: "Hackney & Peckham", kind: "Independent scene", note: "Food, drink, homeware and fashion independents with strong local followings." },
      { name: "Battersea Power Station", kind: "Retail & office destination", note: "New retail and lifestyle destination in Nine Elms." },
    ],
    postcodes: ["E1", "E2", "EC1", "EC2", "N1", "W1", "SE1", "SW11"],
    towns: ["Shoreditch", "Hackney", "Camden", "Islington", "Clapham", "Wimbledon", "Croydon", "Richmond"],
    queryAnswers: [
      // "ecommerce agency london" 1628, "london ecommerce agency" 957, "ecommerce agencies london" 513, "e-commerce agency london" 373
      { query: "ecommerce agency London", heading: "Choosing an ecommerce agency in London", body: "London has hundreds of ecommerce agencies. The questions that separate them: who actually runs your account day to day, whether you own the ad accounts and data, and whether results are reported against profit or just platform ROAS. Our answer to all three: a named senior operator, your accounts, and profit-based reporting.", to: "/services/performance-marketing", linkLabel: "How we work" },
      // "ecommerce marketing agency london" 396, "ecommerce digital marketing agency london" 150
      { query: "ecommerce marketing agency London", heading: "Ecommerce marketing for London brands", body: "Paid social, Google Shopping and Search, SEO, email and SMS - planned together and measured against blended revenue. For London brands facing high CPMs, we focus on creative volume and conversion rate before increasing budget.", to: "/services/performance-marketing", linkLabel: "Ecommerce marketing" },
      // "media buying agency london" 203
      { query: "media buying agency London", heading: "Media buying for London ecommerce brands", body: "We plan and buy across Meta, Google, TikTok and YouTube against contribution-margin targets, with budgets shifted weekly based on incrementality - not just last-click results.", to: "/services/performance-marketing/media-buying", linkLabel: "Media buying" },
      // "ecommerce consultant london" 144, "ecommerce experts london" 213
      { query: "ecommerce consultant London", heading: "Ecommerce consulting for London founders", body: "Some London founders need a senior second opinion rather than a full agency: a growth audit, a channel plan, or help hiring an in-house team. We offer consulting on SEO and growth strategy alongside full retainers.", to: "/ecommerce-seo-consultant", linkLabel: "Ecommerce consultant" },
    ],
    paa: [
      { q: "How do I choose an ecommerce agency in London?", a: "Ask who runs your account day to day, whether you keep ownership of ad accounts and data, how results are reported, and what the notice period is. Ask to see work in your category." },
      { q: "Why are London ad costs so high?", a: "Many national and international brands target London audiences, so auctions on Meta and Google are crowded. Better creative, a stronger offer and higher lifetime value make those costs workable." },
      { q: "Do you work with London brands remotely?", a: "Yes. We're a UK team working remotely, with in-person strategy sessions available in London." },
    ],
  },

  manchester: {
    market:
      "Manchester is one of the UK's most important ecommerce cities - home to online retailers including boohoo and THG, with a deep pool of ecommerce talent as a result. Brands cluster in the Northern Quarter, Ancoats and Spinningfields, while MediaCityUK in Salford anchors the region's media sector. The University of Manchester and Manchester Metropolitan bring a young audience, and Trafford Park and the M60 ring road make Greater Manchester a major fulfilment base.",
    localPain: {
      title: "Competing for attention with fast-fashion giants",
      body: "Manchester brands share a city with some of the UK's biggest online retailers. Smaller brands can't outspend them, so they need a sharper niche, original creative and loyal repeat customers.",
    },
    entities: [
      { name: "Northern Quarter", kind: "Creative district", note: "Independent fashion, design and lifestyle brands." },
      { name: "Ancoats", kind: "Regenerated mill district", note: "Food, drink and DTC founders in converted mill spaces." },
      { name: "MediaCityUK, Salford", kind: "Media hub", note: "Broadcasters and content production talent on the doorstep." },
      { name: "Trafford Park", kind: "Industrial & logistics", note: "One of Europe's largest industrial estates - warehousing and 3PLs." },
      { name: "Manchester Arndale & Trafford Centre", kind: "Shopping centres", note: "Major footfall destinations shaping omnichannel expectations." },
      { name: "University of Manchester & Manchester Met", kind: "Universities", note: "A large young audience and creator pool for social-first brands." },
    ],
    postcodes: ["M1", "M2", "M3", "M4", "M15", "M20", "M50"],
    towns: ["Salford", "Stockport", "Altrincham", "Didsbury", "Sale", "Bolton", "Oldham", "Rochdale"],
    queryAnswers: [
      // "ecommerce agency manchester" 720, "manchester ecommerce agency" 75
      { query: "ecommerce agency Manchester", heading: "An ecommerce growth agency for Manchester brands", body: "We help Manchester Shopify and WooCommerce brands grow profitably across search, paid social, Google Shopping, email and CRO. In a city full of ecommerce talent, our difference is one senior team that plans every channel together and reports against profit.", to: "/services/performance-marketing", linkLabel: "Growth services" },
      // "ecommerce seo manchester" 323, "ecommerce seo agency manchester" 128
      { query: "ecommerce SEO Manchester", heading: "Ecommerce SEO for Manchester online stores", body: "Technical health, collection pages built around real search demand, product schema, internal linking and digital PR. We prioritise the categories with the most commercial value first, so SEO pays back as early as possible.", to: "/services/seo", linkLabel: "Ecommerce SEO" },
      // "ecommerce design agency manchester" 208, "ecommerce web design manchester" 141, "ecommerce website design manchester" 124
      { query: "ecommerce design agency Manchester", heading: "Ecommerce website design that converts", body: "Good ecommerce design is measured by conversion rate, not awards. We design and build Shopify stores around fast product discovery, clear delivery and returns information, and a short checkout - then test and improve after launch.", to: "/services/store-development/shopify", linkLabel: "Shopify design & build" },
      // "content marketing manchester" 228
      { query: "content marketing Manchester", heading: "Content marketing for Manchester product brands", body: "Buying guides, comparisons and how-to content that answers questions before purchase, linked to the products it supports. Content plans are built from search data, so every piece has a clear commercial job.", to: "/services/seo", linkLabel: "Content & SEO" },
    ],
    paa: [
      { q: "Do you design ecommerce websites in Manchester?", a: "Yes - we design and build Shopify stores and improve WooCommerce stores, with conversion and speed as the main goals." },
      { q: "Can a small Manchester brand compete with boohoo or THG online?", a: "Yes, by not competing head-on. A focused niche, original creative and a strong repeat-purchase strategy let smaller brands grow profitably without matching big-brand budgets." },
      { q: "Do you work across Greater Manchester?", a: "Yes - Salford, Stockport, Trafford, Bolton, Oldham and the wider region." },
    ],
  },

  birmingham: {
    market:
      "Birmingham is the UK's second city and the centre of the West Midlands economy. The Jewellery Quarter produces a large share of the UK's jewellery and has hundreds of jewellery businesses; Digbeth and the Custard Factory house creative and digital firms; and the Bullring, Grand Central and the Mailbox are major retail destinations. Gymshark, one of the UK's best-known DTC success stories, was founded nearby and is headquartered in Solihull. Three universities - Birmingham, Aston and Birmingham City - supply talent, and the M6, M5 and M42 give national delivery reach.",
    localPain: {
      title: "Jewellery Quarter makers moving online",
      body: "Many Jewellery Quarter businesses have decades of craft and trade relationships but little online presence. Selling high-value items online needs trust: great photography, reviews, clear hallmarking and returns information, and a secure checkout.",
    },
    entities: [
      { name: "Jewellery Quarter", kind: "Historic manufacturing district", note: "Hundreds of jewellers and makers, many building direct-to-consumer sales." },
      { name: "Digbeth & the Custard Factory", kind: "Creative quarter", note: "Creative, digital and independent product businesses." },
      { name: "Bullring, Grand Central & the Mailbox", kind: "City-centre retail", note: "Major shopping destinations for the West Midlands." },
      { name: "University of Birmingham, Aston & BCU", kind: "Universities", note: "Talent, research and a large student audience." },
      { name: "NEC Birmingham", kind: "Exhibition centre", note: "Hosts major consumer and trade shows that drive seasonal search demand." },
      { name: "Solihull", kind: "Neighbouring borough", note: "Home of Gymshark and a high-income shopper base." },
    ],
    postcodes: ["B1", "B3", "B5", "B9", "B15", "B18", "B91"],
    towns: ["Solihull", "Sutton Coldfield", "Edgbaston", "Moseley", "Harborne", "West Bromwich", "Wolverhampton", "Coventry"],
    queryAnswers: [
      // "ecommerce agency birmingham" 527
      { query: "ecommerce agency Birmingham", heading: "An ecommerce agency for Birmingham and the West Midlands", body: "We help Birmingham Shopify and WooCommerce brands grow with search, Google Shopping, Meta and TikTok ads, email and CRO. Our work is measured against revenue and margin, with a named senior operator on every account.", to: "/services/performance-marketing", linkLabel: "Growth services" },
      // "shopify agency birmingham" 199
      { query: "Shopify agency Birmingham", heading: "Shopify development and growth in Birmingham", body: "Store builds, Shopify Plus, theme fixes, app clean-ups and migrations from WooCommerce or Magento - followed by the marketing that grows the store.", to: "/services/store-development/shopify", linkLabel: "Shopify development" },
      // "jewellery quarter birmingham digital marketing agency" 146
      { query: "Jewellery Quarter digital marketing", heading: "Digital marketing for Jewellery Quarter businesses", body: "Jewellery sells online on trust. We help Jewellery Quarter makers and retailers with product photography briefs, Google Shopping feeds, SEO for engagement rings, wedding bands and bespoke pieces, review collection and a checkout that reassures buyers spending hundreds or thousands of pounds.", to: "/services/seo", linkLabel: "Jewellery ecommerce SEO" },
      // "ecommerce seo agency birmingham" 190, "organic growth agency birmingham" 127, "ecommerce seo birmingham" 103
      { query: "ecommerce SEO agency Birmingham", heading: "Organic growth for Birmingham online stores", body: "Technical SEO, collection page strategy, product schema and digital PR from West Midlands media. Organic search is the channel that keeps paying back after the work is done.", to: "/services/seo", linkLabel: "Ecommerce SEO" },
    ],
    paa: [
      { q: "Do you work with Jewellery Quarter businesses?", a: "Yes. Jewellery is one of our core categories, and we understand the trust, photography and search challenges of selling high-value pieces online." },
      { q: "Do you cover Solihull and the wider West Midlands?", a: "Yes - Birmingham, Solihull, Sutton Coldfield, the Black Country and Coventry." },
      { q: "Can you help us sell at NEC shows and online?", a: "We can plan campaigns around trade and consumer shows so the interest they generate turns into email subscribers and online orders afterwards." },
    ],
  },

  edinburgh: {
    market:
      "Edinburgh is Scotland's capital and a premium market for online brands. Shoppers in the New Town, Stockbridge, Bruntsfield and Morningside are affluent and design-conscious, and every August the Edinburgh Festival Fringe brings one of the world's largest arts festivals to the Old Town and Royal Mile. The University of Edinburgh and Heriot-Watt drive a strong tech scene - Skyscanner was founded here - and St James Quarter has added a major new retail destination at the east end of Princes Street.",
    localPain: {
      title: "WooCommerce stores that have outgrown their setup",
      body: "Many Edinburgh businesses run WooCommerce stores built years ago. As they grow, plugin conflicts, slow hosting and SEO issues start to cost sales. Edinburgh owners often ask us whether to fix WooCommerce or move to Shopify - the answer depends on catalogue complexity and team skills.",
    },
    entities: [
      { name: "New Town & Stockbridge", kind: "Affluent districts", note: "Premium audiences for fashion, homeware and gifting brands." },
      { name: "Old Town & Royal Mile", kind: "Historic centre", note: "Tourist footfall, especially during the August festivals." },
      { name: "St James Quarter & Princes Street", kind: "City-centre retail", note: "Edinburgh's main shopping destinations." },
      { name: "Leith & the Shore", kind: "Waterfront district", note: "Independent food, drink and lifestyle brands." },
      { name: "University of Edinburgh & Heriot-Watt", kind: "Universities", note: "Tech talent and a strong start-up ecosystem." },
      { name: "Edinburgh Festival Fringe", kind: "Annual event", note: "A huge seasonal visitor audience every August." },
    ],
    postcodes: ["EH1", "EH2", "EH3", "EH4", "EH6", "EH9", "EH10"],
    towns: ["Leith", "Portobello", "Musselburgh", "Dalkeith", "Livingston", "South Queensferry", "Penicuik", "Dunfermline"],
    queryAnswers: [
      // "ecommerce agency edinburgh" 308, "e commerce agency edinburgh" 178, "e-commerce agency edinburgh" 169
      { query: "ecommerce agency Edinburgh", heading: "An ecommerce agency for Edinburgh brands", body: "We help Edinburgh and Lothians brands grow online with SEO, paid social, Google Shopping, email and conversion work. Premium brands here usually win on storytelling and retention, so we put as much effort into email and repeat purchase as into acquisition.", to: "/services/performance-marketing", linkLabel: "Growth services" },
      // "woocommerce seo edinburgh" 186, "woocommerce agency edinburgh" 151, "woocommerce services edinburgh" 105
      { query: "WooCommerce SEO Edinburgh", heading: "WooCommerce SEO and development in Edinburgh", body: "WooCommerce stores often suffer from slow hosting, too many plugins, duplicate category and tag pages, and weak product schema. We fix those technical foundations, improve category and product pages, and support store improvements - or plan a Shopify migration when that's the better option.", to: "/woocommerce-seo-agency-uk", linkLabel: "WooCommerce SEO" },
      // "shopify agency edinburgh" 145, "shopify seo edinburgh" 116
      { query: "Shopify agency Edinburgh", heading: "Shopify builds and Shopify SEO in Edinburgh", body: "From new Shopify builds to fixing an existing theme, we help Edinburgh brands get a fast, high-converting store and rank it - covering Shopify's duplicate URL issues, app bloat and structured data.", to: "/shopify-seo-agency-uk", linkLabel: "Shopify SEO" },
    ],
    paa: [
      { q: "Should my Edinburgh business use WooCommerce or Shopify?", a: "If you're already on WordPress with complex products and in-house technical skills, improving WooCommerce can make sense. If you want simpler management, reliable hosting and faster checkout, Shopify usually wins. We advise on both." },
      { q: "How can Edinburgh brands make the most of the Fringe?", a: "Capture visitors into email and SMS during August with a clear incentive, then follow up with gifting and Christmas campaigns so festival interest becomes repeat online sales." },
      { q: "Do you work across Scotland?", a: "Yes - Edinburgh, Glasgow and brands across Scotland. See our Scotland region page for more." },
    ],
  },

  glasgow: {
    market:
      "Glasgow is Scotland's largest city and its biggest shopping destination: Buchanan Street, Argyle Street and Sauchiehall Street form the 'Style Mile', with Buchanan Galleries, St Enoch Centre and Silverburn nearby. The Merchant City and Finnieston host creative and hospitality businesses, while the Glasgow School of Art, University of Glasgow and University of Strathclyde feed design and tech talent. Glasgow shoppers are value-conscious, loyal and responsive to brands with personality.",
    localPain: {
      title: "A store that looks good but doesn't sell",
      body: "Glasgow's design talent means many local brands have beautiful websites - but beautiful doesn't always convert. We often find slow mobile pages, hidden delivery costs and long checkouts behind good-looking stores.",
    },
    entities: [
      { name: "Buchanan Street & the Style Mile", kind: "City-centre retail", note: "Scotland's main shopping area." },
      { name: "Merchant City", kind: "Creative & hospitality district", note: "Independent fashion, food and drink businesses." },
      { name: "Finnieston & the West End", kind: "Districts", note: "Independent retailers and a young professional audience around Byres Road." },
      { name: "Glasgow School of Art", kind: "Art school", note: "Design and branding talent for Glasgow brands." },
      { name: "University of Glasgow & Strathclyde", kind: "Universities", note: "Tech and business talent and a large student audience." },
      { name: "Silverburn & Braehead", kind: "Shopping centres", note: "Out-of-town retail competition." },
    ],
    postcodes: ["G1", "G2", "G3", "G4", "G11", "G12", "G41"],
    towns: ["Paisley", "East Kilbride", "Clydebank", "Bearsden", "Hamilton", "Motherwell", "Cumbernauld", "Dumbarton"],
    queryAnswers: [
      // "shopify agency glasgow" 183, "shopify websites glasgow" 152, "shopify glasgow" 58
      { query: "Shopify agency Glasgow", heading: "Shopify websites and growth for Glasgow brands", body: "We design and build Shopify stores, fix underperforming themes and move Glasgow businesses from WooCommerce or older platforms to Shopify. Then we grow them with SEO, ads and email - so the new site actually pays for itself.", to: "/services/store-development/shopify", linkLabel: "Shopify development" },
      // "ecommerce agency glasgow" 144, "ecommerce glasgow" 163
      { query: "ecommerce agency Glasgow", heading: "An ecommerce agency for Glasgow and the west of Scotland", body: "Search, Google Shopping, Meta and TikTok ads, Klaviyo email and conversion work for Glasgow product brands - measured against revenue, with a named senior operator on every account.", to: "/services/performance-marketing", linkLabel: "Growth services" },
      // "branding company for ecommerce glasgow" 93
      { query: "ecommerce branding Glasgow", heading: "Creative and branding that sells online", body: "Branding for ecommerce has to work in a 2-second scroll and a product page. We produce ad creative, UGC and product imagery designed to convert - and test it against real sales.", to: "/services/creative", linkLabel: "Creative studio" },
      // "email marketing glasgow" 45, "wordpress ecommerce glasgow" 131
      { query: "email marketing Glasgow", heading: "Email and SMS marketing for Glasgow brands", body: "Klaviyo welcome, abandoned cart, post-purchase and win-back flows, plus planned campaigns. For many stores, email becomes the most profitable channel within a few months.", to: "/services/email-sms", linkLabel: "Email & SMS" },
    ],
    paa: [
      { q: "Do you build Shopify websites in Glasgow?", a: "Yes - new builds, redesigns and migrations, followed by ongoing growth work." },
      { q: "Do you work with WordPress and WooCommerce stores in Glasgow?", a: "Yes. We improve WooCommerce stores and can migrate them to Shopify if that's the better fit." },
      { q: "Do you work with brands outside Glasgow?", a: "Yes - across Scotland, including Edinburgh, Paisley, East Kilbride and beyond." },
    ],
  },

  sheffield: {
    market:
      "Sheffield's 'Made in Sheffield' steel and cutlery heritage still shapes a city of makers. Kelham Island has become a hub for independent food, drink and design businesses, Ecclesall Road and Division Street host independent retail, and Meadowhall is one of the UK's largest shopping centres. With the Peak District on the doorstep, outdoor and adventure brands do well here. The University of Sheffield and Sheffield Hallam bring a large student audience, and the Advanced Manufacturing Park reflects the region's engineering strength.",
    localPain: {
      title: "Great products, no marketing team",
      body: "Sheffield makers often run lean: the founder makes the product, ships the orders and does the marketing in the evenings. What they need is a simple, reliable growth system that doesn't depend on them posting every day.",
    },
    entities: [
      { name: "Kelham Island", kind: "Creative & food district", note: "Independent makers, breweries and design businesses." },
      { name: "Division Street & Ecclesall Road", kind: "Independent retail", note: "Independent fashion, lifestyle and food retailers." },
      { name: "Meadowhall", kind: "Shopping centre", note: "One of the UK's largest shopping centres." },
      { name: "Peak District", kind: "National park", note: "A natural backdrop - and market - for outdoor brands." },
      { name: "University of Sheffield & Sheffield Hallam", kind: "Universities", note: "A large student audience and creative talent." },
      { name: "Advanced Manufacturing Park", kind: "Industrial innovation", note: "Engineering and manufacturing businesses in South Yorkshire." },
    ],
    postcodes: ["S1", "S2", "S3", "S7", "S10", "S11"],
    towns: ["Rotherham", "Doncaster", "Barnsley", "Chesterfield", "Hillsborough", "Dronfield", "Stocksbridge", "Penistone"],
    queryAnswers: [
      // "marketing agency sheffield" 171, "digital marketing agency sheffield" 403
      { query: "marketing agency Sheffield", heading: "Ecommerce marketing for Sheffield makers and brands", body: "We're an ecommerce specialist, not a general marketing agency. For Sheffield businesses selling online we run Google Shopping, paid social, SEO and email, all measured against orders and margin.", to: "/services/performance-marketing", linkLabel: "Ecommerce marketing" },
      // "content marketing agency sheffield" 326, "content marketing sheffield" 126
      { query: "content marketing agency Sheffield", heading: "Content that tells a maker's story - and sells", body: "Sheffield brands have real stories: how products are made, where materials come from, why they last. We turn that into product page copy, buying guides and video that rank in search and convert visitors.", to: "/services/seo", linkLabel: "Content & SEO" },
      // "tiktok ads agency sheffield" 55, "ecommerce agency sheffield" 69
      { query: "TikTok ads agency Sheffield", heading: "TikTok ads for Sheffield brands", body: "Creator-led TikTok ads, Spark Ads on content that's already working, and TikTok Shop setup where it suits the product. Outdoor and maker brands do especially well with product-in-use video.", to: "/services/performance-marketing/tiktok-ads", linkLabel: "TikTok ads" },
    ],
    paa: [
      { q: "Do you work with small Sheffield makers?", a: "Yes. Our Starter plan is built for smaller stores, focusing on SEO foundations, product pages and tracking." },
      { q: "Do you work with outdoor brands near the Peak District?", a: "Yes - outdoor and adventure brands are a strong fit, especially with product-in-use creative." },
      { q: "Do you cover Rotherham, Doncaster and Barnsley?", a: "Yes - we work with brands across South Yorkshire." },
    ],
  },

  bradford: {
    market:
      "Bradford was the UK City of Culture for 2025, and its economy combines a long textile and wool heritage with major employers including Morrisons, which is headquartered in the city. Little Germany's Victorian warehouses, City Park and the Broadway shopping centre sit at its centre, Saltaire is a UNESCO World Heritage Site, and the University of Bradford has a strong business school. Bradford has a large community of independent retailers and wholesalers - many of them now selling online across the UK.",
    localPain: {
      title: "Wholesale and trade businesses going direct to consumer",
      body: "Many Bradford businesses have strong trade or wholesale operations and want to sell directly online. That needs a different approach: retail-ready product pages, Shopping feeds, consumer-facing branding and fulfilment for single orders.",
    },
    entities: [
      { name: "Little Germany", kind: "Historic merchant quarter", note: "Victorian warehouses now home to creative and digital businesses." },
      { name: "City Park & Broadway", kind: "City-centre retail", note: "Bradford's central shopping and events space." },
      { name: "Saltaire", kind: "UNESCO World Heritage Site", note: "Salts Mill and an independent retail and arts community." },
      { name: "University of Bradford", kind: "University", note: "Business and technology talent." },
      { name: "Bradford 2025 UK City of Culture", kind: "Cultural programme", note: "A national spotlight on the city's creative businesses." },
      { name: "Leeds Road & Thornbury", kind: "Trade and wholesale area", note: "Wholesale, textile and food businesses building online sales." },
    ],
    postcodes: ["BD1", "BD2", "BD3", "BD5", "BD8", "BD18"],
    towns: ["Shipley", "Saltaire", "Bingley", "Keighley", "Ilkley", "Queensbury", "Halifax", "Huddersfield"],
    queryAnswers: [
      // "digital marketing agency bradford" 222, "digital marketing bradford" 113
      { query: "digital marketing agency Bradford", heading: "Digital marketing for Bradford businesses that sell online", body: "If your business sells products online - or wants to - we run the channels that drive orders: Google Shopping, Meta and TikTok ads, SEO and email. We don't offer general social media management or brochure websites.", to: "/services/performance-marketing", linkLabel: "Ecommerce marketing" },
      // "seo agency bradford" 183, "bradford seo" 118, "seo company bradford" 84, "bradford seo consultant" 79
      { query: "SEO agency Bradford", heading: "Ecommerce SEO for Bradford online shops", body: "Product and collection pages built around what buyers search, technical fixes for Shopify and WooCommerce, structured data and links from Yorkshire media. For businesses with a physical shop we also cover Google Business Profile.", to: "/services/seo", linkLabel: "Ecommerce SEO" },
      // "ppc agency bradford" 178, "paid social agency bradford" 51, "digital advertising agency bradford" 56
      { query: "PPC agency Bradford", heading: "PPC and paid social for Bradford brands", body: "Google Search and Shopping, Performance Max, Meta and TikTok - managed against profit targets, with weekly creative testing and clean conversion tracking.", to: "/services/performance-marketing/google-ads", linkLabel: "Google Ads & PPC" },
    ],
    paa: [
      { q: "Can you help a Bradford wholesaler sell direct to consumers online?", a: "Yes. We help trade businesses set up consumer-ready stores, product feeds and marketing, while keeping wholesale operations separate." },
      { q: "Do you work across West Yorkshire?", a: "Yes - Bradford, Shipley, Keighley, Halifax, Huddersfield and Leeds." },
      { q: "Do you offer one-off SEO consultancy in Bradford?", a: "Yes - alongside retainers we offer SEO consulting and audits for businesses that want a plan their own team can deliver." },
    ],
  },

  "newcastle-upon-tyne": {
    market:
      "Newcastle upon Tyne is the commercial capital of the North East. The Quayside and Ouseburn Valley host creative and independent businesses, Grainger Town and Eldon Square are the heart of city-centre retail, and the Metrocentre in Gateshead is one of the UK's largest shopping centres. Sage, the accounting software company, is headquartered here, and Newcastle University and Northumbria University bring a large student population. North East shoppers are famously loyal to local brands with a genuine story.",
    localPain: {
      title: "Hard to find specialist ecommerce help in the North East",
      body: "North East founders often tell us the specialist ecommerce agencies are in London or Manchester. They want senior expertise without London pricing, and someone who understands a regional brand selling nationally.",
    },
    entities: [
      { name: "Quayside", kind: "Riverside district", note: "Business, hospitality and cultural venues along the Tyne." },
      { name: "Ouseburn Valley", kind: "Creative district", note: "Independent makers, studios and creative businesses." },
      { name: "Grainger Town & Eldon Square", kind: "City-centre retail", note: "Newcastle's historic centre and main shopping centre." },
      { name: "Metrocentre, Gateshead", kind: "Shopping centre", note: "One of the UK's largest shopping centres." },
      { name: "Newcastle & Northumbria Universities", kind: "Universities", note: "A large student audience and digital talent." },
      { name: "Jesmond & Gosforth", kind: "Suburbs", note: "Higher-income audiences for premium brands." },
    ],
    postcodes: ["NE1", "NE2", "NE3", "NE4", "NE6", "NE8"],
    towns: ["Gateshead", "Sunderland", "North Shields", "Tynemouth", "Whitley Bay", "Durham", "Hexham", "Cramlington"],
    queryAnswers: [
      // "woocoomerce newcastle" 168, pos 9.7 (typo query, page 1)
      { query: "WooCommerce Newcastle", heading: "WooCommerce development and SEO in Newcastle", body: "We support North East businesses running WooCommerce with speed and hosting fixes, plugin clean-ups, checkout improvements and WooCommerce SEO - and help with Shopify migration when a store has outgrown WordPress.", to: "/services/store-development/woocommerce", linkLabel: "WooCommerce services" },
      // "ecommerce agency newcastle" 88 (pos 9.1), "ecommerce agency in newcastle" 76, "ecommerce experts north east" 160
      { query: "ecommerce agency Newcastle", heading: "Ecommerce experts for Newcastle and the North East", body: "Search, Google Shopping, paid social, email and CRO for North East brands selling across the UK - senior expertise without London overheads, measured against revenue.", to: "/services/performance-marketing", linkLabel: "Growth services" },
      // "shopify agency newcastle" 54, "ecommerce seo agency newcastle" 44
      { query: "Shopify agency Newcastle", heading: "Shopify and ecommerce SEO for Newcastle stores", body: "Shopify builds, theme and speed fixes, and SEO for collection and product pages - so North East brands can rank and convert nationally, not just locally.", to: "/shopify-seo-agency-uk", linkLabel: "Shopify SEO" },
    ],
    paa: [
      { q: "Do you work with WooCommerce stores in Newcastle?", a: "Yes - WooCommerce improvements, SEO and migrations to Shopify where that makes sense." },
      { q: "Do you cover Sunderland, Gateshead and Durham?", a: "Yes - we work with brands across Tyne and Wear, Northumberland and County Durham." },
      { q: "Can a North East brand sell nationally online?", a: "Absolutely. A regional story is often an advantage in ads and PR - we help North East brands use it to reach customers across the UK." },
    ],
  },

  liverpool: {
    market:
      "Liverpool combines one of the UK's most important ports with a fast-growing creative and digital sector. The Baltic Triangle is the city's digital and creative hub, Bold Street and the Ropewalks host independent retail, and Liverpool ONE is one of the UK's largest open-air shopping destinations. The Knowledge Quarter brings together the University of Liverpool, Liverpool John Moores and research institutions, and the Port of Liverpool gives importers and online sellers a major logistics advantage.",
    localPain: {
      title: "Too many manual tasks as the store grows",
      body: "Liverpool founders often tell us they spend more time on orders, stock and customer emails than on growth. Automating the repetitive work - order updates, review requests, stock alerts, customer service - frees up time and reduces errors.",
    },
    entities: [
      { name: "Baltic Triangle", kind: "Creative & digital hub", note: "Digital agencies, start-ups and creative businesses." },
      { name: "Bold Street & the Ropewalks", kind: "Independent retail", note: "Independent fashion, food and lifestyle retailers." },
      { name: "Liverpool ONE", kind: "Shopping district", note: "One of the UK's largest open-air shopping destinations." },
      { name: "Albert Dock & waterfront", kind: "Waterfront", note: "Tourism and visitor footfall." },
      { name: "Knowledge Quarter", kind: "Innovation district", note: "University of Liverpool, LJMU and research institutions." },
      { name: "Port of Liverpool", kind: "Port", note: "Import and logistics advantage for online sellers." },
    ],
    postcodes: ["L1", "L3", "L8", "L17", "L18", "CH41"],
    towns: ["Birkenhead", "Wallasey", "Bootle", "Southport", "St Helens", "Crosby", "Huyton", "Warrington"],
    queryAnswers: [
      // "ecommerce liverpool" 324, "liverpool ecommerce" 261 (pos 16.5), "ecommerce agency liverpool" 243 (protect)
      { query: "ecommerce Liverpool", heading: "Ecommerce growth for Liverpool and Merseyside", body: "We help Liverpool and Merseyside product businesses grow online with SEO, Google Shopping, paid social, email and CRO - from independents around Bold Street to growing brands selling nationally.", to: "/services/performance-marketing", linkLabel: "Growth services" },
      // "shopify agency liverpool" 254 (pos 18.8), "shopify ecommerce liverpool" 25
      { query: "Shopify agency Liverpool", heading: "Shopify development for Liverpool brands", body: "Shopify builds, redesigns, theme and speed fixes, and migrations from WooCommerce or older platforms - followed by marketing that grows the store.", to: "/services/store-development/shopify", linkLabel: "Shopify development" },
      // "ecommerce automation liverpool" 25 (pos 3.3)
      { query: "ecommerce automation Liverpool", heading: "Ecommerce automation for Liverpool stores", body: "We automate order notifications, review requests, back-in-stock alerts, customer service triage and reporting, using Shopify Flow, Klaviyo and AI tools - so small teams can handle more orders without more admin.", to: "/services/ai-automation", linkLabel: "AI & automation" },
    ],
    paa: [
      { q: "Do you work with Liverpool independent shops?", a: "Yes - from independent retailers to established brands, across Liverpool and Merseyside." },
      { q: "Can you automate parts of my Liverpool online store?", a: "Yes. Common wins are order updates, review requests, stock alerts and customer service workflows using Shopify Flow, Klaviyo and AI tools." },
      { q: "Do you cover the Wirral?", a: "Yes - Birkenhead, Wallasey and the wider Wirral as well as Liverpool and Southport." },
    ],
  },

  bristol: {
    market:
      "Bristol has one of the UK's strongest independent and sustainable business scenes, with a large number of B Corp-certified businesses and a shopper base that cares about ethics and provenance. Stokes Croft, Gloucester Road and Wapping Wharf are known for independents, Cabot Circus is the main retail destination, and Temple Quarter's Engine Shed supports start-ups. The University of Bristol and UWE Bristol supply talent, and the M4/M5 interchange gives fast access to London, Wales and the South West.",
    localPain: {
      title: "Sustainable brands with higher costs",
      body: "Bristol's ethical brands often have higher product and packaging costs than mass-market competitors. They need customers who value provenance, strong storytelling and repeat purchase to make the numbers work - discounting erodes both margin and brand.",
    },
    entities: [
      { name: "Stokes Croft & Gloucester Road", kind: "Independent retail", note: "One of the UK's longest stretches of independent shops." },
      { name: "Wapping Wharf & Harbourside", kind: "Waterfront district", note: "Independent food, drink and lifestyle businesses." },
      { name: "Cabot Circus & Broadmead", kind: "City-centre retail", note: "Bristol's main shopping destination." },
      { name: "Engine Shed, Temple Quarter", kind: "Business hub", note: "Start-up and innovation hub next to Temple Meads." },
      { name: "University of Bristol & UWE", kind: "Universities", note: "Talent and research." },
      { name: "Clifton", kind: "Affluent district", note: "A premium audience for lifestyle and gifting brands." },
    ],
    postcodes: ["BS1", "BS2", "BS3", "BS6", "BS7", "BS8"],
    towns: ["Bath", "Clifton", "Bedminster", "Keynsham", "Portishead", "Clevedon", "Weston-super-Mare", "Thornbury"],
    queryAnswers: [
      // "ecommerce agency bristol" 420
      { query: "ecommerce agency Bristol", heading: "An ecommerce agency for Bristol brands", body: "SEO, Google Shopping, paid social, email and CRO for Bristol and South West brands - with messaging built around the provenance and values your customers care about.", to: "/services/performance-marketing", linkLabel: "Growth services" },
      // "shopify agency bristol" 104, "bristol shopify" 41
      { query: "Shopify agency Bristol", heading: "Shopify builds and growth in Bristol", body: "New Shopify builds, redesigns and migrations, plus speed and conversion fixes for existing stores.", to: "/services/store-development/shopify", linkLabel: "Shopify development" },
      // "klaviyo agency bristol" 69 (pos 21)
      { query: "Klaviyo agency Bristol", heading: "Klaviyo email and SMS for Bristol brands", body: "Welcome, abandoned cart, post-purchase, replenishment and win-back flows, plus planned campaigns. For brands built on loyal, values-driven customers, email is usually the highest-margin channel.", to: "/services/email-sms", linkLabel: "Klaviyo email & SMS" },
      // "ecommerce fulfilment services bristol" 47, "ecommerce fulfilment company bristol" 45
      { query: "ecommerce fulfilment Bristol", heading: "Fulfilment and delivery as a growth lever", body: "We don't run warehouses. But delivery speed, cost and returns policy affect conversion directly, so we help Bristol brands choose delivery options and messaging that reduce checkout abandonment.", to: "/services/cro", linkLabel: "CRO services" },
    ],
    paa: [
      { q: "Do you work with B Corp and sustainable brands in Bristol?", a: "Yes - sustainable and ethical brands are a strong fit, and we build messaging around provenance rather than discounts." },
      { q: "Do you offer ecommerce fulfilment in Bristol?", a: "No, we're a growth agency rather than a 3PL. We do help you optimise delivery options and messaging to improve conversion." },
      { q: "Do you cover Bath and the wider South West?", a: "Yes - Bristol, Bath, North Somerset and the wider South West." },
    ],
  },
};

export function guideFor(slug: string): LocalGuide | undefined {
  return LOCAL_GUIDE[slug];
}
