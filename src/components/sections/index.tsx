"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, MessageCircle, Clock, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { SectionTag } from "@/components/ui/index";
import { contatoSchema, type ContatoSchema } from "@/lib/validations";
import { formatPhone, fetchCEP, PHONE, PHONE_HREF, WHATSAPP_URL, HORARIO, ENDERECO } from "@/lib/utils";

// ── HERO ─────────────────────────────────────────────────────
const HERO_SLIDES = [
  { url: "/cond-01.jpeg", alt: "Condomínio atendido pela ClikLink em Araraquara" },
  { url: "/cond-02.jpeg", alt: "Residencial Parque da Sevilha — ClikLink Internet" },
  { url: "/cond-04.jpeg", alt: "Condomínio Canarinho — ClikLink Internet" },
  { url: "/cond-06.jpeg", alt: "Valle Supremo — ClikLink Internet" },
  { url: "/cond-08.jpeg", alt: "Grande condomínio atendido pela ClikLink" },
  { url: "/cond-09.jpeg", alt: "Amis Parque — ClikLink Internet" },
  { url: "/cond-05.jpeg", alt: "Condomínio em Araraquara com fibra ClikLink" },
  { url: "/cond-07.jpeg", alt: "Residencial Jacquesac — ClikLink Internet" },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const advance = useCallback(() => setCurrent(c => (c + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(advance, 5000);
    return () => clearInterval(t);
  }, [advance]);

  return (
    <section
      className="relative overflow-hidden bg-[#0d0d0d] border-b border-[#333] min-h-[520px] md:min-h-[640px] lg:min-h-[700px] flex items-center text-center px-6"
      role="banner"
    >
      {/* Slideshow background */}
      {HERO_SLIDES.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}>
          <Image src={slide.url} alt={slide.alt} fill className="object-cover opacity-[0.55]" sizes="100vw" priority={i === 0} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/80 via-[#0d0d0d]/20 to-[#0d0d0d]/80" />
        </div>
      ))}

      <div className="relative z-10 max-w-[720px] mx-auto w-full py-20 md:py-28">
        <div className="inline-flex items-center gap-2 bg-[rgba(244,123,32,0.12)] border border-[rgba(244,123,32,0.3)] text-[#F47B20] text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide">
          🏢 Araraquara, SP — Especialistas em condomínios
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight tracking-tight text-white mb-4">
          Fibra óptica para<br />
          <span className="text-[#F47B20]">o seu condomínio.</span>
        </h1>

        <p className="text-[#bbb] text-lg mb-3 max-w-[560px] mx-auto leading-relaxed">
          Instalação completa no condomínio — cada morador com sua própria conexão de fibra óptica.
        </p>
        <p className="text-[#777] text-sm mb-8 max-w-[480px] mx-auto">
          Atendemos síndicos e moradores com suporte local em Araraquara. Uma pessoa real sempre disponível.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/#planos" className="btn btn-primary btn-lg shadow-lg shadow-[#F47B20]/20">
            Ver planos e preços
          </Link>
          <Link href="/condominios" className="btn btn-ghost btn-lg">
            <MapPin size={17} /> Para síndicos
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 pt-10 border-t border-[#222] flex flex-wrap justify-center gap-x-8 gap-y-4">
          {[
            { num: "54+", label: "Condomínios atendidos" },
            { num: "100%", label: "Fibra óptica pura" },
            { num: "1 Giga", label: "Velocidade máxima" },
            { num: "Local", label: "Suporte em Araraquara" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-[#F47B20] leading-tight">{s.num}</div>
              <div className="text-xs text-[#666] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Slide dots */}
        <div className="flex justify-center gap-2 mt-8">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all rounded-full ${i === current ? "w-6 h-2 bg-[#F47B20]" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COVERAGE ─────────────────────────────────────────────────
export function CoverageSection() {
  const [cep, setCep] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "nok">("idle");

  function handleCepInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/\D/g, "").slice(0, 8);
    setCep(v.length > 5 ? v.slice(0, 5) + "-" + v.slice(5) : v);
    setStatus("idle");
  }

  async function checkCep() {
    const clean = cep.replace(/\D/g, "");
    if (clean.length < 8) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    // Real: check against your coverage API
    setStatus(clean.startsWith("148") ? "ok" : "nok");
  }

  return (
    <section id="cobertura" className="bg-[#1a1a1a] border-y border-[#333] py-16 px-6">
      <div className="max-w-[1320px] mx-auto">
        <SectionTag>📍 Cobertura</SectionTag>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
          Disponível na sua rua?
        </h2>
        <p className="text-[#888] mb-8">Verifique se a ClikLink atende o seu endereço em Araraquara.</p>

        <div className="bg-[#222] border border-[#333] rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">🗺️</div>
          <h3 className="text-xl font-bold mb-2">Consulte pelo CEP</h3>
          <p className="text-sm text-[#888] mb-5">Digite seu CEP e saiba se a fibra ClikLink chegou no seu endereço</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <input
              type="tel"
              value={cep}
              onChange={handleCepInput}
              onKeyDown={(e) => e.key === "Enter" && checkCep()}
              placeholder="00000-000"
              maxLength={9}
              className="form-input max-w-[200px]"
              aria-label="CEP para verificar cobertura"
            />
            <button onClick={checkCep} className="btn btn-primary btn-lg" disabled={status === "loading"}>
              {status === "loading" ? "Verificando..." : "Verificar cobertura"}
            </button>
          </div>
          <div className="mt-4 min-h-[22px] text-sm font-medium" role="status" aria-live="polite">
            {status === "ok" && (
              <span className="text-green-400 flex items-center justify-center gap-2">
                <CheckCircle size={16} /> Ótima notícia! A ClikLink atende seu endereço.{" "}
                <Link href="/#planos" className="underline font-bold">Ver planos</Link>
              </span>
            )}
            {status === "nok" && (
              <span className="text-[#888] flex items-center justify-center gap-2">
                <AlertCircle size={16} /> CEP sem cobertura. Ligue{" "}
                <a href={PHONE_HREF} className="text-white font-bold">{PHONE}</a> para confirmar.
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 bg-[#222] border border-[#333] rounded-xl px-6 py-4 flex items-center gap-4 flex-wrap">
          <span className="text-3xl">🏢</span>
          <div>
            <div className="font-bold text-white mb-0.5">Sede ClikLink — Araraquara</div>
            <div className="text-sm text-[#888]">{ENDERECO}</div>
            <div className="text-sm text-[#888] mt-0.5">
              <a href={PHONE_HREF} className="hover:text-[#F47B20]">{PHONE}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ─────────────────────────────────────────────
const TESTIMONIALS = [
  { initials: "TM", name: "Thiago Estevam Machado", role: "Morador — Cond. Place Morada do Sol", text: '"Não tenho nada a reclamar da Cliklink. Sem dúvidas foi a única empresa que não me deu trabalho e cumpriu o que prometeu. Ótimo sinal, ótimo atendimento e suporte também."' },
  { initials: "VB", name: "Valter Basílio", role: "Síndico — Cond. Parque Amis", text: '"Tudo ok! Tudo certinho funcionando perfeitamente. Já indiquei para os demais moradores do condomínio e só tenho a agradecer."' },
  { initials: "MC", name: "Maria C.", role: "Cliente ClikLink", text: '"Sempre demonstrando que estão dispostos a ajudar o mais rápido e da melhor forma possível. Serviço impecável desde a instalação."' },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-[1320px] mx-auto">
        <SectionTag>⭐ Depoimentos</SectionTag>
        <h2 className="text-3xl font-black tracking-tight mb-8">O que nossos clientes dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card p-6">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <span key={i} className="text-[#F47B20] text-sm">★</span>)}
              </div>
              <p className="text-sm text-[#ccc] leading-relaxed mb-4 italic">{t.text}</p>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[rgba(244,123,32,0.12)] border border-[rgba(244,123,32,0.25)] flex items-center justify-center font-bold text-xs text-[#F47B20] flex-shrink-0">
                  {t.initials}
                </div>
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
  );
}

// ── FAQ ───────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Como faço para contratar um plano?",
    a: "É simples: entre em contato pelo WhatsApp, ligue para (16) 3014-8884 ou preencha o formulário no site. Nossa equipe entra em contato em até 24h para agendar a visita técnica. A instalação é feita pela nossa equipe local em Araraquara, sem custo adicional.",
  },
  {
    q: "A instalação tem algum custo? E a fidelidade?",
    a: "Não cobramos taxa de instalação e não exigimos fidelidade. Você pode cancelar quando quiser, sem multas. Basta entrar em contato com nossa equipe e cuidamos de tudo.",
  },
  {
    q: "Em quanto tempo a internet fica ativa após contratar?",
    a: "Após assinar, nossa equipe agenda a instalação geralmente em até 3 dias úteis. Em muitos casos conseguimos instalar ainda mais rápido — tudo depende da disponibilidade na sua região.",
  },
  {
    q: "O que é o e-Saude e quem pode usar?",
    a: "O e-Saude é um serviço de telemedicina incluído sem custo extra nos planos a partir de 300 Mega. Você tem acesso a consultas médicas online 24 horas por dia, 7 dias por semana — clínico geral, pediatra, psicólogo e mais. Todos os moradores do mesmo endereço podem usar. Se você tiver um plano de 100 Mega ou quiser contratar separadamente, o valor é R$ 14,90/mês — e para assinantes ClikLink sai por apenas R$ 9,90/mês.",
  },
  {
    q: "O que é o CallPet e como funciona?",
    a: "O CallPet é um serviço de consulta veterinária online. Pelo celular ou computador, você fala com um veterinário sem precisar sair de casa — ideal para dúvidas sobre saúde, vacinas, alimentação e comportamento do seu pet. Incluso nos planos a partir de 300 Mega. Avulso: R$ 14,90/mês (R$ 9,90/mês para assinantes ClikLink).",
  },
  {
    q: "O que é o pacote TV Nova Total (YPlay)?",
    a: "A TV Nova Total é fornecida pela plataforma YPlay e oferece 118 canais de vídeo (Warner, TNT, Discovery, ESPN, CNN, Cartoon Network, History e muitos outros), 51 canais de áudio Stingray Music e mais de 3.000 horas de filmes. Já está incluso nos planos 300M+TV, 600M+TV e 1G. Pode ser contratado separadamente por R$ 14,90/mês, ou R$ 9,90/mês para assinantes ClikLink.",
  },
  {
    q: "Qual a diferença entre os planos com e sem chip?",
    a: "Os planos com chip incluem um chip de internet celular (15G, 20G ou 25G de dados) que você usa em qualquer celular como uma linha de dados. É uma linha adicional — não substitui sua linha de voz. Ideal para quem usa muito o celular fora de casa ou quer dar internet para um familiar.",
  },
  {
    q: "A velocidade é garantida? Cai muito?",
    a: "Nossa rede é 100% fibra óptica, o que garante muito mais estabilidade comparado ao cabo ou rádio. A velocidade contratada é a velocidade real entregue até o seu apartamento. Eventuais variações de Wi-Fi dependem da qualidade do roteador e da distância ao aparelho.",
  },
  {
    q: "Como emitir 2ª via de boleto ou acessar minha conta?",
    a: "Acesse a Central do Assinante em cliklink.sgp.tsmx.com.br/centralweb/login usando o CPF cadastrado. Lá você encontra boletos, histórico de pagamentos e dados do seu plano. Também pode solicitar pelo WhatsApp ou pelo telefone (16) 3014-8884.",
  },
  {
    q: "O que faço se minha internet cair?",
    a: "Primeiro, reinicie o roteador (desligue da tomada, aguarde 30 segundos e ligue novamente). Se o problema persistir, acesse nosso suporte pelo WhatsApp ou ligue (16) 3014-8884. Nossa equipe técnica fica em Araraquara e responde rapidamente.",
  },
  {
    q: "Qual o horário de atendimento?",
    a: `${HORARIO}. Para emergências técnicas fora do horário, deixe mensagem no WhatsApp — retornamos assim que possível.`,
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="bg-[#1a1a1a] border-y border-[#333] py-16 px-6">
      <div className="max-w-[1320px] mx-auto">
        <SectionTag>❓ FAQ</SectionTag>
        <h2 className="text-3xl font-black tracking-tight mb-8">Perguntas frequentes</h2>
        <div className="flex flex-col gap-1.5">
          {FAQS.map((f, i) => (
            <div key={i} className="border border-[#333] rounded-xl overflow-hidden">
              <button
                className="w-full px-5 py-4 text-left font-semibold text-sm flex justify-between items-center bg-[#222] hover:bg-[#2a2a2a] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className={open === i ? "text-[#F47B20]" : "text-white"}>{f.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#888] transition-transform flex-shrink-0 ml-3 ${open === i ? "rotate-180 text-[#F47B20]" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 pt-1 text-sm text-[#aaa] leading-relaxed bg-[#1a1a1a] animate-fadeInUp">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <Link href="/suporte#faq" className="btn btn-outline">
            Ver todas as perguntas
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────
const ASSUNTOS = [
  "Selecione um assunto",
  "Quero assinar um plano",
  "Suporte técnico",
  "Financeiro / Boleto",
  "Plano para condomínio",
  "Outro",
];

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContatoSchema>({
    resolver: zodResolver(contatoSchema),
  });

  async function onSubmit(data: ContatoSchema) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("server error");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contato" className="py-16 px-6">
      <div className="max-w-[1320px] mx-auto">
        <SectionTag>✉️ Contato</SectionTag>
        <h2 className="text-3xl font-black tracking-tight mb-2">Fale com a gente</h2>
        <p className="text-[#888] mb-8">Dúvidas, elogios, sugestões ou críticas? Respondemos rapidinho.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info */}
          <div className="flex flex-col gap-6">
            {[
              { icon: <Phone size={20} />, label: "Telefone", content: <a href={PHONE_HREF} className="text-[#888] hover:text-[#F47B20]">{PHONE}</a> },
              {
                icon: <MessageCircle size={20} />, label: "WhatsApp", content: (
                  <><p className="text-[#888] text-sm">Tire suas dúvidas pelo WhatsApp</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm mt-2 inline-flex">Abrir WhatsApp</a></>
                )
              },
              { icon: <MapPin size={20} />, label: "Endereço", content: <p className="text-[#888] text-sm leading-relaxed">{ENDERECO}</p> },
              { icon: <Clock size={20} />, label: "Horário", content: <p className="text-[#888] text-sm">{HORARIO}</p> },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[rgba(244,123,32,0.12)] border border-[rgba(244,123,32,0.2)] flex items-center justify-center text-[#F47B20] flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-white text-sm mb-1">{item.label}</div>
                  {item.content}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="card p-7">
            <h3 className="font-bold text-white text-base mb-1">Envie uma mensagem</h3>
            <p className="text-xs text-[#888] mb-5">Respondemos em até 1 dia útil</p>

            {status === "success" ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">Mensagem enviada!</h3>
                <p className="text-sm text-[#888]">Retornaremos em até 1 dia útil.</p>
                <button onClick={() => setStatus("idle")} className="btn btn-outline btn-sm mt-4">Enviar outra</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5" noValidate>
                <div>
                  <label className="form-label" htmlFor="c-nome">Nome <span>*</span></label>
                  <input id="c-nome" {...register("nome")} className={`form-input ${errors.nome ? "error" : ""}`} placeholder="Seu nome" />
                  {errors.nome && <p className="form-error">{errors.nome.message}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="c-email">E-mail <span>*</span></label>
                  <input id="c-email" {...register("email")} type="email" className={`form-input ${errors.email ? "error" : ""}`} placeholder="seu@email.com" />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="c-tel">Telefone</label>
                  <input id="c-tel" {...register("telefone")} type="tel" className="form-input" placeholder="(16) 99999-0000" />
                </div>
                <div>
                  <label className="form-label" htmlFor="c-assunto">Assunto <span>*</span></label>
                  <select id="c-assunto" {...register("assunto")} className={`form-input ${errors.assunto ? "error" : ""}`}>
                    {ASSUNTOS.map((a, i) => <option key={a} value={i === 0 ? "" : a}>{a}</option>)}
                  </select>
                  {errors.assunto && <p className="form-error">{errors.assunto.message}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="c-msg">Mensagem <span>*</span></label>
                  <textarea id="c-msg" {...register("mensagem")} rows={3} className={`form-input resize-none ${errors.mensagem ? "error" : ""}`} placeholder="Como podemos ajudar?" />
                  {errors.mensagem && <p className="form-error">{errors.mensagem.message}</p>}
                </div>
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} /> Erro ao enviar. Tente pelo WhatsApp.
                  </div>
                )}
                <button type="submit" disabled={status === "loading"} className="btn btn-primary btn-lg w-full justify-center mt-1">
                  {status === "loading" ? "Enviando..." : "Enviar mensagem"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
