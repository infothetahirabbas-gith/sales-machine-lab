// Unique long-form editorial content for the six index / hub pages that
// previously tripped the "low word count" flag: /blog, /compare, /cookies,
// /hub, /industries, /locations.
//
// Each entry is written for one page only - no shared paragraphs, no
// recycled framing - and is structured for featured snippets, Google AI
// Overviews, Perplexity/ChatGPT extraction and voice search.

import type { IndexEditorial } from "@/components/site/EditorialBlock";
import type { FAQ } from "@/lib/seo";

/* ------------------------------------------------------------------ */
/* /blog                                                               */
/* ------------------------------------------------------------------ */

export const BLOG_EDITORIAL: IndexEditorial = {
  quickAnswer:
    "The BeingEcom blog is a UK ecommerce marketing library covering Shopify SEO, WooCommerce SEO, ecommerce PPC, CRO and retention. Every guide is written by senior operators who run the same work for client stores, so each article ends with steps you can apply to your own store this week.",
  voiceAnswer:
    "It is BeingEcom's free library of UK ecommerce growth guides on Shopify SEO, paid ads, conversion rate optimisation and email retention.",
  keyTakeaways: [
    "Guides are grouped into four clusters: ecommerce SEO, paid media, CRO and email or retention.",
    "Everything is written for UK trading conditions - GBP pricing, VAT, UK delivery expectations and UK search behaviour.",
    "Each article pairs a playbook with the numbers we would expect a £1m-£15m store to hit.",
    "Start with the pillar guide in a cluster, then work down into the specific fixes.",
    "No gated PDFs. The full method is on the page.",
  ],
  sections: [
    {
      id: "what-you-get",
      h2: "What this ecommerce blog actually gives you",
      nodes: [
        {
          type: "p",
          text: "Most agency blogs exist to catch a keyword. This one exists because our team kept writing the same internal documents twice - once for a client, once for the next client with the same problem. Publishing them was cheaper than repeating ourselves.",
        },
        {
          type: "p",
          text: "So the guides read like handover notes rather than thought leadership. You get the diagnosis, the fix, the order to do it in, and an honest note on what it will not solve. If a tactic only works above a certain revenue level, we say so.",
        },
        {
          type: "list",
          items: [
            "Technical detail you can hand to a developer without translation.",
            "Templates - flow structures, feed rules, PDP layouts, test briefs.",
            "Benchmarks drawn from UK ecommerce accounts rather than global averages.",
            "Clear stop signals: when to abandon a channel instead of doubling down.",
          ],
        },
      ],
    },
    {
      id: "clusters",
      h2: "The four content clusters, explained",
      nodes: [
        {
          type: "h3",
          text: "1. Ecommerce SEO",
        },
        {
          type: "p",
          text: "Covers technical SEO, collection and product page optimisation, duplicate content on Shopify, faceted navigation, international targeting and local SEO for brands with showrooms. This is the cluster to read if organic traffic is flat while your catalogue keeps growing.",
        },
        { type: "h3", text: "2. Paid media" },
        {
          type: "p",
          text: "Meta creative testing, Google Shopping feed structure, TikTok Ads for beauty and fashion, attribution after iOS privacy changes, and why blended MER beats platform-reported ROAS as a scaling metric.",
        },
        { type: "h3", text: "3. Conversion rate optimisation" },
        {
          type: "p",
          text: "Product page tests, cart and checkout recovery, mobile drop-off, site search and trust signals. Conversion work is usually the cheapest revenue in the building because it improves every channel at once.",
        },
        { type: "h3", text: "4. Email, SMS and retention" },
        {
          type: "p",
          text: "Klaviyo flow architecture, welcome and abandoned cart sequences, post-purchase journeys, winback campaigns and UK-compliant SMS. Retention is what makes paid acquisition affordable rather than a treadmill.",
        },
      ],
    },
    {
      id: "reading-order",
      h2: "A sensible reading order by revenue stage",
      nodes: [
        {
          type: "table",
          head: ["Stage", "Read first", "Why"],
          rows: [
            ["Under £250k/yr", "CRO and email flows", "Traffic is not the constraint yet - conversion and repeat purchase are."],
            ["£250k-£1m", "Shopify SEO plus Meta creative testing", "You need a second acquisition channel before paid costs bite."],
            ["£1m-£5m", "Technical SEO, Google Shopping, MER", "Complexity and catalogue size start creating waste."],
            ["£5m-£15m", "International SEO, retention modelling", "Growth now comes from margin and new markets, not more spend."],
          ],
        },
        {
          type: "p",
          text: "If you are not sure which stage applies, our free ecommerce growth audit will place you and tell you which cluster matters most for the next two quarters.",
        },
      ],
    },
    {
      id: "how-we-write",
      h2: "How these guides are researched and reviewed",
      nodes: [
        {
          type: "ol",
          items: [
            "A problem is logged from live client work - not from a keyword tool.",
            "The operator who solved it drafts the method, including what failed.",
            "Numbers are checked against the accounts we run, and anything we cannot evidence is removed or labelled as an estimate.",
            "Tahir Abbas reviews for accuracy before publication.",
            "Guides are revisited when a platform changes - Shopify checkout releases, Google core updates, Klaviyo feature shifts.",
          ],
        },
        {
          type: "quote",
          text: "If a tactic only worked once, on one store, in one quarter, it is an anecdote - not a playbook. We publish the second kind.",
          cite: "BeingEcom editorial standard",
        },
      ],
    },
    {
      id: "ai-search",
      h2: "Why we write for AI search as well as Google",
      nodes: [
        {
          type: "p",
          text: "UK shoppers and UK founders now research through AI Overviews, ChatGPT, Gemini, Copilot and Perplexity as often as through blue links. Those systems reward pages that answer a question plainly, define terms, show structure and cite specifics.",
        },
        {
          type: "list",
          items: [
            "Every guide opens with a short, self-contained answer.",
            "Definitions come before opinion, so a model can quote us accurately.",
            "Tables and numbered steps make the method machine-readable.",
            "Article, FAQ and Breadcrumb structured data ships on every post.",
          ],
        },
        {
          type: "p",
          text: "That approach is the same one we deploy for clients through our answer engine optimisation work - the blog is simply the public proof it works.",
        },
      ],
    },
    {
      id: "expert-tips",
      h2: "Five expert tips before you start applying anything",
      nodes: [
        {
          type: "ol",
          items: [
            "Fix measurement first. Acting on broken GA4 or Meta data costs more than doing nothing.",
            "Change one system at a time. Simultaneous SEO, ads and CRO changes make attribution impossible.",
            "Give SEO two quarters. Nothing in the SEO cluster pays back inside six weeks.",
            "Protect margin, not revenue. A 4x ROAS on a 22% margin product is a slow loss.",
            "Write down the expected result before the test. It stops you rationalising a flat outcome.",
          ],
        },
      ],
    },
  ],
  linkGroups: [
    {
      title: "Start here",
      links: [
        { label: "Free ecommerce growth audit", href: "/audit" },
        { label: "The BeingEcom Growth System methodology", href: "/methodology" },
        { label: "Ecommerce knowledge hub", href: "/hub" },
        { label: "Ecommerce calculators and tools", href: "/tools" },
        { label: "Ecommerce glossary", href: "/glossary" },
      ],
    },
    {
      title: "Services referenced in the guides",
      links: [
        { label: "Ecommerce SEO services", href: "/services/seo" },
        { label: "Technical SEO", href: "/services/seo/technical" },
        { label: "Local SEO", href: "/services/seo/local" },
        { label: "Conversion rate optimisation", href: "/services/cro" },
        { label: "Email and SMS marketing", href: "/services/email-sms" },
        { label: "Performance marketing", href: "/services/performance-marketing" },
        { label: "Google Ads management", href: "/services/performance-marketing/google-ads" },
        { label: "Meta and Facebook Ads", href: "/services/performance-marketing/facebook-ads" },
        { label: "TikTok Ads", href: "/services/performance-marketing/tiktok-ads" },
        { label: "Ecommerce analytics", href: "/services/analytics" },
      ],
    },
    {
      title: "Platform builds",
      links: [
        { label: "Shopify development", href: "/services/store-development/shopify" },
        { label: "WooCommerce development", href: "/services/store-development/woocommerce" },
        { label: "Shopify vs WooCommerce comparison", href: "/compare" },
        { label: "Shopify SEO packages", href: "/shopify-seo-packages" },
      ],
    },
    {
      title: "Proof and pricing",
      links: [
        { label: "Ecommerce case studies", href: "/case-studies" },
        { label: "Pricing", href: "/pricing" },
        { label: "How much ecommerce SEO costs", href: "/how-much-does-ecommerce-seo-cost" },
        { label: "How long ecommerce SEO takes", href: "/how-long-does-ecommerce-seo-take" },
        { label: "About BeingEcom", href: "/about" },
        { label: "Talk to the team", href: "/contact" },
      ],
    },
  ],
};

export const BLOG_FAQS: FAQ[] = [
  {
    q: "How often is the BeingEcom ecommerce blog updated?",
    a: "We publish or substantially update guides every month, and we revisit existing articles whenever Shopify, Google, Meta or Klaviyo ship a change that alters the advice. Dates on each post reflect the last meaningful revision, not a cosmetic edit.",
  },
  {
    q: "Who writes the articles?",
    a: "Senior operators on our delivery team - the same people running client SEO, paid media, CRO and retention programmes. Founder Tahir Abbas reviews every guide for accuracy before it goes live.",
  },
  {
    q: "Is the advice specific to UK ecommerce brands?",
    a: "Yes. Benchmarks, pricing, delivery expectations, VAT handling and search behaviour are all written for UK trading. Most of the technical work transfers internationally, but the numbers are UK-first.",
  },
  {
    q: "Which guide should a Shopify store read first?",
    a: "Start with the UK ecommerce SEO playbook for Shopify, then the technical SEO checklist for Shopify Plus. Together they cover crawl waste, duplicate collection URLs and the on-page template that lifts collection and product rankings.",
  },
  {
    q: "Do you cover WooCommerce as well as Shopify?",
    a: "We do. WooCommerce guides focus on performance, plugin bloat, hosting decisions and the point at which migrating to Shopify Plus becomes cheaper than maintaining the stack.",
  },
  {
    q: "Can I use these playbooks without hiring an agency?",
    a: "Yes, and plenty of teams do. The guides are complete methods, not teasers. You will need in-house development time for technical SEO work and a designer for creative testing.",
  },
  {
    q: "Do you accept guest posts or link insertions?",
    a: "No. We do not publish guest content or sell links. Everything here comes from our own delivery work, which is what keeps the advice reliable.",
  },
  {
    q: "How does the blog relate to your services?",
    a: "Directly. Each cluster maps to a service we deliver - SEO, paid media, CRO and retention - so you can read the method, then decide whether to run it internally or bring us in.",
  },
  {
    q: "Do you publish benchmarks I can compare my store against?",
    a: "Yes. Conversion, MER, email revenue share and repeat-purchase benchmarks appear across the CRO and retention clusters, and our benchmarks section collects them by vertical.",
  },
];

/* ------------------------------------------------------------------ */
/* /compare                                                            */
/* ------------------------------------------------------------------ */

export const COMPARE_EDITORIAL: IndexEditorial = {
  quickAnswer:
    "This hub compares the platforms, channels, tools and hiring models UK ecommerce brands choose between - Shopify vs WooCommerce, Meta vs Google Ads, Klaviyo vs Mailchimp, agency vs freelancer vs in-house. Each comparison ends with a verdict and the exact conditions where each option is the right call.",
  voiceAnswer:
    "It is BeingEcom's set of side-by-side comparisons that help UK ecommerce brands pick the right platform, ad channel, tool or hiring model.",
  keyTakeaways: [
    "Comparisons are written by a team that ships on both sides of each choice, so neither option is strawmanned.",
    "Every verdict is conditional: revenue stage, margin, catalogue size and in-house skill decide the winner.",
    "Total cost of ownership includes developer time and app subscriptions, not just licence fees.",
    "Switching cost is usually the deciding factor for stores above £2m turnover.",
    "If two options score within about 10% on your criteria, pick the one your team already knows.",
  ],
  sections: [
    {
      id: "how-to-compare",
      h2: "How to compare ecommerce options without wasting a quarter",
      nodes: [
        {
          type: "p",
          text: "Comparison paralysis is expensive. Teams spend six weeks debating Shopify against WooCommerce while the actual constraint - a checkout that loses 68% of carts - stays untouched. A good comparison should take days, not months.",
        },
        {
          type: "ol",
          items: [
            "Write down the decision you are actually making and the deadline for it.",
            "List your three hard constraints: budget, in-house skill, and the date you need it live.",
            "Score each option only against those constraints - ignore features you will never use.",
            "Price the switching cost, including staff retraining and lost trading during migration.",
            "Choose, then commit for at least two quarters before revisiting.",
          ],
        },
      ],
    },
    {
      id: "platform-choices",
      h2: "Platform choices: Shopify, Shopify Plus and WooCommerce",
      nodes: [
        {
          type: "p",
          text: "Platform is the most consequential decision because it constrains every later one - theme development, app costs, checkout control, international pricing and SEO ceiling.",
        },
        {
          type: "table",
          head: ["Criterion", "Shopify / Plus", "WooCommerce"],
          rows: [
            ["Setup speed", "Fast - trading in weeks", "Slower - hosting and stack decisions first"],
            ["Ongoing maintenance", "Low, handled by the platform", "Ongoing developer or agency retainer"],
            ["Checkout control", "Limited below Plus", "Fully customisable"],
            ["True cost at £3m revenue", "Licence plus apps, predictable", "Hosting, plugins, dev time - variable"],
            ["SEO ceiling", "High with disciplined URL and canonical work", "High, but performance depends on hosting"],
          ],
        },
        {
          type: "p",
          text: "Our honest summary: WooCommerce rewards teams with in-house development capacity and unusual requirements. Shopify rewards teams who want to spend their time on merchandising and marketing. Read the full Shopify vs WooCommerce breakdown before committing.",
        },
      ],
    },
    {
      id: "channel-choices",
      h2: "Channel choices: where the next £10,000 of spend should go",
      nodes: [
        {
          type: "p",
          text: "The Meta versus Google debate is usually framed wrongly. They serve different jobs: Google harvests existing demand, Meta and TikTok create it. Most UK DTC brands need both, in a ratio set by how well known the product category already is.",
        },
        {
          type: "list",
          items: [
            "Established category with clear search volume - weight towards Google Shopping and search.",
            "New or visually driven product - weight towards Meta and TikTok creative volume.",
            "Considered purchase over £150 - expect a longer window and measure blended MER, not last click.",
            "Tight margin under 40% - fix conversion and retention before increasing media spend.",
          ],
        },
      ],
    },
    {
      id: "tool-choices",
      h2: "Tool choices: email, reviews, analytics and search",
      nodes: [
        {
          type: "p",
          text: "Tool comparisons are the easiest to over-think. The switching cost of an email platform is measured in weeks of flow rebuilding, so the winner is rarely the one with the longest feature list.",
        },
        { type: "h3", text: "What actually matters" },
        {
          type: "list",
          items: [
            "Native Shopify or WooCommerce data sync, including product and browse events.",
            "Segmentation depth - can you build a lapsed-VIP segment without a developer?",
            "Deliverability tooling and sending reputation controls.",
            "Cost curve as your list grows, not the entry price.",
            "Whether your agency or in-house team already knows the platform well.",
          ],
        },
      ],
    },
    {
      id: "hiring-models",
      h2: "Hiring models: agency, freelancer or in-house",
      nodes: [
        {
          type: "table",
          head: ["Model", "Best when", "Main risk"],
          rows: [
            ["Freelancer", "One narrow, well-defined skill gap", "Single point of failure, limited breadth"],
            ["Agency", "You need several disciplines coordinated", "Junior delivery hidden behind senior sales"],
            ["In-house", "Above roughly £8m with predictable workload", "Slow to hire, expensive to replace"],
            ["Hybrid", "In-house owns brand, agency owns performance", "Needs clear ownership lines to work"],
          ],
        },
        {
          type: "p",
          text: "The agency versus in-house question deserves its own maths, which we have set out in full - including the point where hiring becomes cheaper than retaining.",
        },
      ],
    },
    {
      id: "mistakes",
      h2: "Five comparison mistakes we see every month",
      nodes: [
        {
          type: "ol",
          items: [
            "Comparing sticker prices while ignoring developer hours.",
            "Choosing for a scale you are two years away from reaching.",
            "Trusting vendor-published comparison pages as neutral research.",
            "Switching platforms to solve a marketing problem.",
            "Migrating without a 301 redirect map, then losing organic revenue for two quarters.",
          ],
        },
        {
          type: "p",
          text: "That last one is the costliest. If you are replatforming, read our migration SEO guidance before a single URL changes.",
        },
      ],
    },
  ],
  linkGroups: [
    {
      title: "Decide with help",
      links: [
        { label: "Book a free growth audit", href: "/audit" },
        { label: "Speak to a senior operator", href: "/contact" },
        { label: "Who we work best with", href: "/who-we-help" },
        { label: "Why brands choose BeingEcom", href: "/why-beingecom" },
        { label: "Our pricing tiers", href: "/pricing" },
      ],
    },
    {
      title: "Platform and build",
      links: [
        { label: "Shopify development services", href: "/services/store-development/shopify" },
        { label: "WooCommerce development services", href: "/services/store-development/woocommerce" },
        { label: "Store development overview", href: "/services/store-development" },
        { label: "Migration SEO", href: "/ecommerce-migration-seo" },
        { label: "Enterprise ecommerce SEO", href: "/enterprise-ecommerce-seo" },
      ],
    },
    {
      title: "Channels",
      links: [
        { label: "Performance marketing", href: "/services/performance-marketing" },
        { label: "Google Ads", href: "/services/performance-marketing/google-ads" },
        { label: "Facebook and Instagram Ads", href: "/services/performance-marketing/facebook-ads" },
        { label: "TikTok Ads", href: "/services/performance-marketing/tiktok-ads" },
        { label: "Ecommerce SEO", href: "/services/seo" },
        { label: "Email and SMS", href: "/services/email-sms" },
        { label: "Conversion rate optimisation", href: "/services/cro" },
      ],
    },
    {
      title: "Research further",
      links: [
        { label: "Knowledge hub", href: "/hub" },
        { label: "Ecommerce blog", href: "/blog" },
        { label: "Benchmarks", href: "/benchmarks" },
        { label: "Case studies", href: "/case-studies" },
        { label: "Free calculators", href: "/tools" },
        { label: "Agency vs in-house SEO", href: "/agency-vs-inhouse-seo" },
      ],
    },
  ],
};

export const COMPARE_FAQS: FAQ[] = [
  {
    q: "Are these comparisons biased towards Shopify?",
    a: "No. We build and maintain both Shopify and WooCommerce stores, so we are paid either way. Where WooCommerce is the better fit - custom checkout logic, in-house developers, unusual product configuration - the verdicts say so plainly.",
  },
  {
    q: "How do you decide the verdict in each comparison?",
    a: "We score against total cost of ownership, in-house skill required, speed to launch, SEO and performance ceiling, and switching cost. The verdict is always conditional on revenue stage and team capability rather than a single winner.",
  },
  {
    q: "Should a £1m UK store move from WooCommerce to Shopify Plus?",
    a: "Usually only when maintenance cost, page speed or checkout limitations are demonstrably costing revenue. If your WooCommerce store is fast and stable, the migration risk rarely pays back at that stage.",
  },
  {
    q: "Meta Ads or Google Ads first for a new DTC brand?",
    a: "If people already search for your product category, start with Google Shopping because you are harvesting demand. If your product needs demonstrating, start with Meta and invest in creative volume.",
  },
  {
    q: "Is Klaviyo worth the price over cheaper email tools?",
    a: "For ecommerce, generally yes above roughly 5,000 contacts, because the segmentation and Shopify event data drive flow revenue that cheaper tools cannot replicate. Below that, the price gap is harder to justify.",
  },
  {
    q: "When does hiring in-house beat using an agency?",
    a: "Typically past around £8m in revenue with predictable, continuous workload across a single discipline. Below that, you rarely get senior specialist coverage across SEO, paid, CRO and retention for the same cost.",
  },
  {
    q: "Do you update comparisons when platforms change?",
    a: "Yes. Pricing, feature and checkout changes trigger a review, and each comparison carries the reasoning behind the verdict so you can re-run the logic against your own numbers.",
  },
  {
    q: "Can you help us run the comparison for our specific store?",
    a: "That is what the free audit is for. We look at your stack, traffic, margin and team, then tell you which choice we would make and why - with no obligation to work with us.",
  },
];

/* ------------------------------------------------------------------ */
/* /cookies                                                            */
/* ------------------------------------------------------------------ */

export const COOKIES_EDITORIAL: IndexEditorial = {
  quickAnswer:
    "BeingEcom uses two categories of cookie on beingecom.com: strictly necessary cookies that keep the site secure and working, and optional analytics cookies set only after you consent. We do not run advertising or cross-site tracking cookies, and you can change or withdraw consent at any time.",
  voiceAnswer:
    "BeingEcom only uses essential cookies plus optional analytics cookies, and you can withdraw consent at any time from the cookie policy page.",
  keyTakeaways: [
    "No advertising cookies and no cross-site tracking on this website.",
    "Analytics cookies are set only after you actively accept them.",
    "Consent is stored locally in your browser and can be reset in one click.",
    "We comply with UK GDPR and the Privacy and Electronic Communications Regulations (PECR).",
    "Declining optional cookies does not reduce access to any part of the site.",
  ],
  sections: [
    {
      id: "what-cookies-are",
      h2: "What cookies are, in plain English",
      nodes: [
        {
          type: "p",
          text: "A cookie is a small text file a website asks your browser to store. It lets the site remember something between page loads - that you are logged in, that a form was part-completed, or that you already answered the consent banner.",
        },
        {
          type: "p",
          text: "Similar technologies do the same job by different means. Local storage keeps data in the browser without sending it back with each request; pixels are tiny image requests that record that a page was viewed. Where we use those, we treat them under the same rules as cookies.",
        },
      ],
    },
    {
      id: "categories",
      h2: "The cookie categories we use",
      nodes: [
        {
          type: "table",
          head: ["Category", "Purpose", "Consent needed", "Typical lifetime"],
          rows: [
            ["Strictly necessary", "Security, session integrity, load balancing, remembering your cookie choice", "No - exempt under PECR", "Session to 12 months"],
            ["Analytics (optional)", "Aggregated page views and journeys via Google Analytics 4 with IP anonymisation", "Yes", "Up to 14 months"],
            ["Advertising", "Not used on this website", "N/A", "N/A"],
            ["Cross-site tracking", "Not used on this website", "N/A", "N/A"],
          ],
        },
        {
          type: "p",
          text: "If that table ever changes - for example, if we add a support chat widget that sets its own cookie - this page is updated before the technology goes live.",
        },
      ],
    },
    {
      id: "legal-basis",
      h2: "Our legal basis under UK GDPR and PECR",
      nodes: [
        {
          type: "p",
          text: "Two pieces of UK law apply. PECR governs storing or reading information on your device, and requires consent for anything that is not strictly necessary. UK GDPR governs what we then do with any personal data.",
        },
        {
          type: "list",
          items: [
            "Strictly necessary cookies: relied upon under the PECR exemption, because the site cannot function without them.",
            "Analytics cookies: set only on consent, which is the lawful basis for the related processing.",
            "Consent is opt-in, granular and as easy to withdraw as it was to give.",
            "We do not use pre-ticked boxes, cookie walls, or implied consent from continued scrolling.",
          ],
        },
      ],
    },
    {
      id: "manage",
      h2: "How to manage, change or withdraw your consent",
      nodes: [
        {
          type: "ol",
          items: [
            "Use the reset button on this page to clear your stored choice and see the banner again.",
            "Clear cookies and site data for beingecom.com in your browser settings.",
            "Block third-party cookies globally in Chrome, Safari, Firefox or Edge.",
            "Use private or incognito browsing, which discards cookies when the window closes.",
          ],
        },
        {
          type: "p",
          text: "Blocking strictly necessary cookies may break form submissions or security checks. Blocking analytics cookies changes nothing about how the site behaves for you.",
        },
      ],
    },
    {
      id: "data-sharing",
      h2: "Who receives data from these cookies",
      nodes: [
        {
          type: "p",
          text: "Only Google, as our analytics processor, and only in aggregated, IP-anonymised form once you have consented. We do not sell data, do not build advertising audiences from site visitors, and do not share visitor-level data with third parties.",
        },
        {
          type: "list",
          items: [
            "Retention: analytics data is retained for a maximum of 14 months.",
            "Access: limited to named members of our team who need it for reporting.",
            "Transfers: handled under Google's standard contractual clauses.",
          ],
        },
      ],
    },
    {
      id: "clients",
      h2: "A note for ecommerce brands reading this as a template",
      nodes: [
        {
          type: "p",
          text: "We are asked about this often, because consent design directly affects analytics quality. A poorly built banner destroys your data before your marketing team ever sees it.",
        },
        {
          type: "list",
          items: [
            "Give equal visual weight to accept and reject. Dark patterns invite complaints and skew data.",
            "Fire tags only after consent, and use consent mode so modelling can fill some of the gap.",
            "Log consent events so you can evidence compliance later.",
            "Pair consent with server-side tracking to keep measurement usable without breaking the rules.",
          ],
        },
        {
          type: "p",
          text: "This is part of the analytics and tracking work we run for clients. If your GA4 numbers stopped making sense after a consent banner went live, that is a fixable problem.",
        },
      ],
    },
    {
      id: "changes",
      h2: "Changes to this policy and how to contact us",
      nodes: [
        {
          type: "p",
          text: "We review this policy at least annually and whenever we change our technology stack. Material changes reset the consent banner so you can review your choice.",
        },
        {
          type: "p",
          text: "Questions about cookies, data access requests or complaints can be sent to info@beingecom.com. You also have the right to complain to the Information Commissioner's Office.",
        },
      ],
    },
  ],
  linkGroups: [
    {
      title: "Other policies",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "GDPR compliance", href: "/gdpr" },
        { label: "Terms of service", href: "/terms" },
        { label: "Accessibility statement", href: "/accessibility" },
        { label: "Disclaimer", href: "/disclaimer" },
      ],
    },
    {
      title: "Tracking done properly",
      links: [
        { label: "Ecommerce analytics services", href: "/services/analytics" },
        { label: "Ecommerce analytics guide", href: "/ecommerce-analytics" },
        { label: "Conversion rate optimisation", href: "/services/cro" },
        { label: "Performance marketing", href: "/services/performance-marketing" },
        { label: "Knowledge hub", href: "/hub" },
      ],
    },
    {
      title: "About BeingEcom",
      links: [
        { label: "About the agency", href: "/about" },
        { label: "Our methodology", href: "/methodology" },
        { label: "Contact the team", href: "/contact" },
        { label: "Case studies", href: "/case-studies" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
  ],
};

export const COOKIES_FAQS: FAQ[] = [
  {
    q: "Does BeingEcom use advertising or retargeting cookies?",
    a: "No. beingecom.com sets no advertising, remarketing or cross-site tracking cookies. The only optional cookies are Google Analytics 4 with IP anonymisation, and they are set only after you consent.",
  },
  {
    q: "How do I withdraw cookie consent?",
    a: "Use the reset button on this page to clear your stored preference and bring the banner back, or clear site data for beingecom.com in your browser settings. Withdrawal is as easy as giving consent.",
  },
  {
    q: "Will rejecting cookies limit what I can see on the site?",
    a: "No. Every page, guide, calculator and form works exactly the same whether you accept analytics cookies or not. We do not use cookie walls.",
  },
  {
    q: "Which cookies are strictly necessary?",
    a: "Session, security and load-balancing cookies, plus the record of your cookie choice itself. These are exempt from consent under PECR because the site cannot operate securely without them.",
  },
  {
    q: "How long is analytics data kept?",
    a: "A maximum of 14 months in Google Analytics 4, after which it is deleted automatically. Aggregated reporting may be retained longer, but it contains no visitor-level data.",
  },
  {
    q: "Is BeingEcom compliant with UK GDPR and PECR?",
    a: "Yes. We use opt-in consent with equal-weight accept and reject options, set no non-essential cookies before consent, and allow withdrawal at any time.",
  },
  {
    q: "Do you share cookie data with third parties?",
    a: "Only with Google as our analytics processor. We do not sell data or share visitor-level information with advertisers, data brokers or partners.",
  },
  {
    q: "Can you help our store set up a compliant consent banner?",
    a: "Yes - it is part of our analytics and tracking work. We implement consent mode, server-side tagging and consent logging so your measurement survives compliance rather than being destroyed by it.",
  },
];

/* ------------------------------------------------------------------ */
/* /hub                                                                */
/* ------------------------------------------------------------------ */

export const HUB_EDITORIAL: IndexEditorial = {
  quickAnswer:
    "The BeingEcom Knowledge Hub is a free UK ecommerce growth library organised into eleven pillar hubs - Shopify, WooCommerce, ecommerce SEO, paid media, CRO, email and SMS, analytics, strategy, operations, retention and AI automation. Each hub gathers the guides, benchmarks and templates for one discipline in the order you should apply them.",
  voiceAnswer:
    "It is BeingEcom's free knowledge hub with eleven pillar guides covering every discipline that drives ecommerce revenue in the UK.",
  keyTakeaways: [
    "Eleven pillar hubs, each covering one discipline end to end.",
    "Hubs are sequenced: measurement, then conversion, then acquisition, then retention.",
    "Built for Shopify, Shopify Plus and WooCommerce stores trading in the UK.",
    "Use hubs to plan a quarter; use the blog for individual fixes.",
    "Every hub links to the service that delivers the same work if you would rather not run it yourself.",
  ],
  sections: [
    {
      id: "what-is-a-hub",
      h2: "What a pillar hub is and why we built eleven of them",
      nodes: [
        {
          type: "p",
          text: "A pillar hub is a single page that explains one discipline completely, then routes you to the detailed guides underneath it. It exists because ecommerce advice online is fragmented into tactics with no sense of sequence - and sequence is what separates a growing store from a busy one.",
        },
        {
          type: "p",
          text: "Read a hub and you get the mental model: what the discipline is for, which metric proves it is working, what to do first, and what usually goes wrong. Read the guides beneath it and you get the implementation detail.",
        },
      ],
    },
    {
      id: "sequence",
      h2: "The order we recommend working through the hubs",
      nodes: [
        {
          type: "ol",
          items: [
            "Analytics and tracking - without trustworthy numbers, every later decision is a guess.",
            "CRO - improve the conversion rate before paying to send more traffic into a leaky store.",
            "Ecommerce SEO - build the compounding acquisition channel that lowers blended cost over time.",
            "Paid media - buy growth once the economics can absorb it.",
            "Email, SMS and retention - convert first orders into lifetime value.",
            "Strategy and operations - protect margin as complexity increases.",
          ],
        },
        {
          type: "p",
          text: "Most stores arrive doing steps four and five while skipping one and two. That is why spend climbs faster than profit.",
        },
      ],
    },
    {
      id: "hub-map",
      h2: "What each hub covers",
      nodes: [
        {
          type: "table",
          head: ["Hub", "Core question it answers", "Primary metric"],
          rows: [
            ["Shopify growth", "How do we scale a Shopify or Plus store?", "Revenue per session"],
            ["WooCommerce growth", "How do we scale past plugin bloat?", "Page speed and conversion"],
            ["Ecommerce SEO", "How do we win non-branded search?", "Organic revenue"],
            ["Paid media", "How do we buy growth profitably?", "Blended MER"],
            ["CRO", "Why do visitors leave without buying?", "Conversion rate by device"],
            ["Email and SMS", "How do we make repeat purchase reliable?", "Flow revenue share"],
            ["Analytics", "Can we trust the numbers?", "Data completeness"],
            ["Strategy", "What are we actually selling, to whom?", "Contribution margin"],
            ["Operations", "Where does margin leak after the sale?", "Inventory turn and returns rate"],
            ["Retention", "What is a customer worth over time?", "LTV to CAC ratio"],
            ["AI automation", "Where can we remove manual work?", "Output per operator hour"],
          ],
        },
      ],
    },
    {
      id: "who-for",
      h2: "Who gets the most from this hub",
      nodes: [
        { type: "h3", text: "Founders of £500k-£5m stores" },
        {
          type: "p",
          text: "You need to know which lever to pull next and what good looks like. Start with analytics, then CRO, then choose one acquisition channel to do properly.",
        },
        { type: "h3", text: "In-house marketing managers" },
        {
          type: "p",
          text: "You need defensible plans and benchmarks to take into a board meeting. The hubs give you the sequence and the metrics that justify budget.",
        },
        { type: "h3", text: "Ecommerce and growth teams" },
        {
          type: "p",
          text: "You need implementation detail and templates. Skip the hub overview and go straight to the underlying guides and calculators.",
        },
      ],
    },
    {
      id: "how-to-use",
      h2: "How to turn a hub into a 90-day plan",
      nodes: [
        {
          type: "ol",
          items: [
            "Pick one hub - only one - based on your biggest constraint.",
            "Baseline the hub's primary metric today, and write the number down.",
            "Choose three actions from the hub that you can genuinely resource.",
            "Book them into the quarter with named owners and dates.",
            "Review at day 90 against the baseline before adding a second discipline.",
          ],
        },
        {
          type: "quote",
          text: "Stores that do three things properly in a quarter beat stores that start twelve. Every time.",
          cite: "BeingEcom Growth System principle",
        },
      ],
    },
    {
      id: "ai-search-hub",
      h2: "Built for AI search and answer engines",
      nodes: [
        {
          type: "p",
          text: "Each hub is structured so answer engines can quote it correctly: a definitional opening, clear entity relationships between disciplines, tables of comparable options and structured data on every page. That is the same generative engine optimisation approach we deploy for clients.",
        },
        {
          type: "list",
          items: [
            "Definitions before opinions, so models attribute claims accurately.",
            "Consistent terminology across all eleven hubs.",
            "FAQ, Breadcrumb and CollectionPage schema on hub pages.",
            "Internal linking that makes the topical relationships explicit.",
          ],
        },
      ],
    },
  ],
  linkGroups: [
    {
      title: "Apply it with us",
      links: [
        { label: "Free ecommerce growth audit", href: "/audit" },
        { label: "The Growth System methodology", href: "/methodology" },
        { label: "Pricing and engagement tiers", href: "/pricing" },
        { label: "Book a strategy call", href: "/contact" },
        { label: "Who we help", href: "/who-we-help" },
      ],
    },
    {
      title: "Disciplines",
      links: [
        { label: "Ecommerce SEO services", href: "/services/seo" },
        { label: "Technical SEO", href: "/services/seo/technical" },
        { label: "On-page SEO", href: "/services/seo/on-page" },
        { label: "Off-page SEO", href: "/services/seo/off-page" },
        { label: "International SEO", href: "/services/seo/international" },
        { label: "Answer engine optimisation", href: "/services/seo/aeo" },
        { label: "Conversion rate optimisation", href: "/services/cro" },
        { label: "Email and SMS", href: "/services/email-sms" },
        { label: "Analytics and tracking", href: "/services/analytics" },
        { label: "AI automation", href: "/services/ai-automation" },
      ],
    },
    {
      title: "Platforms and channels",
      links: [
        { label: "Shopify development", href: "/services/store-development/shopify" },
        { label: "WooCommerce development", href: "/services/store-development/woocommerce" },
        { label: "Performance marketing", href: "/services/performance-marketing" },
        { label: "Google Ads", href: "/services/performance-marketing/google-ads" },
        { label: "Meta Ads", href: "/services/performance-marketing/facebook-ads" },
        { label: "TikTok Ads", href: "/services/performance-marketing/tiktok-ads" },
      ],
    },
    {
      title: "Keep learning",
      links: [
        { label: "Ecommerce blog", href: "/blog" },
        { label: "Comparisons", href: "/compare" },
        { label: "Benchmarks", href: "/benchmarks" },
        { label: "Calculators", href: "/tools" },
        { label: "Glossary", href: "/glossary" },
        { label: "Industries we serve", href: "/industries" },
        { label: "UK locations", href: "/locations" },
      ],
    },
  ],
};

export const HUB_FAQS: FAQ[] = [
  {
    q: "What is the BeingEcom Knowledge Hub?",
    a: "It is a free library of eleven pillar guides covering the disciplines that drive UK ecommerce revenue: Shopify and WooCommerce growth, SEO, paid media, CRO, email and SMS, analytics, strategy, operations, retention and AI automation.",
  },
  {
    q: "Which hub should I read first?",
    a: "Analytics and tracking, unless you already trust your data. Every other decision depends on measurement being right. After that, CRO usually returns the most for the least spend.",
  },
  {
    q: "Is the hub free, and do I need to give my email address?",
    a: "It is completely free with no gate. There is no email capture, no gated PDF and no drip sequence attached to reading it.",
  },
  {
    q: "How is a hub different from a blog post?",
    a: "A hub explains a whole discipline and the order to work through it. A blog post solves one specific problem inside that discipline. Use hubs to plan, posts to execute.",
  },
  {
    q: "Do the hubs apply to WooCommerce as well as Shopify?",
    a: "Yes. Nine of the eleven hubs are platform-agnostic, and two are platform-specific so we can be concrete about themes, apps, hosting and checkout behaviour.",
  },
  {
    q: "Are the benchmarks based on UK data?",
    a: "Yes. Conversion rates, MER targets and email revenue shares come from UK ecommerce accounts, which behave differently from US averages on delivery expectations and average order value.",
  },
  {
    q: "Can BeingEcom implement the hub playbooks for us?",
    a: "Yes. Each hub maps to a service line, so you can read the method and then decide whether to run it in-house or hand it to our team.",
  },
  {
    q: "How often are the hubs updated?",
    a: "Continuously. Hubs are revised whenever a platform change, algorithm update or fresh client data set changes the recommendation.",
  },
];

/* ------------------------------------------------------------------ */
/* /industries                                                         */
/* ------------------------------------------------------------------ */

export const INDUSTRIES_EDITORIAL: IndexEditorial = {
  quickAnswer:
    "BeingEcom builds ecommerce growth programmes for twelve UK verticals including fashion, beauty, health and supplements, home and interiors, electronics, food and drink, jewellery and pet products. The strategy stays consistent - measurement, conversion, acquisition, retention - but creative, margin targets, seasonality and compliance change completely by industry.",
  voiceAnswer:
    "BeingEcom works with UK ecommerce brands across fashion, beauty, supplements, home, electronics, food and drink, jewellery, pets and more.",
  keyTakeaways: [
    "Vertical decides your realistic conversion rate, return rate and repeat-purchase window.",
    "Fashion lives or dies on returns rate; supplements on subscription retention.",
    "Compliance shapes creative in health, food, jewellery and children's products.",
    "Seasonality changes budget pacing far more than most brands plan for.",
    "The growth system is the same; the inputs and benchmarks are not.",
  ],
  sections: [
    {
      id: "why-vertical-matters",
      h2: "Why your vertical changes the entire growth plan",
      nodes: [
        {
          type: "p",
          text: "Two stores can have identical traffic and identical conversion rates and completely different economics. A fashion brand with a 38% return rate and a supplement brand with a 42% subscription rate are running different businesses, even though both sell online in the UK.",
        },
        {
          type: "p",
          text: "That is why generic ecommerce advice underperforms. The sequence of work holds across verticals - fix measurement, then conversion, then acquisition, then retention - but the targets, creative approach and channel mix do not.",
        },
        {
          type: "table",
          head: ["Vertical", "Biggest lever", "Watch out for"],
          rows: [
            ["Fashion and apparel", "Sizing confidence and returns reduction", "Return rates quietly erasing gross margin"],
            ["Beauty and skincare", "Replenishment flows and UGC creative", "Ingredient and efficacy claim compliance"],
            ["Health and supplements", "Subscription retention", "Advertising restrictions on health claims"],
            ["Home and interiors", "AOV growth and considered-purchase nurture", "Long decision windows breaking attribution"],
            ["Electronics", "Feed quality and price competitiveness", "Thin margins punishing paid inefficiency"],
            ["Food and drink", "Repeat purchase cadence", "Perishability, delivery cost and labelling rules"],
            ["Jewellery", "Trust signals and hallmarking clarity", "High-consideration abandonment"],
            ["Pet products", "Subscription and bundle design", "Category price sensitivity"],
          ],
        },
      ],
    },
    {
      id: "what-stays-same",
      h2: "What stays the same across every industry",
      nodes: [
        {
          type: "list",
          items: [
            "Trustworthy measurement before any spend increase.",
            "Product and collection pages that answer objections in the first screen.",
            "A compounding organic channel so paid is a choice rather than a dependency.",
            "Flow-led email revenue rather than campaign-only sending.",
            "Contribution margin as the scoreboard, not platform ROAS.",
          ],
        },
        {
          type: "p",
          text: "This is the BeingEcom Growth System, and it is deliberately boring. The creativity belongs in the execution, not in the framework.",
        },
      ],
    },
    {
      id: "what-changes",
      h2: "What we change per vertical",
      nodes: [
        { type: "h3", text: "Creative and messaging" },
        {
          type: "p",
          text: "Beauty rewards demonstration and before-and-after proof. Home rewards room context and scale. Electronics rewards specification clarity. The same production budget produces very different assets depending on the category.",
        },
        { type: "h3", text: "Channel mix" },
        {
          type: "p",
          text: "Search-led categories with clear demand lean on Google Shopping and SEO. Discovery-led categories lean on Meta and TikTok. Most brands need both, but the starting ratio should reflect how people actually shop for your product.",
        },
        { type: "h3", text: "Retention model" },
        {
          type: "p",
          text: "Consumables use replenishment timing tied to product life. Fashion uses seasonal drops and VIP tiering. Furniture uses referral and cross-category expansion, because the second purchase may be years away.",
        },
        { type: "h3", text: "Compliance and claims" },
        {
          type: "p",
          text: "Health, food and cosmetics all carry claim restrictions that shape ad copy and landing pages. Getting this wrong costs you an ad account, not just a test.",
        },
      ],
    },
    {
      id: "seasonality",
      h2: "Seasonality: the planning most UK brands get wrong",
      nodes: [
        {
          type: "ol",
          items: [
            "Map your last 24 months of revenue by week, not month.",
            "Identify the two peaks that generate a disproportionate share of profit.",
            "Build creative and inventory for those peaks a full quarter ahead.",
            "Reduce spend deliberately in structurally weak weeks rather than fighting them.",
            "Use quiet periods for CRO tests and technical SEO work, when traffic quality is stable.",
          ],
        },
        {
          type: "p",
          text: "Gifting-heavy verticals such as jewellery and food and drink can earn a third of annual profit in about six weeks. Supplements are far flatter, with a January spike. Treating both the same wastes budget in one and starves the other.",
        },
      ],
    },
    {
      id: "choosing",
      h2: "How to use these industry pages",
      nodes: [
        {
          type: "list",
          items: [
            "Open your vertical to see the specific levers, benchmarks and channel mix we would start with.",
            "Compare your current conversion rate and repeat-purchase rate against the vertical benchmark.",
            "Note the two or three items you are not currently doing at all.",
            "Bring those to a strategy call if you want a second opinion before resourcing them.",
          ],
        },
        {
          type: "p",
          text: "If your category is not listed, the framework still applies. We have worked across enough adjacent verticals to map it quickly on a call.",
        },
      ],
    },
    {
      id: "proof",
      h2: "Evidence, not claims",
      nodes: [
        {
          type: "p",
          text: "Every industry page links to relevant case studies with the method used, not just the headline number. Where results depend on unusual conditions - an exceptional product, a viral moment, a large existing list - we say so, because a growth claim you cannot reproduce is worthless to you.",
        },
      ],
    },
  ],
  linkGroups: [
    {
      title: "Next steps",
      links: [
        { label: "Free growth audit for your vertical", href: "/audit" },
        { label: "Book a strategy call", href: "/contact" },
        { label: "Our methodology", href: "/methodology" },
        { label: "Pricing", href: "/pricing" },
        { label: "Case studies", href: "/case-studies" },
      ],
    },
    {
      title: "Services that adapt per vertical",
      links: [
        { label: "Ecommerce SEO", href: "/services/seo" },
        { label: "Local SEO", href: "/services/seo/local" },
        { label: "Conversion rate optimisation", href: "/services/cro" },
        { label: "Creative production", href: "/services/creative" },
        { label: "Email and SMS retention", href: "/services/email-sms" },
        { label: "Performance marketing", href: "/services/performance-marketing" },
        { label: "Google Ads", href: "/services/performance-marketing/google-ads" },
        { label: "Meta Ads", href: "/services/performance-marketing/facebook-ads" },
        { label: "TikTok Ads", href: "/services/performance-marketing/tiktok-ads" },
      ],
    },
    {
      title: "Build and scale",
      links: [
        { label: "Shopify development", href: "/services/store-development/shopify" },
        { label: "WooCommerce development", href: "/services/store-development/woocommerce" },
        { label: "Scaling programmes", href: "/services/scaling" },
        { label: "Analytics and tracking", href: "/services/analytics" },
        { label: "Enterprise ecommerce SEO", href: "/enterprise-ecommerce-seo" },
      ],
    },
    {
      title: "Research",
      links: [
        { label: "Knowledge hub", href: "/hub" },
        { label: "Vertical benchmarks", href: "/benchmarks" },
        { label: "Ecommerce blog", href: "/blog" },
        { label: "Comparisons", href: "/compare" },
        { label: "UK locations", href: "/locations" },
        { label: "About BeingEcom", href: "/about" },
      ],
    },
  ],
};

export const INDUSTRIES_FAQS: FAQ[] = [
  {
    q: "Which ecommerce industries does BeingEcom work with?",
    a: "Twelve UK verticals, including fashion and apparel, beauty and skincare, health and supplements, home and interiors, electronics, food and drink, jewellery, pet products and sports equipment. Each has its own strategy page with vertical-specific benchmarks.",
  },
  {
    q: "Do you only work with brands in these verticals?",
    a: "No. These are the categories where we have the deepest data. The growth system transfers to adjacent categories, and we will tell you on the first call if we are not the right fit.",
  },
  {
    q: "How much does industry experience really matter?",
    a: "It matters most for creative, compliance and benchmarking. It matters far less for technical SEO or analytics, which behave the same regardless of what you sell.",
  },
  {
    q: "What conversion rate should my vertical be hitting in the UK?",
    a: "It varies widely - considered-purchase categories such as furniture and jewellery run well below fast-moving consumables. Each industry page carries the range we would expect, and our benchmarks section breaks it down further.",
  },
  {
    q: "Can you handle advertising compliance in supplements and health?",
    a: "Yes. We write to platform and UK advertising rules, avoid restricted claim structures and build landing pages that support the claims made in the ad.",
  },
  {
    q: "Do you work with multi-category retailers?",
    a: "We do. Multi-category stores need category-level economics rather than one blended target, which usually reveals that a small number of lines fund everything else.",
  },
  {
    q: "How quickly can you get up to speed in our category?",
    a: "Typically two weeks. We audit your data, competitor set and customer reviews before proposing anything, so the plan reflects your category rather than a template.",
  },
  {
    q: "Do industry-specific programmes cost more?",
    a: "No. Pricing is based on scope and delivery intensity, not vertical. Our pricing page sets out the tiers in full.",
  },
];

/* ------------------------------------------------------------------ */
/* /locations                                                          */
/* ------------------------------------------------------------------ */

export const LOCATIONS_EDITORIAL: IndexEditorial = {
  quickAnswer:
    "BeingEcom is a UK ecommerce agency working with Shopify and WooCommerce brands across London, Manchester, Birmingham, Leeds, Bristol, Liverpool, Glasgow, Edinburgh, Nottingham and Sheffield. We operate as a remote-first senior team, so you get specialists rather than whoever happens to be local.",
  voiceAnswer:
    "BeingEcom is a UK-wide ecommerce marketing agency serving brands in London, Manchester, Birmingham, Leeds, Bristol, Glasgow, Edinburgh and other major cities.",
  keyTakeaways: [
    "Registered in London, delivering to ecommerce brands across the whole UK.",
    "Remote-first delivery means senior operators, not a local junior team.",
    "Local SEO still matters if you have a showroom, warehouse collection or trade counter.",
    "City pages cover the local market, competitor density and what typically works there.",
    "We meet in person for onboarding and quarterly planning where it is useful.",
  ],
  sections: [
    {
      id: "uk-wide",
      h2: "How a UK-wide ecommerce agency actually works",
      nodes: [
        {
          type: "p",
          text: "Ecommerce delivery has almost no geographic component. Your Shopify theme, your Google Ads account, your Klaviyo flows and your technical SEO backlog do not care where the person fixing them sits. What matters is whether that person has done it before on a store like yours.",
        },
        {
          type: "p",
          text: "That is the trade many local agencies quietly ask you to make: accept a generalist nearby instead of a specialist further away. We built the team remote-first specifically to avoid it. Our registered office is at 71-75 Shelton Street in Covent Garden, London, and our operators work with brands from Cornwall to the Highlands.",
        },
        {
          type: "list",
          items: [
            "Weekly working sessions by video, with recordings and written summaries.",
            "A shared board so you can see the backlog and what shipped this week.",
            "Quarterly planning in person where it earns its travel cost.",
            "One senior point of contact, not an account manager relaying messages.",
          ],
        },
      ],
    },
    {
      id: "when-local-matters",
      h2: "When location genuinely does matter",
      nodes: [
        {
          type: "p",
          text: "There are real cases where geography changes the plan, and pretending otherwise would be dishonest.",
        },
        {
          type: "ol",
          items: [
            "You have a physical showroom, studio or trade counter, so local search visibility drives footfall.",
            "You offer click-and-collect or local delivery, which needs its own landing pages and schema.",
            "You serve a regional trade customer base where proximity affects trust.",
            "You need on-site product photography with your stock and your team.",
            "Your brand story is tied to a place, which is a real asset in food, drink and craft categories.",
          ],
        },
        {
          type: "p",
          text: "In those cases we run proper local SEO alongside the ecommerce programme: Google Business Profile optimisation, LocalBusiness structured data, city landing pages with genuinely different content, and review generation.",
        },
      ],
    },
    {
      id: "city-differences",
      h2: "What differs between UK ecommerce markets",
      nodes: [
        {
          type: "table",
          head: ["City or region", "Market character", "What we usually prioritise"],
          rows: [
            ["London", "Highest competitor density and ad costs", "Differentiated creative and margin discipline"],
            ["Manchester", "Fast-growing DTC and fashion cluster", "Creative volume and organic depth"],
            ["Birmingham", "Strong trade and multi-channel retail", "Feed quality and B2B-friendly journeys"],
            ["Leeds and Yorkshire", "Value-conscious, retail heritage", "AOV growth and retention"],
            ["Bristol", "Sustainability-led independent brands", "Story-led content and organic search"],
            ["Glasgow and Edinburgh", "Distinct Scottish market and delivery expectations", "Shipping clarity and local search"],
            ["Liverpool", "Social-first consumer behaviour", "TikTok and Meta creative testing"],
            ["Nottingham and Sheffield", "Lower competition, efficient acquisition", "SEO-first compounding growth"],
          ],
        },
        {
          type: "p",
          text: "These are tendencies, not rules. Your customer base rarely matches your postcode - most UK DTC brands sell nationally from day one - but competitor density and cost of local talent do vary meaningfully.",
        },
      ],
    },
    {
      id: "local-seo",
      h2: "Local SEO for ecommerce brands, done properly",
      nodes: [
        {
          type: "list",
          items: [
            "A complete Google Business Profile with correct categories, hours, products and photos.",
            "LocalBusiness and Organization structured data that agrees with your on-site details.",
            "Consistent name, address and phone number across every directory listing.",
            "City pages with unique content - stock, delivery, opening hours, local proof - not templated text with the city name swapped.",
            "A steady review flow, because review velocity influences local pack visibility.",
          ],
        },
        {
          type: "p",
          text: "Thin, duplicated city pages are the single most common local SEO mistake we audit. They get filtered from the index and drag site quality down with them.",
        },
      ],
    },
    {
      id: "working-together",
      h2: "What working with us looks like, wherever you are",
      nodes: [
        {
          type: "ol",
          items: [
            "Audit - we review data, store, ads and retention before proposing anything.",
            "Plan - a 90-day roadmap with named owners and expected outcomes.",
            "Build - technical fixes, creative and flows shipped in priority order.",
            "Scale - spend increases only once contribution margin supports it.",
            "Review - quarterly reset against the numbers we committed to.",
          ],
        },
        {
          type: "p",
          text: "The full detail sits in our methodology, and pricing tiers are published rather than hidden behind a discovery call.",
        },
      ],
    },
    {
      id: "choose-city",
      h2: "Find your city",
      nodes: [
        {
          type: "p",
          text: "Each city page covers the local ecommerce market, the competitor picture, the channels that tend to work there and how we would approach a brand based in that area. If your town is not listed, the nearest regional page will be close enough - and a call will be faster than reading anyway.",
        },
      ],
    },
  ],
  linkGroups: [
    {
      title: "Get started",
      links: [
        { label: "Free ecommerce audit", href: "/audit" },
        { label: "Contact the team", href: "/contact" },
        { label: "Pricing", href: "/pricing" },
        { label: "Our methodology", href: "/methodology" },
        { label: "About BeingEcom", href: "/about" },
      ],
    },
    {
      title: "Search visibility",
      links: [
        { label: "Local SEO services", href: "/services/seo/local" },
        { label: "Ecommerce SEO", href: "/services/seo" },
        { label: "Technical SEO", href: "/services/seo/technical" },
        { label: "On-page SEO", href: "/services/seo/on-page" },
        { label: "International SEO", href: "/services/seo/international" },
        { label: "Ecommerce SEO consultant", href: "/ecommerce-seo-consultant" },
      ],
    },
    {
      title: "Growth services",
      links: [
        { label: "Performance marketing", href: "/services/performance-marketing" },
        { label: "Google Ads", href: "/services/performance-marketing/google-ads" },
        { label: "Meta Ads", href: "/services/performance-marketing/facebook-ads" },
        { label: "Conversion rate optimisation", href: "/services/cro" },
        { label: "Email and SMS", href: "/services/email-sms" },
        { label: "Shopify development", href: "/services/store-development/shopify" },
        { label: "WooCommerce development", href: "/services/store-development/woocommerce" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Industries we serve", href: "/industries" },
        { label: "Knowledge hub", href: "/hub" },
        { label: "Comparisons", href: "/compare" },
        { label: "Case studies", href: "/case-studies" },
        { label: "Ecommerce blog", href: "/blog" },
        { label: "Ecommerce growth agency UK", href: "/ecommerce-growth-agency-uk" },
      ],
    },
  ],
};

export const LOCATIONS_FAQS: FAQ[] = [
  {
    q: "Where is BeingEcom based?",
    a: "Our registered office is 71-75 Shelton Street, Covent Garden, London WC2H 9JQ. The delivery team is remote-first across the UK, so clients get senior specialists rather than whoever is nearest.",
  },
  {
    q: "Do you work with ecommerce brands outside London?",
    a: "Yes, and most of our clients are outside London. We work with Shopify and WooCommerce brands in Manchester, Birmingham, Leeds, Bristol, Liverpool, Glasgow, Edinburgh, Nottingham, Sheffield and beyond.",
  },
  {
    q: "Can we meet in person?",
    a: "Yes, for onboarding and quarterly planning where it adds value. Day-to-day delivery runs on video calls, shared boards and written updates, which is faster than travel for both sides.",
  },
  {
    q: "Does my ecommerce store need local SEO?",
    a: "Only if location affects buying - a showroom, click-and-collect, local delivery or a regional trade base. A purely national DTC store gets more from technical and category SEO than from local pack rankings.",
  },
  {
    q: "How do you make city pages avoid thin content penalties?",
    a: "Every city page carries genuinely unique content: local market conditions, competitor density, delivery expectations and channel priorities. Templated pages with a swapped city name get filtered out of the index, so we do not build them.",
  },
  {
    q: "Do you charge different rates by location?",
    a: "No. Pricing is the same UK-wide and depends on scope, not postcode. All tiers are published on our pricing page.",
  },
  {
    q: "Which UK cities are the most competitive for ecommerce search?",
    a: "London by a distance, followed by Manchester and Birmingham. Nottingham, Sheffield and Leeds are noticeably cheaper to compete in, which makes SEO-first strategies pay back faster there.",
  },
  {
    q: "Can you help a Scottish brand selling across the UK?",
    a: "Yes. We run programmes for Glasgow and Edinburgh brands and pay particular attention to delivery messaging, since Highlands and Islands surcharges affect conversion if handled badly.",
  },
];
