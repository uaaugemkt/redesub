import Breadcrumbs from "../components/ui/Breadcrumbs";
import InternalHero from "../components/layout/InternalHero";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { getMediaAlt, MEDIA } from "../config/media";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

const BUSINESS_POINTS = [
  "Internet estável para operações do dia a dia.",
  "Suporte para videoconferências e sistemas online.",
  "Atendimento local para consultar viabilidade.",
  "Soluções analisadas conforme necessidade do negócio.",
] as const;

export default function BusinessPage() {
  usePageMeta(PAGE_META.empresas);

  const businessMessage = [
    "Olá! Vim pelo site da RedeSub e gostaria de consultar internet para meu negócio.",
    "",
    "Gostaria de informações sobre disponibilidade e soluções para pequenos negócios.",
    "",
    "Aguardo retorno da equipe.",
  ].join("\n");

  return (
    <>
      <InternalHero
        eyebrow="Para empresas"
        title="Internet para pequenos negócios"
        description="Conectividade com atendimento próximo para comércios e serviços locais. Consulte viabilidade e opções com nossa equipe — sem compromisso."
        imageSrc={MEDIA.smallBusiness()}
        imageAlt={getMediaAlt("small-business", "Pequeno negócio conectado")}
      >
        <WhatsAppButton
          message={businessMessage}
          label="Consultar para meu negócio"
          size="lg"
          className="btn--hero"
        />
      </InternalHero>

      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Início", path: "/" },
            { label: "Para empresas" },
          ]}
        />
      </PageContainer>

      <section className="section">
        <div className="container business__grid">
          <Reveal>
            <h2 className="section__title">Como podemos ajudar</h2>
            <ul className="business__list">
              {BUSINESS_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="business__cta-card">
              <h3>Consulta de viabilidade</h3>
              <p>
                Informe o endereço do estabelecimento e conte como sua equipe
                usa a internet. A equipe RedeSub retorna com orientações.
              </p>
              <WhatsAppButton
                message={WHATSAPP_MESSAGES.contractInquiry({
                  coverageInterest: true,
                })}
                label="Consultar pelo WhatsApp"
                variant="primary"
                size="md"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container container--narrow">
          <Reveal>
            <p className="business__disclaimer">
              Planos empresariais, velocidades exclusivas, SLA e condições
              técnicas serão informados somente após análise e confirmação pela
              equipe comercial. Este site não exibe preços empresariais.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
