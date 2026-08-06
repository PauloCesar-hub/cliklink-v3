export type PlanoBadge = "e-saude" | "tv";
export type ChipSize = "15G" | "20G" | "25G";

export interface Plano {
  id: string;
  slug: string;
  nome: string;
  velocidade: string;
  unidade: "Mega" | "GB" | "Canais";
  preco: number;
  descricao: string;
  destaque?: string;
  featured?: boolean;
  badges: PlanoBadge[];
  chip?: ChipSize;
  recursos: string[];
  categoria: "internet" | "tv" | "condominio";
}

export type FormStatus = "idle" | "loading" | "success" | "error";

export interface AssinaturaFormData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento?: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  nomeCondominio?: string;
  observacoes?: string;
  aceiteLgpd: boolean;
  planoId: string;
  planoNome: string;
  planoPreco: number;
}

export interface ContatoFormData {
  nome: string;
  email: string;
  telefone?: string;
  assunto: string;
  mensagem: string;
}

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}
