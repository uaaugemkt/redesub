import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = "Perguntas frequentes" }: FAQProps) {
  return (
    <div className="faq">
      <h2 className="faq__title">{title}</h2>
      <div className="faq__list">
        {items.map((item, index) => (
          <FAQItemRow key={item.question} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function FAQItemRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

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
