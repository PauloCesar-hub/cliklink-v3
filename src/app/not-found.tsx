import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada — ClikLink Internet",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-6">
      <div>
        <div className="text-7xl font-black text-[#F47B20] mb-2">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Página não encontrada</h1>
        <p className="text-[#888] mb-8 max-w-sm mx-auto">
          O endereço que você acessou não existe ou foi movido.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn btn-primary">Voltar ao início</Link>
          <Link href="/planos" className="btn btn-outline">Ver planos</Link>
        </div>
      </div>
    </div>
  );
}
