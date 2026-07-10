import Reveal from "../../components/ui/Reveal";

const STEPS = [
  {
    id: "business",
    title: "Conte sobre seu negócio",
    text: "Explique como sua operação utiliza a internet no dia a dia.",
  },
  {
    id: "address",
    title: "Informe o endereço",
    text: "Envie bairro, rua ou ponto de referência do estabelecimento.",
  },
  {
    id: "analysis",
    title: "Receba a análise de viabilidade",
    text: "A equipe verifica disponibilidade conforme região e local.",
  },
  {
    id: "solution",
    title: "Conheça a solução indicada",
    text: "Orientação sobre plano e condições adequadas ao seu perfil.",
  },
] as const;

export default function BusinessProcessSection() {
  return (
    <section className="section business-process" aria-labelledby="business-process-title">
      <div className="container">
        <Reveal>
          <header className="business-process__header">
            <span className="eyebrow">Como funciona</span>
            <h2 className="section__title" id="business-process-title">
              Processo de contratação
            </h2>
          </header>
        </Reveal>

        <ol className="business-process__steps">
          {STEPS.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 70}>
                <article className="business-process__card">
                  <span className="business-process__number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
