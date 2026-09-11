import type { ValidatedJobApplication } from "./jobApplication";

export interface EmailEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  RESEND_TO_EMAIL?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(app: ValidatedJobApplication, resumeKey: string): string {
  const row = (label: string, value: string) =>
    `<p style="margin:0 0 8px"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value) || "—"}</p>`;

  return [
    "<div style=\"font-family:sans-serif;font-size:14px;color:#0f172a\">",
    "<p>Novo currículo recebido pelo site.</p>",
    row("Nome", app.name),
    row("Área de interesse", app.area),
    row("Cidade", `${app.city}/${app.state}`),
    row("E-mail", app.email),
    row("Telefone", app.phone),
    row("LinkedIn", app.linkedin || "não informado"),
    row("Mensagem", app.message || "não informada"),
    row("Data", new Date(app.consentAt).toLocaleString("pt-BR", { timeZone: "America/Belem" })),
    `<p style="margin:16px 0 0;color:#64748b;font-size:12px">Currículo armazenado no bucket privado R2, chave: ${escapeHtml(resumeKey)}. Acesse pelo painel administrativo do Cloudflare (R2 → redesub-job-applications) — o arquivo não possui URL pública.</p>`,
    "</div>",
  ].join("");
}

/**
 * Notifica a equipe via Resend. Retorna false (sem lançar) quando a
 * candidatura não pode ser perdida por causa de um problema de notificação —
 * quem chama decide como registrar a falha (ver functions/api/job-application.ts).
 */
export async function sendApplicationNotification(
  env: EmailEnv,
  app: ValidatedJobApplication,
  resumeKey: string
): Promise<{ sent: boolean; reason?: string }> {
  if (!env.RESEND_API_KEY) {
    return { sent: false, reason: "RESEND_API_KEY não configurada" };
  }
  if (!env.RESEND_TO_EMAIL) {
    return { sent: false, reason: "RESEND_TO_EMAIL não configurada" };
  }

  const from = env.RESEND_FROM_EMAIL || "RedeSub <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [env.RESEND_TO_EMAIL],
        reply_to: app.email,
        subject: `[RedeSub] Novo currículo recebido — ${app.name}`,
        html: buildEmailHtml(app, resumeKey),
      }),
    });

    if (!response.ok) {
      return { sent: false, reason: `Resend respondeu ${response.status}` };
    }

    return { sent: true };
  } catch {
    return { sent: false, reason: "falha de rede ao chamar Resend" };
  }
}
