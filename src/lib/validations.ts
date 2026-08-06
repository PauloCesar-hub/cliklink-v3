import { z } from "zod";

export const assinaturaSchema = z.object({
  nome: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  email: z.string().email("E-mail inválido"),
  telefone: z
    .string()
    .min(14, "Telefone inválido")
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
  dataNascimento: z.string().optional(),
  cep: z
    .string()
    .min(9, "CEP inválido")
    .regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  rua: z.string().min(3, "Informe a rua"),
  numero: z.string().min(1, "Informe o número"),
  complemento: z.string().optional(),
  bairro: z.string().min(2, "Informe o bairro"),
  cidade: z.string().min(2, "Informe a cidade"),
  uf: z.string().length(2, "UF inválida"),
  nomeCondominio: z.string().optional(),
  observacoes: z.string().optional(),
  aceiteLgpd: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar os termos para continuar" }),
  }),
  planoId: z.string(),
  planoNome: z.string(),
  planoPreco: z.number(),
});

export const contatoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().optional(),
  assunto: z.string().min(1, "Selecione um assunto"),
  mensagem: z.string().min(10, "Mensagem deve ter ao menos 10 caracteres"),
});

export type AssinaturaSchema = z.infer<typeof assinaturaSchema>;
export type ContatoSchema = z.infer<typeof contatoSchema>;
