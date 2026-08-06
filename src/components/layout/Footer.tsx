import Link from "next/link";
import Image from "next/image";
import { PORTAL_URL, WHATSAPP_URL, PHONE_HREF, PHONE, ENDERECO, CNPJ } from "@/lib/utils";

type LinkItem = { label: string; href: string; external?: boolean };

const LINKS: Record<string, LinkItem[]> = {
  Serviços: [
    { label: "Planos internet", href: "/planos" },
    { label: "Para condomínios", href: "/condominios" },
    { label: "Verificar cobertura", href: "/#cobertura" },
  ],
  Suporte: [
    { label: "Central do assinante", href: PORTAL_URL, external: true },
    { label: "Suporte técnico", href: "/suporte" },
    { label: "2ª via de boleto", href: PORTAL_URL, external: true },
    { label: "FAQ", href: "/suporte#faq" },
  ],
  Contato: [
    { label: PHONE, href: PHONE_HREF },
    { label: "Fale conosco", href: "/#contato" },
    { label: "WhatsApp", href: WHATSAPP_URL, external: true },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1a1a1a] text-[#888] pt-12 pb-6 px-6">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="mb-4">
              <Image
                src="/logo-cliklink.png"
                alt="ClikLink Internet"
                width={140}
                height={38}
                className="object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-[#555] max-w-[260px]">
              A internet fibra óptica que você merece em Araraquara. Qualidade, velocidade e suporte local para residências e condomínios.
            </p>
            <p className="text-xs text-[#444] mt-3">{CNPJ}</p>
            <p className="text-xs text-[#444] mt-1 leading-relaxed">{ENDERECO}</p>
          </div>
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#555] hover:text-[#F47B20] transition-colors">{l.label}</a>
                    ) : (
                      <Link href={l.href} className="text-sm text-[#555] hover:text-[#F47B20] transition-colors">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1a1a1a] pt-5 flex flex-wrap justify-between items-center gap-2 text-xs text-[#444]">
          <span>© {new Date().getFullYear()} ClikLink Internet Ltda. Todos os direitos reservados.</span>
          <span>Araraquara – SP</span>
        </div>
      </div>
    </footer>
  );
}
