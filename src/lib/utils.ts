import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function formatCEP(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.replace(/(\d{5})(\d)/, "$1-$2");
}

export async function fetchCEP(cep: string) {
  const clean = cep.replace(/\D/g, "");
  if (clean.length !== 8) throw new Error("CEP inválido");
  const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
  if (!res.ok) throw new Error("Erro ao buscar CEP");
  const data = await res.json();
  if (data.erro) throw new Error("CEP não encontrado");
  return data;
}

export const PORTAL_URL = "https://cliklink.sgp.tsmx.com.br/centralweb/login";
export const WHATSAPP_URL = "https://wa.me/551630148884";

export function waMsg(msg: string): string {
  return `https://wa.me/551630148884?text=${encodeURIComponent(msg)}`;
}
export const PHONE = "(16) 3014-8884";
export const PHONE_HREF = "tel:1630148884";
export const ENDERECO = "Av. Antonio H. Real, 460 — Vale do Sol, Araraquara – SP, CEP 14804-075";
export const CNPJ = "42.492.254/0001-14";
export const HORARIO = "Seg–Sex 8h às 18h · Sáb 8h às 12h · Dom e feriados: fechado";
