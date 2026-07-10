export const SITE_URL = "https://beingecom.com";

export const ORG_INFO = {
  name: "BeingEcom",
  legalName: "BeingEcom",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  email: "info@beingecom.com",
  telephone: "+44 7882 743592",
  description:
    "UK ecommerce growth agency for Shopify & WooCommerce brands. Paid ads, CRO, SEO, email automation and analytics.",
  address: {
    streetAddress: "71-75 Shelton Street, Covent Garden",
    addressLocality: "London",
    addressRegion: "England",
    postalCode: "WC2H 9JQ",
    addressCountry: "GB",
  },
  sameAs: [
    "https://www.linkedin.com/company/beingecom",
    "https://www.instagram.com/beingecom",
    "https://x.com/beingecom",
    "https://www.facebook.com/beingecom",
    "https://www.youtube.com/@beingecom",
  ],
};

// Canonical Knowledge Graph entities. Reference these by @id from other
// schemas (Person → worksFor, Service → provider) so search engines and
// LLMs consolidate BeingEcom as a single entity.
export const ORG_ID = `${SITE_URL}#organization`;
export const PERSON_ID_FOUNDER = `${SITE_URL}/company/founder#tahir-abbas`;
export const PERSON_ID_CTO = `${SITE_URL}/company/team#ali-abbas`;
export const PERSON_ID_MD = `${SITE_URL}/company/team#hasnain-abbas`;

export const ORG_KNOWS_ABOUT = [
  "Ecommerce",
  "Shopify",
  "Shopify Plus",
  "WooCommerce",
  "Ecommerce SEO",
  "Technical SEO",
  "Programmatic SEO",
  "Answer Engine Optimization",
  "Generative Engine Optimization",
  "Conversion Rate Optimisation",
  "Performance Marketing",
  "Google Ads",
  "Meta Ads",
  "TikTok Ads",
  "YouTube Ads",
  "Email Marketing",
  "Klaviyo",
  "Retention Marketing",
  "Analytics",
  "GA4",
  "Server-side tracking",
  "AI automation",
  "Headless commerce",
  "Direct-to-consumer",
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: ORG_INFO.name,
    alternateName: ["Being Ecom", "BeingEcom Agency"],
    legalName: ORG_INFO.legalName,
    url: ORG_INFO.url,
    logo: {
      "@type": "ImageObject",
      url: ORG_INFO.logo,
      width: 512,
      height: 512,
    },
    image: ORG_INFO.logo,
    description: ORG_INFO.description,
    slogan: "The AI-first ecommerce growth agency.",
    foundingDate: "2019-01-01",
    email: ORG_INFO.email,
    telephone: ORG_INFO.telephone,
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 25 },
    address: {
      "@type": "PostalAddress",
      ...ORG_INFO.address,
    },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Ireland" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Place", name: "Europe" },
    ],
    knowsAbout: ORG_KNOWS_ABOUT,
    knowsLanguage: ["en", "en-GB"],
    brand: { "@type": "Brand", name: ORG_INFO.name, logo: ORG_INFO.logo },
    founder: { "@id": PERSON_ID_FOUNDER },
    employee: [
      { "@id": PERSON_ID_FOUNDER },
      { "@id": PERSON_ID_CTO },
      { "@id": PERSON_ID_MD },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: ORG_INFO.email,
        telephone: ORG_INFO.telephone,
        areaServed: ["GB", "US", "IE", "AU"],
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: ORG_INFO.email,
        telephone: ORG_INFO.telephone,
        areaServed: ["GB", "US", "IE", "AU"],
        availableLanguage: ["English"],
      },
    ],
    sameAs: ORG_INFO.sameAs,
  };
}

// Canonical Person schemas — imported by Founder + Team pages and referenced
// by @id everywhere else (Organization.founder, Article.author, etc.).
export type TeamMember = {
  id: string;
  slug: string;         // hash used inside team page
  name: string;
  jobTitle: string;
  bio: string;
  knowsAbout: string[];
  sameAs?: string[];
  image?: string;
  initials: string;
};

export const TEAM: TeamMember[] = [
  {
    id: PERSON_ID_FOUNDER,
    slug: "tahir-abbas",
    name: "Tahir Abbas",
    jobTitle: "Founder & Chief Executive Officer",
    bio: "Tahir Abbas founded BeingEcom to give Shopify and WooCommerce brands the senior growth team every founder wishes they could hire in-house. A decade of ecommerce operating experience across paid media, SEO, CRO and AI automation.",
    knowsAbout: [
      "Ecommerce strategy", "Shopify Plus", "WooCommerce", "Performance marketing",
      "Ecommerce SEO", "Conversion rate optimisation", "AI automation", "Klaviyo",
    ],
    sameAs: [
      "https://www.linkedin.com/in/muhammad-tahir-abbas-05443a221/",
      "https://www.facebook.com/profile.php?id=61574710097043",
      "https://www.instagram.com/tahir_abbas_shah/",
      "https://x.com/beingecom",
    ],
    initials: "TA",
  },
  {
    id: PERSON_ID_CTO,
    slug: "ali-abbas",
    name: "Ali Abbas",
    jobTitle: "Chief Technology Officer",
    bio: "Ali Abbas leads engineering at BeingEcom — headless Shopify (Hydrogen), WooCommerce customisation, server-side tracking, AI automation pipelines and the internal tooling that lets a small senior team operate at scale.",
    knowsAbout: [
      "Headless commerce", "Shopify Hydrogen", "WooCommerce development",
      "Next.js", "Server-side tracking", "GA4", "AI automation", "Cloudflare Workers",
    ],
    sameAs: ["https://www.linkedin.com/company/beingecom"],
    initials: "AA",
  },
  {
    id: PERSON_ID_MD,
    slug: "hasnain-abbas",
    name: "Hasnain Abbas",
    jobTitle: "Managing Director",
    bio: "Hasnain Abbas runs operations, delivery and client success across every BeingEcom engagement — from onboarding and pod assembly through to weekly reporting rituals and quarterly strategic reviews.",
    knowsAbout: [
      "Ecommerce operations", "Client success", "Growth delivery",
      "Reporting rituals", "Team leadership", "Project management",
    ],
    sameAs: ["https://www.linkedin.com/company/beingecom"],
    initials: "HA",
  },
];

export function personJsonLd(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": member.id,
    name: member.name,
    jobTitle: member.jobTitle,
    description: member.bio,
    image: member.image,
    url: member.slug === "tahir-abbas"
      ? `${SITE_URL}/company/founder`
      : `${SITE_URL}/company/team#${member.slug}`,
    worksFor: { "@id": ORG_ID },
    memberOf: { "@id": ORG_ID },
    knowsAbout: member.knowsAbout,
    knowsLanguage: ["en", "en-GB"],
    nationality: { "@type": "Country", name: "United Kingdom" },
    sameAs: member.sameAs ?? [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_INFO.name,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    name: `Contact ${ORG_INFO.name}`,
    description: `Contact ${ORG_INFO.name} for a free ecommerce growth audit - reply within 48 hours.`,
    mainEntity: {
      "@type": "Organization",
      name: ORG_INFO.name,
      url: SITE_URL,
      email: ORG_INFO.email,
      telephone: ORG_INFO.telephone,
      address: { "@type": "PostalAddress", ...ORG_INFO.address },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: ORG_INFO.email,
          telephone: ORG_INFO.telephone,
          areaServed: { "@type": "Country", name: "United Kingdom" },
          availableLanguage: ["English"],
        },
      ],
    },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}#business`,
    name: ORG_INFO.name,
    url: SITE_URL,
    image: ORG_INFO.logo,
    logo: ORG_INFO.logo,
    description: ORG_INFO.description,
    email: ORG_INFO.email,
    telephone: ORG_INFO.telephone,
    priceRange: "££££",
    address: { "@type": "PostalAddress", ...ORG_INFO.address },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    sameAs: ORG_INFO.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ecommerce Growth Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Store Development", url: `${SITE_URL}/services/store-development` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conversion Rate Optimisation", url: `${SITE_URL}/services/cro` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance Marketing", url: `${SITE_URL}/services/performance-marketing` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ecommerce SEO", url: `${SITE_URL}/services/seo` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email & SMS Marketing", url: `${SITE_URL}/services/email-sms` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Creative Production", url: `${SITE_URL}/services/creative` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Funnel & Landing Pages", url: `${SITE_URL}/services/funnel` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Analytics & Tracking", url: `${SITE_URL}/services/analytics` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Scaling & Retention", url: `${SITE_URL}/services/scaling` } },
      ],
    },
  };
}

export type FAQ = { q: string; a: string };

export function faqSlug(q: string) {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function faqJsonLd(faqs: FAQ[], pagePath: string) {
  const base = `${SITE_URL}${pagePath}`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${base}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      "@id": `${base}#faq-${faqSlug(f.q)}`,
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        "@id": `${base}#faq-${faqSlug(f.q)}-answer`,
        text: f.a,
      },
    })),
  };
}

export function articleJsonLd(opts: {
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  about?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${opts.url}#article`,
    headline: opts.headline,
    description: opts.description,
    image: opts.image,
    datePublished: opts.datePublished ?? "2024-01-15",
    dateModified: new Date().toISOString().slice(0, 10),
    about: opts.about,
    author: { "@type": "Organization", name: ORG_INFO.name, url: ORG_INFO.url },
    publisher: {
      "@type": "Organization",
      name: ORG_INFO.name,
      logo: { "@type": "ImageObject", url: ORG_INFO.logo },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
  };
}

export function courseJsonLd(opts: {
  url: string;
  name: string;
  description: string;
  about?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${opts.url}#course`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    about: opts.about,
    provider: { "@id": ORG_ID, "@type": "Organization", name: ORG_INFO.name, url: ORG_INFO.url },
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    educationalLevel: "Intermediate",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT2H",
    },
  };
}

export function howToJsonLd(opts: {
  url: string;
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${opts.url}#howto`,
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function definedTermSetJsonLd(opts: {
  url: string;
  name: string;
  description: string;
  terms: { term: string; definition: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${opts.url}#termset`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    hasDefinedTerm: opts.terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${opts.url}#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: `${opts.url}#termset`,
    })),
  };
}




export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceJsonLd(opts: {
  slug: string;
  name: string;
  description: string;
  serviceType?: string;
}) {
  const url = `${SITE_URL}/services/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url,
    provider: {
      "@type": "Organization",
      name: ORG_INFO.name,
      url: ORG_INFO.url,
    },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Shopify and WooCommerce ecommerce brands",
    },
  };
}


// Page-specific FAQs
export const aboutFaqs: FAQ[] = [
  { q: "What makes BeingEcom different from other agencies?", a: "We work only with ecommerce brands on Shopify and WooCommerce, operate like a fractional CMO/CRO team, and tie every decision to revenue - not vanity metrics." },
  { q: "How big is your team?", a: "We're a senior-only team of growth operators - ex-DTC founders, performance leads, CRO directors and SEO experts. No juniors learning on your account." },
  { q: "Do you take equity instead of fees?", a: "Occasionally, for the right brand. Default is a 90-day fixed engagement followed by month-to-month." },
  { q: "Where are you based?", a: "Headquartered in London (71–75 Shelton Street, Covent Garden, WC2H 9JQ), with a UK-first senior team that operates remotely across UK time zones and coordinates with partners in Europe when a project needs it." },
];

export const auditFaqs: FAQ[] = [
  { q: "Is the audit really free?", a: "Yes. The Being Ecom Brain™ audit is 100% free with no credit card and no sales call required." },
  { q: "How long does the audit take?", a: "Typically 20–40 seconds, with a hard 90-second timeout. We scan your store across 17 phases and return a full growth intelligence report." },
  { q: "Does it work for both Shopify and WooCommerce?", a: "Yes - and BigCommerce, Magento, Wix and Squarespace. Tool, app and platform recommendations branch automatically to match what you're actually running." },
  { q: "What do I get at the end?", a: "15 growth scores, recommendation confidence with signal drivers, revenue leakage map, competitor intel, a 90-day action plan and 5 founder lenses - exportable as PDF, Excel, CSV, JSON or Markdown." },
  { q: "Will it match my market?", a: "Yes. We detect currency, phone prefix and country signals on the page and adjust retention channel advice (e.g. SMS for UK/US/AU, WhatsApp Business API where deliverability is stronger)." },
];

export const contactFaqs: FAQ[] = [
  { q: "How fast do you reply?", a: "Within 24 hours on weekdays, usually much faster." },
  { q: "What should I include in my message?", a: "Your store URL, current monthly revenue, ad spend if any, and your biggest bottleneck." },
  { q: "Do you take a discovery call before quoting?", a: "Yes. A 30-minute call to confirm fit, then a written plan with scope and pricing." },
  { q: "Do you sign NDAs?", a: "Yes - happy to sign a mutual NDA before sharing sensitive numbers." },
];

export const servicesFaqs: FAQ[] = [
  { q: "Do I have to buy all services together?", a: "No. Pick the services you need. Most brands start with 2-3 (e.g. CRO + Ads, or SEO + Email) and expand as results compound." },
  { q: "Can you replace my in-house team?", a: "We can replace, augment, or coach. Most clients keep an in-house executor and use us as the strategy + senior firepower." },
  { q: "Do you work with Shopify Plus and headless stacks?", a: "Yes. Shopify, Shopify Plus, WooCommerce and common headless stacks (Hydrogen, Next.js + Shopify Storefront API)." },
  { q: "How quickly do services start?", a: "Onboarding takes 5-7 days. Most services start shipping work within the first 2 weeks." },
];

export const caseStudyFaqs: FAQ[] = [
  { q: "Are these case studies real?", a: "They're illustrative - representative playbooks, not verified client dashboards. Every card is drawn from patterns we've run for real UK Shopify and WooCommerce brands, but brand names, screenshots and exact dashboard figures are anonymised for NDA reasons and the numbers illustrate realistic outcome ranges rather than a single client's live account." },
  { q: "Can I see verified numbers for a specific client?", a: "Yes - after a discovery call we can share verified references and, where the client consents, walk you through real dashboards for a brand in your category and stage." },
  { q: "What's your typical time-to-result?", a: "CRO and email lift in 2–4 weeks, paid ads stabilise in 30–60 days, SEO compounds over 3–6 months." },
  { q: "Do results like these predict my outcome?", a: "No - past client results are never a prediction of future outcomes. What we commit to is senior operators on your account, weekly execution against a revenue-tied plan, and full transparency on the numbers each week." },
];
