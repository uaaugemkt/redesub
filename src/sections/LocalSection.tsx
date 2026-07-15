import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheckIcon,
  MapPinIcon,
  MessageCircleIcon,
} from "../components/icons/BenefitIcons";
import WhatsAppButton from "../components/WhatsAppButton";
import { useSelection } from "../context/SelectionContext";
import { ADDRESS, MAP } from "../lib/constants";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

interface LocalSectionProps {
  variant?: "preview" | "full";
}

const LOCAL_BENEFITS: ReadonlyArray<{
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    id: "local-team",
    title: "Atendimento local",
    description: "Equipe que conhece a região.",
    icon: <MapPinIcon />,
  },
  {
    id: "weekly-support",
    title: "Suporte 7 dias",
    description: "Atendimento todos os dias da semana.",
    icon: <MessageCircleIcon />,
  },
  {
    id: "address-check",
    title: "Consulta por endereço",
    description: "Confirme disponibilidade na sua rua.",
    icon: <CalendarCheckIcon />,
  },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LocalSection({ variant = "full" }: LocalSectionProps) {
  const { regionName } = useSelection();
  const isPreview = variant === "preview";

  return (
    <section className={`local section${isPreview ? " local--home" : ""}`}>
      {isPreview && (
        <div className="local__decor" aria-hidden="true">
          <div className="local__glow local__glow--blue" />
          <div className="local__glow local__glow--orange" />
          <div className="local__fiber" />
        </div>
      )}

      <div className="container local__grid">
        <div className="local__content">
          <span className="local__eyebrow eyebrow eyebrow--light">
            Atendimento local
          </span>
          <h2 className="section__title section__title--light local__title">
            Internet da região, com atendimento de verdade.
          </h2>
          <p className="local__text">
            A RedeSub atende Outeiro com uma equipe próxima, pronta para orientar,
            verificar cobertura e ajudar você a escolher o plano ideal.
          </p>

          <ul className="local__benefits">
            {LOCAL_BENEFITS.map((item) => (
              <li key={item.id} className="local__benefit">
                <span className="local__benefit-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="local__benefit-body">
                  <strong className="local__benefit-title">{item.title}</strong>
                  <span className="local__benefit-desc">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="local__actions">
            <WhatsAppButton
              message={WHATSAPP_MESSAGES.coverageConsult(regionName)}
              label="Consultar cobertura no meu endereço"
              variant="primary"
              size="lg"
              className="local__cta"
            />
            {isPreview && (
              <Link to="/cobertura" className="local__coverage-link">
                Conhecer todas as regiões atendidas
                <ArrowIcon />
              </Link>
            )}
          </div>
        </div>

        <div className="local__location">
          <article className="local__location-card">
            <iframe
              title="Localização RedeSub: São João do Outeiro, Belém/PA"
              src={MAP.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="local__location-map"
              tabIndex={-1}
            />
            <div className="local__location-body">
              <span className="local__location-badge">Base local</span>
              <h3 className="local__location-title">Base de atendimento RedeSub</h3>
              <p className="local__location-place">
                {ADDRESS.neighborhood} · {ADDRESS.city}
              </p>
              <p className="local__location-address">{ADDRESS.street}</p>
              <p className="local__location-note">
                Atendimento e consulta de cobertura para a região.
              </p>
              <a
                href={MAP.openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="local__location-link"
              >
                Abrir no Google Maps
                <ArrowIcon />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
