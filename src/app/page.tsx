"use client";

import Link from "next/link";
import { Clock, Building2, Wifi, Shield } from "lucide-react";
import { SectionTag, PlanCard, PortalCard } from "@/components/ui/index";
import { getPlanosByCategoria } from "@/lib/planos";
import { PHONE_HREF, WHATSAPP_URL, PORTAL_URL, HORARIO } from "@/lib/utils";
import { HeroSection } from "@/components/sections/HeroSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BeneficiosSection } from "@/components/sections/BeneficiosSection";

const BENEFITS = [
  { icon: <Building2 size={22} />, title: "Feito para condomínios", desc: "Infraestrutura de fibra óptica instalada no condomínio. Cada morador com sua própria conexão." },
  { icon: <Wifi size={22} />, title: "Fibra óptica 100%", desc: "Conexão estável e rápida do jeito que tem que ser. De 100 Mega até 1 Giga." },
  { icon: <Shield size={22} />, title: "e-Saude incluso", desc: "Consultas médicas online incluídas nos planos a partir de 300 Mega. Para toda a família." },
  { icon: <Clock size={22} />, title: "Suporte local", desc: "Equipe em Araraquara. Atendimento humano de segunda a sábado — sem robô." },
];

const allInternet = getPlanosByCategoria("internet");

const planGroups = [
  { speed: "100", unit: "Megas", planos: allInternet.filter(p => p.velocidade === "100") },
  { speed: "300", unit: "Megas", planos: allInternet.filter(p => p.velocidade === "300") },
  { speed: "600", unit: "Megas", planos: allInternet.filter(p => p.velocidade === "600") },
  { speed: "1",   unit: "Giga",  planos: allInternet.filter(p => p.velocidade === "1") },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* BENEFÍCIOS */}
      <section className="py-14 px-6">
        <div className="max-w-[1320px] mx-auto">
          <SectionTag>⭐ Por que a ClikLink</SectionTag>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">
            Conectividade feita<br />para quem mora em condomínio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-[#222] border border-[#333] rounded-2xl p-6 hover:border-[#F47B20] transition-all">
                <div className="w-11 h-11 rounded-xl bg-[rgba(244,123,32,0.12)] border border-[rgba(244,123,32,0.2)] flex items-center justify-center text-[#F47B20] mb-4">{b.icon}</div>
                <h3 className="font-bold text-white text-base mb-2">{b.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="bg-[#1a1a1a] border-y border-[#333] py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-10">
            <SectionTag>📶 Planos internet</SectionTag>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-1 mb-2">Escolha o plano do seu apartamento</h2>
            <p className="text-[#888]">Fibra óptica 100% · e-Saude incluso · Suporte local em Araraquara</p>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {planGroups.map((group) => (
            <div key={group.speed}>
              {/* Speed header */}
              <div className="max-w-[1320px] mx-auto px-6 mb-4">
                <div className="flex items-baseline gap-2 pb-3 border-b border-[#333]">
                  <span className="text-5xl font-black text-[#F47B20] leading-none">{group.speed}</span>
                  <span className="text-lg font-bold text-[#666]">{group.unit}</span>
                </div>
              </div>

              {/* Horizontal scroll row */}
              <div
                className="pb-2"
                style={{
                  scrollbarWidth: "none" as const,
                  WebkitOverflowScrolling: "touch" as const,
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                }}
              >
                <div className="flex gap-5 px-6 mx-auto" style={{ width: "fit-content" }}>
                {group.planos.map((plano) => (
                  <div
                    key={plano.id}
                    className="flex-shrink-0 w-[300px]"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <PlanCard
                      plano={plano}
                      variant={plano.featured ? "primary" : "outline"}
                      showOptLabel={plano.chip ? `+ Chip ${plano.chip}` : plano.destaque}
                    />
                  </div>
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-[1320px] mx-auto px-6">
          <div className="mt-10 bg-[#111] border border-dashed border-[rgba(244,123,32,0.3)] rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#F47B20] uppercase tracking-wider mb-1">Síndico ou administrador?</div>
              <div className="text-xl font-bold text-white mb-1">Planos especiais para condomínios</div>
              <div className="text-sm text-[#888]">Infraestrutura dedicada para todos os moradores</div>
            </div>
            <Link href="/condominios" className="btn btn-primary flex-shrink-0">Ver planos para condomínios</Link>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS TELEMEDICINA + TELPET */}
      <BeneficiosSection />

      {/* SUPORTE */}
      <section className="bg-[#1a1a1a] border-y border-[#333] py-14 px-6">
        <div className="max-w-[1320px] mx-auto">
          <SectionTag>🎧 Suporte</SectionTag>
          <h2 className="text-3xl font-black tracking-tight mb-8">Precisa de ajuda?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PortalCard title="Suporte técnico" description="Problemas de conexão" icon={<span>🔧</span>} url="/suporte" label="Ver suporte" />
            <PortalCard title="WhatsApp" description="Resposta rápida" icon={<span>💬</span>} url={WHATSAPP_URL} label="Abrir" />
            <PortalCard title="Minha conta" description="Boleto e faturas" icon={<span>👤</span>} url={PORTAL_URL} label="Entrar" />
            <PortalCard title="Ligar agora" description="Atendimento direto" icon={<span>📞</span>} url={PHONE_HREF} label="Ligar" />
          </div>
          <div className="mt-4 bg-[#222] border border-[#333] rounded-xl px-5 py-3.5 flex items-center gap-3">
            <Clock size={18} className="text-[#F47B20] flex-shrink-0" />
            <span className="text-sm text-[#888]"><strong className="text-white">Horário:</strong> {HORARIO}</span>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
