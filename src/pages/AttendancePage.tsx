import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import AttendanceRegionSection from "../components/AttendanceRegionSection";
import InternalHero from "../components/layout/InternalHero";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { SUBSCRIBER_PORTAL_URL } from "../config/integrations";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { ADDRESS, PHONE_DISPLAY } from "../lib/constants";
import {
  buildWhatsAppLink,
  SUPPORT_QUICK_ISSUES,
  WHATSAPP_MESSAGES,
} from "../lib/whatsapp";
import { useSelection } from "../context/SelectionContext";

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
  "Atendimento regional com equipe acessível.",
  "Resposta pelo WhatsApp com mensagem pronta.",
  "Confirmação de disponibilidade pelo atendimento.",
] as const;

export default function AttendancePage() {
  usePageMeta(PAGE_META.atendimento);
  const { regionName } = useSelection();

  return (
    <>
      <InternalHero
        eyebrow="ATENDIMENTO REDESUB"
        title="Como podemos ajudar você?"
        description="Contratação, disponibilidade, suporte técnico e atendimento ao assinante em um só lugar."
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Atendimento" },
        ]}
        highlights={[
          "Atendimento regional",
          "Suporte próximo",
          "Contato direto pelo WhatsApp",
        ]}
      >
        <Link to="/planos" className="btn btn--primary btn--lg btn--hero">
          Consultar planos
        </Link>
        <Link to="/atendimento#suporte-rapido" className="btn btn--outline-light btn--lg">
          Preciso de suporte
        </Link>
      </InternalHero>

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
              Cliente RedeSub? Toque no motivo do contato para abrir o WhatsApp com
              a mensagem pronta.
            </p>
          </Reveal>

          <ul className="attendance__issues">
            {SUPPORT_QUICK_ISSUES.map((issue, index) => (
              <Reveal key={issue.id} delay={index * 40}>
                <li>
                  <a
                    href={buildWhatsAppLink(
                      WHATSAPP_MESSAGES.supportIssue({
                        reason: issue.label,
                        region: regionName,
                      })
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attendance__issue-btn"
                  >
                    <IssueIcon id={issue.id} />
                    <span>{issue.label}</span>
                  </a>
                </li>
              </Reveal>
            ))}
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
                  WhatsApp com uma mensagem pronta — a disponibilidade será
                  confirmada pelo atendimento.
                </p>

                <ul className="attendance__benefits">
                  {FORM_BENEFITS.map((item) => (
                    <li key={item}>{item}</li>
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

      <AttendanceRegionSection />

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
                {SUBSCRIBER_PORTAL_URL ? (
                  <a
                    href={SUBSCRIBER_PORTAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline btn--md"
                  >
                    Central do Assinante
                  </a>
                ) : (
                  <p className="attendance__portal-pending" role="status">
                    Central do Assinante em breve.
                  </p>
                )}

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

      <section className="section attendance__final-cta">
        <div className="container container--narrow">
          <Reveal>
            <div className="attendance__final-card">
              <h2>Precisa de ajuda agora?</h2>
              <p>
                Nossa equipe está pronta para orientar contratação, suporte e
                consultas pelo WhatsApp.
              </p>
              <WhatsAppButton size="lg" className="btn--hero" />
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

function IssueIcon({ id }: { id: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {id === "wifi-nao-conecta" ? (
        <path d="M2 8.5 12 18l10-9.5M5 12l7 6.5L19 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      )}
      <path d="M12 9v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.75" fill="currentColor" />
    </svg>
  );
}
