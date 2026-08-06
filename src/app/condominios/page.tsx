"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2, MapPin, Check, ChevronLeft, ChevronRight,
  Phone, MessageCircle, Wifi, Star, Users, Zap, Search,
  Stethoscope, PawPrint,
} from "lucide-react";
import { CONDOMINIOS, TOTAL_CONDOMINIOS, type Condominio } from "@/lib/condominios";
import { WHATSAPP_URL, PHONE, PHONE_HREF } from "@/lib/utils";

// ── SLIDESHOW ────────────────────────────────────────────────
const SLIDESHOW_IMAGES = [
  { url: "/cond-01.jpeg", caption: "Condomínios de Araraquara conectados pela ClikLink" },
  { url: "/cond-02.jpeg", caption: "Residencial Parque da Sevilha — fibra óptica ClikLink" },
  { url: "/cond-03.jpeg", caption: "Infraestrutura dedicada para cada condomínio" },
  { url: "/cond-04.jpeg", caption: "Condomínio Canarinho — internet fibra para todos os moradores" },
  { url: "/cond-06.jpeg", caption: "Valle Supremo — conectividade de alta qualidade" },
  { url: "/cond-07.jpeg", caption: "Residencial Jacquesac — suporte local em Araraquara" },
  { url: "/cond-08.jpeg", caption: "Atendemos mais de 54 condomínios em Araraquara" },
  { url: "/cond-09.jpeg", caption: "Amis Parque — fibra óptica pura" },
];

function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDESHOW_IMAGES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length), []);

  useEffect(() => {
    if (!playing) return;
    timer.current = setTimeout(next, 5000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [current, playing, next]);

  return (
    <div className="relative w-full h-[440px] sm:h-[500px] md:h-[520px] lg:h-[620px] overflow-hidden"
      onMouseEnter={() => setPlaying(false)} onMouseLeave={() => setPlaying(true)}>
      {SLIDESHOW_IMAGES.map((img, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}>
          <Image src={img.url} alt={img.caption} fill className="object-cover" priority={i === 0} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <Image src="/logo-cliklinkSF.png" alt="ClikLink Internet" width={220} height={60} className="mb-6 drop-shadow-2xl" priority />
        <div className="inline-flex items-center gap-2 bg-[#F47B20]/20 border border-[#F47B20]/40 text-[#F47B20] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide">
          <Building2 size={13} /> Especialistas em condomínios
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-3 drop-shadow-lg">
          Internet fibra óptica<br /><span className="text-[#F47B20]">para condomínios</span>
        </h1>
        <p className="text-white/80 text-base md:text-lg max-w-xl mb-5 md:mb-8 drop-shadow">{SLIDESHOW_IMAGES[current].caption}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg shadow-xl">
            <MessageCircle size={18} /> Solicitar proposta pelo WhatsApp
          </a>
          <a href={PHONE_HREF} className="btn btn-ghost btn-lg">
            <Phone size={18} /> {PHONE}
          </a>
        </div>
      </div>
      <button onClick={prev} className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm items-center justify-center text-white hover:bg-[#F47B20] transition-colors z-20" aria-label="Slide anterior"><ChevronLeft size={20} /></button>
      <button onClick={next} className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm items-center justify-center text-white hover:bg-[#F47B20] transition-colors z-20" aria-label="Próximo slide"><ChevronRight size={20} /></button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDESHOW_IMAGES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`transition-all rounded-full ${i === current ? "w-6 h-2 bg-[#F47B20]" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
            aria-label={`Ir para slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

const STATS = [
  { icon: <Building2 size={20} />, num: "54+",   label: "Condomínios atendidos" },
  { icon: <Users size={20} />,    num: "1.000+", label: "Moradores conectados" },
  { icon: <Zap size={20} />,      num: "100%",   label: "Fibra óptica pura" },
  { icon: <Star size={20} />,     num: "4.9★",   label: "Avaliação dos síndicos" },
];

// ── LISTA DE CONDOMÍNIOS ──────────────────────────────────────
function CondominioList() {
  const [search, setSearch] = useState("");

  const filtered = CONDOMINIOS.filter((c: Condominio) =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.bairro.toLowerCase().includes(search.toLowerCase()) ||
    c.endereco.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Busca */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-3.5 text-[#555]" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome, bairro ou endereço..."
          className="form-input pl-11 text-sm"
        />
      </div>

      <div className="text-xs text-[#555] mb-4">
        {filtered.length} de {TOTAL_CONDOMINIOS} condomínios
        {search && ` para "${search}"`}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((c: Condominio) => (
          <div
            key={c.id}
            className="bg-[#222] border border-[#333] rounded-xl px-4 py-3 hover:border-[#F47B20]/40 transition-colors"
          >
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-[#F47B20] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm leading-tight">{c.nome}</div>
                <div className="text-xs text-[#666] mt-0.5 leading-relaxed">{c.endereco}</div>
                <div className="text-xs text-[#555] mt-0.5">CEP {c.cep}</div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-[#555]">
            <Building2 size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhum condomínio encontrado para &quot;{search}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function CondominiosPage() {
  return (
    <div className="bg-[#0d0d0d] min-h-screen">

      <Slideshow />

      {/* STATS BAR */}
      <div className="bg-[#F47B20] px-6 py-4">
        <div className="max-w-[1320px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="flex items-center gap-2.5 text-white">
              <div className="opacity-80">{s.icon}</div>
              <div>
                <div className="font-black text-xl leading-tight">{s.num}</div>
                <div className="text-xs text-white/80">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <section className="py-16 px-6">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-tag mb-4">🏢 Por que escolher a ClikLink</div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                A internet que os<br /><span className="text-[#F47B20]">síndicos confiam</span>
              </h2>
              <p className="text-[#888] leading-relaxed mb-6">
                Somos especialistas em conectividade para condomínios residenciais em Araraquara. Fibra óptica instalada no condomínio — cada morador com sua própria conexão estável.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  "Projeto de rede personalizado para cada condomínio",
                  "Infraestrutura 100% dedicada — sem compartilhamento",
                  "e-Saude incluso a partir de 300 Mega",
                  "CallPet — consulta veterinária online para seu pet",
                  "Suporte técnico prioritário para síndicos",
                  "Sem fidelidade obrigatória",
                  "Instalação sem custo",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#ccc]">
                    <Check size={16} className="text-[#F47B20] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  <MessageCircle size={18} /> Solicitar proposta
                </a>
                <a href={PHONE_HREF} className="btn btn-outline btn-lg"><Phone size={16} /> {PHONE}</a>
              </div>
            </div>
            <div className="relative">
              <Image src="/cond-05.jpeg"
                alt="Condomínio atendido pela ClikLink em Araraquara" width={600} height={440}
                className="rounded-2xl object-cover w-full" />
              <div className="absolute bottom-3 left-3 md:-bottom-4 md:-left-4 bg-[#F47B20] rounded-2xl p-4 shadow-xl shadow-[#F47B20]/20">
                <div className="text-white font-black text-3xl leading-none">54+</div>
                <div className="text-white/80 text-xs">condomínios<br />atendidos</div>
              </div>
              <div className="absolute top-3 right-3 md:-top-4 md:-right-4 bg-[#222] border border-[#333] rounded-2xl p-4">
                <div className="flex items-center gap-2 text-[#F47B20] font-black text-lg">
                  <Wifi size={20} /> 1 Giga
                </div>
                <div className="text-[#888] text-xs">velocidade máxima</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS — TELEMEDICINA + TELPET */}
      <section className="bg-[#1a1a1a] border-y border-[#333] py-12 px-6">
        <div className="max-w-[1320px] mx-auto">
          <div className="section-tag mb-4">🎁 Benefícios inclusos nos planos</div>
          <h2 className="text-2xl font-black tracking-tight mb-6">
            Muito mais do que internet para o seu condomínio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* e-Saude */}
            <div className="bg-[#222] border border-emerald-400/20 rounded-2xl p-6 flex gap-4">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image src="/logos/logo-telemedicina.png" alt="e-Saude" fill className="object-contain" />
              </div>
              <div>
                <div className="font-black text-white text-base leading-tight">e-Saude</div>
                <div className="text-xs text-emerald-400 font-semibold mb-2">Incluso nos planos 300M, 600M e 1G</div>
                <p className="text-sm text-[#888] leading-relaxed">
                  Consulta médica online, orientação 24h, desconto em farmácias — para todos os moradores do apartamento, sem custo adicional.
                </p>
              </div>
            </div>
            {/* CallPet */}
            <div className="bg-[#222] border border-[rgba(244,123,32,0.2)] rounded-2xl p-6 flex gap-4">
              <div className="relative w-32 h-14 flex-shrink-0">
                <Image src="/logos/logo-callpet.png" alt="CallPet" fill className="object-contain object-left" />
              </div>
              <div>
                <div className="font-black text-white text-base leading-tight">CallPet</div>
                <div className="text-xs text-[#F47B20] font-semibold mb-2">Cuidado veterinário para seu pet</div>
                <p className="text-sm text-[#888] leading-relaxed">
                  Consulta veterinária online, orientação sobre nutrição, vacinas e comportamento — para os pets dos moradores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENTRAR EM CONTATO */}
      <section className="bg-[#1a1a1a] border-y border-[#333] py-14 px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="section-tag mb-4">📞 Entre em contato</div>
          <h2 className="text-3xl font-black tracking-tight mb-3">Quer levar a ClikLink ao seu condomínio?</h2>
          <p className="text-[#888] mb-8 max-w-md mx-auto">
            Fale com nossa equipe e receba uma proposta gratuita e personalizada para o seu condomínio.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <MessageCircle size={18} /> Falar no WhatsApp
            </a>
            <Link href="/#contato" className="btn btn-outline btn-lg">
              Enviar mensagem
            </Link>
            <a href={PHONE_HREF} className="btn btn-ghost btn-lg">
              <Phone size={16} /> {PHONE}
            </a>
          </div>
          <p className="text-xs text-[#555]">Seg–Sex 8h–18h · Sáb 8h–12h · Sem compromisso</p>
        </div>
      </section>

      {/* LISTA DE CONDOMÍNIOS */}
      <section id="condominios" className="py-16 px-6">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center mb-8">
            <div className="section-tag">📍 Onde atendemos</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-1">
              {TOTAL_CONDOMINIOS} condomínios em Araraquara
            </h2>
            <p className="text-[#888] mt-2">
              Veja se o seu condomínio já é atendido pela ClikLink
            </p>
          </div>

          <CondominioList />

          <div className="mt-8 text-center">
            <p className="text-[#888] text-sm mb-4">Não encontrou seu condomínio?</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle size={16} /> Fale conosco — expandimos constantemente
            </a>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-[#1a1a1a] border-y border-[#333] py-16 px-6">
        <div className="max-w-[1320px] mx-auto">
          <div className="section-tag mb-4">⭐ Depoimentos</div>
          <h2 className="text-3xl font-black tracking-tight mb-8">O que os síndicos dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { initials: "VB", name: "Valter Basílio",          role: "Síndico — Parque Amis",              text: '"Tudo ok! Funcionando perfeitamente. Já indiquei para os demais moradores e só tenho a agradecer."' },
              { initials: "TM", name: "Thiago Estevam Machado",  role: "Morador — Place Morada do Sol",      text: '"A única empresa que não me deu trabalho e cumpriu o que prometeu. Ótimo sinal e ótimo suporte."' },
              { initials: "MC", name: "Maria C.",                 role: "Síndica — Condomínio em Araraquara", text: '"Sempre dispostos a ajudar da melhor forma. Serviço impecável desde a instalação."' },
            ].map(t => (
              <div key={t.name} className="bg-[#222] border border-[#333] rounded-2xl p-6">
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <span key={i} className="text-[#F47B20]">★</span>)}</div>
                <p className="text-sm text-[#ccc] leading-relaxed mb-4 italic">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[rgba(244,123,32,0.12)] border border-[rgba(244,123,32,0.25)] flex items-center justify-center font-bold text-xs text-[#F47B20] flex-shrink-0">{t.initials}</div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-[#888]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-3xl font-black tracking-tight mb-3">
            Pronto para contratar?
          </h2>
          <p className="text-[#888] mb-8">
            Nossa equipe entra em contato rapidamente e monta a melhor solução para o seu condomínio.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <MessageCircle size={18} /> Falar no WhatsApp
            </a>
            <Link href="/planos" className="btn btn-outline btn-lg">Ver planos</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
