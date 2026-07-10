import Reveal from "../../components/ui/Reveal";

const USE_CASES = [
  {
    id: "commerce",
    title: "Comércio",
    text: "Maquininhas, sistemas de estoque, atendimento e comunicação online.",
  },
  {
    id: "clinic",
    title: "Consultório",
    text: "Agendamentos, prontuários na nuvem e atendimento digital.",
  },
  {
    id: "office",
    title: "Escritório",
    text: "Videoconferência, arquivos na nuvem e sistemas corporativos.",
  },
  {
    id: "restaurant",
    title: "Restaurantes e serviços",
    text: "Pedidos, atendimento, pagamentos e conectividade para operação diária.",
  },
  {
    id: "salon",
    title: "Salão",
    text: "Agenda online, pagamentos e comunicação com clientes.",
  },
  {
    id: "services",
    title: "Pequeno prestador de serviços",
    text: "Atendimento remoto, envio de arquivos e presença digital.",
  },
] as const;

export default function BusinessUseCasesSection() {
  return (
    <section
      className="section section--soft business-usecases"
      aria-labelledby="business-usecases-title"
    >
      <div className="container">
        <Reveal>
          <header className="business-usecases__header">
            <span className="eyebrow">Cenários de uso</span>
            <h2 className="section__title" id="business-usecases-title">
              Solução indicada para diferentes operações
            </h2>
            <p className="section__desc">
              Cada negócio utiliza a internet de um jeito. A equipe RedeSub orienta
              conforme região, endereço e perfil de uso.
            </p>
          </header>
        </Reveal>

        <div className="business-usecases__grid">
          {USE_CASES.map((item, index) => (
            <Reveal key={item.id} delay={index * 60}>
              <article className="business-usecases__card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="business-usecases__visual">
            <img
              src="/media/beneficios/Manter-o-negocio-funcionando.png"
              alt="Profissional utilizando internet estável no negócio"
              loading="lazy"
              className="business-usecases__image"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
