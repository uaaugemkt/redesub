import { describe, expect, it } from "vitest";
import {
  DEFAULT_REGION_ID,
  isValidRegionId,
  getRegionById,
  REGIONS,
  getHeroFeaturedPlan,
  parsePlanSpeed,
} from "./plans";
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

  it("returns Evolução as hero featured plan", () => {
    const plan = getHeroFeaturedPlan();
    expect(plan.id).toBe("evolucao");
    expect(plan.speed).toBe("850 Mega");
    expect(plan.price).toBe("205,90");
  });

  it("parses plan speed for display", () => {
    expect(parsePlanSpeed("850 Mega")).toEqual({ value: "850", unit: "Mega" });
  });

  it("defaults region to Oteiro when none stored", () => {
    expect(DEFAULT_REGION_ID).toBe("oteiro");
    expect(getRegionById(DEFAULT_REGION_ID)?.plans.length).toBe(3);
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

  it("builds plan configuration message for WhatsApp", () => {
    const message = WHATSAPP_MESSAGES.planConfiguration({
      region: "Oteiro",
      planName: "Segurança",
      speed: "650 Mega",
      monthlyPrice: "175,90",
      addonNames: ["Disney+", "Telecine"],
    });

    expect(message).toContain("Olá! Vim pelo site da RedeSub");
    expect(message).toContain("Região: Oteiro");
    expect(message).toContain("Plano: Segurança");
    expect(message).toContain("Velocidade: 650 Mega");
    expect(message).toContain("Mensalidade exibida: R$ 175,90/mês");
    expect(message).toContain("Adicionais: Disney+, Telecine");
    expect(message).toContain("valor final para meu endereço");
  });

  it("plan configuration shows no addons when empty", () => {
    const message = WHATSAPP_MESSAGES.planConfiguration({
      region: "Oteiro",
      planName: "Básico",
      speed: "450 Mega",
      monthlyPrice: "145,90",
      addonNames: [],
    });
    expect(message).toContain("Adicionais: Nenhum adicional selecionado");
  });

  it("region availability message includes region name", () => {
    const message = WHATSAPP_MESSAGES.regionAvailability("Coraci");
    expect(message).toContain("Coraci");
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
