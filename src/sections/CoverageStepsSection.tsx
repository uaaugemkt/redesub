import type { ReactNode } from "react";
import {
  CalendarCheckIcon,
  MapPinIcon,
  MessageCircleIcon,
} from "../components/icons/BenefitIcons";
import WhatsAppButton from "../components/WhatsAppButton";
import Reveal from "../components/ui/Reveal";
import { useSelection } from "../context/SelectionContext";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

const STEPS: ReadonlyArray<{
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    id: "choose-region",
    title: "Escolha sua região",
    description: "Selecione a localidade onde deseja contratar.",
    icon: <MapPinIcon />,
  },
  {
    id: "share-address",
    title: "Informe seu endereço pelo WhatsApp",
    description: "Envie bairro, rua ou ponto de referência.",
    icon: <MessageCircleIcon />,
  },
  {
    id: "team-confirmation",
    title: "Receba a confirmação da equipe",
    description: "Nossa equipe verifica a viabilidade e orienta os próximos passos.",
    icon: <CalendarCheckIcon />,
  },
];

export default function CoverageStepsSection() {
  const { regionName } = useSelection();

  return (
    <section className="section coverage-steps" aria-labelledby="coverage-steps-title">
      <div className="container">
        <Reveal>
          <header className="coverage-steps__header">
            <h2 className="section__title" id="coverage-steps-title">
              Como consultar disponibilidade
            </h2>
            <p className="section__desc">
              A cobertura é confirmada pela equipe com base no endereço informado.
            </p>
          </header>
        </Reveal>

        <ol className="coverage-steps__grid">
          {STEPS.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 80}>
                <article className="coverage-steps__card">
                  <span className="coverage-steps__step" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="coverage-steps__icon" aria-hidden="true">
                    {step.icon}
                  </span>
                  <h3 className="coverage-steps__title">{step.title}</h3>
                  <p className="coverage-steps__desc">{step.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={240}>
          <div className="coverage-steps__footer">
            <p className="coverage-steps__disclaimer">
              A disponibilidade depende do endereço. Não realizamos consulta automática
              de cobertura neste site.
            </p>
            <WhatsAppButton
              message={WHATSAPP_MESSAGES.coverageConsult(regionName)}
              label="Consultar disponibilidade"
              variant="primary"
              size="lg"
              className="coverage-steps__cta"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
