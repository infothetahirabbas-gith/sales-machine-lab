// UK-specific search answers + compliance notes for /industries/:slug
// (GSC content work, 2026-10-15). Each `searches` entry targets a real
// query cluster from the 2026-10-14 Search Console export (impressions in the
// comment). `uk` covers the UK rules and market realities owners in that
// vertical ask about. Regulatory notes point owners to the primary source and
// are not legal advice.

export type IndustryUkGuide = {
  searches: { query: string; heading: string; body: string }[];
  uk: { title: string; body: string; source?: { label: string; href: string } }[];
  paa: { q: string; a: string }[];
};

export const INDUSTRY_UK_GUIDE: Record<string, IndustryUkGuide> = {
  "food-beverage": {
    searches: [
      // "food and drink ecommerce" 190, "ecommerce for food and beverage" 184
      { query: "food and drink ecommerce", heading: "Food and drink ecommerce in the UK", body: "Selling food and drink online is a margin game: heavy, perishable or fragile products make delivery expensive, so average order value and repeat purchase decide profitability. We focus on bundles and subscriptions that lift basket size, delivery thresholds set from real per-order costs, and Klaviyo replenishment flows timed to how quickly customers actually run out." },
      // "food and beverage shopify plus agency" 176, "food and drink shopify plus agency" 167
      { query: "food and beverage Shopify Plus agency", heading: "Shopify and Shopify Plus for food and drink brands", body: "Food brands need subscriptions (Recharge or Shopify's native subscriptions), delivery-date selection, allergen and nutrition information that's easy to find, and wholesale or trade pricing alongside retail. We build and optimise Shopify and Shopify Plus stores around those requirements." },
    ],
    uk: [
      { title: "Less healthy food and drink advertising restrictions", body: "Since 5 January 2026, paid online advertising for in-scope 'less healthy' food and drink products is restricted in the UK, alongside a 9pm TV watershed. Some smaller businesses are exempt. Check whether your products and business are in scope before planning paid social and Google campaigns - and lean on organic search, email and brand advertising where restrictions apply.", source: { label: "GOV.UK - products in scope", href: "https://www.gov.uk/government/publications/restricting-advertising-of-less-healthy-food-or-drink-on-tv-and-online-products-in-scope/restricting-advertising-of-less-healthy-food-or-drink-on-tv-and-online-products-in-scope" } },
      { title: "Allergen information online", body: "UK shoppers expect allergen information before they buy. Clear, consistent allergen and ingredient details on every product page reduce customer-service queries and returns, and help pages rank for 'gluten-free', 'vegan' and 'nut-free' searches." },
      { title: "Chilled and fragile delivery", body: "Temperature-controlled and fragile deliveries cost more and fail more often. Showing delivery days, cut-off times and packaging clearly on product pages is one of the most effective conversion fixes for food brands." },
    ],
    paa: [
      { q: "Can I still run Facebook ads for food products in the UK?", a: "It depends on whether your products are classed as 'less healthy' under the UK rules that took effect on 5 January 2026, and on the size of your business. Many food and drink products are not in scope. Check the GOV.UK guidance on products in scope, and take legal advice if unsure." },
      { q: "How do food and drink brands increase online order value?", a: "Bundles, subscriptions, free-delivery thresholds and post-purchase upsells. Because delivery is expensive for food, raising basket size usually matters more than increasing traffic." },
    ],
  },

  "health-wellness": {
    searches: [
      // "wellness ecommerce agency" 125 (pos 4.6), "wellness ecommerce" 162, "health and wellness ecommerce" 150
      { query: "wellness ecommerce agency", heading: "A wellness ecommerce agency that knows the rules", body: "Health and wellness brands grow on trust: clear ingredient information, credible reviews and claims that stay within UK advertising rules. We build paid, SEO and email programmes that sell without making claims that get ads rejected or attract complaints." },
      // "supplement ecommerce agency" 107, "health ecommerce" 96
      { query: "supplement ecommerce agency", heading: "Ecommerce growth for UK supplement brands", body: "Supplements are a subscription-friendly category with high repeat purchase - if the first experience is good. We focus on subscribe-and-save offers, replenishment emails timed to pack size, and education content that ranks for the questions shoppers ask about ingredients." },
    ],
    uk: [
      { title: "Health claims must be authorised", body: "In the UK, health claims on foods and supplements must appear on the Great Britain nutrition and health claims register and follow its wording conditions. The ASA regularly rules against ads that overstate benefits - this affects product pages, ads and influencer content.", source: { label: "GOV.UK - Great Britain nutrition and health claims register", href: "https://www.gov.uk/government/publications/great-britain-nutrition-and-health-claims-nhc-register" } },
      { title: "Platform policies on health ads", body: "Meta and Google restrict before-and-after imagery, weight-loss claims and some ingredients. Creative needs to be built with those policies in mind to avoid rejected ads and restricted accounts." },
    ],
    paa: [
      { q: "What health claims can I make about supplements in the UK?", a: "Only authorised claims from the Great Britain nutrition and health claims register, used with their conditions of use. Take regulatory advice for anything borderline." },
      { q: "Why do my supplement ads keep getting rejected?", a: "Usually because of implied health claims, before-and-after visuals or personal-attribute targeting language. Rewriting creative around authorised claims and lifestyle benefits typically resolves it." },
    ],
  },

  "baby-kids": {
    searches: [
      { query: "baby and kids ecommerce", heading: "Ecommerce growth for UK baby and kids brands", body: "Parents research carefully, compare safety information and rely on reviews from other parents. We build product pages around safety, materials and age suitability, collect reviews with photos, and plan campaigns around the life stages that drive repeat purchase - from newborn to toddler to school age." },
    ],
    uk: [
      { title: "Toy and product safety marking", body: "Toys and many children's products sold in Great Britain need UKCA or (in many cases) CE marking and must meet the Toys (Safety) Regulations 2011. Showing safety standards and age warnings clearly on product pages builds trust and reduces returns.", source: { label: "GOV.UK - toy safety guidance", href: "https://www.gov.uk/government/publications/toys-safety-regulations-2011/toys-safety-regulations-2011-great-britain" } },
      { title: "Advertising to and about children", body: "CAP Code rules restrict how ads can target children and use children in creative. Paid social campaigns for kids' brands should target parents and follow those rules." },
    ],
    paa: [
      { q: "Do I need UKCA marking to sell toys online in the UK?", a: "Toys placed on the GB market generally need UKCA or CE marking and must meet the Toys (Safety) Regulations 2011. Check the GOV.UK guidance for your specific products." },
      { q: "How do baby brands get repeat customers?", a: "By following the child's life stage - email and SMS flows timed to age milestones, bundles for the next stage, and loyalty rewards for parents." },
    ],
  },

  "home-garden": {
    searches: [
      // "home and garden digital marketing services" 177, "home and garden ecommerce" 169 (pos 22.6)
      { query: "home and garden ecommerce", heading: "Home and garden ecommerce marketing", body: "Home and garden sales are seasonal - spring and early summer for garden, autumn and Christmas for home. We plan Google Shopping, Meta and email around those peaks, build collection pages for seasonal search demand, and use lifestyle creative that shows products in real UK homes and gardens." },
      // "home & garden ecommerce shipping" 133
      { query: "home and garden ecommerce shipping", heading: "Shipping bulky home and garden products", body: "Large, heavy or awkwardly shaped items make delivery a big cost and a big reason for abandoned checkouts. Clear two-person or pallet delivery options, delivery-date estimates and transparent pricing on the product page reduce surprises at checkout." },
    ],
    uk: [
      { title: "UK seasonality", body: "Garden demand concentrates around Easter, spring bank holidays and early summer, with weather-led spikes. Budgets and stock need to move quickly when the weather turns." },
    ],
    paa: [
      { q: "When should garden brands advertise in the UK?", a: "Build audiences from February, scale around Easter and the May bank holidays, and keep budgets flexible enough to react to warm weekends." },
    ],
  },

  "fashion-apparel": {
    searches: [
      // "fashion ecommerce agency" 379, "fashion ecommerce" 120
      { query: "fashion ecommerce agency", heading: "A fashion ecommerce agency focused on profit, not just sales", body: "Fashion has high return rates and constant discount pressure. We grow fashion brands by improving size guidance and product imagery to reduce returns, building creative for each drop, and using email and SMS to sell full-price to loyal customers." },
    ],
    uk: [
      { title: "Returns and consumer rights", body: "UK online shoppers generally have 14 days to cancel under the Consumer Contracts Regulations. A clear, fair returns policy shown on product pages increases conversion - while better size guidance reduces how often it's used.", source: { label: "GOV.UK - accepting returns and giving refunds", href: "https://www.gov.uk/accepting-returns-and-giving-refunds" } },
    ],
    paa: [
      { q: "How can fashion brands reduce online returns?", a: "Accurate size guides, fit notes from reviews, model measurements, and multiple product images and videos. These reduce wrong-size orders without making returns harder." },
    ],
  },

  "jewellery-watches": {
    searches: [
      // "jewellery ecommerce agency" 269 (pos 25.9)
      { query: "jewellery ecommerce agency", heading: "Jewellery ecommerce marketing in the UK", body: "Jewellery is a high-consideration, high-trust purchase. We grow jewellery brands with detailed product photography and video, Google Shopping feeds, SEO for engagement, wedding and gift searches, reviews, and a checkout that reassures buyers about payment, delivery and returns." },
    ],
    uk: [
      { title: "Hallmarking", body: "In the UK, precious-metal items above certain weights must be hallmarked by an Assay Office. Explaining hallmarks on product pages is a strong trust signal for online buyers.", source: { label: "GOV.UK - hallmarking guidance", href: "https://www.gov.uk/guidance/hallmarking-how-businesses-can-comply-with-the-law" } },
    ],
    paa: [
      { q: "How do jewellery brands build trust online?", a: "Hallmarking information, detailed photos and video, verified reviews, insured delivery and clear returns. Each one reduces the risk buyers feel when spending more online." },
    ],
  },

  "sports-fitness": {
    searches: [
      // "fitness ecommerce agency" 114 (pos 23.6)
      { query: "fitness ecommerce agency", heading: "A fitness ecommerce agency for UK brands", body: "Fitness brands grow through community and creators. We run creator-led TikTok and Meta campaigns, product-in-use video, and email programmes built around training goals and seasonal moments such as January and spring race season." },
    ],
    uk: [
      { title: "UK fitness seasonality", body: "January resolutions, spring running events and summer drive demand. Planning creative and stock around those peaks matters more than year-round evenly spread spend." },
    ],
    paa: [
      { q: "When do fitness brands sell most online in the UK?", a: "January is typically the biggest month, with further peaks in spring and before summer. Black Friday matters for equipment." },
    ],
  },

  "furniture-interiors": {
    searches: [
      // "ecommerce agency furniture" 110
      { query: "ecommerce agency furniture", heading: "Ecommerce marketing for furniture and interiors brands", body: "Furniture buyers take weeks to decide and often research on mobile before buying on desktop. We use Google Shopping, Pinterest and Meta for discovery, retargeting and email to keep the brand in mind, and product pages with dimensions, materials, delivery and room photography to close the sale." },
    ],
    uk: [
      { title: "Delivery and assembly", body: "Two-person delivery, lead times and assembly options are key buying questions. Showing them clearly on product pages reduces abandoned checkouts and customer-service calls." },
    ],
    paa: [
      { q: "How long does it take a customer to buy furniture online?", a: "Often several weeks for larger items. That's why retargeting, email and saved-basket reminders matter so much for furniture brands." },
    ],
  },
};

export function industryUkGuideFor(slug: string): IndustryUkGuide | undefined {
  return INDUSTRY_UK_GUIDE[slug];
}
