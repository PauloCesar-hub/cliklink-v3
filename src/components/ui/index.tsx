"use client";

import Link from "next/link";
import { Check, ExternalLink, Heart, Tv } from "lucide-react";
import { cn, WHATSAPP_URL } from "@/lib/utils";
import type { Plano, PlanoBadge } from "@/types";
import { formatPreco, BADGE_LABELS } from "@/lib/planos";

// ── SECTION TAG ──────────────────────────────────────────────
export function SectionTag({ children }: { children: React.ReactNode }) {
  return <div className="section-tag">{children}</div>;
}

// ── PLAN BADGE ────────────────────────────────────────────────
const BADGE_CONFIG: Record<PlanoBadge, { icon: React.ReactNode; bg: string; border: string; color: string }> = {
  "e-saude": {
    icon: <Heart size={12} />,
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    color: "text-emerald-400",
  },
  tv: {
    icon: <Tv size={12} />,
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    color: "text-blue-400",
  },
};

export function PlanBadge({ badge }: { badge: PlanoBadge }) {
  const cfg = BADGE_CONFIG[badge];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border", cfg.bg, cfg.border, cfg.color)}>
      {cfg.icon}
      {BADGE_LABELS[badge]}
    </span>
  );
}

// ── PLAN CARD ────────────────────────────────────────────────
interface PlanCardProps {
  plano: Plano;
  showOptLabel?: string;
  variant?: "primary" | "outline";
}

export function PlanCard({ plano, showOptLabel, variant = "primary" }: PlanCardProps) {
  const isCondominio = plano.categoria === "condominio";
  const isChipLabel = showOptLabel?.startsWith("+ Chip");

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 flex flex-col transition-all duration-200 hover:-translate-y-0.5",
        plano.featured
          ? "border-[#F47B20] bg-[rgba(244,123,32,0.06)]"
          : plano.chip
          ? "border-[#7c3aed]/40 bg-[#1e1a2e] hover:border-[#7c3aed]"
          : "border-[#333] bg-[#2a2a2a] hover:border-[#F47B20]"
      )}
    >
      {(showOptLabel || plano.destaque) && (
        <div className={cn(
          "text-xs font-bold tracking-wide uppercase mb-3 px-3 py-1.5 rounded-full self-start border",
          isChipLabel
            ? "text-[#7c3aed] bg-white border-white"
            : plano.featured
            ? "text-white bg-[rgba(244,123,32,0.15)] border-[rgba(244,123,32,0.4)]"
            : "text-white border-[#444]"
        )}>
          {showOptLabel || plano.destaque}
        </div>
      )}

      {/* Speed */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-[64px] font-black text-[#F47B20] leading-none tracking-tight">{plano.velocidade}</span>
        <span className="text-xl font-bold text-[#aaa]">{plano.unidade}</span>
      </div>

      {/* Price */}
      {isCondominio ? (
        <div className="text-2xl font-bold text-white mb-4">Sob consulta</div>
      ) : (
        <div className="flex items-start gap-1 mb-4">
          <div className="flex flex-col justify-start pt-2">
            <span className="text-sm font-bold text-[#888]">R$</span>
          </div>
          <span className="text-[52px] font-black text-white leading-none tracking-tight">
            {Math.floor(plano.preco).toString()}
          </span>
          <div className="flex flex-col justify-start pt-2">
            <span className="text-sm font-bold text-white">,{plano.preco.toFixed(2).split(".")[1]}</span>
            <span className="text-xs text-[#888]">/mês</span>
          </div>
        </div>
      )}

      {/* Badges */}
      {plano.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {plano.badges.map((b) => <PlanBadge key={b} badge={b as PlanoBadge} />)}
        </div>
      )}

      {/* Resources */}
      <ul className="flex flex-col gap-2 mb-5 flex-1">
        {plano.recursos.map((r) => (
          <li key={r} className="flex items-start gap-2 text-sm text-[#999]">
            <Check size={15} className="text-[#F47B20] flex-shrink-0 mt-0.5" />
            {r}
          </li>
        ))}
      </ul>

      <Link
        href={`/assinar/${plano.slug}`}
        className={cn("btn w-full justify-center text-base py-3", variant === "primary" || plano.featured ? "btn-primary" : "btn-outline-orange")}
      >
        {isCondominio ? "Falar com consultor" : "Assinar agora"}
      </Link>
    </div>
  );
}

// ── WHATSAPP FLOAT ───────────────────────────────────────────
export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-lg shadow-[rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
    >
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ── BREADCRUMB ───────────────────────────────────────────────
interface BreadcrumbItem { label: string; href?: string; }
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="breadcrumb">
      <nav className="max-w-[1320px] mx-auto flex items-center gap-2 text-sm text-[#888]" aria-label="Breadcrumb">
        {items.map((item, i) => (
          <span key={item.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-[#555]">›</span>}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-[#F47B20] transition-colors">{item.label}</Link>
            ) : (
              <span className={i === items.length - 1 ? "text-white font-semibold" : ""}>{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}

// ── PORTAL CARD ──────────────────────────────────────────────
export function PortalCard({ title, description, icon, url = "https://cliklink.sgp.tsmx.com.br/centralweb/login", label = "Acessar" }: {
  title: string; description: string; icon: React.ReactNode; url?: string; label?: string;
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="card flex flex-col items-center text-center gap-3 p-6 hover:border-[#F47B20] hover:-translate-y-0.5 transition-all group"
    >
      <div className="text-[#F47B20] text-4xl">{icon}</div>
      <h3 className="font-bold text-white text-sm">{title}</h3>
      <p className="text-xs text-[#888] leading-relaxed">{description}</p>
      <span className="btn btn-outline-orange btn-sm mt-1">
        {label} <ExternalLink size={12} />
      </span>
    </a>
  );
}
