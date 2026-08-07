"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MessageCircle, Wifi, ChevronRight } from "lucide-react";
import { Breadcrumb, PlanCard } from "@/components/ui/index";
import { PLANOS } from "@/lib/planos";
import { waMsg } from "@/lib/utils";
import type { ChipSize } from "@/types";

const internet = PLANOS.filter(p => p.categoria === "internet");

type Tab = "sem-chip" | "15G" | "20G" | "25G";
const TABS: { id: Tab; label: string }[] = [
  { id: "sem-chip", label: "Só Internet" },
  { id: "15G",      label: "+ Chip 15G"  },
  { id: "20G",      label: "+ Chip 20G"  },
  { id: "25G",      label: "+ Chip 25G"  },
];

const SPEEDS = [
  { v: "100", unit: "Megas" },
  { v: "300", unit: "Megas" },
  { v: "600", unit: "Megas" },
  { v: "1",   unit: "Giga"  },
];

export default function PlanosPage() {
  const [tab, setTab] = useState<Tab>("sem-chip");

  const filtered = internet.filter(p =>
    tab === "sem-chip" ? !p.chip : p.chip === (tab as ChipSize)
  );

  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Planos" }]} />

      {/* HEADER */}
      <div className="bg-[#0d0d0d] border-b border-[#1e1e1e] py-12 px-6">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-[#F47B20] uppercase tracking-widest mb-3">Planos internet</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              Planos para moradores<br />
              <span className="text-[#F47B20]">de condomínio</span>
            </h1>
            <p className="text-[#666] max-w-lg">
              Fibra óptica 100%, e-Saude incluso e suporte humano local em Araraquara.
            </p>
          </div>
          <div className="flex items-center gap-6 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10">
                <Image src="/logos/logo-telemedicina.png" alt="e-Saude" fill className="object-contain" />
              </div>
              <span className="text-xs text-[#555]">e-Saude</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="relative w-28 h-10">
                <Image src="/logos/logo-callpet.png" alt="CallPet" fill className="object-contain object-left" />
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Wifi size={16} className="text-[#F47B20]" />
              <span className="text-xs text-[#555]">Fibra 100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-[#0d0d0d] border-b border-[#1e1e1e] sticky top-16 z-30 px-6">
        <div className="max-w-[1320px] mx-auto flex overflow-x-auto gap-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-shrink-0 px-5 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                tab === t.id
                  ? "border-[#F47B20] text-[#F47B20]"
                  : "border-transparent text-[#444] hover:text-[#888]"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* PLANOS — mesmo layout da home */}
      <section className="bg-[#1a1a1a] border-b border-[#333] py-16">
        <div className="flex flex-col gap-10">
          {SPEEDS.map(({ v, unit }) => {
            const grupo = filtered.filter(p => p.velocidade === v);
            if (!grupo.length) return null;
            return (
              <div key={v}>
                {/* Speed header */}
                <div className="max-w-[1320px] mx-auto px-6 mb-4">
                  <div className="flex items-baseline gap-2 pb-3 border-b border-[#333]">
                    <span className="text-5xl font-black text-[#F47B20] leading-none">{v}</span>
                    <span className="text-lg font-bold text-[#666]">{unit}</span>
                  </div>
                </div>

                {/* Horizontal scroll row — idêntico à home */}
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
                    {grupo.map(plano => (
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
            );
          })}
        </div>
      </section>

      {/* SERVIÇOS ADICIONAIS */}
      <section className="bg-[#111] border-b border-[#1e1e1e] py-14 px-6">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-xs font-bold text-[#F47B20] uppercase tracking-widest mb-2">Serviços adicionais</div>
          <h2 className="text-2xl font-black tracking-tight mb-1">Adicione ao seu plano</h2>
          <p className="text-[#555] text-sm mb-8">Contrate separadamente ou já incluso nos planos a partir de 300 Mega.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* TV YPlay */}
            <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col hover:border-[#3a3a3a] transition-all">
              <div className="relative w-24 h-10 mb-4">
                <Image src="/logo-yplay.png" alt="YPlay TV" fill className="object-contain object-left" />
              </div>
              <div className="font-black text-white text-lg mb-1">TV Nova Total</div>
              <div className="text-xs text-[#555] mb-4">118 canais · 51 canais de áudio · 3.000h de filmes</div>
              <ul className="text-[11px] text-[#666] flex flex-col gap-1 mb-4 flex-1">
                <li>— Warner, TNT, Discovery, ESPN, CNN</li>
                <li>— Cartoon Network, History, Sony Channel</li>
                <li>— Stingray Music: 51 canais de áudio</li>
              </ul>
              <div className="flex items-start gap-0.5 mb-4">
                <span className="text-xs text-[#777] mt-1">R$</span>
                <span className="text-4xl font-black text-white leading-none">14</span>
                <span className="text-sm font-bold text-[#888] mt-1">,90/mês</span>
              </div>
              <Link href="/suporte#grade-canais" className="btn btn-outline btn-sm w-full justify-center mb-2">
                Ver grade de canais
              </Link>
              <a href={waMsg("Olá, ClikLink! Tenho interesse em contratar o pacote *TV Nova Total (YPlay)* — 118 canais + 3.000h de filmes. Já sou assinante ClikLink. Podem me dar mais informações?")}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary btn-sm w-full justify-center">
                Contratar via WhatsApp
              </a>
            </div>

            {/* e-Saude */}
            <div className="bg-[#161616] border border-emerald-400/15 rounded-2xl p-6 flex flex-col hover:border-emerald-400/30 transition-all">
              <div className="relative w-14 h-10 mb-4">
                <Image src="/logos/logo-telemedicina.png" alt="e-Saude" fill className="object-contain object-left" />
              </div>
              <div className="font-black text-white text-lg mb-1">e-Saude</div>
              <div className="text-xs text-[#555] mb-4">Telemedicina disponível 24h, 7 dias por semana</div>
              <ul className="text-[11px] text-[#666] flex flex-col gap-1 mb-4 flex-1">
                <li>— Consulta médica online (clínico, pediatra, psicólogo)</li>
                <li>— Atendimento 24h · sem fila · sem sair de casa</li>
                <li>— Descontos em farmácias parceiras</li>
                <li>— Válido para todos do mesmo endereço</li>
              </ul>
              <div className="flex items-start gap-0.5 mb-1">
                <span className="text-xs text-[#777] mt-1">R$</span>
                <span className="text-4xl font-black text-emerald-400 leading-none">14</span>
                <span className="text-sm font-bold text-emerald-700 mt-1">,90/mês</span>
              </div>
              <div className="text-[11px] text-[#F47B20] font-bold mb-1">Assinante ClikLink: R$ 9,90/mês</div>
              <div className="text-[10px] text-emerald-700 mb-4">Incluso sem custo extra nos planos 300M, 600M e 1G</div>
              <a href={waMsg("Olá, ClikLink! Tenho interesse em contratar o *e-Saude* (telemedicina) avulso. Já sou assinante ClikLink. Como faço para ativar?")}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-sm w-full justify-center border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10 transition-all">
                Contratar via WhatsApp
              </a>
            </div>

            {/* CallPet */}
            <div className="bg-[#161616] border border-[rgba(244,123,32,0.15)] rounded-2xl p-6 flex flex-col hover:border-[rgba(244,123,32,0.3)] transition-all">
              <div className="relative w-32 h-10 mb-4">
                <Image src="/logos/logo-callpet.png" alt="CallPet" fill className="object-contain object-left" />
              </div>
              <div className="font-black text-white text-lg mb-1">CallPet</div>
              <div className="text-xs text-[#555] mb-4">Cuidado veterinário online para o seu pet</div>
              <ul className="text-[11px] text-[#666] flex flex-col gap-1 mb-4 flex-1">
                <li>— Consulta com veterinário online (sem sair de casa)</li>
                <li>— Orientação sobre nutrição, vacinas e comportamento</li>
                <li>— Válido para cães, gatos e outros animais</li>
              </ul>
              <div className="flex items-start gap-0.5 mb-1">
                <span className="text-xs text-[#777] mt-1">R$</span>
                <span className="text-4xl font-black text-[#F47B20] leading-none">14</span>
                <span className="text-sm font-bold text-[#F47B20]/50 mt-1">,90/mês</span>
              </div>
              <div className="text-[11px] text-[#F47B20] font-bold mb-1">Assinante ClikLink: R$ 9,90/mês</div>
              <div className="text-[10px] text-[#F47B20]/50 mb-4">Incluso sem custo extra nos planos 300M, 600M e 1G</div>
              <a href={waMsg("Olá, ClikLink! Tenho interesse em contratar o *CallPet* (veterinário online) avulso. Já sou assinante ClikLink. Como faço para ativar?")}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-sm w-full justify-center border border-[rgba(244,123,32,0.3)] text-[#F47B20] hover:bg-[rgba(244,123,32,0.1)] transition-all">
                Contratar via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TABELA */}
      <section className="bg-[#0d0d0d] border-b border-[#1e1e1e] py-14 px-6">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-xs font-bold text-[#F47B20] uppercase tracking-widest mb-2">Tabela completa</div>
          <h2 className="text-2xl font-black tracking-tight mb-6">Todos os {internet.length} planos disponíveis</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#1e1e1e]">
                  <th className="text-left py-3 px-3 text-[#555] font-semibold w-20">Velocidade</th>
                  <th className="text-left py-3 px-3 text-[#555] font-semibold">Descrição</th>
                  <th className="text-center py-3 px-3 text-purple-500 font-semibold">Chip</th>
                  <th className="text-center py-3 px-3 text-emerald-500 font-semibold">e-Saude</th>
                  <th className="text-center py-3 px-3 text-[#888] font-semibold">TV</th>
                  <th className="text-right py-3 px-3 text-[#555] font-semibold">Preço/mês</th>
                  <th className="py-3 px-3 w-20" />
                </tr>
              </thead>
              <tbody>
                {SPEEDS.map(({ v }) => {
                  const grupo = internet.filter(p => p.velocidade === v);
                  return grupo.map((plano, i) => (
                    <tr key={plano.id}
                      className={`border-b border-[#111] hover:bg-[#141414] transition-colors ${
                        plano.featured ? "bg-[rgba(244,123,32,0.03)]" : ""
                      }`}>
                      {i === 0 && (
                        <td className="py-3 px-3 font-black text-[#F47B20] align-top pt-4" rowSpan={grupo.length}>
                          {v}{v === "1" ? "G" : "M"}
                        </td>
                      )}
                      <td className="py-3 px-3 text-[#999]">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span>{plano.descricao}</span>
                          {plano.destaque && (
                            <span className="text-[9px] font-black bg-[#F47B20] text-black px-2 py-0.5 rounded-full">{plano.destaque}</span>
                          )}
                        </div>
                      </td>
                      <td className="text-center py-3 px-3">
                        {plano.chip
                          ? <span className="text-purple-400 font-bold text-xs bg-purple-400/10 px-2 py-0.5 rounded-full">{plano.chip}</span>
                          : <span className="text-[#333]">—</span>}
                      </td>
                      <td className="text-center py-3 px-3">
                        {plano.badges.includes("e-saude")
                          ? <span className="text-emerald-400 font-bold">✓</span>
                          : <span className="text-[#333]">—</span>}
                      </td>
                      <td className="text-center py-3 px-3">
                        {plano.badges.includes("tv")
                          ? <span className="text-[#888] font-bold">✓</span>
                          : <span className="text-[#333]">—</span>}
                      </td>
                      <td className="text-right py-3 px-3 font-black text-white whitespace-nowrap">
                        R$ {plano.preco.toFixed(2).replace(".", ",")}
                      </td>
                      <td className="text-center py-3 px-3">
                        <Link href={`/assinar/${plano.slug}`}
                          className={`btn btn-sm ${plano.featured ? "btn-primary" : "btn-outline"}`}>
                          Assinar
                        </Link>
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA CONDOMÍNIO */}
      <section className="bg-[#111] py-14 px-6">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-[#F47B20] uppercase tracking-widest mb-2">Para síndicos</div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">Planos para o condomínio inteiro</h2>
            <p className="text-[#555] max-w-lg">Infraestrutura dedicada, instalação sem custo, suporte prioritário ao síndico.</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
              {["Projeto personalizado", "e-Saude incluso (300M+)", "CallPet incluso", "Atendimento ao síndico", "Instalação sem custo"].map(i => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#555]">
                  <ChevronRight size={12} className="text-[#F47B20]" /> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <a href={waMsg("Olá, ClikLink! Sou síndico(a) e tenho interesse em contratar internet fibra para o meu condomínio. Gostaria de receber uma proposta personalizada.")}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary btn-lg whitespace-nowrap">
              <MessageCircle size={18} /> Solicitar proposta
            </a>
            <Link href="/condominios" className="btn btn-outline btn-lg text-center">Ver detalhes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
