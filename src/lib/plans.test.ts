import { describe, expect, it } from "vitest";
import {
  DEFAULT_REGION_ID,
  isValidRegionId,
  getRegionById,
  normalizeRegionId,
  REGIONS,
  getHeroFeaturedPlan,
  parsePlanSpeed,
  PLANS,
} from "./plans";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "./whatsapp";

describe("plans regions", () => {
  it("validates known region ids and legacy aliases", () => {
    expect(isValidRegionId("outeiro")).toBe(true);
    expect(isValidRegionId("oteiro")).toBe(true);
    expect(normalizeRegionId("oteiro")).toBe("outeiro");
    expect(isValidRegionId("coraci")).toBe(false);
    expect(isValidRegionId("aguas-negras")).toBe(false);
    expect(isValidRegionId("invalid")).toBe(false);
  });

  it("returns four residential plans for Outeiro", () => {
    expect(getRegionById("outeiro")?.plans.length).toBe(4);
    expect(getRegionById("oteiro")?.name).toBe("Outeiro");
    expect(getRegionById("coraci")).toBeUndefined();
    expect(getRegionById("aguas-negras")).toBeUndefined();
  });

  it("lists only Outeiro as the public coverage region", () => {
    const names = REGIONS.map((r: { name: string }) => r.name);
    expect(names).toEqual(["Outeiro"]);
  });

  it("exposes confirmed residential plans without prices", () => {
    expect(PLANS.map((p) => p.id)).toEqual([
      "novo-basico",
      "liberdade",
      "mais-seguranca",
      "new-evolucao-turbo",
    ]);
    for (const plan of PLANS) {
      expect(plan).not.toHaveProperty("price");
      expect(plan.whatsappMessage).toContain(plan.name);
      expect(plan.whatsappMessage).not.toMatch(/R\$|mensalidade|\/mês/i);
      expect(plan.features.some((f) => /tudo do plano/i.test(f))).toBe(false);
    }
  });

  it("marks Liberdade with Sem fidelidade badge", () => {
    const liberdade = PLANS.find((p) => p.id === "liberdade");
    expect(liberdade?.badge).toBe("Sem fidelidade");
  });

  it("returns New Evolução Turbo as featured plan helper", () => {
    const plan = getHeroFeaturedPlan();
    expect(plan.id).toBe("new-evolucao-turbo");
    expect(plan.speed).toBe("800 Mega");
  });

  it("parses plan speed for display", () => {
    expect(parsePlanSpeed("800 Mega")).toEqual({ value: "800", unit: "Mega" });
  });

  it("defaults region to Outeiro when none stored", () => {
    expect(DEFAULT_REGION_ID).toBe("outeiro");
    expect(getRegionById(DEFAULT_REGION_ID)?.plans.length).toBe(4);
  });
});

describe("whatsapp messages", () => {
  it("encodes contract inquiry with region and plan", () => {
    const message = WHATSAPP_MESSAGES.contractInquiry({
      region: "Outeiro",
      planName: "Liberdade",
      speed: "400 Mega",
    });

    expect(message).toContain("Região: Outeiro");
    expect(message).toContain("Plano: Liberdade");
    expect(message).toContain("Velocidade: 400 Mega");
    expect(message).toContain("Adicionais de interesse: nenhum selecionado");
  });

  it("builds encoded wa.me link with official WhatsApp number", () => {
    const url = buildWhatsAppLink("Olá! Teste");
    expect(url).toMatch(/^https:\/\/wa\.me\/5591993100223\?text=/);
    expect(decodeURIComponent(url.split("text=")[1])).toBe("Olá! Teste");
  });

  it("builds individual plan interest WhatsApp links", () => {
    for (const plan of PLANS) {
      const url = buildWhatsAppLink(plan.whatsappMessage);
      expect(url).toMatch(/^https:\/\/wa\.me\/5591993100223\?text=/);
      expect(decodeURIComponent(url.split("text=")[1])).toBe(plan.whatsappMessage);
    }
  });

  it("region availability message includes region name", () => {
    const message = WHATSAPP_MESSAGES.regionAvailability("Outeiro");
    expect(message).toContain("Outeiro");
  });

  it("uses suggested availability message", () => {
    expect(WHATSAPP_MESSAGES.availability).toContain(
      "consultar a disponibilidade da RedeSub para o meu endereço"
    );
  });

  it("includes support reason and region", () => {
    const message = WHATSAPP_MESSAGES.supportIssue({
      reason: "Estou sem internet",
      region: "Outeiro",
    });
    expect(message).toContain("Motivo: Estou sem internet");
    expect(message).toContain("Região: Outeiro");
  });
});
