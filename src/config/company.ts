// Single source of truth for the Company section.
// Every menu, footer link, hub grid, related-page strip, sitemap entry,
// and JSON-LD ItemList reads from this array. Update once - updates
// everywhere. Do NOT hardcode Company URLs anywhere else.

export type CompanyEntry = {
  slug: string;      // path segment after /company (or absolute path for /about)
  to: string;        // absolute route path
  label: string;     // nav & card label
  short: string;     // short label for compact menus
  blurb: string;     // 1-line description used in hub cards / meta
  tag: string;       // grouping tag (Identity / Proof / Community / Legal)
  external?: boolean; // true when the link is outside the /company/* tree
};

export const COMPANY_LINKS: readonly CompanyEntry[] = [
  { slug: "about",             to: "/about",                    label: "About Us",                  short: "About",         blurb: "Who BeingEcom is, what we stand for, and how we work.",                              tag: "Identity",  external: true },
  { slug: "founder",           to: "/about/tahir-abbas",        label: "Meet the Founder",          short: "Founder",       blurb: "Tahir Abbas - the operator behind BeingEcom's growth playbook.",                    tag: "Identity", external: true },
  { slug: "team",              to: "/company/team",             label: "Our Team",                  short: "Team",          blurb: "The senior operators, specialists and engineers running your account.",              tag: "Identity" },
  { slug: "careers",           to: "/company/careers",          label: "Careers",                   short: "Careers",       blurb: "Open roles, hiring bar and what it's like to build growth at BeingEcom.",           tag: "Identity" },
  { slug: "methodology",       to: "/methodology",              label: "Our Growth Methodology",    short: "Methodology",   blurb: "The 13-phase framework we use to scale Shopify & WooCommerce stores.",              tag: "Approach", external: true },
  { slug: "industries",        to: "/industries",               label: "Industries We Serve",       short: "Industries",    blurb: "12 ecommerce verticals we've operated in - and the playbook for each.",              tag: "Approach", external: true },
  { slug: "why-us",            to: "/company/why-beingecom",    label: "Why Choose BeingEcom",      short: "Why us",        blurb: "Eight reasons brands pick us over agencies, freelancers and in-house teams.",         tag: "Approach" },
  { slug: "technology",        to: "/company/technology",       label: "Our Technology Stack",      short: "Stack",         blurb: "The tools we run in every engagement - Shopify, GA4, Klaviyo, Ahrefs, AI and more.",  tag: "Approach" },
  { slug: "pricing",           to: "/pricing",                  label: "Pricing & Engagements",     short: "Pricing",       blurb: "How we price retainers, projects and audits - with clear scope and no lock-ins.",     tag: "Approach", external: true },
  { slug: "certifications",    to: "/company/certifications",   label: "Certifications & Partnerships", short: "Certifications", blurb: "Google, Meta, Shopify, WooCommerce, HubSpot - training we hold and partner status.", tag: "Proof" },
  { slug: "success-stories",   to: "/case-studies",             label: "Client Success Stories",    short: "Success stories", blurb: "Hand-picked case studies with real scope, numbers and lessons.",                    tag: "Proof", external: true },
  { slug: "reviews",           to: "/company/reviews",          label: "Reviews & Testimonials",    short: "Reviews",       blurb: "What founders and marketing leads say after working with us.",                        tag: "Proof" },
  { slug: "press",             to: "/company/press",            label: "Media & Press",             short: "Press",         blurb: "Publications, podcasts and interviews featuring the BeingEcom team.",                 tag: "Proof" },
  { slug: "community",         to: "/company/community",        label: "Community & Events",        short: "Community",     blurb: "Workshops, live webinars, meetups and how to be part of them.",                       tag: "Community" },
  { slug: "csr",               to: "/company/csr",              label: "Corporate Social Responsibility", short: "CSR",     blurb: "How BeingEcom gives back pro-bono work, education, sustainability and community impact.", tag: "Community" },
  { slug: "resources",         to: "/company/resources",        label: "Resources & Downloads",     short: "Resources",     blurb: "Guides, checklists, templates and playbooks - all free.",                             tag: "Community" },
  { slug: "editorial-policy",  to: "/company/editorial-policy", label: "Editorial Policy",          short: "Editorial policy", blurb: "How we research, write, review, source and update every page on this site.",       tag: "Trust" },
  { slug: "review-methodology", to: "/company/review-methodology", label: "Review Methodology",     short: "Review methodology", blurb: "How we test tools and campaigns: thresholds, scoring and conflict-of-interest rules.", tag: "Trust" },
  { slug: "corrections",       to: "/company/corrections",      label: "Corrections Policy",        short: "Corrections",   blurb: "How to report an error, our response times, and the public corrections log.",        tag: "Trust" },
  { slug: "legal",             to: "/company/legal",            label: "Legal & Policies",          short: "Legal",         blurb: "Privacy, terms, cookies, accessibility, GDPR and disclaimer - one place.",           tag: "Legal" },
];

export const COMPANY_LINKS_BY_SLUG: Readonly<Record<string, CompanyEntry>> =
  Object.freeze(Object.fromEntries(COMPANY_LINKS.map((c) => [c.slug, c])));

export const COMPANY_INTERNAL_LINKS = COMPANY_LINKS.filter((c) => !c.external);
