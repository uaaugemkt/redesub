import Reveal from "../../components/ui/Reveal";

const FAQ_ITEMS = [
  {
    id: "availability",
    question: "Como consultar disponibilidade?",
    answer:
      "Entre em contato pelo WhatsApp, informe sua região e o endereço do estabelecimento. A equipe RedeSub verifica a viabilidade e orienta os próximos passos.",
  },
  {
    id: "pricing",
    question: "Os planos empresariais possuem preços diferentes?",
    answer:
      "Os valores e condições são definidos após análise da região, endereço e perfil de uso do negócio.",
  },
  {
    id: "address",
    question: "A solução depende do endereço?",
    answer:
      "Sim. A disponibilidade e as condições variam conforme a localização e a viabilidade técnica no local.",
  },
  {
    id: "systems",
    question: "Posso usar a conexão para sistemas e videoconferências?",
    answer:
      "A equipe orienta conforme a necessidade do negócio, considerando quantidade de dispositivos e formas de uso.",
  },
  {
    id: "contact",
    question: "Como falo com a equipe comercial?",
    answer:
      "Pelo WhatsApp, com mensagem pronta no site. A equipe retorna com orientações sobre disponibilidade e condições.",
  },
] as const;

export default function BusinessFAQSection() {
  return (
    <section className="section section--soft business-faq" aria-labelledby="business-faq-title">
      <div className="container container--narrow">
        <Reveal>
          <header className="business-faq__header">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="section__title" id="business-faq-title">
              Perguntas frequentes
            </h2>
          </header>
        </Reveal>

        <div className="business-faq__list">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={item.id} delay={index * 50}>
              <details className="business-faq__item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
