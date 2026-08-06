import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, SectionTag } from "@/components/ui/index";
import { WHATSAPP_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Planos Celular — ClikLink",
  description: "Planos de celular ClikLink em Araraquara. 15G, 20G e 25G com ativação de R$50. Vantagens exclusivas para clientes ClikLink.",
};

const PLANOS_CELULAR = [
  {
    gigas: "15G",
    preco: 49.90,
    segundaLinha: 40.00,
    ativacao: 50.00,
    destaque: false,
  },
  {
    gigas: "20G",
    preco: 59.90,
    segundaLinha: 56.00,
    ativacao: 50.00,
    destaque: true,
  },
  {
    gigas: "25G",
    preco: 74.90,
    segundaLinha: 70.00,
    ativacao: 50.00,
    destaque: false,
  },
];

function formatR(val: number) {
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CelularPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Planos Celular" }]} />

      {/* Hero */}
      <div className="bg-[#0d0d0d] border-b border-[#333] py-12 px-6">
        <div className="max-w-[1320px] mx-auto">
          <SectionTag>📱 Celular</SectionTag>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            Planos de celular<br />
            <span className="text-[#F47B20]">para moradores ClikLink</span>
          </h1>
          <p className="text-[#888] max-w-lg">
            Chip de celular com dados para usar junto com sua internet fibra. Ativação única de R$ 50,00.
          </p>
        </div>
      </div>

      {/* Planos */}
      <section className="py-14 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANOS_CELULAR.map((p) => (
              <div
                key={p.gigas}
                className={`rounded-2xl border p-7 flex flex-col transition-all hover:-translate-y-0.5 ${
                  p.destaque
                    ? "border-[#F47B20] bg-[rgba(244,123,32,0.06)]"
                    : "border-[#333] bg-[#2a2a2a] hover:border-[#F47B20]"
                }`}
              >
                {p.destaque && (
                  <div className="text-[11px] font-bold tracking-wide uppercase mb-3 px-2.5 py-1 rounded-full self-start border text-[#F47B20] bg-[rgba(244,123,32,0.1)] border-[rgba(244,123,32,0.3)]">
                    Mais escolhido
                  </div>
                )}

                {/* Gigas */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-[64px] font-black text-[#F47B20] leading-none tracking-tight">
                    {p.gigas.replace("G", "")}
                  </span>
                  <span className="text-2xl font-bold text-[#aaa]">GB</span>
                </div>

                {/* Preço */}
                <div className="flex items-start gap-1 mb-6">
                  <span className="text-sm font-bold text-[#888] pt-2">R$</span>
                  <span className="text-[52px] font-black text-white leading-none tracking-tight">
                    {Math.floor(p.preco)}
                  </span>
                  <div className="pt-2">
                    <span className="text-sm font-bold text-white">,{p.preco.toFixed(2).split(".")[1]}</span>
                    <span className="block text-xs text-[#888]">/mês</span>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="flex flex-col gap-3 mb-6 flex-1">
                  <div className="flex items-center justify-between text-sm border-b border-[#333] pb-3">
                    <span className="text-[#888]">2ª linha</span>
                    <span className="font-bold text-white">{formatR(p.segundaLinha)}/mês</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#888]">Ativação (única)</span>
                    <span className="font-bold text-white">{formatR(p.ativacao)}</span>
                  </div>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn w-full justify-center text-base py-3 ${p.destaque ? "btn-primary" : "btn-outline-orange"}`}
                >
                  Contratar pelo WhatsApp
                </a>
              </div>
            ))}
          </div>

          {/* Aviso */}
          <div className="mt-8 bg-[#1a1a1a] border border-[#333] rounded-2xl p-6">
            <h3 className="font-bold text-white mb-3 text-lg">ℹ️ Informações importantes</h3>
            <ul className="flex flex-col gap-2 text-sm text-[#888]">
              <li className="flex items-start gap-2"><span className="text-[#F47B20] mt-0.5">•</span> Planos disponíveis exclusivamente para moradores de condomínios atendidos pela ClikLink.</li>
              <li className="flex items-start gap-2"><span className="text-[#F47B20] mt-0.5">•</span> Ativação de <strong className="text-white">R$ 50,00</strong> cobrada uma única vez por chip.</li>
              <li className="flex items-start gap-2"><span className="text-[#F47B20] mt-0.5">•</span> A segunda linha tem desconto especial para clientes que já possuem internet ClikLink.</li>
              <li className="flex items-start gap-2"><span className="text-[#F47B20] mt-0.5">•</span> Para contratar, fale com nossa equipe pelo WhatsApp.</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <p className="text-[#888] mb-4">Ainda não tem internet fibra ClikLink no seu condomínio?</p>
            <Link href="/condominios" className="btn btn-primary btn-lg">
              Saiba como levar a ClikLink para o seu condomínio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
