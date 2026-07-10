import Reveal from "../../components/ui/Reveal";

const STEPS = [
  {
    id: "need",
    title: "Entendemos a sua necessidade",
    text: "Conhecemos o endereço, a rotina e a forma como a internet será utilizada.",
  },
  {
    id: "availability",
    title: "Consultamos a disponibilidade",
    text: "Verificamos a viabilidade de atendimento para a região informada.",
  },
  {
    id: "plan",
    title: "Orientamos a melhor alternativa",
    text: "Apresentamos as possibilidades adequadas ao perfil e à necessidade do cliente.",
  },
  {
    id: "support",
    title: "Continuamos por perto",
    text: "O atendimento regional permanece disponível para orientar e ajudar quando necessário.",
  },
] as const;

export default function AboutHowWeWorkSection() {
  return (
    <section
      className="section section--muted about-process"
      aria-labelledby="about-process-title"
    >
      <div className="container">
        <Reveal>
          <header className="about-process__header">
            <span className="eyebrow">Nosso jeito de atender</span>
            <h2 className="section__title" id="about-process-title">
              Proximidade do primeiro contato à conexão.
            </h2>
          </header>
        </Reveal>

        <ol className="about-process__steps">
          {STEPS.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 60}>
                <article className="about-process__step">
                  <span className="about-process__number" aria-hidden="true">
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
