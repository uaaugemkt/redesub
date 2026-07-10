import { describe, expect, it } from "vitest";
import { isValidRegionId, getRegionById, REGIONS } from "./plans";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "./whatsapp";

describe("plans regions", () => {
  it("validates known region ids", () => {
    expect(isValidRegionId("oteiro")).toBe(true);
    expect(isValidRegionId("coraci")).toBe(true);
    expect(isValidRegionId("aguas-negras")).toBe(true);
    expect(isValidRegionId("invalid")).toBe(false);
  });

  it("returns plans only for Oteiro", () => {
    expect(getRegionById("oteiro")?.plans.length).toBe(3);
    expect(getRegionById("coraci")?.plans.length).toBe(0);
    expect(getRegionById("aguas-negras")?.plans.length).toBe(0);
  });

  it("lists all meeting regions", () => {
    const names = REGIONS.map((r: { name: string }) => r.name);
    expect(names).toContain("Oteiro");
    expect(names).toContain("Coraci");
    expect(names).toContain("Águas Negras");
  });
});

describe("whatsapp messages", () => {
  it("encodes contract inquiry with region and addons", () => {
    const message = WHATSAPP_MESSAGES.contractInquiry({
      region: "Oteiro",
      planName: "Segurança",
      speed: "650 Mega",
      additionalApps: ["hbo-max", "telecine"],
    });

    expect(message).toContain("Região: Oteiro");
    expect(message).toContain("Plano: Segurança");
    expect(message).toContain("Velocidade: 650 Mega");
    expect(message).toContain("HBO Max");
    expect(message).toContain("Telecine");
  });

  it("uses fallback when no addons selected", () => {
    const message = WHATSAPP_MESSAGES.contractInquiry({
      region: "Coraci",
      planName: "Básico",
      speed: "450 Mega",
      additionalApps: [],
    });
    expect(message).toContain("Adicionais de interesse: nenhum selecionado");
  });

  it("builds encoded wa.me link", () => {
    const url = buildWhatsAppLink("Olá! Teste");
    expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(url.split("text=")[1])).toBe("Olá! Teste");
  });

  it("includes support reason and region", () => {
    const message = WHATSAPP_MESSAGES.supportIssue({
      reason: "Estou sem internet",
      region: "Oteiro",
    });
    expect(message).toContain("Motivo: Estou sem internet");
    expect(message).toContain("Região: Oteiro");
  });
});
