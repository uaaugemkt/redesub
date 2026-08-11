/**
 * FAQ centralizada RedeSub.
 *
 * Respostas oficiais ainda não foram fornecidas pela RedeSub.
 * Itens com `answer: null` ficam prontos para preenchimento e NÃO
 * são publicados na interface até receberem resposta oficial.
 */

export type FaqCategory = "plans" | "business";

export type FaqItem = {
  id: string;
  question: string;
  answer: string | null;
  category?: FaqCategory;
};

/**
 * Perguntas temporariamente preservadas para facilitar o preenchimento
 * futuro. Nenhuma resposta abaixo é considerada oficial/aprovada.
 */
export const FAQ_ITEMS: readonly FaqItem[] = [
  // Planos residenciais
  {
    id: "plans-instalacao",
    category: "plans",
    question: "A instalação está incluída?",
    answer: null,
  },
  {
    id: "plans-roteador",
    category: "plans",
    question: "O roteador é fornecido?",
    answer: null,
  },
  {
    id: "plans-cobertura",
    category: "plans",
    question: "Como saber se há cobertura no meu endereço?",
    answer: null,
  },
  {
    id: "plans-mudar-plano",
    category: "plans",
    question: "Posso mudar de plano depois?",
    answer: null,
  },
  {
    id: "plans-atendimento",
    category: "plans",
    question: "Como funciona o atendimento?",
    answer: null,
  },

  // Empresarial
  {
    id: "business-disponibilidade",
    category: "business",
    question: "Como consultar disponibilidade?",
    answer: null,
  },
  {
    id: "business-endereco",
    category: "business",
    question: "A solução depende do endereço?",
    answer: null,
  },
  {
    id: "business-sistemas",
    category: "business",
    question: "Posso usar a conexão para sistemas e videoconferências?",
    answer: null,
  },
  {
    id: "business-contato",
    category: "business",
    question: "Como falo com a equipe comercial?",
    answer: null,
  },
] as const;

export function hasOfficialFaqAnswer(item: FaqItem): boolean {
  return item.answer !== null && item.answer.trim() !== "";
}

/** Itens aptos a publicação (resposta oficial preenchida). */
export function getPublishedFaqItems(category?: FaqCategory): FaqItem[] {
  return FAQ_ITEMS.filter((item) => {
    if (category && item.category !== category) return false;
    return hasOfficialFaqAnswer(item);
  });
}
