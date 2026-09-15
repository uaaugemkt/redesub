import { useCallback, useId, useRef, useState } from "react";
import ChannelsModal from "../components/ChannelsModal";
import Reveal from "../components/ui/Reveal";
import { VideoIcon } from "../components/icons/BusinessImpactIcons";
import {
  CONTENT_PACKAGES,
  getChannelCount,
  getFeaturedChannels,
  type ContentChannel,
  type ContentPackage,
} from "../lib/contentPackages";
import { buildWhatsAppLink } from "../lib/whatsapp";

function getInitialPackage(): ContentPackage {
  return (
    CONTENT_PACKAGES.find((pkg) => pkg.featured) ?? CONTENT_PACKAGES[0]
  );
}

function packageFamily(pkg: ContentPackage): "power" | "hub" {
  return pkg.id.startsWith("hub") ? "hub" : "power";
}

function ShowcaseArt({ family }: { family: "power" | "hub" }) {
  return (
    <div className="content-packages__stage" aria-hidden="true" data-family={family}>
      <div className="content-packages__stage-glow" />
      <div className="content-packages__stage-ring content-packages__stage-ring--outer" />
      <div className="content-packages__stage-ring content-packages__stage-ring--inner" />
      <div className="content-packages__stage-play">
        <VideoIcon />
      </div>
      <span className="content-packages__stage-chip content-packages__stage-chip--a">AO VIVO</span>
      <span className="content-packages__stage-chip content-packages__stage-chip--b">VOD</span>
      <span className="content-packages__stage-chip content-packages__stage-chip--c">TV</span>
      <span className="content-packages__stage-orb content-packages__stage-orb--1" />
      <span className="content-packages__stage-orb content-packages__stage-orb--2" />
      <span className="content-packages__stage-orb content-packages__stage-orb--3" />
    </div>
  );
}

/**
 * Faixa discreta de marcas em destaque — ocupa o lugar das tags quando o
 * pacote tem lista de canais. Carrega já (é argumento comercial).
 */
function FeaturedLogos({ channels }: { channels: readonly ContentChannel[] }) {
  return (
    <div className="content-packages__logos">
      <p className="content-packages__logos-label">Grandes canais no pacote</p>
      <ul className="content-packages__logos-list" aria-label="Marcas em destaque">
        {channels.map((channel) => (
          <li key={channel.logo} className="content-packages__logo">
            <img
              src={channel.logo}
              alt={channel.name}
              width={512}
              height={512}
              loading="eager"
              decoding="async"
              draggable={false}
              className="content-packages__logo-img"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface AppsSectionProps {
  variant?: "preview" | "full";
  /** Mantido por compatibilidade — a seção é sempre a vitrine de pacotes */
  informativeOnly?: boolean;
}

export default function AppsSection({ variant = "preview" }: AppsSectionProps = {}) {
  const tabsId = useId();
  const [activeId, setActiveId] = useState(() => getInitialPackage().id);
  const [channelsOpen, setChannelsOpen] = useState(false);
  const showAllButtonRef = useRef<HTMLButtonElement>(null);
  const activePackage =
    CONTENT_PACKAGES.find((pkg) => pkg.id === activeId) ?? getInitialPackage();
  const family = packageFamily(activePackage);
  const href = buildWhatsAppLink(activePackage.whatsappMessage);
  const panelId = `${tabsId}-panel`;
  const variantClass =
    variant === "full" ? "content-packages--plans" : "content-packages--home";

  const channelCount = getChannelCount(activePackage);
  const featuredChannels = getFeaturedChannels(activePackage);
  const hasChannelList = (activePackage.channels?.length ?? 0) > 0;

  const openChannels = useCallback(() => setChannelsOpen(true), []);
  const closeChannels = useCallback(() => setChannelsOpen(false), []);

  const selectPackage = (id: string) => {
    setActiveId(id);
    setChannelsOpen(false);
  };

  return (
    <section
      className={`content-packages content-packages--showcase section ${variantClass}`}
      id="conteudos"
    >
      <div className="container">
        <Reveal>
          <div className="section__header section__header--center content-packages__header">
            <span className="eyebrow">Mais que internet</span>
            <h2 className="section__title">Dê um UP no seu plano</h2>
            <p className="section__desc">
              Escolha um pacote de conteúdos e aproveite ainda mais sua conexão
              RedeSub.
            </p>
            <p className="content-packages__note">
              Pacotes adicionais ao plano de internet.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className={`content-packages__showcase content-packages__showcase--${family}`}>
            <div
              className="content-packages__tabs"
              role="tablist"
              aria-label="Pacotes de conteúdos"
            >
              {CONTENT_PACKAGES.map((pkg) => {
                const selected = pkg.id === activePackage.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    role="tab"
                    id={`${tabsId}-${pkg.id}`}
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    className={`content-packages__tab${selected ? " is-active" : ""}`}
                    onClick={() => selectPackage(pkg.id)}
                  >
                    {pkg.name}
                  </button>
                );
              })}
            </div>

            <div
              className="content-packages__panel"
              role="tabpanel"
              id={panelId}
              aria-labelledby={`${tabsId}-${activePackage.id}`}
            >
              <ShowcaseArt family={family} />

              <div key={activePackage.id} className="content-packages__detail">
                <p className="content-packages__family" data-family={family}>
                  {hasChannelList ? activePackage.name : family === "hub" ? "Hub" : "Power"}
                </p>
                <h3 className="content-packages__name">{activePackage.name}</h3>

                <p
                  className="content-packages__channels"
                  aria-label={`${channelCount} canais`}
                >
                  <span className="content-packages__channels-value">{channelCount}</span>
                  <span className="content-packages__channels-label">Canais</span>
                </p>

                {/* Com lista de canais, as marcas em destaque ocupam o lugar das tags. */}
                {!hasChannelList && (
                  <ul className="content-packages__chips">
                    {activePackage.groups.map((group) => (
                      <li key={`${activePackage.id}-${group.type}`}>
                        <span className="content-packages__chip">{group.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="content-packages__desc">{activePackage.description}</p>
                {activePackage.descriptionSecondary && (
                  <p className="content-packages__desc content-packages__desc--secondary">
                    {activePackage.descriptionSecondary}
                  </p>
                )}

                {hasChannelList && featuredChannels.length > 0 && (
                  <FeaturedLogos channels={featuredChannels} />
                )}

                <div className="content-packages__actions">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary btn--lg content-packages__cta"
                  >
                    Quero este pacote
                  </a>
                  {hasChannelList && (
                    <button
                      ref={showAllButtonRef}
                      type="button"
                      className="btn btn--outline-light btn--lg content-packages__cta content-packages__cta--secondary"
                      onClick={openChannels}
                    >
                      Ver todos os canais
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {hasChannelList && (
        <ChannelsModal
          open={channelsOpen}
          pkg={activePackage}
          onClose={closeChannels}
          returnFocusRef={showAllButtonRef}
        />
      )}
    </section>
  );
}
