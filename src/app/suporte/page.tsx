import type { Metadata } from "next";
import { Breadcrumb, SectionTag } from "@/components/ui/index";
import { FAQSection } from "@/components/sections/FAQSection";
import { PORTAL_URL, WHATSAPP_URL, PHONE, PHONE_HREF, HORARIO } from "@/lib/utils";
import { GradeCanaisSection } from "./GradeCanaisSection";

export const metadata: Metadata = {
  title: "Suporte — ClikLink Internet",
  description: "Atendimento humano que resolve de verdade. Suporte técnico, 2ª via de boleto, FAQ e acesso à área do cliente. Equipe local em Araraquara.",
};

const QUICK_ACCESS = [
  {
    icon: "👤",
    title: "Central do assinante",
    desc: "Faturas, boletos e histórico sem precisar ligar. Tudo em segundos.",
    label: "Acessar conta",
    url: PORTAL_URL,
    featured: true,
  },
  {
    icon: "🧾",
    title: "2ª via de boleto",
    desc: "Segunda via emitida na hora. Sem espera, sem enrolação.",
    label: "Emitir boleto",
    url: PORTAL_URL,
  },
  {
    icon: "⚙️",
    title: "Minha conta",
    desc: "Altere plano, dados cadastrais e configure seus serviços.",
    label: "Entrar",
    url: PORTAL_URL,
  },
  {
    icon: "💬",
    title: "WhatsApp",
    desc: "Pessoa real, resposta em minutos. Sem robô, sem menu interminável.",
    label: "Abrir WhatsApp",
    url: WHATSAPP_URL,
    green: true,
  },
  {
    icon: "📞",
    title: "Ligar agora",
    desc: `${PHONE} — equipe local em Araraquara que conhece seu bairro.`,
    label: "Ligar agora",
    url: PHONE_HREF,
  },
  {
    icon: "📱",
    title: "App no celular",
    desc: "Gerencie tudo pelo celular, em qualquer lugar, a qualquer hora.",
    label: "Baixar app",
    url: PORTAL_URL,
  },
];

const TROUBLE = [
  {
    title: "Sem conexão à internet",
    icon: "📵",
    steps: [
      "Veja as luzes do roteador — a luz de internet deve estar verde ou azul estável.",
      "Desligue o roteador da tomada, aguarde 30 segundos e ligue novamente.",
      "Espere 2 minutos completos para o roteador reiniciar por inteiro.",
      "Reconecte seu dispositivo na rede Wi-Fi e teste.",
      "Problema continua? Chame a gente no WhatsApp — resolvemos na hora.",
    ],
  },
  {
    title: "Internet lenta ou travando",
    icon: "🐌",
    steps: [
      "Feche aplicativos e abas abertas que não esteja usando.",
      "Aproxime-se do roteador — distância e paredes afetam o sinal Wi-Fi.",
      "Verifique quantos dispositivos estão conectados ao mesmo tempo.",
      "Reinicie o roteador (desligue, espere 30s, ligue) e refaça o teste.",
      "Teste a velocidade em fast.com — se estiver abaixo do plano, avise a gente.",
    ],
  },
  {
    title: "TV / IPTV sem imagem",
    icon: "📺",
    steps: [
      "Confirme que seu dispositivo está conectado à internet normalmente.",
      "Feche o aplicativo de TV completamente e abra de novo.",
      "Reinicie o aparelho (Smart TV, celular, receptor).",
      "Verifique se seu plano inclui TV e se não há fatura em aberto.",
    ],
  },
  {
    title: "Wi-Fi caindo ou instável",
    icon: "📶",
    steps: [
      "Posicione o roteador em local alto, central e longe do chão.",
      "Afaste de micro-ondas, telefone sem fio e paredes de concreto grosso.",
      "Conecte equipamentos fixos (TV, console de jogos) via cabo ethernet.",
      "Ainda instável? Nossa equipe faz uma visita técnica gratuita para otimizar o sinal.",
    ],
  },
];

export default function SuportePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Suporte" }]} />

      {/* Hero */}
      <div className="bg-[#0d0d0d] border-b border-[#333] py-14 px-6 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[rgba(244,123,32,0.05)] -top-40 -right-20 pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[rgba(244,123,32,0.03)] -bottom-20 -left-10 pointer-events-none" />
        <div className="max-w-[1320px] mx-auto relative z-10">
          <SectionTag>🧑‍💻 Suporte técnico</SectionTag>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3">
            Seu problema tem solução.<br />
            <span className="text-[#F47B20]">E a gente resolve rápido.</span>
          </h1>
          <p className="text-[#888] text-base md:text-lg max-w-2xl mb-6 leading-relaxed">
            Nossa equipe fica em Araraquara. Conhece cada bairro, cada condomínio. Quando você ligar, uma pessoa real vai atender — sem menu de voz interminável, sem robô, sem transferência de ramal em ramal.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              💬 Resolver pelo WhatsApp
            </a>
            <a href={PHONE_HREF} className="btn btn-outline btn-lg">
              📞 {PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Promise bar */}
      <div className="bg-[#F47B20] px-6 py-4">
        <div className="max-w-[1320px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { icon: "⚡", title: "Resposta em minutos", sub: "Não em horas ou dias" },
            { icon: "🧑‍💻", title: "Técnico humano", sub: "Zero robô, zero chatbot" },
            { icon: "🔧", title: "Resolve na ligação", sub: "Maioria dos problemas" },
            { icon: "📍", title: "Equipe local", sub: "Conhece Araraquara de ponta a ponta" },
            { icon: "🚗", title: "Visita gratuita", sub: "Se não resolver remoto" },
          ].map((p) => (
            <div key={p.title} className="flex items-center gap-2.5 text-white">
              <span className="text-2xl">{p.icon}</span>
              <div>
                <div className="font-black text-sm leading-tight">{p.title}</div>
                <div className="text-xs text-white/75">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick access */}
      <section className="py-12 px-6">
        <div className="max-w-[1320px] mx-auto">
          <SectionTag>🚀 Acesso rápido</SectionTag>
          <h2 className="text-2xl font-black tracking-tight mb-1">O que você precisa resolver?</h2>
          <p className="text-[#888] text-sm mb-6">Escolha a opção e resolva agora — sem esperar.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {QUICK_ACCESS.map((c) => (
              <a
                key={c.title}
                href={c.url}
                target={c.url.startsWith("http") ? "_blank" : undefined}
                rel={c.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`card flex flex-col items-center text-center gap-2 p-4 sm:p-6 hover:border-[#F47B20] hover:-translate-y-0.5 transition-all ${c.featured ? "border-[#F47B20] bg-[rgba(244,123,32,0.06)]" : ""}`}
              >
                <span className="text-3xl">{c.icon}</span>
                <h3 className="font-bold text-white text-sm">{c.title}</h3>
                <p className="text-xs text-[#888] leading-relaxed">{c.desc}</p>
                <span className={`btn btn-sm mt-1 ${c.featured ? "btn-primary" : c.green ? "border-[#25d366] text-[#25d366]" : "btn-outline-orange"}`}>
                  {c.label}
                </span>
              </a>
            ))}
          </div>
          <div className="mt-4 bg-[#1a1a1a] border border-[#333] rounded-xl px-5 py-3.5 flex items-center gap-3">
            <span className="text-[#F47B20]">🕐</span>
            <span className="text-sm text-[#888]">
              <strong className="text-white">Horário de atendimento:</strong> {HORARIO}
            </span>
          </div>
        </div>
      </section>

      {/* Como resolvemos */}
      <section className="bg-[#1a1a1a] border-y border-[#333] py-14 px-6">
        <div className="max-w-[1320px] mx-auto">
          <SectionTag>✅ Como funciona</SectionTag>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
            Do contato à solução — sem burocracia
          </h2>
          <p className="text-[#888] mb-10 max-w-xl">
            A maioria dos problemas técnicos é resolvida ainda na primeira conversa. Se precisar de visita, a gente agenda no mesmo dia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: "💬",
                title: "Fale com a gente",
                desc: "WhatsApp, telefone ou portal — você escolhe. Resposta em minutos, não em dias. Uma pessoa real vai te atender.",
                detail: "Tempo médio de resposta: menos de 5 minutos",
              },
              {
                step: "02",
                icon: "🔍",
                title: "Diagnóstico imediato",
                desc: "Nosso técnico identifica o problema ainda no primeiro contato. Sem te transferir pra outro ramal, sem pedir para ligar mais tarde.",
                detail: "+80% dos problemas resolvidos remotamente",
              },
              {
                step: "03",
                icon: "🎯",
                title: "Problema resolvido",
                desc: "Solução na ligação ou visita técnica gratuita agendada para o mesmo dia. Não descansamos enquanto sua internet não voltar.",
                detail: "Visita técnica gratuita se necessário",
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-[#222] border border-[#333] rounded-2xl p-7 overflow-hidden hover:border-[#F47B20]/40 transition-all">
                <div className="absolute -top-3 -left-1 text-[72px] font-black text-[rgba(244,123,32,0.07)] leading-none select-none pointer-events-none">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-black text-white text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed mb-4">{item.desc}</p>
                <div className="text-xs font-bold text-[#F47B20] bg-[rgba(244,123,32,0.08)] border border-[rgba(244,123,32,0.2)] px-3 py-1.5 rounded-lg inline-block">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-14 px-6">
        <div className="max-w-[1320px] mx-auto">
          <SectionTag>🔧 Autoatendimento</SectionTag>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">Problemas comuns — tente isso primeiro</h2>
          <p className="text-[#888] mb-8">
            Resolvemos 80% dos chamados com esses passos. Se não funcionar, chame a gente — chegamos até você.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TROUBLE.map((t) => (
              <div key={t.title} className="card p-6">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                  <span className="text-xl">{t.icon}</span> {t.title}
                </h3>
                <ol className="flex flex-col gap-3">
                  {t.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#aaa]">
                      <span className="w-5 h-5 rounded-full bg-[rgba(244,123,32,0.12)] border border-[rgba(244,123,32,0.25)] flex items-center justify-center text-[10px] font-black text-[#F47B20] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-[#1a1a1a] border border-[rgba(244,123,32,0.3)] rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#F47B20] uppercase tracking-wider mb-1">Ainda não resolveu?</div>
              <div className="text-xl font-bold text-white mb-1">A gente vai até você — de graça</div>
              <div className="text-sm text-[#888]">Visita técnica gratuita agendada no mesmo dia. Nossa equipe conhece Araraquara inteira.</div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">💬 Chamar no WhatsApp</a>
              <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">🎫 Abrir chamado</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Channel grid with logos */}
      <GradeCanaisSection />
    </>
  );
}
