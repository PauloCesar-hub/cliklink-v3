// ============================================================
// CLIKLINK — Todos os condomínios atendidos em Araraquara
// ============================================================

export interface Condominio {
  id: number;
  nome: string;
  endereco: string;
  bairro: string;
  cep: string;
  lat: number;
  lng: number;
}

export const CONDOMINIOS: Condominio[] = [
  { id: 1, nome: "Attuale Residencial", endereco: "Rua Professora Adélia Izique, 1101", bairro: "Attuale", cep: "14801-380", lat: -21.7989, lng: -48.1889 },
  { id: 2, nome: "Campus Ville I", endereco: "Rua Aristides Fernandes, 459", bairro: "Campos Ville I", cep: "14800-715", lat: -21.8010, lng: -48.1950 },
  { id: 3, nome: "Campus Ville II", endereco: "Rua Aristides Fernandes, 485", bairro: "Campos Ville II", cep: "14800-715", lat: -21.8012, lng: -48.1948 },
  { id: 4, nome: "Conquista Araraquara", endereco: "Av. Capitão Noray de Paula e Silva, 1287", bairro: "Conquista", cep: "14807-100", lat: -21.7745, lng: -48.1821 },
  { id: 5, nome: "Ipê Amarelo", endereco: "Av. Prof. Gustavo Fleury Charmillot, 372", bairro: "Ipê Amarelo", cep: "14804-012", lat: -21.8051, lng: -48.1765 },
  { id: 6, nome: "Ipê Branco", endereco: "Rua Bento Ramalho Machado, 622", bairro: "Ipê Branco", cep: "14804-018", lat: -21.8060, lng: -48.1740 },
  { id: 7, nome: "Ipê Rosa", endereco: "Av. Prof. Gustavo Fleury Charmillot, 604", bairro: "Ipê Rosa", cep: "14804-012", lat: -21.8055, lng: -48.1760 },
  { id: 8, nome: "Ipê Roxo", endereco: "Av. Prof. Gustavo Fleury Charmillot, 112", bairro: "Ipê Roxo", cep: "14804-012", lat: -21.8048, lng: -48.1770 },
  { id: 9, nome: "La Vie", endereco: "Av. Padre Francisco Colturato, 1452", bairro: "La Vie", cep: "14810-125", lat: -21.7820, lng: -48.2010 },
  { id: 10, nome: "L'Harmonie", endereco: "Rua Henrique Lupo, 1261", bairro: "L'Harmonie", cep: "14802-440", lat: -21.7952, lng: -48.1810 },
  { id: 11, nome: "Moove", endereco: "Rua Imaculada Conceição, 3377", bairro: "Moove", cep: "14802-135", lat: -21.7910, lng: -48.1775 },
  { id: 12, nome: "Parque Acanto", endereco: "Av. Miguel Bucalem, 468", bairro: "Parque Acanto", cep: "14808-264", lat: -21.7860, lng: -48.1680 },
  { id: 13, nome: "Parque Alamo", endereco: "Av. João Soares e Arruda, 1444", bairro: "Alamo", cep: "14801-790", lat: -21.7998, lng: -48.1920 },
  { id: 14, nome: "Parque Alentejo", endereco: "Rua Dr. Giuseppe Aufiero Sobrinho, 663", bairro: "Alentejo", cep: "14804-346", lat: -21.8080, lng: -48.1800 },
  { id: 15, nome: "Parque Aleteia", endereco: "Av. Massaiuqui Sano, 45", bairro: "Aleteia", cep: "14811-263", lat: -21.7750, lng: -48.2080 },
  { id: 16, nome: "Parque Amarige", endereco: "Av. Dr. Miguel Couto, 493", bairro: "Amarige", cep: "14806-090", lat: -21.7880, lng: -48.1850 },
  { id: 17, nome: "Parque Amis", endereco: "Rua Mahiba Barcha, 90", bairro: "Amis", cep: "14801-719", lat: -21.7970, lng: -48.1900 },
  { id: 18, nome: "Parque Apoema", endereco: "Av. Uchôa, 416", bairro: "Apoema", cep: "14811-238", lat: -21.7760, lng: -48.2070 },
  { id: 19, nome: "Parque Arcos da Lapa", endereco: "Rua Maria Marcelina de Campos, 601", bairro: "Arcos da Lapa", cep: "14804-332", lat: -21.8090, lng: -48.1790 },
  { id: 20, nome: "Parque Arpoador", endereco: "Rua Maria Marcelina de Campos, 500", bairro: "Arpoador", cep: "14804-332", lat: -21.8088, lng: -48.1792 },
  { id: 21, nome: "Parque Atlantis", endereco: "Av. Gov. Orestes Quercia, 1301", bairro: "Atlantis", cep: "14804-700", lat: -21.8020, lng: -48.1730 },
  { id: 22, nome: "Parque das Pitangueiras", endereco: "Av. Alberto Benassi, 3290", bairro: "Pitangueiras", cep: "14804-300", lat: -21.8035, lng: -48.1710 },
  { id: 23, nome: "Parque das Violetas", endereco: "Rua Nicola Spinelli, 424", bairro: "Parque das Violetas", cep: "14806-182", lat: -21.7890, lng: -48.1840 },
  { id: 24, nome: "Place Morada do Sol", endereco: "Av. Moacir Fidenis, 513", bairro: "Place", cep: "14804-348", lat: -21.8070, lng: -48.1780 },
  { id: 25, nome: "Portal Caminhos de Córdoba", endereco: "Rua Roberto Aparecido Guilherme, 145", bairro: "Caminhos de Córdoba", cep: "14810-815", lat: -21.7830, lng: -48.1970 },
  { id: 26, nome: "Portal das Árvores", endereco: "Av. Marginal Rodoanel Norte Oeste Dr. Octávio de Arruda Camargo, 375", bairro: "Portal das Árvores", cep: "14802-498", lat: -21.7920, lng: -48.1760 },
  { id: 27, nome: "Portal Parque de Sevilha", endereco: "Av. Rodrigo Fernando Grillo, 1525", bairro: "Sevilha", cep: "14801-794", lat: -21.7980, lng: -48.1960 },
  { id: 28, nome: "Praças do Sol", endereco: "Av. Joaquim Vieira dos Santos, 2929", bairro: "Praças do Sol", cep: "14811-120", lat: -21.7770, lng: -48.2060 },
  { id: 29, nome: "Recanto das Primaveras", endereco: "Rua Laurindo Ferreira Filho, 547", bairro: "Recanto das Primaveras", cep: "14804-030", lat: -21.8040, lng: -48.1755 },
  { id: 30, nome: "Reserva dos Jacarandás", endereco: "Rua Alessio Santini, 260", bairro: "Jacarandas", cep: "14804-021", lat: -21.8045, lng: -48.1750 },
  { id: 31, nome: "Reserva dos Oitis", endereco: "Av. Rodrigo Fernando Grillo, 587", bairro: "Reserva dos Oitis", cep: "14801-534", lat: -21.7985, lng: -48.1955 },
  { id: 32, nome: "Reserva Flor de Lótus", endereco: "Av. Dom Carlos Carmelo, 595", bairro: "Flor de Lótus", cep: "14805-045", lat: -21.7930, lng: -48.1720 },
  { id: 33, nome: "Residencial Ágata", endereco: "Av. Dr. Miguel Couto, 443", bairro: "Agata", cep: "14806-090", lat: -21.7882, lng: -48.1852 },
  { id: 34, nome: "Residencial Amistad", endereco: "Av. Dom Carlos Carmelo, 853", bairro: "Amistad", cep: "14805-045", lat: -21.7935, lng: -48.1715 },
  { id: 35, nome: "Residencial Antares", endereco: "Av. Dom Carlos Carmelo, 721", bairro: "Antares", cep: "14805-045", lat: -21.7932, lng: -48.1718 },
  { id: 36, nome: "Residencial Ares", endereco: "Av. Mário Zampieri, 1616", bairro: "Ares", cep: "14810-000", lat: -21.7840, lng: -48.1990 },
  { id: 37, nome: "Residencial Aster", endereco: "Av. Maria Lucia Cabrera, 173", bairro: "Aster", cep: "14801-749", lat: -21.7990, lng: -48.1870 },
  { id: 38, nome: "Residencial Atalaia", endereco: "Av. Massaiuqui Sano, 90", bairro: "Atalaia", cep: "14811-263", lat: -21.7752, lng: -48.2078 },
  { id: 39, nome: "Residencial Aurora", endereco: "Av. Gov. Orestes Quercia, 1201", bairro: "Aurora", cep: "14804-700", lat: -21.8022, lng: -48.1732 },
  { id: 40, nome: "Residencial Marina", endereco: "Av. Alberto Toloi, 185", bairro: "Marina", cep: "14800-105", lat: -21.8005, lng: -48.1980 },
  { id: 41, nome: "Residencial Paraíso", endereco: "Av. Prof. Gustavo Fleury Charmillot, 381", bairro: "Residencial Paraíso", cep: "14804-012", lat: -21.8053, lng: -48.1763 },
  { id: 42, nome: "Residencial Parque Apolo", endereco: "Rua Gavião Peixoto, 749", bairro: "Apolo", cep: "14801-029", lat: -21.7960, lng: -48.1910 },
  { id: 43, nome: "Residencial Parque Arthoria", endereco: "Av. América, 917", bairro: "Arthoria", cep: "14811-240", lat: -21.7762, lng: -48.2065 },
  { id: 44, nome: "Residencial Parque Atacama", endereco: "Av. Paulino Rodella, 1234", bairro: "Atacama", cep: "14801-515", lat: -21.7975, lng: -48.1930 },
  { id: 45, nome: "Residencial Parque das Tulipas II", endereco: "Rua Luiz Saska, 320", bairro: "Tulipas II", cep: "14802-794", lat: -21.7945, lng: -48.1795 },
  { id: 46, nome: "Residencial Regina For Life", endereco: "Av. Antônio Orlando, 762", bairro: "Regina For Life", cep: "14810-455", lat: -21.7825, lng: -48.2005 },
  { id: 47, nome: "Residencial Vancouver", endereco: "Av. Gumercindo Siqueira, 1130", bairro: "Vancouver", cep: "14802-790", lat: -21.7940, lng: -48.1800 },
  { id: 48, nome: "Residencial Vila Morganti", endereco: "Rua Presidente João Belchior Marques Goulart, 873", bairro: "Morganti", cep: "14811-260", lat: -21.7758, lng: -48.2062 },
  { id: 49, nome: "Sintonia Residencial", endereco: "Av. dos Calabreses, 60", bairro: "Sintonia", cep: "14810-276", lat: -21.7835, lng: -48.1985 },
  { id: 50, nome: "Tulipas Residence", endereco: "Rua Dr. Emílio Ribas, 1329", bairro: "Tulipas Residence", cep: "14802-892", lat: -21.7948, lng: -48.1798 },
  { id: 51, nome: "Vale Supremo", endereco: "Av. Capitão Noray de Paula e Silva, 41", bairro: "Supremo", cep: "14807-045", lat: -21.7748, lng: -48.1824 },
  { id: 52, nome: "Vila das Cerejeiras I", endereco: "Rua Prof. Expedito Lacorte, 120", bairro: "Cerejeiras I", cep: "14805-148", lat: -21.7925, lng: -48.1725 },
  { id: 53, nome: "Villagio Harmonia", endereco: "Rua Caetano Nigro, 1212", bairro: "Villagio Harmonia", cep: "14802-450", lat: -21.7955, lng: -48.1808 },
  { id: 54, nome: "Vistas do Botânico Cedros", endereco: "Rua Antonio Fernandes, 251", bairro: "Cedros", cep: "14805-435", lat: -21.7918, lng: -48.1730 },
  { id: 55, nome: "Vistas do Botânico Flamboyants", endereco: "Rua João Evangelista Rodrigues Primiano, 423", bairro: "Flamboyants", cep: "14805-429", lat: -21.7920, lng: -48.1728 },
];

export const TOTAL_CONDOMINIOS = CONDOMINIOS.length;

// Center of Araraquara
export const ARARAQUARA_CENTER = { lat: -21.7946, lng: -48.1766 };
