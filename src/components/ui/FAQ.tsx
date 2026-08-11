import { useState } from "react";
import type { FaqItem } from "../../lib/faq";
import { hasOfficialFaqAnswer } from "../../lib/faq";

export type { FaqItem };

interface FAQProps {
  items: readonly FaqItem[];
  title?: string;
  className?: string;
}

/**
 * Accordion de FAQ. Publica somente itens com resposta oficial.
 * Retorna null quando não há nada a exibir.
 */
export default function FAQ({
  items,
  title = "Perguntas frequentes",
  className = "",
}: FAQProps) {
  const published = items.filter(hasOfficialFaqAnswer);

  if (published.length === 0) return null;

  return (
    <div className={`faq ${className}`.trim()}>
      {title ? <h2 className="faq__title">{title}</h2> : null}
      <div className="faq__list">
        {published.map((item, index) => (
          <FAQItemRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function FAQItemRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${item.id}-${index}`;
  const buttonId = `faq-button-${item.id}-${index}`;

  return (
    <div className={`faq__item ${open ? "faq__item--open" : ""}`}>
      <h3 className="faq__question">
        <button
          type="button"
          id={buttonId}
          className="faq__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v: boolean) => !v)}
        >
          <span>{item.question}</span>
          <span className="faq__icon" aria-hidden="true">
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq__panel"
        hidden={!open}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
}
