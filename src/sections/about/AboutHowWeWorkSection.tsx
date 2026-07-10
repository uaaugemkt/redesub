import Reveal from "../../components/ui/Reveal";

const STEPS = [
  {
    id: "need",
    title: "Entendemos sua necessidade",
    text: "Casa, home office, estudos, entretenimento ou negócio.",
  },
  {
    id: "availability",
    title: "Verificamos a disponibilidade",
    text: "A equipe consulta a viabilidade conforme sua região e endereço.",
  },
  {
    id: "plan",
    title: "Indicamos o plano mais adequado",
    text: "A escolha considera quantidade de dispositivos e forma de uso.",
  },
  {
    id: "support",
    title: "Mantemos o atendimento próximo",
    text: "O contato continua disponível pelo WhatsApp e pelos canais da RedeSub.",
  },
] as const;

export default function AboutHowWeWorkSection() {
  return (
    <section className="section about-process" aria-labelledby="about-process-title">
      <div className="container">
        <Reveal>
          <header className="about-process__header">
            <span className="eyebrow">Nosso processo</span>
            <h2 className="section__title" id="about-process-title">
              Como a RedeSub trabalha
            </h2>
          </header>
        </Reveal>

        <ol className="about-process__steps">
          {STEPS.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 70}>
                <article className="about-process__card">
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
