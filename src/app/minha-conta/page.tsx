"use client";

import { useEffect } from "react";
import type { Metadata } from "next";
import { PORTAL_URL } from "@/lib/utils";

export default function MinhaContaPage() {
  useEffect(() => {
    window.location.replace(PORTAL_URL);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div>
        <p className="text-[#888] mb-4">Redirecionando para a central do assinante...</p>
        <a href={PORTAL_URL} className="btn btn-primary">Clique aqui se não for redirecionado</a>
      </div>
    </div>
  );
}
