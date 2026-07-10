import RegionFilter from "../components/RegionFilter";
import WhatsAppButton from "../components/WhatsAppButton";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import InternalHero from "../components/layout/InternalHero";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import { getMediaAlt, MEDIA } from "../config/media";
import { PAGE_META } from "../config/site";
import { useSelection } from "../context/SelectionContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { REGIONS } from "../lib/plans";
import { MAP } from "../lib/constants";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function CoveragePage() {
  usePageMeta(PAGE_META.cobertura);
  const { regionName } = useSelection();

  return (
    <>
      <InternalHero
        eyebrow="Cobertura"
        title="Atendimento regional com consulta por endereço"
        description="A RedeSub atende regiões específicas com internet de fibra e suporte local. Selecione sua região e consulte disponibilidade no seu endereço com nossa equipe."
        imageSrc={MEDIA.technician()}
        imageAlt={getMediaAlt("technician", "Técnico em atendimento regional")}
      >
        <WhatsAppButton
          message={WHATSAPP_MESSAGES.contractInquiry({
            region: regionName,
            coverageInterest: true,
          })}
          label="Consultar no meu endereço"
          size="lg"
          className="btn--hero"
        />
      </InternalHero>

      <PageContainer>
        <Breadcrumbs items={[{ label: "Início", path: "/" }, { label: "Cobertura" }]} />
      </PageContainer>

      <section className="section section--soft">
        <div className="container">
          <Reveal>
            <h2 className="section__title">Regiões atendidas</h2>
            <p className="section__desc coverage__note">
              Os nomes abaixo seguem a nomenclatura comercial da RedeSub. Na
              região Oteiro, o atendimento inclui áreas como Ilha de Outeiro e
              São João do Outeiro (Belém/PA).
            </p>
          </Reveal>

          <RegionFilter id="coverage-region-filter" className="coverage__filter" />

          <div className="coverage__regions-grid">
            {REGIONS.map((region) => (
              <article key={region.id} className="coverage__region-card">
                <h3>{region.name}</h3>
                {region.areaLabel && <p>{region.areaLabel}</p>}
                <p>
                  {region.plans.length > 0
                    ? "Planos disponíveis no site para consulta."
                    : "Consulte disponibilidade e planos com a equipe."}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container coverage__map-section">
          <Reveal>
            <h2 className="section__title">Nossa base de atendimento</h2>
          </Reveal>
          <div className="local__map-card coverage__map">
            <iframe
              title="Localização RedeSub — São João do Outeiro, Belém/PA"
              src={MAP.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="local__map-iframe"
            />
            <div className="local__map-footer">
              <a
                href={MAP.openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm"
              >
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container container--narrow">
          <Reveal>
            <h2 className="section__title">Como consultar disponibilidade</h2>
            <ol className="coverage__steps">
              <li>Selecione sua região.</li>
              <li>Informe bairro ou endereço pelo WhatsApp.</li>
              <li>Nossa equipe confirma viabilidade e próximos passos.</li>
            </ol>
            <p className="coverage__disclaimer">
              A disponibilidade depende do endereço. Não realizamos consulta
              automática de cobertura neste site.
            </p>
            <WhatsAppButton
              message={WHATSAPP_MESSAGES.regionAvailability(regionName ?? "minha região")}
              label="Consultar disponibilidade"
              variant="primary"
              size="lg"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
