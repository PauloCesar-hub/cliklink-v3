import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PORTAL_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Minha Conta — ClikLink Internet",
  description: "Acesse sua conta ClikLink. Gerencie faturas, boletos e contratos.",
};

// This page immediately redirects to the customer portal
export default function MinhaContaPage() {
  redirect(PORTAL_URL);
}
