import { useState, type FormEvent } from "react";
import { formatPhoneBR, phoneDigits } from "../lib/phone";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";

const PLAN_OPTIONS = [
  { value: "Ainda não sei", label: "Ainda não sei" },
  { value: "450 Mega", label: "450 Mega" },
  { value: "650 Mega", label: "650 Mega" },
  { value: "850 Mega", label: "850 Mega" },
] as const;

type FieldKey = "name" | "phone" | "address";

const INITIAL = {
  name: "",
  phone: "",
  address: "",
  plan: PLAN_OPTIONS[0].value,
  message: "",
};

export default function ContactForm({ className = "" }: { className?: string }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const update = (field: keyof typeof INITIAL, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as FieldKey];
        return next;
      });
    }
  };

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {};

    if (!form.name.trim()) next.name = "Informe seu nome";
    if (phoneDigits(form.phone).length < 10) next.phone = "Informe um WhatsApp válido";
    if (!form.address.trim()) next.address = "Informe bairro ou endereço";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = WHATSAPP_MESSAGES.contactForm({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      plan: form.plan,
      message: form.message,
    });

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      className={`contact-form ${className}`.trim()}
      onSubmit={handleSubmit}
      noValidate
    >
      <header className="contact-form__header">
        <h3 className="contact-form__title">Consulte disponibilidade</h3>
        <p className="contact-form__subtitle">
          Preencha e fale direto com a equipe pelo WhatsApp.
        </p>
      </header>

      <div className="contact-form__fields">
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-name">
            Nome
          </label>
          <input
            id="contact-name"
            type="text"
            className={`contact-form__input ${errors.name ? "contact-form__input--error" : ""}`}
            placeholder="Seu nome"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <span id="contact-name-error" className="contact-form__error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-phone">
            WhatsApp
          </label>
          <input
            id="contact-phone"
            type="tel"
            inputMode="numeric"
            className={`contact-form__input ${errors.phone ? "contact-form__input--error" : ""}`}
            placeholder="Seu WhatsApp"
            value={form.phone}
            onChange={(e) => update("phone", formatPhoneBR(e.target.value))}
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          />
          {errors.phone && (
            <span id="contact-phone-error" className="contact-form__error" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-address">
            Bairro ou endereço
          </label>
          <input
            id="contact-address"
            type="text"
            className={`contact-form__input ${errors.address ? "contact-form__input--error" : ""}`}
            placeholder="Seu bairro ou endereço"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            autoComplete="street-address"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "contact-address-error" : undefined}
          />
          {errors.address && (
            <span id="contact-address-error" className="contact-form__error" role="alert">
              {errors.address}
            </span>
          )}
        </div>

        <div className="contact-form__field">
          <span className="contact-form__label" id="contact-plan-label">
            Plano de interesse
          </span>
          <div className="contact-form__plans" role="radiogroup" aria-labelledby="contact-plan-label">
            {PLAN_OPTIONS.map((option) => (
              <label key={option.value} className="contact-form__plan">
                <input
                  type="radio"
                  name="plan"
                  value={option.value}
                  checked={form.plan === option.value}
                  onChange={() => update("plan", option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-message">
            Mensagem <span className="contact-form__optional">(opcional)</span>
          </label>
          <textarea
            id="contact-message"
            className="contact-form__input contact-form__textarea"
            placeholder="Mensagem opcional"
            rows={2}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn btn--primary btn--md contact-form__submit">
        <WhatsAppIcon />
        Consultar pelo WhatsApp
      </button>
    </form>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
