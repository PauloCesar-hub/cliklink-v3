"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, PawPrint, Phone, Pill, Stethoscope, Baby } from "lucide-react";
import { SectionTag } from "@/components/ui/index";

const TELEMEDICINA_ITEMS = [
  { icon: <Stethoscope size={20} />, titulo: "Consulta médica online", desc: "Fale com um médico pelo celular ou computador, a qualquer hora. Sem fila, sem sair de casa." },
  { icon: <Phone size={20} />, titulo: "Atendimento 24 horas", desc: "Orientação médica disponível a qualquer momento, inclusive fins de semana e feriados." },
  { icon: <Pill size={20} />, titulo: "Desconto em farmácias", desc: "Descontos em uma rede de farmácias parceiras em todo o Brasil." },
  { icon: <Baby size={20} />, titulo: "Toda a família", desc: "Benefício para todos os moradores do mesmo endereço." },
];

const CALLPET_ITEMS = [
  { icon: <PawPrint size={20} />, titulo: "Consulta veterinária online", desc: "Converse com veterinários pelo celular e tire dúvidas sobre a saúde do seu pet." },
  { icon: <Heart size={20} />, titulo: "Orientação especializada", desc: "Nutrição, vacinas, comportamento — suporte completo para cuidar do seu animal." },
];

export function BeneficiosSection() {
  return (
    <section id="beneficios" className="py-16 px-6 bg-[#0d0d0d] border-y border-[#333]">
      <div className="max-w-[1320px] mx-auto">

        <SectionTag>🎁 Benefícios inclusos</SectionTag>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-2 mb-2">
          Muito mais do que internet
        </h2>
        <p className="text-[#888] mb-10 max-w-lg">
          Nos planos a partir de 300 Mega, os moradores recebem e-saude e cuidado com pets — sem custo adicional.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* e-Saude */}
          <div className="bg-[#1a1a1a] border border-emerald-400/20 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image src="/logos/logo-telemedicina.png" alt="e-Saude" fill className="object-contain" />
              </div>
              <div>
                <div className="font-black text-white text-lg leading-tight">e-Saude</div>
                <div className="text-xs text-emerald-400 font-semibold">Incluso nos planos 300M, 600M e 1G</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {TELEMEDICINA_ITEMS.map((item) => (
                <div key={item.titulo} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{item.titulo}</div>
                    <div className="text-xs text-[#777] leading-relaxed mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-emerald-400/10 text-xs text-[#666]">
              e-Saude avulsa: <strong className="text-[#888]">R$ 14,90/mês</strong> · Em planos ClikLink: <strong className="text-emerald-400">R$ 9,90/mês</strong>
            </div>
          </div>

          {/* CallPet */}
          <div className="bg-[#1a1a1a] border border-[rgba(244,123,32,0.2)] rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-32 h-14 flex-shrink-0">
                <Image src="/logos/logo-callpet.png" alt="CallPet" fill className="object-contain object-left" />
              </div>
              <div>
                <div className="font-black text-white text-lg leading-tight">CallPet</div>
                <div className="text-xs text-[#F47B20] font-semibold">Cuidado veterinário para seu pet</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {CALLPET_ITEMS.map((item) => (
                <div key={item.titulo} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(244,123,32,0.12)] flex items-center justify-center text-[#F47B20] flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{item.titulo}</div>
                    <div className="text-xs text-[#777] leading-relaxed mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-[rgba(244,123,32,0.1)] text-xs text-[#666]">
              CallPet avulso: <strong className="text-[#888]">R$ 14,90/mês</strong> · Em planos ClikLink: <strong className="text-[#F47B20]">R$ 9,90/mês</strong>
            </div>
            <Link
              href="/planos"
              className="mt-5 btn btn-outline-orange btn-sm w-full justify-center"
            >
              Ver planos com CallPet
            </Link>
          </div>
        </div>

        {/* Grade de canais link */}
        <div className="mt-6 bg-[#1a1a1a] border border-[#333] rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📺</span>
            <div>
              <div className="font-bold text-white">TV Nova Total inclusa</div>
              <div className="text-sm text-[#888]">Canais ao vivo, filmes e séries — nos planos 300M+TV, 600M+TV e 1G</div>
            </div>
          </div>
          <Link href="/suporte#grade-canais" className="btn btn-outline btn-sm flex-shrink-0">
            Ver grade de canais
          </Link>
        </div>
      </div>
    </section>
  );
}
