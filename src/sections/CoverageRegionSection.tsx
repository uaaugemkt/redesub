import { useState } from "react";
import { MapPinIcon } from "../components/icons/BenefitIcons";
import Reveal from "../components/ui/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { ADDRESS } from "../lib/constants";
import {
  ATTENDANCE_SERVICE_REGIONS,
  getAttendanceRegionById,
  type AttendanceRegionIcon,
  type AttendanceServiceRegion,
} from "../lib/attendanceRegions";
import { DEFAULT_REGION_ID } from "../lib/plans";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function CoverageRegionSection() {
  const [activeId, setActiveId] = useState(DEFAULT_REGION_ID);

  const activeRegion =
    getAttendanceRegionById(activeId) ?? ATTENDANCE_SERVICE_REGIONS[0];

  return (
    <section
      className="section section--soft coverage-region"
      id="cobertura-regional"
      aria-labelledby="cobertura-regional-title"
    >
      <div className="container">
        <Reveal>
          <header className="coverage-section-heading">
            <span className="eyebrow">Selecione sua região</span>
            <h2 className="coverage-section-heading__title" id="cobertura-regional-title">
              Escolha uma região para continuar.
            </h2>
            <p className="coverage-section-heading__desc">
              Veja as informações locais e consulte a disponibilidade para o seu
              endereço.
            </p>
          </header>
        </Reveal>

        <Reveal delay={60}>
          <div className="coverage-panel">
            <div
              className="coverage-region-selector"
              role="group"
              aria-label="Regiões atendidas"
            >
              {ATTENDANCE_SERVICE_REGIONS.map((region) => {
                const isActive = region.id === activeRegion.id;

                return (
                  <button
                    key={region.id}
                    type="button"
                    aria-pressed={isActive}
                    className={`coverage-region-selector__option ${isActive ? "coverage-region-selector__option--active" : ""}`}
                    onClick={() => setActiveId(region.id)}
                  >
                    <span
                      className="coverage-region-selector__icon"
                      aria-hidden="true"
                    >
                      <RegionIcon type={region.icon} />
                    </span>

                    <span className="coverage-region-selector__body">
                      <span className="coverage-region-selector__top">
                        <strong>{region.name}</strong>
                        {isActive && (
                          <span
                            className="coverage-region-selector__check"
                            aria-hidden="true"
                          >
                            <CheckIcon />
                          </span>
                        )}
                      </span>
                      <span className="coverage-region-selector__complement">
                        {region.description}
                      </span>
                      {region.details ? (
                        <span className="coverage-region-selector__info">
                          {region.details}
                        </span>
                      ) : null}
                    </span>

                    <span className="sr-only">
                      {isActive ? "Região selecionada" : ""}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="coverage-region-content" aria-live="polite">
              <CoverageRegionPanel region={activeRegion} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CoverageRegionPanel({ region }: { region: AttendanceServiceRegion }) {
  if (region.mapEmbedUrl) {
    return (
      <div className="coverage-region-content__oteiro">
        <header className="coverage-region-content__header">
          <h3 className="coverage-region-content__title">
            Atendimento em {region.name}
          </h3>
          <address className="coverage-region-content__address">
            <span>{ADDRESS.street}</span>
            <span>
              {ADDRESS.neighborhood}, {ADDRESS.city}
            </span>
          </address>
        </header>

        <div className="coverage-region-content__map-wrap">
          <iframe
            key={region.id}
            title={region.mapTitle ?? `Mapa — ${region.name}`}
            src={region.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="coverage-region-content__map"
            tabIndex={-1}
          />
        </div>

        {region.mapOpenUrl ? (
          <a
            href={region.mapOpenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="coverage-region-content__map-link"
          >
            Abrir no Google Maps
            <ArrowIcon />
          </a>
        ) : null}

        <div className="coverage-region-content__cta">
          <WhatsAppButton
            message={WHATSAPP_MESSAGES.coverageRegionConsult(region.name)}
            label="Consultar pelo WhatsApp"
            variant="primary"
            size="md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="coverage-region-content__fallback">
      <span className="coverage-region-content__fallback-icon" aria-hidden="true">
        <RegionIcon type={region.icon} large />
      </span>
      <h3 className="coverage-region-content__title">
        Consulte a disponibilidade em {region.name}
      </h3>
      <p className="coverage-region-content__fallback-text">
        A disponibilidade e as opções de atendimento são confirmadas pela equipe
        conforme o endereço informado.
      </p>
      <WhatsAppButton
        message={WHATSAPP_MESSAGES.coverageRegionConsult(region.name)}
        label="Consultar pelo WhatsApp"
        variant="primary"
        size="md"
      />
    </div>
  );
}

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

function RegionIcon({
  type,
  large = false,
}: {
  type: AttendanceRegionIcon;
  large?: boolean;
}) {
  const size = large ? 32 : 22;

  if (type === "map-pin") {
    return (
      <MapPinIcon className={large ? "coverage-region-content__icon-lg" : undefined} />
    );
  }

  if (type === "navigation") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={large ? "coverage-region-content__icon-lg" : undefined}
      >
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="m12 8 3 5h-6l3-5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.25" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={large ? "coverage-region-content__icon-lg" : undefined}
    >
      <path
        d="M12 3c-2.5 2.8-5 5.4-5 8.5a5 5 0 1 0 10 0c0-3.1-2.5-5.7-5-8.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 14.5c.8 1.2 2.2 2 3.5 2s2.7-.8 3.5-2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.14" />
      <path
        d="M4.5 8l2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
