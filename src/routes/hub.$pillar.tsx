import { createFileRoute, notFound } from "@tanstack/react-router";
import HubPillar from "@/components/site/HubPillar";
import { HUB_PILLARS } from "@/lib/hub-content";
import {
  breadcrumbJsonLd,
  courseJsonLd,
  faqJsonLd,
  howToJsonLd,
  SITE_URL,
} from "@/lib/seo";

export const Route = createFileRoute("/hub/$pillar")({
  loader: ({ params }) => {
    const entry = HUB_PILLARS[params.pillar];
    if (!entry) throw notFound();
    return { pillar: params.pillar, entry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Hub not found | BeingEcom" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { pillar, entry } = loaderData;
    const url = `${SITE_URL}/hub/${pillar}`;
    const faqLd = faqJsonLd(entry.props.faqs, `/hub/${pillar}`);
    const courseLd = courseJsonLd({
      url,
      name: entry.props.h1,
      description: entry.props.answer,
      about: entry.props.eyebrow,
    });
    const howLd = howToJsonLd({
      url,
      name: `${entry.props.h1} playbook`,
      description: entry.props.answer,
      steps: entry.props.playbook.map((p) => ({ name: p.step, text: p.body })),
    });
    const crumb = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Knowledge Hub", path: "/hub" },
      { name: entry.props.eyebrow, path: `/hub/${pillar}` },
    ]);
    return {
      meta: [
        { title: entry.meta.title },
        { name: "description", content: entry.meta.description },
        { property: "og:title", content: entry.meta.title },
        { property: "og:description", content: entry.meta.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(crumb) },
        { type: "application/ld+json", children: JSON.stringify(faqLd) },
        { type: "application/ld+json", children: JSON.stringify(courseLd) },
        { type: "application/ld+json", children: JSON.stringify(howLd) },
      ],
    };
  },
  notFoundComponent: PillarNotFound,
  component: PillarPage,
});

function PillarPage() {
  const { entry } = Route.useLoaderData();
  return <HubPillar {...entry.props} />;
}

function PillarNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl font-bold">Hub not found</h1>
      <p className="mt-4 text-muted-foreground">
        That pillar hub doesn't exist. Head back to the <a href="/hub" className="text-primary underline">Knowledge Hub</a>.
      </p>
    </div>
  );
}
