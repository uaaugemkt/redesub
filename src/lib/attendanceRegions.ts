import { ADDRESS, MAP } from "./constants";
import { REGIONS } from "./plans";

export type AttendanceRegionIcon = "map-pin" | "navigation" | "droplets";

export interface AttendanceServiceRegion {
  id: string;
  name: string;
  description: string;
  details: string;
  icon: AttendanceRegionIcon;
  mapEmbedUrl?: string;
  mapOpenUrl?: string;
  mapTitle?: string;
  address?: string;
  availabilityMessage: string;
}

const REGION_COPY: Record<
  string,
  Pick<AttendanceServiceRegion, "description" | "details" | "icon">
> = {
  oteiro: {
    description: "Ilha de Outeiro · São João do Outeiro",
    details: "Planos disponíveis para consulta no site.",
    icon: "map-pin",
  },
  coraci: {
    description: "Consulte disponibilidade e planos com a equipe.",
    details: "",
    icon: "navigation",
  },
  "aguas-negras": {
    description: "Consulte disponibilidade e planos com a equipe.",
    details: "",
    icon: "droplets",
  },
};

export const ATTENDANCE_SERVICE_REGIONS: readonly AttendanceServiceRegion[] =
  REGIONS.map((region) => {
    const copy = REGION_COPY[region.id];
    const hasMap = region.id === "oteiro";

    return {
      id: region.id,
      name: region.name,
      description: copy.description,
      details: copy.details,
      icon: copy.icon,
      availabilityMessage: copy.details || copy.description,
      ...(hasMap
        ? {
            mapEmbedUrl: MAP.embedUrl,
            mapOpenUrl: MAP.openUrl,
            mapTitle: "Localização RedeSub: São João do Outeiro, Belém/PA",
            address: ADDRESS.full,
          }
        : {}),
    };
  });

export function getAttendanceRegionById(
  id: string | null | undefined
): AttendanceServiceRegion | undefined {
  if (!id) return undefined;
  return ATTENDANCE_SERVICE_REGIONS.find((region) => region.id === id);
}
