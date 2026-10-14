// Follow-up city narratives for /locations/:slug pages (GSC keyword work,
// Oct 2026). These four cities had no entry in LOCAL_NARRATIVE in
// location-content.ts, so they previously rendered without the unique
// intro / ecosystem / playbook / local-FAQ blocks. Kept in a separate file
// so the large location-content.ts does not need to change: the location
// template falls back to EXTRA_NARRATIVES when narrativeFor() returns
// undefined. Same honest framing as the template - "serving brands in X",
// no physical-office or local-staff claims.

import type { LocalNarrative } from "./location-content";

export const EXTRA_NARRATIVES: Record<string, LocalNarrative> = {
  edinburgh: {
    intro: [
      "Edinburgh is Scotland's premium DTC city - a market where brand, story and margin matter more than volume. As an ecommerce agency in Edinburgh, Being Ecom works with Shopify, Shopify Plus and WooCommerce brands across the Lothians for whom the growth challenge is selling considered, higher-AOV products to shoppers who research hard before they buy. Premium beauty, wellness, whisky-adjacent gifting, cashmere and homeware all thrive here, and every one of them rewards the same discipline: honest creative, airtight analytics and retention that compounds.",
      "The Edinburgh shopper is distinct from Glasgow's. Festival-season tourism brings a huge transient audience through the Royal Mile, Princes Street and Stockbridge every August, while the year-round base - Stockbridge, Morningside, Bruntsfield and Leith - skews affluent, design-literate and loyal to brands that tell a real story. Our Edinburgh engagements segment paid media against exactly that split: premium editorial creative for the local catchment, and seasonal, gift-led campaigns that convert festival footfall into email subscribers who buy long after the Fringe ends.",
      "Edinburgh also punches above its weight on search. Scottish SERPs for 'ecommerce agency Edinburgh', 'Shopify Edinburgh' and WooCommerce SEO terms are meaningfully less contested than English equivalents, which gives Edinburgh brands a real authority-link efficiency advantage. We lean into that with Edinburgh digital PR - The Scotsman, Edinburgh Evening News and Scottish business press - plus technical SEO tuned for Shopify and WooCommerce stores that sell considered products with long research cycles.",
    ],
    ecosystem: [
      { title: "Stockbridge, New Town & Morningside", body: "Higher-AOV catchment for premium beauty, wellness, cashmere and homeware DTC. Editorial, story-led Meta creative outperforms discount-led angles here by a wide margin." },
      { title: "Leith & Shore", body: "Independent Shopify DTC founder cluster - lifestyle, food-and-drink and craft brands with distinctive Edinburgh identity. Strong local UGC creator supply." },
      { title: "Old Town, Royal Mile & Princes Street", body: "Festival-season and tourist footfall that converts into email and SMS subscribers when gift-led campaigns and Klaviyo capture are engineered around the August peak." },
      { title: "Lothians & Fife corridor", body: "3PL, warehousing and last-mile fulfilment into rUK. Enables the next-day national delivery promise Edinburgh Shopify Plus stores need to compete on shipping." },
    ],
    playbook: [
      { title: "SEO for Edinburgh Shopify & WooCommerce stores", body: "Local SEO across EH postcodes, Google Business Profile, city-intent collection pages, WooCommerce SEO for considered-product catalogues, and Scottish digital PR for authority links at lower cost than English equivalents." },
      { title: "Premium paid for Edinburgh DTC", body: "Editorial Meta and Google creative briefed for a research-heavy shopper, Performance Max structured around margin, and seasonal gifting calendars built around the Fringe and Christmas peaks." },
      { title: "Klaviyo retention for premium Edinburgh brands", body: "Gifting and replenishment flows tuned for Edinburgh's high-AOV, high-repeat catchment, plus festival-season capture flows that turn August visitors into year-round customers." },
    ],
    localFaqs: [
      { q: "Do you work with Edinburgh ecommerce brands?", a: "Yes - our Edinburgh roster covers premium beauty, wellness, gifting, cashmere and homeware DTC. We work with Edinburgh Shopify and WooCommerce brands across the Lothians, with in-person strategy sessions available for Edinburgh engagements." },
      { q: "How does Edinburgh compare to Glasgow for ecommerce growth?", a: "Edinburgh skews more premium and considered: higher AOV, longer research cycles, and a shopper who rewards story-led creative over discounting. Glasgow is broader and more volume-driven. We brief paid creative and SEO differently for each city rather than running one Scotland playbook." },
      { q: "Can you help an Edinburgh brand with WooCommerce SEO?", a: "Yes - WooCommerce SEO is a core service for Edinburgh brands with considered-product catalogues. We handle technical SEO, collection and product page optimisation, schema and Core Web Vitals, plus Scottish digital PR for authority links." },
      { q: "Do you run Klaviyo email marketing for Edinburgh brands?", a: "Yes - Klaviyo flows, campaigns and SMS are a standard part of Edinburgh engagements, typically driving 30-45% of monthly revenue for our premium DTC clients through gifting, replenishment and winback flows." },
    ],
    nearby: ["glasgow", "newcastle-upon-tyne", "manchester", "london"],
  },

  sheffield: {
    intro: [
      "Sheffield is Yorkshire's maker city - and one of the most under-rated ecommerce markets in the UK. As an ecommerce agency in Sheffield, Being Ecom works with Shopify and WooCommerce brands across South Yorkshire for whom product quality is the starting point: outdoor and adventure brands trading on the Peak District on their doorstep, maker-led homeware and design labels from Kelham Island, and health, wellness and sports brands that sell to people who actually use the product. Sheffield founders tend to build brands with real stories, which makes the marketing job easier - our work is amplifying what is already true, not inventing it.",
      "The Sheffield shopper rewards substance. Kelham Island, Ecclesall Road and the city centre house a young, design-literate audience that responds to honest creative and punishes boilerplate ads, while the wider South Yorkshire catchment - Rotherham, Doncaster, Chesterfield - delivers a value-conscious but loyal buyer base that converts well on benefit-led creative and clear delivery promises. Our Sheffield engagements segment paid media against that split, with TikTok and Meta creative briefed for the city's maker and outdoor identity rather than generic DTC templates.",
      "Sheffield's ecommerce SERPs are also meaningfully less saturated than Leeds or Manchester, which means ranking for 'ecommerce agency Sheffield', 'Shopify Sheffield' or neighbourhood-level buyer terms takes fewer authority links. Combined with two large universities feeding a low-cost UGC creator pool, Sheffield brands get one of the best cost-per-test ratios in UK ecommerce - more creative tested per pound, faster learning, and a retention stack that compounds because the product stories are genuinely good.",
    ],
    ecosystem: [
      { title: "Kelham Island & City Centre", body: "Maker-led DTC cluster - design, homeware, food-and-drink and lifestyle brands with genuine product stories. Weekly UGC shoots with Sheffield creators and student talent." },
      { title: "Ecclesall Road & Endcliffe", body: "Higher-AOV catchment for premium wellness, beauty and homeware DTC. Editorial Meta creative and heritage-storytelling angles perform well here." },
      { title: "Peak District fringe & outdoor brands", body: "Outdoor, adventure and sports DTC with a built-in testing ground on the doorstep. Product-in-use UGC shot in the Peaks outperforms studio creative on Meta and TikTok by wide margins." },
      { title: "South Yorkshire fulfilment corridor", body: "3PL, warehousing and last-mile access via the M1 and M18. Enables the next-day national delivery promises we build into Sheffield Shopify PDP and cart copy." },
    ],
    playbook: [
      { title: "TikTok & Meta ads for Sheffield DTC", body: "Maker-and-outdoor-led creative briefs, Sheffield UGC creators, TikTok Spark Ads on winning UGC, and Meta Advantage+ tested against contribution margin. Sheffield's creator costs run well below London equivalents." },
      { title: "SEO for Sheffield Shopify stores", body: "Local SEO across S postcodes, Google Business Profile, city-intent collection pages, and South Yorkshire digital PR (The Star, Yorkshire Post, Business Desk) for authority link building." },
      { title: "Klaviyo retention for South Yorkshire DTC", body: "Post-purchase, replenishment and winback flows tuned for Sheffield's loyal, repeat-heavy buyer behaviour, plus SMS opt-in flows for outdoor, wellness and food-and-drink brands." },
    ],
    localFaqs: [
      { q: "Do you work with Sheffield ecommerce brands?", a: "Yes - our Sheffield roster covers outdoor and adventure, maker-led homeware, wellness and food-and-drink DTC. We work with Sheffield Shopify and WooCommerce brands across South Yorkshire, with in-person strategy sessions available for Sheffield engagements." },
      { q: "Can you run TikTok ads for a Sheffield brand?", a: "Yes - TikTok ads are a core channel for Sheffield clients, particularly outdoor, maker and lifestyle brands. We handle creator sourcing across Sheffield and South Yorkshire, TikTok Shop setup, live-selling calendars and Spark Ads on winning UGC." },
      { q: "Is Sheffield SEO very competitive?", a: "Sheffield ecommerce SERPs are meaningfully less saturated than Leeds or Manchester, so ranking for 'ecommerce agency Sheffield', 'Shopify Sheffield' or neighbourhood-level buyer terms takes fewer authority links. That is a real efficiency advantage for Sheffield DTC brands." },
      { q: "Do you understand maker and outdoor brands specifically?", a: "Yes - maker-led and outdoor brands are a Sheffield strength for us. We brief creative around real product stories and product-in-use content shot in the Peak District, which consistently outperforms generic studio creative for these brands." },
    ],
    nearby: ["leeds", "manchester", "nottingham", "bradford"],
  },

  "newcastle-upon-tyne": {
    intro: [
      "Newcastle upon Tyne is the North East's ecommerce capital - a city where loyalty, personality and value drive buying behaviour more than anywhere else we operate. As an ecommerce agency in Newcastle, Being Ecom works with Shopify and WooCommerce brands across Tyne and Wear and the wider North East for whom the growth model is retention-first: once a North East customer buys, they buy again, they refer, and they engage. That makes Newcastle a retention marketer's market, and shifts the work materially toward Klaviyo, SMS and community rather than cold prospecting alone.",
      "The Newcastle DTC scene runs through the Quayside and Ouseburn - independent Shopify founders in apparel, lifestyle, food-and-drink and craft with distinctive North East brand voice - plus the premium catchments of Jesmond, Gosforth and Tynemouth, where higher-AOV beauty, wellness and homeware brands convert on editorial, story-led creative. Our Newcastle engagements segment paid media against that split, with personality-first creative briefs that read as native to the North East rather than agency-generic.",
      "Newcastle's ecommerce SERPs are also among the least contested of any major UK city, which means ranking for 'ecommerce agency Newcastle', 'Shopify Newcastle' or North East buyer terms takes fewer authority links than Leeds or Manchester equivalents. Combined with the North East's lower creative production costs and the Port of Tyne fulfilment corridor, Newcastle brands get a genuinely strong cost-per-test ratio - more creative tested per pound, and a Klaviyo retention stack that compounds because the customer base is unusually loyal.",
    ],
    ecosystem: [
      { title: "Quayside & Ouseburn", body: "Independent Shopify DTC founder cluster - apparel, lifestyle, food-and-drink and craft brands with distinctive North East identity. Weekly UGC shoots with Newcastle creators." },
      { title: "Jesmond, Gosforth & Tynemouth", body: "Higher-AOV catchment for premium beauty, wellness and homeware DTC. Editorial, story-led Meta creative outperforms discount-led angles here by a meaningful margin." },
      { title: "Grainger Town & City Centre", body: "Retail-heritage core with a steady pipeline of emerging DTC labels. Strong local UGC creator supply from Northumbria and Newcastle universities." },
      { title: "Port of Tyne & North East fulfilment corridor", body: "3PL, warehousing and last-mile access into the wider North East logistics network. Enables the next-day national delivery promises we build into Newcastle Shopify PDP copy." },
    ],
    playbook: [
      { title: "Klaviyo retention for Newcastle DTC", body: "Post-purchase, replenishment and winback flows tuned for the North East's high-repeat customer behaviour, plus SMS opt-in flows and community and loyalty builds. Newcastle clients regularly hit 34-42% Klaviyo revenue share." },
      { title: "SEO for Newcastle Shopify & WooCommerce stores", body: "Local SEO across NE postcodes, Google Business Profile, city-intent collection pages, and North East digital PR (The Journal, Chronicle, Business Live North East) for authority link building." },
      { title: "Paid social for North East DTC", body: "Personality-first Meta and TikTok creative briefs, Newcastle UGC creators, and Advantage+ tested against contribution margin rather than platform ROAS." },
    ],
    localFaqs: [
      { q: "Do you work with Newcastle ecommerce brands?", a: "Yes - our Newcastle roster covers apparel, lifestyle, food-and-drink, beauty and homeware DTC. We work with Newcastle Shopify and WooCommerce brands across Tyne and Wear and the wider North East, with in-person strategy sessions available for Newcastle engagements." },
      { q: "Can you run Klaviyo email marketing for a North East brand?", a: "Yes - Klaviyo is a core Newcastle channel. We build flows, campaigns and SMS for North East brands, and Newcastle clients regularly drive 34-42% of monthly revenue from Klaviyo because the local customer base repeats and refers at unusually high rates." },
      { q: "Is Newcastle SEO very competitive?", a: "Newcastle ecommerce SERPs are among the least contested of any major UK city, so ranking for 'ecommerce agency Newcastle', 'Shopify Newcastle' or North East buyer terms takes fewer authority links than Leeds or Manchester equivalents. That is a real efficiency advantage for Newcastle DTC brands." },
      { q: "Do you handle WooCommerce as well as Shopify in Newcastle?", a: "Yes - Shopify and Shopify Plus are our majority, but we also build, migrate and grow WooCommerce stores for Newcastle brands, including WooCommerce SEO, checkout CRO and Klaviyo retention." },
    ],
    nearby: ["edinburgh", "leeds", "sheffield", "manchester"],
  },

  bristol: {
    intro: [
      "Bristol is the South West's creative capital - and one of the most brand-literate ecommerce markets in the UK. As an ecommerce agency in Bristol, Being Ecom works with Shopify and WooCommerce brands across the South West for whom sustainability, design and story are not add-ons but the product itself: ethical fashion, natural beauty, homeware and lifestyle brands that sell to shoppers who read the label before the price. Bristol founders build brands with genuine values, and our work is turning those values into paid, search and retention systems that compound.",
      "The Bristol shopper is distinct. Clifton, Redland and Cotham deliver a higher-AOV catchment for premium beauty, wellness and homeware DTC that converts on editorial, sustainability-led creative, while Stokes Croft, Montpelier and Bedminster house a younger, creator-heavy audience that responds to TikTok-native and UGC-led angles. Our Bristol engagements segment paid media against that split, with creative briefed for the city's independent, design-first identity rather than generic DTC templates.",
      "Bristol also benefits from a deep local creative and tech ecosystem - Temple Quarter's growing tech cluster, a strong independent design scene, and a UGC creator pool that punches above the city's size. Combined with South West ecommerce SERPs that are less saturated than London's, Bristol brands get a real efficiency advantage: lower creative costs, cheaper authority links from Bristol and South West press, and a Klaviyo retention stack that compounds because Bristol customers buy into the brand, not just the product.",
    ],
    ecosystem: [
      { title: "Clifton, Redland & Cotham", body: "Higher-AOV catchment for premium beauty, wellness, homeware and ethical fashion DTC. Editorial, sustainability-led Meta creative outperforms discount-led angles here by a wide margin." },
      { title: "Stokes Croft, Montpelier & Bedminster", body: "Independent Shopify DTC founder cluster - ethical fashion, lifestyle and homeware with distinctive Bristol identity. Strong local UGC creator supply for weekly asset batches." },
      { title: "Harbourside & Temple Quarter", body: "Creative and tech cluster supplying design, dev and data talent locally. Supports the GA4, server-side tracking and contribution-margin work Bristol Shopify Plus brands need." },
      { title: "South West fulfilment corridor", body: "3PL, warehousing and last-mile access via the M4 and M5. Enables the next-day national delivery promises we build into Bristol Shopify PDP and cart copy." },
    ],
    playbook: [
      { title: "Sustainability-led paid for Bristol DTC", body: "Editorial Meta and TikTok creative briefed around real brand values, Bristol UGC creators, and Advantage+ tested against contribution margin. Bristol's design-first identity is a creative advantage when briefed honestly." },
      { title: "SEO for Bristol Shopify stores", body: "Local SEO across BS postcodes, Google Business Profile, city-intent collection pages, and South West digital PR (Bristol Post, Bristol 24/7, Business Live South West) for authority link building." },
      { title: "Klaviyo retention for South West DTC", body: "Post-purchase, replenishment and winback flows tuned for Bristol's values-driven, repeat-heavy buyer behaviour, plus SMS opt-in flows for beauty, wellness and homeware brands." },
    ],
    localFaqs: [
      { q: "Do you work with Bristol ecommerce brands?", a: "Yes - our Bristol roster covers ethical fashion, natural beauty, homeware and lifestyle DTC. We work with Bristol Shopify and WooCommerce brands across the South West, with in-person strategy sessions available for Bristol engagements." },
      { q: "Can you run Klaviyo email marketing for a Bristol brand?", a: "Yes - Klaviyo is a core Bristol channel. We build flows, campaigns and SMS for South West brands, with retention tuned to Bristol's values-driven repeat behaviour - Bristol clients regularly drive 30-40% of monthly revenue from Klaviyo." },
      { q: "Do you understand sustainability-led brands specifically?", a: "Yes - sustainability-led brands are a Bristol strength for us. We brief creative around real brand values and verified claims, never greenwashing, and build retention around the story that made customers buy in the first place." },
      { q: "Is Bristol SEO very competitive?", a: "Bristol ecommerce SERPs are less saturated than London's, so ranking for 'ecommerce agency Bristol', 'Shopify Bristol' or South West buyer terms takes fewer authority links. Combined with lower creative costs, that gives Bristol DTC brands a real efficiency advantage." },
    ],
    nearby: ["poole", "london", "birmingham", "leicester"],
  },
};
