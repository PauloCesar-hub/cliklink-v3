"use client";

import { useEffect } from "react";
import { PORTAL_URL } from "@/lib/utils";

export default function SegundaViaPage() {
  useEffect(() => {
    window.location.replace(PORTAL_URL);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div>
        <p className="text-[#888] mb-4">Redirecionando para a 2ª via de boleto...</p>
        <a href={PORTAL_URL} className="btn btn-primary">Clique aqui se não for redirecionado</a>
      </div>
    </div>
  );
}
