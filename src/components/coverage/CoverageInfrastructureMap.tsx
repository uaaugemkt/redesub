import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import type { LatLngBoundsLiteral, PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import WhatsAppButton from "../WhatsAppButton";
import { WHATSAPP_MESSAGES } from "../../lib/whatsapp";

const GEOJSON_URL = "/data/redesub-cobertura-publica.geojson";

/** Minimal, safe shape derived from the sanitized public GeoJSON. */
interface InfraPoint {
  lat: number;
  lng: number;
  count: number;
}

type LoadState = "loading" | "ready" | "error";

/** In-memory cache so switching regions back to Outeiro does not refetch. */
let cachedPoints: InfraPoint[] | null = null;

const CIRCLE_STYLE: PathOptions = {
  color: "#071a35",
  weight: 1,
  opacity: 0.55,
  fillColor: "#ff5a00",
  fillOpacity: 0.28,
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/** Validates the FeatureCollection and returns only safe Point features. */
function parseInfraPoints(data: unknown): InfraPoint[] {
  if (!data || typeof data !== "object") return [];
  const collection = data as { type?: unknown; features?: unknown };
  if (collection.type !== "FeatureCollection" || !Array.isArray(collection.features)) {
    return [];
  }

  const points: InfraPoint[] = [];
  for (const rawFeature of collection.features) {
    if (!rawFeature || typeof rawFeature !== "object") continue;
    const feature = rawFeature as {
      geometry?: { type?: unknown; coordinates?: unknown };
      properties?: { count?: unknown };
    };
    const geometry = feature.geometry;
    if (!geometry || geometry.type !== "Point" || !Array.isArray(geometry.coordinates)) {
      continue;
    }
    const [lng, lat] = geometry.coordinates as unknown[];
    if (!isFiniteNumber(lng) || !isFiniteNumber(lat)) continue;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) continue;

    const rawCount = feature.properties?.count;
    const count = isFiniteNumber(rawCount) && rawCount > 0 ? rawCount : 1;
    points.push({ lat, lng, count });
  }

  return points;
}

function radiusForCount(count: number): number {
  if (count <= 1) return 5;
  if (count <= 4) return 7;
  return 9;
}

function computeBounds(points: InfraPoint[]): LatLngBoundsLiteral {
  let minLat = Infinity;
  let minLng = Infinity;
  let maxLat = -Infinity;
  let maxLng = -Infinity;
  for (const point of points) {
    if (point.lat < minLat) minLat = point.lat;
    if (point.lat > maxLat) maxLat = point.lat;
    if (point.lng < minLng) minLng = point.lng;
    if (point.lng > maxLng) maxLng = point.lng;
  }
  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ];
}

interface CoverageInfrastructureMapProps {
  regionName: string;
}

export default function CoverageInfrastructureMap({
  regionName,
}: CoverageInfrastructureMapProps) {
  const [state, setState] = useState<LoadState>(cachedPoints ? "ready" : "loading");
  const [points, setPoints] = useState<InfraPoint[]>(cachedPoints ?? []);

  useEffect(() => {
    if (cachedPoints) return;

    const controller = new AbortController();
    let active = true;

    (async () => {
      try {
        const response = await fetch(GEOJSON_URL, { signal: controller.signal });
        if (!response.ok) throw new Error("request-failed");
        const data: unknown = await response.json();
        const parsed = parseInfraPoints(data);
        if (parsed.length === 0) throw new Error("empty");
        cachedPoints = parsed;
        if (!active) return;
        setPoints(parsed);
        setState("ready");
      } catch (error) {
        if (controller.signal.aborted) return;
        if (!active) return;
        setState("error");
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="coverage-infra">
        <div
          className="coverage-infra__map coverage-infra__map--status"
          role="status"
          aria-live="polite"
        >
          <span className="coverage-infra__spinner" aria-hidden="true" />
          <p>Carregando mapa da região...</p>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="coverage-infra">
        <div className="coverage-infra__map coverage-infra__map--status" role="alert">
          <h4 className="coverage-infra__error-title">
            Não foi possível carregar o mapa agora.
          </h4>
          <p className="coverage-infra__error-text">
            Você ainda pode consultar a disponibilidade diretamente com a equipe
            RedeSub.
          </p>
          <WhatsAppButton
            message={WHATSAPP_MESSAGES.coverageRegionConsult(regionName)}
            label="Consultar disponibilidade"
            variant="primary"
            size="md"
          />
        </div>
      </div>
    );
  }

  const bounds = computeBounds(points);

  return (
    <div className="coverage-infra">
      <div className="coverage-infra__head">
        <h4 className="coverage-infra__title">Infraestrutura aproximada na região</h4>
        <p className="coverage-infra__desc">
          O mapa apresenta áreas próximas à infraestrutura da RedeSub. A
          disponibilidade do serviço é confirmada individualmente conforme o
          endereço informado.
        </p>
      </div>

      <div
        className="coverage-infra__map"
        role="group"
        aria-label={`Mapa aproximado da infraestrutura da RedeSub na região de ${regionName}. Visualização indicativa; não representa disponibilidade garantida.`}
      >
        <MapContainer
          className="coverage-infra__leaflet"
          bounds={bounds}
          boundsOptions={{ padding: [24, 24], maxZoom: 15 }}
          maxZoom={17}
          minZoom={11}
          scrollWheelZoom={false}
          preferCanvas
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {points.map((point, index) => (
            <CircleMarker
              key={index}
              center={[point.lat, point.lng]}
              radius={radiusForCount(point.count)}
              pathOptions={CIRCLE_STYLE}
              interactive={false}
            />
          ))}
        </MapContainer>
      </div>

      <ul className="coverage-infra__legend">
        <li className="coverage-infra__legend-item">
          <span className="coverage-infra__legend-dot" aria-hidden="true" />
          Ponto: infraestrutura próxima
        </li>
        <li className="coverage-infra__legend-item coverage-infra__legend-item--muted">
          Mapa indicativo
        </li>
      </ul>
    </div>
  );
}
