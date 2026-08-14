"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCircle, Search, Building2, ChevronDown } from "lucide-react";
import { Breadcrumb, PlanBadge } from "@/components/ui/index";
import { getPlanoBySlug, formatPreco } from "@/lib/planos";
import { assinaturaSchema, type AssinaturaSchema } from "@/lib/validations";
import { formatCPF, formatPhone, formatCEP, fetchCEP, WHATSAPP_URL, PORTAL_URL } from "@/lib/utils";
import { CONDOMINIOS } from "@/lib/condominios";
import type { Plano, PlanoBadge } from "@/types";

const WA_NUMBER = "551630148884";

const STEPS = ["Seus dados", "WhatsApp"];

// ── Condo picker ──────────────────────────────────────────────
function CondoPicker({ onSelect }: { onSelect: (c: typeof CONDOMINIOS[0] | null) => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof CONDOMINIOS[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.length === 0
    ? CONDOMINIOS
    : CONDOMINIOS.filter(c =>
        c.nome.toLowerCase().includes(query.toLowerCase()) ||
        c.bairro.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function pick(c: typeof CONDOMINIOS[0]) {
    setSelected(c);
    setQuery(c.nome);
    setOpen(false);
    onSelect(c);
  }

  function clear() {
    setSelected(null);
    setQuery("");
    onSelect(null);
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Building2 size={15} className="absolute left-3 top-3.5 text-[#555]" />
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); if (selected) { setSelected(null); onSelect(null); } }}
          onFocus={() => setOpen(true)}
          placeholder="Busque pelo nome do condomínio..."
          className="form-input pl-9 pr-9"
        />
        {selected
          ? <button type="button" onClick={clear} className="absolute right-3 top-3 text-[#555] hover:text-white text-lg leading-none">×</button>
          : <ChevronDown size={15} className="absolute right-3 top-3.5 text-[#555] pointer-events-none" />
        }
      </div>

      {open && !selected && filtered.length > 0 && (
        <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden shadow-xl max-h-64 overflow-y-auto">
          {filtered.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => pick(c)}
              className="w-full text-left px-4 py-3 hover:bg-[#252525] transition-colors border-b border-[#222] last:border-0"
            >
              <div className="text-sm font-semibold text-white">{c.nome}</div>
              <div className="text-xs text-[#555] mt-0.5">{c.endereco} · {c.bairro}</div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="mt-2 bg-[rgba(244,123,32,0.06)] border border-[rgba(244,123,32,0.2)] rounded-xl px-4 py-3 flex items-center gap-2">
          <Check size={14} className="text-[#F47B20] flex-shrink-0" />
          <div>
            <div className="text-sm font-bold text-white">{selected.nome}</div>
            <div className="text-xs text-[#888]">{selected.endereco} · CEP {selected.cep}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AssinarPageClient({ slug }: { slug: string }) {
  const plano = getPlanoBySlug(slug);

  const [step, setStep] = useState(0);
  const [cepLoading, setCepLoading] = useState(false);

  const {
    register, handleSubmit, setValue, watch, formState: { errors },
  } = useForm<AssinaturaSchema>({
    resolver: zodResolver(assinaturaSchema),
    defaultValues: {
      planoId: plano?.id ?? "",
      planoNome: plano?.nome ?? "",
      planoPreco: plano?.preco ?? 0,
      cidade: "Araraquara",
      uf: "SP",
    },
  });

  useEffect(() => {
    if (plano) {
      setValue("planoId", plano.id);
      setValue("planoNome", plano.nome);
      setValue("planoPreco", plano.preco);
    }
  }, [plano, setValue]);

  if (!plano) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Plano não encontrado</h1>
          <p className="text-[#888] mb-6">O plano que você buscou não existe.</p>
          <Link href="/planos" className="btn btn-primary">Ver todos os planos</Link>
        </div>
      </div>
    );
  }

  function handleCondoSelect(c: typeof CONDOMINIOS[0] | null) {
    if (!c) return;
    // Parse endereco: "Rua X, 123" → rua + numero
    const parts = c.endereco.split(",");
    const rua = parts[0]?.trim() ?? c.endereco;
    const numero = parts[1]?.trim() ?? "";
    setValue("nomeCondominio", c.nome);
    setValue("rua", rua);
    setValue("numero", numero);
    setValue("bairro", c.bairro);
    setValue("cep", c.cep);
    setValue("cidade", "Araraquara");
    setValue("uf", "SP");
  }

  async function handleCepBlur() {
    const cep = watch("cep")?.replace(/\D/g, "");
    if (cep?.length !== 8) return;
    setCepLoading(true);
    try {
      const data = await fetchCEP(cep);
      setValue("rua", data.logradouro || "");
      setValue("bairro", data.bairro || "");
      setValue("cidade", data.localidade || "Araraquara");
      setValue("uf", data.uf || "SP");
    } catch { /* silent */ } finally { setCepLoading(false); }
  }

  function onSubmit(data: AssinaturaSchema) {
    const lines = [
      `🌐 *Nova Solicitação de Plano — ClikLink*`,
      ``,
      `📦 *PLANO SOLICITADO*`,
      `Plano: ${data.planoNome}`,
      `Valor: R$ ${data.planoPreco.toFixed(2).replace(".", ",")} /mês`,
      ``,
      `👤 *DADOS PESSOAIS*`,
      `Nome: ${data.nome}`,
      `CPF: ${data.cpf}`,
      data.dataNascimento ? `Nascimento: ${data.dataNascimento}` : null,
      `E-mail: ${data.email}`,
      `WhatsApp: ${data.telefone}`,
      ``,
      `🏠 *ENDEREÇO DE INSTALAÇÃO*`,
      data.nomeCondominio ? `Condomínio: ${data.nomeCondominio}` : null,
      `CEP: ${data.cep}`,
      `Endereço: ${data.rua}, ${data.numero}${data.complemento ? ` — ${data.complemento}` : ""}`,
      `Bairro: ${data.bairro}`,
      `Cidade: ${data.cidade}/${data.uf}`,
      data.observacoes ? `\n💬 *OBSERVAÇÕES*\n${data.observacoes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank");
    setStep(1);
  }

  const isCondominio = plano.categoria === "condominio";

  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Planos", href: "/planos" }, { label: `Assinar: ${plano.nome}` }]} />

      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-[#333] py-10 px-6">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-xs font-bold text-[#F47B20] uppercase tracking-widest mb-3">Contratação</div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Assinar: <span className="text-[#F47B20]">{plano.nome}</span>
          </h1>
          <p className="text-[#888] mt-2">Preencha seus dados e nossa equipe entra em contato para finalizar a instalação.</p>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-[#0d0d0d] border-b border-[#222] px-6 py-4">
        <div className="max-w-[1320px] mx-auto flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                i < step ? "bg-[#F47B20] text-black" : i === step ? "bg-[#F47B20] text-black" : "bg-[#222] text-[#555]"
              }`}>
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${i === step ? "text-[#F47B20]" : i < step ? "text-white" : "text-[#444]"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-2 ${i < step ? "bg-[#F47B20]" : "bg-[#222]"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* FORM */}
          <div>
            {step === 0 ? (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">

                {/* Dados pessoais */}
                <div className="bg-[#111] border border-[#222] rounded-2xl p-7">
                  <div className="text-xs font-bold text-[#F47B20] uppercase tracking-widest mb-5 pb-3 border-b border-[#222]">
                    Dados pessoais
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="form-label" htmlFor="f-nome">Nome completo <span>*</span></label>
                      <input id="f-nome" {...register("nome")} className={`form-input ${errors.nome ? "error" : ""}`} placeholder="Seu nome completo" autoComplete="name" />
                      {errors.nome && <p className="form-error">{errors.nome.message}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="f-cpf">CPF <span>*</span></label>
                      <input id="f-cpf" {...register("cpf")} className={`form-input ${errors.cpf ? "error" : ""}`} placeholder="000.000.000-00"
                        onChange={e => setValue("cpf", formatCPF(e.target.value))} />
                      {errors.cpf && <p className="form-error">{errors.cpf.message}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="f-nasc">Data de nascimento</label>
                      <input id="f-nasc" {...register("dataNascimento")} type="date" className="form-input" autoComplete="bday" />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="f-email">E-mail <span>*</span></label>
                      <input id="f-email" {...register("email")} type="email" className={`form-input ${errors.email ? "error" : ""}`} placeholder="seu@email.com" autoComplete="email" />
                      {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="f-tel">WhatsApp / Telefone <span>*</span></label>
                      <input id="f-tel" {...register("telefone")} className={`form-input ${errors.telefone ? "error" : ""}`} placeholder="(16) 99999-0000" autoComplete="tel"
                        onChange={e => setValue("telefone", formatPhone(e.target.value))} />
                      {errors.telefone && <p className="form-error">{errors.telefone.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="bg-[#111] border border-[#222] rounded-2xl p-7">
                  <div className="text-xs font-bold text-[#F47B20] uppercase tracking-widest mb-5 pb-3 border-b border-[#222]">
                    Endereço de instalação
                  </div>

                  {/* Condo selector */}
                  <div className="mb-5">
                    <label className="form-label">Selecione seu condomínio <span className="text-[#555] font-normal normal-case">(opcional — preenche o endereço automaticamente)</span></label>
                    <CondoPicker onSelect={handleCondoSelect} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="form-label" htmlFor="f-cep">CEP <span>*</span></label>
                      <div className="relative">
                        <input id="f-cep" {...register("cep")} className={`form-input pr-10 ${errors.cep ? "error" : ""}`} placeholder="00000-000" maxLength={9}
                          onChange={e => setValue("cep", formatCEP(e.target.value))} onBlur={handleCepBlur} />
                        <Search size={15} className={`absolute right-3 top-3.5 ${cepLoading ? "text-[#F47B20] animate-spin-slow" : "text-[#555]"}`} />
                      </div>
                      {errors.cep && <p className="form-error">{errors.cep.message}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="form-label" htmlFor="f-rua">Rua / Av. <span>*</span></label>
                      <input id="f-rua" {...register("rua")} className={`form-input ${errors.rua ? "error" : ""}`} placeholder="Nome da rua" />
                      {errors.rua && <p className="form-error">{errors.rua.message}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="f-num">Número <span>*</span></label>
                      <input id="f-num" {...register("numero")} className={`form-input ${errors.numero ? "error" : ""}`} placeholder="123" />
                      {errors.numero && <p className="form-error">{errors.numero.message}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="f-comp">Complemento</label>
                      <input id="f-comp" {...register("complemento")} className="form-input" placeholder="Apto, Bloco..." />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="f-bairro">Bairro <span>*</span></label>
                      <input id="f-bairro" {...register("bairro")} className={`form-input ${errors.bairro ? "error" : ""}`} placeholder="Bairro" />
                      {errors.bairro && <p className="form-error">{errors.bairro.message}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="form-label" htmlFor="f-condo">Nome do condomínio</label>
                      <input id="f-condo" {...register("nomeCondominio")} className="form-input" placeholder="Ex: Residencial Parque do Sol" />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="f-cidade">Cidade <span>*</span></label>
                      <input id="f-cidade" {...register("cidade")} className={`form-input ${errors.cidade ? "error" : ""}`} />
                      {errors.cidade && <p className="form-error">{errors.cidade.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Obs + LGPD */}
                <div className="bg-[#111] border border-[#222] rounded-2xl p-7">
                  <div className="text-xs font-bold text-[#F47B20] uppercase tracking-widest mb-5 pb-3 border-b border-[#222]">
                    Observações
                  </div>
                  <div>
                    <label className="form-label" htmlFor="f-obs">Informações adicionais</label>
                    <textarea id="f-obs" {...register("observacoes")} rows={3} className="form-input resize-none"
                      placeholder="Melhor horário para contato, andar do apartamento, porteiro..." />
                  </div>
                  <div className="mt-4 p-4 bg-[#1a1a1a] rounded-xl border border-[#222]">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" {...register("aceiteLgpd")} className="mt-0.5 accent-[#F47B20] w-4 h-4 flex-shrink-0" />
                      <span className="text-xs text-[#aaa] leading-relaxed">
                        Concordo com o tratamento dos meus dados pessoais pela ClikLink Internet para fins de contato e contratação de serviços.{" "}
                        <Link href="#" className="text-[#F47B20]">Política de privacidade</Link>. <span className="text-[#F47B20]">*</span>
                      </span>
                    </label>
                    {errors.aceiteLgpd && <p className="form-error mt-2">{errors.aceiteLgpd.message}</p>}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-full justify-center gap-2 text-base">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.112 1.529 5.835L.057 23.522a.5.5 0 0 0 .614.634l5.857-1.535A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.373l-.36-.213-3.477.911.927-3.38-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>
                  Enviar pelo WhatsApp
                </button>
                <p className="text-xs text-[#555] text-center">
                  Seus dados serão enviados direto para o WhatsApp da ClikLink. Nossa equipe responde em minutos.
                </p>
              </form>
            ) : (
              <div className="bg-[#111] border border-[#222] rounded-2xl p-10 text-center">
                <CheckCircle size={56} className="text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-black mb-2">WhatsApp aberto!</h2>
                <p className="text-[#aaa] mb-2">
                  Seus dados foram enviados para o WhatsApp da ClikLink. <strong className="text-white">Clique em Enviar</strong> na conversa para concluir.
                </p>
                <p className="text-sm text-[#555] mb-6">Nossa equipe responde em minutos e agenda a instalação.</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Abrir WhatsApp novamente</a>
                  <Link href="/" className="btn btn-outline">Voltar ao início</Link>
                </div>
              </div>
            )}
          </div>

          {/* PLAN SIDEBAR */}
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6 sticky top-20">
            <div className="text-xs font-bold text-[#F47B20] uppercase tracking-widest mb-3">Plano selecionado</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[42px] font-black text-[#F47B20] leading-none tracking-tighter">{plano.velocidade}</span>
              <span className="text-lg font-bold text-[#777]">{plano.unidade}</span>
            </div>
            <div className="text-sm font-semibold text-[#777] mb-4">{plano.nome}</div>
            {isCondominio ? (
              <div className="text-xl font-bold text-white mb-4">Sob consulta</div>
            ) : (
              <div className="mb-4">
                <div className="text-xs text-[#555] mb-0.5">Por</div>
                <div className="text-3xl font-black text-white tracking-tight">
                  {formatPreco(plano.preco)}<span className="text-sm font-normal text-[#777]">/mês</span>
                </div>
              </div>
            )}
            <hr className="border-[#222] mb-4" />
            <ul className="flex flex-col gap-2 mb-4">
              {plano.recursos.map(r => (
                <li key={r} className="flex items-start gap-2 text-xs text-[#aaa]">
                  <Check size={13} className="text-[#F47B20] flex-shrink-0 mt-0.5" />{r}
                </li>
              ))}
            </ul>
            {plano.badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {plano.badges.map(b => <PlanBadge key={b} badge={b as PlanoBadge} />)}
              </div>
            )}
            <hr className="border-[#222] mb-4" />
            <Link href="/planos" className="btn btn-outline btn-sm w-full justify-center">← Mudar de plano</Link>
          </div>
        </div>
      </div>
    </>
  );
}
