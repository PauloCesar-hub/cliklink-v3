"use client";

import Link from "next/link";
import { SectionTag } from "@/components/ui/index";

const CHANNELS_FEATURED = [
  { name: "TV Globo",        logo: "/logos/globo.svg",           bg: "#1a1a2e" },
  { name: "SBT",             logo: "/logos/sbt.svg",             bg: "#111" },
  { name: "Record",          logo: "/logos/record.png",          bg: "#1a0000" },
  { name: "Band",            logo: "/logos/band.svg",            bg: "#0a1a3a" },
  { name: "CNN Brasil",      logo: "/logos/cnn-brasil.svg",      bg: "#111" },
  { name: "Band News",       logo: "/logos/bandnews.svg",        bg: "#001133" },
  { name: "Band Sports",     logo: "/logos/bandsports.svg",      bg: "#1a2a00" },
  { name: "Warner",          logo: "/logos/warner.png",          bg: "#1a0a00" },
  { name: "TNT",             logo: "/logos/tnt.png",             bg: "#111" },
  { name: "Discovery",       logo: "/logos/discovery.png",       bg: "#002244" },
  { name: "Cartoon Network", logo: "/logos/cartoon-network.png", bg: "#111" },
  { name: "History",         logo: "/logos/history.png",         bg: "#1a1500" },
  { name: "ESPN",            logo: "/logos/espn.png",            bg: "#c8102e" },
  { name: "Sony Channel",    logo: "/logos/sony-channel.png",    bg: "#111" },
  { name: "Animal Planet",   logo: "/logos/animal-planet.png",   bg: "#1a2a00" },
  { name: "TLC",             logo: "/logos/tlc.png",             bg: "#111" },
  { name: "AXN",             logo: "/logos/axn.png",             bg: "#111" },
  { name: "CNN Intern.",     logo: "/logos/cnn.png",             bg: "#c8102e" },
  { name: "Cinemax",         logo: "/logos/cinemax.png",         bg: "#111" },
  { name: "Food Network",    logo: "/logos/food-network.png",    bg: "#f26522" },
];

const ALL_CHANNELS = [
  // Canais abertos / base
  "TV GLOBO","SBT","RECORD","BAND","REDE TV!","TV CULTURA","TV SENADO","TV CÂMARA",
  "TV ESCOLA","RECORD NEWS","CANAL SAÚDE","FRANCE 24","FUTURA","ESPN","GOLF CHANNEL",
  "CANAL DO BOI","CANAL RURAL","COMBATE","FIGHT NETWORK","GOL TV","CANAL BRASIL",
  "CANAL DA MÚSICA","BRAVA TV","CINENEWS","STUDIO UNIVERSAL","SKY NEWS","VICE",
  "AGRO BRASIL TV","GAZETA","GAMETOON","DOCUBOX","FIGHTBOX","HUNT CHANNEL","OFF",
  "KIDS PLAY","INFANTV","GUIA TOTAL","MASTER TV","SISTEMA","INGLÊS","PIGMA",
  "PAULINAS","CANÇÃO NOVA","TV ATIVA","TV JUSTIÇA","PLENITUDE","UNIVESP",
  "TV RECORD","RIC TV","NATAL","SUPRA TV","XVISION","TV3","LITURGIA","JÓIA TV",
  "BEM+TV","AGRO +","CENTRAL TV","C3 TV","IDEAL TV","NGT",
  // Canais exclusivos pacote Total (imagem)
  "WARNER","TNT","SPACE","AXN","SONY CHANNEL","SONY MOVIES","CINEMAX",
  "TNT SERIES","TNT NOVELAS","TCM","A&E","LIFETIME","ADULT SWIM",
  "DISCOVERY KIDS","CARTOON NETWORK","CARTOONITO","TOONCAST",
  "DISCOVERY CHANNEL","HISTORY","HISTORY 2","ANIMAL PLANET",
  "ID - INVESTIGAÇÃO DISCOVERY","DISCOVERY SCIENCE","DISCOVERY WORLD",
  "DISCOVERY THEATER","BANDNEWS","CNN BRASIL","CNN MONEY","BANDSPORTS",
  "DISCOVERY TURBO","FUEL TV","FISH TV","TLC","DISCOVERY HOME & HEALTH",
  "HGTV","FOOD NETWORK","SABOR & ARTE","CHEF TV","ARTE 1","NEW BRASIL",
  "PLAYTV","QELLO CONCERTS","STINGRAY CMUSIC","STINGRAY DJAZZ",
  "STINGRAY CLASSICA","STINGRAY NATURE SCAPE","LÉO & LULLY","URBAN KIDS",
  "URBAN MOVIES","URBAN SERIES","URBAN RETRO","URBAN DRIVE","URBAN TRAVEL",
  "URBAN DOCS","CNN INTERNACIONAL","CNN EN ESPAÑOL","TERRAVIVA","WOOHOO",
];

export function GradeCanaisSection() {
  return (
    <section id="grade-canais" className="bg-[#1a1a1a] border-y border-[#333] py-14 px-6">
      <div className="max-w-[1320px] mx-auto">
        <SectionTag>📺 Grade de canais</SectionTag>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-1">
          TV Nova Total — {ALL_CHANNELS.length} canais
        </h2>
        <p className="text-[#888] mb-8">Incluso nos planos com TV a partir de R$ 14,90/mês.</p>

        {/* Featured logos */}
        <div className="mb-8">
          <div className="text-xs font-bold text-[#F47B20] uppercase tracking-wider mb-4">Canais em destaque</div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
            {CHANNELS_FEATURED.map(ch => (
              <div
                key={ch.name}
                className="rounded-xl border border-[#333] flex flex-col items-center justify-center gap-1 p-2 hover:border-[#F47B20]/50 transition-all"
                style={{ background: ch.bg, minHeight: 60 }}
              >
                {ch.logo ? (
                  <img
                    src={ch.logo}
                    alt={ch.name}
                    className="h-6 w-auto object-contain max-w-[56px]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : null}
                <span className="text-[9px] font-bold text-white/60 text-center leading-tight">{ch.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All channels grid */}
        <div className="mb-6">
          <div className="text-xs font-bold text-[#888] uppercase tracking-wider mb-3">Todos os {ALL_CHANNELS.length} canais</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {ALL_CHANNELS.map(ch => (
              <div key={ch} className="bg-[#222] border border-[#2a2a2a] rounded-lg px-3 py-2 text-xs text-[#aaa] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F47B20] flex-shrink-0" />
                {ch}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Link href="/assinar/tv-total" className="btn btn-primary">
            Assinar TV Total — R$ 14,90/mês
          </Link>
        </div>
        <p className="text-xs text-[#555] mt-3">* Grade sujeita a alterações. Canais podem variar conforme disponibilidade.</p>
      </div>
    </section>
  );
}
