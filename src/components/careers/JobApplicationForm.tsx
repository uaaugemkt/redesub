import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import ResumeUploadField from "./ResumeUploadField";
import {
  JOB_AREA_OPTIONS,
  MAX_RESUME_BYTES,
  hasAllowedResumeExtension,
} from "../../lib/careers";
import { formatPhoneBR, phoneDigits } from "../../lib/phone";

type FieldKey =
  | "name"
  | "email"
  | "phone"
  | "city"
  | "state"
  | "area"
  | "areaOther"
  | "linkedin"
  | "resume"
  | "consent";

interface FormState {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  area: string;
  areaOther: string;
  linkedin: string;
  message: string;
  consent: boolean;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  area: "",
  areaOther: "",
  linkedin: "",
  message: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTHER_AREA = "Outra área";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function JobApplicationForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submittingRef = useRef(false);
  const renderedAtRef = useRef(Date.now());

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as FieldKey];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<FieldKey, string>> = {};

    if (form.name.trim().length < 2) next.name = "Informe seu nome completo";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Informe um e-mail válido";
    if (phoneDigits(form.phone).length < 10) next.phone = "Informe um WhatsApp/telefone válido";
    if (!form.city.trim()) next.city = "Informe sua cidade";
    if (!form.state.trim()) next.state = "Informe seu estado";
    if (!form.area) next.area = "Selecione uma área de interesse";
    if (form.area === OTHER_AREA && !form.areaOther.trim()) {
      next.areaOther = "Diga em qual área você tem interesse";
    }
    if (form.linkedin.trim() && !/^https?:\/\//i.test(form.linkedin.trim())) {
      next.linkedin = "Informe um link válido (começando com https://)";
    }

    if (!resume) {
      next.resume = "Anexe seu currículo (PDF, DOC ou DOCX)";
    } else if (!hasAllowedResumeExtension(resume.name)) {
      next.resume = "Formato não suportado. Envie um PDF, DOC ou DOCX";
    } else if (resume.size > MAX_RESUME_BYTES) {
      next.resume = "O arquivo excede o limite de 5 MB";
    }

    if (!form.consent) {
      next.consent = "É necessário concordar com o tratamento de dados";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (submittingRef.current) return;
    if (!validate()) return;

    submittingRef.current = true;
    setStatus("submitting");
    setSubmitError(null);

    const area =
      form.area === OTHER_AREA && form.areaOther.trim()
        ? `${OTHER_AREA} — ${form.areaOther.trim()}`
        : form.area;

    const body = new FormData();
    body.set("name", form.name.trim());
    body.set("email", form.email.trim());
    body.set("phone", form.phone.trim());
    body.set("city", form.city.trim());
    body.set("state", form.state.trim());
    body.set("area", area);
    body.set("linkedin", form.linkedin.trim());
    body.set("message", form.message.trim());
    body.set("consent", form.consent ? "true" : "false");
    body.set("renderedAt", String(renderedAtRef.current));
    body.set("website", ""); // honeypot — deve permanecer vazio
    if (resume) body.set("resume", resume);

    try {
      const response = await fetch("/api/job-application", {
        method: "POST",
        body,
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error ?? "Falha no envio");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setSubmitError(
        "Não conseguimos enviar seu currículo agora. Tente novamente em alguns instantes."
      );
    } finally {
      submittingRef.current = false;
    }
  };

  if (status === "success") {
    return (
      <div className="careers-form careers-form--success" role="status">
        <span className="careers-form__success-icon" aria-hidden="true">
          <CheckCircleIcon />
        </span>
        <h3 className="careers-form__success-title">Currículo enviado!</h3>
        <p className="careers-form__success-text">
          Obrigado pelo interesse em fazer parte da RedeSub. Seu currículo foi
          recebido e ficará disponível para futuras oportunidades compatíveis
          com o seu perfil.
        </p>
        <Link to="/" className="btn btn--outline btn--md">
          Voltar para o início
        </Link>
      </div>
    );
  }

  return (
    <form className="careers-form" onSubmit={handleSubmit} noValidate>
      <header className="careers-form__header">
        <h2 className="careers-form__title">Envie seu currículo</h2>
        <p className="careers-form__subtitle">
          Preencha seus dados e anexe seu currículo. Leva menos de 2 minutos.
        </p>
      </header>

      {/* Honeypot — invisível para pessoas, alvo comum de preenchimento automático por bots. */}
      <div className="careers-form__honeypot" aria-hidden="true">
        <label htmlFor="careers-website">Não preencha este campo</label>
        <input id="careers-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="careers-form__grid">
        <div className="careers-form__field">
          <label className="contact-form__label" htmlFor="careers-name">
            Nome completo
          </label>
          <input
            id="careers-name"
            type="text"
            className={`contact-form__input ${errors.name ? "contact-form__input--error" : ""}`}
            placeholder="Seu nome completo"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "careers-name-error" : undefined}
          />
          {errors.name && (
            <span id="careers-name-error" className="contact-form__error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="careers-form__field">
          <label className="contact-form__label" htmlFor="careers-email">
            E-mail
          </label>
          <input
            id="careers-email"
            type="email"
            className={`contact-form__input ${errors.email ? "contact-form__input--error" : ""}`}
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "careers-email-error" : undefined}
          />
          {errors.email && (
            <span id="careers-email-error" className="contact-form__error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="careers-form__field">
          <label className="contact-form__label" htmlFor="careers-phone">
            WhatsApp / telefone
          </label>
          <input
            id="careers-phone"
            type="tel"
            inputMode="numeric"
            className={`contact-form__input ${errors.phone ? "contact-form__input--error" : ""}`}
            placeholder="(91) 99999-9999"
            value={form.phone}
            onChange={(e) => update("phone", formatPhoneBR(e.target.value))}
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "careers-phone-error" : undefined}
          />
          {errors.phone && (
            <span id="careers-phone-error" className="contact-form__error" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className="careers-form__field">
          <label className="contact-form__label" htmlFor="careers-linkedin">
            LinkedIn <span className="contact-form__optional">(opcional)</span>
          </label>
          <input
            id="careers-linkedin"
            type="url"
            className={`contact-form__input ${errors.linkedin ? "contact-form__input--error" : ""}`}
            placeholder="https://linkedin.com/in/seu-perfil"
            value={form.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            autoComplete="url"
            aria-invalid={Boolean(errors.linkedin)}
            aria-describedby={errors.linkedin ? "careers-linkedin-error" : undefined}
          />
          {errors.linkedin && (
            <span id="careers-linkedin-error" className="contact-form__error" role="alert">
              {errors.linkedin}
            </span>
          )}
        </div>

        <div className="careers-form__field">
          <label className="contact-form__label" htmlFor="careers-city">
            Cidade
          </label>
          <input
            id="careers-city"
            type="text"
            className={`contact-form__input ${errors.city ? "contact-form__input--error" : ""}`}
            placeholder="Sua cidade"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? "careers-city-error" : undefined}
          />
          {errors.city && (
            <span id="careers-city-error" className="contact-form__error" role="alert">
              {errors.city}
            </span>
          )}
        </div>

        <div className="careers-form__field">
          <label className="contact-form__label" htmlFor="careers-state">
            Estado
          </label>
          <input
            id="careers-state"
            type="text"
            className={`contact-form__input ${errors.state ? "contact-form__input--error" : ""}`}
            placeholder="Seu estado"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            autoComplete="address-level1"
            aria-invalid={Boolean(errors.state)}
            aria-describedby={errors.state ? "careers-state-error" : undefined}
          />
          {errors.state && (
            <span id="careers-state-error" className="contact-form__error" role="alert">
              {errors.state}
            </span>
          )}
        </div>

        <div className="careers-form__field careers-form__field--wide">
          <label className="contact-form__label" htmlFor="careers-area">
            Área de interesse
          </label>
          <select
            id="careers-area"
            className={`contact-form__input contact-form__select ${errors.area ? "contact-form__input--error" : ""}`}
            value={form.area}
            onChange={(e) => update("area", e.target.value)}
            aria-invalid={Boolean(errors.area)}
            aria-describedby={errors.area ? "careers-area-error" : undefined}
          >
            <option value="">Selecione uma área</option>
            {JOB_AREA_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.area && (
            <span id="careers-area-error" className="contact-form__error" role="alert">
              {errors.area}
            </span>
          )}
        </div>

        {form.area === OTHER_AREA && (
          <div className="careers-form__field careers-form__field--wide">
            <label className="contact-form__label" htmlFor="careers-area-other">
              Qual área?
            </label>
            <input
              id="careers-area-other"
              type="text"
              className={`contact-form__input ${errors.areaOther ? "contact-form__input--error" : ""}`}
              placeholder="Conte em qual área você quer atuar"
              value={form.areaOther}
              onChange={(e) => update("areaOther", e.target.value)}
              aria-invalid={Boolean(errors.areaOther)}
              aria-describedby={errors.areaOther ? "careers-area-other-error" : undefined}
            />
            {errors.areaOther && (
              <span id="careers-area-other-error" className="contact-form__error" role="alert">
                {errors.areaOther}
              </span>
            )}
          </div>
        )}

        <div className="careers-form__field careers-form__field--wide">
          <label className="contact-form__label" htmlFor="careers-message">
            Mensagem / apresentação <span className="contact-form__optional">(opcional)</span>
          </label>
          <textarea
            id="careers-message"
            className="contact-form__input contact-form__textarea"
            placeholder="Conte um pouco sobre você, se quiser"
            rows={3}
            maxLength={2000}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </div>

        <div className="careers-form__field careers-form__field--wide">
          <span className="contact-form__label">Currículo</span>
          <ResumeUploadField file={resume} onChange={setResume} error={errors.resume} />
        </div>
      </div>

      <label className="careers-form__consent">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "careers-consent-error" : undefined}
        />
        <span>
          Li e concordo com o tratamento dos meus dados pessoais para fins de
          recrutamento e seleção, conforme a{" "}
          <Link to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
            Política de Privacidade
          </Link>{" "}
          da RedeSub.
        </span>
      </label>
      {errors.consent && (
        <span id="careers-consent-error" className="contact-form__error" role="alert">
          {errors.consent}
        </span>
      )}

      {status === "error" && submitError && (
        <p className="careers-form__submit-error" role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        className="btn btn--primary btn--lg careers-form__submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Enviando currículo..." : "Enviar currículo"}
      </button>
    </form>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="m8 12.5 2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
