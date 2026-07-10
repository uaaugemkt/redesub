import type { MediaRequirement } from "./mediaRequirements";
import { MEDIA_REQUIREMENTS } from "./mediaRequirements";

const byId = Object.fromEntries(
  MEDIA_REQUIREMENTS.map((item) => [item.id, item])
) as Record<string, MediaRequirement>;

type MediaId = (typeof MEDIA_REQUIREMENTS)[number]["id"];

/** Retorna o caminho da imagem final ou o placeholder local */
export function getMediaSrc(id: MediaId): string {
  const item = byId[id];
  return item?.currentPlaceholder ?? "";
}

export function getMediaAlt(id: MediaId, contextAlt: string): string {
  const item = byId[id];
  if (!item || item.status === "placeholder") {
    return `${contextAlt} (ilustração temporária — aguardando foto oficial da RedeSub)`;
  }
  return contextAlt;
}

export const MEDIA = {
  heroMain: () => getMediaSrc("hero-main"),
  familyConnected: () => getMediaSrc("family-connected"),
  homeOffice: () => getMediaSrc("home-office"),
  gamingStreaming: () => getMediaSrc("gaming-streaming"),
  technician: () => getMediaSrc("technician"),
  customerSupport: () => getMediaSrc("customer-support"),
  smallBusiness: () => getMediaSrc("small-business"),
  teamInstitutional: () => getMediaSrc("team-institutional"),
} as const;
