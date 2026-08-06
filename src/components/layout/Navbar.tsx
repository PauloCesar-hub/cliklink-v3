"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { cn, PORTAL_URL } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#planos", label: "Planos" },
  { href: "/condominios", label: "Condomínios" },
  { href: "/celular", label: "Celular" },
  { href: "/suporte", label: "Suporte" },
  { href: "/#contato", label: "Contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#333] bg-[#0d0d0d]"
      role="navigation"
      aria-label="Menu principal"
    >
      <div className="max-w-[1320px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo real */}
        <Link href="/" aria-label="ClikLink Internet — ir para home">
          <Image
            src="/logo-cliklink.png"
            alt="ClikLink Internet"
            width={150}
            height={42}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === l.href || (l.href === "/condominios" && pathname.startsWith("/condominios"))
                  ? "text-[#F47B20] bg-[#222]"
                  : "text-[#aaa] hover:text-white hover:bg-[#222]"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm flex items-center gap-1.5"
          >
            <UserCircle size={15} />
            Minha conta
          </a>
          <Link href="/planos" className="btn btn-primary btn-sm">
            Assine já
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-[#222]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#333] bg-[#0d0d0d] px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#aaa] hover:text-white hover:bg-[#222]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#333]">
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline justify-center"
            >
              <UserCircle size={16} /> Minha conta
            </a>
            <Link href="/planos" className="btn btn-primary justify-center" onClick={() => setOpen(false)}>
              Assine já
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
