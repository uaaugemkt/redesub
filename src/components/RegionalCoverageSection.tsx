import { useEffect, useState } from "react";
import { MapPinIcon } from "./icons/BenefitIcons";
import Reveal from "./ui/Reveal";
import WhatsAppButton from "./WhatsAppButton";
import { useSelection } from "../context/SelectionContext";
import {
  ATTENDANCE_SERVICE_REGIONS,
  getAttendanceRegionById,
  type AttendanceRegionIcon,
  type AttendanceServiceRegion,
} from "../lib/attendanceRegions";
import { DEFAULT_REGION_ID, isValidRegionId } from "../lib/plans";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

export interface RegionalCoverageSectionProps {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

const DEFAULT_COPY = {
  sectionId: "cobertura-atendimento",
  eyebrow: "Cobertura e atendimento",
  title: "Escolha sua região",
  description:
    "Consulte a área atendida, informações locais e disponibilidade da RedeSub.",
} as const;

function resolveInitialRegionId(regionId: string | null): string {
  if (regionId && isValidRegionId(regionId)) return regionId;
  return DEFAULT_REGION_ID;
}

export default function RegionalCoverageSection({
  sectionId = DEFAULT_COPY.sectionId,
  eyebrow = DEFAULT_COPY.eyebrow,
  title = DEFAULT_COPY.title,
  description = DEFAULT_COPY.description,
}: RegionalCoverageSectionProps = {}) {
  const { regionId, setRegionId } = useSelection();
  const [activeId, setActiveId] = useState(() => resolveInitialRegionId(regionId));

  useEffect(() => {
    if (regionId && isValidRegionId(regionId)) {
      setActiveId(regionId);
    }
  }, [regionId]);

  const activeRegion =
    getAttendanceRegionById(activeId) ?? ATTENDANCE_SERVICE_REGIONS[0];

  const selectRegion = (id: string) => {
    setActiveId(id);
    setRegionId(id);
  };

  return (
    <section
      className="section section--soft attendance-region"
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="container">
        <Reveal>
          <header className="attendance-region__header">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section__title" id={`${sectionId}-title`}>
              {title}
            </h2>
            <p className="section__desc">{description}</p>
          </header>
        </Reveal>

        <div className="attendance-region__layout">
          <div className="attendance-region__panel">
            <div
              className="attendance-region__selectors"
              role="radiogroup"
              aria-label="Regiões atendidas"
            >
              {ATTENDANCE_SERVICE_REGIONS.map((region) => {
                const isActive = region.id === activeRegion.id;

                return (
                  <button
                    key={region.id}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    className={`attendance-region__selector ${isActive ? "attendance-region__selector--active" : ""}`}
                    onClick={() => selectRegion(region.id)}
                  >
                    <span className="attendance-region__selector-icon" aria-hidden="true">
                      <RegionIcon type={region.icon} />
                    </span>

                    <span className="attendance-region__selector-body">
                      <span className="attendance-region__selector-top">
                        <strong>{region.name}</strong>
                        {isActive && (
                          <span className="attendance-region__selector-check" aria-hidden="true">
                            <CheckIcon />
                          </span>
                        )}
                      </span>
                      <span className="attendance-region__selector-desc">
                        {region.description}
                      </span>
                      {region.details && (
                        <span className="attendance-region__selector-detail">
                          {region.details}
                        </span>
                      )}
                    </span>

                    <span className="sr-only">
                      {isActive ? "Região selecionada" : ""}
                    </span>
                  </button>
                );
              })}
            </div>

            <RegionDetails region={activeRegion} />
          </div>

          <div className="attendance-region__map-wrap">
            <RegionMap region={activeRegion} />
          </div>
        </div>
      </div>
    </section>
  );
}

function RegionDetails({ region }: { region: AttendanceServiceRegion }) {
  return (
    <div className="attendance-region__details" aria-live="polite">
      <h3 className="attendance-region__details-title">{region.name}</h3>
      <p className="attendance-region__details-desc">{region.description}</p>
      {region.details && (
        <p className="attendance-region__details-note">{region.details}</p>
      )}

      {region.address && (
        <dl className="attendance-region__address">
          <dt>Base de atendimento</dt>
          <dd>{region.address}</dd>
        </dl>
      )}

      <p className="attendance-region__availability">
        A disponibilidade depende do endereço. Nossa equipe confirma a viabilidade
        pelo WhatsApp.
      </p>

      <WhatsAppButton
        message={WHATSAPP_MESSAGES.regionAvailability(region.name)}
        label="Consultar disponibilidade"
        variant="primary"
        size="md"
      />
    </div>
  );
}

function RegionMap({ region }: { region: AttendanceServiceRegion }) {
  if (!region.mapEmbedUrl) {
    return (
      <div className="attendance-region__map attendance-region__map--empty">
        <div className="attendance-region__map-placeholder">
          <RegionIcon type={region.icon} large />
          <h3>Cobertura consultada com a equipe</h3>
          <p>
            A disponibilidade nesta região varia conforme o endereço. Fale com a
            RedeSub para confirmar o atendimento no seu local.
          </p>
          <WhatsAppButton
            message={WHATSAPP_MESSAGES.regionAvailability(region.name)}
            label="Consultar disponibilidade"
            variant="primary"
            size="md"
          />
        </div>
      </div>
    );
  }

  return (
    <article className="attendance-region__location-card">
      <iframe
        key={region.id}
        title={region.mapTitle ?? `Mapa de ${region.name}`}
        src={region.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="attendance-region__location-map"
        tabIndex={-1}
      />
      <div className="attendance-region__location-body">
        <span className="attendance-region__location-badge">Base local</span>
        <h3 className="attendance-region__location-title">Base de atendimento RedeSub</h3>
        <p className="attendance-region__location-place">{region.description}</p>
        {region.address && (
          <p className="attendance-region__location-address">{region.address}</p>
        )}
        <p className="attendance-region__location-note">
          Atendimento e consulta de cobertura para a região.
        </p>
        {region.mapOpenUrl && (
          <a
            href={region.mapOpenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="attendance-region__location-link"
          >
            Abrir no Google Maps
            <ArrowIcon />
          </a>
        )}
      </div>
    </article>
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
    return <MapPinIcon className={large ? "attendance-region__icon-lg" : undefined} />;
  }

  if (type === "navigation") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={large ? "attendance-region__icon-lg" : undefined}
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
      className={large ? "attendance-region__icon-lg" : undefined}
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
