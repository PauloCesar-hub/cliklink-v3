import { PLANOS } from "@/lib/planos";
import AssinarPageClient from "./AssinarPageClient";

export function generateStaticParams() {
  return PLANOS
    .filter(p => p.categoria === "internet")
    .map(p => ({ slug: p.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <AssinarPageClient slug={params.slug} />;
}
