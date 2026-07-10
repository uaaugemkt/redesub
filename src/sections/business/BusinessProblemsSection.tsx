import {
  GaugeIcon,
  ShoppingCartIcon,
  VideoIcon,
} from "../../components/icons/BusinessImpactIcons";
import WhatsAppButton from "../../components/WhatsAppButton";
import Reveal from "../../components/ui/Reveal";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

const IMPACT_GROUPS = [
  {
    id: "operations",
    title: "Operação e sistemas",
    Icon: GaugeIcon,
    items: [
      "Sistema lento no horário de pico.",
      "Equipamentos desconectados sem orientação clara.",
    ],
  },
  {
    id: "communication",
    title: "Atendimento e comunicação",
    Icon: VideoIcon,
    items: [
      "Videoconferência travando com clientes.",
      "Atendimento interrompido por instabilidade.",
    ],
  },
  {
    id: "sales-support",
    title: "Vendas e suporte",
    Icon: ShoppingCartIcon,
    items: [
      "Vendas online indisponíveis no momento crítico.",
      "Dificuldade para falar com o suporte quando algo falha.",
    ],
  },
] as const;

const REDESUB_BENEFITS = [
  "Atendimento regional",
  "Consulta de viabilidade",
  "Orientação conforme a operação",
] as const;

export default function BusinessProblemsSection() {
  return (
    <section
      className="section section--soft business-problems"
      aria-labelledby="business-problems-title"
    >
      <div className="container">
        <div className="business-problems__layout">
          <Reveal className="business-problems__copy">
            <span className="eyebrow">Desafios do dia a dia</span>
            <h2 className="section__title business-problems__title" id="business-problems-title">
              Seu negócio não pode parar por causa da internet.
            </h2>
            <p className="section__desc business-problems__lead">
              Quando a conexão falha, o impacto vai além da velocidade: atendimento,
              vendas, sistemas e comunicação também ficam comprometidos.
            </p>

            <p className="business-problems__callout">
              Uma operação conectada precisa de estabilidade, orientação e atendimento
              próximo.
            </p>

            <div className="business-problems__solution">
              <span className="business-problems__solution-eyebrow">Com a RedeSub</span>
              <h3 className="business-problems__solution-title">
                Mais estabilidade para sua operação.
              </h3>
              <p className="business-problems__solution-text">
                Consulte uma solução adequada ao perfil, endereço e necessidade do seu
                negócio.
              </p>
              <ul className="business-problems__solution-list">
                {REDESUB_BENEFITS.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <WhatsAppButton
              message={WHATSAPP_MESSAGES.businessSolutionConsult()}
              label="Consultar solução para meu negócio"
              variant="primary"
              size="lg"
              className="business-problems__cta"
            />
          </Reveal>

          <div className="business-problems__visual">
            <Reveal delay={60}>
              <figure className="business-problems__figure">
                <img
                  src="/media/beneficios/Trabalhar-sem-interrupcoes.png"
                  alt="Profissional utilizando notebook e celular em ambiente de trabalho"
                  loading="lazy"
                  className="business-problems__image"
                />
              </figure>
            </Reveal>

            <Reveal delay={120}>
              <aside
                className="business-problems__impact-panel"
                aria-labelledby="business-problems-impacts-title"
              >
                <h3 className="business-problems__impact-panel-title" id="business-problems-impacts-title">
                  Onde a instabilidade pesa
                </h3>
                <div className="business-problems__impact-groups">
                  {IMPACT_GROUPS.map((group, index) => (
                    <div
                      key={group.id}
                      className={`business-problems__impact-group${index > 0 ? " business-problems__impact-group--divider" : ""}`}
                    >
                      <span className="business-problems__impact-group-icon" aria-hidden="true">
                        <group.Icon />
                      </span>
                      <div className="business-problems__impact-group-body">
                        <h4 className="business-problems__impact-group-title">{group.title}</h4>
                        <ul className="business-problems__impact-group-list">
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
