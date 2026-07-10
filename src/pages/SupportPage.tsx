import { Link } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import InternalHero from "../components/layout/InternalHero";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { getMediaAlt, MEDIA } from "../config/media";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";
import SupportSection from "../sections/SupportSection";
import { buildWhatsAppLink, SUPPORT_QUICK_ISSUES, WHATSAPP_MESSAGES } from "../lib/whatsapp";
import { useSelection } from "../context/SelectionContext";
import { SUBSCRIBER_PORTAL_URL } from "../config/integrations";

const QUICK_TIPS = [
  "Reinicie o roteador e aguarde alguns minutos antes de testar novamente.",
  "Verifique se os cabos estão bem conectados e se o equipamento tem energia.",
  "Observe as luzes do roteador — elas indicam o status da conexão.",
  "Evite resetar configurações de fábrica sem orientação do suporte.",
] as const;

export default function SupportPage() {
  usePageMeta(PAGE_META.suporte);
  const { regionName } = useSelection();

  return (
    <>
      <InternalHero
        eyebrow="Suporte"
        title="Ajuda rápida com atendimento humano"
        description="Cliente RedeSub? Escolha o motivo do contato ou siga orientações iniciais. Nossa equipe está pronta para ajudar pelo WhatsApp."
        imageSrc={MEDIA.customerSupport()}
        imageAlt={getMediaAlt("customer-support", "Atendimento ao cliente")}
      >
        <WhatsAppButton
          message={WHATSAPP_MESSAGES.supportIssue({
            reason: "Falar com o suporte",
            region: regionName,
          })}
          label="Falar com suporte"
          size="lg"
          className="btn--hero"
        />
      </InternalHero>

      <PageContainer>
        <Breadcrumbs items={[{ label: "Início", path: "/" }, { label: "Suporte" }]} />
      </PageContainer>

      <SupportSection variant="full" />

      <section className="section section--soft">
        <div className="container">
          <Reveal>
            <h2 className="section__title">Diagnóstico rápido</h2>
            <p className="section__desc">
              Antes de chamar o suporte, tente estas verificações simples:
            </p>
            <ul className="support-tips">
              {QUICK_TIPS.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section__title">Todos os motivos de contato</h2>
            <ul className="support__issues support__issues--page">
              {SUPPORT_QUICK_ISSUES.map((issue) => (
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
          </Reveal>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container container--narrow">
          <Reveal>
            <h2 className="section__title">Teste de velocidade</h2>
            <p className="section__desc">
              Meça sua conexão atual pelo teste interno. Para um resultado mais
              confiável, conecte-se por cabo quando possível e feche downloads
              em segundo plano.
            </p>
            <Link to="/teste-de-velocidade" className="btn btn--primary btn--md">
              Ir para o teste de velocidade
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" id="central-assinante">
        <div className="container container--narrow">
          <Reveal>
            <h2 className="section__title">Central do Assinante</h2>
            <p className="section__desc">
              Acesse faturas, segunda via e serviços da conta no ambiente oficial
              — separado do suporte pelo WhatsApp.
            </p>
            {SUBSCRIBER_PORTAL_URL ? (
              <a
                href={SUBSCRIBER_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--md"
              >
                Acessar Central do Assinante
              </a>
            ) : (
              <p className="support__portal-pending" role="status">
                O link da Central do Assinante será disponibilizado em breve.
              </p>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
