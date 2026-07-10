import { Link } from "react-router-dom";
import { buildWhatsAppLink, SUPPORT_QUICK_ISSUES, WHATSAPP_MESSAGES } from "../lib/whatsapp";
import { useSelection } from "../context/SelectionContext";
import { SUBSCRIBER_PORTAL_URL } from "../config/integrations";
import Reveal from "../components/ui/Reveal";

interface SupportSectionProps {
  variant?: "preview" | "full";
}

export default function SupportSection({ variant = "full" }: SupportSectionProps) {
  const { regionName } = useSelection();
  const isPreview = variant === "preview";
  const issues = isPreview ? SUPPORT_QUICK_ISSUES.slice(0, 4) : SUPPORT_QUICK_ISSUES;

  return (
    <section className="support section section--soft" id="suporte">
      <div className="container">
        <div className="support__grid">
          <Reveal>
            <div className="support__intro">
              <span className="eyebrow">Precisa de ajuda?</span>
              <h2 className="section__title">Suporte técnico com atendimento humano</h2>
              <p className="section__desc support__desc">
                Cliente RedeSub? Escolha o motivo do contato e fale direto com
                nossa equipe pelo WhatsApp — sem formulários complicados.
              </p>
              {isPreview && (
                <Link to="/suporte" className="btn btn--outline btn--md">
                  Ver página de suporte
                </Link>
              )}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="support__actions">
              <h3 className="support__actions-title">Problemas comuns</h3>
              <ul className="support__issues">
                {issues.map((issue) => (
                  <li key={issue.id}>
                    <a
                      href={buildWhatsAppLink(
                        WHATSAPP_MESSAGES.supportIssue({
                          reason: issue.label,
                          region: regionName,
                        })
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="support__issue-btn"
                    >
                      {issue.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className="support__portal" id="central-assinante" aria-labelledby="portal-title">
              <h3 id="portal-title" className="support__portal-title">
                Central do Assinante
              </h3>
              <p className="support__portal-text">
                Acesse faturas, segunda via e serviços da sua conta no ambiente
                oficial do assinante — separado do suporte pelo WhatsApp.
              </p>
              {SUBSCRIBER_PORTAL_URL ? (
                <a
                  href={SUBSCRIBER_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--md support__portal-btn"
                >
                  Acessar Central do Assinante
                </a>
              ) : (
                <p className="support__portal-pending" role="status">
                  O link da Central do Assinante será disponibilizado em breve.
                  Enquanto isso, use o suporte pelo WhatsApp ou fale com nossa
                  equipe comercial.
                </p>
              )}
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
