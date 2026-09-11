import { buildResumeKey, validateFields, validateResume } from "../lib/jobApplication";
import { sendApplicationNotification, type EmailEnv } from "../lib/notifyEmail";

interface Env extends EmailEnv {
  RESUMES_BUCKET: R2Bucket;
}

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

function jsonError(message: string, status: number, fieldErrors?: unknown) {
  return new Response(JSON.stringify({ ok: false, error: message, fieldErrors }), {
    status,
    headers: JSON_HEADERS,
  });
}

/**
 * POST /api/job-application — recebe a candidatura de "Trabalhe conosco".
 *
 * Fluxo: valida campos e arquivo no servidor (nunca confia só no frontend),
 * grava o currículo + metadados no R2 (bucket privado, nunca público),
 * tenta notificar por e-mail (Resend) sem derrubar a candidatura se o
 * e-mail falhar — a gravação no R2 é a fonte de verdade.
 */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESUMES_BUCKET) {
    console.error("job-application: binding RESUMES_BUCKET ausente");
    return jsonError(
      "Não conseguimos enviar seu currículo agora. Tente novamente em alguns instantes.",
      503
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError("Não foi possível ler os dados enviados.", 400);
  }

  // Honeypot: campo invisível para humanos — bots costumam preenchê-lo.
  const honeypot = String(form.get("website") ?? "").trim();
  if (honeypot) {
    // Resposta "de sucesso" para não ensinar o bot a identificar o honeypot.
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
  }

  // Time-trap: formulário legítimo leva pelo menos alguns segundos para ser
  // preenchido; envios quase instantâneos são quase sempre automação.
  const renderedAt = Number(form.get("renderedAt") ?? 0);
  if (renderedAt && Date.now() - renderedAt < 2500) {
    return jsonError(
      "Não conseguimos enviar seu currículo agora. Tente novamente em alguns instantes.",
      400
    );
  }

  const raw: Record<string, string> = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
    city: String(form.get("city") ?? ""),
    state: String(form.get("state") ?? ""),
    area: String(form.get("area") ?? ""),
    linkedin: String(form.get("linkedin") ?? ""),
    message: String(form.get("message") ?? ""),
    consent: String(form.get("consent") ?? ""),
  };

  const { data: fields, errors: fieldErrors } = validateFields(raw);
  const resumeEntry = form.get("resume");
  const { data: resume, error: resumeError } = await validateResume(
    resumeEntry instanceof File ? resumeEntry : null
  );

  const allErrors = [...fieldErrors, ...(resumeError ? [{ field: "resume", message: resumeError }] : [])];

  if (!fields || !resume) {
    return jsonError("Verifique os campos destacados e tente novamente.", 422, allErrors);
  }

  const id = crypto.randomUUID();
  const resumeKey = buildResumeKey(id, resume.extension);

  try {
    await env.RESUMES_BUCKET.put(resumeKey, resume.bytes, {
      httpMetadata: { contentType: resume.mimeType },
    });
  } catch (err) {
    console.error("job-application: falha ao gravar currículo no R2", err);
    return jsonError(
      "Não conseguimos enviar seu currículo agora. Tente novamente em alguns instantes.",
      502
    );
  }

  const record = {
    id,
    ...fields,
    resumePath: resumeKey,
    resumeOriginalName: resume.originalName,
    resumeMimeType: resume.mimeType,
    resumeSize: resume.size,
    status: "new",
    createdAt: new Date().toISOString(),
    notified: false as boolean,
  };

  const notification = await sendApplicationNotification(env, fields, resumeKey);
  record.notified = notification.sent;
  if (!notification.sent) {
    // A candidatura já está salva — a falha de notificação não pode
    // derrubar o envio, só fica registrada no próprio metadado.
    console.error("job-application: notificação por e-mail não enviada:", notification.reason);
  }

  try {
    await env.RESUMES_BUCKET.put(`applications/${id}.json`, JSON.stringify(record), {
      httpMetadata: { contentType: "application/json" },
    });
  } catch (err) {
    // O currículo já foi salvo; a candidatura não se perde mesmo que o
    // metadado falhe — só fica sem o registro estruturado ao lado do arquivo.
    console.error("job-application: falha ao gravar metadados no R2", err);
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
};

export const onRequestGet: PagesFunction = async () =>
  jsonError("Método não permitido.", 405);
