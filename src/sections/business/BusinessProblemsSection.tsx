import Reveal from "../../components/ui/Reveal";

const PROBLEMS = [
  "Sistema lento no horário de pico.",
  "Videoconferência travando com clientes.",
  "Atendimento interrompido por instabilidade.",
  "Vendas online indisponíveis no momento crítico.",
  "Equipamentos desconectados sem orientação clara.",
  "Dificuldade para falar com o suporte quando algo falha.",
] as const;

export default function BusinessProblemsSection() {
  return (
    <section className="section business-problems" aria-labelledby="business-problems-title">
      <div className="container business-problems__grid">
        <Reveal>
          <span className="eyebrow">Desafios do dia a dia</span>
          <h2 className="section__title" id="business-problems-title">
            Seu negócio não pode parar por causa da internet
          </h2>
          <p className="section__desc">
            Quando a conexão falha, o impacto vai além da velocidade: afeta
            atendimento, vendas, sistemas e a confiança dos clientes.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <div className="business-problems__visual">
            <img
              src="/media/beneficios/Trabalhar-sem-interrupcoes.png"
              alt="Profissional em home office com conexão estável"
              loading="lazy"
              className="business-problems__image"
            />
          </div>
          <ul className="business-problems__list">
            {PROBLEMS.map((problem, index) => (
              <li key={problem}>
                <Reveal delay={index * 50}>
                  <span className="business-problems__item">{problem}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
