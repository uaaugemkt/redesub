import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import InternalPageHero from "../components/layout/InternalPageHero";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { SUBSCRIBER_PORTAL_URL } from "../config/integrations";
import { PAGE_META } from "../config/site";
import { useSpeedTestModal } from "../context/SpeedTestModalContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { ADDRESS, PHONE_DISPLAY } from "../lib/constants";
import {
  buildWhatsAppLink,
  SUPPORT_QUICK_ISSUES,
  WHATSAPP_MESSAGES,
} from "../lib/whatsapp";
import { useSelection } from "../context/SelectionContext";
import {
  CircleCheckIcon,
  MapPinIcon,
  MessageCircleIcon,
} from "../components/icons/BenefitIcons";

const ATTENDANCE_PATHS = [
  {
    id: "contract",
    title: "Quero contratar",
    description: "Consulte planos, disponibilidade e monte sua mensagem para o WhatsApp.",
    targetId: "consulta-disponibilidade",
    icon: "contract" as const,
  },
  {
    id: "support",
    title: "Preciso de suporte",
    description: "Cliente RedeSub? Escolha o motivo e fale direto com a equipe técnica.",
    targetId: "suporte-rapido",
    icon: "support" as const,
  },
  {
    id: "billing",
    title: "Financeiro ou segunda via",
    description: "Segunda via, financeiro ou serviços da conta pelo canal adequado.",
    targetId: "central-assinante",
    icon: "billing" as const,
  },
] as const;

const FORM_BENEFITS = [
  { icon: MapPinIcon, text: "Atendimento regional com equipe acessível." },
  { icon: MessageCircleIcon, text: "Resposta pelo WhatsApp com mensagem pronta." },
  { icon: CircleCheckIcon, text: "Confirmação de disponibilidade pelo atendimento." },
] as const;

export default function AttendancePage() {
  usePageMeta(PAGE_META.atendimento);
  const { regionName } = useSelection();
  const { openSpeedTestModal } = useSpeedTestModal();

  return (
    <>
      <InternalPageHero
        eyebrow="Atendimento RedeSub"
        title="Como podemos ajudar você?"
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Atendimento" },
        ]}
      />

      <section className="section section--soft attendance__paths">
        <div className="container">
          <Reveal>
            <h2 className="section__title">Escolha o tipo de atendimento</h2>
            <p className="section__desc">
              Selecione o caminho mais adequado para sua necessidade.
            </p>
          </Reveal>

          <div className="attendance__paths-grid">
            {ATTENDANCE_PATHS.map((path, index) => (
              <Reveal key={path.id} delay={index * 70}>
                <article className="attendance__path-card">
                  <span className="attendance__path-icon" aria-hidden="true">
                    <PathIcon type={path.icon} />
                  </span>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                  <Link
                    to={`/atendimento#${path.targetId}`}
                    className="attendance__path-btn"
                  >
                    Continuar
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="suporte-rapido">
        <div className="container">
          <Reveal>
            <h2 className="section__title">Suporte rápido</h2>
            <p className="section__desc">
              Toque em uma opção para abrir o atendimento correspondente.
            </p>
          </Reveal>

          <ul className="attendance__issues">
            {SUPPORT_QUICK_ISSUES.map((issue, index) => {
              const isSpeedTest = "action" in issue && issue.action === "speed-test";
              const isPriority = "priority" in issue && issue.priority;
              const className = `attendance__issue-btn ${isPriority ? "attendance__issue-btn--priority" : ""}`;
              const hint = isSpeedTest ? "Ver o velocímetro" : "Abrir no WhatsApp";

              const content = (
                <>
                  <span className="attendance__issue-icon" aria-hidden="true">
                    <IssueIcon id={issue.id} />
                  </span>
                  <span className="attendance__issue-body">
                    <span className="attendance__issue-title">{issue.label}</span>
                    <span className="attendance__issue-hint">{hint}</span>
                  </span>
                  <span className="attendance__issue-chevron" aria-hidden="true">
                    <ChevronIcon />
                  </span>
                </>
              );

              return (
                <Reveal key={issue.id} delay={index * 40}>
                  <li>
                    {isSpeedTest ? (
                      <button
                        type="button"
                        className={className}
                        onClick={openSpeedTestModal}
                      >
                        {content}
                      </button>
                    ) : (
                      <a
                        href={buildWhatsAppLink(
                          WHATSAPP_MESSAGES.supportIssue({
                            reason: issue.label,
                            region: regionName,
                          })
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                        aria-label={`${issue.label} — abrir no WhatsApp`}
                      >
                        {content}
                      </a>
                    )}
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section section--muted" id="consulta-disponibilidade">
        <div className="container">
          <div className="attendance__form-layout">
            <Reveal>
              <div className="attendance__form-lead">
                <h2 className="section__title">Consulta de planos e disponibilidade</h2>
                <p className="section__desc">
                  Preencha os dados ao lado. Ao enviar, você será direcionado ao
                  WhatsApp com uma mensagem pronta. A disponibilidade será
                  confirmada pelo atendimento.
                </p>

                <ul className="attendance__benefits">
                  {FORM_BENEFITS.map(({ icon: Icon, text }) => (
                    <li key={text}>
                      <span className="attendance__benefit-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <dl className="attendance__channels">
                  <div>
                    <dt>Telefone / WhatsApp</dt>
                    <dd>{PHONE_DISPLAY}</dd>
                  </div>
                  <div>
                    <dt>Endereço</dt>
                    <dd>
                      {ADDRESS.street}
                      <br />
                      {ADDRESS.neighborhood} · {ADDRESS.city}
                    </dd>
                  </div>
                </dl>

                <div className="attendance__form-shortcuts">
                  <WhatsAppButton size="md" />
                  <Link
                    to="/atendimento#suporte-rapido"
                    className="btn btn--outline btn--md"
                  >
                    Ir para suporte rápido
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <ContactForm className="attendance__form-card" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--muted" id="central-assinante">
        <div className="container container--narrow">
          <Reveal>
            <div className="attendance__portal">
              <h2 className="section__title">Já é cliente RedeSub?</h2>
              <p className="section__desc">
                Acesse os serviços disponíveis para assinantes ou fale com o
                atendimento.
              </p>

              <div className="attendance__portal-actions">
                <a
                  href={SUBSCRIBER_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--md"
                >
                  Central do Assinante
                </a>

                <WhatsAppButton
                  message={WHATSAPP_MESSAGES.supportIssue({
                    reason: "Falar com o atendimento",
                    region: regionName,
                  })}
                  label="Falar com o atendimento"
                  variant="primary"
                  size="md"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PathIcon({ type }: { type: "contract" | "support" | "billing" }) {
  if (type === "support") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-9 9v5l2-2h2v-6H5a7 7 0 1 1 14 0h-2v6h2l2 2v-5a9 9 0 0 0-9-9Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "billing") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M4 10h16" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 15h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IssueIcon({ id }: { id: string }) {
  const shell = (children: ReactNode) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );

  switch (id) {
    case "sem-internet":
      // Globo + traço — sem conexão nenhuma.
      return shell(
        <>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
          <path d="M4 12h16M12 4c2.2 2.2 3.3 5 3.3 8s-1.1 5.8-3.3 8c-2.2-2.2-3.3-5-3.3-8s1.1-5.8 3.3-8Z" stroke="currentColor" strokeWidth="1.75" />
          <path d="M3.5 3.5l17 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      );
    case "internet-lenta":
      // Timer — conexão lenta.
      return shell(
        <>
          <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12 9v4l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 2h5M12 2v2.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      );
    case "internet-instavel":
      // Pulso/atividade — sinal oscilando.
      return shell(
        <path d="M3 12h4l2-7 4 14 2-7h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      );
    case "wifi-nao-conecta":
      // Wi-Fi com traço — não conecta.
      return shell(
        <>
          <path d="M5 8.5a11 11 0 0 1 14 0M7.8 11.7a7 7 0 0 1 8.4 0M10.6 15a3 3 0 0 1 2.8 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="12" cy="18" r="1" fill="currentColor" />
          <path d="M3.5 3.5l17 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      );
    case "roteador":
      // Roteador — caixa com antenas.
      return shell(
        <>
          <rect x="3.5" y="13" width="17" height="7" rx="1.75" stroke="currentColor" strokeWidth="1.75" />
          <path d="M8 13V9a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="8" cy="16.5" r="1" fill="currentColor" />
          <path d="M12 16.5h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      );
    case "teste-velocidade":
      // Velocímetro — mesmo símbolo do modal de teste de velocidade.
      return shell(
        <>
          <path d="M4 16a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M12 16l4-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1.25" fill="currentColor" />
        </>
      );
    case "segunda-via":
      // Recibo/documento — financeiro.
      return shell(
        <>
          <path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      );
    default:
      // "falar-suporte" e fallback — balão de conversa.
      return shell(
        <path
          d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.4-3.6A7.96 7.96 0 0 1 4 12Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      );
  }
}
