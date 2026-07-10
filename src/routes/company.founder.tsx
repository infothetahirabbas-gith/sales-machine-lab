import { createFileRoute } from "@tanstack/react-router";
import FounderAuthorityPage, { founderAuthorityHead } from "./founder";

export const Route = createFileRoute("/company/founder")({
  head: founderAuthorityHead,
  component: FounderAuthorityPage,
});
