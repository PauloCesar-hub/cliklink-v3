import type { Plano } from "@/types";

export const PLANOS: Plano[] = [

  // ══════════════════════════════════════════════════════════
  // 100 MEGA
  // ══════════════════════════════════════════════════════════
  {
    id: "100mega",
    slug: "100-mega",
    nome: "100 Mega",
    velocidade: "100", unidade: "Mega", preco: 79.90,
    descricao: "Só Internet",
    badges: [],
    recursos: ["100 Mega de velocidade", "100% fibra óptica", "Wi-Fi incluso", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "100mega-chip15",
    slug: "100-mega-chip-15g",
    nome: "100 Mega + Chip 15G",
    velocidade: "100", unidade: "Mega", preco: 129.80,
    descricao: "Internet + 1 Chip celular 15G",
    badges: [], chip: "15G",
    recursos: ["100 Mega de velocidade", "100% fibra óptica", "Wi-Fi incluso", "1 Chip celular 15G", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "100mega-chip20",
    slug: "100-mega-chip-20g",
    nome: "100 Mega + Chip 20G",
    velocidade: "100", unidade: "Mega", preco: 139.80,
    descricao: "Internet + 1 Chip celular 20G",
    badges: [], chip: "20G",
    recursos: ["100 Mega de velocidade", "100% fibra óptica", "Wi-Fi incluso", "1 Chip celular 20G", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "100mega-chip25",
    slug: "100-mega-chip-25g",
    nome: "100 Mega + Chip 25G",
    velocidade: "100", unidade: "Mega", preco: 154.80,
    descricao: "Internet + 1 Chip celular 25G",
    badges: [], chip: "25G",
    recursos: ["100 Mega de velocidade", "100% fibra óptica", "Wi-Fi incluso", "1 Chip celular 25G", "Suporte local"],
    categoria: "internet",
  },

  // ══════════════════════════════════════════════════════════
  // 300 MEGA
  // ══════════════════════════════════════════════════════════
  {
    id: "300mega-tele",
    slug: "300-mega-e-saude",
    nome: "300 Mega + e-Saude",
    velocidade: "300", unidade: "Mega", preco: 99.90,
    descricao: "Internet + e-Saude",
    badges: ["e-saude"],
    recursos: ["300 Mega de velocidade", "100% fibra óptica", "Wi-Fi incluso", "e-Saude incluso", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "300mega-tele-tv",
    slug: "300-mega-e-saude-tv",
    nome: "300 Mega + e-Saude + TV",
    velocidade: "300", unidade: "Mega", preco: 109.90,
    descricao: "Internet + e-Saude + TV Total",
    badges: ["e-saude", "tv"],
    recursos: ["300 Mega de velocidade", "100% fibra óptica", "Wi-Fi incluso", "e-Saude incluso", "TV Total inclusa", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "300mega-tele-tv-chip15",
    slug: "300-mega-e-saude-tv-chip-15g",
    nome: "300 Mega + e-Saude + TV + Chip 15G",
    velocidade: "300", unidade: "Mega", preco: 139.90,
    descricao: "Internet + e-Saude + TV Total + 1 Chip 15G",
    badges: ["e-saude", "tv"], chip: "15G",
    recursos: ["300 Mega de velocidade", "100% fibra óptica", "e-Saude incluso", "TV Total inclusa", "1 Chip celular 15G", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "300mega-tele-tv-chip20",
    slug: "300-mega-e-saude-tv-chip-20g",
    nome: "300 Mega + e-Saude + TV + Chip 20G",
    velocidade: "300", unidade: "Mega", preco: 155.90,
    descricao: "Internet + e-Saude + TV Total + 1 Chip 20G",
    badges: ["e-saude", "tv"], chip: "20G",
    recursos: ["300 Mega de velocidade", "100% fibra óptica", "e-Saude incluso", "TV Total inclusa", "1 Chip celular 20G", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "300mega-tele-tv-chip25",
    slug: "300-mega-e-saude-tv-chip-25g",
    nome: "300 Mega + e-Saude + TV + Chip 25G",
    velocidade: "300", unidade: "Mega", preco: 169.90,
    descricao: "Internet + e-Saude + TV Total + 1 Chip 25G",
    badges: ["e-saude", "tv"], chip: "25G",
    recursos: ["300 Mega de velocidade", "100% fibra óptica", "e-Saude incluso", "TV Total inclusa", "1 Chip celular 25G", "Suporte local"],
    categoria: "internet",
  },

  // ══════════════════════════════════════════════════════════
  // 600 MEGA
  // ══════════════════════════════════════════════════════════
  {
    id: "600mega-tele",
    slug: "600-mega-e-saude",
    nome: "600 Mega + e-Saude",
    velocidade: "600", unidade: "Mega", preco: 119.90,
    descricao: "Internet + e-Saude",
    badges: ["e-saude"],
    recursos: ["600 Mega de velocidade", "100% fibra óptica", "Wi-Fi incluso", "e-Saude incluso", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "600mega-tele-tv",
    slug: "600-mega-e-saude-tv",
    nome: "600 Mega + e-Saude + TV",
    velocidade: "600", unidade: "Mega", preco: 129.90,
    descricao: "Alta velocidade, saúde e TV",
    destaque: "Mais escolhido", featured: true,
    badges: ["e-saude", "tv"],
    recursos: ["600 Mega de velocidade", "100% fibra óptica", "Wi-Fi incluso", "e-Saude incluso", "TV Total inclusa", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "600mega-tele-tv-chip15",
    slug: "600-mega-e-saude-tv-chip-15g",
    nome: "600 Mega + e-Saude + TV + Chip 15G",
    velocidade: "600", unidade: "Mega", preco: 159.90,
    descricao: "Internet + TV NOVA TOTAL + e-Saude + 1 Chip 15G",
    destaque: "Completo",
    badges: ["e-saude", "tv"], chip: "15G",
    recursos: ["600 Mega de velocidade", "100% fibra óptica", "e-Saude incluso", "TV Nova Total inclusa", "1 Chip celular 15G", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "600mega-tele-tv-chip20",
    slug: "600-mega-e-saude-tv-chip-20g",
    nome: "600 Mega + e-Saude + TV + Chip 20G",
    velocidade: "600", unidade: "Mega", preco: 175.90,
    descricao: "Internet + TV NOVA TOTAL + e-Saude + 1 Chip 20G",
    badges: ["e-saude", "tv"], chip: "20G",
    recursos: ["600 Mega de velocidade", "100% fibra óptica", "e-Saude incluso", "TV Nova Total inclusa", "1 Chip celular 20G", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "600mega-tele-tv-chip25",
    slug: "600-mega-e-saude-tv-chip-25g",
    nome: "600 Mega + e-Saude + TV + Chip 25G",
    velocidade: "600", unidade: "Mega", preco: 189.90,
    descricao: "Internet + TV NOVA TOTAL + e-Saude + 1 Chip 25G",
    badges: ["e-saude", "tv"], chip: "25G",
    recursos: ["600 Mega de velocidade", "100% fibra óptica", "e-Saude incluso", "TV Nova Total inclusa", "1 Chip celular 25G", "Suporte local"],
    categoria: "internet",
  },

  // ══════════════════════════════════════════════════════════
  // 1 GIGA
  // ══════════════════════════════════════════════════════════
  {
    id: "1gb",
    slug: "1-gb",
    nome: "1 Giga + e-Saude + TV",
    velocidade: "1", unidade: "GB", preco: 159.90,
    descricao: "Internet + TV NOVA TOTAL + e-Saude",
    destaque: "Ultra velocidade", featured: true,
    badges: ["e-saude", "tv"],
    recursos: ["1 Giga de velocidade", "100% fibra óptica", "Wi-Fi incluso", "e-Saude incluso", "TV Nova Total inclusa", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "1gb-chip15",
    slug: "1-gb-chip-15g",
    nome: "1 Giga + e-Saude + TV + Chip 15G",
    velocidade: "1", unidade: "GB", preco: 199.90,
    descricao: "Internet + TV NOVA TOTAL + e-Saude + 1 Chip 15G",
    badges: ["e-saude", "tv"], chip: "15G",
    recursos: ["1 Giga de velocidade", "100% fibra óptica", "e-Saude incluso", "TV Nova Total inclusa", "1 Chip celular 15G", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "1gb-chip20",
    slug: "1-gb-chip-20g",
    nome: "1 Giga + e-Saude + TV + Chip 20G",
    velocidade: "1", unidade: "GB", preco: 215.90,
    descricao: "Internet + TV NOVA TOTAL + e-Saude + 1 Chip 20G",
    badges: ["e-saude", "tv"], chip: "20G",
    recursos: ["1 Giga de velocidade", "100% fibra óptica", "e-Saude incluso", "TV Nova Total inclusa", "1 Chip celular 20G", "Suporte local"],
    categoria: "internet",
  },
  {
    id: "1gb-chip25",
    slug: "1-gb-chip-25g",
    nome: "1 Giga + e-Saude + TV + Chip 25G",
    velocidade: "1", unidade: "GB", preco: 229.90,
    descricao: "Internet + TV NOVA TOTAL + e-Saude + 1 Chip 25G",
    badges: ["e-saude", "tv"], chip: "25G",
    recursos: ["1 Giga de velocidade", "100% fibra óptica", "e-Saude incluso", "TV Nova Total inclusa", "1 Chip celular 25G", "Suporte local"],
    categoria: "internet",
  },

  // ══════════════════════════════════════════════════════════
  // CONDOMÍNIO (sob consulta)
  // ══════════════════════════════════════════════════════════
  {
    id: "condominio",
    slug: "condominio",
    nome: "Plano Condomínio",
    velocidade: "—", unidade: "Mega", preco: 0,
    descricao: "Plano personalizado para o seu condomínio",
    badges: [],
    recursos: ["Velocidade personalizada", "Infraestrutura dedicada", "Suporte prioritário", "Atendimento ao síndico"],
    categoria: "condominio",
  },
];

export function getPlanoBySlug(slug: string): Plano | undefined {
  return PLANOS.find((p) => p.slug === slug);
}

export function getPlanoById(id: string): Plano | undefined {
  return PLANOS.find((p) => p.id === id);
}

export function getPlanosByCategoria(cat: Plano["categoria"]): Plano[] {
  return PLANOS.filter((p) => p.categoria === cat);
}

export function formatPreco(preco: number): string {
  if (preco === 0) return "Sob consulta";
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export const BADGE_LABELS: Record<string, string> = {
  "e-saude": "e-Saude",
  tv: "TV Inclusa",
};
